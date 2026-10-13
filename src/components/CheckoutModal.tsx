"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X, ShieldCheck, Zap, Lock, Check, Sparkles, CreditCard, Smartphone } from "lucide-react";
import { Product } from "@/data/products";

interface CheckoutModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ product, isOpen, onClose }: CheckoutModalProps) {
  const router = useRouter();
  const [includeBump, setIncludeBump] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card">("upi");

  if (!isOpen) return null;

  const basePrice = product.price;
  const bumpPrice = includeBump ? product.orderBump.price : 0;
  const totalPrice = basePrice + bumpPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setIsProcessing(true);

    // Simulate instant secure checkout flow (can easily connect Razorpay/Cashfree)
    setTimeout(() => {
      const orderId = "TT-" + Math.floor(100000 + Math.random() * 900000);
      const query = new URLSearchParams({
        order_id: orderId,
        name: encodeURIComponent(name),
        email: encodeURIComponent(email),
        bump: includeBump ? "1" : "0",
      });
      router.push(`/p/${product.slug}/download?${query.toString()}`);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-slate-50 p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Instant 1-Click Access</h3>
              <p className="text-xs text-slate-500">Immediate download & email delivery</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} className="p-5 md:p-6 space-y-5 overflow-y-auto">
          {/* Product Summary */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-amber-700 font-bold tracking-wide uppercase">Selected Toolkit</span>
              <h4 className="text-sm font-bold text-slate-900 mt-0.5">{product.title}</h4>
              <p className="text-xs text-slate-500 mt-0.5">Lifetime Excel + Google Sheets License</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 line-through block">₹{product.originalPrice}</span>
              <span className="text-lg font-black text-slate-900 font-mono">₹{product.price}</span>
            </div>
          </div>

          {/* User Details */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Your Full Name <span className="text-amber-600">*</span>
              </label>
              <input
                id="input-customer-name"
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Email (for file delivery) <span className="text-amber-600">*</span>
                </label>
                <input
                  id="input-customer-email"
                  type="email"
                  required
                  placeholder="rahul@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  WhatsApp / Phone Number
                </label>
                <input
                  id="input-customer-phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* HIGH CONVERTING ORDER BUMP */}
          <div
            onClick={() => setIncludeBump(!includeBump)}
            className={`border-2 rounded-2xl p-4 transition-all cursor-pointer relative overflow-hidden ${
              includeBump
                ? "bg-amber-50/80 border-amber-400 shadow-xs"
                : "bg-slate-50 border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center shrink-0 border transition-colors ${
                  includeBump
                    ? "bg-amber-500 border-amber-500 text-slate-950 font-bold"
                    : "border-slate-300 bg-white"
                }`}
              >
                {includeBump && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
                    ONE-TIME EXCLUSIVE OFFER (81% OFF)
                  </span>
                </div>
                <h5 className="text-xs sm:text-sm font-bold text-slate-900 mt-1.5 flex items-center justify-between">
                  <span>{product.orderBump.title}</span>
                  <span className="font-mono text-amber-700 font-bold ml-2">
                    +₹{product.orderBump.price}
                  </span>
                </h5>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {product.orderBump.description}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-600 block">Select Payment Mode</span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("upi")}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  paymentMethod === "upi"
                    ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900"
                }`}
              >
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>UPI (GPay / PhonePe)</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  paymentMethod === "card"
                    ? "bg-amber-50 border-amber-300 text-amber-800"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900"
                }`}
              >
                <CreditCard className="w-4 h-4 text-amber-600" />
                <span>Card / NetBanking</span>
              </button>
            </div>
          </div>

          {/* Pricing Total Breakdown */}
          <div className="border-t border-slate-200 pt-3 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>{product.title}</span>
              <span className="font-mono font-medium">₹{product.price}</span>
            </div>
            {includeBump && (
              <div className="flex justify-between text-amber-800 font-medium">
                <span>+ Contractor Progress Suite (Bump)</span>
                <span className="font-mono">₹{product.orderBump.price}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-900 font-bold text-base pt-2 border-t border-slate-200">
              <span>Grand Total</span>
              <span className="font-mono text-amber-700 text-lg">₹{totalPrice}</span>
            </div>
          </div>

          {/* CTA Pay Button */}
          <button
            id="btn-confirm-checkout"
            type="submit"
            disabled={isProcessing}
            className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm tracking-wide shadow-md shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                Setting Up Your Instant Download...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Pay ₹{totalPrice} & Download Instantly</span>
              </span>
            )}
          </button>

          {/* Trust Guarantees */}
          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              256-Bit SSL Encrypted
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              7-Day 100% Refund Guarantee
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
