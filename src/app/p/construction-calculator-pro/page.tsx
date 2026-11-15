"use client";

import React, { useState } from "react";
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
  ChevronDown
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

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-amber-500 selection:text-slate-950 font-sans">
      {/* Focused Navigation Header */}
      <Header
        isFocusMode={true}
        productTitle="Construction Calculator Pro"
        price={299}
      />

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 py-1.5 px-3 text-center text-[10px] sm:text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 fill-current shrink-0" />
        <span className="leading-tight">
          🚀 SPECIAL LAUNCH: ₹299/- (Regular ₹999/-) • 38 CONNECTED SHEETS • 100% UNLOCKED EXCEL • CHOOSE YOUR ROLE BELOW
        </span>
      </div>

      <main className="flex-1 pb-16 sm:pb-12">
        {/* HERO GATEWAY SECTION */}
        <section className="relative pt-6 pb-10 sm:pt-10 sm:pb-16 overflow-hidden bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:32px_32px]">
          <div className="max-w-6xl mx-auto px-3.5 sm:px-6 relative z-10 text-center">
            {/* Standards Authority Pill */}
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 border-2 border-amber-500/70 text-xs text-slate-900 shadow-xs mb-3">
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

            {/* Main Headline */}
            <h1 className="text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-[1.15] max-w-4xl mx-auto">
              Build a Home. Renovate a Flat. Quote a Client.{" "}
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent block mt-1.5">
                Who Are You Planning Construction For?
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto mt-2.5">
              Select your role below so we tailor the calculation guidelines, bill audit safeguards, and specialized companion workbooks for your exact needs.
            </p>

            {/* Watch Demo & Inspect Sheets Triggers */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsReelModalOpen(true)}
                className="animate-blink-glow inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm border border-amber-300 shadow-sm transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>Watch 3-Minute Video Demo</span>
              </button>
              <button
                type="button"
                onClick={() => setIsSheetModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm border border-slate-300 shadow-2xs transition-all cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-amber-600" />
                <span>Inspect 38 Sheets &amp; Formulas</span>
              </button>
            </div>

            {/* THE TWO MAIN CHOICE CARDS */}
            <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 text-left max-w-4xl mx-auto">
              {/* CARD 1: HOMEOWNER */}
              <div className="bg-white border-2 border-slate-300 hover:border-amber-500 rounded-3xl p-5 sm:p-7 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase text-amber-900 bg-amber-100 border border-amber-200 px-3 py-1 rounded-full">
                      Homeowner Edition
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-mono">
                      Special: ₹299
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    🏡
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight leading-snug">
                    I am a Homeowner / Building My Own House
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    For individuals building a new independent house, villa, or renovating a flat. Avoid costly contractor overcharging and budget shocks.
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Audit Contractor Bills:</strong> Cross-check actual cement, steel &amp; plaster usage before releasing payment.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Beginner Mode &amp; 4 Ready Plans:</strong> 2BHK, 3BHK, Villa, and Renovation templates pre-configured.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>3 Homeowner Add-on Tools:</strong> House Budget Tracker, Stage Payment Planner &amp; Quality Checklist.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href="/p/construction-calculator-pro/homeowner"
                    className="w-full py-3.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm tracking-wide shadow-md shadow-amber-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer group-hover:translate-x-0.5"
                  >
                    <span>Continue as Homeowner</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <p className="text-[11px] text-slate-500 text-center mt-2">
                    Standalone: ₹299 • 4-in-1 Master Bundle: ₹499
                  </p>
                </div>
              </div>

              {/* CARD 2: CONTRACTOR */}
              <div className="bg-white border-2 border-slate-300 hover:border-amber-500 rounded-3xl p-5 sm:p-7 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase text-amber-900 bg-amber-100 border border-amber-200 px-3 py-1 rounded-full">
                      Contractor Edition
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-mono">
                      Special: ₹299
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    👷
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight leading-snug">
                    I am a Contractor / Builder / Site Engineer
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    For civil contractors, building thekedars, and junior site engineers. Quote clients fast, factor in cutting wastage, and protect your margins.
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>15-Minute Client Proposals:</strong> Generate neat, professional itemized quotes with current local market rates.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Pro Mode &amp; Unit Toggle:</strong> Feet-Inches ⇄ Metres toggle, rebar BBS schedules &amp; cutting wastage.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>3 Contractor Add-on Tools:</strong> Site Expense &amp; Profit Tracker, Labour Wage Registers &amp; Milestone Billing.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href="/p/construction-calculator-pro/contractor"
                    className="w-full py-3.5 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white hover:text-amber-300 font-black text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer group-hover:translate-x-0.5"
                  >
                    <span>Continue as Contractor</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </Link>
                  <p className="text-[11px] text-slate-500 text-center mt-2">
                    Standalone: ₹299 • 4-in-1 Master Bundle: ₹499
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Line */}
            <div className="mt-8 pt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant On-Screen Download + Email Backup</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Unlocked Excel (.xlsx) · Zero Macros</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                <span>One-Time Payment · Lifetime Access</span>
              </div>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="py-7 sm:py-10 max-w-3xl mx-auto px-3.5 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-5 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-2.5">
            {[
              {
                q: "What is the difference between the Homeowner and Contractor editions?",
                a: "Both editions include the full Master 38-Sheet Construction Calculator Excel file (.xlsx) with all formulas unlocked. The Homeowner edition is focused on bill verification, material fraud prevention, and includes companion add-ons for home budgeting, stage-wise payment milestones, and quality checklists. The Contractor edition is focused on rapid client quoting, site margin protection, and includes add-ons for site petty cash expenses, daily labour attendance registers, and client payment collection."
              },
              {
                q: "Do I need prior civil engineering experience to use this?",
                a: "No. The system is designed for homeowners and contractors alike. Beginner mode activates plain-English guidance on every tab and marks advanced sheets as optional. You can pick a ready-made starter plan to get an estimate in 30 seconds, or enter your room sizes in the yellow input cells. All formulas in green cells are calculated and protected."
              },
              {
                q: "Will this work on my version of Excel?",
                a: "Construction Calculator Pro requires Microsoft Excel 2016 or later (including Excel 2019, 2021, and Microsoft 365) on Windows or Mac. The workbook uses native multi-tab formulas and formatting with zero macros."
              },
              {
                q: "How does digital delivery work?",
                a: "Immediately upon payment, your complete digital toolkit (.zip bundle) is displayed on screen for instant download and automatically attached to your confirmation email. Lifetime access with zero subscriptions."
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
