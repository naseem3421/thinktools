"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wrench,
  Sparkles,
  ArrowRight,
  Star,
  FileSpreadsheet,
  CheckCircle2,
  ShieldCheck,
  Zap,
  TrendingUp,
  UtensilsCrossed,
  Calculator,
  Layers,
  HeartPulse,
  Lock,
  ChevronDown,
  ChevronUp,
  Search,
  ExternalLink,
  Laptop,
  Flame,
  Clock,
  BadgeCheck,
  DollarSign,
  HelpCircle,
  Building2,
  FileCheck,
  AlertTriangle,
  FolderTree,
  FileText,
  UserCheck,
  Home,
  Hammer
} from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SpreadsheetHeroMockup from "@/components/SpreadsheetHeroMockup";
import CalculatorGallery from "@/components/CalculatorGallery";
import CheckoutModal from "@/components/CheckoutModal";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  const flagshipProduct: Product = PRODUCTS["construction-calculator-pro"];

  const categories = [
    { id: "all", label: "All Toolkits", count: 3 },
    { id: "construction", label: "Construction & Civil", count: 1 },
    { id: "nutrition", label: "Nutrition & Health", count: 1 },
    { id: "business", label: "Wealth & Finance", count: 1 },
  ];

  const handleHeroUnlock = () => {
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Top Banner Notice */}
      <aside aria-label="Announcement" className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 px-4 py-2 text-center text-xs font-bold tracking-wide flex items-center justify-center gap-2 shadow-xs">
        <Flame className="w-3.5 h-3.5 text-slate-950 fill-current animate-bounce" />
        <span>
          Latest Release (October 2026): Construction Calculator Pro Package (3 Workbooks, 31 Tabs, 13 Guides, 7 Bonuses) is 75% OFF.
        </span>
        <button
          onClick={() => setIsCheckoutOpen(true)}
          className="underline ml-1 hover:text-white transition-colors cursor-pointer"
        >
          Claim Lifetime Access &rarr;
        </button>
      </aside>

      <Header isFocusMode={false} />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 right-10 w-[400px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Super Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-amber-200 text-xs text-amber-800 font-semibold mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>3 Workbooks · 31 Connected Tabs · 13 PDF Guides · 7 Bonuses</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-950 tracking-tight leading-[1.12] max-w-5xl mx-auto">
              Plan, Price & Pay For Your Build{" "}
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent block mt-1">
                @ &ldquo;calculator cost&rdquo; (₹499/-)
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              The complete Indian construction and flat renovation operating system in ready-to-use unlocked Excel files (.xlsx). Turn site plans into exact material quantities, compare contractor bids, audit bills with automated tolerance flags, and control every rupee.
            </p>

            {/* Dual CTAs & Live Anchors */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                id="btn-hero-claim"
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Zap className="w-5 h-5 fill-current" />
                <span>Get Construction Pro (₹499)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#what-it-contains"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-base transition-all hover:border-slate-400 shadow-xs cursor-pointer"
              >
                <FolderTree className="w-4 h-4 text-amber-600" />
                <span>What The Package Contains</span>
              </a>

              <a
                href="#calculator-gallery"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold text-base transition-all shadow-xs cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>8 Real Excel Screenshots</span>
              </a>
            </div>

            {/* Quick Proof Trust Strip */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Dual Units (Feet/Inches & Metres)
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                3 Workbooks (Blank, 3BHK Example, Flat Renovation)
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Contractor Bill Check (5% Tolerance Flag)
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                7 Anti-Fear Bonuses Included
              </span>
            </div>

            {/* HERO SPREADSHEET SHOWCASE */}
            <div className="mt-14 max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs mb-4">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>31-Tab Connected Excel Engine Preview (No Macros · Standard .XLSX)</span>
              </div>

              <SpreadsheetHeroMockup onUnlockClick={handleHeroUnlock} />
            </div>
          </div>
        </section>

        {/* METRICS & PACKAGE SIZE STRIP */}
        <section className="py-8 bg-slate-100/70 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <div className="text-2xl sm:text-3xl font-black text-amber-700 font-mono">3 Workbooks</div>
                <div className="text-xs text-slate-600 font-medium mt-1">Blank Master, 3BHK Example, Renovation</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">31 Tabs</div>
                <div className="text-xs text-slate-600 font-medium mt-1">6 Phased Modules (Measure to Pay)</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">13 PDF Guides</div>
                <div className="text-xs text-slate-600 font-medium mt-1">4-Week Plan, Worksheets & Checklists</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <div className="text-2xl sm:text-3xl font-black text-blue-700 font-mono">7 Bonuses</div>
                <div className="text-xs text-slate-600 font-medium mt-1">Hiring Kit, Material Tests, Snag List</div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT THE PACKAGE CONTAINS: 3 WORKBOOKS + 31 CONNECTED TABS */}
        <section id="what-it-contains" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs text-amber-800 font-semibold mb-2 shadow-2xs">
              <FolderTree className="w-3.5 h-3.5 text-amber-600" />
              <span>Full Deliverables Inventory</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
              What This Package Contains
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Here is the exact index of 3 unlocked Excel workbooks, 31 connected sheets, and reference guides delivered in your download:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Workbook 1 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded font-bold">
                    WORKBOOK 01 · 16 SHEETS
                  </span>
                  <span className="text-xs text-slate-500 font-mono">.xlsx</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Construction Calculator Pro (Main Model)
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Full quantity estimation, civil raw materials, and project cost rollup engine.
                </p>

                <div className="space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-700">
                  <div className="font-bold text-[10px] uppercase tracking-wider text-amber-800 mb-2">
                    Included Sheet Headings:
                  </div>
                  {[
                    "01. Start Here & 5-Step Roadmap",
                    "02. Quick Start 20-Minute Setup",
                    "03. Project Setup & Unit Toggle (Ft/M)",
                    "04. Room Area & Floor Dimension Register",
                    "05. Earthwork Foundation Excavation",
                    "06. Wall Putty, Primer & Interior Paint",
                    "07. Exterior Paint & Terrace Waterproofing",
                    "08. Concrete Mix (Footings, Columns, Slabs)",
                    "09. Bricks & AAC Blocks Masonry Mortar",
                    "10. Internal & External Sand Plastering",
                    "11. Steel Reinforcement Schedule (D²/162)",
                    "12. Plumbing & Electrical MEP Points",
                    "13. Master Cost Estimate & Civil Total",
                    "14. Room-by-Room Cost Breakdown",
                    "15. 9-Stage Milestone Construction Budget",
                    "16. Monthly Cash Flow Runway Tracker"
                  ].map((heading, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-medium text-[11px] text-slate-800">{heading}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Workbook 2 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded font-bold">
                    WORKBOOK 02 · 8 SHEETS
                  </span>
                  <span className="text-xs text-slate-500 font-mono">.xlsx</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Contractor Bill Audit & Site Quality Engine
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Audit contractor claims, check RA bills, prevent overbilling, and track site progress.
                </p>

                <div className="space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-700">
                  <div className="font-bold text-[10px] uppercase tracking-wider text-amber-800 mb-2">
                    Included Sheet Headings:
                  </div>
                  {[
                    "17. Material Purchase Order & Indent List",
                    "18. Daily Site Task & Labor Progress Tracker",
                    "19. Municipal Permits & Approval Log",
                    "20. Local Material Supplier Master Rates",
                    "21. Supplier Quote Comparison Matrix",
                    "22. Material & Finish Specification Sheet",
                    "23. Variation & Scope Change Orders",
                    "24. Visual Project Control Dashboard"
                  ].map((heading, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-medium text-[11px] text-slate-800">{heading}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Workbook 3 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded font-bold">
                    WORKBOOK 03 · 7 SHEETS
                  </span>
                  <span className="text-xs text-slate-500 font-mono">.xlsx</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Contractor Bids, Renovation & BOQ Quotation
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Compare tenders, generate client BOQ proposals, and track handovers.
                </p>

                <div className="space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-700">
                  <div className="font-bold text-[10px] uppercase tracking-wider text-amber-800 mb-2">
                    Included Sheet Headings:
                  </div>
                  {[
                    "25. Contractor Running Account (RA) Bill Check",
                    "26. Site Quality & Material Delivery Checks",
                    "27. Contractor Bids Comparison & Scorecard",
                    "28. Milestone Payment Schedule & Releases",
                    "29. Room-by-Room Handover Snag List",
                    "30. Print-Ready Professional Client BOQ",
                    "31. Historical Master Rate Library"
                  ].map((heading, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-medium text-[11px] text-slate-800">{heading}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Complementary Guides & Bonuses Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-start gap-3">
              <FileText className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-slate-900">13 Civil Engineering PDF Guides Included</div>
                <div className="text-[11px] text-slate-600 mt-0.5">IS codes, cement grades, site slump test standards, river vs M-Sand, and retention rules.</div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-slate-900">7 Anti-Fear Bonus Toolkits Included</div>
                <div className="text-[11px] text-slate-600 mt-0.5">15 Builder Traps Guide, Contractor Contract Agreement Template, 50-Point Casting Checklist.</div>
              </div>
            </div>
          </div>
        </section>

        {/* HIGH-RESOLUTION CALCULATOR SCREENSHOT GALLERY */}
        <CalculatorGallery />

        {/* PRODUCTS DIRECTORY & STOREFRONT */}
        <section id="toolkits-catalog" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs text-amber-800 font-semibold mb-2 shadow-2xs">
                <Building2 className="w-3.5 h-3.5 text-amber-600" />
                <span>Workplace-Ready Solutions</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
                Curated Digital Toolkits
              </h2>
              <p className="text-slate-600 text-sm mt-1 max-w-xl">
                Ready-to-use spreadsheet workbooks engineered to replace expensive software subscriptions.
              </p>
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search calculators, BOQ, sheets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 shadow-2xs transition-colors"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  selectedCategory === c.id
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold"
                    : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-2xs"
                }`}
              >
                <span>{c.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    selectedCategory === c.id ? "bg-slate-950/20 text-slate-950 font-bold" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {c.count}
                </span>
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          {(() => {
            const q = searchQuery.toLowerCase().trim();
            const showConstruction =
              (selectedCategory === "all" || selectedCategory === "construction") &&
              (!q ||
                flagshipProduct.title.toLowerCase().includes(q) ||
                flagshipProduct.subtitle.toLowerCase().includes(q) ||
                flagshipProduct.listingTags.some((t) => t.toLowerCase().includes(q)));

            const showNutrition =
              (selectedCategory === "all" || selectedCategory === "nutrition") &&
              (!q ||
                "30-day indian meal system grocery matrix kitchen health recipes"
                  .toLowerCase()
                  .includes(q));

            const showBusiness =
              (selectedCategory === "all" || selectedCategory === "business") &&
              (!q ||
                "personal finance net worth budget sip tax flow investment"
                  .toLowerCase()
                  .includes(q));

            const hasAnyMatch = showConstruction || showNutrition || showBusiness;

            if (!hasAnyMatch) {
              return (
                <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl p-8 shadow-xs">
                  <Search className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                  <p className="text-base font-bold text-slate-900">No toolkits found matching &ldquo;{searchQuery}&rdquo;</p>
                  <p className="text-xs text-slate-500 mt-1">Try searching for &quot;construction&quot;, &quot;steel&quot;, &quot;meal&quot;, or &quot;finance&quot;.</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                    className="mt-4 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold hover:bg-amber-100 transition-all cursor-pointer"
                  >
                    Clear Search Filters
                  </button>
                </div>
              );
            }

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* FEATURED BESTSELLER: Construction Calculator Pro */}
                {showConstruction && (
                  <div className="bg-white border-2 border-amber-400 rounded-3xl p-6 sm:p-8 shadow-xl relative flex flex-col justify-between group hover:border-amber-500 transition-all md:col-span-2 lg:col-span-2">
                    <div className="absolute top-5 right-5 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black text-[10px] uppercase px-3 py-1.5 rounded-full tracking-wider shadow-xs">
                      ⭐ Flagship Bestseller
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-amber-800 font-semibold mb-3">
                        <span className="px-2.5 py-0.5 rounded-md bg-amber-50 border border-amber-200">
                          Civil & Construction
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-slate-600">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                          4.94 (1,420+ reviews)
                        </span>
                        <span>•</span>
                        <span className="text-emerald-700 font-mono font-bold">3 Workbooks · 31 Connected Tabs</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black text-slate-950 group-hover:text-amber-700 transition-colors">
                        {flagshipProduct.title}
                      </h3>

                      <p className="text-slate-600 text-sm mt-3 leading-relaxed max-w-2xl">
                        {flagshipProduct.subtitle}
                      </p>

                      {/* Highlights Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        {flagshipProduct.workbookSheets.slice(3, 9).map((sheet) => (
                          <div key={sheet.number} className="flex items-center gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span className="truncate">
                              Tab {sheet.number < 10 ? `0${sheet.number}` : sheet.number}: <strong className="text-slate-900 font-semibold">{sheet.name}</strong>
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Included Bonuses Strip */}
                      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                        <span className="bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 flex items-center gap-1.5">
                          <BadgeCheck className="w-3.5 h-3.5 text-amber-600" />
                          Contractor Hiring Kit (3 Pages)
                        </span>
                        <span className="bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 flex items-center gap-1.5">
                          <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                          Specification & Brand Sheet (5 Pages)
                        </span>
                        <span className="bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                          Bill Check (5% Tolerance Flag)
                        </span>
                        <span className="bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-blue-600" />
                          5 Negotiation Scripts
                        </span>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                      <div className="flex items-baseline gap-3">
                        <span className="text-sm text-slate-400 line-through">₹{flagshipProduct.originalPrice}</span>
                        <span className="text-3xl sm:text-4xl font-black text-slate-950 font-mono">
                          ₹{flagshipProduct.price}
                        </span>
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                          75% OFF
                        </span>
                        <span className="text-[11px] text-slate-500 block sm:inline">One-time payment</span>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2.5">
                        <button
                          onClick={() => setIsCheckoutOpen(true)}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                        >
                          <Zap className="w-4 h-4 fill-current" />
                          <span>Instant Access (₹499)</span>
                        </button>

                        <Link
                          href={`/p/${flagshipProduct.slug}`}
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm border border-slate-200 transition-all text-center"
                        >
                          <span>Full 31-Tab Specs</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* UPCOMING NICHE: 30-Day Indian Healthy Meal Plan & Kitchen Planner */}
                {showNutrition && (
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-semibold text-rose-800 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-md flex items-center gap-1.5">
                          <HeartPulse className="w-3.5 h-3.5 text-rose-600" />
                          Health & Nutrition
                        </span>
                        <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider bg-amber-100 px-2 py-0.5 rounded">
                          Releasing Next
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mt-1">
                        30-Day Balanced Indian Meal System & Grocery Matrix
                      </h3>
                      <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                        Zero-fuss weekly grocery checklists, calorie & protein guides, and quick 20-minute daily recipes engineered for busy professionals.
                      </p>

                      <div className="mt-5 space-y-2.5 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Printable 30-day kitchen fridge calendar & prep planner</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Automated weekly grocery cost calculation matrix</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Vegetarian & high-protein Indian split formulas</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-5 border-t border-slate-200 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-slate-400 block font-medium">Launch Price</span>
                        <span className="text-lg font-bold text-slate-900 font-mono">₹299</span>
                      </div>
                      <span className="text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                        Available Soon
                      </span>
                    </div>
                  </div>
                )}

                {/* UPCOMING NICHE: Ultimate Personal Finance & Budget Tracker */}
                {showBusiness && (
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                          Finance & Net Worth
                        </span>
                        <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider bg-amber-100 px-2 py-0.5 rounded">
                          In Development
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mt-1">
                        Ultimate Personal Net Worth & Monthly Cash Flow OS
                      </h3>
                      <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                        Automated SIP return calculator, debt avalanche payoff engine, and tax planning dashboard in Excel & Google Sheets.
                      </p>

                      <div className="mt-5 space-y-2.5 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Net worth milestone graph with auto-updating charts</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Indian 80C & New Tax Regime tax liability comparison</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Monthly cash flow runway & emergency fund tracker</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-5 border-t border-slate-200 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-slate-400 block font-medium">Launch Price</span>
                        <span className="text-lg font-bold text-slate-900 font-mono">₹349</span>
                      </div>
                      <span className="text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                        Available Soon
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </section>

        {/* 4 BUYER SITUATIONS: WHO USES THIS */}
        <section className="py-20 bg-slate-100/50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs text-amber-800 font-semibold mb-2 shadow-2xs">
                <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Tailored Use Cases</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
                Built For Real Indian Construction Situations
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Whether you are building from scratch, renovating a flat, or quoting for clients, the package gives you exact tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {flagshipProduct.targetAudience.map((aud, index) => {
                const audienceIcons = [
                  <Home key="1" className="w-4 h-4 text-amber-600" />,
                  <Hammer key="2" className="w-4 h-4 text-amber-600" />,
                  <Sparkles key="3" className="w-4 h-4 text-amber-600" />,
                  <Building2 key="4" className="w-4 h-4 text-amber-600" />,
                ];

                return (
                  <div
                    key={index}
                    className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between h-full"
                  >
                    <div>
                      {/* Top Header Row: Badge + Contextual Icon */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-800 font-bold text-xs">
                          0{index + 1}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                          {audienceIcons[index]}
                        </div>
                      </div>

                      {/* Card Title with unified height */}
                      <h3 className="text-base font-bold text-slate-900 min-h-[2.75rem] flex items-center leading-snug">
                        {aud.title}
                      </h3>

                      {/* The Situation / Problem Box */}
                      <div className="bg-amber-50/70 border border-amber-200/70 rounded-xl p-3 my-3 min-h-[4.75rem] flex flex-col justify-center">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 block mb-0.5">
                          Your Situation
                        </span>
                        <p className="text-xs text-slate-700 font-medium leading-relaxed">
                          {aud.situation}
                        </p>
                      </div>

                      {/* How The Package Solves It */}
                      <p className="text-xs text-slate-600 leading-relaxed min-h-[4rem]">
                        {aud.description}
                      </p>
                    </div>

                    {/* Tools Footer with Tags */}
                    <div className="mt-4 pt-3.5 border-t border-slate-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Key Sheets You&apos;ll Use:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {aud.primaryUse.split(", ").map((tool, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200/60"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7 HEADLINE BONUSES SHOWCASE */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs text-amber-800 font-semibold mb-2 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Included Free with Purchase</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
              7 Specialized Bonuses That Remove Site Anxiety
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Each bonus directly solves the situations where home builders and renovators lose the most money.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flagshipProduct.includedBonuses.map((bonus) => (
              <div
                key={bonus.number}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                      Bonus #{bonus.number}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{bonus.pages} Pages PDF</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{bonus.title}</h3>
                  <div className="mt-2 text-xs font-semibold text-rose-700 bg-rose-50/70 p-2 rounded-lg border border-rose-100">
                    {bonus.fearSolved}
                  </div>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">{bonus.description}</p>
                </div>
              </div>
            ))}

            {/* Bonus #8: The Complete Combined 43-Page Guide */}
            <div className="bg-gradient-to-br from-amber-500/10 to-slate-50 border border-amber-300 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-950 bg-amber-400 px-2 py-0.5 rounded">
                    Master Document
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">43 Pages Total</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">Combined Master Guide (All in 1 File)</h3>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  Every guide, action plan, worksheet, checklist, script, and bonus organized in a single searchable 43-page master PDF document.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-amber-200 text-xs font-bold text-slate-900 flex items-center justify-between">
                <span>Construction_Calculator_Pro_Guide_COMBINED.pdf</span>
                <span className="text-emerald-700">✓ Free</span>
              </div>
            </div>
          </div>
        </section>

        {/* RADICAL TRANSPARENCY: WHAT THE PACKAGE DOES NOT DO */}
        <section className="py-16 bg-slate-100 border-y border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-slate-300 rounded-3xl p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2.5 text-slate-900 font-black text-lg sm:text-xl mb-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
                <span>Radical Transparency: What This Package Does Not Do</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                We believe in zero misleading claims. Construction Calculator Pro gives you preliminary financial and material control, not structural engineering stamps:
              </p>
              <div className="space-y-3">
                {flagshipProduct.whatItDoesNotDo.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <span className="text-amber-600 font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS & SOCIAL PROOF */}
        <section className="py-20 bg-slate-100/60 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs text-amber-800 font-semibold mb-3 shadow-2xs">
                <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                <span>Verified Contractor & Buyer Reviews</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
                Trusted on Sites Across India
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                See how site supervisors, civil builders, and homeowners use our tools to eliminate guesswork.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {flagshipProduct.testimonials.map((test, index) => (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-4">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                      &ldquo;{test.comment}&rdquo;
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{test.name}</span>
                        {test.verified && (
                          <BadgeCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{test.role}</div>
                      <div className="text-[10px] text-slate-400">{test.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS ACCORDION */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs text-amber-800 font-semibold mb-3 shadow-2xs">
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Everything you need to know about compatibility, licensing, and digital delivery.
            </p>
          </div>

          <div className="space-y-3">
            {flagshipProduct.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 hover:text-amber-700 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-amber-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/70">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* INSTANT DIGITAL FULFILLMENT & LIFETIME ACCESS CTA */}
        <section className="py-16 bg-gradient-to-b from-amber-50/70 to-slate-100 border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 rounded-3xl bg-white border border-amber-300 flex items-center justify-center text-amber-600 mx-auto mb-6 shadow-md shadow-amber-500/10">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
              Instant Download · Lifetime Access
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Once payment is completed, you receive immediate access on screen to download the complete 31-sheet Excel package (.xlsx), plus backup download links sent directly to your email and WhatsApp. No recurring subscriptions, no macro passwords.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 text-[11px] font-semibold text-slate-700">
              <span>All Sales Final · Digital Product Delivered Instantly</span>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Zap className="w-5 h-5 fill-current" />
                <span>Download Construction Pro Package (₹499)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href={`/p/${flagshipProduct.slug}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm transition-all shadow-xs"
              >
                <span>Read Full Technical Specifications</span>
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <Lock className="w-3.5 h-3.5 text-emerald-600" /> 256-bit Encrypted Checkout
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Zap className="w-3.5 h-3.5 text-amber-600" /> Instant On-Screen Download
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Lifetime License
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Instant Checkout Modal */}
      <CheckoutModal
        product={flagshipProduct}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}

function ShieldAlert(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  );
}
