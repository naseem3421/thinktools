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
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-9 h-9 rounded-xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform shrink-0 relative bg-[#172033] border border-slate-800">
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
              <span className="text-lg font-black tracking-tight text-[#172033]">
                Think<span className="text-[#65a30d]">Tools</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium tracking-tight mt-0.5">
              Tools for Better Work.
            </p>
          </div>
        </Link>

        {isFocusMode ? (
          /* Focus Mode (Meta Ads Landing Page): Trust badge + Direct Buy CTA */
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
          /* Standard Navigation: Products, Custom Solutions, About, FAQs + Discuss a Project CTA */
          <div className="flex items-center gap-4 sm:gap-8">
            <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
              <Link
                href="/#products"
                className="hover:text-[#172033] transition-colors"
              >
                Products
              </Link>
              <Link
                href="/#custom-solutions"
                className="hover:text-[#172033] transition-colors"
              >
                Custom Solutions
              </Link>
              <Link
                href="/#about"
                className="hover:text-[#172033] transition-colors"
              >
                About
              </Link>
              <Link
                href="/#faqs"
                className="hover:text-[#172033] transition-colors"
              >
                FAQs
              </Link>
            </nav>

            <Link
              href="/#custom-solutions"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#172033] hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Discuss a Project</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {!isFocusMode && mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-5 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3 text-sm font-semibold text-slate-700">
            <Link
              href="/#products"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-[#172033] transition-colors"
            >
              Products
            </Link>
            <Link
              href="/#custom-solutions"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-[#172033] transition-colors"
            >
              Custom Solutions
            </Link>
            <Link
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-[#172033] transition-colors"
            >
              About
            </Link>
            <Link
              href="/#faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-[#172033] transition-colors"
            >
              FAQs
            </Link>
            <div className="pt-2">
              <Link
                href="/#custom-solutions"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#172033] text-white text-sm font-bold shadow-xs"
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
