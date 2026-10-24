"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { X, Lock, Check, AlertCircle, FileSpreadsheet, ShieldCheck } from "lucide-react";
import { Product } from "@/data/products";
import { trackEvent } from "@/components/TrackingScripts";

interface CheckoutModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string | undefined;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
  handler?: (response: RazorpaySuccessResponse) => void | Promise<void>;
}

interface RazorpayInstance {
  open: () => void;
  on: (
    event: string,
    callback: (response: { error?: { description?: string; reason?: string } }) => void
  ) => void;
}

interface RazorpayConstructor {
  new (options: RazorpayOptions): RazorpayInstance;
}

declare global {
  interface Window {
    Razorpay?: RazorpayConstructor;
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutModal({ product, isOpen, onClose }: CheckoutModalProps) {
  const router = useRouter();
  const trackedPaymentIds = useRef<Set<string>>(new Set());
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [agreeTerms, setAgreeTerms] = useState<boolean>(true);
  const [validationError, setValidationError] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      // 1. Ensure Razorpay checkout.js script is ready
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error("Unable to connect to Razorpay. Please check your internet connection.");
      }

      // 2. Call backend create-order endpoint (amount in paise, min 100 paise)
      const amountInPaise = Math.round(product.price * 100);

      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: "INR",
          receipt: `rcpt_${product.slug.slice(0, 20)}_${Date.now()}`,
          notes: {
            product_id: product.id,
            product_slug: product.slug,
            product_title: product.title,
            customer_name: name.trim(),
            customer_email: email.trim(),
            customer_phone: phone.trim(),
          },
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.order_id) {
        throw new Error(orderData.error || "Unable to initiate order. Please try again.");
      }

      // Track InitiateCheckout with matching CAPI deduplication key (order.id)
      trackEvent(
        "InitiateCheckout",
        {
          content_name: product.title,
          content_ids: [product.id],
          content_type: "product",
          value: product.price,
          currency: "INR",
        },
        { eventID: orderData.order_id }
      );

      const razorpayKey =
        orderData.key_id || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

      // 3. Open Razorpay payment modal with order_id
      const options = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "Thinktools",
        description: product.title,
        order_id: orderData.order_id,
        prefill: {
          name: name.trim(),
          email: email.trim(),
          contact: phone.trim() || undefined,
        },
        theme: {
          color: "#e5a83b",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            setValidationError("Payment cancelled. You can retry whenever you are ready.");
          },
        },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          try {
            setIsProcessing(true);

            // 4. Send payment_id, order_id, signature to backend verify endpoint
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                customer_name: name.trim(),
                customer_email: email.trim(),
                customer_phone: phone.trim(),
                product_id: product.id,
                product_slug: product.slug,
                product_title: product.title,
                amount: amountInPaise,
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(
                verifyData.message || "Payment signature verification failed. Please contact support."
              );
            }

            // Track verified Purchase event with CAPI deduplication key (guarded against duplicate handler calls)
            if (!trackedPaymentIds.current.has(response.razorpay_payment_id)) {
              trackedPaymentIds.current.add(response.razorpay_payment_id);
              trackEvent(
                "Purchase",
                {
                  content_name: product.title,
                  content_ids: [product.id],
                  content_type: "product",
                  value: product.price,
                  currency: "INR",
                  transaction_id: response.razorpay_payment_id,
                },
                { eventID: response.razorpay_payment_id }
              );
            }

            // Small delay to ensure browser tracking beacon dispatches before page navigation
            await new Promise((resolve) => setTimeout(resolve, 350));

            // 5. Successful verification: Redirect to download page
            const query = new URLSearchParams({
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              name: encodeURIComponent(name),
              email: encodeURIComponent(email),
              phone: encodeURIComponent(phone),
            });
            const downloadPath = product.slug.includes("diwali")
              ? "/p/construction-calculator-pro/download"
              : `/p/${product.slug}/download`;
            router.push(`${downloadPath}?${query.toString()}`);
          } catch (verifyErr: unknown) {
            console.error("Verification error:", verifyErr);
            const err = verifyErr as { message?: string };
            setValidationError(
              err?.message || "Payment verification failed. Please contact support."
            );
            setIsProcessing(false);
          }
        },
      };

      if (!window.Razorpay) {
        throw new Error("Razorpay SDK could not be initialized.");
      }

      const rzpInstance = new window.Razorpay(options);

      rzpInstance.on("payment.failed", (failResponse: { error?: { description?: string; reason?: string } }) => {
        console.error("Payment failed:", failResponse.error);
        const failMessage =
          failResponse.error?.description ||
          failResponse.error?.reason ||
          "Payment was declined or failed. Please try again.";
        setValidationError(failMessage);
        setIsProcessing(false);
      });

      rzpInstance.open();
    } catch (err: unknown) {
      console.error("Order creation error:", err);
      const errorObj = err as { message?: string };
      setValidationError(errorObj?.message || "An unexpected error occurred. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0b0f14] border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-2 sm:my-auto max-h-[96vh] flex flex-col text-slate-100 font-sans">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Top Eyebrow */}
        <div className="pt-4 sm:pt-7 pb-1.5 sm:pb-3 text-center px-4 shrink-0">
          <span className="text-amber-400 text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase inline-flex items-center gap-1.5 sm:gap-2">
            <span className="w-2.5 sm:w-4 h-0.5 bg-amber-400 inline-block" />
            GET THE TOOLKIT
            <span className="w-2.5 sm:w-4 h-0.5 bg-amber-400 inline-block" />
          </span>
          <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mt-0.5 sm:mt-1 tracking-tight">
            Pay once. Download instantly.
          </h2>
        </div>

        {/* Main 2-Column Split Content */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 p-2.5 sm:p-6 md:p-8 pt-1 sm:pt-2">
          {/* Order 1 on mobile: Checkout Form for immediate frictionless completion */}
          <div className="order-1 lg:order-2 lg:col-span-6 bg-[#121820] border border-slate-800/80 rounded-xl sm:rounded-2xl p-3.5 sm:p-6 flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-lg font-bold text-white">Your details</h3>
                <span className="text-xs font-mono font-bold text-amber-400">Total: ₹{product.price}</span>
              </div>

              {validationError && (
                <div className="p-2.5 sm:p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
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
                  className="w-full bg-[#0b0f14] border border-slate-700/80 rounded-xl px-3.5 py-2 sm:py-2.5 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Input: Email */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Email (we attach your toolkit files here) <span className="text-amber-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0b0f14] border border-slate-700/80 rounded-xl px-3.5 py-2 sm:py-2.5 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Input: Mobile number */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Mobile number (Optional — for SMS & WhatsApp receipt)
                </label>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0b0f14] border border-slate-700/80 rounded-xl px-3.5 py-2 sm:py-2.5 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Mandatory Policy Checkbox */}
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300 leading-relaxed pt-1">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-0 cursor-pointer"
                />
                <span>
                  I understand this is an instant digital product with immediate delivery. I agree to the{" "}
                  <Link href="/terms" target="_blank" className="text-amber-400 underline hover:text-amber-300">
                    terms
                  </Link>
                  ,{" "}
                  <Link href="/privacy-policy" target="_blank" className="text-amber-400 underline hover:text-amber-300">
                    privacy policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/refund-policy" target="_blank" className="text-amber-400 underline hover:text-amber-300">
                    cancellation & refund policy
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

              {/* Digital Product Delivery Notice */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 leading-relaxed flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Instant Digital Delivery:</strong> Files are delivered immediately to your email with instant on-screen access. Review our{" "}
                  <Link href="/refund-policy" target="_blank" className="text-amber-400 underline font-semibold">
                    cancellation & refund policy
                  </Link>
                  . Our support team (support@thinktools.in) is always here to assist if you have any questions with your files.
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

          {/* Order 2 on mobile, Order 1 on desktop: Product Highlights & Pricing Box */}
          <div className="order-2 lg:order-1 lg:col-span-6 bg-[#121820] border border-slate-800/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col justify-between">
            <div>
              {/* Product Info Row */}
              <div className="flex items-start gap-3 mb-4 pb-4 border-b border-slate-800">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <FileSpreadsheet className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                    {product.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
                    for Construction & Renovation in India
                  </p>
                </div>
              </div>

              {/* Deliverables Bullet List */}
              <div className="space-y-2 text-[11px] sm:text-xs text-slate-300">
                {[
                  "3-workbook master system (Blank, 3BHK Example, Flat Renovation)",
                  "31 connected Excel sheets, measurement to final billing",
                  "Automated 5% contractor bill audit & tolerance flags",
                  "Exact procurement order list with wastage & buffers",
                  "13 PDF implementation guides & printable worksheets",
                  "7 anti-fear bonuses (hiring kit, material tests, snag list)",
                  "One-time payment, lifetime use"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing & Countdown Container */}
            <div className="mt-5 pt-4 border-t border-slate-800">
              <div className="flex items-baseline justify-between mb-3">
                <div>
                  <span className="text-[11px] sm:text-xs text-slate-400 block">Package Price</span>
                  <span className="text-xs text-emerald-400 font-semibold">Lifetime License</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider block">
                    One-Time Payment
                  </span>
                  <span className="text-2xl sm:text-4xl font-black text-white font-mono">
                    ₹{product.price}
                  </span>
                </div>
              </div>

              {/* Verified Product Delivery Info */}
              <div className="bg-[#0b0f14] border border-slate-800 rounded-xl p-3 text-center space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-bold">
                  <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                  <span>Instant Digital Delivery</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Direct on-screen download links + full .zip package automatically attached to your confirmation email.
                </p>
              </div>

              <p className="text-[10px] text-slate-500 mt-2.5 text-center">
                The final amount is shown on the Razorpay payment screen before you pay.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
