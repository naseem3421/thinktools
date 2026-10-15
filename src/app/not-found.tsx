import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Wrench, Search, Compass, FileSpreadsheet } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header isFocusMode={false} />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-xl w-full text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>404 · Page Not Found</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-5xl sm:text-7xl font-black text-slate-950 tracking-tight font-mono">
              4<span className="text-amber-500">0</span>4
            </h1>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              The blueprint you’re looking for doesn’t exist.
            </h2>
            <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
              The link you clicked may be broken, outdated, or moved. Let’s get you back to our smart digital toolkits.
            </p>
          </div>

          {/* Quick Helpful Navigation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            <Link
              href="/"
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    Thinktools Catalog
                  </h3>
                  <p className="text-[11px] text-slate-500">Explore all 24 digital calculators</p>
                </div>
              </div>
            </Link>

            <Link
              href="/p/construction-calculator-pro"
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    Construction Pro
                  </h3>
                  <p className="text-[11px] text-slate-500">Flagship 31-tab Excel bundle</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-xs transition-all"
            >
              <span>Contact Support</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
