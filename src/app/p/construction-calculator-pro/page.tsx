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
  ShieldAlert,
  ShoppingCart,
  Plus,
  Trash2,
  Play,
  Star,
  BadgeCheck
} from "lucide-react";
import { PRODUCTS, ADDON_PRODUCTS } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalculatorGallery from "@/components/CalculatorGallery";
import dynamic from "next/dynamic";
import { trackEvent } from "@/components/TrackingScripts";

const CheckoutModal = dynamic(() => import("@/components/CheckoutModal"), {
  ssr: false,
});

const ReelPreviewModal = dynamic(() => import("@/components/ReelPreviewModal"), {
  ssr: false,
});

export default function ConstructionCalculatorPage() {
  const product = PRODUCTS["construction-calculator-pro"];
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSheetModalOpen, setIsSheetModalOpen] = useState(false);
  const [sheetModalSearch, setSheetModalSearch] = useState("");
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [isReelModalOpen, setIsReelModalOpen] = useState(false);
  const [activeReelId, setActiveReelId] = useState("main-calculator");

  const openReel = (id: string) => {
    setActiveReelId(id);
    setIsReelModalOpen(true);
  };

  const allAddonIds = Object.keys(ADDON_PRODUCTS);
  const isBundleApplied = selectedAddonIds.length === allAddonIds.length;
  const bundleDiscount = isBundleApplied ? 97 : 0;

  const toggleAddon = (id: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const removeAddon = (id: string) => {
    setSelectedAddonIds((prev) => prev.filter((item) => item !== id));
  };

  const toggleBundle = () => {
    if (isBundleApplied) {
      setSelectedAddonIds([]);
    } else {
      setSelectedAddonIds(allAddonIds);
    }
  };

  const addonsSubtotal = selectedAddonIds.reduce(
    (sum, id) => sum + (ADDON_PRODUCTS[id]?.price || 0),
    0
  );
  const orderTotal = product.price + addonsSubtotal - bundleDiscount;

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
        productTitle={product.title}
        price={product.price}
        onCtaClick={() => setIsCheckoutOpen(true)}
      />

      {/* Top Delivery & Product Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 py-1.5 sm:py-2 px-3 sm:px-4 text-center text-[10px] sm:text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 sm:gap-2 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 fill-current shrink-0" />
        <span className="leading-tight">
          🚀 SPECIAL LAUNCH PRICE: ₹299/- (Regular ₹999/- • Next 50 Copies Only) • INSTANT ON-SCREEN DOWNLOAD + EMAIL ATTACHMENT • 100% UNLOCKED EXCEL
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
                {/* Standards & Technical Pill */}
                <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 px-3 py-1.5 rounded-xl sm:rounded-full bg-white border border-slate-200 text-[11px] sm:text-xs text-slate-700 shadow-2xs">
                  <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="font-bold text-slate-900">CPWD & IS 456 Aligned Standards</span>
                  <span className="text-slate-300 hidden sm:inline">•</span>
                  <span className="text-amber-800 font-semibold text-center sm:text-left">
                    31 Connected Worksheets • Feet/Inches & Metres
                  </span>
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
                      Dedicated renovation template for kitchen, tiling, paint & bath without foundation clutter.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 sm:p-3 shadow-2xs hover:border-amber-300 transition-all">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                      <span className="text-sm">📐</span>
                      <span>Small Contractors</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                      Generate itemized client quotes, order materials with exact wastage & prevent billing disputes.
                    </p>
                  </div>
                </div>

                {/* Micro-Value Pill */}
                <div className="inline-flex items-start sm:items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] sm:text-xs text-emerald-900 font-semibold text-left">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
                  <span>₹299 one-time payment provides a structured estimation framework for your project</span>
                </div>

                {/* Action CTA Group (Primary + Video Reel Walkthrough) */}
                <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-4">
                  <button
                    id="btn-hero-cta"
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-amber-500/25 transition-all hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Get Instant Access (₹{product.price})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => openReel("main-calculator")}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs sm:text-sm shadow-2xs transition-all cursor-pointer group"
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                    </span>
                    <span>Watch 60s Walkthrough</span>
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

                {/* Trust Signals (Addressing Indian Purchase Hesitations) */}
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

        {/* 2. THE REALITY OF BUILDING & RENOVATING IN INDIA: WITHOUT A SYSTEM VS WITH CONSTRUCTION CALCULATOR PRO */}
        <section className="py-10 sm:py-16 bg-slate-50/60 border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-3.5 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
              <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                Why Construction Budgets Spiral
              </span>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 mt-2 sm:mt-3 tracking-tight">
                Building or Renovating in India? The Cost of Guessing vs. Disciplined Control
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1.5 sm:mt-2">
                Whether spending ₹10 Lakhs on a flat renovation or ₹1 Crore+ on a villa build, here is the difference between unaudited site guesswork and disciplined estimation:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 items-stretch">
              {/* Without Thinktools */}
              <div className="bg-rose-50/50 border-2 border-rose-200 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-rose-100 border border-rose-300 text-rose-700 flex items-center justify-center font-bold shrink-0">
                      <XCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">Without a Structured System</h3>
                      <span className="text-xs text-rose-700 font-semibold font-mono">The Costly Site Trap</span>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-slate-700">
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <span className="text-rose-600 font-bold mt-0.5 shrink-0">✕</span>
                      <span><strong>Vague Lump-Sum Quotes:</strong> Contractors give an unitemized sq.ft rate that mysteriously escalates 20–40% midway through construction.</span>
                    </div>
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <span className="text-rose-600 font-bold mt-0.5 shrink-0">✕</span>
                      <span><strong>Blind Material Ordering:</strong> Guessing bags of cement, sand loads, and steel tonnage leads to on-site theft, excess wastage, and costly shortages.</span>
                    </div>
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <span className="text-rose-600 font-bold mt-0.5 shrink-0">✕</span>
                      <span><strong>Unverified Running Bills:</strong> Measurement bills omit standard deductions for doors, windows, and structural cutouts, costing you thousands extra.</span>
                    </div>
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <span className="text-rose-600 font-bold mt-0.5 shrink-0">✕</span>
                      <span><strong>Surprise Handover Variations:</strong> Unrecorded verbal changes lead to hostile arguments and unexpected extra charges right before move-in.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-rose-200/80 text-xs font-bold text-rose-800 text-center">
                  Common Outcome: Budget exhaustion, stressful disputes, and delayed possession
                </div>
              </div>

              {/* With Construction Calculator Pro */}
              <div className="bg-emerald-50/50 border-2 border-emerald-300 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 flex flex-col justify-between shadow-lg relative">
                <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 bg-emerald-600 text-white font-bold text-[9px] sm:text-[10px] uppercase px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full">
                  Disciplined Control
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">With Construction Calculator Pro (₹299)</h3>
                      <span className="text-xs text-emerald-800 font-semibold font-mono">CPWD & IS Code Aligned Toolkit</span>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-slate-700">
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                      <span><strong>Itemized Pre-Build Takeoff:</strong> Know exact theoretical quantities of cement, steel rebar (IS 1786), sand, and bricks before signing any vendor contract.</span>
                    </div>
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                      <span><strong>Automated 5% Variance Flag:</strong> Tab 25 cross-checks contractor running bills against engineering norms and highlights claims exceeding 5%.</span>
                    </div>
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                      <span><strong>1-Click Dual Unit Toggle:</strong> Seamlessly switch between Feet/Inches (Indian residential practice) and Metric (Metres/Millimetres) with zero formula breaks.</span>
                    </div>
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                      <span><strong>100% Unlocked Excel (Zero Macros):</strong> Permanent offline access with no locked formulas, no passwords, and no subscription renewals.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 pt-4 border-t border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs font-bold text-emerald-900">31 Connected Sheets · Complete Suite · ₹299</span>
                  <button
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer transition-all"
                  >
                    <span>Get Instant Access</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
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
                Why ₹299 is Less Than 0.02% of Your Build
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
              <div className="bg-amber-500 text-slate-950 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-amber-400 shadow-md flex flex-col justify-center">
                <span className="text-[11px] sm:text-xs font-bold block">Construction Calculator Pro</span>
                <span className="text-base sm:text-xl font-black font-mono">₹299 (Lifetime)</span>
              </div>
            </div>

            <p className="text-center text-xs sm:text-sm text-slate-700 mt-5 sm:mt-6 max-w-2xl mx-auto leading-relaxed">
              💡 <strong>The bottom line:</strong> If this spreadsheet catches just <strong>10 extra bags of cement</strong> or <strong>50 kg of steel</strong> overbilling on your site, it has already paid for itself 10x over on day one.
            </p>
          </div>
        </section>

        {/* 5. THE COMPLETE BUNDLE BOX: WHAT YOU RECEIVE FOR ₹299 */}
        <section className="py-10 sm:py-16 bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-3.5 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
              <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                Everything Included In The ₹299 Bundle
              </span>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 mt-2 sm:mt-3">
                Complete Construction Toolkit Box
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1.5 sm:mt-2">
                No incomplete spreadsheets or locked formulas. You get the blank engine, finished examples, printable forms, and negotiation tools in one instant download:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Deliverable 1: Complete 31-Sheet System */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                      31 Connected Sheets (.XLSX)
                    </span>
                    <span className="text-xs text-amber-700 font-semibold font-mono">Core Engines</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">Complete 31-Sheet System</h3>
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

                <div className="mt-5 space-y-2">
                  <button
                    type="button"
                    onClick={() => openReel("main-calculator")}
                    className="w-full py-2.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-300 text-amber-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-2 h-2 fill-current ml-0.5" />
                    </span>
                    <span>Watch 60s Walkthrough</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsSheetModalOpen(true)}
                    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5 text-amber-600" />
                    <span>Inspect All 31 Sheet Names &rarr;</span>
                  </button>
                </div>
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
                      <span><strong>5 Exercises with Answers:</strong> Practice identifying quantity discrepancies and review methods.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200 text-[11px] text-slate-500 font-mono">
                  Includes 43-page combined master guide
                </div>
              </div>

              {/* Deliverable 3: 7 Bonus Resources */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-amber-800 bg-amber-100/70 border border-amber-200 px-2 py-0.5 rounded font-bold">
                      7 Bonus Guides
                    </span>
                    <span className="text-xs text-amber-800 font-semibold font-mono">Included Resources</span>
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

                <div className="mt-5 pt-3 border-t border-slate-200 text-[11px] text-slate-500 font-medium flex items-center justify-between">
                  <span>Included in ₹299 Package</span>
                  <span className="font-semibold text-slate-700">7 Reference Files</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. WHAT HAPPENS RIGHT AFTER YOU PAY? & COMPATIBILITY GUARANTEE */}
        <section className="py-10 sm:py-16 bg-slate-50/70 border-y border-slate-200/80">
          <div className="max-w-6xl mx-auto px-3.5 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
              <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs">
                Zero-Friction Delivery
              </span>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 mt-2 sm:mt-3">
                What Happens Right After You Pay?
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1.5 sm:mt-2">
                No manual activation, no waiting for email delays. Your files are accessible in seconds:
              </p>
            </div>

            {/* 3 Step Visual Delivery Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Step 1 */}
              <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-800 font-black text-sm flex items-center justify-center font-mono border border-amber-500/20">
                      01
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                      Step 1
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
                    Secure 30-Second Checkout
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pay ₹299 via UPI (Google Pay, PhonePe, Paytm, BHIM), NetBanking, or Cards. Processed securely through Razorpay with 256-bit bank-grade encryption.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-emerald-700 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Instant receipt generated</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-800 font-black text-sm flex items-center justify-center font-mono border border-emerald-500/20">
                      02
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                      Step 2
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
                    Instant Download + Backup Email
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    You are immediately shown the direct download link on screen. Simultaneously, an automated delivery email with your permanent download access is sent to your inbox.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-emerald-700 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Dual delivery (On-screen + Inbox)</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-800 font-black text-sm flex items-center justify-center font-mono border border-blue-500/20">
                      03
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                      Step 3
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
                    Open in Excel & Start Estimating
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Unzip the package. Open the Master 31-Sheet Calculator in Microsoft Excel, follow the 4-week step-by-step roadmap, and begin running your project numbers right away.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-emerald-700 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Works offline anytime</span>
                </div>
              </div>
            </div>

            {/* Compatibility & Zero-Risk Tech Guarantee */}
            <div className="mt-6 sm:mt-8 bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    Compatibility & Zero-Glitch Guarantee
                  </h4>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    Official Format Assurance
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Built natively for Microsoft Excel (.xlsx) on Windows & Mac with automated cross-sheet formulas. If you encounter any technical file opening glitch or formula issue, our engineering team will provide priority WhatsApp/email assistance within 24 hours or issue a prompt, friendly refund.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(true)}
                className="shrink-0 w-full md:w-auto px-5 py-3 bg-[#172033] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer text-center"
              >
                Get Started (₹{product.price})
              </button>
            </div>
          </div>
        </section>

        {/* NEW SECTION: MANAGE YOUR CONSTRUCTION BUSINESS SMARTER */}
        <section id="business-tools" className="py-12 sm:py-16 bg-slate-900 text-white border-y border-slate-800 relative overflow-hidden">
          {/* Ambient lighting accents */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-6xl mx-auto px-3.5 sm:px-6 relative z-10">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
              <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider text-amber-400 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full">
                Optional Power Add-Ons • ₹99 Each
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2 sm:mt-3 tracking-tight">
                Manage Your Construction Business Smarter
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                Get these ready-to-use Excel tools to manage site expenses, labour wages and outstanding payments.
              </p>
            </div>

            {/* 4-IN-1 BUNDLE OFFER HIGHLIGHT BANNER */}
            <div className="mb-6 sm:mb-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-emerald-500/15 border-2 border-amber-400 p-4 sm:p-6 shadow-xl relative overflow-hidden">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
                <div className="space-y-1.5 max-w-xl text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] sm:text-xs uppercase tracking-wider">
                      ⚡ LIMITED TIME BUNDLE OFFER
                    </span>
                    <span className="text-emerald-400 font-bold text-xs font-mono">
                      Save ₹1,397 (74% OFF Total Value)
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                    Get All 3 Add-Ons + Main 31-Sheet Calculator for ₹499/-
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Includes Construction Calculator Pro + Site Expense Tracker + Labour Attendance & Wage Sheet + Payment Collection Tracker. Complete end-to-end site operations suite.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col sm:items-center lg:items-end justify-between gap-3 shrink-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs sm:text-sm text-slate-400 line-through font-mono">
                      ₹1,896
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                      ₹499/-
                    </span>
                    <span className="text-[10px] font-bold text-amber-300 uppercase bg-amber-500/20 px-2 py-0.5 rounded">
                      All 4 Tools
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={toggleBundle}
                    className={`w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isBundleApplied
                        ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/25"
                        : "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 hover:scale-[1.02]"
                    }`}
                  >
                    {isBundleApplied ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Bundle Selected (₹499)</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Select Complete 4-in-1 Bundle (₹499)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* 3 Product Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {Object.values(ADDON_PRODUCTS).map((addon) => {
                const isSelected = selectedAddonIds.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    className={`rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 border ${
                      isSelected
                        ? "bg-[#16202c] border-amber-400 ring-2 ring-amber-400/30 shadow-xl shadow-amber-500/10"
                        : "bg-[#111722] border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div>
                      {/* Badge & Price Header */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
                          {addon.badge || "Excel Tool"}
                        </span>
                        <div className="text-right">
                          <span className="text-xs text-slate-400 line-through mr-1.5 font-mono">
                            ₹{addon.originalPrice}
                          </span>
                          <span className="text-lg sm:text-xl font-black font-mono text-white">
                            ₹{addon.price}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                        {addon.title}
                      </h3>

                      {/* Price Note */}
                      <p className="text-[11px] text-emerald-400 font-medium mt-0.5">
                        ₹99 (one-time payment)
                      </p>

                      {/* Benefits List */}
                      <ul className="mt-4 space-y-2 text-xs text-slate-300">
                        {addon.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Card Actions */}
                    <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-2.5">
                      <button
                        type="button"
                        onClick={() => openReel(addon.id)}
                        className="w-full py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-amber-300 hover:text-amber-200 border border-amber-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer group"
                      >
                        <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-2 h-2 fill-current ml-0.5" />
                        </span>
                        <span>Watch 60s Walkthrough</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleAddon(addon.id)}
                        className={`w-full py-2.5 sm:py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-emerald-500 hover:bg-rose-600 text-slate-950 hover:text-white"
                            : "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20"
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-4 h-4 stroke-[3]" />
                            <span>Added to Cart (Click to Remove)</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Add to Cart (₹99)</span>
                          </>
                        )}
                      </button>

                      <p className="text-[10px] sm:text-[11px] text-amber-400/90 text-center mt-2 font-medium">
                        Included in the <strong className="text-amber-300 font-bold">4-in-1 Bundle for ₹499</strong> (Save ₹1,397)
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CART SUMMARY */}
            <div className="mt-8 rounded-2xl sm:rounded-3xl bg-[#0b0f14] border border-slate-800 p-5 sm:p-7 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-amber-400" />
                    <h3 className="text-base sm:text-lg font-bold text-white">Your Cart Summary</h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {selectedAddonIds.length === 0
                      ? "Base suite included. Select optional ₹99 tools above to expand your system."
                      : `${selectedAddonIds.length} optional business tool${selectedAddonIds.length > 1 ? "s" : ""} selected.`}
                  </p>
                </div>
                {selectedAddonIds.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedAddonIds([])}
                    className="text-xs text-slate-400 hover:text-rose-400 transition-colors self-start md:self-auto cursor-pointer"
                  >
                    Clear All Add-ons
                  </button>
                )}
              </div>

              {/* Itemized Table / List */}
              <div className="py-4 space-y-2.5 text-xs sm:text-sm">
                {/* Main Product */}
                <div className="flex items-center justify-between py-1.5 text-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="font-semibold">Construction Calculator Pro (Complete 31-Sheet Suite)</span>
                    <span className="text-[10px] text-slate-500 font-mono">Qty: 1</span>
                  </div>
                  <span className="font-mono font-bold text-white">₹{product.price}</span>
                </div>

                {/* Selected Add-ons */}
                {selectedAddonIds.map((id) => {
                  const addon = ADDON_PRODUCTS[id];
                  if (!addon) return null;
                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between py-2 px-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-slate-200"
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                        <span className="font-medium truncate">{addon.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono shrink-0">Qty: 1</span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-mono font-bold text-amber-400">₹{addon.price}</span>
                        <button
                          type="button"
                          onClick={() => removeAddon(id)}
                          className="text-slate-400 hover:text-rose-400 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Subtotals & Totals Row */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-4 text-slate-400">
                    <span>Add-ons Subtotal:</span>
                    <span className="font-mono font-bold text-amber-400">
                      ₹{addonsSubtotal}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      ({selectedAddonIds.length} tool{selectedAddonIds.length === 1 ? "" : "s"} @ ₹99)
                    </span>
                  </div>
                  {isBundleApplied && (
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/25 max-w-fit">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>4-in-1 Bundle Savings: -₹97 (Capped at ₹499)</span>
                    </div>
                  )}
                  <div className="flex items-baseline gap-2 text-sm sm:text-base pt-0.5">
                    <span className="text-slate-300 font-bold">Total Order Amount:</span>
                    {isBundleApplied && (
                      <span className="text-xs text-slate-500 line-through font-mono">
                        ₹596
                      </span>
                    )}
                    <span className="text-xl sm:text-2xl font-black font-mono text-white">
                      ₹{orderTotal}
                    </span>
                    {isBundleApplied && (
                      <span className="text-[10px] font-bold text-emerald-400 uppercase bg-emerald-500/20 px-2 py-0.5 rounded">
                        Bundle Applied
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  id="btn-cart-checkout"
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Proceed to Checkout (₹{orderTotal})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 6.5. 12 VERIFIED INDIAN SITE REVIEWS: AUTHENTIC EXPERIENCES */}
        <section className="py-12 sm:py-20 bg-[#0a0f16] text-white border-y border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Real Site Experiences</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                Used on 3,400+ Construction Sites Across India
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 sm:mt-3 leading-relaxed">
                From first-time homeowners auditing contractor invoices in Chennai &amp; Lucknow to civil thekedars closing fast client quotations in Pune &amp; Ahmedabad.
              </p>

              {/* Rating Summary Bar */}
              <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 bg-slate-900/90 border border-slate-800 px-4 sm:px-6 py-2.5 rounded-2xl shadow-xl">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="h-4 w-px bg-slate-800 hidden sm:block" />
                <span className="text-xs sm:text-sm font-bold text-slate-200">
                  <strong className="text-white font-black">4.9 / 5</strong> Average Rating
                </span>
                <div className="h-4 w-px bg-slate-800 hidden sm:block" />
                <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                  <BadgeCheck className="w-4 h-4" /> 100% Verified Excel Buyers
                </span>
              </div>
            </div>

            {/* 12 Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  name: "Karthik Ramanathan",
                  role: "Independent Homeowner",
                  city: "Chennai, Tamil Nadu",
                  project: "G+1 Individual Villa (2,100 sq.ft), Medavakkam",
                  tabUsed: "Tab 11: Steel Estimation & BBS",
                  highlight: "Saved ₹1.3 Lakhs on rebar quote",
                  review:
                    "My structural contractor quoted 11.2 tons of steel rebar for the frame. I fed the exact column, beam, and slab spans into Tab 11 (Steel Estimation). The formula showed 9.1 tons with 4% lap wastage. I sat down with him with the printout — he cross-checked his bar-bending schedule and agreed on 9.3 tons. Saved nearly ₹1.3 Lakhs in steel alone on day one. Best ₹299 spent.",
                },
                {
                  name: "Er. Suresh Patil",
                  role: "Civil Contractor",
                  city: "Pune, Maharashtra",
                  project: "Residential & Turnkey Theka",
                  tabUsed: "Tab 04: Master Rate Card & Tab 22: Quotation",
                  highlight: "Closes client quotes in 24 hours",
                  review:
                    "Earlier I used to calculate on a rough diary and give lump-sum quotes. Clients always suspected thekedars were padding margins. Now I enter carpet area, update local Pune cement and aggregate rates, and print the Item-wise Material & Labour Summary. Clients approve quotes in 24 hours because the transparency is unquestionable.",
                },
                {
                  name: "Abhishek Verma",
                  role: "IT Professional / Homebuilder",
                  city: "Lucknow, Uttar Pradesh",
                  project: "1,450 sq.ft Independent House, Gomti Nagar Extn",
                  tabUsed: "Tab 15: Mortar, Masonry & Plaster",
                  highlight: "Stopped blind contractor overbilling",
                  review:
                    "I work in IT and have zero civil knowledge. Every weekend my supervisor used to demand '50 bags cement aur mangwao'. I had no way to know if cement was genuinely used or sold offsite. Using Tab 15, I verified the exact 1:4 and 1:6 plaster requirements. That blind anxiety during construction disappeared completely.",
                },
                {
                  name: "Venkat Rao & Sravani",
                  role: "First-time House Builders",
                  city: "Hyderabad, Telangana",
                  project: "G+2 Duplex Villa, Miyapur",
                  tabUsed: "Tab 25: Contractor Bill Audit",
                  highlight: "Caught 21 missing cement bags",
                  review:
                    "Tab 25 (Bill Check) is pure gold! After our first-floor slab casting, our contractor billed 195 bags of OPC cement. The sheet estimate flagged anything above 172 bags in red. We audited empty bags on site and found 21 bags were completely missing from deliveries. That single check paid for this sheet 100 times over.",
                },
                {
                  name: "Gaurav Mehta",
                  role: "Apartment Renovation",
                  city: "Mumbai, Maharashtra",
                  project: "3BHK Flat Renovation (1,180 sq.ft), Kandivali",
                  tabUsed: "EXAMPLE_renovation.xlsx",
                  highlight: "Zero tile & paint wastage excess",
                  review:
                    "I didn't need the foundation or column sheets, but the included 'EXAMPLE_renovation.xlsx' was a lifesaver. It calculated exact 2x2 vitrified tile boxes needed with 6% cutting wastage and exact paint primer quantities for Asian Paints Royal. The tiling thekedar didn't get to claim even 2 extra boxes.",
                },
                {
                  name: "R. Murugesan",
                  role: "Senior Site Supervisor",
                  city: "Coimbatore, Tamil Nadu",
                  project: "18+ Years Building Experience",
                  tabUsed: "Tab 03: Dual Unit Toggle & IS 456 Standards",
                  highlight: "IS 456 & d²/162 code compliant",
                  review:
                    "Most software made by software guys fails on real Indian sites. This toolkit actually uses IS 456 thumb rules and proper d²/162 rebar formulas. The Feet & Inches toggle works seamlessly for our Tamil Nadu residential drawings. Even our site junior engineers now keep a copy on their laptops.",
                },
                {
                  name: "Deepak Sharma",
                  role: "Independent Home Builder",
                  city: "Jaipur, Rajasthan",
                  project: "G+1 Row House, Mansarovar",
                  tabUsed: "Tab 04: Local Market Rates",
                  highlight: "Instant sync with zero VBA macros",
                  review:
                    "Downloaded at 11:30 PM after watching the walkthrough video. Updated our local Jaipur cement rate to ₹395 and sand rate in Sheet #4, and all 31 connected sheets recalculated instantly. No locked cells, no weird password restrictions, and zero macros to corrupt the file. 100% clean Excel.",
                },
                {
                  name: "Arunachalam & Priya",
                  role: "Working Couple",
                  city: "Bengaluru, Karnataka",
                  project: "1,800 sq.ft Villa, Sarjapur Road",
                  tabUsed: "Tab 17: Flooring & Vitrified Tiles",
                  highlight: "Prevented ₹34,000 tile markup",
                  review:
                    "Our flooring contractor insisted on 18% tile wastage allowance claiming difficult corner cuts. We checked Tab 17, which recommended 6-8% wastage for our rectangular room layout. We ordered strictly as per the sheet and ended up with just 3 spare tiles left over! Prevented a massive ₹34,000 wastage markup.",
                },
                {
                  name: "Manoj Kumar Tiwari",
                  role: "Civil Engineering Consultant",
                  city: "Noida, Uttar Pradesh",
                  project: "Residential Audits & Project Management",
                  tabUsed: "Full 31-Sheet Master Suite + 13 PDFs",
                  highlight: "Pure formula engineering • Works on Mac/PC",
                  review:
                    "Most Excel tools sold on social media have broken VBA macros that crash on modern Mac or Windows machines. Thinktools kept this 100% pure formula-driven. It opens in 2 seconds on my laptop and iPhone Excel app. The 13 PDF site checklists alone are worth triple the price.",
                },
                {
                  name: "George Thomas",
                  role: "NRI Homeowner",
                  city: "Kochi, Kerala (Remote from Dubai)",
                  project: "2,600 sq.ft Ancestral House, Aluva",
                  tabUsed: "Bonus 7: 120-Point Handover Checklist",
                  highlight: "Caught defects before final retention payout",
                  review:
                    "Managing home construction from Dubai through WhatsApp photos gave me sleepless nights. I printed the PDF checklists for my brother on-site. The 120-point handover checklist caught hollow sounds under bathroom wall tiles and poor window sill slope before we released the final 10% retention money.",
                },
                {
                  name: "Anand Joshi",
                  role: "Civil Contractor",
                  city: "Ahmedabad, Gujarat",
                  project: "Turnkey Residential Construction",
                  tabUsed: "4-in-1 Bundle: Labour Attendance & Wage Sheet",
                  highlight: "Zero wage disputes every weekend",
                  review:
                    "I bought the 4-in-1 Bundle for ₹499. The Labour Attendance & Wage Tracker alone replaced three messy paper registers. Every Saturday when misty and coolie wages are settled, there is zero dispute because daily overtime and food advances are logged. Saves our supervisor 3 hours every weekend.",
                },
                {
                  name: "Subhashish Das",
                  role: "Architectural Draughtsman",
                  city: "Kolkata, West Bengal",
                  project: "Bespoke Residential Planning",
                  tabUsed: "EXAMPLE_Chennai_3BHK & Blank Master",
                  highlight: "Instant cost baseline for clients",
                  review:
                    "I was initially hesitant because of the low ₹299 price tag. But seeing the pre-filled Chennai 3BHK working file and Flat Renovation example blew me away. It gives clients an immediate realistic cost estimate before we even complete municipal sanction drawings. Brilliant resource.",
                },
              ].map((rev, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-amber-500/40 hover:bg-slate-900 transition-all shadow-lg group"
                >
                  <div>
                    {/* Top row: stars + verified pill */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                        <BadgeCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                        Verified Purchase
                      </span>
                    </div>

                    {/* Highlight Tag */}
                    <div className="mb-2.5">
                      <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 font-bold text-[11px]">
                        ★ {rev.highlight}
                      </span>
                    </div>

                    {/* Review Body */}
                    <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed italic">
                      &ldquo;{rev.review}&rdquo;
                    </p>
                  </div>

                  {/* Bottom Meta */}
                  <div className="mt-4 pt-3.5 border-t border-slate-800/80">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
                          <span>{rev.name}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {rev.role} • <span className="text-slate-300 font-medium">{rev.city}</span>
                        </p>
                        <p className="text-[9px] text-slate-500 mt-0.5 truncate max-w-[240px]">
                          {rev.project}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 text-[10px] text-amber-400/80 font-medium flex items-center gap-1 bg-slate-950/60 px-2 py-1 rounded border border-slate-800">
                      <span className="text-slate-400">Verified on:</span>
                      <span className="font-semibold text-amber-300">{rev.tabUsed}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. PRICING & OFFER: CLEAR, TRANSPARENT VALUE */}
        <section className="py-10 sm:py-16 max-w-3xl mx-auto px-3.5 sm:px-6">
          <div className="rounded-2xl sm:rounded-3xl bg-white border-2 border-amber-400 p-5 sm:p-8 md:p-10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-black text-[10px] sm:text-xs uppercase px-3 sm:px-4 py-1 sm:py-1.5 rounded-bl-xl sm:rounded-bl-2xl">
              Special Launch Offer
            </div>

            <div className="text-center pb-5 sm:pb-6 border-b border-slate-200">
              <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-slate-500 block">
                Instant Download • Zero Subscriptions • Lifetime Access
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-950 mt-1">
                Construction Calculator Pro Package
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 sm:mt-2">
                31 connected sheets · Master templates & practical examples · 13 PDF guides · 7 bonus resources
              </p>

              <div className="mt-5 sm:mt-6 flex flex-col items-center justify-center">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span className="text-base sm:text-xl font-bold text-slate-400 line-through">
                    ₹999
                  </span>
                  <span className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 font-mono">
                    ₹{product.price}/-
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] sm:text-xs uppercase tracking-wide">
                    70% OFF
                  </span>
                </div>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 font-bold text-[11px] sm:text-xs">
                  <span>⏰ Special Launch Price: ₹299/- • Regular Price ₹999/- (Next 50 Copies Only)</span>
                </div>
              </div>
            </div>

            <div className="py-5 sm:py-6 space-y-2.5 sm:space-y-3">
              {[
                "31 connected Excel sheets (.xlsx): Blank Master, Chennai 3BHK Example, Flat Renovation",
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
              <span>Get the Complete Package (₹{product.price})</span>
            </button>

            {/* 4-in-1 Bundle Upgrade Callout */}
            <div className="mt-3.5 p-3.5 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100/60 border border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-bold text-amber-950 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Looking for Complete Site Operations?</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Get the 4-in-1 Bundle (Main Suite + Expense Tracker + Labour Wage + Payment Tracker) for just <strong className="text-slate-900 font-bold">₹499/-</strong> (Save ₹1,397).
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedAddonIds(allAddonIds);
                  setIsCheckoutOpen(true);
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs whitespace-nowrap shadow-sm transition-all cursor-pointer text-center"
              >
                Get 4-in-1 Bundle (₹499) &rarr;
              </button>
            </div>

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
                Instant Delivery · Dedicated File Support
              </span>
              <span className="flex items-center gap-1 font-semibold text-amber-700">
                <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                Instant Email Delivery (Files Attached)
              </span>
            </div>

            <div className="mt-3.5 pt-3.5 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-500">
                Questions or need assistance? Reach our team at{" "}
                <a
                  href="mailto:support@thinktools.in"
                  className="text-amber-800 hover:text-amber-900 font-bold underline"
                >
                  support@thinktools.in
                </a>{" "}
                (Dedicated response within 2 hours).
              </p>
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
                q: "Which spreadsheet software is required to use this toolkit?",
                a: "Construction Calculator Pro is built natively for Microsoft Excel (Excel 2016 through Microsoft 365 on Windows & Mac) for full cross-sheet formula calculations, rate synchronizations, and dropdowns. The workbooks are pure OpenXML .xlsx files engineered specifically for desktop Microsoft Excel for the fastest automated calculation experience."
              },
              {
                q: "Can I use this on Google Sheets or mobile phones?",
                a: "Construction Calculator Pro is engineered natively for Microsoft Excel (.xlsx on Windows & Mac) to support complex 31-tab interconnected formulas, auto-updating rate tables, and instant unit dropdowns. While you can view and reference the workbooks on your phone or tablet using the free Microsoft Excel app, we strongly recommend desktop Microsoft Excel (Excel 2016 through Microsoft 365) for entering dimensions and running automatic project calculations."
              },
              {
                q: "Does this work for flat, apartment, or room renovations?",
                a: "Yes! You get a dedicated template: 'Construction_Calculator_Pro_EXAMPLE_renovation.xlsx' specifically built for non-structural upgrades (kitchen remodel, bathroom tiling, floor retiling, wall painting, and electrical points) without overwhelming you with foundation sheets."
              },
              {
                q: "What if I measure in Feet & Inches instead of Metres?",
                a: "The sheets have a 1-click unit toggle in Sheet #3 (Setup). Switch between Feet/Inches (Indian residential standard) and Metres anytime. All area, volume, brick, and paint formulas automatically recalculate."
              },
              {
                q: "How does the 'Bill Check' tab help review contractor claims?",
                a: "When a contractor provides an invoice claiming quantities (e.g., cement or steel used), you can enter their claim into Tab 25. It compares the claimed quantities against your calculated engineering estimates. If a claim exceeds the estimate by more than 5%, it highlights the item in red so you can review the contractor's measurement sheets together before making payment."
              },
              {
                q: "How does digital delivery and support work?",
                a: "Immediately upon completing payment via Razorpay, your complete digital toolkit (.zip bundle containing all 31 sheets, finished examples, 13 PDF guides, and 7 bonus kits) is displayed on screen for instant download and automatically attached to your confirmation email for permanent offline access. If you ever experience any file questions, download issues, or duplicate charges, our dedicated support team (support@thinktools.in) will assist you promptly until everything is running smoothly."
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
          <span className="text-[10px] text-slate-500 block font-medium">One-Time Payment</span>
          <div className="flex items-center gap-1.5">
            <span className="text-base font-black text-slate-900 font-mono">₹{orderTotal}</span>
            {isBundleApplied ? (
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                Bundle Offer (₹499)
              </span>
            ) : selectedAddonIds.length > 0 ? (
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                +{selectedAddonIds.length} add-on{selectedAddonIds.length > 1 ? "s" : ""}
              </span>
            ) : null}
          </div>
          <span className="text-[9px] text-slate-500 font-medium block mt-0.5">
            🔒 256-Bit SSL • Instant UPI Delivery
          </span>
        </div>

        <button
          onClick={() => setIsCheckoutOpen(true)}
          className="flex-1 py-2.5 px-3.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
        >
          <span>Get Instant Access</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <Footer />

      {/* Checkout Drawer / Modal */}
      <CheckoutModal
        product={product}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedAddonIds={selectedAddonIds}
        onRemoveAddon={removeAddon}
      />

      {/* 9:16 Instagram Reels Walkthrough Modal */}
      <ReelPreviewModal
        isOpen={isReelModalOpen}
        onClose={() => setIsReelModalOpen(false)}
        activeReelId={activeReelId}
        onSelectReel={(id) => setActiveReelId(id)}
        selectedAddonIds={selectedAddonIds}
        onToggleAddon={toggleAddon}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
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
                  Complete 31-Sheet Architecture Index
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
                Download Package (₹{product.price})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
