import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { PRODUCTS, ADDON_PRODUCTS } from "@/data/products";
import { sendMetaCapiEvent, extractMetaCookies } from "@/lib/metaCapi";
import { initOrder, findOrders, getOrder } from "@/lib/orderStore";
import { normalizeEmail } from "@/lib/emailValidation";
import { verifyAllCatalogDeliverables } from "@/lib/catalogMapping";

export async function POST(request: Request) {
  try {
    // Requirement 10: Verify catalog deliverables mapping exists. Fails loudly if files are missing.
    verifyAllCatalogDeliverables();

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
      const defaultProduct = PRODUCTS["construction-calculator-pro"];
      baseAmountPaise = defaultProduct ? Math.round(defaultProduct.price * 100) : 29900;
      if (defaultProduct) {
        productTitle = defaultProduct.title;
        productId = defaultProduct.id;
        actualSlug = defaultProduct.slug;
      }
    }

    // Authoritative Addon Validation & Server-Side Price Calculation
    const rawAddonIds = Array.isArray(addon_ids)
      ? addon_ids
      : (typeof notes?.addon_ids === "string" ? notes.addon_ids.split(",") : []);

    const idStrings: string[] = Array.from(new Set((rawAddonIds as unknown[]).map((id) => String(id).trim())));
    const validAddonIds: string[] = idStrings.filter((id) => Boolean(ADDON_PRODUCTS[id]));

    const addonsPaise = validAddonIds.reduce(
      (sum: number, id: string) => sum + Math.round(ADDON_PRODUCTS[id].price * 100),
      0
    );

    // Bundle Offer Logic: If all 3 add-ons are selected, bundle saves ₹97
    const isBundleApplied = validAddonIds.length === Object.keys(ADDON_PRODUCTS).length;
    const bundleDiscountPaise = isBundleApplied ? 97 * 100 : 0;
    const orderAmount = baseAmountPaise + addonsPaise - bundleDiscountPaise;

    // Minimum amount validation
    if (orderAmount < 100) {
      return NextResponse.json(
        { error: "Order amount must be at least 100 paise (₹1)." },
        { status: 400 }
      );
    }

    const customerEmail = normalizeEmail(notes?.customer_email || body.email || "");
    const customerName = (notes?.customer_name || body.name || "Valued Builder").trim();
    const customerPhone = (notes?.customer_phone || body.phone || "").trim();

    // Requirement 11: Prevent duplicate order creation on rapid double-clicks
    // Check if an existing order was created for this exact email & amount in the last 60 seconds
    if (customerEmail) {
      const recentOrders = findOrders({ email: customerEmail, status: "pending" });
      const duplicateOrder = recentOrders.find(
        (o) =>
          o.amount === orderAmount / 100 &&
          o.product_slug === actualSlug &&
          Date.now() - o.created_at < 60000 // 60 seconds window
      );

      if (duplicateOrder) {
        console.log(`[OrderCreate] Reusing existing pending order ${duplicateOrder.id} to prevent duplicate.`);
        return NextResponse.json({
          order_id: duplicateOrder.id,
          amount: duplicateOrder.amount * 100,
          currency: duplicateOrder.currency || "INR",
          key_id: keyId,
          is_reused: true,
        });
      }
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const fullOrderTitle = validAddonIds.length
      ? `${productTitle} + ${validAddonIds.length} Add-on${validAddonIds.length > 1 ? "s" : ""}`
      : productTitle;

    const options = {
      amount: orderAmount,
      currency: currency || "INR",
      receipt: receipt || `rcpt_${actualSlug.slice(0, 16)}_${Date.now()}`,
      notes: {
        ...notes,
        product_id: productId,
        product_slug: actualSlug,
        product_title: productTitle,
        addon_ids: validAddonIds.join(","),
        addon_titles: validAddonIds.map((id) => ADDON_PRODUCTS[id].title).join(", "),
        bundle_applied: isBundleApplied ? "true" : "false",
        price_inr: orderAmount / 100,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
      },
    };

    const order = await razorpay.orders.create(options);

    // Persist order in state machine with status: "pending"
    try {
      initOrder(order.id, {
        amount: orderAmount / 100,
        currency: currency || "INR",
        status: "pending",
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        product_slug: actualSlug,
        product_title: productTitle,
        addon_ids: validAddonIds,
        full_order_title: fullOrderTitle,
      });
    } catch (orderStoreErr) {
      console.warn("Could not persist initial order record:", orderStoreErr);
    }

    // Dispatch server-side InitiateCheckout with deduplication key matching order.id
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      undefined;
    const userAgent = request.headers.get("user-agent") || undefined;
    const { fbp, fbc, externalId } = extractMetaCookies(request.headers.get("cookie"));

    sendMetaCapiEvent({
      eventName: "InitiateCheckout",
      eventId: order.id,
      user: {
        email: customerEmail,
        phone: customerPhone,
        name: customerName,
        ip: clientIp,
        userAgent,
        fbp,
        fbc,
        externalId,
      },
      customData: {
        value: orderAmount / 100,
        currency: currency || "INR",
        content_name: fullOrderTitle,
        content_ids: [productId, ...validAddonIds],
        content_type: "product",
        order_id: order.id,
      },
      eventSourceUrl: `https://thinktools.in/p/${actualSlug}`,
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
