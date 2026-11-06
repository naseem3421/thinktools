import fs from "fs";
import path from "path";
import { sendMetaCapiEvent, CapiUserData } from "./metaCapi";
import { normalizeEmail } from "./emailValidation";

export type OrderStatus =
  | "pending"           // Created at checkout, awaiting payment
  | "paid"              // Verified & captured by Razorpay webhook
  | "delivery_queued"   // Delivery job scheduled / in-progress
  | "delivery_sent"     // Delivery email confirmed sent
  | "delivery_failed"   // Delivery attempts exhausted / error
  | "payment_failed";   // Gateway notified payment failure

export interface DeliveryAttempt {
  attempt: number;
  timestamp: number;
  success: boolean;
  error?: string;
  messageId?: string;
}

export interface DownloadLog {
  timestamp: number;
  file: string;
  ip: string;
  userAgent: string;
  isScanner: boolean;
}

export interface OrderRecord {
  id: string; // Order ID (e.g. order_xxxx or DIR-xxxx)
  payment_id?: string; // Razorpay payment ID (e.g. pay_xxxx)
  amount: number; // in Rupees
  currency: string; // "INR"
  status: OrderStatus;

  // Customer info
  customer_name: string;
  customer_email: string; // Trimmed, lowercase
  customer_phone?: string;

  // Product info
  product_slug: string;
  product_title: string;
  addon_ids: string[];
  full_order_title: string;

  // Delivery state machine
  delivery_attempts: number;
  max_delivery_attempts: number; // default: 4
  next_retry_at?: number | null;
  last_delivery_error?: string | null;
  delivery_sent_at?: number | null;
  delivery_message_id?: string | null;
  delivery_history: DeliveryAttempt[];

  // Download security & quotas (min 5 allowed, default 10)
  download_token?: string;
  token_expires_at?: number;
  download_count: number;
  max_downloads: number;
  download_logs: DownloadLog[];

  // Meta Conversions API & Google Sheets
  capi_purchase_sent: boolean;
  capi_sent_at?: number;
  sheet_synced: boolean;
  sheet_synced_at?: number;

  // Timestamps
  created_at: number;
  updated_at: number;
  paid_at?: number;
}

const ORDERS_DIR = path.join(process.cwd(), "storage", "orders");
const MAX_LOCK_AGE_MS = 30000; // 30-second stale lock expiration

export function ensureOrdersDir(): void {
  if (!fs.existsSync(ORDERS_DIR)) {
    fs.mkdirSync(ORDERS_DIR, { recursive: true });
  }
}

function getOrderFilePath(orderId: string): string {
  const safeId = orderId.replace(/[^a-zA-Z0-9_-]/g, "");
  return path.join(ORDERS_DIR, `${safeId}.json`);
}

function getLockFilePath(orderId: string): string {
  const safeId = orderId.replace(/[^a-zA-Z0-9_-]/g, "");
  return path.join(ORDERS_DIR, `${safeId}.lock`);
}

/**
 * Acquires an exclusive file-based lock for an order ID using atomic OS flag 'wx'.
 */
export function acquireLock(orderId: string): boolean {
  ensureOrdersDir();
  const safeId = orderId.replace(/[^a-zA-Z0-9_-]/g, "");
  if (!safeId) return false;
  const lockFile = getLockFilePath(safeId);

  // Clear stale lock if prior process crashed or timed out
  try {
    if (fs.existsSync(lockFile)) {
      const stats = fs.statSync(lockFile);
      if (Date.now() - stats.mtimeMs > MAX_LOCK_AGE_MS) {
        try {
          fs.unlinkSync(lockFile);
        } catch {
          // Ignore concurrent unlink
        }
      }
    }
  } catch {
    // Ignore stat errors
  }

  try {
    const fd = fs.openSync(lockFile, "wx");
    fs.writeSync(fd, `${process.pid}\n${Date.now()}`);
    fs.closeSync(fd);
    return true;
  } catch {
    return false;
  }
}

/**
 * Releases the exclusive file lock.
 */
export function releaseLock(orderId: string): void {
  const safeId = orderId.replace(/[^a-zA-Z0-9_-]/g, "");
  if (!safeId) return;
  const lockFile = getLockFilePath(safeId);
  try {
    if (fs.existsSync(lockFile)) {
      fs.unlinkSync(lockFile);
    }
  } catch {
    // Ignore unlock errors
  }
}

/**
 * Reads an order record from persistent storage.
 */
export function getOrder(orderId: string): OrderRecord | null {
  ensureOrdersDir();
  const safeId = orderId ? orderId.replace(/[^a-zA-Z0-9_-]/g, "") : "";
  if (!safeId) return null;

  const filePath = getOrderFilePath(safeId);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as OrderRecord;
  } catch {
    return null;
  }
}

/**
 * Atomically writes an order record to disk via a temp file replace.
 */
export function saveOrder(order: OrderRecord): void {
  ensureOrdersDir();
  const safeId = order.id.replace(/[^a-zA-Z0-9_-]/g, "");
  const filePath = getOrderFilePath(safeId);
  const tempPath = `${filePath}.tmp.${Date.now()}.${Math.random().toString(36).substring(2, 8)}`;
  order.updated_at = Date.now();
  fs.writeFileSync(tempPath, JSON.stringify(order, null, 2), "utf-8");
  fs.renameSync(tempPath, filePath);
}

/**
 * Initializes or updates an order record.
 */
export function initOrder(orderId: string, initialData: Partial<OrderRecord> = {}): OrderRecord {
  ensureOrdersDir();
  const safeId = orderId.replace(/[^a-zA-Z0-9_-]/g, "");
  const existing = getOrder(safeId);
  if (existing) {
    return existing;
  }
  const now = Date.now();
  const record: OrderRecord = {
    id: safeId,
    payment_id: initialData.payment_id,
    amount: initialData.amount ?? 0,
    currency: initialData.currency ?? "INR",
    status: initialData.status ?? "pending",
    customer_name: initialData.customer_name || "Valued Builder",
    customer_email: normalizeEmail(initialData.customer_email || ""),
    customer_phone: initialData.customer_phone || "",
    product_slug: initialData.product_slug || "construction-calculator-pro",
    product_title: initialData.product_title || "Construction Calculator Pro",
    addon_ids: initialData.addon_ids || [],
    full_order_title: initialData.full_order_title || "Construction Calculator Pro",
    delivery_attempts: 0,
    max_delivery_attempts: 4,
    delivery_history: [],
    download_count: 0,
    max_downloads: 10, // Requirement 6: multiple downloads (min. 5)
    download_logs: [],
    capi_purchase_sent: false,
    sheet_synced: false,
    created_at: now,
    updated_at: now,
  };
  saveOrder(record);
  return record;
}

/**
 * Finds an order by customer email or Razorpay payment ID.
 */
export function findOrders(filter: {
  email?: string;
  paymentId?: string;
  status?: OrderStatus;
}): OrderRecord[] {
  ensureOrdersDir();
  const results: OrderRecord[] = [];
  try {
    const files = fs.readdirSync(ORDERS_DIR);
    const targetEmail = filter.email ? normalizeEmail(filter.email) : undefined;
    const targetPayment = filter.paymentId?.trim();

    for (const file of files) {
      if (!file.endsWith(".json")) continue;
      try {
        const content = fs.readFileSync(path.join(ORDERS_DIR, file), "utf-8");
        const order = JSON.parse(content) as OrderRecord;

        let match = true;
        if (targetEmail && normalizeEmail(order.customer_email) !== targetEmail) {
          match = false;
        }
        if (targetPayment && order.payment_id !== targetPayment) {
          match = false;
        }
        if (filter.status && order.status !== filter.status) {
          match = false;
        }

        if (match) {
          results.push(order);
        }
      } catch {
        // Skip unreadable files
      }
    }
  } catch (err) {
    console.error("Error reading orders directory in findOrders:", err);
  }

  // Sort latest first
  return results.sort((a, b) => b.created_at - a.created_at);
}

/**
 * Lists all orders sorted latest first, with optional status and limit filters.
 */
export function listAllOrders(options?: { status?: OrderStatus; limit?: number }): OrderRecord[] {
  ensureOrdersDir();
  const results: OrderRecord[] = [];
  try {
    const files = fs.readdirSync(ORDERS_DIR);
    for (const file of files) {
      if (!file.endsWith(".json")) continue;
      try {
        const content = fs.readFileSync(path.join(ORDERS_DIR, file), "utf-8");
        const order = JSON.parse(content) as OrderRecord;
        if (options?.status && order.status !== options.status) {
          continue;
        }
        results.push(order);
      } catch {
        // Ignore malformed files
      }
    }
  } catch (err) {
    console.error("Error listing all orders:", err);
  }

  results.sort((a, b) => b.created_at - a.created_at);
  if (options?.limit && options.limit > 0) {
    return results.slice(0, options.limit);
  }
  return results;
}

/**
 * Transitions an order to 'paid' status authoritatively.
 * Returns true if this call transitioned it (first paid event), false if already paid.
 */
export function markOrderPaid(
  orderId: string,
  details: {
    paymentId: string;
    amount?: number;
    email?: string;
    name?: string;
    phone?: string;
    productSlug?: string;
    productTitle?: string;
    addonIds?: string[];
    fullOrderTitle?: string;
  }
): { order: OrderRecord; isFirstTransition: boolean } {
  let order = getOrder(orderId);
  const now = Date.now();

  if (!order) {
    order = initOrder(orderId, {
      payment_id: details.paymentId,
      amount: details.amount,
      customer_email: details.email,
      customer_name: details.name,
      customer_phone: details.phone,
      product_slug: details.productSlug,
      product_title: details.productTitle,
      addon_ids: details.addonIds,
      full_order_title: details.fullOrderTitle,
      status: "paid",
    });
    order.paid_at = now;
    saveOrder(order);
    return { order, isFirstTransition: true };
  }

  const isFirstTransition = order.status === "pending" || !order.paid_at;

  order.status = "paid";
  order.payment_id = details.paymentId || order.payment_id;
  if (!order.paid_at) order.paid_at = now;
  if (details.amount && details.amount > 0) order.amount = details.amount;
  if (details.email) order.customer_email = normalizeEmail(details.email);
  if (details.name) order.customer_name = details.name;
  if (details.phone) order.customer_phone = details.phone;
  if (details.addonIds && details.addonIds.length > 0) order.addon_ids = details.addonIds;
  if (details.productSlug) order.product_slug = details.productSlug;
  if (details.fullOrderTitle) order.full_order_title = details.fullOrderTitle;

  saveOrder(order);
  return { order, isFirstTransition };
}

/**
 * Marks an order as payment_failed with error details.
 */
export function markOrderPaymentFailed(orderId: string, errorReason: string): OrderRecord {
  let order = getOrder(orderId);
  if (!order) {
    order = initOrder(orderId, { status: "payment_failed" });
  }
  order.status = "payment_failed";
  order.last_delivery_error = errorReason;
  saveOrder(order);
  return order;
}

/**
 * Records a customer download attempt, with anti-scanner defense and download quota tracking.
 * Scanners (HEAD requests, security bots) DO NOT consume the download quota.
 */
export function recordDownloadAccess(
  orderId: string,
  data: { file: string; ip: string; userAgent: string; isScanner: boolean }
): { allowed: boolean; remainingDownloads: number; reason?: string } {
  const order = getOrder(orderId);
  if (!order) {
    return { allowed: true, remainingDownloads: 10 }; // Fallback for direct token downloads
  }

  // If scanner or preview bot, allow stream but DO NOT increment quota
  if (data.isScanner) {
    return { allowed: true, remainingDownloads: Math.max(0, order.max_downloads - order.download_count) };
  }

  // Real human download: Check quota
  if (order.download_count >= order.max_downloads) {
    return {
      allowed: false,
      remainingDownloads: 0,
      reason: `Download limit of ${order.max_downloads} downloads reached. Please visit https://thinktools.in/resend to regenerate access.`,
    };
  }

  order.download_count += 1;
  order.download_logs = order.download_logs || [];
  order.download_logs.push({
    timestamp: Date.now(),
    file: data.file,
    ip: data.ip,
    userAgent: data.userAgent.slice(0, 100),
    isScanner: false,
  });

  saveOrder(order);
  return {
    allowed: true,
    remainingDownloads: Math.max(0, order.max_downloads - order.download_count),
  };
}

/**
 * Resets download limit for an order (used by Resend page and Admin portal).
 */
export function resetDownloadLimit(orderId: string): OrderRecord | null {
  const order = getOrder(orderId);
  if (!order) return null;
  order.download_count = 0;
  saveOrder(order);
  return order;
}

export interface DispatchCapiPurchaseParams {
  orderId: string;
  amount: number;
  currency: string;
  productSlug: string;
  fullOrderTitle: string;
  contentIds: string[];
  user: CapiUserData;
  eventSourceUrl?: string;
}

export interface CapiDispatchResult {
  success: boolean;
  alreadySent: boolean;
  reason?: string;
}

/**
 * Executes a CAPI Purchase event dispatch with atomic check-and-set idempotency.
 */
export async function dispatchCapiPurchaseWithIdempotency(
  params: DispatchCapiPurchaseParams
): Promise<CapiDispatchResult> {
  const { orderId } = params;

  let order = getOrder(orderId);
  if (order?.capi_purchase_sent) {
    return { success: true, alreadySent: true };
  }

  let acquired = false;
  for (let attempt = 0; attempt < 4; attempt++) {
    if (acquireLock(orderId)) {
      acquired = true;
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 80 * (attempt + 1)));
  }

  if (!acquired) {
    order = getOrder(orderId);
    if (order?.capi_purchase_sent) {
      return { success: true, alreadySent: true };
    }
    return { success: false, alreadySent: false, reason: "Lock acquisition failed" };
  }

  try {
    order = getOrder(orderId);
    if (!order) {
      order = initOrder(orderId, {
        amount: params.amount,
        currency: params.currency,
        status: "paid",
      });
    }

    if (order.capi_purchase_sent) {
      return { success: true, alreadySent: true };
    }

    const eventId = `purchase_${String(orderId).trim()}`;
    const numItems = params.contentIds && params.contentIds.length > 0 ? params.contentIds.length : 1;

    const success = await sendMetaCapiEvent({
      eventName: "Purchase",
      eventId,
      user: params.user,
      customData: {
        value: params.amount,
        currency: params.currency || "INR",
        content_name: params.fullOrderTitle,
        content_ids: params.contentIds,
        content_type: "product",
        num_items: numItems,
        order_id: String(orderId),
      },
      eventSourceUrl: params.eventSourceUrl || `https://thinktools.in/p/${params.productSlug}/download`,
    });

    if (success) {
      order.capi_purchase_sent = true;
      order.capi_sent_at = Date.now();
      saveOrder(order);
      return { success: true, alreadySent: false };
    } else {
      return { success: false, alreadySent: false, reason: "Meta Graph API dispatch rejected or failed" };
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    return { success: false, alreadySent: false, reason: errorMsg };
  } finally {
    releaseLock(orderId);
  }
}
