# Meta Pixel & Conversions API (CAPI) Purchase Deduplication QA Protocol

This protocol guides you through verifying that browser Pixel and server CAPI Purchase events deduplicate into **exactly 1 purchase conversion** inside Meta Events Manager.

---

## 1. Prerequisites & Environment Setup

1. Open `.env.local` (or your Hostinger Node.js environment variables configuration).
2. Ensure the primary Pixel ID and Conversions API Access Token are set:
   ```env
   NEXT_PUBLIC_META_PIXEL_ID=1643533957395571
   META_CAPI_ACCESS_TOKEN=your_meta_capi_system_user_token_here
   ```
3. Open **Meta Events Manager**:
   - Go to `https://business.facebook.com/events_manager2`
   - Select Pixel/Dataset: **`1643533957395571`** (Thinktools Website Pixel)
   - Click the **Test events** tab.
   - Look for the server test code displayed under **"Confirm your server events are set up correctly"** (e.g. `TEST12345`).
4. Set the test event code in your `.env.local` (or Hostinger environment):
   ```env
   META_TEST_EVENT_CODE=TEST12345
   ```
5. Restart the local development server (or restart the Node.js application in Hostinger) to load the new environment variable.

---

## 2. Execute a Single Test Purchase

1. Open your browser in Chrome (preferably with **Meta Pixel Helper** extension installed).
2. In Meta Events Manager > **Test events** tab, enter `https://thinktools.in/p/construction-calculator-pro` (or `http://localhost:3000/p/construction-calculator-pro` if testing locally) in the **"Test browser events"** section and click **Open Website**.
3. On the product page:
   - Click **"Get Instant Access (₹299)"** or any bundle option.
   - Enter your customer name, email, and phone in the checkout modal.
   - Complete payment using Razorpay Test Mode (or ₹1 live test order).
4. After payment authorization:
   - The browser automatically navigates to the confirmation page:
     `/p/construction-calculator-pro/download?order_id=order_xxxx&payment_id=pay_xxxx&amount=299`
   - The download page fires the browser Pixel `Purchase` event **once** with `eventID: "order_xxxx"`.
   - The server `/api/verify-payment` endpoint dispatches the server CAPI `Purchase` event **once** with `event_id: "order_xxxx"`.

---

## 3. Verify in Meta Events Manager

In Meta Events Manager > **Test events** live feed, inspect the incoming events:

1. **Two Event Signals Received:**
   - **Signal 1:** `Purchase` from **Browser** (`Pixel 1643533957395571`).
   - **Signal 2:** `Purchase` from **Server** (`Conversions API`).
2. **Matching Event ID:**
   - Click on the Browser `Purchase` event &rarr; verify `Event ID: order_xxxx`.
   - Click on the Server `Purchase` event &rarr; verify `Event ID: order_xxxx`.
3. **Matching Parameters:**
   - Value: `299` (or the bundle total if add-ons were selected).
   - Currency: `INR`.
4. **Deduplication Badge:**
   - Meta will automatically group the two events into a single conversion row labeled **"Deduplicated"** (`Processed: 1 Purchase`).
5. **Reload / Re-entry Protection Test:**
   - Refresh the `/download` page in your browser.
   - Check Meta Events Manager: **zero new events** are recorded. The `localStorage` guard (`fb_purchase_order_xxxx`) prevents duplicate client-side triggers.
   - Re-send or retry `/api/verify-payment` via cURL or Postman: **zero new CAPI events** are dispatched. The persistent atomic lock on `capi_purchase_sent: true` prevents duplicate server transmissions.

---

## 4. Teardown & Transition to Live Mode

1. Once the deduplicated status badge is verified, remove the test code from `.env.local` (and Hostinger environment variables):
   ```env
   # Remove or comment out this line before running live paid ad traffic:
   # META_TEST_EVENT_CODE=
   ```
2. Restart the application server.
3. Your tracking pipeline is now live, idempotent, and deduplicated.

