import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Scale, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service — Thinktools.in",
  description: "Terms of Service governing the purchase and license of digital toolkits and spreadsheets on Thinktools.in.",
};

export default function TermsPage() {
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
              Legal Agreement
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-950 mt-3 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              Thinktools.in · Last updated: 13 October 2026
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            These Terms of Service govern your purchase and use of spreadsheet toolkits, calculation templates, and implementation guides offered on Thinktools.in (&ldquo;we,&rdquo; &ldquo;our,&rdquo; &ldquo;us&rdquo;). By accessing our website or purchasing a digital toolkit, you agree to these terms.
          </p>

          {/* Section 1 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-950">1. Digital Products & Delivery</h2>
            <p>
              Thinktools provides premium spreadsheet engines (.xlsx format) and instructional PDF documents for homeowners, civil contractors, and professionals. Delivery occurs online immediately upon confirmed payment via Razorpay. No physical items are shipped.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-950">2. Single-User License & Permitted Use</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>You receive a perpetual, non-exclusive, non-transferable license to use the workbooks for your personal construction/renovation projects or your own contracting business.</li>
              <li>You may save, duplicate, customize, and edit formulas within the sheets for your own internal project management.</li>
              <li><strong>Prohibited Use:</strong> You may not resell, sub-license, bundle, rent, publish, or publicly distribute the templates, guides, or formulas to third parties or on public file-sharing platforms.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-950">3. Engineering & Mathematical Disclaimer</h2>
            <p>
              The Construction Calculator Pro workbooks are planning, budgeting, and estimation aids designed to give you financial clarity and audit contractor claims based on standard Indian civil engineering norms (IS codes and CPWD thumb-rules). 
            </p>
            <p>
              They do <strong>not</strong> replace certified structural engineering drawings, soil test reports, or statutory municipal approvals. You remain responsible for having licensed structural engineers review critical load-bearing designs for your specific site conditions.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-950">4. Payment & All-Sales-Final Terms</h2>
            <p>
              All prices are listed in Indian Rupees (INR). Payments are processed securely via Razorpay (UPI, Credit/Debit Cards, Net Banking, and Wallets). All digital sales are final in accordance with our <Link href="/refund-policy" className="text-amber-800 underline font-semibold">Cancellation & Refund Policy</Link>.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-950">5. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by Indian law, Thinktools.in and its creators shall not be liable for any indirect, incidental, or consequential damages resulting from on-site contractor disputes, site material price fluctuations, or implementation errors. Our aggregate liability for any claim shall not exceed the amount you paid for the product.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-950">6. Governing Law & Jurisdiction</h2>
            <p>
              These Terms of Service are governed by the laws of India. Any disputes arising from these terms shall be subject to the applicable courts of law in India.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-6">
            <h2 className="text-lg font-bold text-slate-950">7. Customer Inquiries & Support</h2>
            <p>
              For questions regarding these Terms or assistance with your digital purchases, please visit our online <Link href="/contact" className="text-amber-800 underline font-semibold">Contact & Support Desk</Link>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
