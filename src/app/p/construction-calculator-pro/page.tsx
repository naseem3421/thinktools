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

    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("bundle") === "true") {
        setSelectedAddonIds(Object.keys(ADDON_PRODUCTS));
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
      highlight: "Saved ₹1.3L on rebar quote",
      review: "My contractor quoted 11.2 tons of steel for our house. I plugged our slab spans into the steel calculator sheet and it showed around 9.1 tons with cutting wastage. Showed him the printout and we settled on 9.3 tons. That alone saved us over a lakh right at the foundation stage.",
    },
    {
      name: "Er. Suresh Patil",
      role: "Civil Contractor",
      city: "Pune, Maharashtra",
      rating: 5,
      highlight: "Closes client quotes in 24 hours",
      review: "As a contractor in Pune, clients used to argue over rough diary estimates. Now I enter the room measurements, put in current local material rates, and hand them a neat professional quote summary. Gives clients confidence and deals close much faster without back-and-forth.",
    },
    {
      name: "Abhishek Verma",
      role: "IT Professional / Homebuilder",
      city: "Lucknow, Uttar Pradesh",
      rating: 5,
      highlight: "Stopped blind contractor overbilling",
      review: "Every few days the supervisor on site was asking for '50 bags cement aur mangwao'. The plaster calculation sheet helped me cross-check the actual wall area and mix ratios. Found out he had ordered 30 bags extra. Huge peace of mind when you're managing construction alongside an IT job.",
    },
    {
      name: "Venkat Rao & Sravani",
      role: "First-time House Builders",
      city: "Hyderabad, Telangana",
      rating: 5,
      highlight: "Caught 21 missing cement bags",
      review: "The contractor bill check sheet flagged our cement billing. The contractor billed 195 bags of OPC, but the sheet calculated 172 bags maximum for that slab area. We counted the empty sacks on site and found a clear discrepancy of 21 bags. Caught it before releasing payment.",
    },
    {
      name: "Gaurav Mehta",
      role: "Apartment Renovation",
      city: "Mumbai, Maharashtra",
      rating: 5,
      highlight: "Zero tile & paint wastage excess",
      review: "We renovated our 2BHK in Andheri. The pre-filled renovation example gave us the exact box count for 2x2 vitrified tiles including cutting wastage. Our thekedar usually adds 15-20% extra boxes on his own; this sheet kept the order tight and we had almost zero leftover tiles.",
    },
    {
      name: "R. Murugesan",
      role: "Senior Site Supervisor",
      city: "Coimbatore, Tamil Nadu",
      rating: 5,
      highlight: "Feet & Inches unit toggle",
      review: "Most residential drawings in Tamil Nadu are in feet and inches, but steel rebar is billed in kilograms or tons. The unit toggle handles that without breaking formulas. The steel calculations match standard site practice. Handy reference even for our junior site engineers.",
    },
    {
      name: "Deepak Sharma",
      role: "Independent Home Builder",
      city: "Jaipur, Rajasthan",
      rating: 4,
      highlight: "Clean Excel with zero macros",
      review: "Takes about 15 minutes to navigate all 31 tabs initially, but the master rate sheet makes it worth it. In Jaipur our brick and aggregate rates change every few months, so updating local rates once and having the entire project re-calculate automatically is very convenient.",
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
      review: "Building a home in Kochi while working in Dubai is stressful because you rely entirely on WhatsApp photos. The handover checklist helped my brother inspect the finishing work and identify hollow tile patches before we released the contractor's final retention payment.",
    },
    {
      name: "Anand Joshi",
      role: "Civil Contractor",
      city: "Ahmedabad, Gujarat",
      rating: 5,
      highlight: "Dispute-free Saturday wage payout",
      review: "The labour attendance and wage sheet replaced our physical site register. Every Saturday evening when we pay weekly mistri and coolie wages, attendance and daily advances are already tallied up. Saves at least an hour of headache every weekend.",
    },
  ];

  const loopedReviews = siteReviews;

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
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 py-1.5 px-3 text-center text-[10px] sm:text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 fill-current shrink-0" />
        <span className="leading-tight">
          🚀 SPECIAL LAUNCH: ₹299/- (Regular ₹999/-) • INSTANT ON-SCREEN DOWNLOAD + EMAIL ATTACHMENT • 100% UNLOCKED EXCEL
        </span>
      </div>

      <main className="flex-1 pb-16 sm:pb-0">
        {/* 1. HERO SECTION */}
        <section className="relative pt-5 pb-8 sm:pt-8 sm:pb-12 overflow-hidden bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:32px_32px]">
          <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 lg:gap-8 items-center">
              {/* Left Column: Emotion, Logic & Pricing Hook */}
              <div className="lg:col-span-6 space-y-3 sm:space-y-4 text-center lg:text-left">
                {/* Standards Authority Pill */}
                <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 border-2 border-amber-500/70 text-xs text-slate-900 shadow-xs">
                  <span className="flex items-center gap-1.5 font-black text-amber-950 uppercase tracking-wide text-[11px] sm:text-xs">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse inline-block" />
                    👷 Built by a Civil Engineer (10+ Years On-Site)
                  </span>
                  <span className="text-amber-400 font-bold hidden sm:inline">•</span>
                  <span className="font-bold text-slate-800 text-[11px] sm:text-xs">
                    Uses relevant IS &amp; CPWD norms
                  </span>
                  <span className="text-amber-400 font-bold hidden sm:inline">•</span>
                  <span className="text-amber-900 font-bold text-[11px] sm:text-xs">
                    31 Connected Sheets
                  </span>
                </div>

                {/* Primary Headline */}
                <h1 className="text-2xl min-[380px]:text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-950 tracking-tight leading-[1.15]">
                  Build a Home. Renovate a Flat. Quote a Client.{" "}
                  <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent block mt-1 text-lg min-[380px]:text-xl sm:text-2xl lg:text-3xl">
                    Plan Costs and Materials Before You Spend a Single Rupee.
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  <strong className="text-slate-900 font-semibold block mb-0.5">
                    The all-in-one Excel estimation system calibrated for Indian site realities:
                  </strong>
                  Estimate cement, steel, sand and tiles before work starts. Built to help home builders check bills against their own estimate, flat renovators plan their finishes, and small contractors prepare itemized quotes faster.
                </p>

                {/* Watch 60-Second Demo Button - Placed ABOVE Home Builders for instant mobile visibility */}
                <div className="pt-1 pb-0.5 flex justify-center lg:justify-start">
                  <button
                    type="button"
                    onClick={() => openReel("main-calculator")}
                    className="animate-blink-glow w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-2.5 sm:py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs min-[360px]:text-sm sm:text-base border-2 border-amber-300 shadow-md shadow-amber-500/25 transition-all cursor-pointer group hover:scale-[1.02]"
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                      <Play className="w-3 h-3 fill-amber-400 ml-0.5" />
                    </span>
                    <span className="tracking-tight">Watch 60-Second Demo</span>
                    <span className="relative flex h-2.5 w-2.5 shrink-0 ml-0.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
                    </span>
                  </button>
                </div>

                {/* 3 Focused Use Cases */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-left pt-0.5">
                  <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-2xs">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                      <span>🏡</span>
                      <span>Home Builders</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                      Exact cement, steel &amp; brick takeoff. Audit contractor running bills before releasing payment.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-2xs">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                      <span>🔨</span>
                      <span>Flat Renovators</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                      Room-by-room tile box counts, paint liters &amp; bath remodel costs with zero excess waste.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-2xs">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                      <span>📐</span>
                      <span>Small Contractors</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                      Itemized client BOQs in 15 mins, exact site wastage factors &amp; dispute-free billing.
                    </p>
                  </div>
                </div>

                {/* Micro-Value Pill */}
                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs text-emerald-900 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>One-time payment provides a structured estimation framework for your project</span>
                </div>

                {/* Action CTA Group */}
                <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
                  <button
                    id="btn-hero-cta"
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs min-[360px]:text-sm sm:text-base shadow-lg shadow-amber-500/25 transition-all hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>Get Instant Access (₹{product.price})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* UPI & Instant Payment Strip */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 pt-0.5 text-xs text-slate-500">
                  <span className="font-semibold text-slate-600 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Instant Unlock with UPI:
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-bold text-slate-700">GPay</span>
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-bold text-purple-700">PhonePe</span>
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-bold text-sky-700">Paytm</span>
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-bold text-emerald-700">BHIM</span>
                  <span className="text-[10px] text-slate-400 font-medium">+ Cards &amp; NetBanking</span>
                </div>

                {/* Trust Signals */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-[11px] text-slate-500 pt-0.5">
                  <span className="flex items-center gap-1 font-medium">
                    <Mail className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Instant Email Delivery
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Laptop className="w-3.5 h-3.5 text-blue-600 shrink-0" /> Built for Microsoft Excel
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Sliders className="w-3.5 h-3.5 text-amber-600 shrink-0" /> Feet/Inches &amp; Metres
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Dedicated Support
                  </span>
                </div>
              </div>

              {/* Right Column: Calculator Gallery */}
              <div className="lg:col-span-6 flex flex-col items-center">
                <div className="w-full">
                  <div className="mb-2.5 flex items-center justify-between text-xs px-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-black text-[11px] shadow-sm">
                      <BadgeCheck className="w-4 h-4 stroke-[2.5]" />
                      <span>BUILT BY A CIVIL ENGINEER • UNLOCKED EXCEL</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      31 Connected Tabs
                    </span>
                  </div>

                  <CalculatorGallery onUnlockClick={() => setIsCheckoutOpen(true)} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. THE REALITY OF BUILDING & RENOVATING IN INDIA: WITHOUT VS WITH */}
        <section className="py-7 sm:py-10 bg-slate-50/60 border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-3.5 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-7">
              <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                Why Budgets Spiral
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-950 mt-1.5 tracking-tight">
                Building or Renovating in India? Guessing vs. Disciplined Control
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
              {/* Without Thinktools */}
              <div className="bg-rose-50/50 border-2 border-rose-200 rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                    <div className="w-8 h-8 rounded-xl bg-rose-100 border border-rose-300 text-rose-700 flex items-center justify-center font-bold shrink-0">
                      <XCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">Without a Structured System</h3>
                      <span className="text-[11px] text-rose-700 font-semibold font-mono">The Costly Site Trap</span>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-700">
                    <div className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold shrink-0">✕</span>
                      <span><strong>Vague Lump-Sum Quotes:</strong> Unitemized sq.ft rates that are hard to compare and can grow midway through construction.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold shrink-0">✕</span>
                      <span><strong>Blind Material Ordering:</strong> Guessing cement, sand &amp; steel causes excess waste, material shortfalls and extra expenses.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold shrink-0">✕</span>
                      <span><strong>Unverified Running Bills:</strong> Bills skip opening deductions (doors/windows), and can overbill for work that was not done.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold shrink-0">✕</span>
                      <span><strong>Surprise Handover Variations:</strong> Unrecorded verbal changes lead to disputes and extra charges right before possession.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-rose-200/80 text-[11px] font-bold text-rose-800 text-center">
                  Common Outcome: Budget exhaustion, stressful disputes, and delayed handover
                </div>
              </div>

              {/* With Construction Calculator Pro */}
              <div className="bg-emerald-50/50 border-2 border-emerald-300 rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-md relative">
                <div className="absolute top-3 right-3 bg-emerald-600 text-white font-bold text-[9px] uppercase px-2.5 py-0.5 rounded-full shadow-2xs">
                  Disciplined Control
                </div>

                <div>
                  <div className="flex items-center gap-2.5 mb-3 sm:mb-4 pr-24">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">With Construction Calculator Pro</h3>
                      <span className="text-[11px] text-emerald-800 font-semibold font-mono block">CPWD &amp; IS Code Aligned Toolkit</span>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-700">
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                      <span><strong>Itemized Pre-Build Takeoff:</strong> Exact theoretical cement, steel rebar (IS 1786), sand &amp; bricks before signing.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                      <span><strong>Automated 5% Variance Flag:</strong> Tab 25 cross-checks bills against norms and red-flags claims &gt;5%.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                      <span><strong>1-Click Dual Unit Toggle:</strong> Switch instantly between Feet/Inches and Metric (Metres/mm) without formula breaks.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                      <span><strong>100% Unlocked Excel:</strong> Permanent offline access, zero macros, no passwords, and zero subscriptions.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                  <span className="text-xs font-bold text-emerald-900 text-center sm:text-left">31 Connected Sheets · Complete Suite</span>
                  <button
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full sm:w-auto py-2 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer transition-all whitespace-nowrap"
                  >
                    <span>Get Instant Access</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* COMPARISON: GENERIC TEMPLATE VS CIVIL ENGINEER BUILT */}
            <div className="mt-8 sm:mt-10 bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs">
              <div className="text-center max-w-xl mx-auto mb-5 sm:mb-6">
                <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                  Side-By-Side Comparison
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-950 mt-1.5">
                  Free Templates vs. Civil Engineer Built Toolkit
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse min-w-[540px]">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-3 px-3 sm:px-4 text-slate-500 font-semibold w-1/3">Feature / Capability</th>
                      <th className="py-3 px-3 sm:px-4 text-rose-700 bg-rose-50/60 font-bold w-1/3 rounded-t-xl">
                        Many free templates
                      </th>
                      <th className="py-3 px-3 sm:px-4 text-emerald-800 bg-emerald-50/80 font-black w-1/3 rounded-t-xl border-2 border-emerald-400 border-b-0">
                        Construction Calculator Pro (Engineer Built)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-3 px-3 sm:px-4 font-semibold text-slate-900">Engineering Standards</td>
                      <td className="py-3 px-3 sm:px-4 text-rose-700 bg-rose-50/30">
                        ❌ Often generic guesswork; may not align with Indian codes
                      </td>
                      <td className="py-3 px-3 sm:px-4 text-emerald-900 bg-emerald-50/40 font-semibold border-x-2 border-emerald-400">
                        ✅ Built with reference to relevant IS and CPWD norms (see scope in the files)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 sm:px-4 font-semibold text-slate-900">Unit Flexibility</td>
                      <td className="py-3 px-3 sm:px-4 text-rose-700 bg-rose-50/30">
                        ❌ Often rigid single unit; formulas may break when mixing units
                      </td>
                      <td className="py-3 px-3 sm:px-4 text-emerald-900 bg-emerald-50/40 font-semibold border-x-2 border-emerald-400">
                        ✅ 1-Click toggle between Feet/Inches (Residential) &amp; Metres
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 sm:px-4 font-semibold text-slate-900">Site Wastage Margins</td>
                      <td className="py-3 px-3 sm:px-4 text-rose-700 bg-rose-50/30">
                        ❌ Often assumes 0% waste; can cause shortages &amp; site halts
                      </td>
                      <td className="py-3 px-3 sm:px-4 text-emerald-900 bg-emerald-50/40 font-semibold border-x-2 border-emerald-400">
                        ✅ Built-in 3–5% rebar cutting, 5–8% mortar &amp; tile buffers
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 sm:px-4 font-semibold text-slate-900">Contractor Bill Auditing</td>
                      <td className="py-3 px-3 sm:px-4 text-rose-700 bg-rose-50/30">
                        ❌ Often estimate only; may not cross-check running bills
                      </td>
                      <td className="py-3 px-3 sm:px-4 text-emerald-900 bg-emerald-50/40 font-semibold border-x-2 border-emerald-400">
                        ✅ 5% variance flag highlights bill items to review
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 sm:px-4 font-semibold text-slate-900">Excel Compatibility</td>
                      <td className="py-3 px-3 sm:px-4 text-rose-700 bg-rose-50/30 rounded-b-xl">
                        ❌ May rely on complex macros or password-locked cells
                      </td>
                      <td className="py-3 px-3 sm:px-4 text-emerald-900 bg-emerald-50/40 font-semibold border-2 border-emerald-400 border-t-0 rounded-b-xl">
                        ✅ Built for Microsoft Excel (Windows and Mac). No macros. Not for Google Sheets.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 3. THE "PAISA VASOOL" REALITY CHECK */}
        <section className="py-6 sm:py-8 bg-amber-500/10 border-y border-amber-200/80">
          <div className="max-w-5xl mx-auto px-3.5 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-5">
              <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider text-amber-900 bg-amber-200/80 border border-amber-300 px-2.5 py-0.5 rounded-full">
                Paisa Vasool Math
              </span>
              <h2 className="text-lg sm:text-2xl font-black text-slate-950 mt-1">
                Why ₹299 is a Small Part of Your Build (of a ₹15 lakh+ build)
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 text-center">
              <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-center">
                <span className="text-[11px] text-slate-500 block truncate">1 Cement Bag</span>
                <span className="text-sm sm:text-lg font-black text-slate-900 font-mono mt-0.5">₹420 – ₹440</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Used in 20 min</span>
              </div>
              <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-center">
                <span className="text-[11px] text-slate-500 block truncate">1 Family Dinner</span>
                <span className="text-sm sm:text-lg font-black text-slate-900 font-mono mt-0.5">₹800 – ₹1,200</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Gone in 1 evening</span>
              </div>
              <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-center">
                <span className="text-[11px] text-slate-500 block truncate">1 Day Supervisor</span>
                <span className="text-sm sm:text-lg font-black text-slate-900 font-mono mt-0.5">₹1,000 – ₹1,500</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Daily recurring cost</span>
              </div>
              <div className="bg-amber-500 text-slate-950 p-2.5 sm:p-3 rounded-xl border border-amber-400 shadow-md flex flex-col justify-center">
                <span className="text-[11px] font-bold block truncate">Construction Calculator Pro</span>
                <span className="text-sm sm:text-lg font-black font-mono mt-0.5">₹299 (one-time)</span>
                <span className="text-[10px] text-slate-900/80 font-semibold block mt-0.5">One-time payment</span>
              </div>
            </div>

            <p className="text-center text-xs text-slate-700 mt-3 sm:mt-4 max-w-2xl mx-auto leading-relaxed">
              💡 <strong>The bottom line:</strong> If it helps you spot even 10 extra bags of cement on a bill, that is already more than the price of the toolkit.
            </p>
          </div>
        </section>

        {/* 4. THE COMPLETE BUNDLE BOX: WHAT YOU RECEIVE */}
        <section className="py-7 sm:py-10 bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-3.5 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
              <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                Complete Deliverables Package
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-slate-950 mt-1.5">
                Complete Construction Toolkit Box
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5">
              {/* Deliverable 1 */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                      3 Excel Workbooks (.XLSX)
                    </span>
                    <span className="text-xs text-amber-700 font-semibold font-mono">Core Engines</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">31-Sheet Master + 2 Project Examples</h3>
                  <div className="mt-2.5 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Blank Master Engine:</strong> Clean 31-tab file ready for your new build.</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Chennai 3BHK Example:</strong> 1,500 sq ft pre-filled project with sample rates.</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Flat Renovation Example:</strong> 1,000 sq ft remodel template without foundation clutter.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-1.5">
                  <button
                    type="button"
                    onClick={() => openReel("main-calculator")}
                    className="w-full py-2 px-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-300 text-amber-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer group"
                  >
                    <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-2 h-2 fill-current ml-0.5" />
                    </span>
                    <span>Watch 60-Second Demo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsSheetModalOpen(true)}
                    className="w-full py-1.5 px-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5 text-amber-600" />
                    <span>Inspect All 31 Sheet Names &rarr;</span>
                  </button>
                </div>
              </div>

              {/* Deliverable 2 */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-blue-800 bg-blue-100/70 border border-blue-200 px-2 py-0.5 rounded font-bold">
                      13 PDF Guides &amp; Kits
                    </span>
                    <span className="text-xs text-blue-700 font-semibold font-mono">Execution Plan</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">Implementation Kit &amp; Worksheets</h3>
                  <div className="mt-2.5 space-y-1.5 text-xs text-slate-600">
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
                      <span><strong>5 Practical Exercises:</strong> Practice identifying quantity discrepancies.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-200 text-[11px] text-slate-500 font-mono">
                  Includes 43-page combined master guide
                </div>
              </div>

              {/* Deliverable 3 */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-amber-800 bg-amber-100/70 border border-amber-200 px-2 py-0.5 rounded font-bold">
                      7 Bonus Guides
                    </span>
                    <span className="text-xs text-amber-800 font-semibold font-mono">Included Resources</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">7 Contractor &amp; Quality Bonuses</h3>
                  <div className="mt-2.5 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>Contractor Hiring Kit:</strong> 15 interview questions &amp; numerical scoring sheet.</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>Material Quality Tests:</strong> Silt jar test for sand, cement week check, rebar ISI test.</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>Snag List &amp; 5 Scripts:</strong> 120-checkpoint inspection &amp; WhatsApp scripts.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-200 text-[11px] text-slate-500 font-medium flex items-center justify-between">
                  <span>Included in Master Toolkit</span>
                  <span className="font-semibold text-slate-700">7 Reference Files</span>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* 6. COMPLETE SITE OPERATIONS (ADD-ONS) */}
        <section id="business-tools" className="py-7 sm:py-10 bg-white text-slate-900 border-y border-slate-200 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-3.5 sm:px-6 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-7">
              <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block">
                Optional Companion Tools • ₹99 Each
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-950 mt-1.5">
                Complete Site Operations: Expenses, Labour &amp; Payments
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Essential companion Excel tools for <strong>Homeowners, Renovators &amp; Contractors</strong> to track daily supervisor petty cash, mistri/coolie wages, and contractor invoices.
              </p>
            </div>

            {/* 4-IN-1 BUNDLE PROMO BANNER */}
            <div className="mb-5 sm:mb-6 rounded-2xl bg-gradient-to-r from-amber-50 via-white to-emerald-50 border-2 border-amber-400/90 p-3.5 sm:p-4 shadow-2xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-0.5 text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-black text-[10px] uppercase">
                      ⚡ 4-IN-1 BUNDLE SAVINGS
                    </span>
                    <span className="text-emerald-700 font-bold text-xs font-mono">
                      Save ₹1,397 (74% OFF Total Value)
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-slate-950 tracking-tight">
                    Construction Calculator Pro + All 3 Essential Site Tools (₹499)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Individual tool price: ₹596 (Core toolkit + 3 site tools) • Bundle: ₹499 (Save an extra ₹97 • ₹1,896 total retail value)
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 line-through font-mono block">₹1,896</span>
                    <span className="text-lg sm:text-xl font-black text-slate-950 font-mono">₹499</span>
                  </div>
                  <button
                    type="button"
                    onClick={toggleBundle}
                    className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shadow-xs ${
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

            {/* 3 ADDON CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
              {Object.values(ADDON_PRODUCTS).map((addon) => {
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
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono font-bold uppercase text-amber-900 bg-amber-100/70 border border-amber-200/80 px-2 py-0.5 rounded">
                          {addon.badge || "Excel Tool"}
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Add-on:</span>
                          <span className="text-base font-black font-mono text-slate-900">₹{addon.price}</span>
                        </div>
                      </div>

                      <h3 className="text-sm font-bold text-slate-950 leading-snug">{addon.title}</h3>

                      <ul className="mt-2.5 space-y-1.5 text-xs text-slate-600">
                        {addon.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-snug text-[11px]">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-1.5">
                      <button
                        type="button"
                        onClick={() => openReel(addon.id)}
                        className="w-full py-1.5 px-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Play className="w-3 h-3 text-amber-600 fill-amber-500/30" />
                        <span>Watch 60-Second Demo</span>
                      </button>

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
                            <span>Add Tool (+₹99)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* STREAMLINED ORDER BAR */}
            <div className="mt-4 sm:mt-6 rounded-2xl bg-slate-50 border border-slate-200 p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-extrabold text-sm text-slate-900">Current Total: ₹{orderTotal}</span>
                  {isBundleApplied ? (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                      4-in-1 Bundle Active
                    </span>
                  ) : selectedAddonIds.length > 0 ? (
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                      +{selectedAddonIds.length} add-on{selectedAddonIds.length > 1 ? "s" : ""}
                    </span>
                  ) : null}
                </div>
                <p className="text-[11px] text-slate-500">
                  Instant on-screen delivery + permanent backup link sent to your email.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsCheckoutOpen(true)}
                className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <span>Continue to Checkout (₹{orderTotal})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* 7. VERIFIED REVIEWS MARQUEE */}
        {SHOW_TESTIMONIALS && (
        <section className="py-6 sm:py-8 bg-[#0a0f16] text-white border-y border-slate-800 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-3.5 sm:px-6 relative z-10 mb-4 sm:mb-6 text-center">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-[10px] sm:text-xs uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3 h-3" />
              <span>Real Site Experiences</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight">
              Used on 250+ Construction Sites Across India
            </h2>
            {SHOW_AGGREGATE_STATS && (
              <div className="mt-2 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 bg-slate-900/80 border border-slate-800 px-3 py-1 rounded-xl text-xs">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-slate-200">
                  <strong className="text-white">4.9 / 5</strong> Rating
                </span>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <BadgeCheck className="w-3.5 h-3.5" /> 100% Verified Excel Buyers
                </span>
              </div>
            )}
          </div>

          {/* Marquee Track */}
          <div className="relative w-full overflow-hidden py-1">
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#0a0f16] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#0a0f16] to-transparent z-20 pointer-events-none" />

            <div className="animate-marquee gap-3.5 px-2">
              {loopedReviews.map((rev, idx) => (
                <div
                  key={idx}
                  className="w-[280px] sm:w-[320px] shrink-0 bg-slate-900/95 border border-slate-800 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between hover:border-amber-500/50 transition-all shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < (rev.rating || 5)
                                ? "fill-amber-400 text-amber-400"
                                : "fill-slate-700 text-slate-700"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.5 rounded-full">
                        <BadgeCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                        Verified
                      </span>
                    </div>

                    <div className="mb-1.5">
                      <span className="inline-block px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 font-bold text-[10px]">
                        ★ {rev.highlight}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed italic line-clamp-4">
                      &ldquo;{rev.review}&rdquo;
                    </p>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-800/80">
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

        {/* 8. PRICING & OFFER CARD (DYNAMIC & COMPACT) */}
        <section className="py-5 sm:py-7 max-w-2xl mx-auto px-3.5 sm:px-6">
          <div className="rounded-2xl bg-white border-2 border-amber-400 p-4 sm:p-5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-black text-[9px] sm:text-[10px] uppercase px-2.5 py-0.5 rounded-bl-xl">
              {isBundleApplied ? "4-in-1 Bundle Offer" : "Special Launch Offer"}
            </div>

            <div className="text-center pb-3 border-b border-slate-100">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                Instant Download • Zero Subscriptions • Lifetime Access
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-950 mt-0.5">
                {isBundleApplied
                  ? "Construction Calculator Pro + 4-in-1 Site Operations Bundle"
                  : selectedAddonIds.length > 0
                  ? `Construction Calculator Pro + ${selectedAddonIds.length} Companion Tool${selectedAddonIds.length > 1 ? "s" : ""}`
                  : "Construction Calculator Pro Package"}
              </h3>

              <div className="mt-2 flex items-center justify-center gap-2.5">
                <span className="text-sm sm:text-base font-bold text-slate-400 line-through">
                  ₹{isBundleApplied ? 1896 : 999}
                </span>
                <span className="text-2xl sm:text-3xl font-black text-slate-950 font-mono">
                  ₹{orderTotal}/-
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] sm:text-xs uppercase tracking-wide">
                  {isBundleApplied ? "74% OFF" : "70% OFF"}
                </span>
              </div>
            </div>

            {/* 3 Key Value Props */}
            <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] sm:text-xs text-slate-700">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>31 connected Excel sheets</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{isBundleApplied ? "3 Companion Site Trackers" : "Dual units (Feet & Metres)"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>13 PDF guides + 7 checklists</span>
              </div>
            </div>

            <button
              id="btn-pricing-cta"
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs min-[360px]:text-sm sm:text-base shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>
                {isBundleApplied
                  ? `Get 4-in-1 Bundle (₹${orderTotal})`
                  : `Get the Package (₹${orderTotal})`}
              </span>
            </button>

            {isBundleApplied && (
              <div className="mt-2 text-center">
                <button
                  type="button"
                  onClick={() => setSelectedAddonIds([])}
                  className="text-[11px] text-slate-500 hover:text-slate-800 underline transition-colors cursor-pointer"
                >
                  Or get the standalone calculator package only
                </button>
              </div>
            )}

            {/* Trust line */}
            <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] text-slate-500 text-center">
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                Instant UPI &amp; Cards (GPay, PhonePe, Paytm)
              </span>
              <span>•</span>
              <span className="text-slate-600 font-medium">
                Immediate Screen Download + Email Backup
              </span>
            </div>
          </div>
        </section>

        {/* 9. FREQUENTLY ASKED QUESTIONS */}
        <section className="py-7 sm:py-10 max-w-3xl mx-auto px-3.5 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-5 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-2.5">
            {[
              {
                q: "What exactly do I receive inside the package?",
                a: "You receive the Master 31-Sheet Construction Calculator Excel (.xlsx) file, two completed reference project files (a 1,500 sq ft Chennai 3BHK and a 1,000 sq ft flat renovation), 13 PDF implementation guides with printable site worksheets, and 7 bonus resources including the contractor hiring guide and material test checklists."
              },
              {
                q: "Do I need prior civil engineering experience to use this?",
                a: "No. The system is designed for homeowners and contractors alike. You only enter basic measurements (room length, width, thickness). All standard engineering formulas (IS 456, IS 1786), mix ratios (M15, M20, M25), and wastage factors calculate automatically."
              },
              {
                q: "Will this work on my version of Excel, Mac, or phone?",
                a: "Yes. The toolkit is formatted natively in standard open .xlsx format without dangerous macros. It runs seamlessly on Microsoft Excel across Windows, Mac, iOS, Android, and Office 365."
              },
              {
                q: "How does the dual units system work?",
                a: "Tab 03 provides a single toggle switch between Imperial (Feet and Inches, common in Indian residential work) and Metric (Metres and Millimetres). Changing this toggle updates all 31 calculation sheets instantly without formula breaks."
              },
              {
                q: "How does digital delivery and support work?",
                a: "Immediately upon payment, your complete digital toolkit (.zip bundle) is displayed on screen for instant download and automatically attached to your confirmation email. For any file questions, our support team (support@thinktools.in) will assist you promptly."
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-3.5 sm:p-4 text-left font-semibold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-3 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                      openFaq === idx ? "rotate-180 text-amber-600" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5 bg-slate-50/70">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* MOBILE STICKY BOTTOM BAR */}
      <div className="fixed bottom-0 inset-x-0 z-30 p-2 sm:p-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] bg-white/95 backdrop-blur-md border-t border-slate-200 sm:hidden flex items-center justify-between gap-2 shadow-lg">
        <div className="shrink-0 min-w-0 pr-1">
          <span className="text-[9px] text-slate-500 block font-medium">One-Time Payment</span>
          <div className="flex items-center gap-1.5">
            <span className="text-sm min-[360px]:text-base font-black text-slate-900 font-mono">₹{orderTotal}</span>
            {isBundleApplied ? (
              <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                Bundle (₹499)
              </span>
            ) : selectedAddonIds.length > 0 ? (
              <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                +{selectedAddonIds.length} add-on{selectedAddonIds.length > 1 ? "s" : ""}
              </span>
            ) : null}
          </div>
        </div>

        <button
          onClick={() => setIsCheckoutOpen(true)}
          className="flex-1 py-2 px-3 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1 shadow-md shadow-amber-500/20 cursor-pointer whitespace-nowrap"
        >
          <span>Get Instant Access</span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
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

      {/* 31-Tab Detailed Inspection Modal */}
      {isSheetModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setIsSheetModalOpen(false)}
        >
          <div
            className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full max-h-[88vh] overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-200 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[10px] sm:text-xs uppercase font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
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

            <div className="p-3 border-b border-slate-100 bg-slate-50">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search any tab (e.g. steel, concrete, bill, tiles)..."
                  value={sheetModalSearch}
                  onChange={(e) => setSheetModalSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3.5 space-y-2">
              {filteredSheets.map((sheet) => (
                <div
                  key={sheet.number}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-start justify-between gap-2 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded text-[10px]">
                        Tab {sheet.number < 10 ? `0${sheet.number}` : sheet.number}
                      </span>
                      <strong className="text-slate-900 text-xs sm:text-sm">{sheet.name}</strong>
                      <span className="text-[10px] text-slate-500 font-mono">({sheet.part})</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs">{sheet.description}</p>
                  </div>
                  <div className="text-[10px] sm:text-right shrink-0 font-mono text-slate-500">
                    <div><span className="text-amber-800 font-bold">Input:</span> {sheet.userEnters}</div>
                    <div><span className="text-emerald-700 font-bold">Output:</span> {sheet.userGets}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-2">
              <span className="text-[11px] sm:text-xs text-slate-600 font-mono">31 connected sheets</span>
              <button
                onClick={() => {
                  setIsSheetModalOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 cursor-pointer whitespace-nowrap"
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
