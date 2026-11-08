/**
 * Thinktools Unified Google Sheets Webhook
 * 1. Sales Tab (gid=1283655229): Records every completed paid sale.
 * 2. Checkout Leads Tab: Tracks unpaid checkouts (auto-deleted when paid).
 *
 * Date Format: DD/MM/YYYY, hh:mm a (IST)
 */

var SECRET = "00f3e9347a92fa6c8fcf406b6f72d8952a46d7315d77d76b";
var SALES_GID = 1283655229; // Your main Sales / Transactions tab
var LEADS_SHEET_NAME = "Checkout Leads";

function getSheetByGid(ss, gid) {
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getSheetId() === gid) return sheets[i];
  }
  return null;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    var data = JSON.parse(e.postData.contents);

    var isAuth = (data.secret && data.secret === SECRET) || (data.event === "payment.captured");
    if (!isAuth) {
      return json_({ ok: false, error: "unauthorized" });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var salesSheet = getSheetByGid(ss, SALES_GID) || ss.getSheets()[0];
    var leadsSheet = ss.getSheetByName(LEADS_SHEET_NAME);

    // Normalize data (supports both direct leadLog and Razorpay payload)
    var orderId = data.orderId || (data.payload && data.payload.payment && data.payload.payment.entity.order_id) || "";
    var paymentId = data.paymentId || (data.payload && data.payload.payment && data.payload.payment.entity.id) || "";
    var status = data.status || (data.event === "payment.captured" ? "Paid" : "Initiated");
    var name = data.name || (data.payload && data.payload.payment && data.payload.payment.entity.notes && data.payload.payment.entity.notes.customer_name) || (data.payload && data.payload.payment && data.payload.payment.entity.name) || "";
    var email = data.email || (data.payload && data.payload.payment && data.payload.payment.entity.email) || "";
    var phone = data.phone || (data.payload && data.payload.payment && data.payload.payment.entity.contact) || "";
    var product = data.product || (data.payload && data.payload.payment && data.payload.payment.entity.notes && data.payload.payment.entity.notes.product_title) || "Construction Calculator Pro";
    var amount = data.amountInr || (data.payload && data.payload.payment && Math.round(data.payload.payment.entity.amount / 100)) || "";

    // Date formatted as DD/MM/YYYY, hh:mm a in Indian Standard Time (IST)
    var timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy, hh:mm a");

    // ==========================================
    // 1. IF PAID: LOG TO SALES TAB & CLEAN UP LEADS TAB
    // ==========================================
    if (status === "Paid" || status === "captured") {
      // Avoid duplicate entries in Sales Tab
      var alreadyInSales = false;
      var salesLastRow = salesSheet.getLastRow();
      if (salesLastRow >= 2) {
        var salesData = salesSheet.getRange(2, 1, salesLastRow - 1, Math.min(salesSheet.getLastColumn(), 5)).getValues();
        for (var s = 0; s < salesData.length; s++) {
          var rowText = salesData[s].join(" ");
          if ((orderId && rowText.indexOf(orderId) !== -1) || (paymentId && rowText.indexOf(paymentId) !== -1)) {
            alreadyInSales = true;
            break;
          }
        }
      }

      if (!alreadyInSales) {
        salesSheet.appendRow([
          timestamp,
          orderId,
          paymentId,
          name,
          email,
          "'" + phone,
          product,
          amount ? "₹" + amount : "",
          "PAID"
        ]);
      }

      // Automatically remove from "Checkout Leads" tab (keeps leads Unpaid Only)
      if (leadsSheet) {
        var leadsLastRow = leadsSheet.getLastRow();
        if (leadsLastRow >= 2) {
          var ids = leadsSheet.getRange(2, 2, leadsLastRow - 1, 1).getValues();
          for (var i = 0; i < ids.length; i++) {
            if (String(ids[i][0]) === String(orderId)) {
              leadsSheet.deleteRow(i + 2);
              break;
            }
          }
        }
      }

      return json_({ ok: true, action: "logged_sale_and_cleaned_lead" });
    }

    // ==========================================
    // 2. IF UNPAID / INITIATED / FAILED: LOG TO LEADS TAB
    // ==========================================
    if (leadsSheet) {
      var rawPhone = String(phone || "").replace(/[^0-9]/g, "");
      var waPhone = rawPhone.length === 10 ? "91" + rawPhone : rawPhone;
      var waLink = waPhone ? "https://wa.me/" + waPhone : "";

      var lastRow = leadsSheet.getLastRow();
      var rowIndex = -1;
      if (lastRow >= 2) {
        var ids = leadsSheet.getRange(2, 2, lastRow - 1, 1).getValues();
        for (var i = 0; i < ids.length; i++) {
          if (String(ids[i][0]) === String(orderId)) {
            rowIndex = i + 2;
            break;
          }
        }
      }

      if (rowIndex === -1) {
        leadsSheet.appendRow([
          timestamp,
          orderId,
          name,
          email,
          "'" + phone,
          product,
          amount ? "₹" + amount : "",
          status || "Initiated",
          paymentId,
          data.note || "",
          waLink
        ]);
        return json_({ ok: true, action: "added_unpaid_lead" });
      } else {
        leadsSheet.getRange(rowIndex, 8).setValue(status);
        if (paymentId) leadsSheet.getRange(rowIndex, 9).setValue(paymentId);
        if (name) leadsSheet.getRange(rowIndex, 3).setValue(name);
        if (email) leadsSheet.getRange(rowIndex, 4).setValue(email);
        if (phone) leadsSheet.getRange(rowIndex, 5).setValue("'" + phone);
        if (product) leadsSheet.getRange(rowIndex, 6).setValue(product);
        if (amount) leadsSheet.getRange(rowIndex, 7).setValue(amount ? "₹" + amount : "");
        if (data.note) leadsSheet.getRange(rowIndex, 10).setValue(data.note);
        if (waLink) leadsSheet.getRange(rowIndex, 11).setValue(waLink);
        return json_({ ok: true, action: "updated_unpaid_lead" });
      }
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
