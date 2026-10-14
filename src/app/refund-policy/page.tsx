import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, AlertCircle, FileCheck, CheckCircle2, Ban } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Cancellation & Refund Policy — Thinktools.in",
  description: "Official cancellation and refund policy for digital toolkits and spreadsheet software on Thinktools.in. We do not provide refunds; all sales are final.",
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
              Digital Download Products · Thinktools.in
            </p>
          </div>

          {/* Core Clean Notice Banner */}
          <div className="bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-5 text-xs sm:text-sm text-amber-950 leading-relaxed flex items-start gap-3.5 shadow-2xs">
            <Ban className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-extrabold text-slate-950 block text-sm mb-1">
                Strict No-Refund Policy · All Sales Are Final
              </strong>
              <p className="text-slate-800">
                <strong>We do not provide refunds.</strong> All products sold on Thinktools.in (including the Construction Calculator Pro package) are digital goods delivered and made accessible immediately upon payment. Because our Excel workbooks (.xlsx) and PDF guides are non-tangible, irrevocable digital downloads, once access is granted, <strong>all sales are strictly final, non-cancellable, and non-refundable</strong>.
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 text-slate-900 text-xs flex items-center justify-center font-bold">1</span>
              No Refunds & No Cancellations
            </h2>
            <p>
              Because digital files are downloaded immediately and cannot be returned, revoked, or retrieved, <strong>we do not provide refunds or accept cancellations</strong> for reasons including, but not limited to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>You changed your mind, no longer need the toolkit, or purchased by mistake.</li>
              <li>You decided not to use the templates or found your project plans changed.</li>
              <li>You expected a proprietary cloud software subscription rather than unlocked Microsoft Excel (.xlsx) workbooks and PDF guides. All product pages clearly describe the exact file formats.</li>
              <li>You use a spreadsheet viewer that does not support standard Microsoft Excel or Google Sheets formulas.</li>
              <li>Personal dissatisfaction with subjective design preferences, color schemes, or layout formatting.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 text-slate-900 text-xs flex items-center justify-center font-bold">2</span>
              Please Review Before You Buy
            </h2>
            <p>
              We maintain 100% transparency so you can make an informed decision before purchasing:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Inspect our real, uncropped screenshots in the <strong>Calculator Gallery</strong> on the product page.</li>
              <li>Review the complete index of 31 sheets, bonus guides, and deliverable descriptions.</li>
              <li>Read the FAQ section covering dual unit toggles (Feet/Inches & Metres), Google Sheets compatibility, and formulas.</li>
              <li>
                If you have any questions prior to purchase, contact our team via the{" "}
                <Link href="/contact" className="text-amber-800 font-semibold underline">
                  Contact & Support Desk
                </Link>
                .
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 text-slate-900 text-xs flex items-center justify-center font-bold">3</span>
              Genuine Technical Assistance (Non-Refund Support)
            </h2>
            <p>
              While we do not provide refunds on digital products, we are committed to ensuring you receive everything you paid for:
            </p>
            <div className="space-y-2.5 pt-1">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-semibold">Duplicate Charges</strong>
                  If your card or UPI was accidentally charged more than once for the same transaction due to a payment gateway error, share your payment transaction IDs and we will verify and promptly reverse the duplicate charge.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-semibold">Missing Delivery Email</strong>
                  If you completed payment but did not receive your delivery email with the attached toolkit bundle within 15 minutes, reach out via our support desk and our team will immediately re-dispatch your files.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-semibold">Corrupted or Damaged Files</strong>
                  If any downloaded file is corrupted or fails to open in standard spreadsheet applications (Excel, Google Sheets), we will promptly replace it with a fresh, verified copy.
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 text-slate-900 text-xs flex items-center justify-center font-bold">4</span>
              How to Reach Support
            </h2>
            <p>
              To request delivery assistance or report a duplicate charge, please visit our{" "}
              <Link href="/contact" className="text-amber-800 font-semibold underline">
                Contact & Support Desk
              </Link>{" "}
              or write directly to{" "}
              <a href="mailto:support@thinktools.in" className="text-amber-800 font-semibold underline">
                support@thinktools.in
              </a>{" "}
              with your Full Name and Razorpay / UPI Payment ID. Our support team responds within 1 business day.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-6">
            <h2 className="text-lg font-bold text-slate-950">5. Buyer Agreement</h2>
            <p className="text-slate-600">
              By proceeding with payment and downloading any toolkit from Thinktools.in, you explicitly acknowledge, understand, and agree that <strong>we do not provide refunds</strong> and that <strong>all digital sales are final</strong>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
