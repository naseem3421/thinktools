import Razorpay from "razorpay";
import { listAllOrders, getOrder, markOrderPaid } from "./orderStore";
import { executeDelivery } from "./deliveryQueue";
import { logger } from "./logger";
import { normalizeEmail } from "./emailValidation";
import { ADDON_PRODUCTS, PRODUCTS } from "@/data/products";

export interface ReconciliationResult {
  timestamp: string;
  ordersChecked: number;
  recoveredDeliveries: number;
  errorsCount: number;
  details: string[];
}

/**
 * Authoritative 15-minute reconciliation engine.
 * Scans local storage and queries Razorpay gateway for paid orders that have not been delivered.
 */
export async function runOrderReconciliation(): Promise<ReconciliationResult> {
  const details: string[] = [];
  let ordersChecked = 0;
  let recoveredDeliveries = 0;
  let errorsCount = 0;

  console.log("[Reconciliation] Starting scheduled order delivery reconciliation...");

  // 1. Scan Local Order Store for stranded paid orders
  try {
    const allOrders = listAllOrders({ limit: 100 });
    ordersChecked += allOrders.length;

    for (const order of allOrders) {
      // Find orders that are paid or failed, but never confirmed delivered
      const needsDelivery =
        (order.status === "paid" || order.status === "delivery_failed" || order.status === "delivery_queued") &&
        !order.delivery_sent_at;

      if (needsDelivery) {
        console.log(`[Reconciliation] Found stranded paid order #${order.id} for ${order.customer_email}. Attempting delivery recovery...`);
        try {
          const result = await executeDelivery(order.id);
          if (result.success) {
            recoveredDeliveries++;
            details.push(`Recovered delivery for local order #${order.id} (${order.customer_email})`);
          } else {
            errorsCount++;
            details.push(`Failed to recover order #${order.id}: ${result.error}`);
          }
        } catch (err: any) {
          errorsCount++;
          details.push(`Exception delivering order #${order.id}: ${err?.message || "unknown"}`);
        }
      }
    }
  } catch (err: any) {
    console.error("[Reconciliation] Error scanning local orders:", err);
    errorsCount++;
  }

  // 2. Query Razorpay Payment Gateway directly for captured payments
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (keyId && keySecret) {
    try {
      const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
      // Fetch recent 25 payments
      const payments = await razorpay.payments.all({ count: 25 });
      const items = (payments as any).items || [];

      for (const p of items) {
        if (p.status !== "captured") continue;

        const orderId = p.order_id || p.id;
        const existingOrder = getOrder(orderId);

        // If order doesn't exist or is not marked as delivered
        if (!existingOrder || existingOrder.status !== "delivery_sent") {
          console.log(`[Reconciliation] Gateway payment ${p.id} (Order: ${orderId}) is captured but not delivered. Fulfilling now...`);

          const notes = p.notes || {};
          const customerEmail = normalizeEmail(notes.customer_email || notes.email || p.email || "");
          const customerName = notes.customer_name || notes.name || "Valued Builder";
          const customerPhone = notes.customer_phone || p.contact || "";
          const productSlug = notes.product_slug || "construction-calculator-pro";

          let validAddonIds: string[] = [];
          if (typeof notes.addon_ids === "string" && notes.addon_ids.trim()) {
            validAddonIds = notes.addon_ids.split(",").map((s: string) => s.trim()).filter((id: string) => Boolean(ADDON_PRODUCTS[id]));
          }
          if (p.amount >= 49900 && validAddonIds.length === 0) {
            validAddonIds = Object.keys(ADDON_PRODUCTS);
          }

          const productObj = PRODUCTS[productSlug];
          const productTitle = productObj?.title || "Construction Calculator Pro";
          const fullOrderTitle = validAddonIds.length
            ? `${productTitle} + ${validAddonIds.length} Add-on${validAddonIds.length > 1 ? "s" : ""}`
            : productTitle;

          // Mark paid in state machine
          markOrderPaid(orderId, {
            paymentId: p.id,
            amount: Math.round(p.amount / 100),
            email: customerEmail,
            name: customerName,
            phone: customerPhone,
            productSlug,
            productTitle,
            addonIds: validAddonIds,
            fullOrderTitle,
          });

          // Execute delivery immediately
          try {
            const result = await executeDelivery(orderId);
            if (result.success) {
              recoveredDeliveries++;
              details.push(`Recovered gateway payment ${p.id} for order #${orderId} (${customerEmail})`);
            } else {
              errorsCount++;
              details.push(`Gateway recovery failed for ${p.id}: ${result.error}`);
            }
          } catch (delErr: any) {
            errorsCount++;
            details.push(`Gateway exception for ${p.id}: ${delErr?.message}`);
          }
        }
      }
    } catch (gatewayErr: any) {
      console.error("[Reconciliation] Error querying Razorpay gateway payments:", gatewayErr);
    }
  }

  logger.reconciliationRun({
    checked: ordersChecked,
    recovered: recoveredDeliveries,
    errors: errorsCount,
  });

  console.log(`[Reconciliation] Finished. Checked: ${ordersChecked}, Recovered: ${recoveredDeliveries}, Errors: ${errorsCount}`);

  return {
    timestamp: new Date().toISOString(),
    ordersChecked,
    recoveredDeliveries,
    errorsCount,
    details,
  };
}

