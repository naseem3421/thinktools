"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Download,
  Mail,
  Search,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet,
  RefreshCw,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface DownloadItem {
  file: string;
  title: string;
  url: string;
}

interface ResendResponse {
  success: boolean;
  message?: string;
  error?: string;
  order_id?: string;
  customer_email?: string;
  customer_name?: string;
  product_title?: string;
  downloads?: DownloadItem[];
}

export default function ResendPage() {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ResendResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setErrorMsg("Please enter your registered email address or Order ID.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setResult(null);

    try {
      const res = await fetch("/api/order-resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim() }),
      });

      const data: ResendResponse = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Failed to locate order. Please check the details entered.");
      } else {
        setResult(data);
      }
    } catch {
      setErrorMsg("Connection error. Please check your internet and try again.");
    } finally {
      setLoading(false);
    }
  };

  const waMessage = encodeURIComponent(
    `Hi Thinktools Support, I need help accessing my Construction Calculator package. My email / reference is: ${query}`
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      <Header />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span>Self-Service File Recovery</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Resend My Download Package
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Lost your files or missed your confirmation email? Enter your registered email address or Razorpay Order ID to regenerate active download links instantly.
          </p>
        </div>

        {/* Search Card */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="query" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Registered Email or Order / Payment ID:
              </label>
              <div className="relative">
                <input
                  id="query"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. yourname@gmail.com or order_Tw8t..."
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-mono"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-2 top-2 bottom-2 px-5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>Find Files</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-950/50 border border-red-800/60 text-red-300 text-xs flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed">{errorMsg}</div>
              </div>
            )}
          </form>

          {/* Success Result Container */}
          {result && result.downloads && (
            <div className="space-y-6 pt-6 border-t border-slate-800">
              <div className="rounded-2xl bg-emerald-950/40 border border-emerald-500/30 p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm sm:text-base">
                    Order Verified: #{result.order_id}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {result.message}
                  </p>
                  <p className="text-xs text-emerald-400 font-semibold mt-1">
                    Licensed to: {result.customer_name} ({result.customer_email})
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Download Your Files Instantly:</span>
                </h4>

                <div className="grid grid-cols-1 gap-3">
                  {result.downloads.map((item, idx) => (
                    <div
                      key={item.file}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                          <FileSpreadsheet className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm">{item.title}</div>
                          <div className="text-[11px] text-slate-400">7-Day Download Token Activated</div>
                        </div>
                      </div>

                      <a
                        href={item.url}
                        download
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/10 shrink-0"
                      >
                        <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Download (.zip)</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center pt-2">
                <Link
                  href={`/order/${result.order_id}`}
                  className="text-xs text-amber-400 hover:underline font-semibold"
                >
                  Open Order Status Dashboard ➔
                </Link>
              </div>
            </div>
          )}

          {/* Fallback Support Assistance */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              Still having trouble? We’re here to help!
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/919345048201?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Support</span>
              </a>
              <span>•</span>
              <a
                href="mailto:orders@thinktools.in"
                className="text-amber-400 hover:text-amber-300 font-semibold"
              >
                orders@thinktools.in
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Thinktools Homepage</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

