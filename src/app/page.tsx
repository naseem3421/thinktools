"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  FileSpreadsheet,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Calculator,
  ChevronDown,
  ChevronUp,
  Search,
  Building2,
  Flame,
  Check,
  Cpu,
  Unlock,
  AlertCircle,
  Maximize2,
  X,
  Compass,
  HardHat,
  Ruler,
  Rocket,
  Cloud,
  Mail
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  CATALOG_TOOLS,
  ROADMAP_TOOLS,
  THINKTOOLS_PROMISES,
  COMPARISON_POINTS,
  FAQS
} from "@/data/catalog";
import HomeJsonLd from "@/components/HomeJsonLd";

interface ScreenshotItem {
  id: string;
  tabNumber: number;
  tabName: string;
  category: string;
  headline: string;
  subtitle: string;
  imageSrc: string;
  altText: string;
  details: string;
}

const PRODUCT_SCREENSHOTS: ScreenshotItem[] = [
  {
    id: "cost-estimate",
    tabNumber: 13,
    tabName: "13. Cost Estimate",
    category: "Costing & Budget",
    headline: "Consolidated Bill of Quantities (BOQ) with Contingency",
    subtitle: "Every cost line item, trade subtotal, contingency buffer, and rate per sq.ft calculated automatically.",
    imageSrc: "/screenshots/01_cost_estimate.png",
    altText: "Tab 13 Cost Estimate - Consolidated Bill of Quantities with trade subtotals",
    details: "Links dynamic rates from Tab 20 directly to your room dimensions and quantity takeoffs."
  },
  {
    id: "dashboard",
    tabNumber: 24,
    tabName: "24. Dashboard",
    category: "Overview & Controls",
    headline: "Executive Project Dashboard & Summary Rollups",
    subtitle: "Real-time totals, material summaries, and budget variance gauges update as you enter site data.",
    imageSrc: "/screenshots/02_dashboard.png",
    altText: "Tab 24 Dashboard - Executive project summary with charts and material totals",
    details: "Provides instant visibility into project cost per sq.ft, total estimated spend, and material totals."
  },
  {
    id: "room-area",
    tabNumber: 4,
    tabName: "04. Room Area",
    category: "Quantity Takeoff",
    headline: "Room-by-Room Dimensional Survey & Openings Deductions",
    subtitle: "Enter length, width, and height once. Floor carpet areas and gross/net wall areas calculate automatically.",
    imageSrc: "/screenshots/03_room_area.png",
    altText: "Tab 04 Room Area - Detailed room survey with automatic conversions",
    details: "Supports up to 12 rooms with automatic unit conversion between Feet/Inches and Metric Metres."
  },
  {
    id: "paint-tiles",
    tabNumber: 6,
    tabName: "06. Paint & Tiles",
    category: "Quantity Takeoff",
    headline: "Surface Finishes, Tile Counts & Paint Litres",
    subtitle: "Litres of primer and paint, tile box counts, and adhesive bags worked out with opening cutouts deducted.",
    imageSrc: "/screenshots/04_paint_tiles.png",
    altText: "Tab 06 Paint and Tiles - Net wall area, primer, paint litres, and tile calculations",
    details: "Automatically subtracts doors and windows from wall surface areas to prevent over-ordering paint."
  },
  {
    id: "order-list",
    tabNumber: 17,
    tabName: "17. Order List",
    category: "Procurement & Site",
    headline: "Material Procurement Schedule with Wastage Buffers",
    subtitle: "Exact procurement quantities for cement bags, rebar steel, sand, and bricks with customizable safety buffers.",
    imageSrc: "/screenshots/05_order_list.png",
    altText: "Tab 17 Order List - Procurement schedule with lead times and wastage buffers",
    details: "Applies standard civil wastage allowances (2-5%) to avoid site stoppages from material shortages."
  },
  {
    id: "stage-budget",
    tabNumber: 15,
    tabName: "15. Stage Budget",
    category: "Costing & Budget",
    headline: "Milestone-Based Construction Cash Flow Schedule",
    subtitle: "Planned disbursements across foundation, plinth, RCC slab casting, brickwork, plastering, and finishes.",
    imageSrc: "/screenshots/06_stage_budget.png",
    altText: "Tab 15 Stage Budget - Phased milestone disbursements from foundation to handover",
    details: "Prevents paying ahead of physical site progress by linking contractor advances to milestones."
  },
  {
    id: "bill-check",
    tabNumber: 25,
    tabName: "25. Bill Check",
    category: "Rates & Audit",
    headline: "Subcontractor Running Bill Verification Ledger",
    subtitle: "Type contractor-claimed quantities to automatically highlight discrepancies exceeding 5% in high-contrast red.",
    imageSrc: "/screenshots/07_bill_check.png",
    altText: "Tab 25 Bill Check - Contractor invoice audit ledger with 5% variance alert",
    details: "Compares invoice claims against theoretical drawing calculations to audit bills before releasing payment."
  },
  {
    id: "quotation",
    tabNumber: 30,
    tabName: "30. Quotation",
    category: "Contracts & Bidding",
    headline: "Printable Client Estimate & Quotation Generator",
    subtitle: "A formal client proposal with your company header, customizable markup percentage, and GST breakdown.",
    imageSrc: "/screenshots/08_quotation.png",
    altText: "Tab 30 Quotation - Professional printable client estimate with GST breakdown",
    details: "Formatted for instant PDF export and client presentation for contractors and civil engineers."
  }
];

interface PracticalScenario {
  id: string;
  title: string;
  role: string;
  context: string;
  problem: string;
  workbookSolution: string;
  tabsUsed: string[];
}

const PRACTICAL_SCENARIOS: PracticalScenario[] = [
  {
    id: "villa-takeoff",
    title: "Scenario A: Residential Villa Quantity Takeoff (1,500 sq ft G+1)",
    role: "Homeowner & Owner-Builder",
    context: "Planning an independent 3-BHK house build with an item-rate labor contractor in suburban Chennai.",
    problem: "Needed to verify theoretical requirements for cement bags, 8mm–16mm TMT rebar steel, and coarse sand before releasing advance money for raw materials.",
    workbookSolution: "Used Sheet 04 (Room Area) to record plot and room dimensions, Sheet 08 (Concrete) to calculate footing, column, and slab volumes with dry-volume factor (1.54), and Sheet 20 (Rates) to model current local supplier prices. Resulted in a structured Bill of Quantities before signing contractor agreements.",
    tabsUsed: ["04. Room Area", "08. Concrete", "11. Steel BBS", "13. Cost Estimate", "20. Rates"]
  },
  {
    id: "flat-remodel",
    title: "Scenario B: Apartment Interior Renovation (1,000 sq ft Flat)",
    role: "Apartment Owner / Interior Renovator",
    context: "Remodeling kitchen, two bathrooms, and living area in an existing high-rise apartment.",
    problem: "Manual estimates typically overlook door and window cutout deductions, leading to surplus tiles and excess paint buckets stored in balconies.",
    workbookSolution: "Used the dedicated 'Construction_Calculator_Pro_EXAMPLE_renovation.xlsx' workbook. Sheet 04 and Sheet 06 subtracted window and door openings to calculate net plaster surface area, primer liters, and exact 600×600 mm vitrified floor tile cartons with 7% breakage buffer.",
    tabsUsed: ["04. Room Area", "06. Paint & Tiles", "14. Room Costs", "17. Order List"]
  },
  {
    id: "bill-audit",
    title: "Scenario C: Subcontractor Running Account (RA) Bill Verification",
    role: "Civil Site Supervisor / Client Representative",
    context: "A masonry subcontractor submitted a running account bill claiming 3,800 cu.ft of 9-inch brickwork and 180 bags of cement.",
    problem: "Site supervisors need a standardized check to ensure claims align with certified architectural drawings before approving invoice disbursement.",
    workbookSolution: "Input the contractor's billed numbers into Sheet 25 (Bill Check). The built-in conditional formula automatically compared the billed quantity against the drawing takeoff in Sheet 09 (Bricks & Blocks) and flagged any variance greater than +5% in red for joint site measurement before authorization.",
    tabsUsed: ["09. Bricks & Blocks", "10. Plaster", "25. Bill Check", "28. Payments"]
  }
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedScreenshot, setSelectedScreenshot] = useState<ScreenshotItem>(PRODUCT_SCREENSHOTS[0]);
  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);
  const [activeScenarioId, setActiveScenarioId] = useState<string>("villa-takeoff");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Filter tools based on search query
  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return CATALOG_TOOLS;
    const query = searchQuery.toLowerCase();
    return CATALOG_TOOLS.filter((tool) => {
      return (
        tool.title.toLowerCase().includes(query) ||
        tool.niche.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.keyFeatures.some((f) => f.toLowerCase().includes(query))
      );
    });
  }, [searchQuery]);

  const activeScenario = PRACTICAL_SCENARIOS.find((s) => s.id === activeScenarioId) || PRACTICAL_SCENARIOS[0];

  const getPromiseIcon = (iconName: string) => {
    switch (iconName) {
      case "Unlock":
        return <Unlock className="w-5 h-5 text-amber-600" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-blue-600" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-amber-500" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-amber-500 selection:text-slate-950 font-sans">
      <HomeJsonLd />

      {/* 1. TOP ANNOUNCEMENT BANNER */}
      <aside
        aria-label="Product Release Announcement"
        className="bg-slate-950 text-white px-3.5 sm:px-4 py-2 text-center text-[11px] sm:text-xs font-medium border-b border-slate-800 shadow-xs flex items-center justify-center gap-2 flex-wrap"
      >
        <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shrink-0">
          <Flame className="w-3 h-3 fill-current text-amber-400" />
          Featured Release
        </span>
        <span className="text-slate-300">
          Construction Calculator Pro (3 Workbooks, 31 Connected Tabs, 13 Civil Guides & 7 Bonus Toolkits) — Instant Delivery at ₹499.
        </span>
        <Link
          href="/p/construction-calculator-pro"
          className="inline-flex items-center gap-1 text-amber-400 font-bold hover:text-amber-300 underline underline-offset-2 ml-1 cursor-pointer transition-colors whitespace-nowrap"
        >
          View Product Details &rarr;
        </Link>
      </aside>

      {/* 2. MAIN NAVIGATION */}
      <Header isFocusMode={false} />

      <main className="flex-1 pb-16 sm:pb-0">
        {/* =========================================================================
            SECTION 2: HERO SECTION
            Truthful, clean, professional presentation without fabricated social proof.
           ========================================================================= */}
        <section className="relative pt-10 pb-14 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24 overflow-hidden border-b border-slate-200/80 bg-white">
          {/* Subtle Grid & Atmosphere */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a06_1px,transparent_1px),linear-gradient(to_bottom,#0f172a06_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] sm:w-[750px] h-[220px] sm:h-[320px] bg-gradient-to-b from-amber-500/10 via-amber-400/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Context Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold mb-5 shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              <span>Thinktools.in</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-700">Digital Tools & Excel Workbooks</span>
            </div>

            {/* Main Single H1 */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.15] max-w-4xl mx-auto">
              Practical Tools for{" "}
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                Smarter Work
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Explore calculators, Excel workbooks, and ready-to-use templates that help simplify
              everyday tasks and construction estimation.
            </p>

            {/* Verifiable Product Facts (Replaces fake ratings and customer counts) */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>₹499 One-Time Payment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Microsoft Excel Only (Excel 2016–365)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Instant Digital Delivery (.zip Attached)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Aligned with CPWD & IS 456 Standards</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 sm:mt-10 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#catalog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Explore Our Tools</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/p/construction-calculator-pro"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 transition-all cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>View Construction Calculator Pro</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: FEATURED PRODUCTS (Verifiable products that actually exist)
           ========================================================================= */}
        <section id="catalog" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5 text-amber-600" />
              <span>Available Products</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Featured Tools Ready for Instant Download
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Every tool listed below is fully developed, packaged, and immediately delivered after
              purchase. No placeholder cards or non-functional checkouts.
            </p>
          </div>

          {/* Search bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search tools: concrete, steel, room area, bill check..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Available Product Cards Grid */}
          <div className="grid grid-cols-1 max-w-4xl mx-auto">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                className="rounded-3xl bg-white border-2 border-amber-400/80 shadow-lg shadow-amber-500/5 overflow-hidden flex flex-col md:flex-row transition-all hover:border-amber-500 hover:shadow-xl"
              >
                {/* Left: Product Image / Screenshot Preview */}
                <div className="md:w-5/12 bg-slate-900 relative p-6 flex flex-col justify-between text-white overflow-hidden">
                  <div className="relative z-10 space-y-3">
                    <span className="inline-block text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-extrabold">
                      {tool.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {tool.subtitle}
                    </p>
                  </div>

                  {/* Real screenshot preview card */}
                  <div className="mt-4 relative rounded-xl overflow-hidden border border-slate-700/80 shadow-md group">
                    <div className="aspect-[16/10] relative w-full bg-slate-950">
                      <Image
                        src={tool.imageSrc}
                        alt={tool.imageAlt}
                        fill
                        className="object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-[10px] font-mono text-amber-300">
                        Screenshot: Tab 13 (Cost Estimate)
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono flex items-center justify-between">
                    <span>{tool.workbooksCount} Workbooks</span>
                    <span>•</span>
                    <span>{tool.tabsCount} Connected Tabs</span>
                    <span>•</span>
                    <span>{tool.guideCount} Guides</span>
                  </div>
                </div>

                {/* Right: Detailed Product Contents & Working CTA */}
                <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                        Civil Engineering & House Construction
                      </span>
                      <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 font-bold">
                        Single Payment
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {tool.description}
                    </p>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5">
                        What is Included in This Package:
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-700">
                        {tool.keyFeatures.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                      <strong className="block text-slate-900 font-bold">Engineered For:</strong>
                      <p>{tool.targetAudience}</p>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-slate-950 font-mono">
                          ₹{tool.price}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          INR (All Included)
                        </span>
                      </div>
                      <span className="text-[11px] text-emerald-700 font-semibold block">
                        Lifetime license • Zero recurring subscriptions
                      </span>
                    </div>

                    <Link
                      id="featured-product-cta-btn"
                      href={tool.href}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                    >
                      <span>Explore the Calculator</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 max-w-md mx-auto">
              <Calculator className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-900">No tools match your query</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-3 text-xs text-amber-700 underline font-semibold"
              >
                Reset search
              </button>
            </div>
          )}

          {/* Development Roadmap Note (Transparent disclosure of upcoming work) */}
          <div className="mt-14 max-w-4xl mx-auto rounded-2xl bg-slate-100/80 border border-slate-200 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                  Product Pipeline
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  Tools in Active Development
                </h3>
              </div>
              <span className="text-xs text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full font-mono">
                Not Yet for Sale
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-5 leading-relaxed">
              We focus on building one thoroughly tested, macro-free product at a time. The following
              tools are currently being modeled and will only be listed for sale once their calculations
              and documentation pass full verification:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ROADMAP_TOOLS.map((tool) => (
                <div
                  key={tool.id}
                  className="p-4 rounded-xl bg-white border border-slate-200/90 space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">
                        {tool.categoryLabel}
                      </span>
                      <span className="text-[9px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold border border-amber-200">
                        {tool.status}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 mt-1 leading-snug">
                      {tool.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      {tool.subtitle}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-mono">
                    Planned for upcoming release
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: CONSTRUCTION CALCULATOR PRO (Flagship Deep Showcase)
           ========================================================================= */}
        <section id="featured-product" className="py-14 sm:py-20 bg-slate-950 text-white border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30">
                <Compass className="w-3.5 h-3.5" />
                <span>Primary Suite Details</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Construction Calculator Pro — India Edition
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                A structured calculation engine built to help users organize house estimates, simplify
                material takeoffs, and audit subcontractor bills before disbursements.
              </p>
            </div>

            {/* Included Content Metrics Grid (Verifiable numbers only) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
              <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">3</div>
                <div className="text-xs font-bold text-slate-200 mt-1">Excel Workbooks</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Master, Villa & Renovation</div>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">31</div>
                <div className="text-xs font-bold text-slate-200 mt-1">Connected Tabs</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Across every workbook</div>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">13</div>
                <div className="text-xs font-bold text-slate-200 mt-1">PDF Civil Guides</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Worksheets & checklists</div>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">7</div>
                <div className="text-xs font-bold text-slate-200 mt-1">Bonus Kits</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Contracts, tests & snag list</div>
              </div>
            </div>

            {/* The 3 Included Workbooks */}
            <div className="max-w-5xl mx-auto space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 text-center">
                The 3 Specific Workbooks in Your Download Bundle:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-amber-400 font-mono text-xs font-bold">Workbook 01</div>
                  <h4 className="text-sm font-bold text-white">Clean Master Calculator</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Zero pre-filled project data. Enter your plot size, room dimensions, and local supplier rates to build your project estimate from scratch.
                  </p>
                  <span className="inline-block text-[10px] font-mono text-slate-400 pt-1">
                    Construction_Calculator_Pro_INDIA_v2.xlsx
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-amber-400 font-mono text-xs font-bold">Workbook 02</div>
                  <h4 className="text-sm font-bold text-white">1,500 sq ft 3-BHK Villa Example</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    A fully populated independent house model in Chennai. Learn how each room dimension feeds concrete, rebar steel, masonry, and stage cash flows.
                  </p>
                  <span className="inline-block text-[10px] font-mono text-slate-400 pt-1">
                    Construction_Calculator_Pro_EXAMPLE_filled.xlsx
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-amber-400 font-mono text-xs font-bold">Workbook 03</div>
                  <h4 className="text-sm font-bold text-white">1,000 sq ft Flat Renovation</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Built for non-structural remodeling: kitchen, bathroom, and bedroom tiling, wall plastering, paint liters, and electrical fixture takeoffs.
                  </p>
                  <span className="inline-block text-[10px] font-mono text-slate-400 pt-1">
                    Construction_Calculator_Pro_EXAMPLE_renovation.xlsx
                  </span>
                </div>
              </div>
            </div>

            {/* Target Audience & Supported Workflows */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <HardHat className="w-4 h-4" />
                  <span>Who This Toolkit Is Designed For:</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Homeowners building a home:</strong> Verify material needs before signing turnkey or item-rate contracts so you do not overpay advances.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Owner-builders:</strong> Manage site purchases, track cement and steel deliveries, and verify bills with confidence.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Civil engineers & site supervisors:</strong> Generate quick preliminary quantity takeoffs and cross-check contractor running bills.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Residential contractors:</strong> Prepare clean, itemized Bill of Quantities (BOQ) proposals for clients with GST breakdowns.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <Ruler className="w-4 h-4" />
                  <span>Tasks Supported by the 31 Worksheets:</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Room Area & Opening Deductions:</strong> Automatically deduct doors and windows from wall surface areas for plaster and painting.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Concrete & BBS Rebar:</strong> Calculate wet/dry volume (1.54 factor), cement bags, aggregate, and steel weight by bar diameter.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Central Rate Master:</strong> Enter local supplier rates per unit to instantly update the entire 31-sheet calculation model.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Subcontractor Bill Audit:</strong> Automated 5% variance flag highlights contractor claims that exceed drawing calculations.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Scope Limitations Callout (Factual Boundaries) */}
            <div className="max-w-5xl mx-auto p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>Important Scope & Engineering Boundary:</strong> Construction Calculator Pro is a quantity takeoff and budget organization spreadsheet suite. It provides theoretical estimates based on user-entered room dimensions and standard civil engineering norms. It is <strong>not</strong> structural engineering software (such as STAAD.Pro or ETABS) and does not replace certified structural drawings, soil bearing tests, or municipal sanctions.
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-2">
              <Link
                href="/p/construction-calculator-pro"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                <span>Explore the Calculator (₹499)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: HOW IT WORKS (Verified Fulfillment Process)
           ========================================================================= */}
        <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block">
                Fulfillment Process
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
                How It Works: In 3 Simple Steps
              </h2>
              <p className="text-sm text-slate-600">
                A verified, transparent customer journey from review to permanent offline use.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
              {/* Step 1 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-black text-sm flex items-center justify-center font-mono">
                  1
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Review Included Contents
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Inspect the 31 tabs, real screenshots, and sample project walkthroughs on our dedicated product page to verify that the tool aligns with your project needs.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center font-mono">
                  2
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Secure Checkout (₹499)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Complete your order via Razorpay Standard Checkout using UPI (GPay, PhonePe, Paytm, BHIM), Cards, or Net Banking. Pay once with zero recurring subscriptions.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center font-mono">
                  3
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Instant Download & Email Backup
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your browser immediately redirects to an on-screen download page, while an automated confirmation email delivers the full .zip bundle directly to your inbox.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: WHY THINKTOOLS (Product-Based Trust)
           ========================================================================= */}
        <section id="why-us" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block">
                The ThinkTools Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Product-Based Value Over Subscription Traps
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                We believe practical tools should be completely private, transparently priced, and owned outright.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {THINKTOOLS_PROMISES.map((promise, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                    {getPromiseIcon(promise.icon)}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{promise.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{promise.description}</p>
                </div>
              ))}
            </div>

            {/* Direct Comparison Table */}
            <div className="mt-14 max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-slate-900">
                  How ThinkTools Compares to Alternatives
                </h3>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-900 font-bold">
                        <th className="p-4">Feature</th>
                        <th className="p-4 text-slate-500 font-medium">Free Internet Calculators</th>
                        <th className="p-4 text-slate-500 font-medium">Recurring SaaS Apps</th>
                        <th className="p-4 bg-amber-500/10 text-amber-900 font-extrabold border-l border-amber-200">
                          ThinkTools Pro Workbooks
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {COMPARISON_POINTS.map((pt, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                          <td className="p-4 font-bold text-slate-900">{pt.feature}</td>
                          <td className="p-4 text-slate-500">{pt.freeWeb}</td>
                          <td className="p-4 text-slate-500">{pt.saasApps}</td>
                          <td className="p-4 font-bold text-slate-950 bg-amber-500/5 border-l border-amber-200">
                            <span className="flex items-center gap-1.5 text-emerald-800">
                              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                              {pt.thinktools}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Upcoming SaaS Cloud Construction App Teaser */}
            <div className="mt-8 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/80 text-white p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
              {/* Ambient Background Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
                    <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                    <Rocket className="w-3.5 h-3.5 text-amber-400" />
                    <span>Upcoming Product · Coming Soon</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Looking for Cloud Estimation?{" "}
                    <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 bg-clip-text text-transparent">
                      Construction Cloud SaaS
                    </span>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    ThinkTools provides two distinct options for construction professionals: our available{" "}
                    <strong className="text-white">Construction Calculator Pro</strong> (downloadable Excel toolkit for a single ₹499 one-time payment), and our upcoming{" "}
                    <strong className="text-white">Construction Cloud SaaS</strong>, currently in development for teams seeking browser-based workflows and multi-device cloud synchronization.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-300 font-medium">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <Cloud className="w-3.5 h-3.5" /> Browser-Based Workflows
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Multi-Device Cloud Sync
                    </span>
                    <span className="flex items-center gap-1.5 text-amber-400">
                      <Sparkles className="w-3.5 h-3.5" /> Plans starting at ₹999/year
                    </span>
                  </div>
                </div>

                <div className="shrink-0 w-full lg:w-auto">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center lg:text-left backdrop-blur-xs space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold block">
                        Construction Cloud SaaS
                      </span>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                        Coming Soon
                      </span>
                    </div>

                    <div>
                      <div className="text-xs text-slate-400 font-medium">Annual Subscription</div>
                      <div className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">
                        Plans starting at ₹999<span className="text-xs font-normal text-slate-300">/year</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 leading-normal max-w-xs">
                        Independent subscription service. Not included in the ₹499 one-time Excel toolkit purchase.
                      </div>
                    </div>

                    <a
                      href="mailto:support@thinktools.in?subject=Construction%20Cloud%20SaaS%20Early%20Access"
                      className="inline-flex items-center justify-center gap-2 w-full mt-1 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Contact Us for Early Access</span>
                    </a>

                    <p className="text-[11px] text-slate-400 text-center leading-normal">
                      Have questions or early inquiries?{" "}
                      <a
                        href="mailto:support@thinktools.in?subject=Construction%20Cloud%20SaaS%20Early%20Access"
                        className="text-amber-400 hover:text-amber-300 underline font-medium"
                      >
                        support@thinktools.in
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: REAL SCREENSHOTS & PRACTICAL SITE SCENARIOS
            Genuine product previews and realistic use cases (no fake customer reviews).
           ========================================================================= */}
        <section id="previews" className="py-14 sm:py-20 bg-slate-900 text-white border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                Genuine Product Previews
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Inspect Real Worksheets & Formulas
              </h2>
              <p className="text-sm text-slate-300">
                Explore actual screenshots of the included 31 worksheets. Click any tab below to inspect
                its layout, calculations, and functions.
              </p>
            </div>

            {/* Interactive Screenshot Gallery */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Tab Selector Buttons */}
              <div className="lg:col-span-4 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold">
                  Select Worksheet to Inspect:
                </span>
                <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
                  {PRODUCT_SCREENSHOTS.map((item) => {
                    const isSelected = selectedScreenshot.id === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedScreenshot(item)}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md"
                            : "bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                        }`}
                      >
                        <div>
                          <span className="block text-[10px] font-mono opacity-80">{item.category}</span>
                          <span className="text-xs">{item.tabName}</span>
                        </div>
                        <ArrowRight className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-slate-950" : "text-slate-500"}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: High-Resolution Screenshot Preview */}
              <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block font-bold">
                      {selectedScreenshot.category} • Sheet {selectedScreenshot.tabNumber}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                      {selectedScreenshot.headline}
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsZoomOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer shrink-0 transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Zoom Image</span>
                  </button>
                </div>

                <div
                  onClick={() => setIsZoomOpen(true)}
                  className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 aspect-[16/10] w-full cursor-zoom-in group"
                >
                  <Image
                    src={selectedScreenshot.imageSrc}
                    alt={selectedScreenshot.altText}
                    fill
                    className="object-cover object-top group-hover:scale-102 transition-transform duration-200"
                    sizes="(max-width: 1024px) 100vw, 750px"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-slate-950/80 text-white text-xs px-3 py-1.5 rounded-full font-medium transition-opacity flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5" /> Click to enlarge
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white">{selectedScreenshot.subtitle}</span>
                    <p className="text-slate-400 text-[11px] mt-0.5">{selectedScreenshot.details}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Practical Project Scenarios (Replacing fake testimonials) */}
            <div className="pt-8 border-t border-slate-800 space-y-6">
              <div className="text-center max-w-2xl mx-auto space-y-1">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
                  Practical Site Applications
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  How Users Apply the Workbooks on Real Sites
                </h3>
                <p className="text-xs text-slate-400">
                  Concrete examples of the tasks and calculations supported by the 31 worksheets.
                </p>
              </div>

              {/* Scenario Selector Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {PRACTICAL_SCENARIOS.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => setActiveScenarioId(sc.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeScenarioId === sc.id
                        ? "bg-amber-500 text-slate-950 shadow-md"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {sc.title.split(":")[0]}
                  </button>
                ))}
              </div>

              {/* Active Scenario Card */}
              <div className="max-w-4xl mx-auto rounded-2xl bg-slate-950 border border-slate-800 p-6 sm:p-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white">
                      {activeScenario.title}
                    </h4>
                    <span className="text-xs text-amber-400 font-mono">
                      Role Context: {activeScenario.role}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800 font-mono">
                    Realistic Workflow
                  </span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <div>
                    <strong className="text-white block text-xs uppercase tracking-wider font-mono text-slate-400 mb-1">
                      Project Background:
                    </strong>
                    <p>{activeScenario.context}</p>
                  </div>

                  <div>
                    <strong className="text-white block text-xs uppercase tracking-wider font-mono text-slate-400 mb-1">
                      The Challenge / Calculation Bottleneck:
                    </strong>
                    <p>{activeScenario.problem}</p>
                  </div>

                  <div>
                    <strong className="text-white block text-xs uppercase tracking-wider font-mono text-emerald-400 mb-1">
                      Workbook Solution:
                    </strong>
                    <p>{activeScenario.workbookSolution}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400 font-bold">Sheets Used:</span>
                  {activeScenario.tabsUsed.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-[11px] font-mono text-amber-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Screenshot Zoom Modal */}
        {isZoomOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative max-w-5xl w-full bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                    {selectedScreenshot.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {selectedScreenshot.tabName} — {selectedScreenshot.headline}
                  </h3>
                </div>
                <button
                  onClick={() => setIsZoomOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 max-h-[75vh]">
                <Image
                  src={selectedScreenshot.imageSrc}
                  alt={selectedScreenshot.altText}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              <div className="text-xs text-slate-300 flex items-center justify-between">
                <span>{selectedScreenshot.subtitle}</span>
                <button
                  onClick={() => setIsZoomOpen(false)}
                  className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  Close Zoom
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 8: FREQUENTLY ASKED QUESTIONS
            Strictly factual answers based on actual legal pages and file contents.
           ========================================================================= */}
        <section id="faqs" className="py-14 sm:py-20 bg-slate-100/70 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 space-y-2">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block">
                Clear Answers
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Factual details on included files, compatibility, payment methods, delivery, and refund policy.
              </p>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-all shadow-2xs"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm hover:text-amber-700 transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: FINAL CALL TO ACTION
           ========================================================================= */}
        <section className="py-16 bg-slate-950 text-white text-center border-t border-slate-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Digital Access</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Find the Right Tools for Your Work
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Start with Construction Calculator Pro for practical, formula-driven estimation and
              billing control, or explore our guides and tool specifications.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <Link
                href="/p/construction-calculator-pro"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-md shadow-amber-500/20 transition-all cursor-pointer"
              >
                <span>View Construction Calculator Pro (₹499)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#catalog"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 font-bold text-sm transition-all cursor-pointer"
              >
                <span>Browse Available Tools</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          MOBILE STICKY ACTION BAR (Accessible mobile conversion)
         ========================================================================= */}
      <aside
        aria-label="Quick Purchase Action"
        className="fixed bottom-0 inset-x-0 z-30 p-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] bg-white/95 backdrop-blur-md border-t border-slate-200 sm:hidden flex items-center justify-between gap-2.5 shadow-lg"
      >
        <div className="min-w-0 pl-1">
          <span className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider">
            Featured Suite
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-black text-slate-900 font-mono">₹499</span>
            <span className="text-[10px] text-slate-500">• 31 Tabs Included</span>
          </div>
        </div>

        <Link
          href="/p/construction-calculator-pro"
          className="flex-1 max-w-[210px] py-2.5 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer transition-all shrink-0"
        >
          <span>View Construction Pro</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </aside>

      {/* =========================================================================
          SECTION 10: FOOTER
         ========================================================================= */}
      <Footer />
    </div>
  );
}
