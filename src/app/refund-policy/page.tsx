import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, AlertCircle, FileCheck, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Cancellation & Refund Policy — Thinktools.in",
  description: "Official cancellation and refund policy for digital toolkits and spreadsheet software on Thinktools.in.",
};

export default function RefundPolicyPage() {
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
              Legal & Compliance
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-950 mt-3 tracking-tight">
              Cancellation & Refund Policy
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              Digital Download Products · Last updated: 13 October 2026
            </p>
          </div>

          {/* Core Notice */}
          <div className="bg-amber-50/80 border border-amber-300 rounded-2xl p-5 text-xs sm:text-sm text-amber-950 leading-relaxed flex items-start gap-3.5">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block mb-1">All Sales Are Final</strong>
              Thinktools products (including the Construction Calculator Pro package) are digital goods delivered and made accessible immediately upon payment. Because the spreadsheet files (.xlsx) and PDF guides are non-tangible, irrevocable digital goods delivered immediately, we do not offer unconditional refunds, returns, or exchanges once access is granted.
            </div>
          </div>

          {/* Section 1 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 text-slate-900 text-xs flex items-center justify-center font-bold">1</span>
              What This Means
            </h2>
            <p>
              Because digital files are downloaded immediately and cannot be physically returned, we do not issue refunds for any of the following reasons:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>You changed your mind or purchased by mistake.</li>
              <li>You did not use the workbooks, or the templates did not suit your particular project preferences.</li>
              <li>You expected a proprietary cloud software app rather than an Excel workbook. All product pages clearly list that the toolkit consists of unlocked Microsoft Excel (.xlsx) workbooks and PDF guides.</li>
              <li>You use a spreadsheet application other than Microsoft Excel, Google Sheets, or Apple Numbers.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 text-slate-900 text-xs flex items-center justify-center font-bold">2</span>
              Please Check Before You Buy
            </h2>
            <p>
              We prioritize complete transparency. Before completing your purchase:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Review the real uncropped screenshots in our <strong>Calculator Gallery</strong> on the product page.</li>
              <li>Inspect the full 31-sheet index, use cases, and deliverable descriptions.</li>
              <li>Read the FAQ section covering units (Feet/Inches vs. Metres), compatibility with Google Sheets, and formula structures.</li>
              <li>
                If you have questions before buying, reach out to us via our{" "}
                <Link href="/contact" className="text-amber-800 font-semibold underline">
                  Contact & Support Desk
                </Link>
                . We respond promptly.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 text-slate-900 text-xs flex items-center justify-center font-bold">3</span>
              Legitimate Issues We Always Fix
            </h2>
            <p>
              An &ldquo;all sales final&rdquo; policy does not mean we ignore genuine technical problems. We will always resolve the following cases:
            </p>
            <div className="space-y-2.5 pt-1">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-semibold">Duplicate Charges</strong>
                  If your card or UPI was accidentally charged more than once for the same transaction, submit your payment IDs through our support desk and we will immediately refund the duplicate payment.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-semibold">Missing Delivery Link</strong>
                  If you completed payment but did not receive the on-screen download link or message within 15 minutes, let us know via support. We will resend the direct download link immediately. If we fail to deliver your files, we will issue a full refund.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-semibold">Corrupted or Damaged Files</strong>
                  If any downloaded file is corrupted or fails to open in standard spreadsheet applications, we will replace it with a tested, working copy.
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 text-slate-900 text-xs flex items-center justify-center font-bold">4</span>
              How to Contact Support
            </h2>
            <p>
              To request assistance under Section 3, submit a ticket via our <Link href="/contact" className="text-amber-800 font-semibold underline">Contact & Support Desk</Link> with your Full Name & Razorpay / UPI Payment ID.
            </p>
            <p className="text-slate-500 text-xs">
              We aim to review and reply within 1 to 2 business days. Approved refunds are credited back to the original payment method within 5 to 7 business days, depending on your bank.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-6">
            <h2 className="text-lg font-bold text-slate-950">5. Single-User Business License</h2>
            <p>
              Each purchase grants a non-exclusive, non-transferable license to use the workbooks for your personal projects or your own contracting/consulting business. Reselling, redistributing, or publicly sharing the files is strictly prohibited.
            </p>
            <p className="text-xs text-slate-500">
              By proceeding with payment on Thinktools.in, you acknowledge and agree to this Cancellation & Refund Policy.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
