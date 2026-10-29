import fs from "fs";
import path from "path";
import { sendMetaCapiEvent, CapiUserData } from "./metaCapi";

export interface OrderRecord {
  id: string;
  amount: number;
  currency: string;
  status: "created" | "paid" | "failed";
  capi_purchase_sent: boolean;
  capi_sent_at?: number;
  created_at: number;
  updated_at: number;
}

const ORDERS_DIR = path.join(process.cwd(), "storage", "orders");
const MAX_LOCK_AGE_MS = 30000; // 30-second stale lock expiration

function ensureOrdersDir(): void {
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
 * Acquires an exclusive file-based lock for an order ID.
 * Uses atomic OS flag 'wx' to prevent race conditions across concurrent processes/requests.
 */
function acquireLock(orderId: string): boolean {
  ensureOrdersDir();
  const lockFile = getLockFilePath(orderId);

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
    // Ignore stat failures
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
function releaseLock(orderId: string): void {
  const lockFile = getLockFilePath(orderId);
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
  const filePath = getOrderFilePath(orderId);
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
  const filePath = getOrderFilePath(order.id);
  const tempPath = `${filePath}.tmp.${Date.now()}.${Math.random().toString(36).substring(2, 8)}`;
  order.updated_at = Date.now();
  fs.writeFileSync(tempPath, JSON.stringify(order, null, 2), "utf-8");
  fs.renameSync(tempPath, filePath);
}

/**
 * Initializes an order record with capi_purchase_sent: false if it doesn't already exist.
 */
export function initOrder(orderId: string, initialData: Partial<OrderRecord> = {}): OrderRecord {
  ensureOrdersDir();
  const existing = getOrder(orderId);
  if (existing) {
    return existing;
  }
  const now = Date.now();
  const record: OrderRecord = {
    id: orderId,
    amount: initialData.amount ?? 0,
    currency: initialData.currency ?? "INR",
    status: initialData.status ?? "created",
    capi_purchase_sent: false,
    created_at: now,
    updated_at: now,
  };
  saveOrder(record);
  return record;
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
 * 
 * Guarantees:
 * 1. Checks order.capi_purchase_sent before sending.
 * 2. Uses atomic lock to block concurrent webhooks and verify calls from duplicate firing.
 * 3. Sends event_id = String(orderId).
 * 4. Only marks capi_purchase_sent = true AFTER Meta API confirms HTTP success.
 * 5. Does NOT mark as sent if Meta call fails, permitting retries.
 */
export async function dispatchCapiPurchaseWithIdempotency(
  params: DispatchCapiPurchaseParams
): Promise<CapiDispatchResult> {
  const { orderId } = params;

  // Step 1: Fast initial check
  let order = getOrder(orderId);
  if (order?.capi_purchase_sent) {
    return { success: true, alreadySent: true };
  }

  // Step 2: Acquire atomic lock (retry with brief backoff for near-simultaneous triggers)
  let acquired = false;
  for (let attempt = 0; attempt < 4; attempt++) {
    if (acquireLock(orderId)) {
      acquired = true;
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 100 * (attempt + 1)));
  }

  if (!acquired) {
    // If lock could not be obtained, check if concurrent process just finished sending
    order = getOrder(orderId);
    if (order?.capi_purchase_sent) {
      return { success: true, alreadySent: true };
    }
    return { success: false, alreadySent: false, reason: "Lock acquisition failed" };
  }

  try {
    // Step 3: Re-read state under exclusive lock
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

    // Step 4: Dispatch CAPI Purchase with event_id matching String(order.id)
    const success = await sendMetaCapiEvent({
      eventName: "Purchase",
      eventId: String(orderId),
      user: params.user,
      customData: {
        value: params.amount,
        currency: params.currency || "INR",
        content_name: params.fullOrderTitle,
        content_ids: params.contentIds,
        content_type: "product",
        order_id: String(orderId),
      },
      eventSourceUrl: params.eventSourceUrl || `https://thinktools.in/p/${params.productSlug}/download`,
    });

    // Step 5: Mark sent only upon verified success
    if (success) {
      order.status = "paid";
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

