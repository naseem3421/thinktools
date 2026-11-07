import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendOrderDeliveryEmail } from "@/lib/mailer";
import { PRODUCTS, ADDON_PRODUCTS } from "@/data/products";
import { logCheckoutLead } from "@/lib/leadLog";
import {
  claimEmailDelivery,
  claimSheetSync,
  dispatchCapiPurchaseWithIdempotency,
} from "@/lib/orderStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Validates HMAC-SHA256 signature against a secret.
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
    service: "Thinktools Razorpay Webhook Service",
    timestamp: new Date().toISOString(),
  });
}

/**
 * POST handler: Authoritative Server-to-Server Webhook from Razorpay
 * 
 * Ensures 100% guaranteed delivery for customers paying via Google Pay, UPI, or Netbanking
 * who may close their mobile browser or experience network disconnection before the client
 * redirect returns to /api/verify-payment.
 */
export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Verify signature against RAZORPAY_WEBHOOK_SECRET (if configured) or RAZORPAY_KEY_SECRET
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
    console.log(`[Razorpay Webhook] Received authentic event: ${eventType} (ID: ${eventData.id || "n/a"})`);

    // Failed payments: mark the lead row as Failed so it can be followed up manually
    if (eventType === "payment.failed") {
      const failed = eventData.payload?.payment?.entity || {};
      if (failed.order_id) {
        await logCheckoutLead({
          orderId: failed.order_id,
          status: "Failed",
          paymentId: failed.id,
          note: failed.error_description || failed.error_reason || "",
        });
      }
      return NextResponse.json({ status: "ok", message: "Failed payment logged." });
    }

    // We process successful payment and order fulfillment events
    const supportedEvents = ["payment.captured", "order.paid"];
    if (!supportedEvents.includes(eventType)) {
      // Return 200 OK for other events (e.g. payment.failed, refund.created) so Razorpay doesn't retry
      return NextResponse.json({
        status: "ignored",
        message: `Event '${eventType}' acknowledged and ignored.`,
      });
    }

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

    const customerEmail =
      notes.customer_email ||
      notes.email ||
      payment.email ||
      order.email ||
      "";

    const customerName =
      notes.customer_name ||
      notes.name ||
      payment.notes?.customer_name ||
      "Valued Builder";

    const customerPhone =
      notes.customer_phone ||
      notes.phone ||
      payment.contact ||
      order.contact ||
      "";

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

    // Safety fallback: If customer paid ₹499 (49900 paise), they purchased the 3-addon VIP bundle
    if (amountPaise >= 49900 && validAddonIds.length === 0) {
      validAddonIds = Object.keys(ADDON_PRODUCTS);
    }

    // Compute title and price
    const productObj = PRODUCTS[productSlug];
    const basePrice = productObj ? productObj.price : 299;
    const addonsTotal = validAddonIds.reduce((sum: number, id: string) => sum + (ADDON_PRODUCTS[id]?.price || 0), 0);
    const isBundleApplied = validAddonIds.length === Object.keys(ADDON_PRODUCTS).length;
    const bundleDiscount = isBundleApplied ? 97 : 0;
    const totalPriceInRupees = amountPaise > 0 ? Math.round(amountPaise / 100) : (basePrice + addonsTotal - bundleDiscount);

    const productTitle = productObj?.title || "Construction Calculator Pro";
    const fullOrderTitle = validAddonIds.length
      ? `${productTitle} + ${validAddonIds.length} Add-on${validAddonIds.length > 1 ? "s" : ""}`
      : productTitle;

    const primaryKey = orderId || paymentId;

    // 1. Claim Email Delivery (Atomic file lock prevents race conditions with client callback)
    const shouldSendEmail = await claimEmailDelivery(primaryKey, {
      paymentId,
      email: customerEmail,
      name: customerName,
      addonIds: validAddonIds,
      amount: totalPriceInRupees,
      productSlug,
    });

    if (shouldSendEmail && customerEmail) {
      console.log(`[Razorpay Webhook] Dispathing automated delivery email to: ${customerEmail} (Order: ${primaryKey})`);
      try {
        await sendOrderDeliveryEmail({
          toEmail: customerEmail,
          customerName,
          orderId: primaryKey,
          paymentId: paymentId || primaryKey,
          productTitle: fullOrderTitle,
          addonIds: validAddonIds,
        });
        console.log(`[Razorpay Webhook] Delivery email sent successfully to ${customerEmail}`);
      } catch (emailErr) {
        console.error(`[Razorpay Webhook] Email dispatch error for ${customerEmail}:`, emailErr);
      }
    } else {
      console.log(`[Razorpay Webhook] Order ${primaryKey} email already fulfilled or missing email. Duplicate suppressed.`);
    }

    // 2. Claim Google Sheet Sync
    const sheetWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (sheetWebhookUrl) {
      const shouldSyncSheet = await claimSheetSync(primaryKey);
      if (shouldSyncSheet) {
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
          console.log(`[Razorpay Webhook] Successfully synced order ${primaryKey} to Google Sheet.`);
        } catch (sheetErr) {
          console.error(`[Razorpay Webhook] Google Sheet sync error for ${primaryKey}:`, sheetErr);
        }
      }
    }

    // 2b. Mark the lead row as Paid (idempotent: updates the row by order ID)
    await logCheckoutLead({
      orderId: primaryKey,
      status: "Paid",
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      product: fullOrderTitle,
      amountInr: totalPriceInRupees,
      paymentId,
    });

    // 3. Dispatch Meta CAPI Purchase (Idempotent: only fires if not already sent by client verify)
    try {
      const capiResult = await dispatchCapiPurchaseWithIdempotency({
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
      if (capiResult.alreadySent) {
        console.log(`[Razorpay Webhook] Meta CAPI Purchase was already dispatched by client for ${primaryKey}.`);
      } else if (capiResult.success) {
        console.log(`[Razorpay Webhook] Meta CAPI Purchase dispatched successfully for ${primaryKey}.`);
      }
    } catch (capiErr) {
      console.error(`[Razorpay Webhook] Meta CAPI error for ${primaryKey}:`, capiErr);
    }

    return NextResponse.json({
      status: "ok",
      order_id: primaryKey,
      payment_id: paymentId,
      email_dispatched: shouldSendEmail,
    });
  } catch (error: unknown) {
    console.error("[Razorpay Webhook] Uncaught handler error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error handling webhook." },
      { status: 500 }
    );
  }
}

