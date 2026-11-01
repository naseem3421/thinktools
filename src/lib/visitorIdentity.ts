/**
 * Client-side helpers that raise Meta Event Match Quality for PageView / ViewContent.
 *
 * - tt_eid cookie: stable anonymous visitor id, sent as external_id by the pixel and the server.
 * - tt_um (localStorage): SHA-256 hashes of email / phone / name once the visitor has given them
 *   (checkout form). Raw values are never stored. Later events from the same browser carry them.
 *
 * The inline pixel snippet in TrackingScripts.tsx reads the same cookie / storage keys.
 */

export const VISITOR_COOKIE = "tt_eid";
export const IDENTITY_STORAGE_KEY = "tt_um";

export interface IdentityHashes {
  em?: string;
  ph?: string;
  fn?: string;
  ln?: string;
}

const SHA256_HEX = /^[a-f0-9]{64}$/;

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return null;
  }
}

/** Returns the visitor id, creating the cookie (2 years) on first use. */
export function getVisitorId(): string | undefined {
  if (typeof document === "undefined") return undefined;
  try {
    let id = readCookie(VISITOR_COOKIE);
    if (!id) {
      id =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `v${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
      const secure = window.location.protocol === "https:" ? ";Secure" : "";
      document.cookie = `${VISITOR_COOKIE}=${encodeURIComponent(id)};path=/;max-age=63072000;SameSite=Lax${secure}`;
    }
    return id;
  } catch {
    return undefined;
  }
}

/** Hashes remembered from an earlier form submission in this browser (validated). */
export function getStoredHashes(): IdentityHashes {
  if (typeof window === "undefined") return {};
  try {
    const parsed = JSON.parse(window.localStorage.getItem(IDENTITY_STORAGE_KEY) || "{}") as Record<string, unknown>;
    const out: IdentityHashes = {};
    for (const key of ["em", "ph", "fn", "ln"] as const) {
      const v = parsed?.[key];
      if (typeof v === "string" && SHA256_HEX.test(v)) out[key] = v;
    }
    return out;
  } catch {
    return {};
  }
}

async function sha256Hex(value: string): Promise<string | undefined> {
  try {
    const bytes = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    return undefined;
  }
}

// Same normalisation as src/lib/metaCapi.ts so browser and server hashes are identical
function normalizePhone(phone: string): string {
  const clean = phone.replace(/\D/g, "");
  return clean.length === 10 ? `91${clean}` : clean;
}

/**
 * Remembers hashed customer details and re-initialises the pixel with them, so every later
 * PageView / ViewContent (browser and server mirror) carries email / phone / name.
 * Call after the visitor has knowingly submitted their details (e.g. the checkout form).
 */
export async function rememberCustomer(input: { email?: string; phone?: string; name?: string }): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const hashes: IdentityHashes = {};
    const email = input.email?.trim().toLowerCase();
    const phone = input.phone ? normalizePhone(input.phone) : "";
    const parts = input.name?.trim().toLowerCase().split(/\s+/).filter(Boolean) ?? [];

    if (email) hashes.em = await sha256Hex(email);
    if (phone) hashes.ph = await sha256Hex(phone);
    if (parts[0]) hashes.fn = await sha256Hex(parts[0]);
    if (parts.length > 1) hashes.ln = await sha256Hex(parts[parts.length - 1]);

    const clean: IdentityHashes = { ...getStoredHashes() };
    for (const key of ["em", "ph", "fn", "ln"] as const) {
      const v = hashes[key];
      if (v) clean[key] = v;
    }
    window.localStorage.setItem(IDENTITY_STORAGE_KEY, JSON.stringify(clean));

    const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    if (pixelId && typeof window.fbq === "function") {
      const eid = getVisitorId();
      window.fbq("init", pixelId, { ...(eid ? { external_id: eid } : {}), ...clean });
    }
  } catch {
    // Tracking must never break the page
  }
}
