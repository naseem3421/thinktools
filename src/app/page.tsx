"use client";

import React, { useState, useMemo } from "react";
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
  Calculator,
  Layers,
  Lock,
  ChevronDown,
  ChevronUp,
  Search,
  ExternalLink,
  Clock,
  BadgeCheck,
  Building2,
  Home,
  Briefcase,
  ShoppingBag,
  Activity,
  Flame,
  LayoutGrid,
  ArrowUpRight,
  HelpCircle,
  Shield,
  FileText,
  DollarSign,
  Download,
  Users,
  Check,
  Cpu,
  Unlock,
  AlertCircle
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  CATALOG_TOOLS,
  CATEGORIES,
  THINKTOOLS_PROMISES,
  COMPARISON_POINTS,
  FAQS,
  CatalogTool
} from "@/data/catalog";

export default function CommonLandingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedPreviewTool, setSelectedPreviewTool] = useState<CatalogTool | null>(null);

  // Filter tools based on category and search query
  const filteredTools = useMemo(() => {
    return CATALOG_TOOLS.filter((tool) => {
      const matchesCategory =
        selectedCategory === "all" || tool.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.niche.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.keyFeatures.some((f) =>
          f.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const flagship = CATALOG_TOOLS.find((t) => t.isFlagship) || CATALOG_TOOLS[0];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Building2":
        return <Building2 className="w-4 h-4" />;
      case "Home":
        return <Home className="w-4 h-4" />;
      case "Briefcase":
        return <Briefcase className="w-4 h-4" />;
      case "TrendingUp":
        return <TrendingUp className="w-4 h-4" />;
      case "ShoppingBag":
        return <ShoppingBag className="w-4 h-4" />;
      case "Activity":
        return <Activity className="w-4 h-4" />;
      default:
        return <LayoutGrid className="w-4 h-4" />;
    }
  };

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
      {/* 1. TOP ANNOUNCEMENT TICKER */}
      <aside
        aria-label="Store Announcement"
        className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white px-4 py-2.5 text-center text-xs font-medium border-b border-slate-800 shadow-xs flex items-center justify-center gap-2 flex-wrap"
      >
        <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
          <Flame className="w-3 h-3 fill-current text-amber-400" />
          Featured Release
        </span>
        <span className="text-slate-200">
          Construction Calculator Pro (3 Workbooks, 31 Tabs, 13 Civil Guides) is live at 75% OFF.
        </span>
        <Link
          href="/p/construction-calculator-pro"
          className="inline-flex items-center gap-1 text-amber-400 font-bold hover:text-amber-300 underline underline-offset-2 ml-1 cursor-pointer transition-colors"
        >
          View Construction Pro &rarr;
        </Link>
      </aside>

      {/* 2. MAIN HEADER */}
      <Header isFocusMode={false} />

      <main className="flex-1">
        {/* 3. HERO SECTION */}
        <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-slate-200/80 bg-white">
          {/* Subtle Grid & Gradient Atmosphere */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a06_1px,transparent_1px),linear-gradient(to_bottom,#0f172a06_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[380px] bg-gradient-to-b from-amber-500/10 via-amber-400/5 to-transparent rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/3 right-10 w-[450px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold mb-6 shadow-2xs hover:border-amber-300 transition-colors">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-600">Thinktools.in</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-900 font-bold">Multi-Niche Digital Tools & Calculators</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-[1.12] max-w-4xl mx-auto">
              Precision Calculators & Toolkits For{" "}
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                High-Stakes Decisions.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Stop rebuilding fragile spreadsheets from scratch. We build verified, production-grade
              Excel engines for construction estimates, real estate, agency profits, and Indian wealth.
            </p>

            {/* Trust Metric Row */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-slate-600 font-medium">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-slate-900">4.92/5</span>
                <span className="text-slate-400">(4,200+ Indian Professionals)</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Subscriptions (Lifetime Access)</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <Lock className="w-4 h-4 text-amber-600" />
                <span>100% Private Offline Files</span>
              </div>
            </div>

            {/* CTA & Search Action Area */}
            <div className="mt-10 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search toolkits: construction, rental yield, agency margin, FIRE..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-1 py-0.5"
                  >
                    Clear
                  </button>
                )}
              </div>
              <a
                href="#catalog"
                className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <span>Browse All</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* 4. FLAGSHIP SPOTLIGHT: CONSTRUCTION CALCULATOR PRO */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-slate-100 to-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl bg-slate-950 text-white overflow-hidden p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-2xl">
              {/* Decorative Background Accents */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left: Product Information & Direct Hook */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-bold tracking-wide">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    <span>FLAGSHIP PRODUCT • CIVIL & RESIDENTIAL CONSTRUCTION</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                    Construction Calculator Pro – India
                  </h2>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                    The complete house estimation and contractor bill auditing engine. Built to CPWD &
                    IS 456 civil standards. Stop contractor overbilling, calculate exact cement, steel,
                    and brick quantities, and audit every running bill before releasing payments.
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <div className="text-xl sm:text-2xl font-black text-amber-400">3</div>
                      <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Workbooks</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <div className="text-xl sm:text-2xl font-black text-amber-400">31</div>
                      <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Connected Tabs</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <div className="text-xl sm:text-2xl font-black text-amber-400">13</div>
                      <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Civil Guides</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <div className="text-xl sm:text-2xl font-black text-amber-400">7</div>
                      <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Pro Bonuses</div>
                    </div>
                  </div>

                  {/* Pricing & CTA Button (Routes directly to existing dedicated landing page) */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <Link
                      id="hero-construction-pro-btn"
                      href="/p/construction-calculator-pro"
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer text-center"
                    >
                      <Sparkles className="w-5 h-5 fill-current" />
                      <span>Explore Construction Pro (₹499)</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>

                    <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-slate-400">
                      <div>
                        <span className="line-through text-slate-500 font-mono">₹1,999</span>{" "}
                        <span className="text-emerald-400 font-bold font-mono text-sm">₹499 (75% OFF)</span>
                      </div>
                      <span className="text-slate-600">•</span>
                      <span>Lifetime Access</span>
                    </div>
                  </div>
                </div>

                {/* Right: Interactive Blueprint Preview Card */}
                <div className="lg:col-span-5">
                  <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                        <span className="text-xs font-mono text-slate-400 ml-2">Construction_Pro_Engine.xlsx</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                        IS 456 Validated
                      </span>
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                      <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex justify-between items-center text-slate-300">
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                          <span>Concrete & BBS Takeoff</span>
                        </span>
                        <span className="text-amber-400 font-bold">Auto-Calculated</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex justify-between items-center text-slate-300">
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                          <span>Brickwork & Plaster Bags</span>
                        </span>
                        <span className="text-amber-400 font-bold">Local Rates</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex justify-between items-center text-slate-300">
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                          <span>Contractor Bill Audit</span>
                        </span>
                        <span className="text-emerald-400 font-bold">Dispute Shield</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex justify-between items-center text-slate-300">
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                          <span>1,500 sq ft 3-BHK Sample</span>
                        </span>
                        <span className="text-blue-400 font-bold">Included</span>
                      </div>
                    </div>

                    <div className="pt-2 text-center">
                      <Link
                        href="/p/construction-calculator-pro"
                        className="text-xs text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>Click here to view full features & 31-tab breakdown</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. MULTI-NICHE TOOL CATALOG GRID */}
        <section id="catalog" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              Digital Toolkit Catalog
            </h2>
            <p className="mt-2 text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Tools Built for Real Work Across Industries
            </p>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Each toolkit is standalone, macro-free, and calibrated with real-world Indian data.
              Click any tool to view details or launch the calculator.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-102"
                    : "bg-white text-slate-600 hover:text-slate-950 border border-slate-200/80 hover:border-slate-300"
                }`}
              >
                {getCategoryIcon(cat.icon)}
                <span>{cat.label}</span>
                {cat.isFlagship && (
                  <span className="text-[10px] bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded font-extrabold">
                    HOT
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-6 font-mono">
            <span>
              Showing {filteredTools.length} toolkits in {selectedCategory === "all" ? "All Niches" : selectedCategory}
            </span>
            {searchQuery && (
              <span className="text-amber-800 font-bold">
                Filtered by: &ldquo;{searchQuery}&rdquo;
              </span>
            )}
          </div>

          {/* Catalog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => {
              const isFlagship = tool.isFlagship;

              return (
                <div
                  key={tool.id}
                  className={`group rounded-2xl bg-white border transition-all duration-300 flex flex-col justify-between overflow-hidden relative ${
                    isFlagship
                      ? "border-amber-400 ring-2 ring-amber-400/20 shadow-lg shadow-amber-500/5 hover:border-amber-500 hover:shadow-xl"
                      : "border-slate-200/90 hover:border-slate-300 hover:shadow-md"
                  }`}
                >
                  {/* Top Header Card Info */}
                  <div className="p-6 space-y-4">
                    {/* Badge & Niche */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                        {tool.categoryLabel}
                      </span>
                      {tool.badge && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isFlagship
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : "bg-slate-100 text-slate-700 border border-slate-200"
                          }`}
                        >
                          {tool.badge}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                        {isFlagship ? (
                          <Link href="/p/construction-calculator-pro" className="hover:underline">
                            {tool.title}
                          </Link>
                        ) : (
                          tool.title
                        )}
                      </h3>
                      <p className="mt-1.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {tool.subtitle}
                      </p>
                    </div>

                    {/* Stats Pill Box */}
                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 py-1 border-y border-slate-100">
                      <span className="font-bold text-slate-800">{tool.workbooksCount} Workbooks</span>
                      <span>•</span>
                      <span>{tool.tabsCount} Tabs</span>
                      <span>•</span>
                      <span>{tool.guideCount} Guides</span>
                    </div>

                    {/* Key Feature Bullets */}
                    <ul className="space-y-2 text-xs text-slate-600">
                      {tool.keyFeatures.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Bottom: Price, Rating & CTA */}
                  <div className="p-6 pt-0 mt-auto space-y-4">
                    {/* Rating & Reviews */}
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <div className="flex text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-current" />
                        </div>
                        <span className="font-bold text-slate-900">{tool.rating}</span>
                        <span className="text-slate-400 font-mono">({tool.reviewCount.toLocaleString()})</span>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {tool.discountPercentage}% OFF
                      </span>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-black text-slate-950 font-mono">
                            ₹{tool.price}
                          </span>
                          <span className="text-xs text-slate-400 line-through font-mono">
                            ₹{tool.originalPrice}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 block">Lifetime license</span>
                      </div>

                      {/* CTA ROUTING LOGIC */}
                      {isFlagship ? (
                        <Link
                          id="catalog-construction-pro-link"
                          href="/p/construction-calculator-pro"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm hover:shadow-md transition-all cursor-pointer"
                        >
                          <span>Open Product Page</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      ) : (
                        <button
                          onClick={() => setSelectedPreviewTool(tool)}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all cursor-pointer"
                        >
                          <span>View Details</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTools.length === 0 && (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
              <Calculator className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900">No toolkits found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for another term or click &ldquo;All Toolkits&rdquo; above.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="mt-4 px-4 py-2 text-xs font-bold text-amber-700 bg-amber-50 rounded-lg hover:bg-amber-100"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* 6. WHY THINKTOOLS (VALUE MATRIX) */}
        <section id="why-us" className="py-16 md:py-20 bg-slate-100/70 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                The Thinktools Philosophy
              </h2>
              <p className="mt-2 text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Why Professionals Choose Us Over Recurring Subscriptions
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
          </div>
        </section>

        {/* 7. COMPARISON TABLE */}
        <section id="comparison" className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              Direct Comparison
            </h2>
            <p className="mt-2 text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              How Thinktools Outperforms Generic Web Tools
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-900 font-bold">
                    <th className="p-4 sm:p-5">Feature</th>
                    <th className="p-4 sm:p-5 text-slate-500 font-medium">Free Internet Templates</th>
                    <th className="p-4 sm:p-5 text-slate-500 font-medium">SaaS Cloud Apps</th>
                    <th className="p-4 sm:p-5 bg-amber-500/10 text-amber-900 font-extrabold border-l border-amber-200">
                      Thinktools.in Pro Toolkits
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {COMPARISON_POINTS.map((pt, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-slate-900">{pt.feature}</td>
                      <td className="p-4 sm:p-5 text-slate-500">{pt.freeWeb}</td>
                      <td className="p-4 sm:p-5 text-slate-500">{pt.saasApps}</td>
                      <td className="p-4 sm:p-5 font-bold text-slate-950 bg-amber-500/5 border-l border-amber-200">
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
        </section>

        {/* 8. FREQUENTLY ASKED QUESTIONS */}
        <section id="faqs" className="py-16 md:py-20 bg-slate-100/60 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                Got Questions?
              </h2>
              <p className="mt-2 text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Frequently Asked Questions
              </p>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-all"
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

        {/* 9. BOTTOM ACTION BANNER */}
        <section className="py-16 bg-slate-950 text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Digital Access</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Ready to Upgrade Your Calculation Workflow?
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
              Start with our bestselling Construction Calculator Pro or explore any of our specialized
              financial and operational workbooks today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/p/construction-calculator-pro"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <span>Check Construction Pro (₹499)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#catalog"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 font-bold text-sm transition-all cursor-pointer"
              >
                <span>View Full Catalog</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 10. PRODUCT DETAIL PREVIEW MODAL (FOR SECONDARY CATALOG ITEMS) */}
      {selectedPreviewTool && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-50">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {selectedPreviewTool.categoryLabel}
                </span>
                <h3 className="text-xl font-black text-slate-950 mt-1.5 leading-snug">
                  {selectedPreviewTool.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{selectedPreviewTool.subtitle}</p>
              </div>
              <button
                onClick={() => setSelectedPreviewTool(null)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">What This Tool Does:</h4>
                <p className="leading-relaxed text-slate-600">{selectedPreviewTool.description}</p>
              </div>

              {/* Package Specs */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-3 gap-2 text-center font-mono">
                <div>
                  <div className="text-base font-black text-slate-900">{selectedPreviewTool.workbooksCount}</div>
                  <div className="text-[10px] text-slate-500 uppercase">Workbooks</div>
                </div>
                <div>
                  <div className="text-base font-black text-slate-900">{selectedPreviewTool.tabsCount}</div>
                  <div className="text-[10px] text-slate-500 uppercase">Sheets/Tabs</div>
                </div>
                <div>
                  <div className="text-base font-black text-slate-900">{selectedPreviewTool.guideCount}</div>
                  <div className="text-[10px] text-slate-500 uppercase">PDF Guides</div>
                </div>
              </div>

              {/* Solved Problems */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs mb-2">Key Highlights & Features:</h4>
                <ul className="space-y-1.5">
                  {selectedPreviewTool.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Target Audience */}
              <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200 text-amber-900 text-[11px]">
                <strong className="block font-bold">Engineered For:</strong>
                {selectedPreviewTool.targetAudience}
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-black text-slate-950 font-mono">
                    ₹{selectedPreviewTool.price}
                  </span>
                  <span className="text-xs text-slate-400 line-through font-mono">
                    ₹{selectedPreviewTool.originalPrice}
                  </span>
                </div>
                <span className="text-[10px] text-emerald-700 font-bold">Lifetime Access</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedPreviewTool(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 cursor-pointer"
                >
                  Close
                </button>
                <Link
                  href="/p/construction-calculator-pro"
                  onClick={() => setSelectedPreviewTool(null)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 cursor-pointer"
                >
                  View Featured Store Item &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 11. GLOBAL FOOTER */}
      <Footer />
    </div>
  );
}
