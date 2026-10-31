"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { X, Lock, Check, AlertCircle, ShieldCheck, Sparkles, Play } from "lucide-react";
import { Product, ADDON_PRODUCTS, AddonProduct } from "@/data/products";
import { trackEvent } from "@/components/TrackingScripts";

interface CheckoutModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  selectedAddonIds?: string[];
  onRemoveAddon?: (id: string) => void;
  onToggleAddon?: (id: string) => void;
  onToggleBundle?: () => void;
  onWatchDemo?: (addonId: string) => void;
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

export default function CheckoutModal({
  product,
  isOpen,
  onClose,
  selectedAddonIds = [],
  onRemoveAddon,
  onToggleAddon,
  onToggleBundle,
  onWatchDemo,
}: CheckoutModalProps) {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [agreeTerms, setAgreeTerms] = useState<boolean>(true);
  const [validationError, setValidationError] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Local state synced with props to allow interactive toggling inside the modal
  const [internalAddonIds, setInternalAddonIds] = useState<string[]>(selectedAddonIds);

  useEffect(() => {
    setInternalAddonIds(selectedAddonIds);
  }, [selectedAddonIds, isOpen]);

  const activeAddonIds = onToggleAddon ? selectedAddonIds : internalAddonIds;

  const handleToggleAddon = (id: string) => {
    if (onToggleAddon) {
      onToggleAddon(id);
    } else {
      setInternalAddonIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    }
  };

  const handleToggleBundle = () => {
    if (onToggleBundle) {
      onToggleBundle();
    } else {
      const allKeys = Object.keys(ADDON_PRODUCTS);
      setInternalAddonIds((prev) => (prev.length === allKeys.length ? [] : allKeys));
    }
  };

  // Authoritatively compute total with selected add-ons and bundle discount
  const selectedAddons: AddonProduct[] = (activeAddonIds || [])
    .map((id) => ADDON_PRODUCTS[id])
    .filter(Boolean);
  const addonsSubtotal = selectedAddons.reduce((sum, item) => sum + item.price, 0);
  const isBundleApplied = (activeAddonIds || []).length === Object.keys(ADDON_PRODUCTS).length;
  const bundleDiscount = isBundleApplied ? 97 : 0;
  const grandTotal = product.price + addonsSubtotal - bundleDiscount;
  const amountInPaise = Math.round(grandTotal * 100);

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
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: "INR",
          receipt: `rcpt_${product.slug.slice(0, 20)}_${Date.now()}`,
          product_slug: product.slug,
          addon_ids: activeAddonIds,
          notes: {
            product_id: product.id,
            product_slug: product.slug,
            product_title: product.title,
            addon_ids: activeAddonIds.join(","),
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
      const fullOrderTitle = selectedAddons.length
        ? `${product.title} + ${selectedAddons.length} Add-on${selectedAddons.length > 1 ? "s" : ""}`
        : product.title;

      trackEvent(
        "InitiateCheckout",
        {
          content_name: fullOrderTitle,
          content_ids: [product.id, ...activeAddonIds],
          content_type: "product",
          value: grandTotal,
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
        description: fullOrderTitle,
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
                addon_ids: activeAddonIds,
                amount: amountInPaise,
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(
                verifyData.message || "Payment signature verification failed. Please contact support."
              );
            }

            // 5. Successful verification: Redirect to download / thank-you page
            // Browser-side Purchase tracking is executed strictly on the thank-you/download page
            // with matching eventID: String(order_id) and localStorage reload guards.
            const queryParams: Record<string, string> = {
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              name: encodeURIComponent(name),
              email: encodeURIComponent(email),
              phone: encodeURIComponent(phone),
              amount: String(grandTotal),
            };
            if (verifyData.download_token) {
              queryParams.token = verifyData.download_token;
            }
            if (activeAddonIds.length > 0) {
              queryParams.addons = activeAddonIds.join(",");
            }
            const query = new URLSearchParams(queryParams);
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

        {/* Modal Top Header */}
        <div className="pt-3.5 sm:pt-5 pb-1 sm:pb-2 text-center px-4 shrink-0">
          <span className="text-amber-400 text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase inline-flex items-center gap-1.5">
            <span className="w-2.5 sm:w-4 h-0.5 bg-amber-400 inline-block" />
            SECURE INSTANT CHECKOUT
            <span className="w-2.5 sm:w-4 h-0.5 bg-amber-400 inline-block" />
          </span>
          <h2 className="text-lg sm:text-2xl font-black text-white mt-0.5 tracking-tight">
            Pay once. Download instantly.
          </h2>
        </div>

        {/* Main 2-Column Split Content */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 p-2.5 sm:p-5 md:p-6 pt-1">
          {/* Order 1 on Mobile / Left Column on Desktop: Order Items & Add-on Ticks */}
          <div className="order-1 lg:col-span-6 bg-[#121820] border border-slate-800/80 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 flex flex-col justify-between">
            <div>
              {/* Included Base Product */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Your Package
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
                  ✓ Included
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#0b0f14] border border-amber-500/30 flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="w-5 h-5 rounded-md bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs sm:text-sm truncate">
                        {product.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      31 connected sheets (.xlsx) · Chennai 3BHK &amp; Renovation examples · 13 PDF guides
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono font-bold text-amber-400 text-xs sm:text-sm">₹{product.price}</span>
                  <span className="block text-[10px] text-slate-500 line-through">₹999</span>
                </div>
              </div>

              {/* Companion Add-ons Tick Selection */}
              <div className="mt-3.5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span>Add Companion Tools</span>
                    <span className="text-[10px] text-amber-400 font-normal lowercase">(optional · ₹99 each)</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleToggleBundle}
                    className="text-[10px] sm:text-[11px] font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {isBundleApplied ? "Clear Add-ons" : "Select All 3 (₹499)"}
                  </button>
                </div>

                <div className="space-y-1.5">
                  {Object.values(ADDON_PRODUCTS).map((addon) => {
                    const isChecked = activeAddonIds.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        role="checkbox"
                        aria-checked={isChecked}
                        tabIndex={0}
                        onClick={() => handleToggleAddon(addon.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleToggleAddon(addon.id);
                          }
                        }}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer select-none flex items-start justify-between gap-2.5 ${
                          isChecked
                            ? "bg-amber-500/10 border-amber-400 shadow-2xs"
                            : "bg-[#0b0f14] hover:bg-slate-900 border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-start gap-2.5 min-w-0">
                          <div
                            className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              isChecked
                                ? "bg-amber-500 border-amber-400 text-slate-950 font-black"
                                : "border-slate-600 bg-slate-900 text-transparent"
                            }`}
                          >
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <p className="font-semibold text-xs text-white">
                                {addon.shortTitle || addon.title}
                              </p>
                              {onWatchDemo && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onWatchDemo(addon.id);
                                  }}
                                  className="animate-blink-glow inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 border border-amber-300 text-[10px] font-black transition-all cursor-pointer shrink-0 shadow-xs shadow-amber-500/25"
                                  title={`Watch 60-Second Demo for ${addon.title}`}
                                >
                                  <Play className="w-2.5 h-2.5 fill-slate-950 text-slate-950" />
                                  <span>Watch 60-Second Demo</span>
                                  <span className="relative flex h-2 w-2 shrink-0 ml-0.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
                                  </span>
                                </button>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                              {addon.id === "site-expense-profit-tracker" && "Petty cash, vendor invoices & actual site profit"}
                              {addon.id === "labour-attendance-weekly-wage-sheet" && "Daily mistri/coolie registers & weekly wage slips"}
                              {addon.id === "payment-collection-tracker" && "Milestone invoices, GST & payment reminders"}
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-mono font-bold text-xs text-amber-400">
                            +₹{addon.price}
                          </span>
                          <span className="block text-[9px] text-slate-500 line-through">₹299</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 4-in-1 Bundle Savings / Upsell Bar */}
                {isBundleApplied ? (
                  <div className="mt-2.5 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between text-xs text-emerald-400">
                    <span className="flex items-center gap-1.5 font-bold text-[11px] sm:text-xs">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      4-in-1 Bundle Active!
                    </span>
                    <span className="font-mono font-extrabold text-[11px] sm:text-xs">-₹97 OFF (Save ₹1,397)</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleToggleBundle}
                    className="mt-2 w-full p-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-bold flex items-center justify-between transition-colors cursor-pointer text-left"
                  >
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Upgrade to 4-in-1 Bundle for ₹499</span>
                    </span>
                    <span className="text-amber-400 font-extrabold text-xs whitespace-nowrap">Save ₹1,397 &rarr;</span>
                  </button>
                )}
              </div>
            </div>

            {/* Price Summary Breakdown */}
            <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>Base Package:</span>
                <span className="font-mono text-slate-200">₹{product.price}</span>
              </div>
              {addonsSubtotal > 0 && (
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Companion Tools ({activeAddonIds.length}):</span>
                  <span className="font-mono text-amber-400">+₹{addonsSubtotal}</span>
                </div>
              )}
              {bundleDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 text-[11px] font-semibold">
                  <span>⚡ 4-in-1 Bundle Discount:</span>
                  <span className="font-mono">-₹{bundleDiscount}</span>
                </div>
              )}
              <div className="flex items-baseline justify-between pt-2 border-t border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Due</span>
                  <span className="text-[11px] text-emerald-400 font-bold">Lifetime Access</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                    One-Time Payment
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                    ₹{grandTotal}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order 2 on Mobile / Right Column on Desktop: Contact Form & Pay Button */}
          <div className="order-2 lg:col-span-6 bg-[#121820] border border-slate-800/80 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5 flex flex-col h-full justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                  <h3 className="text-sm sm:text-base font-bold text-white">Your details</h3>
                  <span className="text-xs font-mono font-bold text-amber-400">Total: ₹{grandTotal}</span>
                </div>

                {validationError && (
                  <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{validationError}</span>
                  </div>
                )}

                {/* Input: Full Name */}
                <div>
                  <label className="text-[11px] sm:text-xs font-semibold text-slate-300 block mb-1">
                    Full name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#0b0f14] border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                {/* Input: Email */}
                <div>
                  <label className="text-[11px] sm:text-xs font-semibold text-slate-300 block mb-1">
                    Email (for instant file delivery) <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0b0f14] border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                {/* Input: Mobile number */}
                <div>
                  <label className="text-[11px] sm:text-xs font-semibold text-slate-300 block mb-1">
                    Mobile number <span className="text-slate-500 font-normal">(Optional — for WhatsApp receipt)</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#0b0f14] border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                {/* Mandatory Policy Checkbox */}
                <label className="flex items-start gap-2 cursor-pointer text-[11px] text-slate-400 leading-snug pt-1">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-0 cursor-pointer"
                  />
                  <span>
                    I understand this is an instant digital product. I agree to the{" "}
                    <Link href="/terms" target="_blank" className="text-amber-400 underline hover:text-amber-300">
                      terms
                    </Link>
                    ,{" "}
                    <Link href="/privacy-policy" target="_blank" className="text-amber-400 underline hover:text-amber-300">
                      privacy
                    </Link>{" "}
                    and{" "}
                    <Link href="/refund-policy" target="_blank" className="text-amber-400 underline hover:text-amber-300">
                      refund policy
                    </Link>
                    .
                  </span>
                </label>
              </div>

              <div className="pt-2">
                {/* Gold/Amber Secure Pay Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#e5a83b] hover:bg-[#d4972e] text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      Opening Secure Checkout...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      <span>PAY ₹{grandTotal} SECURELY</span>
                    </span>
                  )}
                </button>

                {/* Clean Trust line */}
                <div className="pt-2.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-slate-400 text-center">
                  <span className="flex items-center gap-1 font-semibold text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    Instant Download + Email Backup
                  </span>
                  <span>•</span>
                  <span>
                    🔒 UPI, GPay, Cards &amp; NetBanking
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
