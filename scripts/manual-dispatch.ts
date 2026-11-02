import path from "path";
import fs from "fs";

// Load environment variables
if (fs.existsSync(".env.local")) {
  process.loadEnvFile(".env.local");
} else if (fs.existsSync(".env")) {
  process.loadEnvFile(".env");
}

import { sendOrderDeliveryEmail } from "../src/lib/mailer";

async function main() {
  const targetEmail = process.argv[2];
  const customerName = process.argv[3] || "Valued Builder";

  if (!targetEmail || !targetEmail.includes("@")) {
    console.error("Usage: npx tsx scripts/manual-dispatch.ts <customer_email> [customer_name]");
    process.exit(1);
  }

  const orderId = `DIR-${Date.now().toString().slice(-6)}`;
  const paymentId = `UPI-MANUAL-499-${Date.now().toString().slice(-4)}`;

  console.log(`[Manual Dispatch] Preparing VIP Bundle for ${customerName} <${targetEmail}>...`);
  console.log(`[Manual Dispatch] Generated Order ID: #${orderId}`);
  console.log(`[Manual Dispatch] Reference: ${paymentId}`);

  // ₹499 corresponds to the Master System + All 3 Add-ons
  const addonIds = [
    "site-expense-profit-tracker",
    "labour-attendance-weekly-wage-sheet",
    "payment-collection-tracker",
  ];

  const result = await sendOrderDeliveryEmail({
    toEmail: targetEmail.trim(),
    customerName: customerName.trim(),
    orderId,
    paymentId,
    productTitle: "Construction Calculator Pro (VIP Complete Bundle)",
    addonIds,
  });

  if (result.success) {
    console.log(`\n✅ SUCCESS! Email sent successfully to: ${targetEmail}`);
    console.log(`Message ID: ${result.messageId}`);
    console.log(`Bundle Contents: Master 31-Sheet Workbook (.zip) + 3 VIP Business Add-Ons attached.`);
  } else {
    console.error(`\n❌ FAILED to send email:`, result.message);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

