# Construction Calculator Pro — Comprehensive Claim Register

**Document ID:** `CONSTRUCTION_CALCULATOR_PRO_CLAIM_REGISTER`  
**Date:** October 14, 2026  
**Auditor:** Digital Product QA & Technical Copywriter  
**Status:** COMPLETED & APPROVED FOR REMEDIATION  
**Target Page:** `src/app/p/construction-calculator-pro/page.tsx`  

---

## 1. Claim Classification & Assessment Matrix

| # | Existing Claim on Page | Page Section | Required Evidence | Available Evidence | Audit Status | Risk Level | Approved Replacement Copy |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | `4.94/5 • 2,840+ Homeowners, Renovators, Builders & Contractors` | Hero Header Pill | Independent transaction logs & third-party verified review ledger | No verified transaction database exists for this specific count | **UNSUPPORTED** | **HIGH** | `CPWD & IS 456 Aligned Standards • 31 Connected Calculation Worksheets` |
| **02** | `Plan, Price & Build with Precision. For Homeowners, Renovators, Builders & Contractors.` | Hero Headline | Workbook features support all 4 use cases | Supported by Blank Master, 1,500 sq ft Villa & Flat Remodel workbooks | **VERIFIED** | Low | Retain existing headline: *Plan, Price & Build with Precision.* |
| **03** | `Enter room sizes in Feet or Metres to instantly calculate exact cement, steel, sand, bricks, and paint` | Hero Subtitle | Tab 03 (`Setup`) unit toggle & takeoff formulas | Formulas calculate theoretical consumption from entered dimensions | **CONDITIONAL** | Medium | *Enter room sizes in Feet or Metres to calculate theoretical cement, steel, sand, bricks, and paint based on civil engineering consumption norms.* |
| **04** | `Works on Excel & Google Sheets` | Hero Trust Badges | Cross-platform test verification | Verified across Excel 2016-365, Google Sheets & LibreOffice | **VERIFIED** | Low | *Works on Microsoft Excel & Google Sheets (Zero Macros)* |
| **05** | `Instant Email Delivery (Files Attached)` | Hero Trust Badges & Banner | SMTP dispatch integration test | Live test verified: email sent via Hostinger SMTP with bundle attached | **VERIFIED** | Low | *Instant Email Delivery (Full .zip Attached)* |
| **06** | `Why 84% of Indian Homeowners Overpay` | Problem Section H2 | Published statistical survey or formal industry whitepaper | No cited statistical study | **UNSUPPORTED** | Medium | *Why Construction & Renovation Budgets Commonly Exceed Estimates* |
| **07** | `Average Loss: ₹1,50,000 to ₹4,00,000 on site` | Problem Section Callout | Documented site financial audit database | Anecdotal industry range without empirical dataset | **UNSUPPORTED** | Medium | *Typical Site Vulnerabilities: Unaudited measurements, unverified extra works & unmonitored material waste.* |
| **08** | `Result: Zero financial surprises. You stay 100% on budget.` | Solution Card | Guarantee of financial outcome | Uncontrollable site conditions, market fluctuations & contractor behavior | **UNSUPPORTED** | **HIGH** | *Result: Clear financial clarity. Every rupee, measurement, and material delivery is documented and audited.* |
| **09** | `Documented Savings: ₹42,000 to ₹85,000 on average build` | Solution Card Footer | Traceable case study ledger | Specific numbers not backed by verified case studies | **UNSUPPORTED** | **HIGH** | *Core Benefit: Catch material overclaims and unverified variation bills before releasing disbursements.* |
| **10** | `Automated 5% red alert: Tab 25 (Bill Check) catches contractor overbilling instantly using civil engineering norms.` | Feature List | Tab 25 conditional formatting inspection | Verified in workbook (`=IF(OR(D7="",C7=0),"",E7/C7)` with >0.05 red fill) | **VERIFIED** | Low | *Automated 5% Variance Flag: Tab 25 (Bill Check) flags contractor claims that exceed drawing calculations by more than 5%.* |
| **11** | `Reviews by Rajesh K. (Saved ₹42,000), Anand Kulkarni (Saved ₹38,000), Pooja & Vikram Sharma (Saved ₹54,000), Er. Sunil Verma (Won 4 New Contracts)` | Testimonials Section | Verifiable KYC, signed affidavits, or third-party verified reviews | No verifiable customer transaction records exist for these specific identities | **UNSUPPORTED** | **CRITICAL** | **REMOVE FABRICATED REVIEWS.** Replace with **Realistic Project Walkthroughs & Practical Use-Case Scenarios** (e.g. *Scenario A: Auditing Villa Slab Concrete*, *Scenario B: Flat Renovation Paint Takeoff*, *Scenario C: Subcontractor Quotation*). |
| **12** | `₹499 (75% OFF) / Original Price ₹1,999` | Pricing Card & Banners | Price justification for comparison | Standard individual module pricing (₹1,500 total standalone bonuses + ₹499 core) | **CONDITIONAL** | Medium | Retain ₹499 price. Position ₹1,999 as *Combined Component Value* based on 3 workbooks + 13 guides + 7 specialized bonus kits. |
| **13** | `3 Specialized Workbooks (31 Tabs)` | Deliverables Box | File inspection of `.zip` package | Verified: 3 workbooks present, each with exactly 31 sheets | **VERIFIED** | Low | *3 Complete Workbooks (31 Connected Sheets Each: Blank Master, 1,500 sq ft Villa Example, Flat Renovation Example)* |
| **14** | `13 PDF Guides & Kits + 7 Bonus Guides` | Deliverables Box | File inspection of `.zip` package | Verified: Exactly 13 core/implementation PDFs and 7 bonus PDFs present | **VERIFIED** | Low | Retain: *13 PDF Implementation Documents + 7 Specialized Bonus Toolkits (All Finalized)* |
| **15** | `All Sales Final · No Refunds` | Pricing Card & FAQ | Alignment with legal terms page | Verified in `refund-policy/page.tsx` and Workbook Sheet 23 | **VERIFIED** | Low | *All Sales Final · Immediate Digital Delivery · 100% Technical Support at orders@thinktools.in* |
| **16** | `Accepted Payments: GPay, PhonePe, Paytm, BHIM UPI, RuPay / Cards` | Pricing Trust Badges | Razorpay payment options | Verified active on Razorpay Standard Checkout gateway | **VERIFIED** | Low | Retain payment badges (UPI, Cards, NetBanking via Razorpay). |

---

## 2. Social Proof & Testimonial Rectification Strategy

Under consumer protection guidelines (Consumer Protection Act 2019 / E-Commerce Rules), social proof must never be fabricated.

### Remediation Action:
1. **Remove Unsupported Ratings & Counts:** Remove `"4.94/5 • 2,840+ Homeowners, Renovators, Builders & Contractors"`. Replace with verified technical credentials: `"Engineered to Indian Civil Standards (CPWD & IS 456) • 31 Connected Worksheets • Macro-Free OpenXML"`.
2. **Transform Testimonials into "Practical Site Scenarios":** Instead of attributing savings to fictional individuals, frame the content as **"Real-World Site Applications"**:
   - *Application 1: Independent Slab Steel Auditing (How to catch bar weight overclaims using IS 1786 rebar constants).*
   - *Application 2: Flat Renovation Surface Takeoff (How door and window opening deductions prevent excess paint & plaster ordering).*
   - *Application 3: Milestone Cash Flow Control (How to tie contractor advances to verified stage checklist sign-offs).*
   - *Application 4: Contractor Client Quotations (How small builders generate professional itemized BOQ proposals with GST breakdown).*

---

## 3. Performance & Savings Promise Rectification

### Policy:
Never guarantee financial outcomes, zero surprises, or exact costs.

### Replacement Tone Guidelines:
- **From:** *"Guaranteed to keep you on budget with zero surprises."*
- **To:** *"Plan quantities, model local material rates, and audit subcontractor bills within a disciplined, transparent framework."*
- **From:** *"Calculates exact cement, steel and brick quantities."*
- **To:** *"Calculates theoretical material requirements using civil engineering mix ratios and standard wastage allowances."*

---
*End of Claim Register.*
