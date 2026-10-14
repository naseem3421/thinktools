# Thinktools Construction Calculator Pro — Meta Ads & Tracking QA Audit

**Document ID:** `CONSTRUCTION_CALCULATOR_PRO_TRACKING_QA`  
**Date:** October 14, 2026  
**Auditor:** Digital Tracking & Analytics Specialist  
**Status:** READY FOR AD LAUNCH (ENVIRONMENT VARIABLES PENDING)  
**Target Page:** `https://thinktools.in/p/construction-calculator-pro`  

---

## 1. Executive Summary

This audit assesses the website's technical readiness for paid Meta Ads (Facebook & Instagram) and Google Ads campaigns. 

A modular client tracking architecture (`src/components/TrackingScripts.tsx`) has been deployed into the root layout (`src/app/layout.tsx`) and wired into the checkout journey (`src/components/CheckoutModal.tsx` and `src/app/p/construction-calculator-pro/page.tsx`).

Key Readiness Milestones:
1. **Dynamic Environment Variable Ingestion:** The system listens for `NEXT_PUBLIC_META_PIXEL_ID` and `NEXT_PUBLIC_GA4_ID`. When omitted in development/testing, scripts remain dormant with zero runtime console errors.
2. **Deterministic Funnel Telemetry:** Standard e-commerce events (`PageView`, `ViewContent`, `InitiateCheckout`, and `Purchase`) are configured with standardized INR currency and order values.
3. **Post-Payment Purchase Gating:** The `Purchase` event is triggered **exclusively** inside the verified payment callback following successful HMAC SHA256 signature confirmation by the backend `/api/verify-payment` endpoint. Abandoned checkouts or modal dismissals cannot trigger false purchases.
4. **Deduplication ID Readiness:** The `Purchase` event attaches the Razorpay payment ID (`pay_...`) as the unique `transaction_id`, providing an authoritative deduplication key for future Meta Conversions API (CAPI) server integration.

---

## 2. Event Specification & Funnel Trigger Map

| Funnel Stage | Standard Event Name | Trigger Source | Payload Parameters | Deduplication Key |
| :--- | :--- | :--- | :--- | :--- |
| **Page View** | `PageView` | Root layout load on all routes | `page_path` | Browser session ID |
| **Product Inspection** | `ViewContent` (GA4: `view_item`) | On mount of `/p/construction-calculator-pro` | `{ content_name: "Construction Calculator Pro", value: 499, currency: "INR" }` | N/A |
| **Checkout Clicked** | `InitiateCheckout` (GA4: `begin_checkout`) | On submit of customer form in `CheckoutModal.tsx` | `{ content_name: "Construction Calculator Pro", value: 499, currency: "INR" }` | Order Receipt ID |
| **Payment Confirmed** | `Purchase` (GA4: `purchase`) | Successful callback of `/api/verify-payment` | `{ content_name: "Construction Calculator Pro", value: 499, currency: "INR", transaction_id: razorpay_payment_id }` | **`razorpay_payment_id`** |

---

## 3. Configuration Requirements

To activate live tracking in production, the user must set the following environment variables in Hostinger:

```bash
NEXT_PUBLIC_META_PIXEL_ID=YOUR_META_PIXEL_ID_HERE
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
```

> [!NOTE]
> In accordance with project instructions, no dummy or fabricated Pixel/GA IDs were hardcoded into source code. Tracking will initialize immediately once real IDs are supplied in production environment settings.

---

## 4. Meta Conversions API (CAPI) Integration Architecture

For advertisers utilizing Meta CAPI in addition to browser Pixel:
1. **Dual Firing:** Browser Pixel sends `Purchase` with `event_id = razorpay_payment_id`.
2. **Server Webhook:** Backend `/api/verify-payment` dispatches server-side CAPI event with the identical `event_id = razorpay_payment_id`.
3. **Meta Deduplication:** Meta Events Manager matches the identical `event_id` within a 48-hour window and deduplicates the event, eliminating double-counted conversions while maximizing attribution resilience against ad-blockers and iOS privacy restrictions.

---

## 5. Privacy & Advertising Compliance

- **No Premature Spend:** No ad campaigns are currently running; marketing spend remains at zero.
- **Data Minimization:** No plaintext passwords, credit card numbers, or full payment credentials are sent to tracking scripts.
- **Clean UTM Passthrough:** Next.js routing preserves standard UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`) across page navigation.

---
*End of Tracking QA Report.*
