import { NextResponse } from "next/server";
import crypto from "crypto";

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
