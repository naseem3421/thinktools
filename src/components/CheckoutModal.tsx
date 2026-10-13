"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { X, Lock, Check, AlertCircle, FileSpreadsheet, ShieldCheck } from "lucide-react";
import { Product } from "@/data/products";

interface CheckoutModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ product, isOpen, onClose }: CheckoutModalProps) {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [showFirstName, setShowFirstName] = useState<boolean>(true);
  const [agreeTerms, setAgreeTerms] = useState<boolean>(true);
  const [validationError, setValidationError] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Dynamic countdown timer for authentic urgency
  const [timeLeft, setTimeLeft] = useState({
    days: 27,
    hours: 5,
    minutes: 18,
    seconds: 27,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setValidationError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setValidationError("Please enter a valid email address.");
      return;
    }
    if (!agreeTerms) {
      setValidationError("Please accept the terms and refund policy to proceed.");
      return;
    }

    setValidationError("");
    setIsProcessing(true);

    // Simulate instant secure Razorpay checkout flow
    setTimeout(() => {
      const orderId = "TT-" + Math.floor(100000 + Math.random() * 900000);
      const query = new URLSearchParams({
        order_id: orderId,
        name: encodeURIComponent(name),
        email: encodeURIComponent(email),
        phone: encodeURIComponent(phone),
      });
      router.push(`/p/${product.slug}/download?${query.toString()}`);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0b0f14] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto text-slate-100 font-sans">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Top Eyebrow */}
        <div className="pt-6 sm:pt-8 pb-3 text-center px-4">
          <span className="text-amber-400 text-xs font-mono font-bold tracking-widest uppercase inline-flex items-center gap-2">
            <span className="w-4 h-0.5 bg-amber-400 inline-block" />
            GET THE TOOLKIT
            <span className="w-4 h-0.5 bg-amber-400 inline-block" />
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
            Pay once. Download instantly.
          </h2>
        </div>

        {/* Main 2-Column Split Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 sm:p-8 pt-4">
          {/* Left Column: Product Highlights & Pricing Box */}
          <div className="lg:col-span-6 bg-[#121820] border border-slate-800/80 rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
            <div>
              {/* Product Info Row */}
              <div className="flex items-start gap-3.5 mb-5 pb-5 border-b border-slate-800">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                    {product.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    for Construction & Renovation in India
                  </p>
                </div>
              </div>

              {/* Deliverables Bullet List */}
              <div className="space-y-2.5 text-xs text-slate-300">
                {[
                  "3-workbook master system (Blank, 3BHK Example, Flat Renovation)",
                  "31 connected Excel sheets, measurement to final billing",
                  "Automated 5% contractor bill audit & tolerance flags",
                  "Exact procurement order list with wastage & buffers",
                  "13 PDF implementation guides & printable worksheets",
                  "7 anti-fear bonuses (hiring kit, material tests, snag list)",
                  "One-time payment, lifetime use"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing & Countdown Container */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-xs text-slate-400 block">Regular price</span>
                  <span className="text-slate-500 text-sm line-through font-mono">
                    ₹{product.originalPrice}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
                    Limited Special
                  </span>
                  <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                    ₹{product.price}
                  </span>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="bg-[#0b0f14] border border-slate-800 rounded-xl p-3 text-center">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1.5 font-bold">
                  OFFER ENDS IN
                </span>
                <div className="grid grid-cols-4 gap-2 font-mono text-center">
                  <div className="bg-slate-900 border border-slate-800 rounded-lg py-1.5">
                    <span className="text-base sm:text-lg font-bold text-white block">
                      {String(timeLeft.days).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] text-slate-400 uppercase">DAYS</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-lg py-1.5">
                    <span className="text-base sm:text-lg font-bold text-white block">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] text-slate-400 uppercase">HRS</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-lg py-1.5">
                    <span className="text-base sm:text-lg font-bold text-white block">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] text-slate-400 uppercase">MIN</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-lg py-1.5">
                    <span className="text-base sm:text-lg font-bold text-amber-400 block">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] text-slate-400 uppercase">SEC</span>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-slate-500 mt-3 text-center">
                The final amount is shown on the Razorpay payment screen before you pay.
              </p>
            </div>
          </div>

          {/* Right Column: Checkout Form */}
          <div className="lg:col-span-6 bg-[#121820] border border-slate-800/80 rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-bold text-white">Your details</h3>

              {validationError && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Input: Full Name */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Full name <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0b0f14] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Input: Email */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Email (we send your download link here) <span className="text-amber-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0b0f14] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Input: Mobile number */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Mobile number (for instant WhatsApp download)
                </label>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0b0f14] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Checkbox: Show first name */}
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-400 pt-1">
                <input
                  type="checkbox"
                  checked={showFirstName}
                  onChange={(e) => setShowFirstName(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-0 cursor-pointer"
                />
                <span>Optional: show my first name in the &ldquo;recent purchase&rdquo; notice on this page.</span>
              </label>

              {/* Mandatory Policy Checkbox */}
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300 leading-relaxed">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-0 cursor-pointer"
                />
                <span>
                  I understand this is a digital product and <strong>all sales are final</strong>, with no refunds. I agree to the{" "}
                  <Link href="/terms" target="_blank" className="text-amber-400 underline hover:text-amber-300">
                    terms
                  </Link>
                  ,{" "}
                  <Link href="/privacy-policy" target="_blank" className="text-amber-400 underline hover:text-amber-300">
                    privacy policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/refund-policy" target="_blank" className="text-amber-400 underline hover:text-amber-300">
                    refund policy
                  </Link>
                  .
                </span>
              </label>

              {/* Gold/Amber Secure Pay Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 px-4 rounded-xl bg-[#e5a83b] hover:bg-[#d4972e] text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    Opening Secure Checkout...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>PAY ₹{product.price} SECURELY</span>
                  </span>
                )}
              </button>

              {/* Digital Product Final Sale Notice */}
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-900/60 text-[11px] text-amber-200/90 leading-relaxed flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Digital product:</strong> all sales are final and there are no refunds.{" "}
                  <Link href="/refund-policy" target="_blank" className="text-amber-400 underline font-semibold">
                    Read the refund policy
                  </Link>{" "}
                  before you pay.
                </div>
              </div>

              {/* Payment Methods Badges */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-[10px] text-slate-400 font-medium">
                <span className="px-2.5 py-1 rounded bg-[#0b0f14] border border-slate-800 text-slate-300 font-mono">
                  UPI
                </span>
                <span className="px-2.5 py-1 rounded bg-[#0b0f14] border border-slate-800 text-slate-300 font-mono">
                  Cards
                </span>
                <span className="px-2.5 py-1 rounded bg-[#0b0f14] border border-slate-800 text-slate-300 font-mono">
                  Net banking
                </span>
                <span className="px-2.5 py-1 rounded bg-[#0b0f14] border border-slate-800 text-slate-300 font-mono">
                  Wallets
                </span>
              </div>

              {/* Razorpay Trust Note */}
              <div className="text-center text-[10px] text-slate-500 pt-1">
                🔒 Payments are processed by Razorpay. We never see or store your card or UPI details.
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
