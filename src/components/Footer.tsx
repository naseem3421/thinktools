import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Mail, CreditCard } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-100/90 border-t border-slate-200 py-12 text-slate-600 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-[#172033] border border-slate-800 shrink-0 shadow-xs">
              <Image
                src="/icon.png"
                alt="ThinkTools Logo"
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-base font-black text-[#172033] tracking-tight">
                Think<span className="text-[#65a30d]">Tools</span>
              </span>
              <p className="text-xs text-slate-700 font-semibold">Tools for Better Work.</p>
              <p className="text-[11px] text-slate-500">
                Digital products and custom software solutions for practical workflows.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-slate-600 text-xs">
            <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Digital Product Delivery
            </span>
            <span className="flex items-center gap-1.5 text-slate-700 font-medium">
              <CreditCard className="w-4 h-4 text-slate-600" />
              Checkout via Supported Payment Methods
            </span>
          </div>
        </div>

        {/* Links Navigation Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pt-2 pb-6 border-b border-slate-200 text-xs">
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
              Explore
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#products" className="hover:text-slate-900 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/#custom-solutions" className="hover:text-slate-900 transition-colors">
                  Custom Solutions
                </Link>
              </li>
              <li>
                <Link href="/#faqs" className="hover:text-slate-900 transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="hover:text-slate-900 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@thinktools.in"
                  className="hover:text-slate-900 transition-colors flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5 text-[#172033] shrink-0" />
                  <span>support@thinktools.in</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1 md:col-span-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
              Legal
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <li>
                <Link href="/terms" className="hover:text-slate-900 transition-colors">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-slate-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-slate-900 transition-colors">
                  Cancellation & Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-slate-900 transition-colors">
                  Shipping & Delivery Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px] pt-1">
          <p>© 2026 ThinkTools. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
