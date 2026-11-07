/**
 * Thinktools Checkout Lead Log -> Google Sheet tab "Checkout Leads"
 * Configuration: "UNPAID ONLY"
 *
 * Setup (once):
 * 1. Open your Google Sheet > Extensions > Apps Script.
 * 2. Paste this entire file, Save (Cmd+S or Ctrl+S).
 * 3. Deploy > Manage deployments > Edit (pencil icon) > Version: "New version" > Deploy.
 *    (Or if first time: Deploy > New deployment > type "Web app" > Execute as: Me > Access: Anyone > Deploy).
 * 4. In Hostinger hPanel Node.js Environment variables:
 *      GOOGLE_SHEETS_LEADS_WEBHOOK_URL = <your Web app URL>
 *      GOOGLE_SHEETS_LEADS_SECRET      = 00f3e9347a92fa6c8fcf406b6f72d8952a46d7315d77d76b
 *
 * Columns in Checkout Leads (row 1 headers):
 * A Timestamp | B Razorpay Order ID | C Name | D Email | E Phone | F Product |
 * G Amount (INR) | H Status | I Razorpay Payment ID | J Failure Reason / Notes | K 1-Click WhatsApp
 *
 * "UNPAID ONLY" BEHAVIOUR:
 * 1. When a buyer clicks Pay -> Appends row with status "Initiated".
 * 2. If payment fails -> Updates row status to "Failed" with exact error reason.
 * 3. If payment succeeds -> AUTOMATICALLY REMOVES / DELETES THE ROW FROM THIS TAB!
 *
 * Result: The "Checkout Leads" sheet ONLY contains people who did NOT pay.
 * Every person on this list is an unpaid lead ready for manual follow-up.
 */

var SHEET_NAME = "Checkout Leads";
var SECRET = "00f3e9347a92fa6c8fcf406b6f72d8952a46d7315d77d76b";

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    var data = JSON.parse(e.postData.contents);
    if (!data.secret || data.secret !== SECRET) {
      return json_({ ok: false, error: "unauthorized" });
    }
    if (!data.orderId) return json_({ ok: false, error: "missing orderId" });

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      return json_({ ok: false, error: "Sheet tab '" + SHEET_NAME + "' not found" });
    }

    var lastRow = sheet.getLastRow();
    var rowIndex = -1;
    if (lastRow >= 2) {
      var ids = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
      for (var i = 0; i < ids.length; i++) {
        if (String(ids[i][0]) === String(data.orderId)) {
          rowIndex = i + 2;
          break;
        }
      }
    }

    // --- UNPAID ONLY CONFIGURATION ---
    // If the customer successfully paid, remove them from this unpaid leads list!
    if (data.status === "Paid") {
      if (rowIndex !== -1) {
        sheet.deleteRow(rowIndex);
        return json_({ ok: true, action: "removed_paid_lead" });
      }
      return json_({ ok: true, action: "ignored_paid_order" });
    }

    // Format clean WhatsApp direct link
    var rawPhone = String(data.phone || "").replace(/[^0-9]/g, "");
    var waPhone = rawPhone.length === 10 ? "91" + rawPhone : rawPhone;
    var waLink = waPhone ? "https://wa.me/" + waPhone : "";

    // If new checkout attempt, add to Unpaid Leads
    if (rowIndex === -1) {
      sheet.appendRow([
        new Date(),
        data.orderId,
        data.name || "",
        data.email || "",
        "'" + (data.phone || ""),
        data.product || "",
        data.amountInr || "",
        data.status || "Initiated",
        data.paymentId || "",
        data.note || "",
        waLink
      ]);
      return json_({ ok: true, action: "added_unpaid_lead" });
    } else {
      // Update existing lead row (e.g. status changes to "Failed")
      sheet.getRange(rowIndex, 8).setValue(data.status); // Status
      if (data.paymentId) sheet.getRange(rowIndex, 9).setValue(data.paymentId);
      if (data.name) sheet.getRange(rowIndex, 3).setValue(data.name);
      if (data.email) sheet.getRange(rowIndex, 4).setValue(data.email);
      if (data.phone) sheet.getRange(rowIndex, 5).setValue("'" + data.phone);
      if (data.product) sheet.getRange(rowIndex, 6).setValue(data.product);
      if (data.amountInr) sheet.getRange(rowIndex, 7).setValue(data.amountInr);
      if (data.note) sheet.getRange(rowIndex, 10).setValue(data.note);
      if (waLink) sheet.getRange(rowIndex, 11).setValue(waLink);
      return json_({ ok: true, action: "updated_unpaid_lead" });
    }
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
