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
  BadgeCheck,
  ArrowLeftRight
} from "lucide-react";
import {
  PRODUCTS,
  ADDON_PRODUCTS,
  HOMEOWNER_ADDON_IDS,
  CONTRACTOR_ADDON_IDS,
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

export type Role = "homeowner" | "contractor";

interface ConstructionCalculatorLandingProps {
  role: Role;
}

export default function ConstructionCalculatorLanding({ role }: ConstructionCalculatorLandingProps) {
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

  const roleAddonIds = role === "contractor" ? CONTRACTOR_ADDON_IDS : HOMEOWNER_ADDON_IDS;
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
      setSelectedAddonIds(roleAddonIds);
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
      content_name: `${product.title} (${role === "contractor" ? "Contractor" : "Homeowner"})`,
      content_ids: [product.id],
      content_type: "product",
      value: product.price,
      currency: "INR",
    });

    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("bundle") === "true") {
        setSelectedAddonIds(roleAddonIds);
      }
      if (urlParams.get("checkout") === "true") {
        setIsCheckoutOpen(true);
      }
    }
  }, [product.title, product.id, product.price, role, roleAddonIds]);

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
      review: "Takes about 15 minutes to explore the starter plans and tabs initially, but the master rate sheet makes it worth it. In Jaipur our brick and aggregate rates change every few months, so updating local rates once and having the entire project re-calculate automatically is very convenient.",
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

  const loopedReviews = [...siteReviews, ...siteReviews];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-amber-500 selection:text-slate-950 font-sans">
      {/* Focused Navigation Header */}
      <Header
        isFocusMode={true}
        productTitle={product.title}
        price={orderTotal}
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
                {/* Persona Switch / Context Bar */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-xs font-black text-amber-950 uppercase tracking-wide">
                    <span>{role === "homeowner" ? "🏡 Homeowner Edition" : "👷 Contractor Edition"}</span>
                  </span>
                  <Link
                    href={role === "homeowner" ? "/p/construction-calculator-pro/contractor" : "/p/construction-calculator-pro/homeowner"}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-amber-700 bg-white border border-slate-200 hover:border-amber-300 px-2.5 py-1 rounded-full transition-colors"
                  >
                    <ArrowLeftRight className="w-3 h-3 text-amber-600" />
                    <span>
                      {role === "homeowner"
                        ? "Are you a Contractor? Switch here →"
                        : "Building your own home? Switch to Homeowner →"}
                    </span>
                  </Link>
                </div>

                {/* Standards Authority Pill */}
                <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 border-2 border-amber-500/70 text-xs text-slate-900 shadow-xs">
                  <span className="flex items-center gap-1.5 font-black text-amber-950 uppercase tracking-wide text-[11px] sm:text-xs">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse inline-block" />
                    👷 Built by a Senior Civil Engineer (10+ Years On-Site, 20+ Homes Built)
                  </span>
                  <span className="text-amber-400 font-bold hidden sm:inline">•</span>
                  <span className="font-bold text-slate-800 text-[11px] sm:text-xs">
                    Relevant IS &amp; CPWD norms
                  </span>
                  <span className="text-amber-400 font-bold hidden sm:inline">•</span>
                  <span className="text-amber-900 font-bold text-[11px] sm:text-xs">
                    38 Connected Sheets
                  </span>
                  <span className="text-amber-400 font-bold hidden sm:inline">•</span>
                  <span className="text-amber-900 font-bold text-[11px] sm:text-xs">
                    3-Min Demo
                  </span>
                </div>

                {/* Primary Headline */}
                {role === "homeowner" ? (
                  <h1 className="text-2xl min-[380px]:text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-950 tracking-tight leading-[1.15]">
                    Building Your Dream Home?{" "}
                    <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent block mt-1 text-lg min-[380px]:text-xl sm:text-2xl lg:text-3xl">
                      Plan Costs, Audit Contractor Bills &amp; Stop Overrun Before Concrete Pours.
                    </span>
                  </h1>
                ) : (
                  <h1 className="text-2xl min-[380px]:text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-950 tracking-tight leading-[1.15]">
                    Civil Contractor or Builder?{" "}
                    <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent block mt-1 text-lg min-[380px]:text-xl sm:text-2xl lg:text-3xl">
                      Quote Itemized Client BOQs in 15 Minutes with Real Site Margins.
                    </span>
                  </h1>
                )}

                {/* Subtitle */}
                {role === "homeowner" ? (
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                    <strong className="text-slate-900 font-semibold block mb-0.5">
                      The all-in-one Excel estimation system calibrated for Indian site realities:
                    </strong>
                    Estimate cement, steel, sand and tiles before work starts. Built to help home builders cross-check contractor running bills, flat renovators plan finishes, and stop costly material leakage.
                  </p>
                ) : (
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                    <strong className="text-slate-900 font-semibold block mb-0.5">
                      The all-in-one Excel estimation system calibrated for Indian site realities:
                    </strong>
                    Prepare accurate client quotes fast with local rate overrides, calculate rebar and brick wastage, manage mistri/coolie daily registers, and stop losing profit on unbilled extra work.
                  </p>
                )}

                {/* Watch 3-Minute Demo Button */}
                <div className="pt-1 pb-0.5 flex justify-center lg:justify-start">
                  <button
                    type="button"
                    onClick={() => openReel("main-calculator")}
                    className="animate-blink-glow w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-2.5 sm:py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs min-[360px]:text-sm sm:text-base border-2 border-amber-300 shadow-md shadow-amber-500/25 transition-all cursor-pointer group hover:scale-[1.02]"
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                      <Play className="w-3 h-3 fill-amber-400 ml-0.5" />
                    </span>
                    <span className="tracking-tight">Watch 3-Minute Demo</span>
                    <span className="relative flex h-2.5 w-2.5 shrink-0 ml-0.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
                    </span>
                  </button>
                </div>

                {/* 3 Focused Use Cases */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-left pt-0.5">
                  <div className={`border rounded-xl p-2.5 shadow-2xs transition-all ${
                    role === "homeowner"
                      ? "bg-amber-50/40 border-amber-400 ring-1 ring-amber-400/30"
                      : "bg-white border-slate-200"
                  }`}>
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                      <span>🏡</span>
                      <span>Home Builders</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                      Exact cement, steel &amp; brick takeoff. Audit contractor running bills before releasing payment.
                    </p>
                  </div>

                  <div className={`border rounded-xl p-2.5 shadow-2xs transition-all ${
                    role === "homeowner"
                      ? "bg-amber-50/40 border-amber-400 ring-1 ring-amber-400/30"
                      : "bg-white border-slate-200"
                  }`}>
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                      <span>🔨</span>
                      <span>Flat Renovators</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                      Room-by-room tile box counts, paint liters &amp; bath remodel costs with zero excess waste.
                    </p>
                  </div>

                  <div className={`border rounded-xl p-2.5 shadow-2xs transition-all ${
                    role === "contractor"
                      ? "bg-amber-50/40 border-amber-400 ring-1 ring-amber-400/30"
                      : "bg-white border-slate-200"
                  }`}>
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
                <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-slate-500">
                  <div className="flex items-center gap-1 text-slate-700 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Instant On-Screen Download</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center gap-1 text-slate-700 font-medium">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% Editable &amp; Unlocked</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center gap-1 text-slate-700 font-medium">
                    <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Lifetime Access (No Subscriptions)</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Spreadsheet Preview & Sheet Inspector */}
              <div className="lg:col-span-6 space-y-3">
                <div className="relative">
                  <CalculatorGallery />
                </div>

                {/* 38-Sheet Catalog Inspection Trigger Button */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setIsSheetModalOpen(true)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm border border-slate-700 shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer group hover:border-amber-400"
                  >
                    <Search className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span>Inspect All 38 Connected Excel Sheets &amp; Formulas</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  <p className="text-[11px] text-slate-500 text-center mt-1">
                    Click above to inspect sheet purposes, yellow inputs, and green auto-formula outputs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. THE CONTRACTOR / SITE REALITY PROBLEM & SOLUTION */}
        <section className="py-7 sm:py-10 bg-slate-900 text-white border-y border-slate-800 relative">
          <div className="max-w-6xl mx-auto px-3.5 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/80 px-3 py-1 rounded-full inline-block">
                The Reality of Indian Construction Sites
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mt-2">
                Why Rough Estimates Lead to Massive Budget Leaks
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Whether you are building your own home or quoting client contracts, generic thumb rules cost lakhs in wastage and disputes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Without Calculator */}
              <div className="bg-rose-950/30 border border-rose-900/60 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-3">
                  <XCircle className="w-4.5 h-4.5 shrink-0" />
                  <span>The Guesswork Method (Rough Diary Notes)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">✗</span>
                    <span>Blind reliance on rough per-sqft contractor rates with no itemized breakdown.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">✗</span>
                    <span>15-25% excess cement, steel &amp; sand ordered due to uncalculated wastage factors.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">✗</span>
                    <span>No way to audit running contractor bills against actual on-site work done.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">✗</span>
                    <span>Bitter payment disputes with supervisors and mistris over unrecorded extra works.</span>
                  </li>
                </ul>
              </div>

              {/* With Construction Calculator Pro */}
              <div className="bg-emerald-950/30 border border-emerald-900/60 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-3">
                  <CheckCircle2 className="w-4.5 h-4.5 shrink-0" />
                  <span>The Engineering Method (Construction Calculator Pro)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Exact takeoff for concrete, steel, mortar, bricks &amp; tiles across 38 connected sheets.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Calibrated with Indian standard cutting wastage factors and IS/CPWD site norms.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Audit running bills stage-by-stage so you only pay for materials actually consumed.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Clear written records for extra items, change requests, and milestone approvals.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CORE HIGHLIGHT: 38 CONNECTED SHEETS WALKTHROUGH */}
        <section className="py-7 sm:py-10 bg-white text-slate-900 border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-3.5 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block">
                Master Excel System
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-950 mt-1.5">
                38 Connected Sheets Across Every Construction Phase
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Enter your dimensions once in yellow cells. All 38 sheets update automatically with zero macros.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                <div className="text-amber-600 font-mono font-bold text-xs mb-1">Tabs 01-08</div>
                <h3 className="font-bold text-slate-950 text-sm">Quick Setup &amp; Structural Takeoff</h3>
                <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                  Project setup, master rate book, excavation, footings, column schedule, plinth beam &amp; slab concrete takeoff.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                <div className="text-amber-600 font-mono font-bold text-xs mb-1">Tabs 09-17</div>
                <h3 className="font-bold text-slate-950 text-sm">Masonry, Plaster &amp; Finishes</h3>
                <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                  Brickwork, AAC blocks, internal &amp; external plaster mixes, flooring vitrified tiles, waterproofing &amp; paint liters.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                <div className="text-amber-600 font-mono font-bold text-xs mb-1">Tabs 18-27</div>
                <h3 className="font-bold text-slate-950 text-sm">External Works &amp; MEP Services</h3>
                <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                  Compound wall, sump, overhead tank, septic tank, borewell, electrical points, plumbing lines &amp; doors/windows schedule.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                <div className="text-amber-600 font-mono font-bold text-xs mb-1">Tabs 28-38</div>
                <h3 className="font-bold text-slate-950 text-sm">Cost Master, Cash Flow &amp; Reports</h3>
                <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                  Master cost roll-up, what-if price surge simulator, monthly cash flow forecast, bill verification &amp; printable client proposal.
                </p>
              </div>
            </div>

            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={() => setIsSheetModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm border border-slate-700 shadow-sm transition-all cursor-pointer"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span>Browse Full 38-Sheet Catalog with Inputs &amp; Formulas</span>
              </button>
            </div>
          </div>
        </section>

        {/* 4. WHAT-IF SIMULATOR & DECISION ENGINES */}
        <section className="py-7 sm:py-10 bg-[#0c121c] text-white border-b border-slate-800">
          <div className="max-w-6xl mx-auto px-3.5 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1 rounded-full inline-block">
                Decision Engines
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mt-1.5">
                What-If Simulator &amp; Material Comparison
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Stress-test market rate increases before buying and compare building materials side-by-side.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
                <div className="text-2xl mb-1.5">📈</div>
                <h3 className="text-sm font-bold text-white">What-If Price Simulator</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Test cement, steel, or labour prices jumping 5% to 20% to see the exact budget impact before placing bulk orders.
                </p>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
                <div className="text-2xl mb-1.5">🧱</div>
                <h3 className="text-sm font-bold text-white">Red Brick vs. AAC Blocks</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Compare walling options across cost, construction speed, mortar consumption, and dead load on foundation beams.
                </p>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
                <div className="text-2xl mb-1.5">💵</div>
                <h3 className="text-sm font-bold text-white">Monthly Cash Flow Forecast</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Know exactly how much liquidity you need at every milestone so site work never stops due to sudden cash crunches.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. BEGINNER VS PRO MODE */}
        <section className="py-7 sm:py-10 bg-slate-50 border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-3.5 sm:px-6">
            <div className="text-center max-w-xl mx-auto mb-6">
              <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider text-amber-800 bg-amber-100/70 border border-amber-200 px-3 py-1 rounded-full inline-block">
                Built For Real Site Users
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-950 mt-1.5">
                Simple For First-Timers. Powerful For Engineers.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xs">
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-xs mb-2">
                  Beginner Mode
                </div>
                <h3 className="font-bold text-slate-950 text-sm">For Homeowners &amp; Flat Renovators</h3>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>4 pre-filled starter templates (2BHK, 3BHK, Villa, Renovation)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Clear plain-English notes on every sheet with zero technical jargon</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Protected formula cells to prevent accidental formula deletion</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xs">
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-slate-900 text-amber-400 font-bold text-xs mb-2">
                  Pro Mode
                </div>
                <h3 className="font-bold text-slate-950 text-sm">For Contractors &amp; Site Supervisors</h3>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Full unit toggle (Feet-Inches ⇄ Metres) across all sheets</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Detailed steel cutting schedules (BBS), wastage factors &amp; mix design ratios</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>1-click client proposal generation with custom company branding</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 6. COMPLETE SITE OPERATIONS / COMPANION TOOLS (ADD-ONS) */}
        <section id="business-tools" className="py-7 sm:py-10 bg-white text-slate-900 border-y border-slate-200 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-3.5 sm:px-6 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-7">
              <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block">
                Optional Companion Tools • ₹99 Each
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-950 mt-1.5">
                {role === "homeowner"
                  ? "Homeowner Companion Tools: Budget, Payments & Quality"
                  : "Contractor Companion Tools: Expenses, Labour & Payments"}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                {role === "homeowner"
                  ? "Essential companion Excel workbooks built for Homeowners to track house budget, stage-wise contractor payment milestones, and on-site quality before work is covered."
                  : "Essential companion Excel workbooks built for Contractors to track daily site petty cash, weekly mistri/coolie wages, and client milestone billing."}
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
                    {role === "homeowner"
                      ? "Construction Calculator Pro + Homeowner 4-in-1 Master Bundle (₹499)"
                      : "Construction Calculator Pro + Contractor 4-in-1 Master Bundle (₹499)"}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Individual tool price: ₹596 (Core toolkit + 3 companion tools) • Bundle: ₹499 (Save an extra ₹97 • ₹1,896 total retail value)
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
              {roleAddonIds.map((id) => ADDON_PRODUCTS[id]).filter(Boolean).map((addon) => {
                const isSelected = selectedAddonIds.includes(addon.id);
                const hasReel = Boolean(REEL_VIDEOS[addon.id]);
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
                      {hasReel && (
                        <button
                          type="button"
                          onClick={() => openReel(addon.id)}
                          className="animate-blink-glow w-full py-2 px-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 border border-amber-300 text-slate-950 font-extrabold text-xs shadow-sm shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer group hover:scale-[1.01]"
                        >
                          <span className="w-4 h-4 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                            <Play className="w-2 h-2 fill-amber-400 ml-0.5" />
                          </span>
                          <span className="tracking-tight">Watch 60-Second Demo</span>
                          <span className="relative flex h-2 w-2 shrink-0 ml-0.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
                          </span>
                        </button>
                      )}

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

            <div className="animate-marquee gap-3.5 pr-3.5">
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
                  ? role === "contractor"
                    ? "Construction Calculator Pro + Contractor 4-in-1 Bundle"
                    : "Construction Calculator Pro + Homeowner 4-in-1 Bundle"
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
                <span>38 connected Excel sheets</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  {isBundleApplied
                    ? role === "contractor"
                      ? "3 Contractor Site Trackers"
                      : "3 Homeowner Companion Tools"
                    : "Dual units (Feet & Metres)"}
                </span>
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
                a: "You receive the Master 38-Sheet Construction Calculator Excel (.xlsx) file with 4 instant Starter Plans (2BHK, 3BHK, Villa, Renovation) and Beginner/Pro mode, two completed reference project files (New House 30x50 and Flat Renovation), 13 PDF implementation guides with printable site worksheets, and 7 bonus resources including the contractor hiring guide and material test checklists."
              },
              {
                q: "Do I need prior civil engineering experience to use this?",
                a: "No. The system is designed for homeowners and contractors alike. Beginner mode activates plain-English guidance on every tab and marks advanced sheets as optional. You can pick a ready-made starter plan to get an estimate in 30 seconds, or enter your room sizes in the yellow input cells. All formulas in green cells are calculated and protected."
              },
              {
                q: "Will this work on my version of Excel or other spreadsheet software?",
                a: "Construction Calculator Pro requires Microsoft Excel 2016 or later (including Excel 2019, 2021, and Microsoft 365) on Windows or Mac. The workbook uses native multi-tab formulas and formatting with zero macros. Note: It is not tested on or recommended for Google Sheets, LibreOffice, or Apple Numbers."
              },
              {
                q: "How does the dual units system work?",
                a: "In Quick Start and Setup, a single cell lets you toggle between Feet and Metres. Lengths, room areas, concrete volumes, rebar steel weight, and brick counts across all 38 calculation sheets adapt immediately."
              },
              {
                q: "What is the new 'Additional Works' tab?",
                a: "Most home estimates fail because they only count the main rooms and miss external structures. Tab 18 (Additional Works) automatically calculates quantities and costs for your sump, overhead tank, septic tank & soak pit, compound wall, gates, borewell, rainwater pit, staircase, and window/door schedules, feeding directly into your master Cost Estimate."
              },
              {
                q: "How does digital delivery and support work?",
                a: "Immediately upon payment, your complete digital toolkit (.zip bundle) is displayed on screen for instant download and automatically attached to your confirmation email. For any questions, our team (support@thinktools.in) will assist you promptly."
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
        targetAudience={role}
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

      {/* 38-Tab Detailed Inspection Modal (Dynamic Lazy-Loaded) */}
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
