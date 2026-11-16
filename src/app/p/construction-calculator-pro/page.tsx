"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Play,
  Search,
  ShieldCheck,
  FileSpreadsheet,
  Zap,
  ChevronDown,
  Star,
  BadgeCheck,
  Check,
  Layers,
  ArrowLeftRight,
  HelpCircle
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

const ReelPreviewModal = dynamic(() => import("@/components/ReelPreviewModal"), {
  ssr: false,
});

const SheetCatalogModal = dynamic(() => import("@/components/SheetCatalogModal"), {
  ssr: false,
});

export default function ConstructionCalculatorGatewayPage() {
  const product = PRODUCTS["construction-calculator-pro"];
  const [isReelModalOpen, setIsReelModalOpen] = useState(false);
  const [isSheetModalOpen, setIsSheetModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky mobile bar once user scrolls past the top hero cards (~480px)
      if (window.scrollY > 480) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const reviews = [
    {
      name: "Karthik Ramanathan",
      role: "Homeowner",
      city: "Chennai",
      highlight: "Saved ₹1.3L on steel quote",
      text: "Plugged our house spans into the steel sheet. Found out contractor quoted 2 tons extra. Saved over a lakh before foundation work."
    },
    {
      name: "Er. Suresh Patil",
      role: "Civil Contractor",
      city: "Pune",
      highlight: "Closes quotes in 24 hrs",
      text: "Used to take days calculating manual estimates. Now I input dimensions, adjust local material rates, and hand the client a professional quote."
    },
    {
      name: "Venkat Rao",
      role: "Homeowner",
      city: "Hyderabad",
      highlight: "Caught 21 missing cement bags",
      text: "The bill check tab flagged 195 bags billed vs 172 bags maximum required. Counted empty bags on site and caught the error."
    },
    {
      name: "Anand Joshi",
      role: "Contractor",
      city: "Ahmedabad",
      highlight: "Dispute-free Saturday wages",
      text: "The labour attendance and wage sheet replaced our physical register. Weekly mistri and coolie payouts are calculated automatically."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-amber-500 selection:text-slate-950 font-sans">
      {/* Focused Navigation Header */}
      <Header
        isFocusMode={true}
        productTitle="Construction Calculator Pro"
        price={299}
      />

      {/* Top Banner - Mobile Optimized */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 py-1.5 px-3 text-center text-[10px] sm:text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 fill-current shrink-0" />
        <span className="leading-tight">
          🚀 SPECIAL LAUNCH: ₹299/- (Regular ₹999/-) • 38 CONNECTED SHEETS • SELECT YOUR ROLE BELOW
        </span>
      </div>

      <main className="flex-1 pb-20 sm:pb-12">
        {/* HERO SECTION - MOBILE FIRST */}
        <section className="relative pt-4 pb-6 sm:pt-8 sm:pb-12 overflow-hidden bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:24px_24px]">
          <div className="max-w-4xl mx-auto px-3.5 sm:px-6 relative z-10 text-center">
            
            {/* Standards Authority Pill - Compact for Mobile */}
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/50 text-[10px] min-[360px]:text-[11px] sm:text-xs text-slate-900 font-semibold mb-2.5 shadow-2xs">
              <span className="flex items-center gap-1 font-black text-amber-950 uppercase">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse inline-block" />
                👷 Senior Civil Engineer (10+ Yrs On-Site)
              </span>
              <span className="text-amber-500 hidden min-[400px]:inline">•</span>
              <span className="text-slate-700 hidden min-[400px]:inline">IS &amp; CPWD Norms</span>
              <span className="text-amber-500">•</span>
              <span className="text-amber-900 font-bold">38 Sheets</span>
            </div>

            {/* Main Headline - Punchy on Mobile */}
            <h1 className="text-2xl min-[380px]:text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-[1.18] max-w-2xl mx-auto">
              Build a Home. Quote a Client.{" "}
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent block mt-1">
                Choose Your Role to Continue
              </span>
            </h1>

            {/* Short Subtitle */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto mt-2">
              Select who you are so we tailor the calculation guidelines, bill audit checks, and companion workbooks for your exact project:
            </p>

            {/* Quick Demo & Sheet Triggers - Compact Row */}
            <div className="mt-3 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setIsReelModalOpen(true)}
                className="animate-blink-glow inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] sm:text-xs border border-amber-300 shadow-xs transition-all cursor-pointer"
              >
                <Play className="w-3 h-3 fill-slate-950" />
                <span>Watch 3-Min Demo</span>
              </button>
              <button
                type="button"
                onClick={() => setIsSheetModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-800 font-bold text-[11px] sm:text-xs border border-slate-300 shadow-2xs transition-all cursor-pointer"
              >
                <Search className="w-3 h-3 text-amber-600" />
                <span>Inspect 38 Sheets</span>
              </button>
            </div>

            {/* THE TWO MAIN CHOICE CARDS - HIGH TACTILE TAP TARGETS FOR MOBILE */}
            <div className="mt-5 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-6 text-left">
              
              {/* CARD 1: HOMEOWNER */}
              <div className="bg-white border-2 border-amber-400 hover:border-amber-500 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group active:scale-[0.99] touch-manipulation">
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-mono font-black text-[10px] uppercase tracking-wide">
                    ₹299 Only
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-extrabold text-[10px] uppercase font-mono">
                      Edition 01
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      Homeowners &amp; Self-Builders
                    </span>
                  </div>

                  <div className="flex items-start gap-3 mt-1">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-2xl flex items-center justify-center shrink-0 border border-amber-500/30">
                      🏡
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-black text-slate-950 leading-tight">
                        I am a Homeowner
                      </h2>
                      <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-snug">
                        Building my own house or renovating a flat
                      </p>
                    </div>
                  </div>

                  {/* Plain-English Benefits */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-[11px] sm:text-xs leading-snug">
                        <strong>Cross-check contractor bills:</strong> Stop paying for inflated cement, steel &amp; sand quantities.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-[11px] sm:text-xs leading-snug">
                        <strong>Beginner-friendly mode:</strong> 4 ready starter plans (2BHK, 3BHK, Villa, Renovation) with zero jargon.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-[11px] sm:text-xs leading-snug">
                        <strong>3 Homeowner Add-ons:</strong> House Budget Tracker, Stage Payment Planner &amp; Quality Checklist.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <Link
                    href="/p/construction-calculator-pro/homeowner"
                    className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-sm shadow-amber-500/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer group-hover:translate-x-0.5"
                  >
                    <span>Continue as Homeowner</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <p className="text-[10px] text-slate-500 text-center mt-1.5">
                    Standalone: ₹299 • 4-in-1 Master Bundle: ₹499
                  </p>
                </div>
              </div>

              {/* CARD 2: CONTRACTOR */}
              <div className="bg-white border-2 border-slate-300 hover:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group active:scale-[0.99] touch-manipulation">
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-300 text-slate-800 font-mono font-black text-[10px] uppercase tracking-wide">
                    ₹299 Only
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-extrabold text-[10px] uppercase font-mono">
                      Edition 02
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      Contractors, Thekedars &amp; Engineers
                    </span>
                  </div>

                  <div className="flex items-start gap-3 mt-1">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 text-2xl flex items-center justify-center shrink-0 border border-slate-300">
                      👷
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-black text-slate-950 leading-tight">
                        I am a Contractor / Builder
                      </h2>
                      <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-snug">
                        Executing client projects &amp; managing sites
                      </p>
                    </div>
                  </div>

                  {/* Contractor Benefits */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-[11px] sm:text-xs leading-snug">
                        <strong>Quote client BOQs in 15 mins:</strong> Input measurements, apply local material rates, and hand client a proposal.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-[11px] sm:text-xs leading-snug">
                        <strong>Pro Mode &amp; Unit Toggle:</strong> Feet-Inches ⇄ Metres toggle, rebar BBS schedule &amp; site cutting wastage.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-[11px] sm:text-xs leading-snug">
                        <strong>3 Contractor Add-ons:</strong> Site Expense &amp; Profit Tracker, Labour Wage Registers &amp; Milestone Billing.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <Link
                    href="/p/construction-calculator-pro/contractor"
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white hover:text-amber-300 font-black text-xs sm:text-sm tracking-wide shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer group-hover:translate-x-0.5"
                  >
                    <span>Continue as Contractor</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </Link>
                  <p className="text-[10px] text-slate-500 text-center mt-1.5">
                    Standalone: ₹299 • 4-in-1 Master Bundle: ₹499
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Highlights Strip */}
            <div className="mt-6 pt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] text-slate-500">
              <div className="flex items-center gap-1 font-semibold text-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Instant Download + Email Backup</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1 font-semibold text-slate-700">
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>100% Unlocked Excel (.xlsx)</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1 font-semibold text-slate-700">
                <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Lifetime Access</span>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE: HOMEOWNER VS CONTRACTOR */}
        <section className="py-5 sm:py-8 bg-white border-y border-slate-200">
          <div className="max-w-3xl mx-auto px-3.5 sm:px-6">
            <div className="text-center mb-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full inline-block">
                Side-by-Side Comparison
              </span>
              <h3 className="text-base sm:text-xl font-black text-slate-950 mt-1">
                Both Editions Share the 38-Sheet Master Engine
              </h3>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800 text-[11px] font-black uppercase">
                    <th className="p-2.5 sm:p-3">Feature</th>
                    <th className="p-2.5 sm:p-3 text-amber-900 bg-amber-50/70">🏡 Homeowner</th>
                    <th className="p-2.5 sm:p-3 text-slate-900">👷 Contractor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[11px] sm:text-xs">
                  <tr>
                    <td className="p-2.5 sm:p-3 font-semibold text-slate-900">38 Connected Calculation Sheets</td>
                    <td className="p-2.5 sm:p-3 text-emerald-700 font-bold bg-amber-50/30">✓ Included (.xlsx)</td>
                    <td className="p-2.5 sm:p-3 text-emerald-700 font-bold">✓ Included (.xlsx)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 sm:p-3 font-semibold text-slate-900">Dual Units (Feet-Inches &amp; Metres)</td>
                    <td className="p-2.5 sm:p-3 text-emerald-700 font-bold bg-amber-50/30">✓ 1-Click Toggle</td>
                    <td className="p-2.5 sm:p-3 text-emerald-700 font-bold">✓ 1-Click Toggle</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 sm:p-3 font-semibold text-slate-900">4 Starter Project Plans</td>
                    <td className="p-2.5 sm:p-3 text-slate-700 bg-amber-50/30">2BHK, 3BHK, Villa, Reno</td>
                    <td className="p-2.5 sm:p-3 text-slate-700">Pre-built reference baselines</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 sm:p-3 font-semibold text-slate-900">Specialized Focus</td>
                    <td className="p-2.5 sm:p-3 text-amber-900 font-medium bg-amber-50/30">Bill audit &amp; fraud check</td>
                    <td className="p-2.5 sm:p-3 text-slate-700 font-medium">15-min BOQ quoting &amp; margins</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 sm:p-3 font-semibold text-slate-900">3 Companion Add-on Tools</td>
                    <td className="p-2.5 sm:p-3 text-slate-700 bg-amber-50/30">
                      Budget Log, Payment Schedule &amp; Quality Checklist
                    </td>
                    <td className="p-2.5 sm:p-3 text-slate-700">
                      Site Expense Log, Labour Wages &amp; Payment Invoices
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 sm:p-3 font-semibold text-slate-900">Price</td>
                    <td className="p-2.5 sm:p-3 font-mono font-bold text-slate-950 bg-amber-50/30">
                      ₹299 <span className="text-[10px] text-slate-400 font-normal">(Bundle ₹499)</span>
                    </td>
                    <td className="p-2.5 sm:p-3 font-mono font-bold text-slate-950">
                      ₹299 <span className="text-[10px] text-slate-400 font-normal">(Bundle ₹499)</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* VERIFIED CUSTOMER REVIEWS - MOBILE COMPACT */}
        <section className="py-6 sm:py-8 bg-[#0b0f14] text-white">
          <div className="max-w-4xl mx-auto px-3.5 sm:px-6">
            <div className="text-center mb-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full inline-block">
                ★ 4.9/5 Rating • 250+ Sites Across India
              </span>
              <h3 className="text-base sm:text-xl font-black text-white mt-1">
                Trusted by Homeowners and Contractors
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {reviews.map((r, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-3 sm:p-4 text-xs">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1">
                      <BadgeCheck className="w-3 h-3" /> Verified Buyer
                    </span>
                  </div>
                  <div className="font-bold text-amber-300 text-[11px] mb-1">
                    ★ {r.highlight}
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug italic">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <div className="mt-2 pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex justify-between">
                    <span className="font-bold text-white">{r.name} ({r.role})</span>
                    <span>{r.city}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* QUICK FAQ ACCORDION */}
        <section className="py-6 sm:py-8 max-w-2xl mx-auto px-3.5 sm:px-6">
          <div className="text-center mb-4">
            <h3 className="text-base sm:text-xl font-bold text-slate-950">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-2">
            {[
              {
                q: "What is the difference between Homeowner and Contractor editions?",
                a: "Both editions include the full Master 38-Sheet Construction Calculator Excel file (.xlsx) with all formulas unlocked. The Homeowner edition is focused on bill verification, material fraud prevention, and includes companion add-ons for home budgeting, stage-wise payment milestones, and quality checklists. The Contractor edition is focused on rapid client quoting, site margin protection, and includes add-ons for site petty cash expenses, daily labour attendance registers, and client payment collection."
              },
              {
                q: "Do I need prior civil engineering experience?",
                a: "No. The system is designed for homeowners and contractors alike. Beginner mode activates plain-English guidance on every tab and marks advanced sheets as optional. All formula cells are protected from accidental deletion."
              },
              {
                q: "Will this work on my version of Excel?",
                a: "Construction Calculator Pro works on Microsoft Excel 2016 or later (including Excel 2019, 2021, and Microsoft 365) on Windows or Mac with zero macros."
              },
              {
                q: "How does digital delivery work?",
                a: "Immediately upon payment, your complete digital toolkit (.zip bundle) is displayed on screen for instant download and automatically attached to your confirmation email."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-3 sm:p-3.5 text-left font-semibold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-2 cursor-pointer"
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

      {/* MOBILE STICKY BOTTOM BAR - DUAL QUICK ACTION */}
      {showStickyBar && (
        <div className="fixed bottom-0 inset-x-0 z-30 p-2 sm:p-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] bg-white/95 backdrop-blur-md border-t border-slate-200 sm:hidden flex items-center justify-between gap-2 shadow-lg animate-in slide-in-from-bottom duration-200">
          <Link
            href="/p/construction-calculator-pro/homeowner"
            className="flex-1 py-2.5 px-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1 shadow-sm text-center"
          >
            <span>🏡 Homeowner (₹299)</span>
          </Link>
          <Link
            href="/p/construction-calculator-pro/contractor"
            className="flex-1 py-2.5 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs flex items-center justify-center gap-1 shadow-sm text-center"
          >
            <span>👷 Contractor (₹299)</span>
          </Link>
        </div>
      )}

      <Footer />

      {/* 9:16 Instagram Reels Walkthrough Modal */}
      <ReelPreviewModal
        isOpen={isReelModalOpen}
        onClose={() => setIsReelModalOpen(false)}
        activeReelId="main-calculator"
        onSelectReel={() => {}}
        selectedAddonIds={[]}
        onToggleAddon={() => {}}
        onOpenCheckout={() => {}}
      />

      {/* 38-Tab Detailed Inspection Modal */}
      <SheetCatalogModal
        isOpen={isSheetModalOpen}
        onClose={() => setIsSheetModalOpen(false)}
        onOpenCheckout={() => {}}
        sheets={product.workbookSheets}
        price={product.price}
      />
    </div>
  );
}
