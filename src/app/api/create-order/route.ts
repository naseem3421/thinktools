import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Razorpay credentials are not configured on the server." },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { amount, currency = "INR", receipt, notes } = body;

    const parsedAmount = Math.round(Number(amount));

    if (isNaN(parsedAmount) || parsedAmount < 100) {
      return NextResponse.json(
        { error: "Amount is invalid or below minimum of 100 paise (₹1.00)." },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const options = {
      amount: parsedAmount,
      currency: currency || "INR",
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: notes || {},
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: keyId,
    });
  } catch (error: unknown) {
    console.error("Razorpay order creation error:", error);
    const err = error as { statusCode?: number; status?: number; message?: string; error?: { description?: string } };
    const statusCode = err?.statusCode || (err?.status === 401 ? 401 : 500);
    const message = err?.error?.description || err?.message || "Failed to create Razorpay order";
    return NextResponse.json(
      { error: message },
      { status: statusCode === 401 ? 401 : 500 }
    );
  }
}
