import { NextResponse } from "next/server";
import crypto from "crypto";
import { PRODUCTS, ADDON_PRODUCTS } from "@/data/products";
import { extractMetaCookies } from "@/lib/metaCapi";
import { generateDownloadToken } from "@/lib/downloadToken";
import {
  markOrderPaid,
  getOrder,
  dispatchCapiPurchaseWithIdempotency,
} from "@/lib/orderStore";
import { queueOrderDelivery } from "@/lib/deliveryQueue";
import { logger } from "@/lib/logger";
import { normalizeEmail } from "@/lib/emailValidation";

export async function POST(request: Request) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return NextResponse.json(
        { success: false, message: "Razorpay secret key is not configured on the server." },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required payment parameters: razorpay_order_id, razorpay_payment_id, or razorpay_signature.",
        },
        { status: 400 }
      );
    }

    // Algorithm: HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // Secure timing-safe signature comparison
    const isAuthentic =
      expectedSignature.length === razorpay_signature.length &&
      crypto.timingSafeEqual(
        Buffer.from(expectedSignature, "utf-8"),
        Buffer.from(razorpay_signature, "utf-8")
      );

    if (!isAuthentic) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment verification failed: Signature mismatch.",
        },
        { status: 400 }
      );
    }

    // Authoritative calculation of product + addon total
    const rawAddonIds = Array.isArray(body.addon_ids)
      ? body.addon_ids
      : (typeof body.addon_ids === "string" && body.addon_ids ? body.addon_ids.split(",") : []);

    const idStrings: string[] = Array.from(new Set((rawAddonIds as unknown[]).map((id) => String(id).trim())));
    const validAddonIds: string[] = idStrings.filter((id) => Boolean(ADDON_PRODUCTS[id]));

    const productSlug = body.product_slug || "construction-calculator-pro";
    const productObj = PRODUCTS[productSlug];
    const basePrice = productObj ? productObj.price : 299;
    const addonsTotal = validAddonIds.reduce((sum: number, id: string) => sum + ADDON_PRODUCTS[id].price, 0);
    const isBundleApplied = validAddonIds.length === Object.keys(ADDON_PRODUCTS).length;
    const bundleDiscount = isBundleApplied ? 97 : 0;
    const totalPriceInRupees = basePrice + addonsTotal - bundleDiscount;
    const totalAmountPaise = Math.round(totalPriceInRupees * 100);

    const productTitle = productObj?.title || "Construction Calculator Pro";
    const fullOrderTitle = validAddonIds.length
      ? `${productTitle} + ${validAddonIds.length} Add-on${validAddonIds.length > 1 ? "s" : ""}`
      : productTitle;

    const recipientEmail = normalizeEmail(body.customer_email || body.email || "");

    // 1. Mark Order Paid in authoritative Order Store
    const { order, isFirstTransition } = markOrderPaid(razorpay_order_id, {
      paymentId: razorpay_payment_id,
      amount: totalPriceInRupees,
      email: recipientEmail,
      name: body.customer_name || body.name,
      phone: body.customer_phone || body.phone,
      productSlug,
      productTitle,
      addonIds: validAddonIds,
      fullOrderTitle,
    });

    logger.paymentVerified({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      amount: totalPriceInRupees,
      email: recipientEmail,
      source: "client_verify",
    });

    // 2. Queue Reliable Delivery Job (idempotent, won't duplicate if webhook already delivered)
    await queueOrderDelivery(razorpay_order_id, true);

    // 3. Sync to Google Sheets if configured and first transition
    const sheetWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (sheetWebhookUrl && isFirstTransition && !order.sheet_synced) {
      try {
        await fetch(sheetWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "payment.captured",
            payload: {
              payment: {
                entity: {
                  id: razorpay_payment_id,
                  order_id: razorpay_order_id,
                  amount: totalAmountPaise,
                  method: body.method || "Razorpay / UPI",
                  status: "captured",
                  name: body.customer_name || "Customer",
                  email: recipientEmail,
                  contact: body.customer_phone || "",
                  notes: {
                    product_title: fullOrderTitle,
                    product_slug: productSlug,
                    addon_ids: validAddonIds.join(","),
                    addon_titles: validAddonIds.map((id) => ADDON_PRODUCTS[id].title).join(", "),
                    customer_name: body.customer_name || "",
                    customer_email: recipientEmail,
                    customer_phone: body.customer_phone || "",
                  },
                },
              },
            },
          }),
        });
        order.sheet_synced = true;
        order.sheet_synced_at = Date.now();
      } catch (sheetError) {
        console.error("Failed to forward transaction to Google Sheet webhook:", sheetError);
      }
    }

    // 4. Meta CAPI Purchase Dispatch with Idempotency
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      undefined;
    const userAgent = request.headers.get("user-agent") || undefined;
    const { fbp, fbc, externalId } = extractMetaCookies(request.headers.get("cookie"));

    try {
      await dispatchCapiPurchaseWithIdempotency({
        orderId: razorpay_order_id,
        amount: totalPriceInRupees,
        currency: "INR",
        productSlug,
        fullOrderTitle,
        contentIds: [productSlug, ...validAddonIds],
        user: {
          email: recipientEmail,
          phone: body.customer_phone || body.phone || body.contact,
          name: body.customer_name || body.name,
          ip: clientIp,
          userAgent,
          fbp,
          fbc,
          externalId,
        },
        eventSourceUrl: `https://thinktools.in/p/${productSlug}/download`,
      });
    } catch (capiError) {
      console.error(
        `[CAPI] Exception during CAPI dispatch execution for order ${razorpay_order_id}:`,
        capiError instanceof Error ? capiError.message : "unknown"
      );
    }

    // 5. Generate 7-day signed download token for immediate on-screen access
    const downloadToken = generateDownloadToken({
      order_id: razorpay_order_id,
      addon_ids: validAddonIds,
      product_slug: productSlug,
      hoursValid: 168, // 7 days
    });

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully.",
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
      download_token: downloadToken,
    });
  } catch (error: unknown) {
    console.error("Payment signature verification error:", error);
    const err = error as { message?: string };
    return NextResponse.json(
      {
        success: false,
        message: err?.message || "Internal server error during payment verification.",
      },
      { status: 500 }
    );
  }
}
