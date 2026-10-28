import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { PRODUCTS, ADDON_PRODUCTS } from "@/data/products";
import { sendMetaCapiEvent, extractMetaCookies } from "@/lib/metaCapi";

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
    const { currency = "INR", receipt, notes = {}, addon_ids = [] } = body;

    // Support both catalog products and direct amounts
    const productSlug = notes?.product_slug || body.product_slug;
    const catalogProduct = productSlug ? PRODUCTS[productSlug] : undefined;

    let baseAmountPaise: number;
    let productTitle = "Construction Calculator Pro";
    let productId = "construction-calculator-pro";
    let actualSlug = "construction-calculator-pro";

    if (catalogProduct) {
      baseAmountPaise = Math.round(catalogProduct.price * 100);
      productTitle = catalogProduct.title;
      productId = catalogProduct.id;
      actualSlug = catalogProduct.slug;
    } else if (body.amount !== undefined && !body.product_slug) {
      baseAmountPaise = Math.round(Number(body.amount));
      if (body.product_title) productTitle = body.product_title;
    } else {
      // Default to construction-calculator-pro
      const defaultProduct = PRODUCTS["construction-calculator-pro"];
      baseAmountPaise = defaultProduct ? Math.round(defaultProduct.price * 100) : 29900;
      if (defaultProduct) {
        productTitle = defaultProduct.title;
        productId = defaultProduct.id;
        actualSlug = defaultProduct.slug;
      }
    }

    // Authoritative Addon Validation & Server-Side Price Calculation
    // Never trust client amounts: validate IDs against authoritative ADDON_PRODUCTS dictionary
    const rawAddonIds = Array.isArray(addon_ids)
      ? addon_ids
      : (typeof notes?.addon_ids === "string" ? notes.addon_ids.split(",") : []);

    const idStrings: string[] = Array.from(new Set((rawAddonIds as unknown[]).map((id) => String(id).trim())));
    const validAddonIds: string[] = idStrings.filter((id) => Boolean(ADDON_PRODUCTS[id]));

    const addonsPaise = validAddonIds.reduce(
      (sum: number, id: string) => sum + Math.round(ADDON_PRODUCTS[id].price * 100),
      0
    );

    // Bundle Offer Logic: If all 3 add-ons are selected, bundle price is ₹499 (saves ₹97)
    const isBundleApplied = validAddonIds.length === Object.keys(ADDON_PRODUCTS).length;
    const bundleDiscountPaise = isBundleApplied ? 97 * 100 : 0;

    const orderAmount = baseAmountPaise + addonsPaise - bundleDiscountPaise;

    // Validate client-sent amount if provided against authoritative server total
    if (body.amount !== undefined) {
      const clientAmount = Math.round(Number(body.amount));
      if (clientAmount !== orderAmount) {
        return NextResponse.json(
          {
            error: `Price mismatch: Client requested ₹${clientAmount / 100}, but authoritative price is ₹${orderAmount / 100}.`,
          },
          { status: 400 }
        );
      }
    }

    // Minimum amount validation: Razorpay requires at least 100 paise (₹1)
    if (orderAmount < 100) {
      return NextResponse.json(
        { error: "Order amount must be at least 100 paise (₹1)." },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const options = {
      amount: orderAmount,
      currency: currency || "INR",
      receipt: receipt || `rcpt_${actualSlug.slice(0, 20)}_${Date.now()}`,
      notes: {
        ...notes,
        product_id: productId,
        product_slug: actualSlug,
        product_title: productTitle,
        addon_ids: validAddonIds.join(","),
        addon_titles: validAddonIds.map((id) => ADDON_PRODUCTS[id].title).join(", "),
        bundle_applied: isBundleApplied ? "true" : "false",
        price_inr: orderAmount / 100,
      },
    };

    const order = await razorpay.orders.create(options);

    // Dispatch server-side InitiateCheckout with deduplication key (matching browser eventID)
    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || undefined;
    const userAgent = request.headers.get("user-agent") || undefined;
    const { fbp, fbc } = extractMetaCookies(request.headers.get("cookie"));

    const contentIds = [productId, ...validAddonIds];
    const fullContentName = validAddonIds.length
      ? `${productTitle} + ${validAddonIds.length} Add-on${validAddonIds.length > 1 ? "s" : ""}`
      : productTitle;

    sendMetaCapiEvent({
      eventName: "InitiateCheckout",
      eventId: order.id,
      user: {
        email: notes?.customer_email || body.email,
        phone: notes?.customer_phone || body.phone,
        name: notes?.customer_name || body.name,
        ip: clientIp,
        userAgent: userAgent,
        fbp,
        fbc,
      },
      customData: {
        value: orderAmount / 100,
        currency: currency || "INR",
        content_name: fullContentName,
        content_ids: contentIds,
        content_type: "product",
        order_id: order.id,
      },
      eventSourceUrl: `https://thinktools.in/p/${actualSlug}`,
      requestHost: request.headers.get("x-forwarded-host") || request.headers.get("host"),
    }).catch((capiErr) => {
      console.error("Async Meta CAPI InitiateCheckout delivery error:", capiErr);
    });

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
