import fs from "fs";
import path from "path";

export type LogLevel = "INFO" | "WARN" | "ERROR";

export type LogEventType =
  | "WEBHOOK_RECEIVED"
  | "PAYMENT_VERIFIED"
  | "DELIVERY_QUEUED"
  | "DELIVERY_RETRY_SCHEDULED"
  | "EMAIL_SENT"
  | "EMAIL_FAILED"
  | "DOWNLOAD_CLICKED"
  | "RECONCILIATION_RUN"
  | "ADMIN_ACTION"
  | "ADMIN_ALERT_SENT";

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  event: LogEventType;
  order_id?: string;
  payment_id?: string;
  customer_email?: string;
  details?: Record<string, any>;
}

const LOGS_DIR = path.join(process.cwd(), "storage", "logs");
const LOG_FILE = path.join(LOGS_DIR, "delivery.log");
const MAX_LOG_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB rotation

function ensureLogsDir(): void {
  if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
  }
}

/**
 * Appends a structured log entry to console and local disk log.
 */
export function logEvent(
  level: LogLevel,
  event: LogEventType,
  data: {
    order_id?: string;
    payment_id?: string;
    customer_email?: string;
    details?: Record<string, any>;
  }
): void {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    event,
    order_id: data.order_id,
    payment_id: data.payment_id,
    customer_email: data.customer_email,
    details: data.details,
  };

  const line = JSON.stringify(entry);

  // Console output
  const prefix = `[${entry.timestamp}] [${level}] [${event}]`;
  if (level === "ERROR") {
    console.error(`${prefix} Order: ${entry.order_id || "n/a"} -`, entry.details || "");
  } else if (level === "WARN") {
    console.warn(`${prefix} Order: ${entry.order_id || "n/a"} -`, entry.details || "");
  } else {
    console.log(`${prefix} Order: ${entry.order_id || "n/a"}`);
  }

  // Persistent file output
  try {
    ensureLogsDir();
    // Rotate log if it exceeds 5 MB
    if (fs.existsSync(LOG_FILE)) {
      const stat = fs.statSync(LOG_FILE);
      if (stat.size > MAX_LOG_SIZE_BYTES) {
        const backupFile = path.join(LOGS_DIR, `delivery.${Date.now()}.log`);
        fs.renameSync(LOG_FILE, backupFile);
      }
    }
    fs.appendFileSync(LOG_FILE, line + "\n", "utf-8");
  } catch (err) {
    console.error("Failed to append to delivery log file:", err);
  }
}

export const logger = {
  webhookReceived: (data: { event: string; paymentId?: string; orderId?: string; notes?: any }) =>
    logEvent("INFO", "WEBHOOK_RECEIVED", {
      order_id: data.orderId,
      payment_id: data.paymentId,
      details: { event: data.event, notes: data.notes },
    }),

  paymentVerified: (data: { orderId: string; paymentId: string; amount: number; email: string; source: string }) =>
    logEvent("INFO", "PAYMENT_VERIFIED", {
      order_id: data.orderId,
      payment_id: data.paymentId,
      customer_email: data.email,
      details: { amount: data.amount, source: data.source },
    }),

  deliveryQueued: (data: { orderId: string; email: string; attempt: number }) =>
    logEvent("INFO", "DELIVERY_QUEUED", {
      order_id: data.orderId,
      customer_email: data.email,
      details: { attempt: data.attempt },
    }),

  deliveryRetryScheduled: (data: { orderId: string; email: string; attempt: number; nextRetryInSec: number; error: string }) =>
    logEvent("WARN", "DELIVERY_RETRY_SCHEDULED", {
      order_id: data.orderId,
      customer_email: data.email,
      details: { attempt: data.attempt, nextRetryInSec: data.nextRetryInSec, error: data.error },
    }),

  emailSent: (data: { orderId: string; email: string; messageId?: string; durationMs?: number }) =>
    logEvent("INFO", "EMAIL_SENT", {
      order_id: data.orderId,
      customer_email: data.email,
      details: { messageId: data.messageId, durationMs: data.durationMs },
    }),

  emailFailed: (data: { orderId: string; email: string; attempt: number; error: string; final: boolean }) =>
    logEvent(data.final ? "ERROR" : "WARN", "EMAIL_FAILED", {
      order_id: data.orderId,
      customer_email: data.email,
      details: { attempt: data.attempt, error: data.error, final: data.final },
    }),

  downloadClicked: (data: { orderId: string; file: string; ip: string; userAgent: string; isScanner: boolean; downloadCount: number }) =>
    logEvent("INFO", "DOWNLOAD_CLICKED", {
      order_id: data.orderId,
      details: {
        file: data.file,
        ip: data.ip,
        userAgent: data.userAgent.slice(0, 100),
        isScanner: data.isScanner,
        downloadCount: data.downloadCount,
      },
    }),

  reconciliationRun: (data: { checked: number; recovered: number; errors: number }) =>
    logEvent("INFO", "RECONCILIATION_RUN", {
      details: data,
    }),

  adminAlertSent: (data: { orderId: string; reason: string; email: string; phone?: string }) =>
    logEvent("WARN", "ADMIN_ALERT_SENT", {
      order_id: data.orderId,
      customer_email: data.email,
      details: data,
    }),
};

