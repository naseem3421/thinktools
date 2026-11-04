import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Cpu, HardHat, FileSpreadsheet, Sparkles, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About ThinkTools | Practical Engineering & Estimation Digital Engines",
  description: "Learn about ThinkTools.in — our mission to empower Indian civil engineers, builders, and contractors with offline, professional Excel estimation engines and custom software solutions.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
        {/* Breadcrumb / Back button */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-900 flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">About ThinkTools</span>
        </div>

        {/* Hero Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Work Smarter • Built for Indian Builders</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Engineering Precision. No Subscriptions. Just Practical Tools.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            ThinkTools creates battle-tested Excel calculation engines, workflow automation, and custom digital toolkits tailored for Indian civil engineers, construction contractors, and site supervisors.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <HardHat className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Indian Standard (IS) Aligned</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every formula in our Construction Calculator Pro toolkit is validated against IS 456, IS 1200, and standard CPWD / PWD measurement practices.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">100% Offline Lifetime Ownership</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No SaaS monthly fees. No internet lock-in. You download unlocked Excel sheets that work on site, on mobile, and on desktop permanently.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Agent-Ready &amp; Automated</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Built with open WebMCP protocols, structured Schema.org knowledge graphs, and instant automated digital delivery via verified UPI / cards.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Why We Started ThinkTools
          </h2>
          <p>
            In Indian construction, contractors and site supervisors lose lakhs of rupees every month to manual calculation errors, contractor material overages, and unbudgeted waste. Most available software solutions are either overpriced enterprise software designed for Western construction methods or fragile mobile apps loaded with ads.
          </p>
          <p>
            We created <strong>ThinkTools</strong> to bridge this gap. Starting with our flagship <strong>Construction Calculator Pro (31 Sheets)</strong>, we package complex civil engineering mathematics into intuitive, instant-calculation workbooks that anyone with basic Excel can use within five minutes.
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 space-y-1">
              <strong className="text-slate-900">Registered Office &amp; Operations:</strong>
              <p>Thinktools.in • Anna Nagar, Chennai, Tamil Nadu 600040, India.</p>
              <p>Customer Support: <a href="mailto:support@thinktools.in" className="text-amber-800 underline font-semibold">support@thinktools.in</a> | Orders: <a href="mailto:orders@thinktools.in" className="text-amber-800 underline font-semibold">orders@thinktools.in</a></p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-3xl bg-[#011c37] text-white p-6 sm:p-10 text-center space-y-4 shadow-xl">
          <h3 className="text-xl sm:text-2xl font-black tracking-tight">
            Explore Our Digital Construction Toolkits
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Get instant access to the complete 31-sheet Construction Calculator Pro and all 3 companion business tools for just ₹299 / ₹499.
          </p>
          <div className="pt-2">
            <Link
              href="/p/construction-calculator-pro"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm shadow-lg transition-transform hover:scale-105"
            >
              <span>View Construction Calculator Pro</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

