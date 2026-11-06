import { NextResponse } from "next/server";
import { listAllOrders, getOrder, resetDownloadLimit, markOrderPaid } from "@/lib/orderStore";
import { queueOrderDelivery } from "@/lib/deliveryQueue";
import { generateDownloadToken } from "@/lib/downloadToken";
import { normalizeIndianPhone } from "@/lib/emailValidation";

export const dynamic = "force-dynamic";

function verifyAdminAuth(request: Request): boolean {
  const adminSecret = process.env.ADMIN_SECRET_KEY || "thinktools_admin_2026";
  const headerKey = request.headers.get("x-admin-key");
  const { searchParams } = new URL(request.url);
  const queryKey = searchParams.get("key");

  return headerKey === adminSecret || queryKey === adminSecret;
}

export async function GET(request: Request) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get("status") as any;
    const limit = Number(searchParams.get("limit")) || 200;

    const orders = listAllOrders({ limit });

    // Compute stats
    let totalPaid = 0;
    let totalRevenue = 0;
    let deliverySentCount = 0;
    let deliveryFailedCount = 0;
    let pendingCount = 0;

    for (const o of orders) {
      if (o.status === "paid" || o.status === "delivery_sent" || o.status === "delivery_queued") {
        totalPaid++;
        totalRevenue += o.amount || 0;
      }
      if (o.status === "delivery_sent") {
        deliverySentCount++;
      } else if (o.status === "delivery_failed" || (o.status === "paid" && o.delivery_attempts >= 4)) {
        deliveryFailedCount++;
      } else if (o.status === "pending") {
        pendingCount++;
      }
    }

    const filtered = statusFilter
      ? orders.filter((o) => {
          if (statusFilter === "action_needed") {
            return o.status === "delivery_failed" || (o.status === "paid" && !o.delivery_sent_at);
          }
          return o.status === statusFilter;
        })
      : orders;

    // Enhance orders with active download URLs and WhatsApp links
    const enhanced = filtered.map((order) => {
      const token =
        order.download_token ||
        generateDownloadToken({
          order_id: order.id,
          addon_ids: order.addon_ids,
          product_slug: order.product_slug,
          hoursValid: 168,
        });

      const phoneInfo = normalizeIndianPhone(order.customer_phone || "");
      const hubUrl = `https://thinktools.in/p/construction-calculator-pro/download?order_id=${encodeURIComponent(order.id)}&token=${encodeURIComponent(token)}&name=${encodeURIComponent(order.customer_name)}`;
      const waText = encodeURIComponent(
        `Hi ${order.customer_name}, this is ThinkTools Support. Here is your verified download package for ${order.full_order_title} (Order: #${order.id}):\n\n👉 Access Link: ${hubUrl}\n\nPlease reply if you need any assistance!`
      );
      const waLink = phoneInfo.valid ? `https://wa.me/${phoneInfo.waNumber}?text=${waText}` : null;

      return {
        ...order,
        hub_url: hubUrl,
        wa_link: waLink,
        download_url: `https://thinktools.in/api/download?file=main&token=${encodeURIComponent(token)}&order_id=${encodeURIComponent(order.id)}`,
      };
    });

    return NextResponse.json({
      success: true,
      stats: {
        total_orders: orders.length,
        total_paid: totalPaid,
        total_revenue_inr: totalRevenue,
        delivery_sent: deliverySentCount,
        delivery_failed: deliveryFailedCount,
        pending: pendingCount,
        success_rate_pct: totalPaid > 0 ? Math.round((deliverySentCount / totalPaid) * 100) : 100,
      },
      orders: enhanced,
    });
  } catch (error) {
    console.error("Admin orders list error:", error);
    return NextResponse.json({ error: "Failed to load orders." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { action, order_id } = body;

    if (!order_id) {
      return NextResponse.json({ error: "order_id is required." }, { status: 400 });
    }

    const order = getOrder(order_id);
    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    if (action === "resend_email") {
      // Force delivery queue execution immediately
      resetDownloadLimit(order.id);
      await queueOrderDelivery(order.id, true);
      return NextResponse.json({
        success: true,
        message: `Delivery email queued for order #${order.id} to ${order.customer_email}.`,
      });
    }

    if (action === "reset_quota") {
      resetDownloadLimit(order.id);
      return NextResponse.json({
        success: true,
        message: `Download count reset to 0 for order #${order.id}.`,
      });
    }

    if (action === "mark_paid") {
      markOrderPaid(order.id, {
        paymentId: body.payment_id || order.payment_id || `manual_${Date.now()}`,
        amount: body.amount || order.amount,
      });
      await queueOrderDelivery(order.id, true);
      return NextResponse.json({
        success: true,
        message: `Order #${order.id} marked as paid and delivery queued.`,
      });
    }

    return NextResponse.json({ error: "Invalid action." }, { status: 400 });
  } catch (error) {
    console.error("Admin order action error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

