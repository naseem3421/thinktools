"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Mail,
  Calculator,
  LayoutGrid,
  Cpu,
  Boxes,
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  Star,
  ShieldCheck,
  Play,
  Award,
  Sparkles,
} from "lucide-react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeJsonLd from "@/components/HomeJsonLd";
import ProjectDiscussionModal from "@/components/ProjectDiscussionModal";
import ContractorChecklistModal from "@/components/ContractorChecklistModal";
import { CALCULATOR_SCREENSHOTS } from "@/components/CalculatorGallery";

const ReelPreviewModal = dynamic(() => import("@/components/ReelPreviewModal"), {
  ssr: false,
});
import {
  DIGITAL_PRODUCTS,
  CUSTOM_SERVICES,
  PROCESS_STEPS,
  APPROACH_POINTS,
  HOMEPAGE_FAQS,
} from "@/data/homeContent";

export default function HomePage() {
  const [isDiscussionOpen, setIsDiscussionOpen] = useState<boolean>(false);
  const [discussionTopic, setDiscussionTopic] = useState<string>("Custom Calculator Development");
  const [isChecklistOpen, setIsChecklistOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isReelModalOpen, setIsReelModalOpen] = useState<boolean>(false);
  const [activeReelId, setActiveReelId] = useState<string>("main-calculator");
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isSlideHovered, setIsSlideHovered] = useState<boolean>(false);

  React.useEffect(() => {
    if (isSlideHovered || isReelModalOpen) return;
    const interval = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % CALCULATOR_SCREENSHOTS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isSlideHovered, isReelModalOpen]);

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSlideIndex((prev) => (prev - 1 + CALCULATOR_SCREENSHOTS.length) % CALCULATOR_SCREENSHOTS.length);
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSlideIndex((prev) => (prev + 1) % CALCULATOR_SCREENSHOTS.length);
  };

  const openReel = (id: string) => {
    setActiveReelId(id);
    setIsReelModalOpen(true);
  };

  const handleOpenDiscussion = (topic: string) => {
    setDiscussionTopic(topic);
    setIsDiscussionOpen(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#172033] flex flex-col font-sans selection:bg-[#B9F36B] selection:text-[#172033]">
      <HomeJsonLd />

      {/* =========================================================================
          SECTION 1 — HEADER
         ========================================================================= */}
      <Header isFocusMode={false} />

      <main className="flex-1">
        {/* =========================================================================
            SECTION 2 — HERO
           ========================================================================= */}
        <section className="relative pt-10 pb-12 sm:pt-14 sm:pb-16 overflow-hidden bg-white border-b border-slate-200">
          {/* Subtle architectural grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#17203306_1px,transparent_1px),linear-gradient(to_bottom,#17203306_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] sm:w-[650px] h-[220px] sm:h-[300px] bg-gradient-to-b from-[#B9F36B]/20 via-[#B9F36B]/5 to-transparent rounded-full blur-[90px] pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[#172033] text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-[#172033]" />
              <span>DIGITAL PRODUCTS · CUSTOM SOFTWARE</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#172033] tracking-tight leading-[1.15] max-w-4xl mx-auto">
              Tools for Today.{" "}
              <span className="relative inline-block">
                Solutions for What’s Next.
                <span className="absolute left-0 bottom-1 w-full h-2.5 bg-[#B9F36B]/60 -z-10 rounded-sm" />
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Engineering-grade Excel calculators, site operation trackers, and custom software solutions built for modern Indian builders, contractors &amp; homeowners.
            </p>

            {/* Two Clearly Differentiated CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href="#products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#172033] hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Toolkits (From ₹99)</span>
                <ArrowRight className="w-4 h-4 text-[#B9F36B]" />
              </a>

              <button
                type="button"
                onClick={() => handleOpenDiscussion("Custom Solution Inquiry")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-300 text-[#172033] font-semibold text-sm transition-all cursor-pointer"
              >
                <span>Discuss Custom Solution</span>
              </button>
            </div>

            {/* Small Supporting Line */}
            <p className="mt-4 text-xs text-slate-500 font-medium tracking-wide">
              Instant delivery · No subscriptions · Custom engineering on request
            </p>

            {/* Trust & Social Proof Ribbon */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1.5 font-bold text-slate-800">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>4.9 / 5 Rating</span>
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5 font-bold text-slate-800">
                <span>👷 250+ Builders &amp; Homeowners Across India</span>
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Unlocked Excel (Zero Macros)</span>
              </span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3 — DIGITAL PRODUCTS
           ========================================================================= */}
        <section id="products" className="py-10 sm:py-14 bg-[#F8FAFC] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
              <span className="text-xs font-bold text-[#172033] uppercase tracking-wider block mb-1.5">
                EXPLORE THINKTOOLS PRODUCTS
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172033] tracking-tight">
                Useful Tools. Clearly Defined.
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                Explore digital products designed for specific tasks and workflows. Each product
                page explains its purpose, included features, requirements, and pricing.
              </p>
            </div>

            {/* FLAGSHIP SPOTLIGHT BANNER */}
            <div className="mb-6 sm:mb-8 bg-white border-2 border-amber-400/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-black text-[10px] sm:text-xs uppercase px-3 sm:px-4 py-1 sm:py-1.5 rounded-bl-xl sm:rounded-bl-2xl">
                ⭐ Flagship Release · Instant Access
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-7">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-100/80 border border-amber-200 px-2.5 py-0.5 rounded">
                      Civil & Construction Toolkit
                    </span>
                    <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      👷 Built by a Civil Engineer, 10+ Years
                    </span>
                    <span className="text-xs text-slate-500 font-medium font-mono">
                      v2.4 Live · Excel (.XLSX) + 13 PDFs
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#172033] tracking-tight">
                      Construction Calculator Pro
                    </h3>
                    <button
                      type="button"
                      onClick={() => openReel("main-calculator")}
                      className="animate-blink-glow py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 border border-amber-300 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-amber-500/25 transition-all cursor-pointer group hover:scale-[1.02]"
                    >
                      <span className="w-4 h-4 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                        <Play className="w-2 h-2 fill-amber-400 ml-0.5" />
                      </span>
                      <span>Watch 60-Second Demo</span>
                      <span className="relative flex h-2 w-2 shrink-0 ml-0.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
                      </span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    A comprehensive, 31-sheet connected estimation system built specifically for Indian residential and commercial construction. Audits contractor bills, calculates cement, steel, bricks, sand, and finishes, and helps prevent over-billing.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 pt-0.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>31 Connected Sheets:</strong> Master system & examples</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>13 Execution Guides:</strong> 4-week action plan</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>7 Bonus Toolkits:</strong> Contractor hiring & scoring</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Instant UPI Unlock:</strong> Lifetime access from ₹299</span>
                    </div>
                  </div>

                  {/* Companion Site Operations Tools (Option 1) */}
                  <div className="pt-2.5 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-2">
                      <Boxes className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>3 Companion Site Tools (₹99 each or in the 4-in-1 Bundle):</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {/* Tool 1: Site Expenses */}
                      <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200 hover:border-amber-300 transition-all text-left flex flex-col justify-between">
                        <Link
                          href="/p/construction-calculator-pro#business-tools"
                          className="group block"
                        >
                          <div className="text-[11px] font-bold text-slate-900 group-hover:text-amber-950 flex items-center justify-between">
                            <span>📊 Site Expenses</span>
                            <span className="text-[9px] font-mono font-bold text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded">₹99</span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                            Daily petty cash, vouchers &amp; vendor spend
                          </p>
                        </Link>
                        <button
                          type="button"
                          onClick={() => openReel("site-expense-profit-tracker")}
                          className="animate-blink-glow mt-2 w-full py-1.5 px-2 rounded-lg bg-amber-500 hover:bg-amber-400 border border-amber-300 text-slate-950 text-[10px] font-extrabold flex items-center justify-center gap-1.5 shadow-xs shadow-amber-500/20 transition-all cursor-pointer group hover:scale-[1.01]"
                        >
                          <span className="w-3.5 h-3.5 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                            <Play className="w-2 h-2 fill-amber-400 ml-0.5" />
                          </span>
                          <span>Watch 60-Second Demo</span>
                          <span className="relative flex h-2 w-2 shrink-0 ml-0.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
                          </span>
                        </button>
                      </div>

                      {/* Tool 2: Labour & Wages */}
                      <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200 hover:border-amber-300 transition-all text-left flex flex-col justify-between">
                        <Link
                          href="/p/construction-calculator-pro#business-tools"
                          className="group block"
                        >
                          <div className="text-[11px] font-bold text-slate-900 group-hover:text-amber-950 flex items-center justify-between">
                            <span>👷 Labour &amp; Wages</span>
                            <span className="text-[9px] font-mono font-bold text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded">₹99</span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                            Daily mistri/coolie registers &amp; wage slips
                          </p>
                        </Link>
                        <button
                          type="button"
                          onClick={() => openReel("labour-attendance-weekly-wage-sheet")}
                          className="animate-blink-glow mt-2 w-full py-1.5 px-2 rounded-lg bg-amber-500 hover:bg-amber-400 border border-amber-300 text-slate-950 text-[10px] font-extrabold flex items-center justify-center gap-1.5 shadow-xs shadow-amber-500/20 transition-all cursor-pointer group hover:scale-[1.01]"
                        >
                          <span className="w-3.5 h-3.5 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                            <Play className="w-2 h-2 fill-amber-400 ml-0.5" />
                          </span>
                          <span>Watch 60-Second Demo</span>
                          <span className="relative flex h-2 w-2 shrink-0 ml-0.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
                          </span>
                        </button>
                      </div>

                      {/* Tool 3: Payments */}
                      <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200 hover:border-amber-300 transition-all text-left flex flex-col justify-between">
                        <Link
                          href="/p/construction-calculator-pro#business-tools"
                          className="group block"
                        >
                          <div className="text-[11px] font-bold text-slate-900 group-hover:text-amber-950 flex items-center justify-between">
                            <span>💰 Payments</span>
                            <span className="text-[9px] font-mono font-bold text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded">₹99</span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                            Milestone invoices, GST &amp; aging reminders
                          </p>
                        </Link>
                        <button
                          type="button"
                          onClick={() => openReel("payment-collection-tracker")}
                          className="animate-blink-glow mt-2 w-full py-1.5 px-2 rounded-lg bg-amber-500 hover:bg-amber-400 border border-amber-300 text-slate-950 text-[10px] font-extrabold flex items-center justify-center gap-1.5 shadow-xs shadow-amber-500/20 transition-all cursor-pointer group hover:scale-[1.01]"
                        >
                          <span className="w-3.5 h-3.5 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                            <Play className="w-2 h-2 fill-amber-400 ml-0.5" />
                          </span>
                          <span>Watch 60-Second Demo</span>
                          <span className="relative flex h-2 w-2 shrink-0 ml-0.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 w-full md:max-w-md md:mx-auto lg:w-80 lg:mx-0 shrink-0 flex flex-col justify-between space-y-3.5">
                  {/* Workbook Visual Thumbnail / Slides Carousel */}
                  <div
                    onMouseEnter={() => setIsSlideHovered(true)}
                    onMouseLeave={() => setIsSlideHovered(false)}
                    onClick={() => openReel("main-calculator")}
                    className="block relative rounded-xl overflow-hidden border border-slate-200/80 shadow-xs group cursor-pointer aspect-video bg-slate-900 select-none"
                  >
                    <Image
                      key={CALCULATOR_SCREENSHOTS[activeSlideIndex].id}
                      src={CALCULATOR_SCREENSHOTS[activeSlideIndex].imageSrc}
                      alt={CALCULATOR_SCREENSHOTS[activeSlideIndex].altText}
                      width={480}
                      height={270}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Left / Right Slide Navigation Chevrons */}
                    <button
                      type="button"
                      onClick={handlePrevSlide}
                      aria-label="Previous sheet slide"
                      className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-950/75 hover:bg-slate-950 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer shadow-sm"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextSlide}
                      aria-label="Next sheet slide"
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-950/75 hover:bg-slate-950 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer shadow-sm"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    {/* Top Right: Current Tab Badge */}
                    <div className="absolute top-2 right-2 pointer-events-none">
                      <span className="text-[9px] font-mono font-bold text-amber-300 bg-slate-950/85 backdrop-blur-xs px-1.5 py-0.5 rounded border border-amber-400/30">
                        {CALCULATOR_SCREENSHOTS[activeSlideIndex].shortLabel}
                      </span>
                    </div>

                    {/* Bottom Bar: Tab Name & Slide Dots */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent flex items-center justify-between p-2 pointer-events-none">
                      <span className="text-[10px] font-bold text-white bg-slate-900/80 backdrop-blur-xs px-2 py-0.5 rounded border border-white/20 truncate max-w-[170px]">
                        {CALCULATOR_SCREENSHOTS[activeSlideIndex].headline}
                      </span>
                      {/* Slide Indicator Dots */}
                      <div className="flex items-center gap-1 shrink-0">
                        {CALCULATOR_SCREENSHOTS.map((_, dotIdx) => (
                          <span
                            key={dotIdx}
                            className={`h-1 rounded-full transition-all ${
                              dotIdx === activeSlideIndex
                                ? "bg-amber-400 w-2.5"
                                : "bg-white/40 w-1"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Choice Buttons for ₹299 vs ₹499 */}
                  <div className="space-y-2.5">
                    {/* Primary Option: 31-Sheet Calculator Pro (₹299) */}
                    <Link
                      href="/p/construction-calculator-pro"
                      className="w-full p-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all cursor-pointer block group text-left border border-amber-400"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs sm:text-sm flex items-center gap-1.5">
                          <span>Get Construction Pro</span>
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-[10px] text-amber-900/70 line-through font-mono">₹999</span>
                          <span className="font-mono font-black text-sm sm:text-base">₹299</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-amber-950/80 mt-0.5 leading-tight flex items-center justify-between">
                        <span>31-Sheet Master Suite + 13 PDFs</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </p>
                    </Link>

                    {/* Best Value Option: 4-in-1 Complete Bundle (₹499) */}
                    <Link
                      href="/p/construction-calculator-pro?bundle=true"
                      className="w-full p-3 rounded-xl bg-[#172033] hover:bg-slate-800 text-white shadow-md transition-all cursor-pointer block group text-left border border-slate-700 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 bg-[#B9F36B] text-slate-950 font-black text-[9px] uppercase px-2 py-0.5 rounded-bl-lg">
                        BEST VALUE · SAVE ₹1,397
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="font-extrabold text-xs sm:text-sm flex items-center gap-1.5 text-white">
                          <Sparkles className="w-3.5 h-3.5 text-[#B9F36B] shrink-0" />
                          <span>Get 4-in-1 Bundle</span>
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-[10px] text-slate-400 line-through font-mono">₹1,896</span>
                          <span className="font-mono font-black text-sm sm:text-base text-[#B9F36B]">₹499</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-300 mt-1 leading-tight flex items-center justify-between">
                        <span>Includes Main Suite + 3 Site Trackers</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#B9F36B] group-hover:translate-x-0.5 transition-transform" />
                      </p>
                    </Link>

                    {/* Watch 60-Second Demo Button */}
                    <button
                      type="button"
                      onClick={() => openReel("main-calculator")}
                      className="animate-blink-glow w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 border border-amber-300 text-slate-950 font-black text-xs shadow-md shadow-amber-500/25 transition-all cursor-pointer group hover:scale-[1.01]"
                    >
                      <span className="w-4 h-4 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                        <Play className="w-2 h-2 fill-amber-400 ml-0.5" />
                      </span>
                      <span>Watch 60-Second Demo</span>
                      <span className="relative flex h-2 w-2 shrink-0 ml-0.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
                      </span>
                    </button>

                    {/* Preview Gallery Link */}
                    <Link
                      href="/p/construction-calculator-pro#calculator-gallery"
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-500 hover:text-slate-800 font-medium text-[11px] transition-colors whitespace-nowrap"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Inspect All 31 Sheet Names</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 pb-2 border-b border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                All Digital Toolkits &amp; Upcoming Releases
              </span>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-200/70 p-1 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveCategory("all")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeCategory === "all"
                      ? "bg-white text-slate-950 font-bold shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  All Tools ({DIGITAL_PRODUCTS.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategory("construction")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeCategory === "construction"
                      ? "bg-white text-slate-950 font-bold shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Construction &amp; Site (2)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategory("automation")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeCategory === "automation"
                      ? "bg-white text-slate-950 font-bold shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Business Automation (1)
                </button>
              </div>
            </div>

            {/* Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
              {DIGITAL_PRODUCTS.filter((product) => {
                if (activeCategory === "all") return true;
                if (activeCategory === "construction") {
                  return product.id === "construction-calculator-pro" || product.id === "site-operations-trackers";
                }
                if (activeCategory === "automation") {
                  return product.id === "whatsapp-automation";
                }
                return true;
              }).map((product) => {
                const isAvailable = product.isAvailable;

                return (
                  <div
                    key={product.id}
                    className={`flex flex-col rounded-2xl border transition-all duration-200 overflow-hidden bg-white shadow-xs ${
                      isAvailable
                        ? "border-slate-300 ring-1 ring-slate-900/5 hover:shadow-md"
                        : "border-slate-200 bg-white/80"
                    }`}
                  >
                    {/* Card Header & Badge */}
                    <div className="p-5 sm:p-6 border-b border-slate-100 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            {product.category}
                          </span>
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide ${
                              isAvailable
                                ? "bg-[#172033] text-[#B9F36B]"
                                : "bg-slate-100 text-slate-600 border border-slate-200"
                            }`}
                          >
                            {product.availability}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-[#172033] tracking-tight mb-2">
                          {product.name}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                          {product.description}
                        </p>
                      </div>

                      {/* Product Facts */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                          {isAvailable ? "Included in Package:" : "Product Overview:"}
                        </span>
                        {product.facts.map((fact, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2
                              className={`w-4 h-4 shrink-0 mt-0.5 ${
                                isAvailable ? "text-[#65a30d]" : "text-slate-400"
                              }`}
                            />
                            <span>{fact}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer: Pricing & Action */}
                    <div className="p-4 sm:p-5 bg-slate-50/70 border-t border-slate-100">
                      {isAvailable ? (
                        <div className="mb-3">
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl sm:text-2xl font-black text-[#172033]">
                              {product.price}
                            </span>
                            <span className="text-xs font-medium text-slate-500">
                              — {product.priceNote}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-3">
                          <span className="text-xs font-medium text-slate-500 italic block">
                            Availability and pricing announced upon release.
                          </span>
                        </div>
                      )}

                      {isAvailable ? (
                        <Link
                          href={product.ctaHref}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#172033] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all cursor-pointer"
                        >
                          <span>{product.ctaText}</span>
                          <ArrowRight className="w-4 h-4 text-[#B9F36B]" />
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleOpenDiscussion(`${product.name} Interest`)}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                        >
                          <Mail className="w-3.5 h-3.5 text-slate-600" />
                          <span>{product.ctaText}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            FREE LEAD MAGNET / REFERENCE SECTION
           ========================================================================= */}
        <section className="py-8 sm:py-10 bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl sm:rounded-3xl bg-slate-900 text-white p-5 sm:p-7 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-7">
              <div className="space-y-2.5 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#B9F36B]/20 border border-[#B9F36B]/40 text-[#B9F36B] text-[10px] sm:text-[11px] font-bold font-mono">
                  <span>FREE CIVIL REFERENCE TOOL</span>
                </div>
                <h3 className="text-lg sm:text-2xl font-extrabold tracking-tight">
                  15-Point Contractor Interview Checklist & Scorecard
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Before signing any construction contract or paying advances, evaluate your contractor on concrete ratios, steel wastage, curing commitments, and billing milestones. Includes our numerical scoring matrix.
                </p>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-400 pt-0.5">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#B9F36B]" /> Printable PDF format
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#B9F36B]" /> 100% Free · No spam
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#B9F36B]" /> Instant access
                  </span>
                </div>
              </div>

              <div className="shrink-0 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => setIsChecklistOpen(true)}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#B9F36B] hover:bg-[#a6e257] text-[#172033] font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#172033]" />
                  <span>Open Free Checklist</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4 — CUSTOM SOLUTIONS
           ========================================================================= */}
        <section id="custom-solutions" className="py-10 sm:py-14 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
              <span className="text-xs font-bold text-[#172033] uppercase tracking-wider block mb-1.5">
                CUSTOM DEVELOPMENT
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172033] tracking-tight">
                Have a Specific Problem to Solve?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                If a ready-made product doesn&apos;t fit your workflow, we can discuss a solution
                designed around your requirements.
              </p>
            </div>

            {/* Exactly Four Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch mb-6 sm:mb-8">
              {CUSTOM_SERVICES.map((service, index) => {
                const icons = [Calculator, LayoutGrid, Cpu, Boxes];
                const IconComponent = icons[index % icons.length];

                return (
                  <div
                    key={service.id}
                    className="flex flex-col justify-between p-4.5 sm:p-5 rounded-2xl border border-slate-200 bg-[#F8FAFC] hover:border-slate-300 hover:shadow-xs transition-all"
                  >
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#172033] mb-3 shadow-2xs">
                        <IconComponent className="w-4.5 h-4.5 text-[#172033]" />
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-[#172033] tracking-tight mb-1.5">
                        {service.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed mb-3">
                        {service.description}
                      </p>

                      <div className="space-y-1 mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                          Typical Examples:
                        </span>
                        {service.examples.map((example, i) => (
                          <div key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                            <span className="text-slate-400 leading-none mt-1">•</span>
                            <span>{example}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenDiscussion(service.title)}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <span>{service.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Custom Project CTA Box */}
            <div className="rounded-2xl sm:rounded-3xl bg-[#172033] text-white p-5 sm:p-7 relative overflow-hidden shadow-md">
              <div className="max-w-3xl relative z-10">
                <span className="inline-block px-3 py-0.5 rounded-full bg-[#B9F36B] text-[#172033] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-2.5">
                  Project Feasibility
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
                  Have a Specific Requirement?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Tell us what you need, how it should work, and who will use it. We will discuss
                  technical feasibility, scope, estimated cost, and timeline before work begins.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleOpenDiscussion("Custom Solution Project")}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#B9F36B] hover:bg-[#a6e056] text-[#172033] font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
                  >
                    <span>Discuss Your Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="mailto:support@thinktools.in?subject=Custom%20Solution%20Enquiry"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs sm:text-sm font-semibold transition-colors"
                  >
                    <Mail className="w-4 h-4 text-slate-300" />
                    <span>Email Us: support@thinktools.in</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5 — HOW WE WORK
           ========================================================================= */}
        <section className="py-10 sm:py-14 bg-[#F8FAFC] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
              <span className="text-xs font-bold text-[#172033] uppercase tracking-wider block mb-1.5">
                HOW WE WORK
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172033] tracking-tight">
                A Clear Process From Start to Handover
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                Understand the requirement, agree on the scope, develop the solution, and hand over
                the agreed deliverables.
              </p>
            </div>

            {/* Four Concise Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
              {PROCESS_STEPS.map((step) => (
                <div
                  key={step.number}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs relative"
                >
                  <span className="text-2xl sm:text-3xl font-black text-slate-300 tracking-tight block mb-1.5 font-mono">
                    {step.number}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#172033] tracking-tight mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => handleOpenDiscussion("Project Enquiry Process")}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#172033] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
              >
                <span>Start a Project Enquiry</span>
                <ArrowRight className="w-4 h-4 text-[#B9F36B]" />
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6 — OUR APPROACH (#about)
           ========================================================================= */}
        <section id="about" className="py-10 sm:py-14 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
              <span className="text-xs font-bold text-[#172033] uppercase tracking-wider block mb-1.5">
                WHAT YOU CAN EXPECT
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172033] tracking-tight">
                Clear Scope. Practical Solutions.
              </h2>
            </div>

            {/* Four Short Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {APPROACH_POINTS.map((point, index) => (
                <div
                  key={index}
                  className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80"
                >
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#172033] mb-2">
                    {point.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7 — FAQ (#faqs)
           ========================================================================= */}
        <section id="faqs" className="py-10 sm:py-14 bg-[#F8FAFC] border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6 sm:mb-8">
              <span className="text-xs font-bold text-[#172033] uppercase tracking-wider block mb-1.5">
                QUESTIONS & ANSWERS
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172033] tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            {/* Exact Eight FAQs Accordion */}
            <div className="space-y-2.5">
              {HOMEPAGE_FAQS.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-xl sm:rounded-2xl bg-white overflow-hidden shadow-2xs transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full py-3 px-4 sm:py-3.5 sm:px-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#172033] hover:text-slate-900 focus:outline-none cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <span className="shrink-0 p-1 rounded-lg bg-slate-100 text-slate-600">
                        {isOpen ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-3.5 sm:px-5 sm:pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8 — FINAL CTA
           ========================================================================= */}
        <section className="py-10 sm:py-14 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-2xl mx-auto">
              <span className="text-xs font-bold text-[#172033] uppercase tracking-wider block mb-1.5">
                HAVE A PROJECT IN MIND?
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172033] tracking-tight">
                Have an Idea Worth Building?
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                Explore our available digital products or tell us about the calculator,
                automation, or software solution you need.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <a
                  href="#products"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#172033] hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4 text-[#B9F36B]" />
                </a>

                <button
                  type="button"
                  onClick={() => handleOpenDiscussion("Final CTA - Project Idea")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-[#172033] font-semibold text-sm transition-all cursor-pointer"
                >
                  <span>Discuss a Project</span>
                </button>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                Direct enquiries:{" "}
                <a
                  href="mailto:support@thinktools.in"
                  className="font-medium text-[#172033] underline hover:text-slate-800"
                >
                  support@thinktools.in
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          SECTION 9 — FOOTER
         ========================================================================= */}
      <Footer />

      {/* Project Discussion & Requirement Modal */}
      <ProjectDiscussionModal
        isOpen={isDiscussionOpen}
        onClose={() => setIsDiscussionOpen(false)}
        defaultTopic={discussionTopic}
      />

      {/* Free 15-Point Contractor Checklist Modal */}
      <ContractorChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />

      {/* 9:16 Instagram Reels Walkthrough Modal */}
      <ReelPreviewModal
        isOpen={isReelModalOpen}
        onClose={() => setIsReelModalOpen(false)}
        activeReelId={activeReelId}
        onSelectReel={(id) => setActiveReelId(id)}
        selectedAddonIds={[]}
        onToggleAddon={() => {}}
        onOpenCheckout={() => {
          window.location.href = "/p/construction-calculator-pro";
        }}
      />
    </div>
  );
}
