"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  CheckCircle,
  FileSpreadsheet,
  Download,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2,
  ChevronDown,
  X,
  Layers,
  XCircle,
  Check,
  Plus,
  Play,
  Star,
  BadgeCheck,
  ArrowLeftRight,
  ShieldAlert,
  Smartphone,
  Eye,
  SlidersHorizontal,
  FileCheck2,
  HelpCircle
} from "lucide-react";
import {
  PRODUCTS,
  ADDON_PRODUCTS,
  HOMEOWNER_ADDON_IDS,
  REEL_VIDEOS
} from "@/data/products";
import { SHOW_AGGREGATE_STATS, SHOW_TESTIMONIALS } from "@/config/landingConfig";
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

const SheetCatalogModal = dynamic(() => import("@/components/SheetCatalogModal"), {
  ssr: false,
});

export default function HomeownerMobileLanding() {
  const product = PRODUCTS["construction-calculator-pro"];
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSheetModalOpen, setIsSheetModalOpen] = useState(false);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [isReelModalOpen, setIsReelModalOpen] = useState(false);
  const [activeReelId, setActiveReelId] = useState("main-calculator");

  const openReel = (id: string) => {
    setActiveReelId(id);
    setIsReelModalOpen(true);
  };

  const isBundleApplied = selectedAddonIds.length >= 3;
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
      setSelectedAddonIds(HOMEOWNER_ADDON_IDS);
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
      content_name: `${product.title} (Homeowner Edition)`,
      content_ids: [product.id],
      content_type: "product",
      value: product.price,
      currency: "INR",
    });

    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("bundle") === "true") {
        setSelectedAddonIds(HOMEOWNER_ADDON_IDS);
      }
      if (urlParams.get("checkout") === "true") {
        setIsCheckoutOpen(true);
      }
    }
  }, [product.title, product.id, product.price]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const siteReviews = [
    {
      name: "Karthik Ramanathan",
      role: "Independent Homeowner",
      city: "Chennai, Tamil Nadu",
      rating: 5,
      highlight: "Saved ₹1.3L on steel quote",
      review: "My contractor quoted 11.2 tons of steel for our house. I plugged our slab spans into the steel calculator sheet and it showed around 9.1 tons with cutting wastage. Showed him the printout and we settled on 9.3 tons. That alone saved us over a lakh right at the foundation stage.",
    },
    {
      name: "Abhishek Verma",
      role: "IT Professional / Homebuilder",
      city: "Lucknow, Uttar Pradesh",
      rating: 5,
      highlight: "Stopped blind contractor overbilling",
      review: "Every few days the supervisor on site was asking for '50 bags cement aur mangwao'. The plaster calculation sheet helped me cross-check the actual wall area and mix ratios. Found out he had ordered 30 bags extra. Huge peace of mind when managing construction alongside an IT job.",
    },
    {
      name: "Venkat Rao & Sravani",
      role: "First-time House Builders",
      city: "Hyderabad, Telangana",
      rating: 5,
      highlight: "Caught 21 missing cement bags",
      review: "The contractor bill check sheet flagged our cement billing. The contractor billed 195 bags of OPC, but the sheet calculated 172 bags maximum for that slab area. We counted the empty sacks on site and found a clear discrepancy of 21 bags before releasing payment.",
    },
    {
      name: "Arunachalam & Priya",
      role: "Working Couple",
      city: "Bengaluru, Karnataka",
      rating: 5,
      highlight: "Prevented ₹34,000 tile markup",
      review: "Our contractor asked us to buy 45 extra boxes of Italian finish tiles for 'cutting wastage'. We calculated room by room using the tile sheet and found 14 extra boxes was more than enough. Saved around ₹34,000 on tile purchases alone.",
    },
    {
      name: "George Thomas",
      role: "NRI Homeowner",
      city: "Kochi, Kerala (Remote from Dubai)",
      rating: 5,
      highlight: "Caught defects before final payout",
      review: "Building a home in Kochi while working in Dubai is stressful because you rely entirely on WhatsApp photos. The handover checklist helped my brother inspect the finishing work and identify hollow tile patches before releasing the final retention payment.",
    },
    {
      name: "Gaurav Mehta",
      role: "Apartment Renovation",
      city: "Mumbai, Maharashtra",
      rating: 5,
      highlight: "Zero tile & paint wastage excess",
      review: "We renovated our 2BHK in Andheri. The pre-filled renovation example gave us the exact box count for 2x2 vitrified tiles including cutting wastage. This kept the order tight and we had almost zero leftover tiles.",
    },
  ];

  const loopedReviews = [...siteReviews, ...siteReviews];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col selection:bg-amber-500 selection:text-slate-950 font-sans antialiased">
      {/* 1. FOCUSED HEADER */}
      <Header
        isFocusMode={true}
        productTitle="Construction Calculator Pro (Homeowner Edition)"
        price={orderTotal}
        onCtaClick={() => setIsCheckoutOpen(true)}
      />

      {/* 2. TOP URGENCY / VALUE BANNER */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 py-1.5 px-3 text-center text-[10px] sm:text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 fill-current shrink-0" />
        <span className="leading-tight">
          ⚡ HOMEOWNER LAUNCH OFFER: ₹299/- (Regular ₹999/-) • 38 CONNECTED SHEETS • LIFETIME ACCESS
        </span>
      </div>

      <main className="flex-1 pb-24 sm:pb-16">
        {/* 3. MOBILE-OPTIMIZED HERO */}
        <section className="relative pt-4 pb-6 sm:pt-8 sm:pb-12 px-3.5 sm:px-6 max-w-5xl mx-auto">
          {/* Persona Switch / Audience Badge */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-[11px] font-bold">
              <span>🏡</span>
              <span>Homeowner Edition</span>
            </span>
            <Link
              href="/p/construction-calculator-pro/contractor"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-amber-700 transition-colors"
            >
              <span>Are you a contractor?</span>
              <span className="underline font-bold">Switch →</span>
            </Link>
          </div>

          {/* Social Proof Badge */}
          <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200/90 px-3 py-1 rounded-full text-[11px] font-semibold text-amber-950 mb-3">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span><strong>4.9 / 5</strong> from 250+ Indian Homeowners</span>
          </div>

          {/* Primary Mobile Headline */}
          <h1 className="text-[25px] min-[380px]:text-[29px] sm:text-4xl lg:text-[44px] font-black text-slate-950 tracking-tight leading-[1.18]">
            Building Your Dream House?{" "}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent block mt-1">
              Never Overpay Your Contractor Again.
            </span>
          </h1>

          {/* Mobile Subtitle */}
          <p className="text-xs min-[380px]:text-[13px] sm:text-base text-slate-600 leading-relaxed mt-2.5">
            Know the exact cement bags, steel rebar, bricks &amp; tiles required before concrete is poured. Audit contractor running bills in 5 minutes with zero engineering experience.
          </p>

          {/* 3-Minute Demo Video Hero Card (Mobile-First Tap Target) */}
          <div className="mt-4 p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 text-white shadow-xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[10px] font-black uppercase">
                    3-Min Demo Video
                  </span>
                  <span className="text-[11px] text-slate-400">See 38 Sheets in Action</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Watch How an IT Professional or Homebuilder Uses This
                </h3>
              </div>

              <button
                type="button"
                onClick={() => openReel("main-calculator")}
                className="animate-blink-glow w-full sm:w-auto py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm border-2 border-amber-300 shadow-md shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] shrink-0"
              >
                <div className="w-5 h-5 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 fill-amber-400 ml-0.5" />
                </div>
                <span>Play 3-Minute Video Demo</span>
                <span className="relative flex h-2 w-2 shrink-0 ml-0.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
                </span>
              </button>
            </div>

            {/* Quick Feature Badges inside Hero Card */}
            <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] sm:text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>38 Connected Sheets</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>4 Ready Starter Plans</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>IS &amp; CPWD Norms</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Works on Phone &amp; PC</span>
              </div>
            </div>
          </div>

          {/* Primary Call To Action (Mobile Thumb-Zone) */}
          <div className="mt-4 space-y-2">
            <button
              id="btn-hero-cta"
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm sm:text-base tracking-wide shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              <span>Get Homeowner Toolkit (₹{product.price})</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* UPI Badges */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-0.5">
              <span className="font-semibold text-slate-600">Instant UPI:</span>
              <span className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-bold text-slate-700">GPay</span>
              <span className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-bold text-purple-700">PhonePe</span>
              <span className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-bold text-sky-700">Paytm</span>
              <span className="text-[10px] text-slate-400">+ Cards &amp; NetBanking</span>
            </div>
          </div>
        </section>

        {/* 4. THE 3 EXPENSIVE CONTRACTOR TRAPS (PAIN POINT AGITATION FOR HOMEOWNERS) */}
        <section className="py-7 bg-white border-y border-slate-200 px-3.5 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-5">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-rose-800 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full inline-block">
                Common Site Leakages
              </span>
              <h2 className="text-lg sm:text-2xl font-black text-slate-950 mt-1.5">
                The 3 Traps That Cost Homeowners ₹1L–₹3L
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                When you don’t have your own calculation sheet, you are at the mercy of rough contractor estimates.
              </p>
            </div>

            <div className="space-y-3">
              {/* Trap 1 */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-base shrink-0 mt-0.5">
                  1
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    The Blind "50 Bags Cement Mangwao" Call
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-snug">
                    Contractors frequently order 15-20% extra cement and steel for "safety", which gets wasted, spoiled in rain, or pilfered.
                  </p>
                  <p className="text-[11px] text-emerald-700 font-bold mt-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Our tool calculates exact bag count and rebar tonnage from your slab area.</span>
                  </p>
                </div>
              </div>

              {/* Trap 2 */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-base shrink-0 mt-0.5">
                  2
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    The Running Bill Ambush
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-snug">
                    A contractor hands you a handwritten ₹4.5 Lakh bill on Saturday evening demanding payment before Monday work resumes.
                  </p>
                  <p className="text-[11px] text-emerald-700 font-bold mt-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Tab 35 (Bill Audit) lets you cross-check billed quantities against actual site measurements in minutes.</span>
                  </p>
                </div>
              </div>

              {/* Trap 3 */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-base shrink-0 mt-0.5">
                  3
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    Finishing Cost Shock (Tiles, Paint &amp; Bathrooms)
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-snug">
                    Over-ordering premium vitrified tiles and Italian marble leaves homeowners with 15-20 leftover boxes that stores refuse to take back.
                  </p>
                  <p className="text-[11px] text-emerald-700 font-bold mt-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Room-by-room tile box calculator accounts for exact cutting wastage with zero leftover excess.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. HOW IT WORKS (SIMPLE 3-STEP MOBILE WALKTHROUGH) */}
        <section className="py-7 px-3.5 sm:px-6 max-w-4xl mx-auto">
          <div className="text-center mb-5">
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block">
              Zero Engineering Needed
            </span>
            <h2 className="text-lg sm:text-2xl font-black text-slate-950 mt-1.5">
              How Any Homeowner Can Use This in 3 Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Step 1 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center mb-2">
                1
              </div>
              <h3 className="text-sm font-bold text-slate-950">Enter Dimensions in Yellow Cells</h3>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                Pick a ready starter plan (2BHK, 3BHK, Villa) or type your plot &amp; room dimensions. Choose Feet-Inches or Metres with 1 click.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center mb-2">
                2
              </div>
              <h3 className="text-sm font-bold text-slate-950">Set Local Material Rates</h3>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                Put your local cement bag rate (e.g. ₹380), TMT steel per kg, sand per cft, and brick rate. All 38 sheets recalculate automatically.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center mb-2">
                3
              </div>
              <h3 className="text-sm font-bold text-slate-950">Green Cells Auto-Calculate</h3>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                Get full concrete, steel, mortar, brick, and tile quantities instantly. Print clean PDF summary to audit contractor running bills.
              </p>
            </div>
          </div>
        </section>

        {/* 6. INTERACTIVE SPREADSHEET PREVIEW & 38-SHEET INSPECTOR */}
        <section className="py-7 bg-white border-y border-slate-200 px-3.5 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-4">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block">
                Master 38-Sheet System
              </span>
              <h2 className="text-lg sm:text-2xl font-black text-slate-950 mt-1.5">
                Everything Included In The Master Toolkit
              </h2>
            </div>

            <div className="relative">
              <CalculatorGallery />
            </div>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setIsSheetModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm border border-slate-700 shadow-sm transition-all cursor-pointer"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span>Inspect All 38 Sheets, Inputs &amp; Formulas</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </section>

        {/* 7. HOMEOWNER COMPANION ADD-ONS (₹99 EACH) & 4-IN-1 BUNDLE */}
        <section id="business-tools" className="py-7 px-3.5 sm:px-6 max-w-5xl mx-auto">
          <div className="text-center mb-5">
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block">
              Tailored For Homeowners • ₹99 Each
            </span>
            <h2 className="text-lg sm:text-2xl font-black text-slate-950 mt-1.5">
              3 Essential Companion Tools For Your House Construction
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Add these specialized workbooks to track every rupee spent, schedule payments safely, and verify on-site quality.
            </p>
          </div>

          {/* 4-IN-1 BUNDLE PROMO BANNER */}
          <div className="mb-4 rounded-2xl bg-gradient-to-r from-amber-50 via-white to-emerald-50 border-2 border-amber-400 p-3.5 sm:p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5 text-left">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-black text-[10px] uppercase">
                    ⚡ 4-IN-1 BUNDLE
                  </span>
                  <span className="text-emerald-700 font-bold text-xs font-mono">
                    Save ₹1,397 (74% OFF)
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-slate-950">
                  Construction Calculator Pro + All 3 Homeowner Tools (₹499)
                </h3>
                <p className="text-[11px] text-slate-500">
                  Individual price: ₹596 • Bundle price: ₹499 (Save an extra ₹97 • ₹1,896 retail value)
                </p>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-slate-200/60">
                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-400 line-through font-mono block">₹1,896</span>
                  <span className="text-lg font-black text-slate-950 font-mono">₹499</span>
                </div>
                <button
                  type="button"
                  onClick={toggleBundle}
                  className={`py-2 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shadow-xs ${
                    isBundleApplied
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20"
                  }`}
                >
                  {isBundleApplied ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Bundle Selected</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Select 4-in-1 Bundle</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* 3 HOMEOWNER ADDON CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {HOMEOWNER_ADDON_IDS.map((id) => ADDON_PRODUCTS[id]).filter(Boolean).map((addon) => {
              const isSelected = selectedAddonIds.includes(addon.id);
              return (
                <div
                  key={addon.id}
                  className={`rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between transition-all border bg-white ${
                    isSelected
                      ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-md"
                      : "border-slate-200 hover:border-slate-300 shadow-2xs"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase text-amber-900 bg-amber-100/70 border border-amber-200/80 px-2 py-0.5 rounded">
                        {addon.badge || "Homeowner Workbook"}
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[10px] text-slate-400 font-semibold uppercase">Add-on:</span>
                        <span className="text-sm font-black font-mono text-slate-900">₹{addon.price}</span>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-slate-950 leading-snug">{addon.title}</h3>

                    <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                      {addon.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-snug text-[11px]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? "bg-emerald-600 hover:bg-rose-600 text-white"
                          : "bg-slate-900 hover:bg-slate-800 text-white shadow-xs"
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Added (+₹99) · Tap to Remove</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Package (+₹99)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 8. REAL HOMEOWNER REVIEWS */}
        {SHOW_TESTIMONIALS && (
        <section className="py-7 bg-[#0a0f16] text-white border-y border-slate-800 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-3.5 sm:px-6 relative z-10 mb-4 text-center">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-[10px] uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3" />
              <span>Real Homeowner Experiences</span>
            </span>
            <h2 className="text-lg sm:text-2xl font-black text-white">
              Trusted by 250+ Homebuilders Across India
            </h2>
          </div>

          {/* Marquee Track */}
          <div className="relative w-full overflow-hidden py-1">
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#0a0f16] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#0a0f16] to-transparent z-20 pointer-events-none" />

            <div className="animate-marquee gap-3 pr-3">
              {loopedReviews.map((rev, idx) => (
                <div
                  key={idx}
                  className="w-[270px] sm:w-[320px] shrink-0 bg-slate-900/95 border border-slate-800 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.2 rounded-full">
                        <BadgeCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                        Verified
                      </span>
                    </div>

                    <div className="mb-1">
                      <span className="inline-block px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 font-bold text-[10px]">
                        ★ {rev.highlight}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed italic line-clamp-4">
                      &ldquo;{rev.review}&rdquo;
                    </p>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-800/80">
                    <div className="font-bold text-xs text-white truncate">{rev.name}</div>
                    <p className="text-[10px] text-slate-400 truncate">
                      {rev.role} • <span className="text-slate-300">{rev.city}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* 9. PRICING & OFFER SUMMARY */}
        <section className="py-6 px-3.5 sm:px-6 max-w-xl mx-auto">
          <div className="rounded-2xl bg-white border-2 border-amber-400 p-4 sm:p-5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-black text-[9px] uppercase px-2.5 py-0.5 rounded-bl-xl">
              {isBundleApplied ? "4-in-1 Homeowner Bundle" : "Special Launch Offer"}
            </div>

            <div className="text-center pb-3 border-b border-slate-100">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                Instant Download • Zero Subscriptions • Lifetime Access
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-950 mt-0.5">
                {isBundleApplied
                  ? "Construction Calculator Pro + Homeowner 4-in-1 Bundle"
                  : selectedAddonIds.length > 0
                  ? `Construction Calculator Pro + ${selectedAddonIds.length} Companion Tool${selectedAddonIds.length > 1 ? "s" : ""}`
                  : "Construction Calculator Pro (Homeowner Package)"}
              </h3>

              <div className="mt-2 flex items-center justify-center gap-2.5">
                <span className="text-sm font-bold text-slate-400 line-through">
                  ₹{isBundleApplied ? 1896 : 999}
                </span>
                <span className="text-2xl sm:text-3xl font-black text-slate-950 font-mono">
                  ₹{orderTotal}/-
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] uppercase tracking-wide">
                  {isBundleApplied ? "74% OFF" : "70% OFF"}
                </span>
              </div>
            </div>

            {/* Value checklist */}
            <div className="py-3 space-y-1.5 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>38 Connected Sheets (.xlsx) with zero macros</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>4 Ready Plans (2BHK, 3BHK, Villa, Renovation)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{isBundleApplied ? "All 3 Homeowner Companion Workbooks Included" : "13 PDF Implementation Guides + 7 Checklists"}</span>
              </div>
            </div>

            <button
              id="btn-pricing-cta"
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>
                {isBundleApplied
                  ? `Get 4-in-1 Bundle (₹${orderTotal})`
                  : `Get Homeowner Package (₹${orderTotal})`}
              </span>
            </button>

            {/* Trust line */}
            <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2 text-[10px] text-slate-500 text-center">
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Instant UPI &amp; Cards (GPay, PhonePe, Paytm)
              </span>
              <span>•</span>
              <span className="text-slate-600 font-medium">
                Email Backup + WhatsApp Receipt
              </span>
            </div>
          </div>
        </section>

        {/* 10. FREQUENTLY ASKED QUESTIONS */}
        <section className="py-6 px-3.5 sm:px-6 max-w-2xl mx-auto">
          <div className="text-center mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-950">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-2">
            {[
              {
                q: "Can I use this on my phone or do I need a computer?",
                a: "You can view and use this on both. The file is a standard unlocked Microsoft Excel (.xlsx) workbook. You can open and edit it in the free Microsoft Excel app on your Android or iPhone, or open it on any Windows or Mac laptop or PC."
              },
              {
                q: "I don't have civil engineering knowledge. Can I understand it?",
                a: "Yes! The workbook was built specifically with a 'Beginner Mode'. Yellow cells indicate where to enter your room dimensions; green cells calculate the quantities automatically. Every single sheet includes plain-English notes with zero engineering jargon."
              },
              {
                q: "How does this prevent contractor overbilling?",
                a: "Contractors often ask for '50 bags extra cement' or inflate steel tonnage. With this tool, you calculate the theoretical engineering quantity according to Indian standards (IS 456 & CPWD). When a running bill is presented, you simply check if the billed bags match actual work done."
              },
              {
                q: "Does it support Feet & Inches?",
                a: "Yes. In Quick Start & Setup, a single cell lets you toggle between Feet-Inches and Metres. Lengths, room areas, concrete volumes, rebar weight, and brick counts adapt immediately across all 38 sheets."
              },
              {
                q: "How do I receive my download after payment?",
                a: "Immediately upon completing payment via UPI (GPay, PhonePe, Paytm) or cards, your complete digital toolkit (.zip bundle) appears on screen for instant download, and a permanent backup link is automatically emailed to you."
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-3 text-left font-semibold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-2 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                      openFaq === idx ? "rotate-180 text-amber-600" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-3 pb-3 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2 bg-slate-50/70">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 11. FIXED MOBILE BOTTOM STICKY BAR (THUMB CONVERSION) */}
      <div className="fixed bottom-0 inset-x-0 z-30 p-2 sm:p-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] bg-white/95 backdrop-blur-md border-t border-slate-200 sm:hidden flex items-center justify-between gap-2 shadow-lg">
        <div className="shrink-0 min-w-0 pr-1">
          <span className="text-[9px] text-slate-500 block font-medium">One-Time Payment</span>
          <div className="flex items-center gap-1.5">
            <span className="text-base font-black text-slate-900 font-mono">₹{orderTotal}</span>
            {isBundleApplied ? (
              <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                4-in-1 Bundle
              </span>
            ) : selectedAddonIds.length > 0 ? (
              <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                +{selectedAddonIds.length} tool{selectedAddonIds.length > 1 ? "s" : ""}
              </span>
            ) : (
              <span className="text-[9px] text-slate-400 line-through">₹999</span>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsCheckoutOpen(true)}
          className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/25 cursor-pointer whitespace-nowrap active:scale-[0.98] transition-transform"
        >
          <span>Get Instant Access</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] shrink-0" />
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
        onToggleAddon={toggleAddon}
        onToggleBundle={toggleBundle}
        onWatchDemo={openReel}
        targetAudience="homeowner"
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

      {/* 38-Tab Detailed Inspection Modal */}
      <SheetCatalogModal
        isOpen={isSheetModalOpen}
        onClose={() => setIsSheetModalOpen(false)}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        sheets={product.workbookSheets}
        price={product.price}
      />
    </div>
  );
}
