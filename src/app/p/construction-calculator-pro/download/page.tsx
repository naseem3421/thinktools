"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Download,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function DownloadContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id") || "TT-839201";
  const name = searchParams.get("name") || "Valued Builder";
  const email = searchParams.get("email") || "your email";
  const hasBump = searchParams.get("bump") === "1";

  const handleDownload = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Success Badge */}
      <div className="text-center space-y-3 mb-8 sm:mb-10">
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <span className="inline-block text-xs uppercase font-bold tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full">
          Payment Verified • Lifetime License Active
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Thank You, {decodeURIComponent(name)}!
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
          Your order <strong className="text-amber-700 font-mono">#{orderId}</strong> for{" "}
          <strong className="text-slate-900">Construction Calculator Pro Package</strong> is complete. Your toolkit is ready for instant download below.
        </p>
      </div>

      <div className="space-y-6">
        {/* SINGLE MASTER ALL-IN-ONE DOWNLOAD BOX */}
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white p-6 sm:p-9 border-2 border-amber-500/50 shadow-2xl overflow-hidden">
          {/* Decorative ambient background accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/15 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Complete Package • Single Download</span>
            </div>

            <div className="space-y-2 max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Download Complete Toolkit (.ZIP)
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Includes all <strong>3 Excel Workbooks (.xlsx)</strong>, the <strong>43-Page Master Guide (PDF)</strong>, and all <strong>7 Anti-Fear Bonuses &amp; Templates</strong> in one master bundle.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-lg text-[11px] text-slate-300 font-mono">
              <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                <span className="text-amber-400 font-bold block">3 Workbooks</span>
                <span className="text-[10px] text-slate-400">All 31 Tabs (.xlsx)</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                <span className="text-amber-400 font-bold block">43-Page Guide</span>
                <span className="text-[10px] text-slate-400">Master PDF Manual</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                <span className="text-amber-400 font-bold block">7 Bonuses</span>
                <span className="text-[10px] text-slate-400">Audits, Scripts, Kits</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                <span className="text-amber-400 font-bold block">2.0 MB ZIP</span>
                <span className="text-[10px] text-slate-400">Offline &amp; Lifetime</span>
              </div>
            </div>

            <div className="w-full sm:w-auto pt-2 flex flex-col items-center gap-3">
              <a
                id="btn-download-all-zip"
                href="/downloads/Construction_Calculator_Pro_Complete_Bundle.zip"
                download="Construction_Calculator_Pro_Complete_Bundle.zip"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-base shadow-xl shadow-amber-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Download className="w-5 h-5 text-slate-950 stroke-[2.5]" />
                <span>Download All Files (.ZIP)</span>
              </a>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Instant Direct Download • Permanent Offline Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* ORDER BUMP FULFILLMENT (If selected) */}
        {hasBump && (
          <div className="bg-gradient-to-r from-amber-50 via-white to-amber-50/60 border border-amber-300 rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-bold shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                  Order Bump Unlocked
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                  Contractor Site Progress &amp; Labor Billing Suite
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Includes the Daily Site Progress Report (DPR), Subcontractor Agreement Template, and Mason/Helper Daily Wage Slips.
                </p>

                <div className="mt-3.5">
                  <button
                    onClick={() =>
                      handleDownload(
                        "Contractor_Site_Progress_Suite.csv",
                        "Contractor Site Progress & Labor Billing Suite\nDaily Progress Report, Subcontractor Agreement, Mason/Helper Wages\n"
                      )
                    }
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 cursor-pointer shadow-sm transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Progress Suite (.xlsx)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Support & Back Link */}
        <div className="border border-slate-200 bg-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 shadow-sm text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span>Need assistance or file re-delivery? Email our team at <strong className="text-slate-900">support@thinktools.in</strong></span>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-amber-800 hover:text-amber-900 font-semibold transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Thinktools Store</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header isFocusMode={false} />
      <main className="flex-1">
        <Suspense fallback={<div className="text-center py-20 text-slate-500">Loading order details...</div>}>
          <DownloadContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
