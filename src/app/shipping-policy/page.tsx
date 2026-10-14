import React from "react";
import Link from "next/link";
import { ArrowLeft, Download, Zap, Mail, Smartphone, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Shipping & Delivery Policy — Thinktools.in",
  description: "Instant digital shipping and delivery policy for software files, spreadsheets, and guides on Thinktools.in.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header isFocusMode={false} />

      <main className="flex-1 py-12 md:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Thinktools Store</span>
          </Link>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
          {/* Header */}
          <div className="border-b border-slate-100 pb-6">
            <span className="text-[11px] uppercase tracking-wider font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              Fulfillment & Delivery
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-950 mt-3 tracking-tight">
              Shipping & Delivery Policy
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              Instant Online Digital Delivery · Last updated: 13 October 2026
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-950">1. Instant Digital Delivery (No Physical Goods)</h2>
            <p>
              All products sold on Thinktools.in are <strong>digital products</strong> (unlocked Microsoft Excel spreadsheets in .xlsx format and instructional PDF documents). No physical goods or boxed discs are shipped to your physical address. Therefore, there are <strong>zero shipping fees</strong> associated with any purchase.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-950">2. Delivery Methods & Timeline</h2>
            <p>Upon successful payment via Razorpay, your digital files are delivered via automated channels:</p>
            <div className="space-y-3 pt-1">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-semibold">1. Direct Email Delivery with Attached Bundle (&lt; 2 Minutes)</strong>
                  A confirmation email from <code>orders@thinktools.in</code> containing your complete master package (all Excel workbooks and PDF guides in a single 2.0 MB .zip archive attached directly) is dispatched to your registered checkout email address.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-semibold">2. Permanent Lifetime Offline Access</strong>
                  Because the files are attached directly to your email, you retain permanent, lifetime access to the tools offline on your phone, tablet, laptop, or PC without needing to bookmark or rely on external web links.
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-950">3. Did Not Receive Your Download Link?</h2>
            <p>
              In rare instances where email delivery is delayed by email providers or caught by spam filters, please check your Spam/Junk folder first. If you still have not received your files within 15 minutes of payment, please reach out to us via our <Link href="/contact" className="text-amber-800 underline font-semibold">Contact & Support Desk</Link> with your Full Name and Razorpay Payment ID.
            </p>
            <p className="text-xs text-slate-500">
              Our digital support desk will manually re-dispatch your download link directly to your alternate email address.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
