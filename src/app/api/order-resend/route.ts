import { NextResponse } from "next/server";
import { findOrders, getOrder, resetDownloadLimit } from "@/lib/orderStore";
import { queueOrderDelivery } from "@/lib/deliveryQueue";
import { generateDownloadToken } from "@/lib/downloadToken";
import { normalizeEmail } from "@/lib/emailValidation";
import { ADDON_PRODUCTS } from "@/data/products";

export const dynamic = "force-dynamic";

// In-memory rate limiting map: key -> timestamps[]
// Limit: max 3 requests per 10 minutes per IP/email
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 3;

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(key) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(key, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(key, validTimestamps);
  return false;
}

export async function POST(request: Request) {
  try {
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const body = await request.json().catch(() => ({}));
    const query = (body.query || "").trim();

    if (!query) {
      return NextResponse.json(
        { success: false, error: "Please enter your registered email address or Order ID." },
        { status: 400 }
      );
    }

    // Rate limiting key: combine IP and query
    const rateLimitKey = `${clientIp}:${query.toLowerCase()}`;
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit reached: Maximum 3 resend attempts per 10 minutes. Please check your inbox/spam or contact orders@thinktools.in.",
        },
        { status: 429 }
      );
    }

    let matchedOrder = null;

    // 1. Try matching by Order ID or Payment ID
    matchedOrder = getOrder(query);

    // 2. If not found by direct ID, search by normalized email
    if (!matchedOrder && query.includes("@")) {
      const email = normalizeEmail(query);
      const orders = findOrders({ email });
      // Find the latest paid order
      matchedOrder = orders.find(
        (o) => o.status === "paid" || o.status === "delivery_sent" || o.status === "delivery_queued"
      ) || orders[0] || null;
    }

    // 3. If not found, check payment_id across all orders
    if (!matchedOrder) {
      const paymentOrders = findOrders({ paymentId: query });
      matchedOrder = paymentOrders[0] || null;
    }

    if (!matchedOrder) {
      return NextResponse.json(
        {
          success: false,
          error: `No purchase record found for "${query}". If you completed payment via UPI or cards, please check your payment receipt for the Order ID or WhatsApp us at +91 93450 48201.`,
        },
        { status: 404 }
      );
    }

    if (matchedOrder.status === "pending" || matchedOrder.status === "payment_failed") {
      return NextResponse.json(
        {
          success: false,
          error: `Order #${matchedOrder.id} status is "${matchedOrder.status}". Payment has not been captured yet. If money was debited, it will reverse or reach out to support.`,
        },
        { status: 400 }
      );
    }

    // Reset download limit so customer has a fresh quota
    resetDownloadLimit(matchedOrder.id);

    // Generate fresh 7-day download token
    const token = generateDownloadToken({
      order_id: matchedOrder.id,
      addon_ids: matchedOrder.addon_ids,
      product_slug: matchedOrder.product_slug,
      hoursValid: 168, // 7 days
    });

    matchedOrder.download_token = token;
    matchedOrder.token_expires_at = Date.now() + 168 * 3600 * 1000;

    // Queue fresh delivery email immediately
    await queueOrderDelivery(matchedOrder.id, true);

    const downloads = [
      {
        file: "main",
        title: "Construction Calculator Pro (Master Excel Engine)",
        url: `/api/download?file=main&token=${encodeURIComponent(token)}&order_id=${encodeURIComponent(matchedOrder.id)}`,
      },
      ...(matchedOrder.addon_ids || []).map((id) => {
        const addon = ADDON_PRODUCTS[id];
        return {
          file: id,
          title: addon ? addon.title : id,
          url: `/api/download?file=${id}&token=${encodeURIComponent(token)}&order_id=${encodeURIComponent(matchedOrder.id)}`,
        };
      }),
    ];

    return NextResponse.json({
      success: true,
      message: `Fresh download links generated! A new delivery email has also been sent to ${matchedOrder.customer_email}.`,
      order_id: matchedOrder.id,
      customer_email: matchedOrder.customer_email,
      customer_name: matchedOrder.customer_name,
      product_title: matchedOrder.full_order_title || matchedOrder.product_title,
      download_token: token,
      downloads,
    });
  } catch (error) {
    console.error("Order resend error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error processing resend request." },
      { status: 500 }
    );
  }
}

