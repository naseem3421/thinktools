"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Download,
  FileSpreadsheet,
  FileText,
  ShieldAlert,
  ArrowLeft,
  Sparkles,
  Layers,
  Gift,
  HelpCircle,
  FileCheck2,
  ExternalLink,
  Archive
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function DownloadContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id") || "TT-839201";
  const name = searchParams.get("name") || "Valued Builder";
  const email = searchParams.get("email") || "your email";
  const hasBump = searchParams.get("bump") === "1";

  const handleDownload = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadMasterWorkbook = () => {
    const csvContent =
      "CONSTRUCTION CALCULATOR PRO - INDIA v2 (31-Sheet Master Workbook Engine)\n" +
      "Order ID: " + orderId + "\n" +
      "Licensed to: " + name + "\n" +
      "Version: 13 October 2026 Package\n\n" +
      "=========================================================================\n" +
      "COMPLETE 31-TAB WORKBOOK STRUCTURE (ACROSS 6 LOGICAL PARTS):\n" +
      "=========================================================================\n" +
      "PART 1 · GET STARTED\n" +
      "Tab 01: Start Here (Five-step route; what each tab does; key warnings)\n" +
      "Tab 02: Quick Start (Name, client, built-up area, budget, city, Feet or Metres)\n" +
      "Tab 03: Setup (Project type, 10% contingency default, GST 0% placeholder, units)\n\n" +
      "PART 2 · MEASURE AND QUANTIFY\n" +
      "Tab 04: Room Area (Up to 12 rooms: name, length, width, count -> Carpet & total area)\n" +
      "Tab 05: Earthwork (Trenches & pits: length, width, depth, count, excavation allowance)\n" +
      "Tab 06: Paint & Tiles (Wall heights, doors & windows deductions, paint & tile coverage)\n" +
      "Tab 07: Exterior & Roof (Outside wall length, height, openings, flat roof waterproofing)\n" +
      "Tab 08: Concrete (Slabs, beams, columns, footings, M20 mix ratio -> wet/dry volume, cement bags, sand, aggregate)\n" +
      "Tab 09: Bricks & Blocks (Wall sizes, thickness, red clay or AAC block counts & mortar)\n" +
      "Tab 10: Plaster (Thickness, mix, wastage; areas linked automatically from Paint & Tiles)\n" +
      "Tab 11: Steel (Bar diameter 8-25mm, length per bar, count -> D^2/162 weight in kg & tonnes)\n" +
      "Tab 12: Services (Plumbing fixture points & electrical switch points with unit rates)\n\n" +
      "PART 3 · COST AND BUDGET\n" +
      "Tab 13: Cost Estimate (Items calculators do not cover, actual spend, subtotal, 10% contingency, GST, headroom, cost/sqft)\n" +
      "Tab 14: Room Costs (Reads Paint & Tiles -> finish cost per room & share %)\n" +
      "Tab 15: Stage Budget (Target share for 9 stages, estimate vs target, Over/Within budget flags)\n\n" +
      "PART 4 · BUY, TRACK AND APPROVE\n" +
      "Tab 16: Stage Checklist (Done, date, inspector, technical verification notes)\n" +
      "Tab 17: Order List (Wastage %, supplier, calculated order-by dates before stage start)\n" +
      "Tab 18: Task Tracker (Task, stage, room, owner, dates, priority, days left, overdue in red)\n" +
      "Tab 19: Permits & Approvals (Sanction status, submission dates, fees linked to Cost Estimate)\n\n" +
      "PART 5 · RATES AND ASSUMPTIONS\n" +
      "Tab 20: Rates (16 master rates: cement, steel, sand, bricks, labour, excavation, roof)\n" +
      "Tab 21: Rate Quotes (Two suppliers per item with on-site delivery terms compared)\n" +
      "Tab 22: Assumptions (Dry volume 1.54, brick counts, verified by engineer notes)\n" +
      "Tab 23: Terms & Disclaimer (Usage scope, preliminary estimating license terms)\n\n" +
      "PART 6 · OVERVIEW, PAY AND CHECK\n" +
      "Tab 24: Dashboard (Rollup charts, budget headroom, material consumption totals)\n" +
      "Tab 25: Bill Check (Contractor's claimed quantities vs our calculation; auto 5% tolerance flag)\n" +
      "Tab 26: Projects (Portfolio manager for up to 5 properties with budget utilization %)\n" +
      "Tab 27: Bids (Side-by-side comparison of 3 contractor bids; lowest bidder & savings)\n" +
      "Tab 28: Payments (Up to 15 milestone disbursements & 10 signed change orders; remaining balance)\n" +
      "Tab 29: Timeline (Phase durations, milestone dates, progress tracker)\n" +
      "Tab 30: Quotation (Print-ready professional client BOQ proposal from Cost Estimate)\n" +
      "Tab 31: Rate Library (Historical quote registry by city, supplier, item, date)\n";
    handleDownload("Construction_Calculator_Pro_INDIA_v2.csv", csvContent);
  };

  const downloadFilledExample = () => {
    const content =
      "CONSTRUCTION CALCULATOR PRO - FILLED EXAMPLE (1,500 SQ FT 3-BHK CHENNAI)\n" +
      "Order ID: " + orderId + "\n" +
      "Licensed to: " + name + "\n\n" +
      "PROJECT BENCHMARK VALUES:\n" +
      "- Built-up Area: 1,500 sq ft (Carpet Area: 1,034 sq ft across 3 Bedrooms, Hall, Kitchen)\n" +
      "- Concrete RCC: 1,149 cu ft (32.5 m3) nominal mix -> 203 cement bags\n" +
      "- Masonry Walls: 22,302 red clay bricks (or 1,859 AAC blocks)\n" +
      "- Steel Reinforcement (TMT): 3.43 Metric Tonnes\n" +
      "- Interior/Exterior Paint: 80 Litres interior, 34 Litres exterior\n" +
      "- Flooring Vitrified Tiles: 294 tiles (600 x 600 mm)\n" +
      "- Total Civil & Finishing Estimate: Rs. 17,08,134 with 10% contingency (Rs. 1,139 / sq ft)\n\n" +
      "Includes sample bills, contractor bids, stage payment records, and task trackers.\n";
    handleDownload("Construction_Calculator_Pro_EXAMPLE_filled.txt", content);
  };

  const downloadRenovationExample = () => {
    const content =
      "CONSTRUCTION CALCULATOR PRO - FLAT RENOVATION EXAMPLE (1,000 SQ FT APARTMENT)\n" +
      "Order ID: " + orderId + "\n" +
      "Licensed to: " + name + "\n\n" +
      "PROJECT BENCHMARK VALUES:\n" +
      "- Scope: Kitchen, Bathroom and Bedroom renovation with no structural RCC work\n" +
      "- Room Area: Master bed, guest bed, living hall, kitchen, 2 bathrooms\n" +
      "- Floor & Wall Tiling: Vitrified retiling, bathroom dado, waterproofing\n" +
      "- Painting: Wall putty, primer, 2 coats interior emulsion\n" +
      "- Electrical & Sanitary: Plumbing fixture inlets/outlets and electrical points count\n" +
      "- Renovation Cost Estimate: Rs. 86,262 against Rs. 4,00,000 target budget\n";
    handleDownload("Construction_Calculator_Pro_EXAMPLE_renovation.txt", content);
  };

  const downloadCombinedGuide = () => {
    const guideContent =
      "CONSTRUCTION CALCULATOR PRO - COMBINED MASTER GUIDE (43 Pages)\n" +
      "File: Construction_Calculator_Pro_Guide_COMBINED.pdf\n" +
      "Order ID: " + orderId + "\n\n" +
      "TABLE OF CONTENTS (IN READING ORDER):\n" +
      "1. The Package in Brief (Promise, Who it is for, Structure)\n" +
      "2. How the Parts Work Together (5-Step Journey, 6-Step Onboarding, Internal Linking)\n" +
      "3. The Workbooks (All 31 Tabs with Enter vs Get, Example Benchmarks)\n" +
      "4. Core Product: Main Guide (8 Modules with time & outputs)\n" +
      "   - Module 1: Set up your project (10-15 min)\n" +
      "   - Module 2: Measure once (30-60 min)\n" +
      "   - Module 3: Calculate quantities (45-60 min)\n" +
      "   - Module 4: Set your rates (1-2 hours)\n" +
      "   - Module 5: Budget by stage (30-45 min)\n" +
      "   - Module 6: Order materials (30-45 min)\n" +
      "   - Module 7: Track payments, approvals & changes (30 min setup, 5 min/payment)\n" +
      "   - Module 8: Check a quote or bill (30 min per bill)\n" +
      "5. Quick Start (Start Here: 2-page route to first result in 20 min)\n" +
      "6. Implementation Kit:\n" +
      "   - Action Plan: 4 weeks to a signed estimate\n" +
      "   - Worksheets A to F (Printable room log, roof, paint, quotes, bill check, payment)\n" +
      "   - 4 Checklists (Pre-build, stage checks, pre-payment, handover)\n" +
      "   - 5 Exercises with worked answer keys\n" +
      "7. Tools:\n" +
      "   - 4 Templates (Rate request, change order, stage payment, approval fee)\n" +
      "   - 5 WhatsApp & Phone Negotiation Scripts\n" +
      "   - Tracking guide & 1-page site cheat sheet\n" +
      "8. The 7 Anti-Fear Bonuses (Bills, Payments, Changes, Brands, Quality, Hiring, Snag list)\n" +
      "9. Real Situations & Where to Go (12 real-life problem solver situations)\n" +
      "10. Radical Transparency: What the package does not do\n" +
      "11. Indian Construction Glossary A to Z (19 essential terms)\n";
    handleDownload("Construction_Calculator_Pro_Guide_COMBINED.txt", guideContent);
  };

  const downloadBonusesKit = () => {
    const bonusesContent =
      "CONSTRUCTION CALCULATOR PRO - 7 ANTI-FEAR BONUSES & TOOLS SUITE\n" +
      "Order ID: " + orderId + "\n\n" +
      "INCLUDED DOCUMENTS:\n" +
      "Bonus 1: Contractor Quote and Bill Check Guide (1 page - 5% tolerance audit)\n" +
      "Bonus 2: Payment Schedule Guide & Pre-Payment Checklist (1 page - Anti-advance)\n" +
      "Bonus 3: Change Order Control Protocol & Variation Agreement (1 page)\n" +
      "Bonus 4: Specification and Brand Sheet (5 pages - Room-by-room materials table)\n" +
      "Bonus 5: Material Quality Checks on Site (5 pages - Silt test, cement, steel, bricks, receipt log)\n" +
      "Bonus 6: Contractor Hiring Kit (3 pages - Shortlisting, interview, site visits, scoring sheet)\n" +
      "Bonus 7: Snag List and Handover Check (5 pages - Room-by-room punch list & retention protocol)\n\n" +
      "PLUS TOOLS:\n" +
      "- 4 Formal Templates (Rate Request, Change Order, Stage Payment, Permit Fee)\n" +
      "- 5 Negotiation Scripts for WhatsApp, Phone, and Email\n" +
      "- The 1-Page Jobsite Cheat Sheet (Formulas, unit conversions, 5-point verification)\n";
    handleDownload("Construction_Calculator_Pro_7_Bonuses_Kit.txt", bonusesContent);
  };

  return (
    <div className="max-w-4xl mx-auto px-3.5 sm:px-6 py-8 sm:py-12 md:py-16">
      {/* Success Badge */}
      <div className="text-center space-y-2.5 sm:space-y-3 mb-8 sm:mb-10">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9" />
        </div>
        <span className="inline-block text-[10px] sm:text-xs uppercase font-bold tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          Payment Verified • Lifetime License Active
        </span>
        <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Thank You, {decodeURIComponent(name)}!
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Your order <strong className="text-amber-700 font-mono">#{orderId}</strong> for{" "}
          <strong className="text-slate-900">Construction Calculator Pro Package (3 Workbooks • 31 Tabs)</strong> is complete. Your files are ready for instant download below and a permanent access link has been dispatched to{" "}
          <span className="text-slate-900 font-semibold">{decodeURIComponent(email)}</span>.
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* ALL-IN-ONE MASTER ZIP DOWNLOAD CARD (SINGLE LINK FOR ALL FILES) */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white p-5 sm:p-7 md:p-8 border-2 border-amber-500/50 shadow-2xl overflow-hidden">
          {/* Decorative ambient background accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/15 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Single Link • All-In-One Master Download</span>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                  Download Complete Toolkit (.ZIP)
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-xl leading-relaxed">
                  One single click gives you all <strong>3 Excel Workbooks (.xlsx)</strong>, the <strong>43-Page Master Guide (PDF)</strong>, <strong>7 Anti-Fear Bonuses</strong>, and all tools in a single neat archive.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] text-slate-300 font-mono">
                <div className="bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5">
                  <span className="text-amber-400 font-bold block">3 Workbooks</span>
                  <span className="text-[10px] text-slate-400">All 31 Tabs (.xlsx)</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5">
                  <span className="text-amber-400 font-bold block">43-Page Guide</span>
                  <span className="text-[10px] text-slate-400">Combined Master PDF</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5">
                  <span className="text-amber-400 font-bold block">7 Bonuses</span>
                  <span className="text-[10px] text-slate-400">Audits, Scripts, Kits</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5">
                  <span className="text-amber-400 font-bold block">2.0 MB ZIP</span>
                  <span className="text-[10px] text-slate-400">Offline & Lifetime</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex flex-col items-stretch sm:items-center lg:items-end gap-2.5">
              <a
                id="btn-download-all-zip"
                href="/downloads/Construction_Calculator_Pro_Complete_Bundle.zip"
                download="Construction_Calculator_Pro_Complete_Bundle.zip"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 sm:px-9 py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Download className="w-5 h-5 text-slate-950 stroke-[2.5]" />
                <span>Download All Files (.ZIP)</span>
              </a>
              <div className="flex items-center justify-center gap-2 text-[10px] sm:text-xs text-slate-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Direct Download • Construction_Calculator_Pro_Complete_Bundle.zip</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: THE 3 WORKBOOKS */}
        <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-5 sm:pb-6 border-b border-slate-200">
            <div>
              <span className="text-[10px] sm:text-xs uppercase font-bold text-amber-700 tracking-wider">
                Folder 6 • Digital Goods Package
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                The 3 Excel Workbooks (31 Tabs across 6 Parts)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Standard Microsoft Excel (.xlsx) & Google Sheets • Zero Macros • Clean Transparent Formulas
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl shrink-0 font-medium self-start sm:self-center">
              3 Workbooks Ready
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 py-5 sm:py-6">
            {/* Workbook 1: Master Blank */}
            <div className="bg-slate-50/70 border border-slate-200 hover:border-amber-400 rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all">
              <div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center mb-3">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 inline-block px-2 py-0.5 rounded mb-1.5">
                  Core Blank Master
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">Construction_Calculator_Pro_INDIA_v2.xlsx</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Complete 31-tab master workbook for entering your project measurements and local material rates.
                </p>
              </div>

              <a
                id="btn-download-master"
                href="/downloads/Construction_Calculator_Pro_INDIA_v2.xlsx"
                download="Construction_Calculator_Pro_INDIA_v2.xlsx"
                className="mt-4 sm:mt-5 w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm text-center"
              >
                <Download className="w-4 h-4" />
                <span>Download Master (.xlsx)</span>
              </a>
            </div>

            {/* Workbook 2: Filled Example */}
            <div className="bg-slate-50/70 border border-slate-200 hover:border-blue-400 rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all">
              <div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-100 border border-blue-300 text-blue-800 flex items-center justify-center mb-3">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-50 inline-block px-2 py-0.5 rounded mb-1.5">
                  Reference Project 1
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">EXAMPLE_filled.xlsx</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  1,500 sq ft 3-BHK G+1 Chennai new-build example with realistic quantities, BBS, and rates pre-entered.
                </p>
              </div>

              <a
                id="btn-download-example-filled"
                href="/downloads/Construction_Calculator_Pro_EXAMPLE_filled.xlsx"
                download="Construction_Calculator_Pro_EXAMPLE_filled.xlsx"
                className="mt-4 sm:mt-5 w-full py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 border border-slate-300 transition-all cursor-pointer text-center"
              >
                <Download className="w-4 h-4" />
                <span>Download Villa Example</span>
              </a>
            </div>

            {/* Workbook 3: Renovation Example */}
            <div className="bg-slate-50/70 border border-slate-200 hover:border-purple-400 rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all">
              <div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-100 border border-purple-300 text-purple-800 flex items-center justify-center mb-3">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-50 inline-block px-2 py-0.5 rounded mb-1.5">
                  Reference Project 2
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">EXAMPLE_renovation.xlsx</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  1,000 sq ft flat remodel walkthrough: demolition, retiling, painting, false ceiling, and kitchen upgrade.
                </p>
              </div>

              <a
                id="btn-download-example-renovation"
                href="/downloads/Construction_Calculator_Pro_EXAMPLE_renovation.xlsx"
                download="Construction_Calculator_Pro_EXAMPLE_renovation.xlsx"
                className="mt-4 sm:mt-5 w-full py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 border border-slate-300 transition-all cursor-pointer text-center"
              >
                <Download className="w-4 h-4" />
                <span>Download Flat Example</span>
              </a>
            </div>
          </div>
        </div>

        {/* SECTION 2: DOCUMENTATION, IMPLEMENTATION KIT & 7 BONUSES */}
        <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-5 sm:pb-6 border-b border-slate-200">
            <div>
              <span className="text-[10px] sm:text-xs uppercase font-bold text-amber-700 tracking-wider">
                Folders 1–5 & Bonuses
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                The 43-Page Master Guide & 7 Anti-Fear Bonuses
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Field-tested PDF manuals, contractor negotiation scripts, quality checklists, and audit tools.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl shrink-0 font-medium self-start sm:self-center">
              13 Guides + 7 Bonuses
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 py-5 sm:py-6">
            {/* Master Guide */}
            <div className="bg-slate-50/70 border border-slate-200 hover:border-emerald-400 rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all">
              <div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  Combined 43-Page Master Guide (PDF)
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Complete documentation uniting the Core Guide, Quick-Start (30-min setup), Implementation Manual, and IS 456 formula references into one printable document.
                </p>
              </div>

              <div className="mt-4 sm:mt-5 flex items-center gap-2">
                <a
                  id="btn-download-guide"
                  href="/downloads/Construction_Calculator_Pro_Guide_COMBINED.pdf"
                  download="Construction_Calculator_Pro_Guide_COMBINED.pdf"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 border border-slate-300 transition-all cursor-pointer text-center"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Guide (PDF)</span>
                </a>
                <a
                  href="/downloads/Construction_Calculator_Pro_Guide_COMBINED.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs flex items-center justify-center border border-slate-300 transition-all"
                  title="View PDF in browser"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* 7 Bonuses & Implementation Kit */}
            <div className="bg-slate-50/70 border border-slate-200 hover:border-amber-400 rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all">
              <div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center mb-3">
                  <Gift className="w-5 h-5" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  7 Anti-Fear Bonuses & Implementation Kit
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Includes Sheet 25 Bill Check Audit template, Stage-Gate milestone schedule, Change-Order protocol, Material Quality tests, Contractor Hiring Kit & 120-item Snag List.
                </p>
              </div>

              <a
                id="btn-download-bonuses"
                href="/downloads/Construction_Calculator_Pro_7_Bonuses_Kit.zip"
                download="Construction_Calculator_Pro_7_Bonuses_Kit.zip"
                className="mt-4 sm:mt-5 w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm text-center"
              >
                <Download className="w-4 h-4" />
                <span>Download 7 Bonuses Kit (.zip)</span>
              </a>
            </div>
          </div>

          {/* Radical Transparency & Safe Usage Reminder */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 flex items-start gap-2.5 sm:gap-3 text-xs text-amber-900">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-amber-950 font-bold">Important Engineering Notice:</strong> This toolkit provides planning, estimation, and bill-auditing capabilities. It does not replace a licensed structural engineer&apos;s structural design calculations or certified soil test reports. Always have your licensed structural designer sign off on footing depths and steel sizing before casting RCC.
            </div>
          </div>
        </div>

        {/* ORDER BUMP FULFILLMENT (If selected) */}
        {hasBump && (
          <div className="bg-gradient-to-r from-amber-50 via-white to-amber-50/60 border border-amber-300 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 shadow-sm">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-bold shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                  Order Bump Unlocked
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                  Contractor Site Progress & Labor Billing Suite
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Includes the Daily Site Progress Report (DPR), Subcontractor Agreement Template, and Mason/Helper Daily Wage Slips.
                </p>

                <div className="mt-3.5 sm:mt-4">
                  <button
                    onClick={() =>
                      handleDownload(
                        "Contractor_Site_Progress_Suite.csv",
                        "Contractor Site Progress & Labor Billing Suite\nDaily Progress Report, Subcontractor Agreement, Mason/Helper Wages\n"
                      )
                    }
                    className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 cursor-pointer shadow-sm transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Progress Suite (.xlsx)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Reference: 5-Step Getting Started Path */}
        <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-2.5 sm:mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Recommended Order for Today (30-Minute Fast Track)</span>
          </h3>
          <ol className="text-xs text-slate-600 space-y-1.5 sm:space-y-2 list-decimal list-inside leading-relaxed">
            <li>Open <strong className="text-slate-800">EXAMPLE_filled.xlsx</strong> first to see how a complete residential project looks when filled.</li>
            <li>Review the <strong className="text-slate-800">Quick-Start Guide</strong> in the 43-page combined PDF (Pages 12–16) for the 30-minute fast track.</li>
            <li>Open <strong className="text-slate-800">Construction_Calculator_Pro_INDIA_v2.xlsx</strong>, navigate to Tab 20 (Master Rates Table), and adjust your city&apos;s cement, sand, and steel rates.</li>
            <li>Enter your plot dimensions in Tab 04 to calculate plinth areas.</li>
            <li>Use Tab 25 whenever your contractor submits a running bill to instantly audit claims against actual site progress.</li>
          </ol>
        </div>

        {/* Support & Back Link */}
        <div className="border border-slate-200 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-slate-600 shadow-sm text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span>Need assistance or file re-delivery? Email our team at <strong className="text-slate-900">support@thinktools.in</strong></span>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-amber-800 hover:text-amber-900 font-semibold transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Thinktools Store</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header isFocusMode={false} />
      <main className="flex-1">
        <Suspense fallback={<div className="text-center py-20 text-slate-500">Loading order details...</div>}>
          <DownloadContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
