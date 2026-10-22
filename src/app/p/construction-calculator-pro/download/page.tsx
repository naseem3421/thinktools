"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Mail,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  Clock,
  HelpCircle,
  Download
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function DownloadContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id") || "TT-839201";
  const name = searchParams.get("name") || "Valued Builder";
  const email = searchParams.get("email") || "your email address";
  const decodedEmail = decodeURIComponent(email);
  const decodedName = decodeURIComponent(name);

  const isGmail = decodedEmail.toLowerCase().includes("@gmail.com");
  const emailClientUrl = isGmail ? "https://mail.google.com/mail/u/0/#search/thinktools" : `mailto:`;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Success Badge */}
      <div className="text-center space-y-3 mb-8 sm:mb-10">
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <span className="inline-block text-xs uppercase font-bold tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full">
          Payment Confirmed • Digital Files Dispatched
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Check Your Email, {decodedName}!
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
          Your complete <strong className="text-slate-900">Construction Calculator Pro Package</strong> has been sent directly to:
          <br />
          <span className="inline-block mt-1 font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-lg text-sm sm:text-base">
            {decodedEmail}
          </span>
        </p>
      </div>

      <div className="space-y-6">
        {/* EMAIL DISPATCH CONFIRMATION CARD */}
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white p-6 sm:p-9 border-2 border-amber-500/50 shadow-2xl overflow-hidden">
          {/* Decorative ambient background accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/15 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>Direct Attachment Inside Your Email</span>
            </div>

            <div className="space-y-2 max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Toolkit Delivered to Your Inbox
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                For security and permanent offline access, your files are attached directly to your confirmation email as a single master archive:
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 w-full max-w-lg text-left space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-white/10">
                <span className="text-slate-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  Attached File:
                </span>
                <span className="font-mono font-bold text-amber-300">
                  Construction_Calculator_Pro_Excel.zip (1.9 MB)
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/10">
                <span className="text-slate-400 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  Sent From:
                </span>
                <span className="font-mono text-slate-200">orders@thinktools.in</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-400 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                  Delivery Status:
                </span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Dispatched (Arrives in 1–2 mins)
                </span>
              </div>
            </div>

            <div className="w-full sm:w-auto pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                id="btn-direct-download"
                href="/api/download"
                download="Construction_Calculator_Pro_Excel.zip"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-base shadow-xl shadow-amber-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Download className="w-5 h-5 text-slate-950 stroke-[2.5]" />
                <span>Download Files Now (.zip)</span>
              </a>

              <a
                id="btn-open-email"
                href={emailClientUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>{isGmail ? "Open Gmail" : "Open Email"}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>

            <p className="text-xs text-slate-400 font-mono">
              Order Reference: <strong className="text-slate-300">#{orderId}</strong>
            </p>
          </div>
        </div>

        {/* HELPFUL TIPS CARD */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <HelpCircle className="w-4.5 h-4.5 text-amber-600" />
            <span>Don&apos;t see the email yet?</span>
          </div>
          <ul className="text-xs text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
            <li>
              Please check your <strong>Spam / Junk</strong> folder or the <strong>Promotions / Updates</strong> tab in your email provider.
            </li>
            <li>
              Search for subject: <strong className="text-slate-800">&quot;Your Construction Calculator Pro Package&quot;</strong> or sender <strong className="text-slate-800">orders@thinktools.in</strong>.
            </li>
            <li>
              In rare cases, email providers take 2–3 minutes to scan attachments before showing them in your inbox.
            </li>
            <li>
              Need immediate help or manual re-dispatch? Reply or email us anytime at <a href="mailto:support@thinktools.in" className="text-amber-700 underline font-semibold">support@thinktools.in</a> with your Order ID <strong className="text-slate-800">#{orderId}</strong>.
            </li>
          </ul>
        </div>

        {/* Back Link */}
        <div className="border border-slate-200 bg-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 shadow-sm text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span>Official Digital Goods Receipt • Thinktools.in</span>
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
