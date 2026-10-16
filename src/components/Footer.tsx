import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Mail, Lock, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#172033] border-t border-slate-800 text-slate-300 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shrink-0 shadow-xs">
                <Image
                  src="/icon.png"
                  alt="ThinkTools Logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-heading text-base font-bold text-white tracking-tight">
                  Think<span className="text-[#B9F36B]">Tools</span>
                </span>
                <p className="text-[11px] text-[#B9F36B] font-medium">Work Smarter.</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Practical digital tools, calculators, and engineering templates engineered to help you save time, reduce manual work, and make confident decisions.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#B9F36B]" />
                Instant Digital Delivery
              </span>
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <Lock className="w-4 h-4 text-[#B9F36B]" />
                Secure Checkout
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#catalog" className="text-slate-400 hover:text-white transition-colors">
                  Tools & Calculators
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="text-slate-400 hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/#digital-products" className="text-slate-400 hover:text-white transition-colors">
                  Digital Products
                </Link>
              </li>
              <li>
                <Link href="/p/construction-calculator-pro" className="inline-flex items-center gap-1 text-[#B9F36B] hover:underline font-medium">
                  Construction Pro <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#why-us" className="text-slate-400 hover:text-white transition-colors">
                  Why ThinkTools
                </Link>
              </li>
              <li>
                <Link href="/#faqs" className="text-slate-400 hover:text-white transition-colors">
                  Help & FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider">Legal & Compliance</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-slate-400 hover:text-white transition-colors">
                  Cancellation & Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="text-slate-400 hover:text-white transition-colors">
                  Shipping & Delivery Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <p>© 2026 ThinkTools. All rights reserved.</p>
          <a
            href="mailto:support@thinktools.in"
            className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#B9F36B]" />
            <span>support@thinktools.in</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
