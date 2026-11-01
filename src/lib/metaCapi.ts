import crypto from "crypto";

/** SHA-256 hex digests captured in the browser (see src/lib/visitorIdentity.ts). */
export interface CapiHashedIdentity {
  em?: string;
  ph?: string;
  fn?: string;
  ln?: string;
}

export interface CapiUserData {
  email?: string;
  phone?: string;
  name?: string;
  ip?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
  /** First-party anonymous visitor id (tt_eid cookie). Hashed before sending. */
  externalId?: string;
  /** Already-hashed customer details remembered by the browser; used only to fill gaps. */
  hashed?: CapiHashedIdentity;
}

const SHA256_HEX = /^[a-f0-9]{64}$/;
const VISITOR_ID_PATTERN = /^[A-Za-z0-9_-]{8,64}$/;

/** Keeps only well-formed SHA-256 hex values from untrusted input. */
export function sanitizeHashedIdentity(raw: unknown): CapiHashedIdentity | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const src = raw as Record<string, unknown>;
  const out: CapiHashedIdentity = {};
  for (const key of ["em", "ph", "fn", "ln"] as const) {
    const v = src[key];
    if (typeof v === "string" && SHA256_HEX.test(v)) out[key] = v;
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

export interface CapiCustomData {
  value?: number;
  currency?: string;
  content_name?: string;
  content_ids?: string[];
  content_type?: string;
  num_items?: number;
  order_id?: string;
}

export interface MetaCapiParams {
  eventName: "Purchase" | "InitiateCheckout" | "ViewContent" | "PageView";
  eventId: string;
  user: CapiUserData;
  customData?: CapiCustomData;
  eventSourceUrl?: string;
}

function sha256(val: string): string {
  return crypto.createHash("sha256").update(val.trim().toLowerCase()).digest("hex");
}

function normalizePhone(phone: string): string {
  // Strip non-digits
  const clean = phone.replace(/\D/g, "");
  // If 10 digits (common in India), prepend 91 country code
  if (clean.length === 10) {
    return `91${clean}`;
  }
  return clean;
}

/**
 * Dispatches server-side event to Meta Conversions API (CAPI)
 * with deduplication key (event_id matching browser fbq eventID).
 */
export async function sendMetaCapiEvent(params: MetaCapiParams): Promise<boolean> {
  const pixelId =
    process.env.NEXT_PUBLIC_META_PIXEL_ID ||
    process.env.META_PIXEL_ID ||
    "1643533957395571";
  const accessToken =
    process.env.META_CAPI_ACCESS_TOKEN ||
    process.env.META_CONVERSIONS_API_TOKEN;
  const testEventCode =
    process.env.META_TEST_EVENT_CODE ||
    process.env.META_CAPI_TEST_CODE;

  // Gracefully skip if CAPI token or Pixel ID is not configured
  if (!pixelId || !accessToken) {
    console.warn("[Meta CAPI] Skipped: META_CAPI_ACCESS_TOKEN or Pixel ID is not configured.");
    return false;
  }

  try {
    const userData: Record<string, unknown> = {};

    if (params.user.email && params.user.email.trim()) {
      userData.em = [sha256(params.user.email)];
    }

    if (params.user.phone && params.user.phone.trim()) {
      userData.ph = [sha256(normalizePhone(params.user.phone))];
    }

    if (params.user.name && params.user.name.trim()) {
      const parts = params.user.name.trim().split(/\s+/);
      if (parts[0]) userData.fn = [sha256(parts[0])];
      if (parts.length > 1 && parts[parts.length - 1]) {
        userData.ln = [sha256(parts[parts.length - 1])];
      }
    }

    if (params.user.ip) {
      userData.client_ip_address = params.user.ip;
    }

    if (params.user.userAgent) {
      userData.client_user_agent = params.user.userAgent;
    }

    if (params.user.fbp) {
      userData.fbp = params.user.fbp;
    }

    // Fall back to building fbc from ?fbclid= when the _fbc cookie is not available yet
    let fbc = params.user.fbc;
    if (!fbc && params.eventSourceUrl) {
      try {
        const fbclid = new URL(params.eventSourceUrl).searchParams.get("fbclid");
        if (fbclid && /^[\w-]{8,512}$/.test(fbclid)) fbc = `fb.1.${Date.now()}.${fbclid}`;
      } catch {
        // ignore malformed URL
      }
    }
    if (fbc) {
      userData.fbc = fbc;
    }

    // Stable anonymous visitor id: lets Meta link every event from the same visitor
    if (params.user.externalId && VISITOR_ID_PATTERN.test(params.user.externalId)) {
      userData.external_id = [sha256(params.user.externalId)];
    }

    // Customer details remembered by the browser (already hashed) fill whatever raw data did not provide
    const hashed = params.user.hashed;
    if (hashed) {
      if (!userData.em && hashed.em) userData.em = [hashed.em];
      if (!userData.ph && hashed.ph) userData.ph = [hashed.ph];
      if (!userData.fn && hashed.fn) userData.fn = [hashed.fn];
      if (!userData.ln && hashed.ln) userData.ln = [hashed.ln];
    }

    const eventPayload: Record<string, unknown> = {
      event_name: params.eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: params.eventId,
      event_source_url: params.eventSourceUrl || "https://thinktools.in",
      action_source: "website",
      user_data: userData,
    };

    if (params.customData) {
      eventPayload.custom_data = {
        ...params.customData,
        currency: params.customData.currency || "INR",
      };
    }

    const body: Record<string, unknown> = {
      data: [eventPayload],
    };

    // Include test_event_code at the top level only when configured
    if (testEventCode && testEventCode.trim() !== "") {
      body.test_event_code = testEventCode.trim();
    }

    const endpoint = `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      // Never log accessToken or PII
      console.error("[Meta CAPI] Event dispatch rejected: HTTP", res.status, errText);
      return false;
    }

    if (process.env.NODE_ENV === "development") {
      console.log("[Meta Tracking]", {
        event_name: params.eventName,
        event_id: params.eventId,
        source: "server",
      });
    }

    return true;
  } catch (error: unknown) {
    // Never log accessToken or PII
    console.error("[Meta CAPI] Dispatch exception:", error instanceof Error ? error.message : "Unknown error");
    return false;
  }
}

/**
 * Extracts Meta _fbp (browser ID) and _fbc (click ID) cookies from request headers
 * to significantly improve Conversions API Event Match Quality (EMQ) and deduplication.
 */
export function extractMetaCookies(
  cookieHeader: string | null | undefined
): { fbp?: string; fbc?: string; externalId?: string } {
  if (!cookieHeader) return {};
  const fbpMatch = cookieHeader.match(/(?:^|;\s*)_fbp=([^;]+)/);
  const fbcMatch = cookieHeader.match(/(?:^|;\s*)_fbc=([^;]+)/);
  const eidMatch = cookieHeader.match(/(?:^|;\s*)tt_eid=([^;]+)/);
  const safeDecode = (v: string) => {
    try {
      return decodeURIComponent(v);
    } catch {
      return undefined;
    }
  };
  const externalId = eidMatch ? safeDecode(eidMatch[1]) : undefined;
  return {
    fbp: fbpMatch ? safeDecode(fbpMatch[1]) : undefined,
    fbc: fbcMatch ? safeDecode(fbcMatch[1]) : undefined,
    externalId: externalId && VISITOR_ID_PATTERN.test(externalId) ? externalId : undefined,
  };
}
