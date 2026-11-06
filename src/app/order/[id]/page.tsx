"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Download,
  Mail,
  Clock,
  AlertCircle,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Copy,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface DownloadItem {
  file: string;
  title: string;
  url: string;
}

interface OrderStatusData {
  order_id: string;
  payment_id?: string;
  status: string;
  is_paid: boolean;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  product_title?: string;
  amount?: number;
  download_token?: string;
  downloads?: DownloadItem[];
  remaining_downloads?: number;
  delivery_sent_at?: number;
  error_message?: string;
}

export default function OrderStatusPage() {
  const params = useParams();
  const orderId = (params?.id as string) || "";

  const [order, setOrder] = useState<OrderStatusData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [pollingCount, setPollingCount] = useState<number>(0);

  const fetchOrderStatus = async () => {
    if (!orderId) return;
    try {
      const res = await fetch(`/api/order-status?order_id=${encodeURIComponent(orderId)}`);
      if (res.ok) {
        const data: OrderStatusData = await res.json();
        setOrder(data);
        return data;
      }
    } catch (err) {
      console.error("Failed to poll order status:", err);
    } finally {
      setLoading(false);
    }
    return null;
  };

  useEffect(() => {
    void fetchOrderStatus();

    // Poll every 2.5s for 60s if not yet confirmed paid
    const interval = setInterval(async () => {
      setPollingCount((prev) => prev + 1);
      const updated = await fetchOrderStatus();
      if (updated && (updated.status === "paid" || updated.status === "delivery_sent")) {
        clearInterval(interval);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [orderId]);

  const copyLinks = () => {
    if (!order?.downloads) return;
    const text = order.downloads.map((d) => `${d.title}: https://thinktools.in${d.url}`).join("\n\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const isPaid = order?.is_paid;
  const isDeliverySent = order?.status === "delivery_sent";

  // Pre-fill WhatsApp delivery message
  const waMessage = encodeURIComponent(
    `Hi Thinktools Support, my Order ID is ${orderId}. Please send my download package link here on WhatsApp!`
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {loading && !order ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <RefreshCw className="w-10 h-10 text-amber-400 animate-spin" />
            <h2 className="text-xl font-bold text-white">Loading Order Status...</h2>
            <p className="text-sm text-slate-400">Verifying transaction #{orderId}...</p>
          </div>
        ) : !order ? (
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-white">Order Reference Not Found</h1>
            <p className="text-sm text-slate-300">
              We couldn’t find an order with reference <code>{orderId}</code>. If you recently paid, please allow a few moments or use our file recovery desk.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/resend"
                className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-all"
              >
                Find My Order by Email
              </Link>
              <Link
                href="/"
                className="px-6 py-3 rounded-xl bg-slate-800 text-slate-200 font-semibold text-sm hover:bg-slate-700 transition-all"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        ) : !isPaid ? (
          // Payment pending / confirming
          <div className="rounded-3xl bg-slate-900 border border-amber-500/30 p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto animate-pulse">
              <Clock className="w-8 h-8" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <span>Payment Processing</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Verifying Payment with Gateway...
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              We are waiting for bank confirmation for Order <strong>#{order.order_id}</strong>. This usually updates within 15 to 45 seconds for UPI payments.
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-amber-400 font-medium">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Auto-refreshing status ({pollingCount})...</span>
            </div>
          </div>
        ) : (
          // Paid & Ready for Download
          <div className="space-y-8">
            {/* Status Header Banner */}
            <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 border-2 border-emerald-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Payment Verified &amp; Active</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-black text-white">
                      Your Download Package Is Ready
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Licensed to <strong>{order.customer_name}</strong> ({order.customer_email})
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <button
                    onClick={copyLinks}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? "Copied All Links!" : "Copy All Download Links"}</span>
                  </button>
                  <a
                    href={`https://wa.me/919345048201?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-600/20"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Send to My WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Delivery email status */}
              <div className="mt-6 pt-6 border-t border-emerald-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>
                    Automated email backup:{" "}
                    {isDeliverySent ? (
                      <strong className="text-emerald-400">Delivered to {order.customer_email}</strong>
                    ) : (
                      <strong className="text-amber-400">Sending via priority queue...</strong>
                    )}
                  </span>
                </div>
                <div className="text-slate-400">
                  Order: <code className="text-slate-200">#{order.order_id}</code> | Payment:{" "}
                  <code className="text-slate-200">{order.payment_id || "captured"}</code>
                </div>
              </div>
            </div>

            {/* Downloads List */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Download className="w-5 h-5 text-amber-400" />
                <span>Your Included Files ({order.downloads?.length || 1})</span>
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {order.downloads?.map((item, idx) => {
                  const isMain = item.file === "main";
                  return (
                    <div
                      key={item.file}
                      className={`rounded-2xl p-5 sm:p-6 border transition-all ${
                        isMain
                          ? "bg-slate-900/90 border-amber-500/40 shadow-xl shadow-amber-500/5"
                          : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              isMain
                                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            }`}
                          >
                            <FileSpreadsheet className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                {isMain ? "Master Toolkit" : `Add-on #${idx}`}
                              </span>
                              {isMain && (
                                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                                  Primary Package
                                </span>
                              )}
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                              {item.title}
                            </h3>
                            <p className="text-xs text-slate-400 mt-1">
                              {isMain
                                ? "31 connected Excel sheets + 13 PDF implementation guides & bonus kits"
                                : "Standalone Excel workbook ready to use"}
                            </p>
                          </div>
                        </div>

                        <a
                          href={item.url}
                          download
                          className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                            isMain
                              ? "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                              : "bg-emerald-600 hover:bg-emerald-500 text-white"
                          }`}
                        >
                          <Download className="w-4 h-4 stroke-[2.5]" />
                          <span>Download .ZIP</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Offline Lifetime License & Instructions */}
            <div className="rounded-2xl bg-slate-900/50 border border-slate-800 p-6 space-y-3 text-xs sm:text-sm text-slate-400">
              <h4 className="font-bold text-white flex items-center gap-2">
                <span>💡 Quick Start Instructions:</span>
              </h4>
              <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
                <li>
                  <strong>Extract the ZIP:</strong> Right-click the downloaded file and select <em>"Extract All"</em> on Windows or double-click on Mac.
                </li>
                <li>
                  <strong>Open in Microsoft Excel:</strong> Open the extracted <code>.xlsx</code> files in Excel (compatible with Excel 2016 to 2024, Microsoft 365).
                </li>
                <li>
                  <strong>Permanent Access:</strong> You can bookmark this page or access your files anytime using our self-service recovery page at{" "}
                  <Link href="/resend" className="text-amber-400 underline font-semibold">
                    thinktools.in/resend
                  </Link>.
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

