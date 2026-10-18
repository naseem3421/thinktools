import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Mail, CreditCard } from "lucide-react";

function InstagramIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-[#011c37] border-t border-slate-800/80 py-12 text-slate-300 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="ThinkTools - Work Smarter."
                width={180}
                height={44}
                className="h-7.5 sm:h-8.5 md:h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-[11px] text-slate-400 max-w-sm sm:border-l sm:border-slate-800 sm:pl-4">
              Digital products and custom software solutions for practical workflows.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-slate-300 text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Digital Product Delivery
            </span>
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <CreditCard className="w-4 h-4 text-slate-400" />
              Checkout via Supported Payment Methods
            </span>
          </div>
        </div>

        {/* Links Navigation Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pt-2 pb-6 border-b border-slate-800/80 text-xs">
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Explore
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#products" className="text-slate-400 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/#custom-solutions" className="text-slate-400 hover:text-white transition-colors">
                  Custom Solutions
                </Link>
              </li>
              <li>
                <Link href="/#faqs" className="text-slate-400 hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@thinktools.in"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#b6f84c] shrink-0" />
                  <span>support@thinktools.in</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/thinktools.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-[#b6f84c] shrink-0" />
                  <span>Instagram</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1 md:col-span-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Legal
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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

        {/* Bottom copyright line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px] pt-1">
          <p>© {new Date().getFullYear()} ThinkTools. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/thinktools.in"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ThinkTools Instagram"
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-[#b6f84c] transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-[#b6f84c]" />
              <span className="font-medium">@thinktools.in</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
