import crypto from "crypto";

export interface CapiUserData {
  email?: string;
  phone?: string;
  name?: string;
  ip?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
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
  eventName: "Purchase" | "InitiateCheckout" | "ViewContent";
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

    if (params.user.fbc) {
      userData.fbc = params.user.fbc;
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
export function extractMetaCookies(cookieHeader: string | null | undefined): { fbp?: string; fbc?: string } {
  if (!cookieHeader) return {};
  const fbpMatch = cookieHeader.match(/(?:^|;\s*)_fbp=([^;]+)/);
  const fbcMatch = cookieHeader.match(/(?:^|;\s*)_fbc=([^;]+)/);
  return {
    fbp: fbpMatch ? decodeURIComponent(fbpMatch[1]) : undefined,
    fbc: fbcMatch ? decodeURIComponent(fbcMatch[1]) : undefined,
  };
}
