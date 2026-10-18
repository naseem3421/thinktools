import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Cancellation & Refund Policy — Thinktools.in",
  description: "Digital product delivery and cancellation policy for Thinktools.in. We offer comprehensive customer and technical support to ensure your files work seamlessly.",
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
              Commercial Policy
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-950 mt-3 tracking-tight">
              Cancellation & Refund Policy
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              Digital Download Products · Thinktools.in
            </p>
          </div>

          {/* Reassuring Digital Notice Banner */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 text-xs sm:text-sm text-emerald-950 leading-relaxed flex items-start gap-3.5 shadow-2xs">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-extrabold text-slate-950 block text-sm mb-1">
                Instant Digital Delivery & Support Commitment
              </strong>
              <p className="text-slate-700">
                All toolkits and workbooks on Thinktools.in (including Construction Calculator Pro) are digital products delivered directly to your email inbox immediately upon payment. Because downloadable files cannot be returned or revoked once delivered, digital sales are final. Our team is fully committed to your satisfaction and provides complete support to make sure your files download smoothly and work properly.
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 text-slate-900 text-xs flex items-center justify-center font-bold">1</span>
              Understanding Digital Product Sales
            </h2>
            <p>
              Because digital files are downloaded immediately and provide permanent offline access to unlocked templates, orders are final once delivered. To ensure you choose the right product for your needs, we provide comprehensive previews and descriptions on every product page:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Digital products are non-tangible goods that cannot be retrieved once delivered to your device.</li>
              <li>Workbooks are built natively for Microsoft Excel (.xlsx format) on Windows and Mac.</li>
              <li>Please review the supported units (Feet/Inches & Metres) and system requirements before purchasing.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 text-slate-900 text-xs flex items-center justify-center font-bold">2</span>
              Explore Before You Purchase
            </h2>
            <p>
              We believe in 100% transparency so you can make an informed, confident purchase:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Inspect real, uncropped screenshots in our interactive <strong>Calculator Gallery</strong>.</li>
              <li>Review the complete index of 31 worksheets, PDF implementation guides, and bonus resources.</li>
              <li>Check the detailed FAQ section addressing common questions regarding measurements and Excel compatibility.</li>
              <li>
                If you have any questions prior to ordering, our team is happy to help via the{" "}
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
              Dedicated Customer & Technical Support
            </h2>
            <p>
              We stand behind the quality of our files. If you run into any practical or technical issues, our support team will help resolve them quickly:
            </p>
            <div className="space-y-2.5 pt-1">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-semibold">Duplicate Charges</strong>
                  If your card or UPI was charged more than once for the same transaction due to a network glitch, simply share your transaction IDs and we will promptly refund the duplicate payment.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-semibold">Missing Delivery Email</strong>
                  If your delivery email does not appear in your inbox or spam folder within 15 minutes of checkout, contact us and we will re-send your files right away.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-semibold">File Access Assistance</strong>
                  If you have trouble unzipping or opening any file in Microsoft Excel, our support team will gladly provide fresh download links and guide you step-by-step.
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
              Need help with a purchase or have questions about your files? Reach out to us anytime:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-slate-800">
                <Mail className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="font-semibold text-xs sm:text-sm">support@thinktools.in</span>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 text-xs font-semibold transition-colors"
              >
                <span>Visit Contact Desk &rarr;</span>
              </Link>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-6">
            <h2 className="text-lg font-bold text-slate-950">5. Customer Agreement</h2>
            <p className="text-slate-600">
              By completing your purchase on Thinktools.in, you acknowledge that instant digital downloads are delivered immediately upon payment and are non-refundable, backed by our commitment to assist you with complete file delivery and onboarding support.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
