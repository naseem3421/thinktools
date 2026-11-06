"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  Search,
  Mail,
  Copy,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  Filter,
  Users,
  DollarSign,
  Send,
  Lock,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface OrderItem {
  id: string;
  payment_id?: string;
  amount: number;
  currency: string;
  status: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  product_title: string;
  addon_ids: string[];
  delivery_attempts: number;
  delivery_sent_at?: number;
  last_delivery_error?: string;
  download_count: number;
  max_downloads: number;
  created_at: number;
  hub_url: string;
  download_url: string;
  wa_link?: string;
}

interface StatsData {
  total_orders: number;
  total_paid: number;
  total_revenue_inr: number;
  delivery_sent: number;
  delivery_failed: number;
  pending: number;
  success_rate_pct: number;
}

export default function AdminOrdersPage() {
  const [adminKey, setAdminKey] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [actionMessage, setActionMessage] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("thinktools_admin_key");
    if (saved) {
      setAdminKey(saved);
      setIsAuthenticated(true);
      void loadOrders(saved);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminKey.trim()) return;
    localStorage.setItem("thinktools_admin_key", adminKey.trim());
    setIsAuthenticated(true);
    void loadOrders(adminKey.trim());
  };

  const loadOrders = async (key: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders", {
        headers: { "x-admin-key": key },
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
        setStats(data.stats || null);
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem("thinktools_admin_key");
        alert("Invalid Admin Key.");
      }
    } catch {
      alert("Failed to connect to admin API.");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action: string, orderId: string) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({ action, order_id: orderId }),
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage(data.message);
        setTimeout(() => setActionMessage(""), 4000);
        void loadOrders(adminKey);
      } else {
        alert(data.error || "Action failed.");
      }
    } catch {
      alert("Error executing action.");
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setActionMessage(`Copied ${label} to clipboard!`);
    setTimeout(() => setActionMessage(""), 3000);
  };

  // Filter & Search
  const filteredOrders = orders.filter((o) => {
    if (filter === "action_needed") {
      const needed = o.status === "delivery_failed" || (o.status === "paid" && !o.delivery_sent_at);
      if (!needed) return false;
    } else if (filter === "sent") {
      if (o.status !== "delivery_sent") return false;
    } else if (filter === "pending") {
      if (o.status !== "pending") return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        o.id.toLowerCase().includes(q) ||
        (o.payment_id && o.payment_id.toLowerCase().includes(q)) ||
        o.customer_email.toLowerCase().includes(q) ||
        o.customer_name.toLowerCase().includes(q) ||
        (o.customer_phone && o.customer_phone.includes(q));
      if (!match) return false;
    }

    return true;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">ThinkTools Admin Desk</h1>
              <p className="text-xs text-slate-400 mt-1">Authorized access required to view order fulfillment</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Enter Admin Secret Key"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <span>Fulfillment Control Desk</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Order Delivery &amp; Reliability Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {actionMessage && (
              <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold animate-fadeIn">
                {actionMessage}
              </span>
            )}
            <button
              onClick={() => void loadOrders(adminKey)}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("thinktools_admin_key");
                setIsAuthenticated(false);
              }}
              className="px-3 py-2 text-xs text-slate-500 hover:text-slate-300"
            >
              Sign out
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
              <div className="flex items-center justify-between text-xs text-slate-400 uppercase font-bold tracking-wider">
                <span>Total Paid</span>
                <Users className="w-4 h-4 text-slate-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-2">
                {stats.total_paid}
              </div>
              <div className="text-xs text-emerald-400 font-semibold mt-1">
                ₹{stats.total_revenue_inr.toLocaleString()} Total Revenue
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900 border border-emerald-500/30 p-5">
              <div className="flex items-center justify-between text-xs text-slate-400 uppercase font-bold tracking-wider">
                <span>Delivered (Email Sent)</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2">
                {stats.delivery_sent}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {stats.success_rate_pct}% Delivery Success Rate
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900 border border-red-500/30 p-5">
              <div className="flex items-center justify-between text-xs text-slate-400 uppercase font-bold tracking-wider">
                <span>Delivery Failed / Unsent</span>
                <ShieldAlert className="w-4 h-4 text-red-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-red-400 mt-2">
                {stats.delivery_failed}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Requires manual resend / WhatsApp
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
              <div className="flex items-center justify-between text-xs text-slate-400 uppercase font-bold tracking-wider">
                <span>Pending Payment</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-300 mt-2">
                {stats.pending}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                In checkout / unconfirmed
              </div>
            </div>
          </div>
        )}

        {/* Filters & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === "all" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"
              }`}
            >
              All Orders ({orders.length})
            </button>
            <button
              onClick={() => setFilter("action_needed")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === "action_needed" ? "bg-red-500 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              ⚠️ Action Needed ({stats?.delivery_failed || 0})
            </button>
            <button
              onClick={() => setFilter("sent")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === "sent" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-white"
              }`}
            >
              Delivered ({stats?.delivery_sent || 0})
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === "pending" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Pending ({stats?.pending || 0})
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search email, order, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase font-bold tracking-wider">
                <tr>
                  <th className="py-4 px-4 sm:px-6">Order / Payment ID</th>
                  <th className="py-4 px-4">Customer Details</th>
                  <th className="py-4 px-4">Package &amp; Price</th>
                  <th className="py-4 px-4">Delivery Status</th>
                  <th className="py-4 px-4">Downloads</th>
                  <th className="py-4 px-4 sm:px-6 text-right">Quick Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      No orders matching current filter.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((o) => {
                    const isDelivered = o.status === "delivery_sent";
                    const isFailed = o.status === "delivery_failed";
                    const isPaid = o.status === "paid" || isDelivered || o.status === "delivery_queued";

                    return (
                      <tr key={o.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-4 px-4 sm:px-6 font-mono">
                          <div className="font-bold text-white">#{o.id}</div>
                          {o.payment_id && (
                            <div className="text-[11px] text-slate-400">{o.payment_id}</div>
                          )}
                          <div className="text-[10px] text-slate-500 mt-1">
                            {new Date(o.created_at).toLocaleString("en-IN", {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <div className="font-bold text-white">{o.customer_name}</div>
                          <div className="text-slate-300 font-mono text-[11px]">{o.customer_email}</div>
                          {o.customer_phone && (
                            <div className="text-slate-400 text-[11px] flex items-center gap-1 mt-0.5">
                              <span>📱 {o.customer_phone}</span>
                            </div>
                          )}
                        </td>

                        <td className="py-4 px-4">
                          <div className="font-bold text-white">₹{o.amount}</div>
                          <div className="text-[11px] text-slate-400 max-w-[200px] truncate" title={o.product_title}>
                            {o.product_title}
                          </div>
                          {o.addon_ids && o.addon_ids.length > 0 && (
                            <span className="inline-block mt-0.5 text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              +{o.addon_ids.length} Add-ons
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-4">
                          {isDelivered ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Delivered</span>
                            </span>
                          ) : isFailed ? (
                            <div>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-[10px] font-bold">
                                <AlertTriangle className="w-3 h-3" />
                                <span>Delivery Failed</span>
                              </span>
                              {o.last_delivery_error && (
                                <p className="text-[10px] text-red-400 max-w-[160px] truncate mt-1" title={o.last_delivery_error}>
                                  {o.last_delivery_error}
                                </p>
                              )}
                            </div>
                          ) : isPaid ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                              <Clock className="w-3 h-3" />
                              <span>Paid (Queued)</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px]">
                              <span>Pending</span>
                            </span>
                          )}
                          <div className="text-[10px] text-slate-500 mt-1">
                            Attempts: {o.delivery_attempts || 0}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <div className="font-mono text-slate-300">
                            {o.download_count || 0} / {o.max_downloads || 10}
                          </div>
                          {o.download_count >= (o.max_downloads || 10) && (
                            <span className="text-[10px] text-red-400 font-bold">Quota Exceeded</span>
                          )}
                        </td>

                        <td className="py-4 px-4 sm:px-6 text-right">
                          <div className="flex items-center justify-end gap-1.5 flex-wrap">
                            {/* Resend Email Button */}
                            <button
                              onClick={() => handleAction("resend_email", o.id)}
                              title="Trigger immediate email resend"
                              className="px-2.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 font-bold text-[11px] flex items-center gap-1"
                            >
                              <Send className="w-3 h-3" />
                              <span>Resend</span>
                            </button>

                            {/* Copy Link */}
                            <button
                              onClick={() => copyToClipboard(o.hub_url, "Download Access Link")}
                              title="Copy 7-day download link"
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>

                            {/* WhatsApp Customer */}
                            {o.wa_link && (
                              <a
                                href={o.wa_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Deliver via WhatsApp"
                                className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>
                            )}

                            {/* View Live Order */}
                            <Link
                              href={`/order/${o.id}`}
                              target="_blank"
                              title="Open Customer Order Page"
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

