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
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-2xs transition-all">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden shadow-xs group-hover:scale-105 transition-transform shrink-0 relative bg-[#172033] border border-slate-800">
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
              <span className="font-heading text-base sm:text-lg font-black tracking-tight text-[#172033]">
                Think<span className="text-[#65a30d]">Tools</span>
              </span>
            </div>
            <p className="text-[10px] text-[#64748B] font-medium tracking-tight mt-0.5 hidden sm:block">
              Work Smarter.
            </p>
          </div>
        </Link>

        {isFocusMode ? (
          /* Focus Mode (Meta Ads Landing Page): Only Trust indicators + Direct CTA */
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Lifetime License</span>
            </div>

            <button
              onClick={onCtaClick}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#B9F36B] hover:bg-[#a8eb56] text-[#172033] font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer whitespace-nowrap"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Get Access (₹{price})</span>
            </button>
          </div>
        ) : (
          /* Standard Hub Navigation */
          <nav className="flex items-center gap-2 sm:gap-5 lg:gap-6">
            <Link
              href="/#catalog"
              className="text-xs sm:text-sm font-medium text-[#172033] hover:text-[#475569] transition-colors hidden md:inline-block"
            >
              Tools
            </Link>
            <Link
              href="/#categories"
              className="text-xs sm:text-sm font-medium text-[#172033] hover:text-[#475569] transition-colors hidden md:inline-block"
            >
              Categories
            </Link>
            <Link
              href="/#digital-products"
              className="text-xs sm:text-sm font-medium text-[#172033] hover:text-[#475569] transition-colors hidden lg:inline-block"
            >
              Digital Products
            </Link>
            <Link
              href="/#why-us"
              className="text-xs sm:text-sm font-medium text-[#172033] hover:text-[#475569] transition-colors hidden lg:inline-block"
            >
              Why ThinkTools
            </Link>
            <Link
              href="/#faqs"
              className="text-xs sm:text-sm font-medium text-[#172033] hover:text-[#475569] transition-colors hidden lg:inline-block"
            >
              FAQs
            </Link>
            <Link
              href="/#catalog"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#B9F36B] hover:bg-[#a8eb56] text-[#172033] text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Explore Tools</span>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
