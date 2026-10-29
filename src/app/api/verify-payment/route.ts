import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendOrderDeliveryEmail } from "@/lib/mailer";
import { PRODUCTS, ADDON_PRODUCTS } from "@/data/products";
import { extractMetaCookies } from "@/lib/metaCapi";
import { generateDownloadToken } from "@/lib/downloadToken";
import { dispatchCapiPurchaseWithIdempotency } from "@/lib/orderStore";

// In-memory cache of processed payment IDs to prevent duplicate fulfillment on rapid retries within the same node process
const processedPayments = new Set<string>();

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

    // Idempotency check: prevent duplicate fulfillment on network retry
    const isFirstFulfillment = !processedPayments.has(razorpay_payment_id);
    if (isFirstFulfillment) {
      processedPayments.add(razorpay_payment_id);
      // Bound the set size to prevent memory leaks over time
      if (processedPayments.size > 10000) {
        const first = processedPayments.values().next().value;
        if (first) processedPayments.delete(first);
      }
    }

    // Automatically sync transaction to Google Sheet Webhook if configured (only on first fulfillment)
    const sheetWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (sheetWebhookUrl && isFirstFulfillment) {
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
                  email: body.customer_email || "",
                  contact: body.customer_phone || "",
                  notes: {
                    product_title: fullOrderTitle,
                    product_slug: productSlug,
                    addon_ids: validAddonIds.join(","),
                    addon_titles: validAddonIds.map((id) => ADDON_PRODUCTS[id].title).join(", "),
                    customer_name: body.customer_name || "",
                    customer_email: body.customer_email || "",
                    customer_phone: body.customer_phone || "",
                  },
                },
              },
            },
          }),
        });
      } catch (sheetError) {
        console.error("Failed to forward transaction to Google Sheet webhook:", sheetError);
      }
    }

    // Automatically dispatch instant digital delivery email with attachment (only on first fulfillment)
    const recipientEmail = body.customer_email || body.email;
    if (recipientEmail && isFirstFulfillment) {
      sendOrderDeliveryEmail({
        toEmail: recipientEmail,
        customerName: body.customer_name || body.name || "Valued Builder",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        productTitle: fullOrderTitle,
        addonIds: validAddonIds,
      }).catch((emailErr) => {
        console.error("Async email delivery error:", emailErr);
      });
    }

    // Single authoritative CAPI Purchase dispatch with persistent atomic idempotency
    // Checks order.capi_purchase_sent before sending; sets to true after successful send.
    // Event ID is strictly String(razorpay_order_id) matching browser pixel eventID.
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      undefined;
    const userAgent = request.headers.get("user-agent") || undefined;
    const { fbp, fbc } = extractMetaCookies(request.headers.get("cookie"));

    try {
      const capiResult = await dispatchCapiPurchaseWithIdempotency({
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
        },
        eventSourceUrl: `https://thinktools.in/p/${productSlug}/download`,
      });

      if (!capiResult.success && !capiResult.alreadySent) {
        console.warn(`[CAPI] Order ${razorpay_order_id} CAPI dispatch warning: ${capiResult.reason || "unknown"}`);
      }
    } catch (capiError) {
      // Do not log PII or access tokens
      console.error(
        `[CAPI] Exception during CAPI dispatch execution for order ${razorpay_order_id}:`,
        capiError instanceof Error ? capiError.message : "unknown"
      );
    }

    // Generate cryptographically signed, 3-hour time-limited download token
    const downloadToken = generateDownloadToken({
      order_id: razorpay_order_id,
      addon_ids: validAddonIds,
      product_slug: productSlug,
      hoursValid: 3,
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
