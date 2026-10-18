"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Zap, Menu, X, ArrowRight } from "lucide-react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#011c37] border-b border-slate-800/80 shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-13 sm:h-14 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center group shrink-0">
          <Image
            src="/logo.png"
            alt="ThinkTools - Work Smarter."
            width={180}
            height={44}
            priority
            className="h-7.5 sm:h-8.5 md:h-9 w-auto object-contain group-hover:opacity-95 transition-opacity"
          />
        </Link>

        {isFocusMode ? (
          /* Focus Mode (Meta Ads Landing Page): Trust badge + Direct Buy CTA */
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="hidden md:flex items-center gap-1.5 text-[11px] text-emerald-300 bg-emerald-950/70 border border-emerald-800/70 px-2.5 py-1 rounded-full font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Instant Download • One-Time Payment</span>
            </div>

            <button
              onClick={onCtaClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/20 cursor-pointer whitespace-nowrap"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Get Access (₹{price})</span>
            </button>
          </div>
        ) : (
          /* Standard Navigation: Products, Custom Solutions, About, FAQs + Discuss a Project CTA */
          <div className="flex items-center gap-4 sm:gap-7">
            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-200">
              <Link
                href="/#products"
                className="hover:text-[#b6f84c] transition-colors"
              >
                Products
              </Link>
              <Link
                href="/#custom-solutions"
                className="hover:text-[#b6f84c] transition-colors"
              >
                Custom Solutions
              </Link>
              <Link
                href="/#about"
                className="hover:text-[#b6f84c] transition-colors"
              >
                About
              </Link>
              <Link
                href="/#faqs"
                className="hover:text-[#b6f84c] transition-colors"
              >
                FAQs
              </Link>
            </nav>

            <Link
              href="/#custom-solutions"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#b6f84c] hover:bg-[#a3e635] text-[#011c37] text-xs sm:text-sm font-black shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Discuss a Project</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {!isFocusMode && mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#011c37] px-4 py-5 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3 text-sm font-semibold text-slate-200">
            <Link
              href="/#products"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-800/70 hover:text-[#b6f84c] transition-colors"
            >
              Products
            </Link>
            <Link
              href="/#custom-solutions"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-800/70 hover:text-[#b6f84c] transition-colors"
            >
              Custom Solutions
            </Link>
            <Link
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-800/70 hover:text-[#b6f84c] transition-colors"
            >
              About
            </Link>
            <Link
              href="/#faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-800/70 hover:text-[#b6f84c] transition-colors"
            >
              FAQs
            </Link>
            <div className="pt-2">
              <Link
                href="/#custom-solutions"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#b6f84c] hover:bg-[#a3e635] text-[#011c37] text-sm font-black shadow-xs"
              >
                <span>Discuss a Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
