import { NextResponse } from "next/server";
import { sendMetaCapiEvent, extractMetaCookies, sanitizeHashedIdentity, CapiCustomData } from "@/lib/metaCapi";

// Only browsing events are accepted here. InitiateCheckout and Purchase are sent
// exclusively from create-order / verify-payment so they cannot be spoofed.
const ALLOWED_EVENTS = new Set(["PageView", "ViewContent"]);
const EVENT_ID_PATTERN = /^[a-z]+_\d{10,16}_[a-z0-9]{4,16}$/;
const ALLOWED_HOST = "thinktools.in";

function isAllowedSourceUrl(rawUrl: unknown): rawUrl is string {
  if (typeof rawUrl !== "string" || rawUrl.length > 2048) return false;
  try {
    const host = new URL(rawUrl).hostname;
    return host === ALLOWED_HOST || host.endsWith(`.${ALLOWED_HOST}`);
  } catch {
    return false;
  }
}

function sanitizeCustomData(raw: unknown): CapiCustomData | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const data = raw as Record<string, unknown>;
  const result: CapiCustomData = {};
  if (typeof data.content_name === "string") result.content_name = data.content_name.slice(0, 200);
  if (Array.isArray(data.content_ids)) {
    result.content_ids = data.content_ids
      .filter((id): id is string => typeof id === "string")
      .slice(0, 10)
      .map((id) => id.slice(0, 100));
  }
  if (typeof data.content_type === "string") result.content_type = data.content_type.slice(0, 50);
  if (typeof data.value === "number" && Number.isFinite(data.value) && data.value >= 0) result.value = data.value;
  if (typeof data.currency === "string") result.currency = data.currency.slice(0, 3).toUpperCase();
  return Object.keys(result).length > 0 ? result : undefined;
}

/**
 * Server-side mirror of browser PageView / ViewContent events.
 * The browser sends the same event_id to the Pixel and here, so Meta deduplicates them.
 */
export async function POST(request: Request) {
  // sendBeacon may deliver the payload as text/plain, so parse the raw body
  const body = await request
    .text()
    .then((text) => JSON.parse(text))
    .catch(() => null);

  if (
    !body ||
    !ALLOWED_EVENTS.has(body.event_name) ||
    typeof body.event_id !== "string" ||
    !EVENT_ID_PATTERN.test(body.event_id) ||
    !isAllowedSourceUrl(body.event_source_url)
  ) {
    return new NextResponse(null, { status: 204 });
  }

  const clientIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    undefined;
  const userAgent = request.headers.get("user-agent") || undefined;
  const { fbp, fbc, externalId } = extractMetaCookies(request.headers.get("cookie"));

  sendMetaCapiEvent({
    eventName: body.event_name,
    eventId: body.event_id,
    user: {
      ip: clientIp,
      userAgent,
      fbp,
      fbc,
      externalId,
      hashed: sanitizeHashedIdentity(body.user_hashes),
    },
    customData: sanitizeCustomData(body.custom_data),
    eventSourceUrl: body.event_source_url,
  }).catch((capiErr) => {
    console.error(`Async Meta CAPI ${body.event_name} delivery error:`, capiErr);
  });

  return new NextResponse(null, { status: 204 });
}
