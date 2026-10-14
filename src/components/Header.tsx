"use client";

import React from "react";
import Link from "next/link";
import { Wrench, ShieldCheck, Zap, Sparkles } from "lucide-react";

interface HeaderProps {
  isFocusMode?: boolean;
  productTitle?: string;
  onCtaClick?: () => void;
  price?: number;
}

export default function Header({
  isFocusMode = false,
  productTitle,
  onCtaClick,
  price = 499,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform shrink-0">
            <Wrench className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center">
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900">
                Think<span className="text-amber-600">tools</span>
              </span>
            </div>
            <p className="text-[10px] text-slate-500 -mt-1 hidden sm:block">Smart Digital Toolkits</p>
          </div>
        </Link>

        {isFocusMode ? (
          /* Focus Mode (Meta Ads Landing Page): Only Trust indicators + Direct CTA */
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Lifetime License</span>
            </div>

            <button
              onClick={onCtaClick}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/20 cursor-pointer whitespace-nowrap"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Get Access (₹{price})</span>
            </button>
          </div>
        ) : (
          /* Standard Hub Navigation */
          <nav className="flex items-center gap-2.5 sm:gap-6">
            <Link
              href="/#catalog"
              className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors hidden md:inline-block"
            >
              Tool Catalog
            </Link>
            <Link
              href="/#why-us"
              className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors hidden lg:inline-block"
            >
              Why Thinktools
            </Link>
            <Link
              href="/#faqs"
              className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors hidden lg:inline-block"
            >
              FAQs
            </Link>
            <Link
              href="/p/construction-calculator-pro"
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span><span className="hidden sm:inline">Construction </span>Pro (₹{price})</span>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
