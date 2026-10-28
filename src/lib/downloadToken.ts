import crypto from "crypto";

interface TokenPayload {
  order_id: string;
  addon_ids: string[];
  product_slug: string;
  exp: number; // unix timestamp in ms
}

function getSecretKey(): string {
  return (
    process.env.DOWNLOAD_SECRET ||
    process.env.RAZORPAY_KEY_SECRET ||
    "thinktools-secure-download-token-key-fallback-2026"
  );
}

/**
 * Generate a cryptographically signed, time-limited token for digital downloads.
 * Defaults to 3 hours validity.
 */
export function generateDownloadToken(params: {
  order_id: string;
  addon_ids?: string[];
  product_slug?: string;
  hoursValid?: number;
}): string {
  const hours = params.hoursValid ?? 3;
  const payload: TokenPayload = {
    order_id: params.order_id,
    addon_ids: params.addon_ids || [],
    product_slug: params.product_slug || "construction-calculator-pro",
    exp: Date.now() + hours * 60 * 60 * 1000,
  };

  const payloadString = JSON.stringify(payload);
  const payloadBase64 = Buffer.from(payloadString, "utf-8").toString("base64url");

  const signature = crypto
    .createHmac("sha256", getSecretKey())
    .update(payloadBase64)
    .digest("hex");

  return `${payloadBase64}.${signature}`;
}

/**
 * Verify a download token: checks signature integrity and expiration time.
 */
export function verifyDownloadToken(token: string): {
  valid: boolean;
  error?: string;
  payload?: TokenPayload;
} {
  if (!token || typeof token !== "string") {
    return { valid: false, error: "Download token is missing." };
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return { valid: false, error: "Malformed download token." };
  }

  const [payloadBase64, signature] = parts;

  // Recompute HMAC signature
  const expectedSignature = crypto
    .createHmac("sha256", getSecretKey())
    .update(payloadBase64)
    .digest("hex");

  // Timing-safe comparison to prevent timing attacks
  const isMatch =
    expectedSignature.length === signature.length &&
    crypto.timingSafeEqual(
      Buffer.from(expectedSignature, "utf-8"),
      Buffer.from(signature, "utf-8")
    );

  if (!isMatch) {
    return { valid: false, error: "Invalid download token signature." };
  }

  try {
    const payloadJson = Buffer.from(payloadBase64, "base64url").toString("utf-8");
    const payload: TokenPayload = JSON.parse(payloadJson);

    if (Date.now() > payload.exp) {
      return {
        valid: false,
        error: "Download link has expired. Please check your email for permanent offline access.",
        payload,
      };
    }

    return { valid: true, payload };
  } catch {
    return { valid: false, error: "Failed to parse download token payload." };
  }
}
