import { getOrder, saveOrder, acquireLock, releaseLock, OrderRecord } from "./orderStore";
import { sendOrderDeliveryEmail } from "./mailer";
import { generateDownloadToken } from "./downloadToken";
import { logger } from "./logger";
import { normalizeIndianPhone } from "./emailValidation";

// Exponential backoff retry delays in milliseconds:
// Attempt 1: immediate (0s)
// Attempt 2: 30 seconds
// Attempt 3: 3 minutes (180s)
// Attempt 4: 15 minutes (900s)
const RETRY_BACKOFF_MS = [0, 30 * 1000, 180 * 1000, 900 * 1000];

/**
 * Enqueues an order for digital product delivery.
 * Runs asynchronously and handles retries with exponential backoff.
 */
export async function queueOrderDelivery(orderId: string, immediate: boolean = true): Promise<void> {
  const order = getOrder(orderId);
  if (!order) {
    logger.emailFailed({ orderId, email: "unknown", attempt: 0, error: "Order not found", final: true });
    return;
  }

  // Idempotency: If already delivered, do not re-send
  if (order.status === "delivery_sent") {
    console.log(`[DeliveryQueue] Order ${orderId} already delivered. Skipping duplicate queue.`);
    return;
  }

  order.status = "delivery_queued";
  saveOrder(order);

  logger.deliveryQueued({
    orderId,
    email: order.customer_email,
    attempt: order.delivery_attempts + 1,
  });

  if (immediate) {
    // Process without blocking the HTTP request
    setImmediate(() => {
      void executeDelivery(orderId);
    });
  }
}

/**
 * Executes a single delivery attempt for an order under atomic lock.
 */
export async function executeDelivery(orderId: string): Promise<{ success: boolean; error?: string }> {
  const lockAcquired = acquireLock(orderId);
  if (!lockAcquired) {
    // Another worker or process is already delivering this order
    return { success: false, error: "Lock already held" };
  }

  try {
    const order = getOrder(orderId);
    if (!order) {
      return { success: false, error: "Order not found" };
    }

    if (order.status === "delivery_sent") {
      return { success: true };
    }

    const currentAttempt = order.delivery_attempts + 1;
    const recipientEmail = order.customer_email;

    if (!recipientEmail || !recipientEmail.includes("@")) {
      order.status = "delivery_failed";
      order.last_delivery_error = "Invalid or missing customer email address.";
      saveOrder(order);
      logger.emailFailed({ orderId, email: recipientEmail || "empty", attempt: currentAttempt, error: order.last_delivery_error, final: true });
      await sendAdminDeliveryFailureAlert(order, "Missing or invalid email address");
      return { success: false, error: order.last_delivery_error };
    }

    // Generate or update 7-day signed download token
    const token = generateDownloadToken({
      order_id: order.id,
      addon_ids: order.addon_ids,
      product_slug: order.product_slug,
      hoursValid: 168, // 7 days
    });

    order.download_token = token;
    order.token_expires_at = Date.now() + 168 * 3600 * 1000;
    saveOrder(order);

    const startTime = Date.now();
    let emailResult;

    try {
      emailResult = await sendOrderDeliveryEmail({
        toEmail: recipientEmail,
        customerName: order.customer_name,
        orderId: order.id,
        paymentId: order.payment_id || order.id,
        productTitle: order.full_order_title,
        addonIds: order.addon_ids,
        downloadToken: token,
      });
    } catch (sendErr: any) {
      emailResult = {
        success: false,
        message: sendErr?.message || "Unknown SMTP delivery error",
      };
    }

    const durationMs = Date.now() - startTime;

    if (emailResult.success) {
      // SUCCESS: Transition order to delivery_sent
      order.status = "delivery_sent";
      order.delivery_sent_at = Date.now();
      order.delivery_message_id = emailResult.messageId || null;
      order.last_delivery_error = null;
      order.next_retry_at = null;
      order.delivery_attempts = currentAttempt;
      order.delivery_history = order.delivery_history || [];
      order.delivery_history.push({
        attempt: currentAttempt,
        timestamp: Date.now(),
        success: true,
        messageId: emailResult.messageId,
      });

      saveOrder(order);

      logger.emailSent({
        orderId: order.id,
        email: recipientEmail,
        messageId: emailResult.messageId,
        durationMs,
      });

      return { success: true };
    } else {
      // FAILURE: Record error and evaluate retries
      const errorMessage = emailResult.message || "Failed to deliver email";
      order.delivery_attempts = currentAttempt;
      order.last_delivery_error = errorMessage;
      order.delivery_history = order.delivery_history || [];
      order.delivery_history.push({
        attempt: currentAttempt,
        timestamp: Date.now(),
        success: false,
        error: errorMessage,
      });

      const maxAttempts = order.max_delivery_attempts || 4;

      if (currentAttempt < maxAttempts) {
        // Schedule next retry with exponential backoff
        const backoffMs = RETRY_BACKOFF_MS[currentAttempt] || 900 * 1000;
        order.status = "delivery_queued";
        order.next_retry_at = Date.now() + backoffMs;
        saveOrder(order);

        logger.deliveryRetryScheduled({
          orderId: order.id,
          email: recipientEmail,
          attempt: currentAttempt,
          nextRetryInSec: Math.round(backoffMs / 1000),
          error: errorMessage,
        });

        // Set local in-memory timeout for the next retry attempt
        setTimeout(() => {
          void executeDelivery(orderId);
        }, backoffMs);

        return { success: false, error: errorMessage };
      } else {
        // MAX RETRIES EXHAUSTED: Mark as delivery_failed and alert admin
        order.status = "delivery_failed";
        order.next_retry_at = null;
        saveOrder(order);

        logger.emailFailed({
          orderId: order.id,
          email: recipientEmail,
          attempt: currentAttempt,
          error: errorMessage,
          final: true,
        });

        // Critical Admin Alert
        await sendAdminDeliveryFailureAlert(order, errorMessage);

        return { success: false, error: errorMessage };
      }
    }
  } finally {
    releaseLock(orderId);
  }
}

/**
 * Sends an urgent alert email to the admin when an order fails all delivery retries.
 * Includes customer phone, email, and 1-click WhatsApp fallback link.
 */
async function sendAdminDeliveryFailureAlert(order: OrderRecord, errorMessage: string): Promise<void> {
  const adminEmail = process.env.ADMIN_ALERT_EMAIL || "orders@thinktools.in";
  const phoneInfo = normalizeIndianPhone(order.customer_phone || "");

  // Pre-fill WhatsApp delivery message
  const hubUrl = `https://thinktools.in/p/construction-calculator-pro/download?order_id=${encodeURIComponent(order.id)}&token=${encodeURIComponent(order.download_token || "")}&name=${encodeURIComponent(order.customer_name)}`;
  const waMessage = encodeURIComponent(
    `Hi ${order.customer_name}, this is ThinkTools Support. Here is your verified download package for ${order.full_order_title} (Order: ${order.id}):\n\n👉 Access Link: ${hubUrl}\n\nPlease reply if you need any assistance!`
  );
  const waLink = phoneInfo.valid ? `https://wa.me/${phoneInfo.waNumber}?text=${waMessage}` : null;

  try {
    await sendOrderDeliveryEmail({
      toEmail: adminEmail,
      customerName: "Admin Alert Desk",
      orderId: order.id,
      paymentId: order.payment_id || order.id,
      productTitle: `🚨 DELIVERY FAILURE ALERT: Order #${order.id}`,
      customMessage: `
        <div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 12px; padding: 20px; margin-bottom: 20px; font-family: sans-serif;">
          <h2 style="color: #991b1b; margin-top: 0;">🚨 Delivery Failure: Order #${order.id}</h2>
          <p style="color: #4b5563; font-size: 14px;">All automated delivery attempts have failed. Please review customer details below:</p>
          <ul style="color: #1f2937; font-size: 14px; line-height: 1.8;">
            <li><strong>Customer Name:</strong> ${order.customer_name}</li>
            <li><strong>Customer Email:</strong> ${order.customer_email}</li>
            <li><strong>Phone Number:</strong> ${order.customer_phone || "Not provided"}</li>
            <li><strong>Payment ID:</strong> ${order.payment_id || "n/a"}</li>
            <li><strong>Amount:</strong> ₹${order.amount}</li>
            <li><strong>Package:</strong> ${order.full_order_title}</li>
            <li><strong>Delivery Error:</strong> <span style="color: #dc2626;">${errorMessage}</span></li>
            <li><strong>Attempts:</strong> ${order.delivery_attempts} / ${order.max_delivery_attempts}</li>
          </ul>
          ${
            waLink
              ? `<div style="margin-top: 16px;">
                  <a href="${waLink}" style="display: inline-block; background: #25d366; color: #ffffff; padding: 12px 24px; border-radius: 8px; font-weight: bold; text-decoration: none;">
                    📲 Deliver via WhatsApp with 1-Click
                  </a>
                </div>`
              : ""
          }
          <div style="margin-top: 12px;">
            <a href="https://thinktools.in/admin/orders" style="display: inline-block; background: #1e293b; color: #ffffff; padding: 10px 20px; border-radius: 8px; font-size: 13px; text-decoration: none;">
              Open Admin Portal
            </a>
          </div>
        </div>
      `,
    });
  } catch (alertErr) {
    console.error("Failed to dispatch admin failure alert email:", alertErr);
  }
}

