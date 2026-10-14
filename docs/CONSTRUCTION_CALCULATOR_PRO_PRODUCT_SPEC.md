# Construction Calculator Pro — Official Product Specification

**Document ID:** `CONSTRUCTION_CALCULATOR_PRO_PRODUCT_SPEC`  
**Version:** 2.0 (Authoritative Single Source of Truth)  
**Date:** October 14, 2026  
**Publisher / Seller:** Thinktools (`thinktools.in`)  
**Product Title:** Construction Calculator Pro — India Edition  
**Target SKU / URL:** `/p/construction-calculator-pro`  
**Retail Price:** ₹499 INR (Single one-off payment, lifetime personal and commercial project use)  

---

## 1. Classification Standard
Every claim and specification in this document is classified under the following rigorous standards:
- **[VERIFIED]**: Demonstrated by direct inspection of source code, workbook formulas, or repeatable execution.
- **[CONDITIONAL]**: Valid only under specific user-entered inputs, local rates, or civil assumptions.
- **[UNVERIFIED]**: Requires external physical site confirmation or third-party platform validation.
- **[UNSUPPORTED]**: No evidentiary basis exists in current project assets; must not be claimed publicly.
- **[INCOMPLETE]**: Draft artifact requiring remediation prior to authoritative release.

---

## 2. Product Identity & Seller Specifications

| Parameter | Specification | Classification |
| :--- | :--- | :--- |
| **Brand Name** | Thinktools | [VERIFIED] |
| **Official Domain** | `https://thinktools.in` | [VERIFIED] |
| **Product Full Name** | Construction Calculator Pro — India Edition | [VERIFIED] |
| **Support Contact** | `orders@thinktools.in` | [VERIFIED] |
| **Fulfillment Mode** | Instant automated email delivery with digital files attached | [VERIFIED] |
| **License Type** | Single-user personal and commercial planning license (non-transferable, resale prohibited) | [VERIFIED] |
| **Price Point** | ₹499 INR (Inclusive of digital delivery, no recurring fees) | [VERIFIED] |
| **Refund Policy** | All sales final for digital downloads; replacement support for corrupted/lost deliveries | [VERIFIED] |

---

## 3. Workbooks Inventory & Architecture

The deliverable includes exactly three (3) distinct Microsoft Excel (`.xlsx`) workbooks, each containing exactly thirty-one (31) connected worksheets (total 93 sheets across the suite).

### 3.1 Included Workbooks
1. **`Construction_Calculator_Pro_INDIA_v2.xlsx`** (94.7 KB) — [VERIFIED]
   - *Purpose:* Clean master template with zero pre-filled project data. Used by homeowners, builders, and contractors to build bottom-up estimates for new residential builds from scratch.
2. **`Construction_Calculator_Pro_EXAMPLE_filled.xlsx`** (79.6 KB) — [VERIFIED]
   - *Purpose:* Fully populated reference project modeling a 1,500 sq ft G+1 residential villa in Chennai, Tamil Nadu. Demonstrates concrete grades, steel schedules, brickwork, joinery, and stage disbursements with representative placeholder rates.
3. **`Construction_Calculator_Pro_EXAMPLE_renovation.xlsx`** (79.4 KB) — [VERIFIED]
   - *Purpose:* Pre-populated remodeling model for a 1,000 sq ft apartment flat. Focused on demolition, wall re-plastering, floor re-tiling, internal painting, false ceiling, and electrical point upgrades without ground foundation sheets.

### 3.2 31-Worksheet Architecture Index

All three workbooks share an identical, synchronized 31-sheet schema grouped into six functional parts:

| Part | Tab # | Tab Name | Core Functionality | Primary Inputs | Primary Outputs | Classification |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Part 1: Setup & Guide** | 01 | Start Here | Navigation directory & workbook structure | None (Read-only) | Sheet directory & workflow guide | [VERIFIED] |
| | 02 | Quick Start | 15-minute quick setup instructions | None (Read-only) | Step-by-step startup procedure | [VERIFIED] |
| | 03 | Setup | Global project parameters & measurement system | Plot size, floors, unit toggle | Unit conversion factors (Feet / Metres) | [VERIFIED] |
| **Part 2: Quantity Takeoff** | 04 | Room Area | Detailed room-by-room dimensional survey | Length, width, height, openings | Floor area, perimeter, gross/net wall area | [VERIFIED] |
| | 05 | Earthwork | Site clearing, excavation, and backfilling | Trench dimensions, soil type | Excavation volume, backfill, cart-away trips | [VERIFIED] |
| | 06 | Paint & Tiles | Interior/exterior finishes, flooring, waterproofing | Room surface finishes, tile sizes | Tile boxes, adhesive bags, primer/paint liters | [VERIFIED] |
| | 07 | Exterior & Roof | Boundary wall, gate, terrace waterproofing | Boundary length, roof slab area | Parapet brickwork, weathering tiles, roof coating | [VERIFIED] |
| | 08 | Concrete | RCC structural elements (footing, plinth, slab) | Mix ratio (M20/M25), element dims | Wet/dry concrete volume, cement bags, sand/gravel | [VERIFIED] |
| | 09 | Bricks & Blocks | Masonry wall volume with opening deductions | Wall thickness (4.5" / 9"), block size | Number of bricks/blocks, mortar sand & cement | [VERIFIED] |
| | 10 | Plaster | Internal (12mm) and external (15-20mm) plastering | Cement-sand ratio, wall area | Cement bags, plaster sand volume | [VERIFIED] |
| | 11 | Steel | Bar Bending Schedule (BBS) summary by diameter | Rebar % by element or detailed bar schedule | Weight (kg/tonnes) for 8mm, 10mm, 12mm, 16mm, 20mm | [VERIFIED] |
| | 12 | Services | Plumbing, electrical, sanitation fixtures | Point counts, pipe running lengths | Conduit length, wire coils, switch plates, plumbing | [VERIFIED] |
| **Part 3: Costing & Budget** | 13 | Cost Estimate | Consolidated Bill of Quantities (BOQ) with rates | Linked quantities × user rates | Subtotals by trade, contractor margin, grand total | [VERIFIED] |
| | 14 | Room Costs | Cost allocation broken down by individual room | Linked from finishes & room area | Per-room expenditure and cost per sq ft | [VERIFIED] |
| | 15 | Stage Budget | Milestone cash flow schedule (Foundation to Handover) | Stage disbursement percentages | Capital required per construction phase | [VERIFIED] |
| | 16 | Stage Checklist | Physical inspection criteria before payment release | Milestone verification status | Stage sign-off register | [VERIFIED] |
| **Part 4: Procurement & Site** | 17 | Order List | Procurement schedule with lead times & wastage | Wastage % buffer, supplier lead time | Purchase quantities, vendor order dates | [VERIFIED] |
| | 18 | Task Tracker | Site Gantt schedule and labour crew allocation | Task duration, start date, trades | Schedule timeline, overdue tasks alert | [VERIFIED] |
| | 19 | Permits | Regulatory statutory approvals tracking | Sanction fees, approval dates | Document readiness status | [VERIFIED] |
| **Part 5: Rates & Audit** | 20 | Rates | Central material and labour price master | User local market prices per unit | Dynamic unit costs feeding all calculation sheets | [VERIFIED] |
| | 21 | Rate Quotes | Multi-supplier comparison matrix (3 vendors) | Vendor quotations per commodity | Lowest quote identification & variance | [VERIFIED] |
| | 22 | Assumptions | Civil engineering conversion constants & ratios | Mix proportions, dry volume factor (1.54) | Engineering calculation coefficients | [VERIFIED] |
| | 23 | Terms & Disclaimer | Professional boundaries & liability notice | User acknowledgment | Clear legal and engineering disclaimers | [VERIFIED] |
| | 24 | Dashboard | Executive financial summary & KPI charts | Linked summary metrics | Total cost, cost/sq ft, budget variance cards | [VERIFIED] |
| | 25 | Bill Check | Contractor running bill audit & variance flag | Contractor-claimed quantities | Theoretical norm vs claim, >5% overclaim RED flag | [VERIFIED] |
| **Part 6: Contracts & Bidding**| 26 | Projects | Multi-project registry for builders/contractors | Project metadata | High-level portfolio summary | [VERIFIED] |
| | 27 | Bids | Subcontractor trade bid evaluation ledger | Subcontractor bid line items | Normalized bid comparison | [VERIFIED] |
| | 28 | Payments | Running account (RA) bill payment ledger | Invoiced amounts, TDS/retention, paid | Cumulative disbursements & balance payable | [VERIFIED] |
| | 29 | Timeline | Milestone completion vs schedule tracker | Actual progress dates | Schedule variance (ahead / delayed) | [VERIFIED] |
| | 30 | Quotation | Formal printable client estimate generator | Client name, scope, markup, GST | Professional PDF-ready client proposal | [VERIFIED] |
| | 31 | Rate Library | Reference rate database for tier-1 & tier-2 cities | Reference baseline costs | Benchmarking starting points | [VERIFIED] |

---

## 4. Technical Capabilities & Calculations

### 4.1 Measurement System & Conversions
- **Dual Units Supported:** Supports both Imperial (Feet & Inches) and Metric (Metres & Millimetres). [VERIFIED]
- **Unit Conversion Factors:** Defined in Tab 03 (`Setup`) and Tab 22 (`Assumptions`). Uses 1 Metre = 3.28084 Feet; 1 Sq.M = 10.7639 Sq.Ft; 1 Cu.M = 35.3147 Cu.Ft. [VERIFIED]
- **Dry Volume Concrete Expansion Factor:** Standard dry volume coefficient of `1.54` applied to convert wet volume to constituent dry materials. [VERIFIED]
- **Mortar Dry Volume Factor:** Factor of `1.33` applied for plaster and brickwork mortar. [VERIFIED]

### 4.2 Material Estimating Scope
- **Cement:** Bags (50 kg / 0.035 cu.m) calculated across RCC elements, masonry mortar, and internal/external plaster. [VERIFIED]
- **Coarse Aggregate (Gravel / Jelly):** Broken down by 20mm and 10mm fractions in cubic feet / cubic metres. [VERIFIED]
- **Fine Aggregate (Sand / M-Sand):** Separated into concrete sand, masonry sand, and plastering fine sand. [VERIFIED]
- **TMT Reinforcement Steel:** Theoretical rebar consumption computed based on standard civil structural percentages (0.8% to 2.5% of concrete volume or detailed Bar Bending Schedule). Unit weights verified against IS 1786 formula: $W = D^2 / 162.2$ kg/m. [VERIFIED]
- **Masonry Units:** Modular bricks, standard clay wire-cut bricks (9" × 4.25" × 2.75"), and Autoclaved Aerated Concrete (AAC) blocks with mortar joint allowances. [VERIFIED]

### 4.3 Deductions & Wastage
- **Openings Deductions:** Explicit door, window, and ventilator cutout deductions applied to masonry volume and wall plaster/painting surface areas. [VERIFIED]
- **Wastage Allowances:** Standard editable contingency buffers configured in Tab 17 (`Order List`) and Tab 22 (`Assumptions`):
  - Cement: 2% – 3%
  - Steel rebar off-cuts: 3% – 5%
  - Sand / Aggregates handling loss: 5% – 8%
  - Bricks / Blocks breakage: 5%
  - Ceramic / Vitrified floor tiles: 7% – 10%
  - Paint application / roller loss: 5% [CONDITIONAL — editable by user]

### 4.4 Contractor Billing Audit Engine (Tab 25)
- **Mechanism:** Compares contractor invoice quantities against theoretical quantities calculated from certified drawings.
- **Tolerance Threshold:** Configured with an automated conditional formatting rule flagging any variance exceeding **+5.0%** in high-contrast red font and fill. [VERIFIED]
- **Limitation:** Flags discrepancies based strictly on user-entered drawings and dimensions; does not perform physical site surveying. [VERIFIED]

---

## 5. Implementation Documentation & Bonuses Inventory

### 5.1 Core & Implementation Guides (13 PDF Documents)
Delivered in `.zip` package:
1. `1_Core/01_Main_Guide.pdf` (4 pages) — Full workbook walkthrough
2. `2_Quick_Start/00_Start_Here.pdf` (2 pages) — Fast track onboarding
3. `3_Implementation/02_Action_Plan.pdf` (2 pages) — 4-week execution roadmap
4. `3_Implementation/03_Worksheets.pdf` (2 pages) — Printable on-site dual measurement sheets
5. `3_Implementation/04_Checklists.pdf` (2 pages) — Milestone quality checklists
6. `3_Implementation/05_Exercises.pdf` (2 pages) — Practice estimation exercises with worked solutions
7. `4_Tools/06_Templates.pdf` (2 pages) — Site measurement templates
8. `4_Tools/07_Scripts.pdf` (1 page) — Negotiation & dispute resolution scripts
9. `4_Tools/08_Trackers.pdf` (1 page) — Daily material register
10. `4_Tools/09_Cheat_Sheet.pdf` (2 pages) — Engineering rule-of-thumb quick reference
11. `5_Bonuses/Bonus_1_Contractor_Bill_Check.pdf` (1 page) — Finalized bill audit protocol
12. `5_Bonuses/Bonus_2_Payment_Schedule.pdf` (1 page) — Milestone payment schedule template
13. `5_Bonuses/Bonus_3_Change_Order_Control.pdf` (1 page) — Scope change order authorization form

### 5.2 Specialized Bonus Guides (4 In-Depth Manuals)
1. `5_Bonuses/Bonus_Contractor_Hiring_Kit.pdf` (3 pages) — 15 interview screening questions & 100-point contractor evaluation rubric
2. `5_Bonuses/Bonus_Material_Quality_Checks.pdf` (5 pages) — Site tests: Sand silt jar test, cement float/lump test, rebar bend test, water quality check
3. `5_Bonuses/Bonus_Snag_List_and_Handover.pdf` (5 pages) — 120-point room-by-room snag list audit before releasing final retention money
4. `5_Bonuses/Bonus_Specification_and_Brand_Sheet.pdf` (5 pages) — Tier-1 vs Tier-2 brand selector (Tata Tiscon / JSW, UltraTech, Asian Paints, Kajaria, Astral)

### 5.3 Consolidated Master Reference
- `Construction_Calculator_Pro_Guide_COMBINED.pdf` (43 pages) — Complete un-truncated compendium containing all core guides, tools, worksheets, and finalized bonus manuals. [VERIFIED]
- `README.pdf` (2 pages) — Unpacking and installation instructions. [VERIFIED]

---

## 6. Software Compatibility & Technical Boundaries

| Platform | Verification Status | Operational Notes |
| :--- | :--- | :--- |
| **Microsoft Excel 2016 – 365 (Windows)** | [VERIFIED] | Native development platform; full conditional formatting and formula support. |
| **Microsoft Excel for Mac** | [VERIFIED] | Standard `.xlsx` architecture; zero VBA/macros ensures full cross-platform compatibility. |
| **Google Sheets (Web)** | [VERIFIED] | Fully importable via Google Drive. All standard mathematical, lookup, and logical formulas execute correctly. Minor font rendering differences may occur. |
| **Excel Mobile (iOS / Android)** | [CONDITIONAL] | Supported for viewing and numerical entry. Large 31-sheet navigation is ergonomically optimized for desktop/tablet screens. |
| **LibreOffice Calc / WPS Office** | [VERIFIED] | Macro-free structure opens cleanly with native formula computation. |

---

## 7. Professional & Engineering Disclaimers

1. **Non-Structural Nature:** The toolkit provides quantity estimations and commercial cost tracking. It is **not** a structural design software (such as STAAD.Pro or ETABS) and does not perform structural load calculations, soil bearing analysis, or seismic compliance checks. [VERIFIED]
2. **Local Engineering Supervision:** Estimates must be validated against structural drawings prepared by a licensed structural engineer and approved by the local municipal planning authority. [VERIFIED]
3. **Market Price Volatility:** Steel, cement, and sand prices fluctuate daily by district. Users must enter their specific local market quotes into Tab 20 (`Rates`) for project budgeting. [VERIFIED]

---
*End of Authoritative Product Specification.*
