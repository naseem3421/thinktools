"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet,
  Zap,
  Play,
  Search
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-amber-500 selection:text-slate-950 font-sans">
      {/* Focused Navigation Header */}
      <Header
        isFocusMode={true}
        productTitle="Construction Calculator Pro"
        price={299}
      />

      {/* Top Launch Pill */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 py-1.5 px-3 text-center text-[11px] sm:text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 fill-current shrink-0" />
        <span>SPECIAL LAUNCH OFFER: ₹299/- (Regular ₹999/-) • 38 MASTER EXCEL SHEETS</span>
      </div>

      <main className="flex-1 flex flex-col justify-center py-8 sm:py-16 px-4 sm:px-6">
        <div className="max-w-xl mx-auto w-full text-center">
          
          {/* Engineering Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-[11px] font-semibold text-amber-950 mb-3 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Senior Civil Engineer Designed • IS &amp; CPWD Standards</span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight">
            Select Your Role to Continue
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 mb-6 max-w-md mx-auto">
            Choose your edition for customized templates, checklists, and bill verification:
          </p>

          {/* THE 2 ROLE BUTTONS - CLEAN, PROMINENT, MINIMUM DESCRIPTION */}
          <div className="space-y-3.5 sm:space-y-4">
            
            {/* BUTTON 1: HOMEOWNER */}
            <Link
              href="/p/construction-calculator-pro/homeowner"
              className="w-full group p-4 sm:p-5 rounded-2xl bg-white border-2 border-amber-400 hover:border-amber-500 shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex items-center justify-between gap-3.5 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 text-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  🏡
                </div>
                <div className="min-w-0">
                  <h2 className="text-base sm:text-lg font-black text-slate-950 leading-tight">
                    I am a Homeowner
                  </h2>
                  <p className="text-xs text-slate-600 mt-1 leading-snug">
                    Building or renovating my home • Verify contractor bills &amp; material quantities
                  </p>
                </div>
              </div>
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform shadow-xs">
                <ArrowRight className="w-4 h-4 font-bold" />
              </div>
            </Link>

            {/* BUTTON 2: CONTRACTOR */}
            <Link
              href="/p/construction-calculator-pro/contractor"
              className="w-full group p-4 sm:p-5 rounded-2xl bg-slate-900 border-2 border-slate-800 hover:border-amber-400 shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex items-center justify-between gap-3.5 text-left text-white cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 text-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  👷
                </div>
                <div className="min-w-0">
                  <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                    I am a Contractor / Engineer
                  </h2>
                  <p className="text-xs text-slate-300 mt-1 leading-snug">
                    Civil engineers &amp; builders • Fast client quotes, BBS &amp; site management
                  </p>
                </div>
              </div>
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform shadow-xs">
                <ArrowRight className="w-4 h-4 font-bold" />
              </div>
            </Link>

          </div>

          {/* Quick Previews: Watch Demo & Inspect Sheets */}
          <div className="mt-6 flex items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsReelModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs border border-slate-300 shadow-2xs transition-all cursor-pointer"
            >
              <Play className="w-3 h-3 text-amber-600 fill-amber-500" />
              <span>Watch 3-Min Demo</span>
            </button>
            <button
              type="button"
              onClick={() => setIsSheetModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs border border-slate-300 shadow-2xs transition-all cursor-pointer"
            >
              <Search className="w-3 h-3 text-amber-600" />
              <span>Inspect 38 Sheets</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-8 pt-5 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-500">
            <div className="flex items-center gap-1 font-medium text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Instant Download</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 font-medium text-slate-700">
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Unlocked Excel (.xlsx)</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 font-medium text-slate-700">
              <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Lifetime Access</span>
            </div>
          </div>

        </div>
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
