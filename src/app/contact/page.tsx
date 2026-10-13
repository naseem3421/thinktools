import React from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Clock, MessageSquare, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact Us — Thinktools.in",
  description: "Get in touch with Thinktools.in support for product questions, order help, and customer assistance.",
};

export default function ContactPage() {
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
              Customer Support
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-950 mt-3 tracking-tight">
              Contact Us
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              Have questions before buying or need help with your order? We are here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Support Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Email Support</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                For order assistance, file replacement, or technical questions before buying:
              </p>
              <div className="pt-2">
                <a
                  href="mailto:hello@thinkbrandfirst.com"
                  className="text-sm font-bold text-amber-800 hover:underline block"
                >
                  hello@thinkbrandfirst.com
                </a>
                <span className="text-[11px] text-slate-400 block mt-1">Average response time: &lt; 2 business days</span>
              </div>
            </div>

            {/* WhatsApp & Phone Support Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">WhatsApp & Phone</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct WhatsApp assistance for urgent delivery or payment confirmation:
              </p>
              <div className="pt-2 space-y-1">
                <div className="text-xs text-slate-700 font-mono">
                  WhatsApp: <strong className="text-slate-900">+91 95858 01018</strong>
                </div>
                <div className="text-xs text-slate-700 font-mono">
                  Phone: <strong className="text-slate-900">+91 95009 35935</strong>
                </div>
                <span className="text-[11px] text-slate-400 block mt-1">Hours: Mon–Sat, 10:00 AM – 6:30 PM IST</span>
              </div>
            </div>
          </div>

          {/* Business & Registered Address */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <MapPin className="w-4 h-4 text-amber-700" />
              <span>Registered Business Location</span>
            </div>
            <div className="text-xs text-slate-600 leading-relaxed space-y-1 font-mono">
              <div className="font-bold text-slate-800 font-sans">Think Brand First</div>
              <div>15/31B2, Gunasekaran Building, Sowdeshwari Nagar,</div>
              <div>Mooladurai, Sirumugai, Mettupalayam,</div>
              <div>Coimbatore District, Tamil Nadu 641302, India</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
