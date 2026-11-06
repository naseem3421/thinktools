import { NextResponse } from "next/server";
import crypto from "crypto";
import { PRODUCTS, ADDON_PRODUCTS } from "@/data/products";
import {
  markOrderPaid,
  markOrderPaymentFailed,
  getOrder,
  dispatchCapiPurchaseWithIdempotency,
} from "@/lib/orderStore";
import { queueOrderDelivery } from "@/lib/deliveryQueue";
import { logger } from "@/lib/logger";
import { normalizeEmail } from "@/lib/emailValidation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Validates HMAC-SHA256 signature against secret using timing-safe comparison.
 */
function verifySignature(rawBody: string, signature: string | null, secret: string): boolean {
  if (!signature || !secret) return false;
  try {
    const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
    return (
      expected.length === signature.length &&
      crypto.timingSafeEqual(Buffer.from(expected, "utf-8"), Buffer.from(signature, "utf-8"))
    );
  } catch {
    return false;
  }
}

/**
 * GET handler: Allows health checks and ping validation from dashboard / curl
 */
export async function GET() {
  return NextResponse.json({
    status: "active",
    service: "Thinktools Authoritative Razorpay Webhook Service",
    timestamp: new Date().toISOString(),
  });
}

/**
 * POST handler: Single Source of Truth for Order Payment and Fulfillment.
 * 
 * Never depends on the client browser redirect. Handles:
 * - payment.captured (standard capture)
 * - order.paid (multi-item / full order payment)
 * - payment.authorized (pre-capture / UPI pending state)
 * - payment.failed (payment failure tracking)
 * - Late-confirmed UPI payments (PhonePe / Google Pay delayed confirmations)
 */
export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Verify signature against RAZORPAY_WEBHOOK_SECRET or RAZORPAY_KEY_SECRET
    let isAuthentic = false;
    if (webhookSecret && verifySignature(rawBody, signature, webhookSecret)) {
      isAuthentic = true;
    } else if (keySecret && verifySignature(rawBody, signature, keySecret)) {
      isAuthentic = true;
    }

    if (!isAuthentic) {
      console.warn("[Razorpay Webhook] Rejected: Invalid signature or missing webhook secret.");
      return NextResponse.json(
        { success: false, message: "Invalid webhook signature." },
        { status: 400 }
      );
    }

    let eventData: any;
    try {
      eventData = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    const eventType: string = eventData.event || "";
    const payload = eventData.payload || {};
    const payment = payload.payment?.entity || {};
    const order = payload.order?.entity || {};

    const orderId = payment.order_id || order.id || "";
    const paymentId = payment.id || "";
    const amountPaise = Number(payment.amount || order.amount || 0);

    const notes = {
      ...(order.notes || {}),
      ...(payment.notes || {}),
    };

    logger.webhookReceived({
      event: eventType,
      paymentId,
      orderId,
      notes,
    });

    // Handle Payment Failure Event
    if (eventType === "payment.failed") {
      const errorDescription =
        payment.error_description || payment.error_reason || "Payment was cancelled or failed at bank/UPI gateway.";
      if (orderId) {
        markOrderPaymentFailed(orderId, errorDescription);
      }
      return NextResponse.json({
        status: "ok",
        action: "payment_failed_recorded",
        order_id: orderId,
        payment_id: paymentId,
      });
    }

    // Process Confirmed Payment Events: payment.captured or order.paid
    const isPaymentConfirmed =
      eventType === "payment.captured" ||
      eventType === "order.paid" ||
      (eventType === "payment.authorized" && payment.captured === true);

    if (!isPaymentConfirmed) {
      // Acknowledge and ignore other non-payment events (e.g. refund.created, settlement.processed)
      return NextResponse.json({
        status: "ignored",
        message: `Event '${eventType}' acknowledged and ignored.`,
      });
    }

    const primaryKey = orderId || paymentId;
    if (!primaryKey) {
      return NextResponse.json(
        { success: false, message: "Missing order_id or payment_id in webhook payload." },
        { status: 400 }
      );
    }

    const customerEmail = normalizeEmail(
      notes.customer_email || notes.email || payment.email || order.email || ""
    );

    const customerName =
      notes.customer_name || notes.name || payment.notes?.customer_name || "Valued Builder";

    const customerPhone =
      notes.customer_phone || notes.phone || payment.contact || order.contact || "";

    const productSlug = notes.product_slug || "construction-calculator-pro";

    // Extract valid add-ons
    let validAddonIds: string[] = [];
    if (typeof notes.addon_ids === "string" && notes.addon_ids.trim()) {
      validAddonIds = notes.addon_ids
        .split(",")
        .map((s: string) => s.trim())
        .filter((id: string) => Boolean(ADDON_PRODUCTS[id]));
    } else if (Array.isArray(notes.addon_ids)) {
      validAddonIds = notes.addon_ids
        .map((s: unknown) => String(s).trim())
        .filter((id: string) => Boolean(ADDON_PRODUCTS[id]));
    }

    // VIP Bundle Fallback: ₹499 (49900 paise) maps to all 3 add-on packages
    if (amountPaise >= 49900 && validAddonIds.length === 0) {
      validAddonIds = Object.keys(ADDON_PRODUCTS);
    }

    const productObj = PRODUCTS[productSlug];
    const basePrice = productObj ? productObj.price : 299;
    const addonsTotal = validAddonIds.reduce((sum: number, id: string) => sum + (ADDON_PRODUCTS[id]?.price || 0), 0);
    const isBundleApplied = validAddonIds.length === Object.keys(ADDON_PRODUCTS).length;
    const bundleDiscount = isBundleApplied ? 97 : 0;
    const totalPriceInRupees =
      amountPaise > 0 ? Math.round(amountPaise / 100) : basePrice + addonsTotal - bundleDiscount;

    const productTitle = productObj?.title || "Construction Calculator Pro";
    const fullOrderTitle = validAddonIds.length
      ? `${productTitle} + ${validAddonIds.length} Add-on${validAddonIds.length > 1 ? "s" : ""}`
      : productTitle;

    // Idempotent Check: Is order already paid & delivered?
    const existingOrder = getOrder(primaryKey);
    if (existingOrder && (existingOrder.status === "delivery_sent" || existingOrder.status === "delivery_queued")) {
      logger.paymentVerified({
        orderId: primaryKey,
        paymentId,
        amount: totalPriceInRupees,
        email: customerEmail,
        source: "webhook_duplicate_suppressed",
      });
      return NextResponse.json({
        status: "ok",
        action: "already_processed",
        order_id: primaryKey,
        current_status: existingOrder.status,
      });
    }

    // 1. Mark Order Paid (State Machine: pending -> paid)
    const { order: updatedOrder, isFirstTransition } = markOrderPaid(primaryKey, {
      paymentId,
      amount: totalPriceInRupees,
      email: customerEmail,
      name: customerName,
      phone: customerPhone,
      productSlug,
      productTitle,
      addonIds: validAddonIds,
      fullOrderTitle,
    });

    logger.paymentVerified({
      orderId: primaryKey,
      paymentId,
      amount: totalPriceInRupees,
      email: customerEmail,
      source: "webhook_authoritative",
    });

    // 2. Queue Reliable Delivery Job with Exponential Backoff
    await queueOrderDelivery(primaryKey, true);

    // 3. Sync to Google Sheets (if configured and first transition)
    const sheetWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (sheetWebhookUrl && isFirstTransition && !updatedOrder.sheet_synced) {
      try {
        await fetch(sheetWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "payment.captured",
            payload: {
              payment: {
                entity: {
                  id: paymentId || primaryKey,
                  order_id: orderId || primaryKey,
                  amount: amountPaise,
                  method: payment.method || "Razorpay / Webhook",
                  status: "captured",
                  name: customerName,
                  email: customerEmail,
                  contact: customerPhone,
                  notes: {
                    product_title: fullOrderTitle,
                    product_slug: productSlug,
                    addon_ids: validAddonIds.join(","),
                    addon_titles: validAddonIds.map((id) => ADDON_PRODUCTS[id]?.title).join(", "),
                    customer_name: customerName,
                    customer_email: customerEmail,
                    customer_phone: customerPhone,
                  },
                },
              },
            },
          }),
        });
        updatedOrder.sheet_synced = true;
        updatedOrder.sheet_synced_at = Date.now();
      } catch (sheetErr) {
        console.error(`[Razorpay Webhook] Google Sheet sync error for ${primaryKey}:`, sheetErr);
      }
    }

    // 4. Dispatch Meta CAPI Purchase with Idempotency
    try {
      await dispatchCapiPurchaseWithIdempotency({
        orderId: primaryKey,
        amount: totalPriceInRupees,
        currency: "INR",
        productSlug,
        fullOrderTitle,
        contentIds: [productSlug, ...validAddonIds],
        user: {
          email: customerEmail,
          phone: customerPhone,
          name: customerName,
        },
        eventSourceUrl: `https://thinktools.in/p/${productSlug}/download`,
      });
    } catch (capiErr) {
      console.error(`[Razorpay Webhook] Meta CAPI error for ${primaryKey}:`, capiErr);
    }

    return NextResponse.json({
      status: "ok",
      action: "order_marked_paid_and_queued",
      order_id: primaryKey,
      payment_id: paymentId,
    });
  } catch (error: unknown) {
    console.error("[Razorpay Webhook] Uncaught handler error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error handling webhook." },
      { status: 500 }
    );
  }
}
