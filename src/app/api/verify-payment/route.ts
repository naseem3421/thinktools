import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendOrderDeliveryEmail } from "@/lib/mailer";
import { PRODUCTS } from "@/data/products";
import { sendMetaCapiEvent, extractMetaCookies } from "@/lib/metaCapi";

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

    // Automatically sync transaction to Google Sheet Webhook if configured
    const sheetWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (sheetWebhookUrl) {
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
                  amount: (() => {
                    const productSlug = body.product_slug || "construction-calculator-pro";
                    const p = PRODUCTS[productSlug];
                    return p ? Math.round(p.price * 100) : (Number(body.amount) || 49900);
                  })(),
                  method: body.method || "Razorpay / UPI",
                  status: "captured",
                  name: body.customer_name || "Customer",
                  email: body.customer_email || "",
                  contact: body.customer_phone || "",
                  notes: {
                    product_title: body.product_title || "Construction Calculator Pro",
                    product_slug: body.product_slug || "construction-calculator-pro",
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

    // Automatically dispatch instant digital delivery email with attachment
    const recipientEmail = body.customer_email || body.email;
    if (recipientEmail) {
      sendOrderDeliveryEmail({
        toEmail: recipientEmail,
        customerName: body.customer_name || body.name || "Valued Builder",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        productTitle: body.product_title || "Construction Calculator Pro Package",
      }).catch((emailErr) => {
        console.error("Async email delivery error:", emailErr);
      });
    }

    // Automatically dispatch server-side Meta Conversions API (CAPI) event
    const productSlug = body.product_slug || "construction-calculator-pro";
    const productObj = PRODUCTS[productSlug];
    const priceInRupees = productObj ? productObj.price : (Number(body.amount) ? Number(body.amount) / 100 : 499);
    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || undefined;
    const userAgent = request.headers.get("user-agent") || undefined;
    const { fbp, fbc } = extractMetaCookies(request.headers.get("cookie"));

    sendMetaCapiEvent({
      eventName: "Purchase",
      eventId: razorpay_payment_id,
      user: {
        email: recipientEmail,
        phone: body.customer_phone || body.phone || body.contact,
        name: body.customer_name || body.name,
        ip: clientIp,
        userAgent: userAgent,
        fbp,
        fbc,
      },
      customData: {
        value: priceInRupees,
        currency: "INR",
        content_name: body.product_title || productObj?.title || "Construction Calculator Pro",
        content_ids: [productSlug],
        content_type: "product",
        order_id: razorpay_order_id,
      },
      eventSourceUrl: `https://thinktools.in/p/${productSlug}`,
    }).catch((capiErr) => {
      console.error("Async Meta CAPI delivery error:", capiErr);
    });

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully.",
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
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
