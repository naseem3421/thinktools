/**
 * Thinktools checkout lead log -> Google Sheet tab "Checkout Leads"
 *
 * Setup (once):
 * 1. Open the "Think Tools Transactions" sheet > Extensions > Apps Script.
 * 2. Paste this file, set SECRET below to a long random string, Save.
 * 3. Deploy > New deployment > type "Web app":
 *      Execute as: Me
 *      Who has access: Anyone
 *    Copy the Web app URL.
 * 4. On the server set:
 *      GOOGLE_SHEETS_LEADS_WEBHOOK_URL = <the Web app URL>
 *      GOOGLE_SHEETS_LEADS_SECRET      = <same string as SECRET below>
 * 5. (Optional, to catch failed payments) In Razorpay Dashboard > Webhooks, enable the
 *    "payment.failed" event on your existing webhook.
 *
 * Columns in Checkout Leads (row 1 headers):
 * A Timestamp | B Razorpay Order ID | C Name | D Email | E Phone | F Product |
 * G Amount (INR) | H Status | I Razorpay Payment ID | J Follow-up Notes
 *
 * Behaviour: one row per order ID. "Initiated" creates the row; "Paid" / "Failed" update
 * it. Rows still "Initiated" later are the people to follow up. Column J is never overwritten.
 */

var SHEET_NAME = "Checkout Leads";
var SECRET = "CHANGE_ME_TO_A_LONG_RANDOM_STRING";

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
    var lastRow = sheet.getLastRow();
    var rowIndex = -1;
    if (lastRow >= 2) {
      var ids = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
      for (var i = 0; i < ids.length; i++) {
        if (String(ids[i][0]) === String(data.orderId)) { rowIndex = i + 2; break; }
      }
    }

    if (rowIndex === -1) {
      sheet.appendRow([
        new Date(), data.orderId, data.name || "", data.email || "", "'" + (data.phone || ""),
        data.product || "", data.amountInr || "", data.status || "Initiated",
        data.paymentId || "", data.note || ""
      ]);
    } else {
      // Never downgrade a Paid row (webhooks can arrive out of order or be retried)
      var current = sheet.getRange(rowIndex, 8).getValue();
      if (current === "Paid" && data.status !== "Paid") return json_({ ok: true, skipped: true });

      sheet.getRange(rowIndex, 8).setValue(data.status);
      if (data.paymentId) sheet.getRange(rowIndex, 9).setValue(data.paymentId);
      if (data.name) sheet.getRange(rowIndex, 3).setValue(data.name);
      if (data.email) sheet.getRange(rowIndex, 4).setValue(data.email);
      if (data.phone) sheet.getRange(rowIndex, 5).setValue("'" + data.phone);
      if (data.product) sheet.getRange(rowIndex, 6).setValue(data.product);
      if (data.amountInr) sheet.getRange(rowIndex, 7).setValue(data.amountInr);
      if (data.note && data.status === "Failed") sheet.getRange(rowIndex, 10).setValue(data.note);
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
