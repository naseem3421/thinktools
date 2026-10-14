import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { name, email, orderId, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST || "smtp.hostinger.com";
    const port = Number(process.env.SMTP_PORT) || 465;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!user || !pass) {
      console.warn("[Contact API] SMTP credentials not set, logging inquiry to console:", body);
      return NextResponse.json({
        success: true,
        message: "Support request logged.",
      });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    const categoryLabels: Record<string, string> = {
      "download-issue": "File Download / Re-dispatch",
      "file-compatibility": "Excel / Google Sheets Compatibility",
      "pre-sales": "Pre-Sales Question",
      "billing": "Billing / Duplicate Charge",
      "other": "Other Inquiry",
    };

    const categoryName = categoryLabels[subject] || subject || "General Inquiry";

    await transporter.sendMail({
      from: `"Thinktools Support Desk" <${user}>`,
      to: process.env.SUPPORT_EMAIL || "support@thinktools.in",
      replyTo: email,
      subject: `[Support Ticket] ${categoryName} - from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; padding: 20px; color: #1e293b; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
          <h2 style="color: #d97706; margin-top: 0;">New Support Ticket Received</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <tr>
              <td style="padding: 6px 0; color: #64748b; width: 140px;">Customer Name:</td>
              <td style="padding: 6px 0; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Customer Email:</td>
              <td style="padding: 6px 0; font-weight: bold;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Order / Payment ID:</td>
              <td style="padding: 6px 0; font-mono font-weight: bold;">${orderId || "Not Provided"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Category:</td>
              <td style="padding: 6px 0; font-weight: bold;">${categoryName}</td>
            </tr>
          </table>
          <div style="background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">
            You can reply directly to this email to respond to <strong>${email}</strong>.
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Support request dispatched successfully.",
    });
  } catch (error: unknown) {
    console.error("[Contact API] Error sending support email:", error);
    const err = error as { message?: string };
    return NextResponse.json(
      { error: err?.message || "Failed to process inquiry." },
      { status: 500 }
    );
  }
}
