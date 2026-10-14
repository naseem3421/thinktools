import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy — Thinktools.in",
  description: "Privacy policy explaining how Thinktools.in collects, processes, and protects customer data.",
};

export default function PrivacyPolicyPage() {
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
              Data Privacy
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-950 mt-3 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              Thinktools.in · Last updated: 13 October 2026
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            This Privacy Policy explains how Thinktools.in (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, stores, and protects your personal information when you browse our website, purchase digital toolkits, or communicate with us.
          </p>

          {/* Section 1 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-950">1. Information We Collect</h2>
            <p>Depending on your interaction with Thinktools.in, we may collect:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Contact Information:</strong> Your full name, email address, and 10-digit mobile/WhatsApp number provided at checkout for digital goods delivery.</li>
              <li><strong>Transaction Records:</strong> Razorpay order ID, payment timestamp, product purchased, and fulfillment delivery status. We do not store or process your credit card numbers or UPI PINs; all payments are processed through Razorpay&apos;s encrypted payment gateway.</li>
              <li><strong>Customer Support Communications:</strong> Messages, feedback, and technical queries submitted through our online support desk.</li>
              <li><strong>Technical Data:</strong> Browser type, operating system, and IP address collected automatically to ensure platform security and fraud prevention.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-950">2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>To deliver your purchased digital files directly to your screen, email inbox, and WhatsApp number.</li>
              <li>To provide customer support and troubleshoot file opening or formatting issues.</li>
              <li>To prevent fraudulent payments and verify duplicate charge claims.</li>
              <li>To send critical updates regarding your downloaded workbooks (such as formula improvements or rate revisions).</li>
              <li>To comply with statutory tax and accounting obligations in India.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-950">3. WhatsApp Messaging</h2>
            <p>
              When you opt-in at checkout to receive your download link on WhatsApp, that message is transmitted via the official WhatsApp Business Platform operated by Meta Platforms, Inc. We only use WhatsApp for direct transactional communications (such as sending your download link and order receipt).
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-950">4. Data Sharing & Security</h2>
            <p>
              We do <strong>not</strong> sell, rent, or trade your personal data. We only share information with trusted third-party service providers essential for platform operations:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Razorpay:</strong> For secure 256-bit encrypted payment authorization and webhook notifications.</li>
              <li><strong>Hostinger:</strong> For secure website hosting and SSL encryption.</li>
              <li><strong>Meta Platforms (WhatsApp Business):</strong> For delivering automated transaction receipts and download access links.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-950">5. Your Rights</h2>
            <p>
              You have the right to request access to the personal data we hold about you, request corrections, or request deletion of your contact records. To exercise these rights, please reach out via our online <Link href="/contact" className="text-amber-800 font-semibold underline">Contact & Support Desk</Link>.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-6">
            <h2 className="text-lg font-bold text-slate-950">6. Privacy Inquiries</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy, please submit an inquiry through our <Link href="/contact" className="text-amber-800 underline font-semibold">Support Desk</Link> or email us directly at <a href="mailto:support@thinktools.in" className="text-amber-800 underline font-semibold">support@thinktools.in</a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
