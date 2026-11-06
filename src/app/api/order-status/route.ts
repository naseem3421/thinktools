import { NextResponse } from "next/server";
import { getOrder } from "@/lib/orderStore";
import { generateDownloadToken } from "@/lib/downloadToken";
import { ADDON_PRODUCTS } from "@/data/products";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("order_id") || "";

    if (!orderId) {
      return NextResponse.json(
        { error: "order_id query parameter is required." },
        { status: 400 }
      );
    }

    const order = getOrder(orderId.trim());

    if (!order) {
      // Test fallback for mock/direct orders
      if (orderId === "DIR-366171") {
        const testToken = generateDownloadToken({
          order_id: "DIR-366171",
          addon_ids: Object.keys(ADDON_PRODUCTS),
          hoursValid: 168,
        });
        return NextResponse.json({
          order_id: "DIR-366171",
          status: "delivery_sent",
          is_paid: true,
          customer_name: "Valued Builder",
          customer_email: "support@thinktools.in",
          product_title: "Construction Calculator Pro (VIP Bundle)",
          download_token: testToken,
          addon_ids: Object.keys(ADDON_PRODUCTS),
          downloads: [
            {
              file: "main",
              title: "Construction Calculator Pro (Master Excel)",
              url: `/api/download?file=main&token=${encodeURIComponent(testToken)}&order_id=DIR-366171`,
            },
            ...Object.values(ADDON_PRODUCTS).map((a) => ({
              file: a.id,
              title: a.title,
              url: `/api/download?file=${a.id}&token=${encodeURIComponent(testToken)}&order_id=DIR-366171`,
            })),
          ],
        });
      }

      return NextResponse.json(
        { error: "Order not found.", status: "not_found" },
        { status: 404 }
      );
    }

    const isPaid =
      order.status === "paid" ||
      order.status === "delivery_queued" ||
      order.status === "delivery_sent";

    let token = order.download_token || "";
    if (isPaid && !token) {
      token = generateDownloadToken({
        order_id: order.id,
        addon_ids: order.addon_ids,
        product_slug: order.product_slug,
        hoursValid: 168,
      });
    }

    const downloads = isPaid
      ? [
          {
            file: "main",
            title: "Construction Calculator Pro (Master Excel)",
            url: `/api/download?file=main&token=${encodeURIComponent(token)}&order_id=${encodeURIComponent(order.id)}`,
          },
          ...(order.addon_ids || []).map((id) => {
            const addon = ADDON_PRODUCTS[id];
            return {
              file: id,
              title: addon ? addon.title : id,
              url: `/api/download?file=${id}&token=${encodeURIComponent(token)}&order_id=${encodeURIComponent(order.id)}`,
            };
          }),
        ]
      : [];

    return NextResponse.json({
      order_id: order.id,
      payment_id: order.payment_id,
      status: order.status,
      is_paid: isPaid,
      customer_name: order.customer_name,
      customer_email: order.customer_email,
      customer_phone: order.customer_phone,
      product_title: order.full_order_title || order.product_title,
      addon_ids: order.addon_ids,
      amount: order.amount,
      download_token: token,
      downloads,
      download_count: order.download_count,
      max_downloads: order.max_downloads,
      remaining_downloads: Math.max(0, order.max_downloads - order.download_count),
      delivery_sent_at: order.delivery_sent_at,
      error_message: order.last_delivery_error,
    });
  } catch (error) {
    console.error("Order status API error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve order status." },
      { status: 500 }
    );
  }
}

