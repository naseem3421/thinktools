"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  Star,
  FileSpreadsheet,
  Download,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  Building2,
  Calculator,
  Laptop,
  FileText,
  Clock,
  ShieldAlert,
  Search,
  CheckCircle2,
  AlertTriangle,
  FolderTree,
  Sliders,
  DollarSign,
  ChevronDown,
  X,
  Award,
  Layers,
  HelpCircle,
  BadgeCheck,
  FileCheck,
  BookOpen,
  XCircle,
  Smartphone,
  Quote,
  Flame,
  Check
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalculatorGallery from "@/components/CalculatorGallery";
import CheckoutModal from "@/components/CheckoutModal";

export default function ConstructionCalculatorPage() {
  const product = PRODUCTS["construction-calculator-pro"];
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSheetModalOpen, setIsSheetModalOpen] = useState(false);
  const [sheetModalSearch, setSheetModalSearch] = useState("");

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const filteredSheets = product.workbookSheets.filter(
    (s) =>
      !sheetModalSearch ||
      s.name.toLowerCase().includes(sheetModalSearch.toLowerCase()) ||
      s.description.toLowerCase().includes(sheetModalSearch.toLowerCase()) ||
      s.part.toLowerCase().includes(sheetModalSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-amber-500 selection:text-slate-950 font-sans">
      {/* Focused Navigation Header */}
      <Header
        isFocusMode={true}
        productTitle={product.title}
        price={product.price}
        onCtaClick={() => setIsCheckoutOpen(true)}
      />

      {/* Top Urgency & Delivery Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 py-1.5 sm:py-2 px-3 sm:px-4 text-center text-[10px] sm:text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 sm:gap-2 shadow-xs">
        <Flame className="w-3.5 h-3.5 fill-current animate-bounce shrink-0" />
        <span className="leading-tight">
          LIMITED LAUNCH DEAL: ₹499 (75% OFF) • INSTANT ACCESS ON WHATSAPP & EMAIL • ALL SALES FINAL
        </span>
      </div>

      <main className="flex-1 pb-20 sm:pb-0">
        {/* 1. HERO SECTION: DIRECT-RESPONSE VALUE HOOK */}
        <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 md:pt-16 md:pb-20 overflow-hidden bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:32px_32px]">
          <div className="absolute top-1/4 left-1/3 w-[300px] sm:w-[500px] h-[250px] sm:h-[350px] bg-amber-500/10 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[250px] sm:w-[400px] h-[200px] sm:h-[300px] bg-blue-500/5 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Emotion, Logic & Pricing Hook */}
              <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-center lg:text-left">
                {/* Social Proof Pill */}
                <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-[11px] sm:text-xs text-slate-700 shadow-2xs">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-slate-900">4.94/5</span>
                  <span className="text-slate-300 hidden sm:inline">•</span>
                  <span className="text-amber-800 font-semibold text-center sm:text-left">
                    2,840+ Homeowners, Renovators, Builders & Contractors
                  </span>
                </div>

                {/* Primary Headline */}
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.14]">
                  Plan, Price & Build with Precision.{" "}
                  <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent block mt-1 text-xl sm:text-3xl lg:text-4xl">
                    For Homeowners, Renovators, Builders & Contractors.
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  The complete construction and renovation spreadsheet system for India. Enter room sizes in Feet or Metres to instantly calculate exact cement, steel, sand, bricks, and paint — whether you&apos;re building a home, renovating a flat, managing project budgets, or quoting clients.
                </p>

                {/* 4 Consumer Profiles Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-semibold text-slate-700">
                  <div className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 flex items-center justify-center sm:justify-start gap-1.5 shadow-2xs">
                    <span className="text-amber-600">🏡</span>
                    <span>Homeowners</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 flex items-center justify-center sm:justify-start gap-1.5 shadow-2xs">
                    <span className="text-amber-600">🔨</span>
                    <span>Renovators</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 flex items-center justify-center sm:justify-start gap-1.5 shadow-2xs">
                    <span className="text-amber-600">🏗️</span>
                    <span>Builders</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 flex items-center justify-center sm:justify-start gap-1.5 shadow-2xs">
                    <span className="text-amber-600">📐</span>
                    <span>Contractors</span>
                  </div>
                </div>

                {/* Micro-Value Guarantee Pill */}
                <div className="inline-flex items-start sm:items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] sm:text-xs text-emerald-900 font-semibold text-left">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
                  <span>Cost of 1 cement bag (₹499) prevents costly material wastage & estimating errors</span>
                </div>

                {/* Action CTA Group */}
                <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-4">
                  <button
                    id="btn-hero-cta"
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-amber-500/25 transition-all hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Get Instant Access (₹{product.price})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="#calculator-gallery"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-xs sm:text-sm shadow-xs transition-all"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <span>Inspect 8 Real Screenshots</span>
                  </a>
                </div>

                {/* Trust Signals (Addressing Indian Purchase Hesitations) */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4 text-[10px] sm:text-[11px] text-slate-500 pt-1 text-left">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Smartphone className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Instant WhatsApp Delivery
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Laptop className="w-3.5 h-3.5 text-blue-600 shrink-0" /> Works on Excel & Google Sheets
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Sliders className="w-3.5 h-3.5 text-amber-600 shrink-0" /> Feet/Inches & Metres Toggle
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> No Refunds · All Sales Final
                  </span>
                </div>
              </div>

              {/* Right Column: Authentic Calculator Gallery */}
              <div className="lg:col-span-6 flex flex-col items-center">
                <div className="w-full">
                  <div className="mb-2 flex items-center justify-between text-xs text-slate-500 px-1">
                    <span className="font-semibold text-amber-800 flex items-center gap-1.5 text-xs">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      Calculator Gallery
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-slate-400">Click tabs to inspect worksheets</span>
                  </div>

                  <CalculatorGallery onUnlockClick={() => setIsCheckoutOpen(true)} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. THE INDIAN REALITY: WITHOUT THINKTOOLS VS WITH THINKTOOLS (Side-by-Side Contrast) */}
        <section className="py-10 sm:py-16 max-w-6xl mx-auto px-3.5 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              The Reality of Building in India
            </span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 mt-2 sm:mt-3">
              Why 84% of Indian Homeowners Overpay
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1.5 sm:mt-2">
              Building or renovating a home costs ₹10 Lakhs to ₹5 Crs+. Here is the costly difference between guessing and auditing:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 items-stretch">
            {/* The Old Risky Way (Without Thinktools) */}
            <div className="bg-rose-50/50 border-2 border-rose-200 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-rose-100 border border-rose-300 text-rose-700 flex items-center justify-center font-bold shrink-0">
                    <XCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">Without Thinktools</h3>
                    <span className="text-xs text-rose-700 font-semibold font-mono">The Contractor Trap</span>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <span className="text-rose-600 font-bold mt-0.5 shrink-0">✕</span>
                    <span><strong>Vague rough quotes:</strong> Contractor quotes ₹1,700/sq.ft that balloons to ₹2,300/sq.ft midway through.</span>
                  </div>
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <span className="text-rose-600 font-bold mt-0.5 shrink-0">✕</span>
                    <span><strong>Blind material bills:</strong> Contractor claims 100 extra cement bags & 500 kg extra steel — you pay out of fear.</span>
                  </div>
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <span className="text-rose-600 font-bold mt-0.5 shrink-0">✕</span>
                    <span><strong>Measurement tricks:</strong> Overcharging plastering & tile areas by not deducting window & door cutouts.</span>
                  </div>
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <span className="text-rose-600 font-bold mt-0.5 shrink-0">✕</span>
                    <span><strong>Surprise handover bills:</strong> Contractor hits you with a ₹2 Lakh to ₹5 Lakh variation bill right before Grihapravesham.</span>
                  </div>
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <span className="text-rose-600 font-bold mt-0.5 shrink-0">✕</span>
                    <span><strong>Result:</strong> Budget overshoots by 20% to 35% (losing ₹3,00,000 to ₹8,00,000+).</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-rose-200/80 text-xs font-bold text-rose-800 text-center">
                Average Loss: ₹1,50,000 to ₹4,00,000 on site
              </div>
            </div>

            {/* The Smart Way (With Thinktools) */}
            <div className="bg-emerald-50/50 border-2 border-emerald-300 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 flex flex-col justify-between shadow-lg relative">
              <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 bg-emerald-600 text-white font-bold text-[9px] sm:text-[10px] uppercase px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full">
                Full Peace of Mind
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">With Thinktools Pro (₹499)</h3>
                    <span className="text-xs text-emerald-800 font-semibold font-mono">Total Rupee Control</span>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                    <span><strong>Pre-signed itemized BOQ:</strong> Exact line-by-line quantities of steel, cement, sand and tiles before signing.</span>
                  </div>
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                    <span><strong>Automated 5% red alert:</strong> Tab 25 (Bill Check) catches contractor overbilling instantly using civil engineering norms.</span>
                  </div>
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                    <span><strong>Precise deduction math:</strong> Door and window openings are automatically deducted from plaster & paint areas.</span>
                  </div>
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                    <span><strong>Binding change orders:</strong> No extra work begins on site without mutually approved rates upfront.</span>
                  </div>
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                    <span><strong>Result:</strong> Zero financial surprises. You stay 100% on budget.</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-emerald-200/80 text-xs font-bold text-emerald-900 text-center">
                Documented Savings: ₹42,000 to ₹85,000 on average build
              </div>
            </div>
          </div>
        </section>

        {/* 4. THE "PAISA VASOOL" REALITY CHECK (EXTREME INDIAN VALUE ANCHOR) */}
        <section className="py-8 sm:py-12 bg-amber-500/10 border-y border-amber-200/80">
          <div className="max-w-5xl mx-auto px-3.5 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
              <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider text-amber-900 bg-amber-200/80 border border-amber-300 px-3 py-1 rounded-full">
                Paisa Vasool Math
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-950 mt-2">
                Why ₹499 is Less Than 0.02% of Your Build
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 text-center">
              <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-[11px] sm:text-xs text-slate-500 block">1 Cement Bag</span>
                <span className="text-base sm:text-xl font-black text-slate-900 font-mono">₹420 – ₹440</span>
                <span className="text-[10px] sm:text-[11px] text-slate-400 block mt-0.5 sm:mt-1">Used up in 20 min</span>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-[11px] sm:text-xs text-slate-500 block">1 Family Dinner</span>
                <span className="text-base sm:text-xl font-black text-slate-900 font-mono">₹800 – ₹1,200</span>
                <span className="text-[10px] sm:text-[11px] text-slate-400 block mt-0.5 sm:mt-1">Gone in 1 evening</span>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-[11px] sm:text-xs text-slate-500 block">1 Day Supervisor</span>
                <span className="text-base sm:text-xl font-black text-slate-900 font-mono">₹1,000 – ₹1,500</span>
                <span className="text-[10px] sm:text-[11px] text-slate-400 block mt-0.5 sm:mt-1">Daily recurring cost</span>
              </div>
              <div className="bg-amber-500 text-slate-950 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-amber-400 shadow-md">
                <span className="text-[11px] sm:text-xs font-bold block">Thinktools Pro</span>
                <span className="text-base sm:text-xl font-black font-mono">₹499 (Lifetime)</span>
                <span className="text-[10px] sm:text-[11px] font-bold block mt-0.5 sm:mt-1">Protects ₹25L–₹75L</span>
              </div>
            </div>

            <p className="text-center text-xs sm:text-sm text-slate-700 mt-5 sm:mt-6 max-w-2xl mx-auto leading-relaxed">
              💡 <strong>The bottom line:</strong> If this spreadsheet catches just <strong>10 extra bags of cement</strong> or <strong>50 kg of steel</strong> overbilling on your site, it has already paid for itself 10x over on day one.
            </p>
          </div>
        </section>

        {/* 5. THE COMPLETE BUNDLE BOX: WHAT YOU RECEIVE FOR ₹499 */}
        <section className="py-10 sm:py-16 bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-3.5 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
              <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                Everything Included In The ₹499 Bundle
              </span>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 mt-2 sm:mt-3">
                Complete Construction Toolkit Box
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1.5 sm:mt-2">
                No incomplete spreadsheets or locked formulas. You get the blank engine, finished examples, printable forms, and negotiation tools in one instant download:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Deliverable 1: 3 Excel Workbooks */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                      3 Excel Files (.XLSX)
                    </span>
                    <span className="text-xs text-amber-700 font-semibold font-mono">Core Engines</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">3 Specialized Workbooks (31 Tabs)</h3>
                  <div className="mt-3 space-y-2 text-xs text-slate-600">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Blank Master Engine:</strong> Clean 31-tab file for your new house build.</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Chennai 3BHK Example:</strong> 1,500 sq ft pre-filled project with sample rates & bills.</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Flat Renovation Example:</strong> 1,000 sq ft apartment non-structural remodel.</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSheetModalOpen(true)}
                  className="mt-5 w-full py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5 text-amber-600" />
                  <span>Inspect All 31 Sheet Names &rarr;</span>
                </button>
              </div>

              {/* Deliverable 2: 13 PDF Implementation Documents */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-blue-800 bg-blue-100/70 border border-blue-200 px-2 py-0.5 rounded font-bold">
                      13 PDF Guides & Kits
                    </span>
                    <span className="text-xs text-blue-700 font-semibold font-mono">Execution Plan</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">Implementation Kit & Worksheets</h3>
                  <div className="mt-3 space-y-2 text-xs text-slate-600">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>4-Week Action Plan:</strong> Weekly checklists from plot measurements to signed estimate.</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>Printable Worksheets A–F:</strong> Take dual readings on site before typing into Excel.</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>5 Exercises with Answers:</strong> Practice catching 13.6% overclaims and quote traps.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200 text-[11px] text-slate-500 font-mono">
                  Includes 43-page combined master guide
                </div>
              </div>

              {/* Deliverable 3: 7 Anti-Fear Bonuses */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-amber-800 bg-amber-100/70 border border-amber-200 px-2 py-0.5 rounded font-bold">
                      7 Bonus Guides
                    </span>
                    <span className="text-xs text-amber-800 font-semibold font-mono">100% Free</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">7 Contractor & Quality Bonuses</h3>
                  <div className="mt-3 space-y-2 text-xs text-slate-600">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>Contractor Hiring Kit:</strong> 15 interview questions & numerical scoring sheet.</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>Site Material Quality Tests:</strong> Silt jar test for sand, cement week check, rebar ISI test.</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>Snag List & 5 Scripts:</strong> 120-checkpoint final walkthrough & WhatsApp negotiation scripts.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200 text-[11px] text-emerald-700 font-bold flex items-center justify-between">
                  <span>Regular Value: ₹1,500</span>
                  <span>Included FREE</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. VERIFIED INDIAN HOMEOWNER & CONTRACTOR REVIEWS (SOCIAL PROOF ACROSS CITIES) */}
        <section className="py-10 sm:py-16 max-w-6xl mx-auto px-3.5 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              Real Experiences Across India
            </span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 mt-2 sm:mt-3">
              Trusted by 2,840+ Indian Builders
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1.5 sm:mt-2">
              Here is what happened when homeowners and contractors used Thinktools on their live sites:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Review 1: Coimbatore */}
            <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-mono">
                    Saved ₹42,000
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;Caught a ₹42,000 TMT steel billing error in our G+1 villa slab. The contractor claimed 4.2 tonnes, but Tab 09 showed 3.65 tonnes was the true requirement with wastage. When I showed him the theoretical consumption, he backed off and adjusted the bill immediately.&rdquo;
                </p>
              </div>
              <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-slate-900 block font-semibold">Rajesh K.</strong>
                  <span className="text-slate-500 text-[11px]">Homeowner, Coimbatore (Tamil Nadu)</span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-slate-400">Verified Buyer</span>
              </div>
            </div>

            {/* Review 2: Pune */}
            <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-mono">
                    Saved ₹38,000
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;During our 3BHK flat interior renovation, the painting contractor quoted ₹1.4 Lakhs. Tab 06 calculated the exact net wall area minus window and door deductions and proved 78 litres of paint was plenty. Settled for ₹1.02 Lakhs. Best ₹499 ever spent.&rdquo;
                </p>
              </div>
              <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-slate-900 block font-semibold">Anand Kulkarni</strong>
                  <span className="text-slate-500 text-[11px]">IT Professional, Pune (Maharashtra)</span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-slate-400">Verified Buyer</span>
              </div>
            </div>

            {/* Review 3: Bengaluru */}
            <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-mono">
                    Saved ₹54,000
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;We were terrified of building our own house in Sarjapur because contractors are infamous for sudden cost overruns. This toolkit gave us complete control over cement, sand, and brick orders. The stage budget tracker kept our spending exactly on target.&rdquo;
                </p>
              </div>
              <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-slate-900 block font-semibold">Pooja & Vikram Sharma</strong>
                  <span className="text-slate-500 text-[11px]">Owner-Builders, Bengaluru (Karnataka)</span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-slate-400">Verified Buyer</span>
              </div>
            </div>

            {/* Review 4: Lucknow (Contractor) */}
            <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-mono">
                    Won 4 New Contracts
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;As a small civil contractor, Tab 30 (Quotation) gives my clients an instant professional impression. I present transparent line items and milestone schedules with GST breakdown. Clients trust me immediately and sign contracts much faster.&rdquo;
                </p>
              </div>
              <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-slate-900 block font-semibold">Er. Sunil Verma</strong>
                  <span className="text-slate-500 text-[11px]">Civil Contractor, Lucknow (Uttar Pradesh)</span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-slate-400">Verified Buyer</span>
              </div>
            </div>
          </div>
        </section>

        {/* 7. PRICING & GUARANTEE: IRRESISTIBLE INDIAN VALUE PROPOSITION */}
        <section className="py-10 sm:py-16 max-w-3xl mx-auto px-3.5 sm:px-6">
          <div className="rounded-2xl sm:rounded-3xl bg-white border-2 border-amber-400 p-5 sm:p-8 md:p-10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-black text-[10px] sm:text-xs uppercase px-3 sm:px-4 py-1 sm:py-1.5 rounded-bl-xl sm:rounded-bl-2xl">
              Limited Launch Deal (75% OFF)
            </div>

            <div className="text-center pb-5 sm:pb-6 border-b border-slate-200">
              <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-slate-500 block">
                Lifetime License • Instant Download • Zero Subscriptions
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-950 mt-1">
                Construction Calculator Pro Package
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 sm:mt-2">
                3 Excel Workbooks (31 Connected Tabs) + 13 PDF Guides + 7 Bonuses
              </p>

              <div className="mt-5 sm:mt-6 flex items-baseline justify-center gap-2.5 sm:gap-3">
                <span className="text-slate-400 text-base sm:text-lg line-through">₹{product.originalPrice}</span>
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 font-mono">
                  ₹{product.price}
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md">
                  Save ₹1,500 Today
                </span>
              </div>
            </div>

            <div className="py-5 sm:py-6 space-y-2.5 sm:space-y-3">
              {[
                "3 Excel Workbooks (.xlsx): Blank Master, Chennai 3BHK Example, Flat Renovation",
                "31 Connected Tabs with Dual Units Toggle (Feet/Inches & Metres)",
                "Contractor Bill Check with Automated 5% Overclaim Warning Flag",
                "Exact Procurement Order List with Wastage Allowances & Lead Times",
                "13 PDF Guides including 4-Week Action Plan and Printable Site Worksheets",
                "7 Anti-Fear Bonuses: Contractor Hiring Kit, Site Quality Checks, Snag List & 5 Scripts"
              ].map((highlight, idx) => (
                <div key={idx} className="flex items-start sm:items-center gap-2 sm:gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            {/* Indian Value Comparison Callout */}
            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 leading-relaxed mb-5 sm:mb-6">
              <strong>💡 Why pay ₹499?</strong> In house construction, a single contractor error on just 10 bags of cement or 50 kg of steel costs over <strong>₹4,500</strong>. This ₹499 toolkit pays for itself 10x over on your very first material delivery truck.
            </div>

            <button
              id="btn-pricing-cta"
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full py-3.5 sm:py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Get Full Package Now (Pay ₹{product.price})</span>
            </button>

            {/* Payment Trust Badges (UPI, GPay, PhonePe, Cards) */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-slate-500 font-medium">
              <span className="text-slate-600 font-semibold">Accepted Payments:</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-bold text-slate-800">GPay</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-bold text-purple-800">PhonePe</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-bold text-sky-800">Paytm</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-bold text-emerald-800">BHIM UPI</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-bold text-blue-800">RuPay / Cards</span>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-6 text-xs text-slate-500 text-center sm:text-left">
              <span className="flex items-center gap-1 font-semibold text-emerald-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                All Sales Final · 100% Delivery Support
              </span>
              <span className="flex items-center gap-1 font-semibold text-amber-700">
                <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                Instant Delivery (WhatsApp & Email)
              </span>
            </div>
          </div>
        </section>

        {/* 8. TOP 5 OBJECTION-BUSTING FAQS */}
        <section className="py-10 sm:py-16 max-w-3xl mx-auto px-3.5 sm:px-6">
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              Zero Confusion
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-950 mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {[
              {
                q: "I don't have civil engineering or advanced Excel skills. Can I use this?",
                a: "100% Yes! You don't need any technical background. All complex civil engineering formulas (RCC mix ratios, steel bar weights, mortar coverage) are pre-coded. You simply enter basic room dimensions in Feet or Metres. If you can use WhatsApp and type basic numbers, you can easily use this toolkit."
              },
              {
                q: "Can I open this on Microsoft Excel, Google Sheets, or mobile?",
                a: "Yes! The workbooks are pure .xlsx format with standard formulas (no tricky macros or passwords). You can open them on Microsoft Excel (2016 to 365 on Windows & Mac), Google Sheets on your phone or laptop browser, and mobile Excel apps."
              },
              {
                q: "Where do I receive the files after paying ₹499?",
                a: "You get an instant download button right on your screen immediately after payment. Additionally, a direct download link is sent to your WhatsApp number and Email inbox within 5 seconds so you can save and access it anytime."
              },
              {
                q: "Does this work for flat, apartment, or room renovations?",
                a: "Yes! You get a dedicated workbook: 'Construction_Calculator_Pro_EXAMPLE_renovation.xlsx' specifically built for non-structural upgrades (kitchen remodel, bathroom tiling, floor retiling, wall painting, and electrical points) without overwhelming you with foundation sheets."
              },
              {
                q: "What if I measure in Feet & Inches instead of Metres?",
                a: "The workbook has a 1-click unit toggle in Sheet #3 (Setup). Switch between Feet/Inches (Indian residential standard) and Metres anytime. All area, volume, brick, and paint formulas automatically recalculate."
              },
              {
                q: "How does the 'Bill Check' tab catch contractor overcharges?",
                a: "When a contractor hands you an invoice claiming quantities (e.g., '140 bags of cement used'), you type their claim into Tab 25. It compares their claim against standard civil engineering consumption norms. If the claim is more than 5% over, it automatically highlights in RED so you can demand the measurement sheet before releasing funds."
              },
              {
                q: "What is your cancellation & refund policy?",
                a: "We do not provide refunds. All sales are strictly final. Because Thinktools packages are digital goods (unlocked Microsoft Excel spreadsheets and PDF guides) delivered immediately upon payment, access cannot be cancelled or revoked once delivered. Please inspect our Calculator Gallery screenshots and full 31-sheet breakdown before buying. If you encounter any technical delivery issue or duplicate charge, our support team will promptly assist or rectify it."
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-3.5 sm:p-5 text-left font-semibold text-xs sm:text-sm md:text-base text-slate-900 flex items-center justify-between gap-3 sm:gap-4 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                      openFaq === idx ? "rotate-180 text-amber-600" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-3.5 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/70">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* MOBILE STICKY BOTTOM BAR (Ensures Frictionless Instant Buy on Phones) */}
      <div className="fixed bottom-0 inset-x-0 z-30 p-2.5 sm:p-3 pb-[max(0.65rem,env(safe-area-inset-bottom))] bg-white/95 backdrop-blur-md border-t border-slate-200 sm:hidden flex items-center justify-between gap-2.5 sm:gap-3 shadow-lg">
        <div>
          <span className="text-[10px] text-slate-500 block font-medium">3 Workbooks · 31 Tabs</span>
          <div className="flex items-center gap-1.5">
            <span className="text-base font-black text-slate-900 font-mono">₹{product.price}</span>
            <span className="text-[11px] text-slate-400 line-through">₹{product.originalPrice}</span>
          </div>
        </div>

        <button
          onClick={() => setIsCheckoutOpen(true)}
          className="flex-1 py-2.5 px-3.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
        >
          <span>Get Package Now (₹499)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <Footer />

      {/* Checkout Drawer / Modal */}
      <CheckoutModal
        product={product}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* CLEAN MODAL FOR 31-TAB DETAILED INSPECTION (Keeps Landing Page Fast & Short) */}
      {isSheetModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setIsSheetModalOpen(false)}
        >
          <div
            className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[88vh] overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[10px] sm:text-xs uppercase font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 sm:px-2.5 py-0.5 rounded">
                  All 31 Connected Tabs
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-950 mt-1 truncate">
                  Complete Workbook Architecture Index
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSheetModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Search */}
            <div className="p-3 sm:p-4 border-b border-slate-100 bg-slate-50">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search any tab (e.g. steel, concrete, bill, tiles)..."
                  value={sheetModalSearch}
                  onChange={(e) => setSheetModalSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-base sm:text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Modal Sheet List */}
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-2.5 sm:space-y-3">
              {filteredSheets.map((sheet) => (
                <div
                  key={sheet.number}
                  className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-[10px]">
                        Tab {sheet.number < 10 ? `0${sheet.number}` : sheet.number}
                      </span>
                      <strong className="text-slate-900 text-xs sm:text-sm">{sheet.name}</strong>
                      <span className="text-[10px] text-slate-500 font-mono">({sheet.part})</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs">{sheet.description}</p>
                  </div>
                  <div className="text-[10px] sm:text-[11px] sm:text-right shrink-0 font-mono text-slate-500">
                    <div><span className="text-amber-800 font-bold">Input:</span> {sheet.userEnters}</div>
                    <div><span className="text-emerald-700 font-bold">Output:</span> {sheet.userGets}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer CTA */}
            <div className="p-3 sm:p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-2">
              <span className="text-[11px] sm:text-xs text-slate-600 font-mono">
                31 connected sheets
              </span>
              <button
                onClick={() => {
                  setIsSheetModalOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 cursor-pointer whitespace-nowrap"
              >
                Download Package (₹499)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
