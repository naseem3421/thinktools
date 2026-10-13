import React from "react";
import Link from "next/link";
import { Wrench, ShieldCheck, Mail, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-100/90 border-t border-slate-200 py-12 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-600">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 tracking-tight">
                Thinktools<span className="text-amber-600">.in</span>
              </span>
              <p className="text-[11px] text-slate-500">Premium digital tools for builders, professionals & creators</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-slate-600 text-xs">
            <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Verified Digital Goods Delivery
            </span>
            <span className="flex items-center gap-1.5 text-slate-700 font-medium">
              <Lock className="w-4 h-4 text-amber-600" />
              Razorpay / UPI Secure Payment
            </span>
            <span className="flex items-center gap-1.5 text-slate-700 font-medium">
              <Mail className="w-4 h-4 text-blue-600" />
              support@thinktools.in
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© 2026 Thinktools.in — All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-slate-800 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/" className="hover:text-slate-800 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-slate-800 transition-colors">
              Refund Policy (7 Days)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
