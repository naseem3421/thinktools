# Thinktools Construction Calculator Pro — Legal & Business Terms Alignment Audit

**Document ID:** `CONSTRUCTION_CALCULATOR_PRO_TERMS_AUDIT`  
**Date:** October 14, 2026  
**Auditor:** Digital Commerce Compliance & Legal Policy Reviewer  
**Status:** COMPLETED & SYNCHRONIZED  
**Jurisdiction:** Republic of India (Information Technology Act 2000, Consumer Protection Act 2019, E-Commerce Rules)  

---

## 1. Executive Summary

This audit cross-references and reconciles the legal, commercial, and operational terms governing Construction Calculator Pro across four key touchpoints:
1. The **Live Landing Page** (`/p/construction-calculator-pro`).
2. The **Checkout Drawer** (`src/components/CheckoutModal.tsx`).
3. The **Excel Workbooks** (Sheet 23: `Terms & Disclaimer`).
4. The **Official Legal Pages** (`/terms`, `/refund-policy`, `/shipping-policy`, `/privacy-policy`).

All previous placeholders (`[Support contact]`, `[Update policy]`, `[Refund policy]`, `[Seller name]`) have been eliminated and synchronized with verified business parameters.

---

## 2. Term-by-Term Alignment Audit

| Policy Dimension | Landing Page & Checkout | Workbook Sheet 23 (`Terms & Disclaimer`) | Delivered PDF Guides | Formal Policy Pages | Alignment Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Seller Identity** | Thinktools (`thinktools.in`) | Thinktools (`thinktools.in`) | Thinktools | Thinktools (`thinktools.in`) | **SYNCHRONIZED** |
| **Support Email** | `support@thinktools.in` | `support@thinktools.in` | `support@thinktools.in` | `support@thinktools.in` (Delivery: `orders@thinktools.in`) | **SYNCHRONIZED** |
| **Digital Delivery** | Instant automated email delivery with digital files attached | Instant digital delivery | Delivered in `.zip` bundle | Dispatched immediately via Hostinger Secure SMTP | **SYNCHRONIZED** |
| **Refund Policy** | All sales final; replacement support for corrupted files | All sales final; replacement support for technical issues | Reference to terms | Strict No-Refund Policy; duplicate charges reversed | **SYNCHRONIZED** |
| **License to Use** | Single-user personal and commercial project planning | Single-user personal and business planning license | Non-transferable; redistribution prohibited | Personal & commercial project planning; resale prohibited | **SYNCHRONIZED** |
| **Updates & Errata** | Lifetime access to downloaded version; notifications via email | Errata notifications sent via registered purchaser email | Clarified in README.pdf | Errata updates dispatched via email | **SYNCHRONIZED** |
| **Compatibility** | Excel 2016-365, Google Sheets, LibreOffice | Excel 2016-365, Google Sheets, LibreOffice | Tested on standard OpenXML | Full cross-platform specs detailed | **SYNCHRONIZED** |
| **Professional Boundaries**| Non-structural planning engine; verify with structural engineer | Planning tool only; not structural engineering or legal advice | Standard administrative templates; verify with engineer | Comprehensive limitation of liability clause | **SYNCHRONIZED** |

---

## 3. Regulatory & Compliance Evaluation

### 3.1 Digital Goods Refund Enforceability under Indian Law
- **Statutory Framework:** Consumer Protection (E-Commerce) Rules, 2020 and Consumer Protection Act, 2019.
- **Analysis:** Under Indian consumer protection norms, digital software products that are delivered irrevocably upon payment may establish a "No Refund / All Sales Final" policy provided:
  1. The no-refund policy is clearly and conspicuously displayed prior to checkout.
  2. The exact deliverable formats (`.xlsx` workbooks and `.pdf` files) and features are accurately represented.
  3. Technical defects (corrupted files or delivery failure) or accidental duplicate payments are promptly cured or reversed.
- **Verification:**
  - `CheckoutModal.tsx` contains an explicit pre-purchase notice: *"All sales are final for digital goods. Instant email delivery with files attached."*
  - The `/refund-policy` page details exact resolution protocols for duplicate transactions and undelivered emails.

### 3.2 Professional Liability & Engineering Disclaimers
- **Critical Risk:** A homeowner or contractor relying on standard spreadsheet formulas could attempt to hold Thinktools liable for structural collapse, foundation settlement, or municipal regulatory non-compliance.
- **Protection Implemented:**
  - Sheet 23 explicitly specifies: *"What this file is not: It is not a structural design. It does not check loads, safety or building bylaws. It does not replace a structural engineer, architect, quantity surveyor or licensed contractor."*
  - Landing page copy emphasizes theoretical civil consumption norms rather than universal structural specifications.

---

## 4. Professional Separation of Concerns

> [!IMPORTANT]
> **Technical vs. Legal Distinction:**  
> The findings in this document represent product QA, digital compliance best practices, and commercial alignment. They do not constitute formal legal counsel. Prior to high-volume commercial scaling or institutional enterprise contracts, formal review by an advocate qualified in Indian corporate and intellectual property law is recommended.

---
*End of Terms Audit Report.*
