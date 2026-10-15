"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, Check } from "lucide-react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("thinktools_cookie_consent");
      if (!consent) {
        // Show after a brief delay so it feels smooth
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage unavailable
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("thinktools_cookie_consent", "accepted");
    } catch {}
    setIsVisible(false);
  };

  const handleDismiss = () => {
    try {
      localStorage.setItem("thinktools_cookie_consent", "dismissed");
    } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-md text-white border border-slate-700/80 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 font-sans"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
          <Cookie className="w-4 h-4" />
        </div>

        <div className="flex-1 space-y-2">
          <p className="text-xs text-slate-200 leading-relaxed">
            We use essential cookies and anonymous analytics to ensure secure checkout, fast digital file delivery, and reliable performance. Learn more in our{" "}
            <Link
              href="/privacy-policy"
              className="text-amber-400 underline underline-offset-2 hover:text-amber-300 font-semibold"
            >
              Privacy Policy
            </Link>
            .
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleAccept}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
            >
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Got it</span>
            </button>
            <button
              onClick={handleDismiss}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          aria-label="Close cookie banner"
          className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
