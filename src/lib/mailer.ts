import nodemailer from "nodemailer";
import { ADDON_PRODUCTS } from "@/data/products";
import { generateDownloadToken } from "@/lib/downloadToken";

interface SendOrderDeliveryParams {
  toEmail: string;
  customerName: string;
  orderId: string;
  paymentId: string;
  productTitle?: string;
  addonIds?: string[];
}

export async function sendOrderDeliveryEmail({
  toEmail,
  customerName,
  orderId,
  paymentId,
  productTitle = "Construction Calculator Pro Package",
  addonIds = [],
}: SendOrderDeliveryParams) {
  const host = process.env.SMTP_HOST || "smtp.hostinger.com";
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const rawFrom = (process.env.SMTP_FROM || "").trim();
  const from = rawFrom.includes("@")
    ? (rawFrom.includes("<") ? rawFrom : `"Thinktools" <${rawFrom}>`)
    : `"Thinktools" <${user || "orders@thinktools.in"}>`;

  if (!user || !pass) {
    console.warn("[Mailer] SMTP credentials (SMTP_USER / SMTP_PASS) not configured. Email skipped.");
    return {
      success: false,
      message: "SMTP credentials not configured on server.",
    };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for 587
    auth: {
      user,
      pass,
    },
  });

  const downloadToken = generateDownloadToken({
    order_id: orderId,
    addon_ids: addonIds,
    product_slug: "construction-calculator-pro",
    hoursValid: 8760,
  });

  const masterDownloadUrl = `https://thinktools.in/api/download?file=main&token=${encodeURIComponent(downloadToken)}&order_id=${encodeURIComponent(orderId)}`;
  const onlineHubUrl = `https://thinktools.in/p/construction-calculator-pro/download?order_id=${encodeURIComponent(orderId)}&token=${encodeURIComponent(downloadToken)}&email=${encodeURIComponent(toEmail)}&name=${encodeURIComponent(customerName)}&addons=${encodeURIComponent(addonIds.join(","))}`;

  // Look for any purchased addon files
  const purchasedAddons = (addonIds || []).map((id) => ADDON_PRODUCTS[id]).filter(Boolean);

  const addonsListHtml = purchasedAddons.length > 0
    ? `
      <div class="package-list" style="background: #f0fdf4; border: 1px solid #bbf7d0; margin-top: 16px; border-radius: 12px; padding: 16px 20px;">
        <h4 style="color: #166534; margin: 0 0 10px 0; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Your ${purchasedAddons.length} Business Add-On Tools:
        </h4>
        <div style="margin-top: 10px;">
          ${purchasedAddons.map((addon) => `
            <div style="background: #ffffff; border: 1px solid #dcfce7; border-radius: 8px; padding: 12px; margin-bottom: 10px;">
              <div style="font-weight: 700; color: #166534; font-size: 13px;">${addon.title}</div>
              <div style="font-size: 12px; color: #475569; margin: 3px 0 8px 0; line-height: 1.4;">${addon.description}</div>
              <a href="https://thinktools.in/api/download?file=${addon.id}&token=${encodeURIComponent(downloadToken)}&order_id=${encodeURIComponent(orderId)}" style="display: inline-block; background: #16a34a; color: #ffffff; font-weight: 700; font-size: 11px; padding: 6px 14px; border-radius: 6px; text-decoration: none;">
                ⬇️ Download ${addon.shortTitle || addon.title} (.zip)
              </a>
            </div>
          `).join("")}
        </div>
      </div>
    `
    : "";

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
          .header { background: linear-gradient(135deg, #090d16 0%, #1a160d 100%); padding: 32px 24px; text-align: center; }
          .badge { display: inline-block; background: rgba(229, 168, 59, 0.2); border: 1px solid rgba(229, 168, 59, 0.4); color: #f59e0b; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
          .title { color: #ffffff; font-size: 24px; font-weight: 800; margin: 12px 0 4px 0; }
          .subtitle { color: #94a3b8; font-size: 13px; margin: 0; }
          .content { padding: 32px 28px; }
          .greeting { font-size: 16px; font-weight: 600; color: #0f172a; margin-bottom: 12px; }
          .text { font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 16px 0; }
          .box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin: 20px 0; }
          .box-row { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px; }
          .box-row:last-child { margin-bottom: 0; }
          .box-label { color: #64748b; }
          .box-value { font-weight: 600; color: #0f172a; font-family: monospace; }
          .package-list { background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 16px 20px; margin: 20px 0; }
          .package-list h4 { margin: 0 0 8px 0; font-size: 13px; color: #92400e; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
          .package-list ul { margin: 0; padding-left: 20px; font-size: 13px; color: #78350f; line-height: 1.6; }
          .instructions { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px; margin: 20px 0; font-size: 13px; color: #166534; line-height: 1.5; }
          .footer { background: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
          .footer a { color: #d97706; text-decoration: none; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="badge">Payment Verified • Lifetime License</span>
            <h1 class="title">Your Digital Toolkit is Ready</h1>
            <p class="subtitle">ThinkTools.in • Work Smarter.</p>
          </div>

          <div class="content">
            <div class="greeting">Hello ${customerName || "Valued Builder"},</div>
            <p class="text">
              Your payment has been successfully confirmed. In accordance with our instant digital delivery policy, your complete <strong>${productTitle}</strong> is ready for instant download below.
            </p>

            <div class="box">
              <div class="box-row">
                <span class="box-label">Order Reference:</span>
                <span class="box-value">#${orderId}</span>
              </div>
              <div class="box-row">
                <span class="box-label">Payment ID:</span>
                <span class="box-value">${paymentId}</span>
              </div>
              <div class="box-row">
                <span class="box-label">Licensed User:</span>
                <span class="box-value">${customerName || "Primary Licensee"}</span>
              </div>
              <div class="box-row">
                <span class="box-label">Registered Email:</span>
                <span class="box-value">${toEmail}</span>
              </div>
            </div>

            <div style="text-align: center; margin: 28px 0;">
              <a href="${masterDownloadUrl}" style="display: inline-block; background: #f59e0b; color: #090d16; font-weight: 800; font-size: 16px; padding: 16px 32px; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.35);">
                ⬇️ Download Master Calculator Bundle (1.9 MB)
              </a>
              <div style="font-size: 11px; color: #64748b; margin-top: 8px;">
                Direct offline master package (.zip) • Includes 31 sheets &amp; PDF guides
              </div>
            </div>

            <div class="package-list">
              <h4>Included in your Master Package (1.9 MB):</h4>
              <ul>
                <li><strong>Complete 31-Sheet System (.xlsx)</strong> with all 31 calculation tabs pre-linked.</li>
                <li><strong>Master Guide (PDF)</strong> with fast-track setup and IS 456 formula rules.</li>
                <li><strong>7 Anti-Fear Bonuses &amp; Audit Kits</strong> (Tolerance audits, milestone schedule, snag checklist).</li>
                <li><strong>Contractor Hiring Kit &amp; Negotiation Scripts</strong> for phone, email, and WhatsApp.</li>
              </ul>
            </div>
            ${addonsListHtml}

            <div style="text-align: center; margin: 22px 0;">
              <a href="${onlineHubUrl}" style="color: #2563eb; font-size: 13px; text-decoration: underline; font-weight: 600;">
                🌐 Or access &amp; manage all files on the Thinktools Download Hub ➔
              </a>
            </div>

            <div class="instructions">
              <strong>💡 How to Access &amp; Open Your Files:</strong><br/>
              1. <strong>Direct Download Links:</strong> Click the download buttons above to download the files directly to your device.<br/>
              2. <strong>Extract Files:</strong> Right-click the downloaded .ZIP file and choose <em>"Extract All"</em> on your PC or Mac.<br/>
              3. <strong>Open in Excel:</strong> Open the extracted workbooks in Microsoft Excel, Google Sheets, or WPS Office.<br/>
              4. <strong>Permanent Cloud Access:</strong> Your files remain accessible anytime via the Download Hub link above.
            </div>

            <p class="text" style="margin-top: 24px; font-size: 13px;">
              Keep this email safe for your lifetime records. If you ever misplace your files, reply directly to this email or reach us at <a href="mailto:support@thinktools.in" style="color: #d97706; text-decoration: underline;">support@thinktools.in</a>.
            </p>
          </div>

          <div class="footer">
            © 2026 Thinktools.in • Premium Digital Engines for Indian Builders &amp; Creators<br/>
            Need help? Contact <a href="mailto:support@thinktools.in">support@thinktools.in</a>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from,
      to: toEmail,
      subject: `Your Construction Calculator Pro Package (#${orderId}) - Download Access`,
      html,
    });

    console.log(`[Mailer] Order confirmation email sent to ${toEmail}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error: unknown) {
    console.error("[Mailer] Error sending order delivery email:", error);
    const err = error as { message?: string };
    return { success: false, message: err?.message || "Failed to send delivery email." };
  }
}
