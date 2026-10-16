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
  Check,
  Cpu,
  Unlock,
  Maximize2,
  X,
  Compass,
  Rocket,
  Cloud,
  Mail,
  Briefcase,
  LayoutGrid
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopularTools from "@/components/PopularTools";
import {
  CATALOG_TOOLS,
  CATEGORIES,
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
    tabNumber: 21,
    tabName: "21. Stage Budget",
    category: "Cashflow & Trades",
    headline: "Disbursement Milestone Tracker & Cashflow Forecast",
    subtitle: "Phase-by-phase breakdown for substructure, RCC frame, brickwork, and finishes to prevent cash shortages.",
    imageSrc: "/screenshots/06_stage_budget.png",
    altText: "Tab 21 Stage Budget - Milestone payments and construction cashflow forecast",
    details: "Helps schedule contractor release payments against completed site milestones rather than unearned calendar dates."
  },
  {
    id: "bill-check",
    tabNumber: 25,
    tabName: "25. Bill Check",
    category: "Contractor Audit",
    headline: "Subcontractor Invoice & Running Account (RA) Audit",
    subtitle: "Flag quantity discrepancies between contractor billed claims and certified site measurements with a 5% trigger.",
    imageSrc: "/screenshots/07_bill_check.png",
    altText: "Tab 25 Bill Check - Automated contractor bill audit with 5% variance flag",
    details: "Instant visual warning flags notify you before certifying invoice payments with inflated consumption claims."
  },
  {
    id: "quotation",
    tabNumber: 30,
    tabName: "30. Quotation",
    category: "Client Proposal",
    headline: "Printable Client Estimate & Quotation Generator",
    subtitle: "Form-formatted quotation document populated directly from your calculation tabs for client proposals.",
    imageSrc: "/screenshots/08_quotation.png",
    altText: "Tab 30 Quotation - Professional printable client estimate with GST breakdown",
    details: "Print-ready layout designed with proper page breaks and corporate header formatting."
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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedScreenshot, setSelectedScreenshot] = useState<ScreenshotItem>(PRODUCT_SCREENSHOTS[0]);
  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);
  const [activeScenarioId, setActiveScenarioId] = useState<string>("villa-takeoff");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Filter tools based on search and category
  const filteredTools = useMemo(() => {
    return CATALOG_TOOLS.filter((tool) => {
      const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
      if (!searchQuery.trim()) return matchesCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        tool.title.toLowerCase().includes(query) ||
        tool.niche.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.keyFeatures.some((f) => f.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const activeScenario = PRACTICAL_SCENARIOS.find((s) => s.id === activeScenarioId) || PRACTICAL_SCENARIOS[0];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Building2":
        return <Building2 className="w-4 h-4 text-[#172033]" />;
      case "Zap":
        return <Zap className="w-4 h-4 text-[#172033]" />;
      case "Calculator":
        return <Calculator className="w-4 h-4 text-[#172033]" />;
      case "Briefcase":
        return <Briefcase className="w-4 h-4 text-[#172033]" />;
      case "FileSpreadsheet":
        return <FileSpreadsheet className="w-4 h-4 text-[#172033]" />;
      case "Cloud":
        return <Cloud className="w-4 h-4 text-[#172033]" />;
      default:
        return <LayoutGrid className="w-4 h-4 text-[#172033]" />;
    }
  };

  const getPromiseIcon = (iconName: string) => {
    switch (iconName) {
      case "Unlock":
        return <Unlock className="w-5 h-5 text-[#172033]" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-[#172033]" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-[#172033]" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-[#172033]" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-[#172033]" />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#475569] flex flex-col font-sans">
      <HomeJsonLd />

      {/* TOP ANNOUNCEMENT TICKER */}
      <aside
        aria-label="Important Announcement"
        className="w-full bg-[#172033] text-white text-[11px] sm:text-xs py-2.5 px-4 text-center font-medium border-b border-slate-800 flex items-center justify-center flex-wrap gap-x-2.5 gap-y-1"
      >
        <span className="inline-flex items-center gap-1.5 bg-[#B9F36B]/20 text-[#B9F36B] border border-[#B9F36B]/30 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shrink-0">
          Featured Suite
        </span>
        <span className="text-slate-300">
          Construction Calculator Pro (3 Workbooks, 31 Connected Tabs, 13 Civil Guides & 7 Bonuses)
        </span>
        <span className="hidden sm:inline text-slate-600">•</span>
        <span className="text-white font-bold">₹499 One-Time Payment</span>
        <span className="hidden sm:inline text-slate-600">•</span>
        <Link
          href="/p/construction-calculator-pro"
          className="inline-flex items-center gap-1 text-[#B9F36B] font-bold hover:underline ml-1 cursor-pointer transition-colors whitespace-nowrap"
        >
          View Details &rarr;
        </Link>
      </aside>

      {/* SECTION A: HEADER */}
      <Header isFocusMode={false} />

      <main className="flex-1">
        {/* =========================================================================
            SECTION B: HERO SECTION
            Benefit-focused headline, clear value proposition, Clean Light Theme.
           ========================================================================= */}
        <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden border-b border-[#E2E8F0] bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Context Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F7FA] border border-[#E2E8F0] text-[#172033] text-xs font-semibold mb-6 shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-[#84cc16]" />
              <span>ThinkTools</span>
              <span className="text-slate-300">•</span>
              <span className="text-[#64748B]">Work Smarter. Solve Problems Faster.</span>
            </div>

            {/* Benefit-Focused H1 */}
            <h1 className="font-heading text-hero-h1 text-[#172033] max-w-4xl mx-auto">
              Work Smarter.{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Solve Problems Faster.</span>
                <span className="absolute bottom-1.5 sm:bottom-2 left-0 w-full h-3 sm:h-3.5 bg-[#B9F36B]/60 -z-0 rounded-xs" />
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-5 sm:mt-6 text-sm sm:text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed">
              Practical calculators, online tools and ready-to-use digital products that help you save time, reduce manual work, and make confident decisions.
            </p>

            {/* Verifiable Product Facts */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-2.5 text-xs sm:text-sm text-[#475569] font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#84cc16] shrink-0" />
                <span>Zero Subscriptions (Lifetime Ownership)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#84cc16] shrink-0" />
                <span>100% Private Offline Files</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#84cc16] shrink-0" />
                <span>Instant Digital Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#84cc16] shrink-0" />
                <span>Standards Aligned (CPWD & IS 456)</span>
              </div>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 sm:mt-10 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#catalog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#B9F36B] hover:bg-[#a8eb56] text-[#172033] font-bold text-sm shadow-xs transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Explore Free Tools</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#digital-products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#F5F7FA] text-[#172033] border border-[#E2E8F0] font-semibold text-sm shadow-xs transition-all cursor-pointer whitespace-nowrap"
              >
                <span>View Digital Products</span>
              </a>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION C & D: SEARCH, QUICK ACCESS & POPULAR WORKING TOOLS
            Light Grey background (#F5F7FA) with pure white interactive cards.
           ========================================================================= */}
        <section id="catalog" className="py-14 sm:py-20 bg-[#F5F7FA] border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Section Header & Search */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-xs font-bold text-[#172033] uppercase tracking-wider shadow-2xs">
                <Calculator className="w-3.5 h-3.5 text-[#172033]" />
                <span>Free Online Utilities</span>
              </div>
              <h2 className="font-heading text-section-h2 text-[#172033] tracking-tight">
                Popular Practical Tools
              </h2>
              <p className="text-sm sm:text-base text-[#475569]">
                Accurate, fast calculators you can use immediately in your browser—no downloads or sign-ups required.
              </p>

              {/* Search Bar */}
              <div className="max-w-lg mx-auto pt-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search calculators, tools and templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-white border border-[#E2E8F0] rounded-xl text-sm text-[#172033] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#172033]/10 focus:border-[#172033] transition-all shadow-xs"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-semibold cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Category Shortcuts */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#172033] text-white shadow-xs font-bold"
                          : "bg-white text-[#172033] border border-[#E2E8F0] hover:bg-slate-50"
                      }`}
                    >
                      {getCategoryIcon(cat.icon)}
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Popular Tools Component (6 Interactive Working Calculators) */}
            <PopularTools />
          </div>
        </section>

        {/* =========================================================================
            SECTION E: CATEGORIES DIRECTORY
            Pure white background (#FFFFFF) with clean category architecture.
           ========================================================================= */}
        <section id="categories" className="py-14 sm:py-20 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F7FA] border border-[#E2E8F0] text-xs font-bold text-[#172033] uppercase tracking-wider shadow-2xs">
                <Compass className="w-3.5 h-3.5 text-[#172033]" />
                <span>Domain Directory</span>
              </div>
              <h2 className="font-heading text-section-h2 text-[#172033] tracking-tight">
                Explore by Tool Category
              </h2>
              <p className="text-sm sm:text-base text-[#475569]">
                Find calculation utilities, professional spreadsheets, and digital models organized by domain.
              </p>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    const el = document.getElementById("catalog");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#172033] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-[#F5F7FA] border border-[#E2E8F0] flex items-center justify-center group-hover:bg-[#B9F36B]/20 group-hover:border-[#B9F36B] transition-colors">
                      {getCategoryIcon(cat.icon)}
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold text-[#172033] group-hover:text-[#172033]">
                        {cat.label}
                      </h3>
                      <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-semibold text-[#172033]">
                    <span className="text-[#64748B]">Browse Category</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION F: DIGITAL PRODUCTS & VERIFIABLE SUITES
            Show downloadable products separately from free online tools.
           ========================================================================= */}
        <section id="digital-products" className="py-14 sm:py-20 bg-[#F5F7FA] border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-xs font-bold text-[#172033] uppercase tracking-wider shadow-2xs">
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#172033]" />
                <span>Downloadable Systems</span>
              </div>
              <h2 className="font-heading text-section-h2 text-[#172033] tracking-tight">
                Flagship Digital Products & Spreadsheets
              </h2>
              <p className="text-sm sm:text-base text-[#475569]">
                Professional, macro-free Microsoft Excel workbooks built around Indian engineering standards. Instant download with lifetime license.
              </p>
            </div>

            {/* Featured Product Card: Construction Calculator Pro */}
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                className="rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-10 shadow-xs hover:border-slate-300 transition-all space-y-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Product Summary */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#172033] text-white">
                        Flagship Excel Suite
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {tool.badge}
                      </span>
                    </div>

                    <h3 className="font-heading text-sub-h3 font-extrabold text-[#172033] tracking-tight">
                      {tool.title}
                    </h3>

                    <p className="text-sm text-[#475569] leading-relaxed">
                      {tool.description}
                    </p>

                    {/* Key Specs Matrix */}
                    <div className="grid grid-cols-3 gap-3 py-2 text-center">
                      <div className="p-3 rounded-xl bg-[#F5F7FA] border border-[#E2E8F0]">
                        <div className="text-lg font-heading font-black text-[#172033] tabular-nums">{tool.workbooksCount}</div>
                        <div className="text-[10px] text-[#64748B] uppercase font-bold">Workbooks</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#F5F7FA] border border-[#E2E8F0]">
                        <div className="text-lg font-heading font-black text-[#172033] tabular-nums">{tool.tabsCount}</div>
                        <div className="text-[10px] text-[#64748B] uppercase font-bold">Connected Sheets</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#F5F7FA] border border-[#E2E8F0]">
                        <div className="text-lg font-heading font-black text-[#172033] tabular-nums">{tool.guideCount}</div>
                        <div className="text-[10px] text-[#64748B] uppercase font-bold">PDF Guides</div>
                      </div>
                    </div>

                    {/* Key Highlight Bullets */}
                    <div className="space-y-2 pt-1 text-xs sm:text-sm text-[#475569]">
                      {tool.keyFeatures.slice(0, 3).map((feat, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#84cc16] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Pricing & Purchase Action */}
                  <div className="lg:col-span-5 bg-[#F5F7FA] border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 space-y-6 text-center lg:text-left">
                    <div>
                      <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                        One-Time Lifetime License
                      </span>
                      <div className="flex items-baseline justify-center lg:justify-start gap-2 mt-1">
                        <span className="text-4xl font-heading font-black text-[#172033] tabular-nums">
                          ₹{tool.price}
                        </span>
                        <span className="text-sm text-slate-400 line-through tabular-nums">₹1,999</span>
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                          Save ₹1,500 Today
                        </span>
                      </div>
                      <p className="text-xs text-[#64748B] mt-2">
                        Zero recurring subscriptions. Instant digital delivery with .zip attached to email.
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      <Link
                        href={tool.href}
                        className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#B9F36B] hover:bg-[#a8eb56] text-[#172033] font-bold text-sm shadow-xs transition-all cursor-pointer"
                      >
                        <span>View Full Specifications (₹{tool.price})</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <div className="text-[11px] text-[#64748B] text-center">
                        Requires Microsoft Excel 2016–365 on Windows or Mac
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Upcoming SaaS Cloud Construction App Teaser */}
            <div className="rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-8 shadow-xs relative overflow-hidden">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F7FA] border border-[#E2E8F0] text-[#172033] text-xs font-bold">
                    <Rocket className="w-3.5 h-3.5 text-[#172033]" />
                    <span>Upcoming Product · Coming Soon</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-[#172033] tracking-tight">
                    Looking for Cloud Estimation? ThinkTools Construction Cloud SaaS
                  </h3>

                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    ThinkTools provides two distinct options for construction professionals: our available <strong className="text-[#172033]">Construction Calculator Pro</strong> (downloadable Excel toolkit for a single ₹499 one-time payment), and our upcoming <strong className="text-[#172033]">Construction Cloud SaaS</strong>, currently in development for teams seeking browser-based workflows and multi-device cloud synchronization.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-[#64748B] font-medium">
                    <span className="flex items-center gap-1.5 text-[#172033]">
                      <Cloud className="w-3.5 h-3.5" /> Browser-Based Workflows
                    </span>
                    <span className="flex items-center gap-1.5 text-[#172033]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Multi-Device Cloud Sync
                    </span>
                    <span className="flex items-center gap-1.5 text-[#172033]">
                      <Sparkles className="w-3.5 h-3.5" /> Plans starting at ₹999/year
                    </span>
                  </div>
                </div>

                <div className="shrink-0 w-full lg:w-auto">
                  <div className="bg-[#F5F7FA] border border-[#E2E8F0] rounded-2xl p-5 text-center lg:text-left space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[11px] uppercase tracking-wider text-[#172033] font-bold block">
                        Construction Cloud SaaS
                      </span>
                      <span className="text-[10px] bg-slate-200 text-[#172033] px-2 py-0.5 rounded-full font-bold">
                        Coming Soon
                      </span>
                    </div>

                    <div>
                      <div className="text-xs text-[#64748B] font-medium">Annual Subscription</div>
                      <div className="text-xl sm:text-2xl font-black text-[#172033] font-mono mt-0.5">
                        Plans starting at ₹999<span className="text-xs font-normal text-[#64748B]">/year</span>
                      </div>
                      <div className="text-[11px] text-[#64748B] mt-1 leading-normal max-w-xs">
                        Independent subscription service. Not included in the ₹499 one-time Excel toolkit purchase.
                      </div>
                    </div>

                    <a
                      href="mailto:support@thinktools.in?subject=Construction%20Cloud%20SaaS%20Early%20Access"
                      className="inline-flex items-center justify-center gap-2 w-full mt-1 px-4 py-2.5 rounded-xl bg-[#172033] hover:bg-[#1e293b] text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Contact Us for Early Access</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Screenshot Preview Gallery (Clean Light Theme) */}
            <div className="rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-10 shadow-xs space-y-8">
              <div className="text-center max-w-3xl mx-auto space-y-2">
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-widest block">
                  Interactive Worksheet Inspector
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight">
                  Inspect Real Worksheets & Formulas
                </h3>
                <p className="text-sm text-[#475569]">
                  Explore actual screenshots of the included 31 worksheets. Click any tab below to inspect its layout, calculations, and functions.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Tab Selector Buttons */}
                <div className="lg:col-span-4 space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] block mb-2 font-bold">
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
                              ? "bg-[#172033] text-white font-bold border-[#172033] shadow-xs"
                              : "bg-[#F5F7FA] border-[#E2E8F0] text-[#172033] hover:bg-slate-100"
                          }`}
                        >
                          <div>
                            <span className="block text-[10px] font-mono opacity-80">{item.category}</span>
                            <span className="text-xs">{item.tabName}</span>
                          </div>
                          <ArrowRight className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-[#B9F36B]" : "text-slate-400"}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: High-Resolution Screenshot Preview */}
                <div className="lg:col-span-8 bg-[#F5F7FA] rounded-2xl border border-[#E2E8F0] p-5 space-y-4 shadow-xs">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] block font-bold">
                        {selectedScreenshot.category} · Tab #{selectedScreenshot.tabNumber}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-[#172033] mt-0.5">
                        {selectedScreenshot.headline}
                      </h4>
                    </div>
                    <button
                      onClick={() => setIsZoomOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E2E8F0] text-[#172033] text-xs font-semibold cursor-pointer shrink-0 transition-colors hover:bg-slate-50"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Zoom Image</span>
                    </button>
                  </div>

                  <div
                    onClick={() => setIsZoomOpen(true)}
                    className="relative rounded-xl overflow-hidden bg-white border border-[#E2E8F0] aspect-[16/10] w-full cursor-zoom-in group"
                  >
                    <Image
                      src={selectedScreenshot.imageSrc}
                      alt={selectedScreenshot.altText}
                      fill
                      className="object-cover object-top group-hover:scale-101 transition-transform duration-200"
                      sizes="(max-width: 1024px) 100vw, 750px"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] text-xs text-[#475569] flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#84cc16] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#172033]">{selectedScreenshot.subtitle}</span>
                      <p className="text-[#64748B] text-[11px] mt-0.5">{selectedScreenshot.details}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Practical Project Scenarios */}
              <div className="pt-8 border-t border-[#E2E8F0] space-y-6">
                <div className="text-center max-w-2xl mx-auto space-y-1">
                  <span className="text-xs text-[#64748B] font-bold uppercase tracking-wider block">
                    Practical Site Applications
                  </span>
                  <h4 className="font-heading text-xl sm:text-2xl font-bold text-[#172033]">
                    How Users Apply the Workbooks on Real Sites
                  </h4>
                  <p className="text-xs text-[#475569]">
                    Concrete examples of tasks and calculations supported by the 31 worksheets.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PRACTICAL_SCENARIOS.map((scenario) => {
                    const isActive = activeScenarioId === scenario.id;
                    return (
                      <button
                        key={scenario.id}
                        onClick={() => setActiveScenarioId(scenario.id)}
                        className={`p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          isActive
                            ? "bg-[#172033] text-white font-bold border-[#172033] shadow-xs"
                            : "bg-[#F5F7FA] border-[#E2E8F0] text-[#172033] hover:bg-slate-100"
                        }`}
                      >
                        <span className="block text-[10px] opacity-75">{scenario.role}</span>
                        <span className="text-xs leading-snug block mt-0.5 font-medium">{scenario.title.split(":")[0]}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-[#F5F7FA] border border-[#E2E8F0] space-y-4 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3">
                    <h5 className="font-heading text-sm sm:text-base font-bold text-[#172033]">{activeScenario.title}</h5>
                    <span className="text-[11px] text-[#64748B] bg-white px-2.5 py-0.5 rounded border border-[#E2E8F0] font-medium">
                      Role: {activeScenario.role}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <strong className="text-[#172033] block mb-1 font-semibold">Site Situation & Challenge:</strong>
                      <p className="text-[#475569] leading-relaxed">{activeScenario.problem}</p>
                    </div>
                    <div>
                      <strong className="text-[#172033] block mb-1 font-semibold">How the Excel Toolkit Solves It:</strong>
                      <p className="text-[#475569] leading-relaxed">{activeScenario.workbookSolution}</p>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="font-bold text-[#172033]">Sheets Employed:</span>
                    {activeScenario.tabsUsed.map((tab, idx) => (
                      <span key={idx} className="bg-white px-2 py-0.5 rounded border border-[#E2E8F0] text-[#172033] font-medium">
                        {tab}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION G: WHY THINKTOOLS & COMPARISON
            Pure White background (#FFFFFF) with clear practical value propositions.
           ========================================================================= */}
        <section id="why-us" className="py-14 sm:py-20 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F7FA] border border-[#E2E8F0] text-xs font-bold text-[#172033] uppercase tracking-wider shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#172033]" />
                <span>Our Principles</span>
              </div>
              <h2 className="font-heading text-section-h2 text-[#172033] tracking-tight">
                Product-Based Value Over Subscription Traps
              </h2>
              <p className="text-xs sm:text-sm text-[#475569]">
                Practical tools should be completely private, transparently priced, and owned outright.
              </p>
            </div>

            {/* 4 Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {THINKTOOLS_PROMISES.map((promise, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-3 hover:border-slate-300 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F5F7FA] border border-[#E2E8F0] flex items-center justify-center">
                    {getPromiseIcon(promise.icon)}
                  </div>
                  <h3 className="font-heading text-sm font-bold text-[#172033]">{promise.title}</h3>
                  <p className="text-xs text-[#475569] leading-relaxed">{promise.description}</p>
                </div>
              ))}
            </div>

            {/* Comparison Table */}
            <div className="mt-14 max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <h3 className="font-heading text-lg font-bold text-[#172033]">
                  How ThinkTools Compares to Alternatives
                </h3>
              </div>
              <div className="rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#F5F7FA] border-b border-[#E2E8F0] text-[#172033] font-bold">
                        <th className="p-4 font-heading">Feature</th>
                        <th className="p-4 text-[#64748B] font-medium">Free Internet Calculators</th>
                        <th className="p-4 text-[#64748B] font-medium">Recurring SaaS Apps</th>
                        <th className="p-4 bg-[#B9F36B]/20 text-[#172033] font-heading font-extrabold border-l border-[#B9F36B]/40">
                          ThinkTools Pro Toolkits
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      {COMPARISON_POINTS.map((pt, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                          <td className="p-4 font-bold text-[#172033]">{pt.feature}</td>
                          <td className="p-4 text-[#475569]">{pt.freeWeb}</td>
                          <td className="p-4 text-[#475569]">{pt.saasApps}</td>
                          <td className="p-4 font-bold text-[#172033] bg-[#B9F36B]/10 border-l border-[#B9F36B]/30">
                            <span className="flex items-center gap-1.5 text-[#172033]">
                              <Check className="w-4 h-4 text-[#84cc16] shrink-0" />
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
          </div>
        </section>

        {/* =========================================================================
            SECTION: FAQS
            Light grey background with pure white cards.
           ========================================================================= */}
        <section id="faqs" className="py-14 sm:py-20 bg-[#F5F7FA] border-b border-[#E2E8F0]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                Frequently Asked Questions
              </span>
              <h2 className="font-heading text-section-h2 text-[#172033] tracking-tight">
                Clear Answers to Common Inquiries
              </h2>
              <p className="text-xs sm:text-sm text-[#475569]">
                Everything you need to know about purchasing, file compatibility, and digital fulfillment.
              </p>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden shadow-2xs transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="font-heading font-bold text-sm sm:text-base text-[#172033]">{faq.question}</span>
                      <div className="w-7 h-7 rounded-full bg-[#F5F7FA] border border-[#E2E8F0] flex items-center justify-center shrink-0">
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#172033]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#E2E8F0] pt-3">
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
            SECTION H: FINAL CTA
            Restrained Midnight Navy background with Lime Green CTA.
           ========================================================================= */}
        <section className="py-16 sm:py-24 bg-[#172033] text-white relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#B9F36B] text-xs font-bold uppercase tracking-wider">
              <span>Ready to Work Smarter?</span>
            </div>

            <h2 className="font-heading text-section-h2 text-white tracking-tight leading-tight">
              Ready to Work Smarter?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Find practical tools and digital products that make everyday work easier. Instant download, lifetime ownership, and zero monthly fees.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
              <a
                href="#catalog"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#B9F36B] hover:bg-[#a8eb56] text-[#172033] font-bold text-sm shadow-xs transition-all cursor-pointer"
              >
                <span>Explore Free Tools</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/p/construction-calculator-pro"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm transition-all cursor-pointer"
              >
                <span>View Construction Calculator Pro (₹499)</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* SECTION I: FOOTER */}
      <Footer />

      {/* Screenshot Zoom Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative w-full aspect-[16/10] bg-slate-950">
              <Image
                src={selectedScreenshot.imageSrc}
                alt={selectedScreenshot.altText}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
            </div>
            <div className="p-4 bg-white border-t border-[#E2E8F0] flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-[#172033]">{selectedScreenshot.headline}</span>
                <p className="text-[#64748B] text-[11px]">{selectedScreenshot.subtitle}</p>
              </div>
              <button
                onClick={() => setIsZoomOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#172033] text-white font-bold cursor-pointer hover:bg-slate-800"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
