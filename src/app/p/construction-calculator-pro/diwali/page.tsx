"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  CheckCircle,
  FileSpreadsheet,
  Download,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  Laptop,
  Search,
  CheckCircle2,
  Sliders,
  ChevronDown,
  X,
  Award,
  Layers,
  XCircle,
  Mail,
  Check,
  PackageCheck,
  ShieldAlert
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalculatorGallery from "@/components/CalculatorGallery";
import dynamic from "next/dynamic";
import { trackEvent } from "@/components/TrackingScripts";

const CheckoutModal = dynamic(() => import("@/components/CheckoutModal"), {
  ssr: false,
});

export default function DiwaliConstructionCalculatorPage() {
  const product = PRODUCTS["construction-calculator-pro-diwali"] || {
    ...PRODUCTS["construction-calculator-pro"],
    id: "prod_const_india_diwali_299",
    slug: "construction-calculator-pro-diwali",
    title: "CONSTRUCTION CALCULATOR PRO – DIWALI SPECIAL",
    price: 299,
    originalPrice: 999,
  };

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSheetModalOpen, setIsSheetModalOpen] = useState(false);
  const [sheetModalSearch, setSheetModalSearch] = useState("");

  const hasTrackedViewContent = useRef(false);
  useEffect(() => {
    if (hasTrackedViewContent.current) return;
    hasTrackedViewContent.current = true;

    trackEvent("ViewContent", {
      content_name: product.title,
      content_ids: [product.id],
      content_type: "product",
      value: product.price,
      currency: "INR",
    });
  }, [product.title, product.id, product.price]);

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
        productTitle="Construction Calculator Pro (Diwali Offer)"
        price={product.price}
        onCtaClick={() => setIsCheckoutOpen(true)}
      />

      {/* Top Delivery & Diwali Festive Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-slate-950 py-2 px-3 sm:px-4 text-center text-[10px] sm:text-xs font-black tracking-wide flex items-center justify-center gap-1.5 sm:gap-2 shadow-xs border-b border-amber-400">
        <Sparkles className="w-3.5 h-3.5 fill-current shrink-0" />
        <span className="leading-tight">
          🪔 DIWALI SPECIAL OFFER: ₹299/- ONLY (LIMITED TIME FESTIVE SALE) • INSTANT ON-SCREEN DOWNLOAD + EMAIL ATTACHMENT • 100% UNLOCKED EXCEL
        </span>
      </div>

      <main className="flex-1 pb-20 sm:pb-0">
        {/* 1. HERO SECTION: DIRECT-RESPONSE VALUE HOOK */}
        <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 md:pt-16 md:pb-20 overflow-hidden bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:32px_32px]">
          <div className="absolute top-1/4 left-1/3 w-[300px] sm:w-[500px] h-[250px] sm:h-[350px] bg-amber-500/15 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[250px] sm:w-[400px] h-[200px] sm:h-[300px] bg-orange-500/10 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Emotion, Logic & Pricing Hook */}
              <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-center lg:text-left">
                {/* Diwali Festive Urgency Pill */}
                <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-yellow-500/15 border border-amber-400/60 text-[11px] sm:text-xs text-amber-950 font-bold shadow-2xs">
                  <span className="text-sm">🪔</span>
                  <span className="font-extrabold uppercase tracking-wide text-amber-900">Diwali Special Offer</span>
                  <span className="text-amber-400">•</span>
                  <span className="text-amber-800 font-semibold">Limited Time Festive Discount</span>
                </div>

                {/* Primary Headline */}
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.14]">
                  Never Overpay for Construction or Renovation Again.{" "}
                  <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent block mt-1 text-xl sm:text-3xl lg:text-4xl">
                    Accurate Material Estimates & Budget Control in Minutes.
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  <strong className="text-slate-900 font-semibold block mb-1">
                    Built for Homeowners, Renovation Owners & Small Contractors Across India.
                  </strong>
                  Calculate exact quantities of cement, steel, sand, and tiles before work begins. Audit contractor running bills, catch 5%+ quantity inflations, and keep your project on budget with zero engineering experience required.
                </p>

                {/* 3 Focused Use Cases for Target Audiences */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 text-left pt-1">
                  <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 sm:p-3 shadow-2xs hover:border-amber-300 transition-all">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                      <span className="text-sm">🏡</span>
                      <span>New Home Builders</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                      Estimate exact cement, steel & brick requirements. Check contractor claims before paying bills.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 sm:p-3 shadow-2xs hover:border-amber-300 transition-all">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                      <span className="text-sm">🔨</span>
                      <span>House & Flat Renovators</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                      Includes flat renovation workbook for floor retiling, bathroom remodel, paint & electrical points.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 sm:p-3 shadow-2xs hover:border-amber-300 transition-all">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                      <span className="text-sm">📐</span>
                      <span>Small Builders & Civil Engs</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                      Generate itemized client quotes, order materials with exact wastage & prevent billing disputes.
                    </p>
                  </div>
                </div>

                {/* Price Anchor Block */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-1">
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <span className="text-base sm:text-xl font-bold text-slate-400 line-through">
                      ₹999
                    </span>
                    <span className="text-3xl sm:text-4xl font-black text-amber-600 font-mono">
                      ₹{product.price}/-
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200 font-black text-[10px] sm:text-xs uppercase tracking-wide">
                      70% OFF DIWALI DEAL
                    </span>
                  </div>
                </div>

                {/* Micro-Value Pill */}
                <div className="inline-flex items-start sm:items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] sm:text-xs text-amber-900 font-semibold text-left">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
                  <span>Diwali Special Price of ₹299/- includes all 3 workbooks, 31 sheets & 13 PDF guides</span>
                </div>

                {/* Action CTA Group (Single Primary Button) */}
                <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-4">
                  <button
                    id="btn-hero-cta"
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-amber-500/25 transition-all hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Claim Diwali Offer (₹{product.price})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* UPI & Instant Payment Strip */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-0.5">
                  <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Instant Unlock with UPI:
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-bold text-slate-700 shadow-2xs">
                      GPay
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-bold text-purple-700 shadow-2xs">
                      PhonePe
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-bold text-sky-700 shadow-2xs">
                      Paytm
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-bold text-emerald-700 shadow-2xs">
                      BHIM
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      + Cards & NetBanking
                    </span>
                  </div>
                </div>

                {/* Trust Signals */}
                <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:flex sm:flex-wrap items-start sm:items-center justify-center lg:justify-start gap-2 sm:gap-4 text-[10px] sm:text-[11px] text-slate-500 pt-1 text-left">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Mail className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Instant Email Delivery (Files Attached)
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Laptop className="w-3.5 h-3.5 text-blue-600 shrink-0" /> Built for Microsoft Excel (Windows & Mac)
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Sliders className="w-3.5 h-3.5 text-amber-600 shrink-0" /> Feet/Inches & Metres Toggle
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Instant Digital Delivery · Dedicated Support
                  </span>
                </div>
              </div>

              {/* Right Column: Authentic Calculator Gallery */}
              <div className="lg:col-span-6 flex flex-col items-center">
                <div className="w-full">
                  <div className="mb-2 flex items-center justify-between text-xs text-slate-500 px-1">
                    <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                      <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                      Live Screenshot Walkthrough
                    </span>
                    <span className="text-[11px] bg-slate-100 px-2 py-0.5 rounded font-mono text-slate-600">
                      High Resolution
                    </span>
                  </div>
                  <CalculatorGallery />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PROOF & VERIFIED DELIVERABLES */}
        <section className="py-10 sm:py-14 bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <span className="text-[10px] sm:text-xs font-bold font-mono tracking-widest uppercase text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block mb-2">
                Pure Formula Transparency • Zero Macros • Zero Locked Cells
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                Inspect All 31 Linked Calculation Sheets Before You Purchase
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Click any tab below to review the exact inputs, formulas, and CPWD standards pre-engineered into your Excel suite.
              </p>
            </div>

            {/* Quick interactive sheet catalog preview button */}
            <div className="text-center mb-6">
              <button
                type="button"
                onClick={() => setIsSheetModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span>Search & Inspect All 31 Sheet Specs (Free Modal Preview)</span>
              </button>
            </div>

            {/* Interactive Sheet Browser Grid Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                {
                  tab: "Tab 03",
                  name: "Setup & Units",
                  role: "Units Toggle (Feet/Inches vs Metres), project dimensions, and global wastage parameters.",
                  tag: "Global Engine"
                },
                {
                  tab: "Tab 07",
                  name: "RCC Slab & Beams",
                  role: "Exact M20/M25 concrete mix design, cement bags, sand brass, and aggregate calculations.",
                  tag: "Structural RCC"
                },
                {
                  tab: "Tab 09",
                  name: "Steel BBS Schedule",
                  role: "IS 1786 bar bending schedule (8mm to 25mm), cutting lengths, and d²/162 weight formula.",
                  tag: "Steel Control"
                },
                {
                  tab: "Tab 12",
                  name: "Masonry / Bricks",
                  role: "Standard modular red clay bricks & AAC blocks, mortar mix ratios with deduction for openings.",
                  tag: "Wall Enclosure"
                },
                {
                  tab: "Tab 15",
                  name: "Plaster & Wall Care",
                  role: "Internal 12mm & external 18mm double-coat cement plaster with dry volume 1.33 multiplier.",
                  tag: "Finishing"
                },
                {
                  tab: "Tab 16",
                  name: "Flooring & Tiles",
                  role: "Vitrified tiles, anti-skid bathroom tiles, skirting allowances, and cement adhesive mortar bed.",
                  tag: "Flooring"
                },
                {
                  tab: "Tab 20",
                  name: "Rates & Master BOQ",
                  role: "Enter your local supplier rates once; all 31 sheets and client quote summary update in real time.",
                  tag: "Rate Matrix"
                },
                {
                  tab: "Tab 25",
                  name: "Contractor Bill Audit",
                  role: "Audit contractor running bills against engineering estimates. Highlights any 5%+ claim inflation.",
                  tag: "Dispute Stopper"
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 hover:border-amber-400 hover:shadow-sm transition-all text-left"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                      {item.tab}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">{item.tag}</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">{item.name}</h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{item.role}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsSheetModalOpen(true)}
                className="text-xs sm:text-sm text-amber-800 hover:text-amber-900 font-bold underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>View remaining 23 worksheets specification</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* 3. CORE PROBLEM & CONTRAST (WHY MANUAL ESTIMATION FAILS) */}
        <section className="py-10 sm:py-16 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* The Expensive Way: Contractors' Vague Lumpsum Estimates */}
            <div className="p-6 sm:p-8 rounded-2xl bg-rose-50/50 border border-rose-200 text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>The Costly Guesswork Approach</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                What Happens When You Don&apos;t Have an Itemized Engineering BOQ:
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span><strong>Over-ordering cement and steel:</strong> Paying for 15%–20% surplus materials that get damaged by monsoon rains or stolen on site.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span><strong>Contractor Running Bill Inflations:</strong> Contractors claiming 1,200 sq ft plaster when actual measured wall area is only 950 sq ft.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span><strong>Disputed Extra Item Rates:</strong> Surprise invoices midway through construction because specifications weren&apos;t agreed upon in writing.</span>
                </li>
              </ul>
            </div>

            {/* The Thinktools System */}
            <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50/50 border border-emerald-200 text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>The Construction Calculator Pro Way</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-950">
                Complete Mathematical Clarity in 3 Simple Steps:
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Pre-coded Civil Formulas:</strong> RCC mix design, steel bar weights (d²/162), brickwork mortar, and tile coverage automatically calculate.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Tab 25 Bill Check Verification:</strong> Type the contractor&apos;s claimed numbers; the spreadsheet instantly highlights any variation over 5% in red.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Pure OpenXML Microsoft Excel:</strong> Runs completely offline on your computer. Zero subscriptions. Free lifetime updates.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4. COMPLETE PACKAGE ARCHITECTURE */}
        <section className="py-10 sm:py-16 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 text-center">
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 rounded-full inline-block mb-2">
              Everything Delivered in 1 Instant .ZIP Bundle
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              What You Receive Immediately Upon Purchase
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl mx-auto">
              No incomplete spreadsheets or locked formulas. You get the blank engine, finished examples, printable forms, and negotiation tools in one instant download:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 text-left">
              {/* Item 1: 3 Master Workbooks */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 sm:p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  3 Master Excel Workbooks (.xlsx)
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  (1) Blank Project Calculator Engine for your custom project, (2) 1,500 sq ft 3-BHK Villa Example (Chennai) with sample calculations and rates, and (3) 1,000 sq ft Flat Renovation Example.
                </p>
                <div className="text-[11px] text-amber-300 font-mono pt-2 border-t border-slate-700">
                  31 connected tabs · Unlocked formulas
                </div>
              </div>

              {/* Item 2: 13 PDF Implementation Guides */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 sm:p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  13 PDF Guides & Worksheets
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Step-by-step master implementation manual, fast-track quick start guide, printable site measurement worksheets A–F, and phase-by-phase material inspection guides.
                </p>
                <div className="text-[11px] text-blue-300 font-mono pt-2 border-t border-slate-700">
                  43 pages · Printable & Mobile-ready
                </div>
              </div>

              {/* Item 3: 7 Bonus Kits & Scripts */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 sm:p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  7 Anti-Fear Negotiation Bonuses
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Contractor quotation comparison scorecard, contractor bill check protocol, change order freeze template, material quality testing handbook, and polite negotiation scripts.
                </p>
                <div className="text-[11px] text-emerald-300 font-mono pt-2 border-t border-slate-700">
                  Word-for-word scripts · Protects your money
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. ROADMAP: 4-WEEK ONBOARDING */}
        <section className="py-10 sm:py-16 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-slate-500 block mb-1">
              Simple 3-Step Execution
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              How You Use This Toolkit in 3 Minutes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-3">
              <span className="text-xs font-bold text-amber-700 font-mono bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                Step 1: Setup Units
              </span>
              <h3 className="text-base font-bold text-slate-900">Choose Feet/Inches or Metres</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Open Sheet #3 (Setup). Click the dropdown toggle to choose Feet & Inches (standard Indian residential) or Metres. The entire workbook automatically adapts all formulas.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-3">
              <span className="text-xs font-bold text-amber-700 font-mono bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                Step 2: Enter Room Dimensions
              </span>
              <h3 className="text-base font-bold text-slate-900">Type Your Floor Plan Numbers</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Type basic room lengths, widths, and wall heights into the clear yellow cells. Earthwork, RCC slabs, brick counts, plaster areas, and tile boxes calculate automatically.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-3">
              <span className="text-xs font-bold text-amber-700 font-mono bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                Step 3: Update Local Material Rates
              </span>
              <h3 className="text-base font-bold text-slate-900">Get Instant Itemized BOQ</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enter your local price per cement bag, steel per kg, sand per brass, and bricks into Sheet #20. Your complete bill of quantities and purchase order list update in real time.
              </p>
            </div>
          </div>
        </section>

        {/* 6. TECHNICAL GUARANTEE & COMPATIBILITY */}
        <section className="py-8 sm:py-12 bg-white border-y border-slate-200">
          <div className="max-w-4xl mx-auto px-3.5 sm:px-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-slate-950">
              Native Microsoft Excel Architecture & Zero-Glitch Guarantee
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Built natively for Microsoft Excel (.xlsx) on Windows & Mac with automated cross-sheet formulas. If you encounter any technical file opening glitch or formula issue, our engineering team will provide priority WhatsApp/email assistance within 24 hours or issue a prompt, friendly refund.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(true)}
                className="px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
              >
                Get Started for ₹{product.price}
              </button>
            </div>
          </div>
        </section>

        {/* 7. PRICING & OFFER: CLEAR, TRANSPARENT VALUE (DIWALI SPECIAL) */}
        <section className="py-10 sm:py-16 max-w-3xl mx-auto px-3.5 sm:px-6">
          <div className="rounded-2xl sm:rounded-3xl bg-white border-2 border-amber-400 p-5 sm:p-8 md:p-10 shadow-xl relative overflow-hidden">
            {/* Festive Ribbon */}
            <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-600 to-yellow-500 text-slate-950 font-black text-[10px] sm:text-xs uppercase px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-bl-xl sm:rounded-bl-2xl shadow-xs">
              🪔 Diwali Special Deal
            </div>

            <div className="text-center pb-5 sm:pb-6 border-b border-slate-200">
              <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block mb-1.5">
                Limited-Time Festive Sale • Lifetime Access
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-950 mt-1">
                Construction Calculator Pro Package
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 sm:mt-2">
                3 Excel workbooks · 31 connected worksheets · 13 PDF guides and worksheets · 7 bonus resources
              </p>

              {/* Price Anchor */}
              <div className="mt-5 sm:mt-6 flex flex-col items-center justify-center">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span className="text-lg sm:text-2xl font-bold text-slate-400 line-through">
                    ₹999
                  </span>
                  <span className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-950 font-mono">
                    ₹{product.price}/-
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200 font-black text-[10px] sm:text-xs uppercase tracking-wide">
                    70% OFF
                  </span>
                </div>
                <div className="mt-2.5 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 font-bold text-[11px] sm:text-xs">
                  <span>🪔 Festive Flash Sale: ₹299/- • Limited-Time Diwali Offer</span>
                </div>
              </div>
            </div>

            <div className="py-5 sm:py-6 space-y-2.5 sm:space-y-3">
              {[
                "3 Excel workbooks (.xlsx): Blank Master, Chennai 3BHK Example, Flat Renovation",
                "31 connected worksheets with Dual Units Toggle (Feet/Inches & Metres)",
                "Contractor bill check comparison sheet with variance flags",
                "Procurement order list with wastage allowances & lead times",
                "13 PDF guides including 4-week action plan and printable site worksheets",
                "7 bonus resources: Contractor hiring kit, site quality checks, snag list & 5 scripts"
              ].map((highlight, idx) => (
                <div key={idx} className="flex items-start sm:items-center gap-2 sm:gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            <button
              id="btn-pricing-cta"
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full py-3.5 sm:py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Claim Diwali Offer for ₹{product.price}</span>
            </button>

            {/* Payment Trust Badges */}
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
                Instant Delivery · Dedicated File Support
              </span>
              <span className="flex items-center gap-1 font-semibold text-amber-700">
                <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                Instant Email Delivery (Files Attached)
              </span>
            </div>
          </div>
        </section>

        {/* 8. FAQS */}
        <section className="py-10 sm:py-16 max-w-3xl mx-auto px-3.5 sm:px-6">
          <div className="text-center mb-6 sm:mb-8">
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-slate-500 block">
              Clear Answers Before You Buy
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
                q: "Which spreadsheet software is required to use this toolkit?",
                a: "Construction Calculator Pro is built natively for Microsoft Excel (Excel 2016 through Microsoft 365 on Windows & Mac) for full cross-sheet formula calculations, rate synchronizations, and dropdowns. The workbooks are pure OpenXML .xlsx files engineered specifically for desktop Microsoft Excel for the fastest automated calculation experience."
              },
              {
                q: "Where do I receive the files after paying ₹299?",
                a: "Immediately upon completing payment via Razorpay, your complete digital toolkit (.zip bundle containing all 3 workbooks and PDF guides) is displayed on screen for instant direct download and dispatched directly to your registered email address with the files attached for permanent offline access."
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
                q: "How does digital delivery and support work?",
                a: "Immediately upon completing payment via Razorpay, your complete digital toolkit (.zip bundle containing all 3 workbooks, 13 PDF guides, and 7 bonus kits) is displayed on screen for instant download and automatically attached to your confirmation email for permanent offline access. If you ever experience any file questions, download issues, or duplicate charges, our dedicated support team (support@thinktools.in) will assist you promptly."
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 cursor-pointer"
                >
                  <span className="font-bold text-xs sm:text-sm text-slate-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                      openFaq === idx ? "rotate-180 text-amber-600" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Sticky Mobile Checkout Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#011c37] border-t border-slate-800 p-2.5 px-3 flex items-center justify-between shadow-2xl">
        <div className="flex flex-col">
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
            🪔 Diwali Deal
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs text-slate-400 line-through">₹999</span>
            <span className="text-base font-black text-white font-mono">₹{product.price}</span>
          </div>
        </div>
        <button
          onClick={() => setIsCheckoutOpen(true)}
          className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 cursor-pointer"
        >
          Claim Now (₹{product.price})
        </button>
      </div>

      <Footer />

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          product={product}
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
        />
      )}

      {/* All 31 Sheets Specification Modal */}
      {isSheetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-slate-900">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-slate-200 flex items-start justify-between gap-3 bg-slate-50">
              <div>
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 border border-amber-300 px-2 py-0.5 rounded">
                  Full 31-Tab Master Architecture
                </span>
                <h3 className="text-base sm:text-xl font-extrabold text-slate-950 mt-1">
                  Inspect All Worksheets in the Suite
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Pre-configured formulas, CPWD standards, and dual unit calculations.
                </p>
              </div>
              <button
                onClick={() => setIsSheetModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Search Bar */}
            <div className="p-3 sm:p-4 border-b border-slate-200 bg-white">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search worksheet name, formula, or part (e.g. steel, plaster, rates, bill check)..."
                  value={sheetModalSearch}
                  onChange={(e) => setSheetModalSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            {/* Modal Scrollable Sheet List */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-2.5">
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
                Claim Diwali Deal (₹{product.price})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
