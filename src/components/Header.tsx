"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Zap, Sparkles } from "lucide-react";

interface HeaderProps {
  isFocusMode?: boolean;
  productTitle?: string;
  onCtaClick?: () => void;
  price?: number;
}

export default function Header({
  isFocusMode = false,
  onCtaClick,
  price = 499,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-9 h-9 rounded-xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform shrink-0 relative bg-[#021d39] border border-slate-800">
            <Image
              src="/icon.png"
              alt="ThinkTools Logo"
              width={36}
              height={36}
              priority
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center leading-none">
              <span className="text-lg font-black tracking-tight text-slate-950">
                Think<span className="text-[#65a30d]">Tools</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium tracking-tight mt-0.5">
              Tools for Better Work.
            </p>
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
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/20 cursor-pointer whitespace-nowrap"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Get Access (₹{price})</span>
            </button>
          </div>
        ) : (
          /* Standard Navigation: Free Tools, Products, Custom Solutions, About, FAQs + Discuss a Project CTA */
          <div className="flex items-center gap-4 sm:gap-8">
            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
              <Link
                href="/#products"
                className="hover:text-slate-950 transition-colors"
              >
                Products
              </Link>
              <Link
                href="/#custom-solutions"
                className="hover:text-slate-950 transition-colors"
              >
                Custom Solutions
              </Link>
              <Link
                href="/#about"
                className="hover:text-slate-950 transition-colors"
              >
                About
              </Link>
              <Link
                href="/#faqs"
                className="hover:text-slate-950 transition-colors"
              >
                FAQs
              </Link>
            </nav>

            <Link
              href="/#custom-solutions"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Discuss a Project</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
