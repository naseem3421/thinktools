/**
 * Normalizes email address by trimming whitespace and converting to lowercase.
 */
export function normalizeEmail(email: string): string {
  if (!email || typeof email !== "string") return "";
  return email.trim().toLowerCase();
}

/**
 * Common typo mappings for popular mail domains.
 */
const DOMAIN_TYPOS: Record<string, string> = {
  // Gmail typos
  "gmial.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gmal.com": "gmail.com",
  "gmaill.com": "gmail.com",
  "gmeil.com": "gmail.com",
  "gmaul.com": "gmail.com",
  "gmaii.com": "gmail.com",
  "gmail.con": "gmail.com",
  "gmail.co": "gmail.com",
  "gmail.cm": "gmail.com",
  "gmai.co": "gmail.com",
  "gmil.com": "gmail.com",

  // Yahoo typos
  "yaho.com": "yahoo.com",
  "yahooo.com": "yahoo.com",
  "yhaoo.com": "yahoo.com",
  "yaho.co.in": "yahoo.co.in",
  "yahoo.con": "yahoo.com",
  "ymail.con": "ymail.com",

  // Hotmail typos
  "hotmial.com": "hotmail.com",
  "hotmai.com": "hotmail.com",
  "hotmaill.com": "hotmail.com",
  "hotmail.con": "hotmail.com",

  // Outlook typos
  "outlok.com": "outlook.com",
  "outloo.com": "outlook.com",
  "outlock.com": "outlook.com",
  "outlook.con": "outlook.com",

  // Rediffmail typos
  "rediffmial.com": "rediffmail.com",
  "redifmail.com": "rediffmail.com",
  "rediff.com": "rediffmail.com",

  // iCloud typos
  "iclud.com": "icloud.com",
  "icould.com": "icloud.com",
};

export interface EmailValidationResult {
  valid: boolean;
  normalizedEmail: string;
  hasTypo: boolean;
  suggestedEmail?: string;
  suggestedDomain?: string;
  error?: string;
}

/**
 * Validates email format, checks for common domain typos, and suggests corrections.
 */
export function validateEmailWithTypoDetection(email: string): EmailValidationResult {
  const normalized = normalizeEmail(email);

  if (!normalized) {
    return {
      valid: false,
      normalizedEmail: "",
      hasTypo: false,
      error: "Email address cannot be empty.",
    };
  }

  // RFC-compliant simple email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(normalized)) {
    return {
      valid: false,
      normalizedEmail: normalized,
      hasTypo: false,
      error: "Please enter a valid email format (e.g. name@gmail.com).",
    };
  }

  const parts = normalized.split("@");
  if (parts.length !== 2) {
    return {
      valid: false,
      normalizedEmail: normalized,
      hasTypo: false,
      error: "Invalid email address.",
    };
  }

  const [localPart, domainPart] = parts;

  // Check for known domain typos
  if (DOMAIN_TYPOS[domainPart]) {
    const correctedDomain = DOMAIN_TYPOS[domainPart];
    const suggestedEmail = `${localPart}@${correctedDomain}`;
    return {
      valid: true,
      normalizedEmail: normalized,
      hasTypo: true,
      suggestedEmail,
      suggestedDomain: correctedDomain,
      error: `Did you mean ${suggestedEmail}?`,
    };
  }

  return {
    valid: true,
    normalizedEmail: normalized,
    hasTypo: false,
  };
}

/**
 * Normalizes Indian phone numbers into standard format (+91XXXXXXXXXX or 10-digit).
 */
export function normalizeIndianPhone(phone: string): {
  valid: boolean;
  normalized: string;
  formattedDisplay: string;
  waNumber: string;
} {
  if (!phone || typeof phone !== "string") {
    return { valid: false, normalized: "", formattedDisplay: "", waNumber: "" };
  }

  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, "");

  let tenDigit = "";
  if (digits.length === 10) {
    tenDigit = digits;
  } else if (digits.length === 12 && digits.startsWith("91")) {
    tenDigit = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith("0")) {
    tenDigit = digits.slice(1);
  }

  // Valid 10-digit Indian mobile numbers start with 6, 7, 8, or 9
  const isValid = tenDigit.length === 10 && /^[6-9]\d{9}$/.test(tenDigit);

  return {
    valid: isValid,
    normalized: tenDigit ? `+91${tenDigit}` : phone.trim(),
    formattedDisplay: tenDigit ? `+91 ${tenDigit.slice(0, 5)} ${tenDigit.slice(5)}` : phone.trim(),
    waNumber: tenDigit ? `91${tenDigit}` : digits,
  };
}

