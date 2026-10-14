import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { PRODUCTS } from "@/data/products";

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
    const { currency = "INR", receipt, notes = {} } = body;

    const productSlug =
      notes?.product_slug || body.product_slug || "construction-calculator-pro";
    const catalogProduct = PRODUCTS[productSlug];

    if (!catalogProduct) {
      return NextResponse.json(
        { error: `Product "${productSlug}" not found in catalog.` },
        { status: 400 }
      );
    }

    // Authoritative server-side price in paise
    const authoritativeAmount = Math.round(catalogProduct.price * 100);

    // Validate client-sent amount if provided
    if (body.amount !== undefined) {
      const clientAmount = Math.round(Number(body.amount));
      if (clientAmount !== authoritativeAmount) {
        return NextResponse.json(
          {
            error: `Price mismatch: Client requested ₹${clientAmount / 100}, but authoritative price is ₹${authoritativeAmount / 100}.`,
          },
          { status: 400 }
        );
      }
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const options = {
      amount: authoritativeAmount,
      currency: currency || "INR",
      receipt: receipt || `rcpt_${productSlug.slice(0, 20)}_${Date.now()}`,
      notes: {
        ...notes,
        product_id: catalogProduct.id,
        product_slug: catalogProduct.slug,
        product_title: catalogProduct.title,
        price_inr: catalogProduct.price,
      },
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
