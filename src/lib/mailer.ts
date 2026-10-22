import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

interface SendOrderDeliveryParams {
  toEmail: string;
  customerName: string;
  orderId: string;
  paymentId: string;
  productTitle?: string;
}

export async function sendOrderDeliveryEmail({
  toEmail,
  customerName,
  orderId,
  paymentId,
  productTitle = "Construction Calculator Pro Package",
}: SendOrderDeliveryParams) {
  const host = process.env.SMTP_HOST || "smtp.hostinger.com";
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || `"Thinktools" <${user || "orders@thinktools.in"}>`;

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

  // Master zip bundle path in private server storage (not exposed via public HTTP)
  const candidateNames = [
    "Construction_Calculator_Pro_Excel.zip",
    "Construction_Calculator_Pro.zip",
  ];
  let zipPath = "";
  let zipFileName = "Construction_Calculator_Pro_Excel.zip";
  for (const name of candidateNames) {
    const fullPath = path.join(process.cwd(), "storage", "downloads", name);
    if (fs.existsSync(fullPath)) {
      zipPath = fullPath;
      zipFileName = name;
      break;
    }
  }

  const attachments = [];
  if (zipPath && fs.existsSync(zipPath)) {
    attachments.push({
      filename: zipFileName,
      path: zipPath,
    });
  } else {
    console.warn(`[Mailer] Attachment not found in storage/downloads/`);
  }

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
            <h1 class="title">Your Files Are Attached</h1>
            <p class="subtitle">ThinkTools.in • Work Smarter.</p>
          </div>

          <div class="content">
            <div class="greeting">Hello ${customerName || "Valued Builder"},</div>
            <p class="text">
              Your payment has been successfully confirmed. In accordance with our direct digital delivery policy, your complete <strong>${productTitle}</strong> has been attached directly to this email as a single offline bundle.
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

            <div class="package-list">
              <h4>Included in your attached .ZIP bundle (1.9 MB):</h4>
              <ul>
                <li><strong>3 Complete Excel Workbooks (.xlsx)</strong> with all 31 calculation tabs pre-linked.</li>
                <li><strong>Master Guide (PDF)</strong> with fast-track setup and IS 456 formula rules.</li>
                <li><strong>7 Anti-Fear Bonuses &amp; Audit Kits</strong> (Tolerance audits, milestone schedule, snag checklist).</li>
                <li><strong>Contractor Hiring Kit &amp; Negotiation Scripts</strong> for phone, email, and WhatsApp.</li>
              </ul>
            </div>

            <div style="text-align: center; margin: 28px 0;">
              <a href="https://thinktools.in/api/download" style="display: inline-block; background: #f59e0b; color: #090d16; font-weight: 800; font-size: 15px; padding: 14px 28px; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.35);">
                ⬇️ Click Here to Download .ZIP (1.9 MB)
              </a>
              <div style="font-size: 11px; color: #64748b; margin-top: 8px;">
                Direct offline master package • No login or password required
              </div>
            </div>

            <div class="instructions">
              <strong>📎 Two ways to access your files:</strong><br/>
              1. <strong>Click the button above</strong> to download the full package instantly to your device.<br/>
              2. <strong>Or download the attached file</strong> (<code>${zipFileName}</code>) located at the bottom of this email.<br/>
              Right-click and choose <em>"Extract All"</em> on your PC or Mac to open the workbooks in Microsoft Excel immediately.
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
      subject: `Your Construction Calculator Pro Package (#${orderId}) - Attached Files`,
      html,
      attachments,
    });

    console.log(`[Mailer] Order confirmation email sent to ${toEmail}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error: unknown) {
    console.error("[Mailer] Error sending order delivery email:", error);
    const err = error as { message?: string };
    return { success: false, message: err?.message || "Failed to send delivery email." };
  }
}
