/**
 * Checkout lead log (Google Sheet tab "Checkout Leads").
 *
 * Records every checkout attempt the moment the buyer clicks Pay, then updates the
 * same row to Paid / Failed. Rows that stay "Initiated" are follow-up leads.
 *
 * Never throws and never blocks checkout: if the sheet is slow, down, or not
 * configured, the payment flow carries on exactly as before.
 */

export type LeadStatus = "Initiated" | "Paid" | "Failed";

export interface LeadLogEntry {
  orderId: string;
  status: LeadStatus;
  name?: string;
  email?: string;
  phone?: string;
  product?: string;
  amountInr?: number;
  paymentId?: string;
  note?: string;
}

const LEAD_LOG_TIMEOUT_MS = 4000;

export async function logCheckoutLead(entry: LeadLogEntry): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_LEADS_WEBHOOK_URL;
  if (!url || !entry.orderId) return;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), LEAD_LOG_TIMEOUT_MS);
    await fetch(url, {
      method: "POST",
      // text/plain avoids a CORS preflight; Apps Script reads the raw body either way
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        secret: process.env.GOOGLE_SHEETS_LEADS_SECRET || "",
        ...entry,
      }),
      redirect: "follow",
      signal: controller.signal,
    }).finally(() => clearTimeout(timer));
  } catch (err) {
    console.warn(
      "[LeadLog] Could not write to lead sheet:",
      err instanceof Error ? err.message : "unknown error"
    );
  }
}
