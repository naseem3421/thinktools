"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Mail,
  Calculator,
  LayoutGrid,
  Cpu,
  Boxes,
  CheckCircle2,
  FileSpreadsheet,
  FileText,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeJsonLd from "@/components/HomeJsonLd";
import ProjectDiscussionModal from "@/components/ProjectDiscussionModal";
import ContractorChecklistModal from "@/components/ContractorChecklistModal";
import {
  DIGITAL_PRODUCTS,
  CUSTOM_SERVICES,
  PROCESS_STEPS,
  APPROACH_POINTS,
  HOMEPAGE_FAQS,
} from "@/data/homeContent";

export default function HomePage() {
  const [isDiscussionOpen, setIsDiscussionOpen] = useState<boolean>(false);
  const [discussionTopic, setDiscussionTopic] = useState<string>("Custom Calculator Development");
  const [isChecklistOpen, setIsChecklistOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleOpenDiscussion = (topic: string) => {
    setDiscussionTopic(topic);
    setIsDiscussionOpen(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#172033] flex flex-col font-sans selection:bg-[#B9F36B] selection:text-[#172033]">
      <HomeJsonLd />

      {/* =========================================================================
          SECTION 1 — HEADER
         ========================================================================= */}
      <Header isFocusMode={false} />

      <main className="flex-1">
        {/* =========================================================================
            SECTION 2 — HERO
           ========================================================================= */}
        <section className="relative pt-10 pb-12 sm:pt-14 sm:pb-16 overflow-hidden bg-white border-b border-slate-200">
          {/* Subtle architectural grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#17203306_1px,transparent_1px),linear-gradient(to_bottom,#17203306_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] sm:w-[650px] h-[220px] sm:h-[300px] bg-gradient-to-b from-[#B9F36B]/20 via-[#B9F36B]/5 to-transparent rounded-full blur-[90px] pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[#172033] text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-[#172033]" />
              <span>DIGITAL PRODUCTS · CUSTOM SOFTWARE</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#172033] tracking-tight leading-[1.15] max-w-4xl mx-auto">
              Tools for Today.{" "}
              <span className="relative inline-block">
                Solutions for What’s Next.
                <span className="absolute left-0 bottom-1 w-full h-2.5 bg-[#B9F36B]/60 -z-10 rounded-sm" />
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Explore practical digital products or work with ThinkTools to develop a calculator,
              business tool, or software solution around your requirements.
            </p>

            {/* Two Clearly Differentiated CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href="#products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#172033] hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Toolkits (From ₹499)</span>
                <ArrowRight className="w-4 h-4 text-[#B9F36B]" />
              </a>

              <button
                type="button"
                onClick={() => handleOpenDiscussion("Custom Solution Inquiry")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-300 text-[#172033] font-semibold text-sm transition-all cursor-pointer"
              >
                <span>Discuss Custom Solution</span>
              </button>
            </div>

            {/* Small Supporting Line */}
            <p className="mt-4 text-xs text-slate-500 font-medium tracking-wide">
              Instant delivery · No subscriptions · Custom engineering on request
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3 — DIGITAL PRODUCTS
           ========================================================================= */}
        <section id="products" className="py-10 sm:py-14 bg-[#F8FAFC] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
              <span className="text-xs font-bold text-[#172033] uppercase tracking-wider block mb-1.5">
                EXPLORE THINKTOOLS PRODUCTS
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172033] tracking-tight">
                Useful Tools. Clearly Defined.
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                Explore digital products designed for specific tasks and workflows. Each product
                page explains its purpose, included features, requirements, and pricing.
              </p>
            </div>

            {/* FLAGSHIP SPOTLIGHT BANNER */}
            <div className="mb-6 sm:mb-8 bg-white border-2 border-amber-400/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-black text-[10px] sm:text-xs uppercase px-3 sm:px-4 py-1 sm:py-1.5 rounded-bl-xl sm:rounded-bl-2xl">
                ⭐ Flagship Release · Instant Access
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-7">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-100/80 border border-amber-200 px-2.5 py-0.5 rounded">
                      Civil & Construction Toolkit
                    </span>
                    <span className="text-xs text-slate-500 font-medium font-mono">
                      v2.4 Live · Excel (.XLSX) + 13 PDFs
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#172033] tracking-tight">
                    Construction Calculator Pro
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    A comprehensive, 31-sheet connected estimation system built specifically for Indian residential and commercial construction. Audits contractor bills, calculates cement, steel, bricks, sand, and finishes, and helps prevent over-billing.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 pt-0.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>31 Connected Sheets:</strong> Master system & examples</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>13 Execution Guides:</strong> 4-week action plan</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>7 Bonus Toolkits:</strong> Contractor hiring & scoring</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Instant UPI Unlock:</strong> Lifetime access from ₹299</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 w-full md:max-w-md md:mx-auto lg:w-80 lg:mx-0 shrink-0 flex flex-col justify-between space-y-3.5">
                  <div>
                    <span className="text-[10px] sm:text-[11px] text-slate-500 uppercase tracking-wider font-semibold block">
                      One-Time Purchase
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-sm sm:text-base text-slate-400 line-through font-mono">₹999</span>
                      <span className="text-2xl sm:text-3xl font-black text-[#172033] font-mono">₹299</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                        70% OFF
                      </span>
                    </div>
                    <div className="mt-2.5 p-2 rounded-xl bg-amber-50 border border-amber-200 text-left">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-950">
                        <span>⚡ 4-in-1 Complete Bundle:</span>
                        <span className="font-mono text-slate-950 font-black">₹499/-</span>
                      </div>
                      <p className="text-[10px] text-slate-600 mt-0.5">
                        Main Suite + 3 Trackers <span className="line-through font-mono text-slate-400">₹1,896</span> (Save ₹1,397)
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Link
                      href="/p/construction-calculator-pro"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                    >
                      <span>Get Instant Access (From ₹299)</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/p/construction-calculator-pro#calculator-gallery"
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-semibold text-xs transition-colors"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Preview 8 Screenshots & 31 Tabs</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center max-w-xl mx-auto mb-4 sm:mb-6">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                All Digital Toolkits & Upcoming Releases
              </span>
            </div>

            {/* EXACTLY THREE Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
              {DIGITAL_PRODUCTS.map((product) => {
                const isAvailable = product.isAvailable;

                return (
                  <div
                    key={product.id}
                    className={`flex flex-col rounded-2xl border transition-all duration-200 overflow-hidden bg-white shadow-xs ${
                      isAvailable
                        ? "border-slate-300 ring-1 ring-slate-900/5 hover:shadow-md"
                        : "border-slate-200 bg-white/80"
                    }`}
                  >
                    {/* Card Header & Badge */}
                    <div className="p-5 sm:p-6 border-b border-slate-100 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            {product.category}
                          </span>
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide ${
                              isAvailable
                                ? "bg-[#172033] text-[#B9F36B]"
                                : "bg-slate-100 text-slate-600 border border-slate-200"
                            }`}
                          >
                            {product.availability}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-[#172033] tracking-tight mb-2">
                          {product.name}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                          {product.description}
                        </p>
                      </div>

                      {/* Product Facts */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                          {isAvailable ? "Included in Package:" : "Product Overview:"}
                        </span>
                        {product.facts.map((fact, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2
                              className={`w-4 h-4 shrink-0 mt-0.5 ${
                                isAvailable ? "text-[#65a30d]" : "text-slate-400"
                              }`}
                            />
                            <span>{fact}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer: Pricing & Action */}
                    <div className="p-4 sm:p-5 bg-slate-50/70 border-t border-slate-100">
                      {isAvailable ? (
                        <div className="mb-3">
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl sm:text-2xl font-black text-[#172033]">
                              {product.price}
                            </span>
                            <span className="text-xs font-medium text-slate-500">
                              — {product.priceNote}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-3">
                          <span className="text-xs font-medium text-slate-500 italic block">
                            Availability and pricing announced upon release.
                          </span>
                        </div>
                      )}

                      {isAvailable ? (
                        <Link
                          href={product.ctaHref}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#172033] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all cursor-pointer"
                        >
                          <span>{product.ctaText}</span>
                          <ArrowRight className="w-4 h-4 text-[#B9F36B]" />
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleOpenDiscussion(`${product.name} Interest`)}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                        >
                          <Mail className="w-3.5 h-3.5 text-slate-600" />
                          <span>{product.ctaText}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            FREE LEAD MAGNET / REFERENCE SECTION
           ========================================================================= */}
        <section className="py-8 sm:py-10 bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl sm:rounded-3xl bg-slate-900 text-white p-5 sm:p-7 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-7">
              <div className="space-y-2.5 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#B9F36B]/20 border border-[#B9F36B]/40 text-[#B9F36B] text-[10px] sm:text-[11px] font-bold font-mono">
                  <span>FREE CIVIL REFERENCE TOOL</span>
                </div>
                <h3 className="text-lg sm:text-2xl font-extrabold tracking-tight">
                  15-Point Contractor Interview Checklist & Scorecard
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Before signing any construction contract or paying advances, evaluate your contractor on concrete ratios, steel wastage, curing commitments, and billing milestones. Includes our numerical scoring matrix.
                </p>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-400 pt-0.5">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#B9F36B]" /> Printable PDF format
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#B9F36B]" /> 100% Free · No spam
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#B9F36B]" /> Instant access
                  </span>
                </div>
              </div>

              <div className="shrink-0 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => setIsChecklistOpen(true)}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#B9F36B] hover:bg-[#a6e257] text-[#172033] font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#172033]" />
                  <span>Open Free Checklist</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4 — CUSTOM SOLUTIONS
           ========================================================================= */}
        <section id="custom-solutions" className="py-10 sm:py-14 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
              <span className="text-xs font-bold text-[#172033] uppercase tracking-wider block mb-1.5">
                CUSTOM DEVELOPMENT
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172033] tracking-tight">
                Have a Specific Problem to Solve?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                If a ready-made product doesn&apos;t fit your workflow, we can discuss a solution
                designed around your requirements.
              </p>
            </div>

            {/* Exactly Four Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch mb-6 sm:mb-8">
              {CUSTOM_SERVICES.map((service, index) => {
                const icons = [Calculator, LayoutGrid, Cpu, Boxes];
                const IconComponent = icons[index % icons.length];

                return (
                  <div
                    key={service.id}
                    className="flex flex-col justify-between p-4.5 sm:p-5 rounded-2xl border border-slate-200 bg-[#F8FAFC] hover:border-slate-300 hover:shadow-xs transition-all"
                  >
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#172033] mb-3 shadow-2xs">
                        <IconComponent className="w-4.5 h-4.5 text-[#172033]" />
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-[#172033] tracking-tight mb-1.5">
                        {service.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed mb-3">
                        {service.description}
                      </p>

                      <div className="space-y-1 mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                          Typical Examples:
                        </span>
                        {service.examples.map((example, i) => (
                          <div key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                            <span className="text-slate-400 leading-none mt-1">•</span>
                            <span>{example}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenDiscussion(service.title)}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <span>{service.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Custom Project CTA Box */}
            <div className="rounded-2xl sm:rounded-3xl bg-[#172033] text-white p-5 sm:p-7 relative overflow-hidden shadow-md">
              <div className="max-w-3xl relative z-10">
                <span className="inline-block px-3 py-0.5 rounded-full bg-[#B9F36B] text-[#172033] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-2.5">
                  Project Feasibility
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
                  Have a Specific Requirement?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Tell us what you need, how it should work, and who will use it. We will discuss
                  technical feasibility, scope, estimated cost, and timeline before work begins.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleOpenDiscussion("Custom Solution Project")}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#B9F36B] hover:bg-[#a6e056] text-[#172033] font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
                  >
                    <span>Discuss Your Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="mailto:support@thinktools.in?subject=Custom%20Solution%20Enquiry"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs sm:text-sm font-semibold transition-colors"
                  >
                    <Mail className="w-4 h-4 text-slate-300" />
                    <span>Email Us: support@thinktools.in</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5 — HOW WE WORK
           ========================================================================= */}
        <section className="py-10 sm:py-14 bg-[#F8FAFC] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
              <span className="text-xs font-bold text-[#172033] uppercase tracking-wider block mb-1.5">
                HOW WE WORK
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172033] tracking-tight">
                A Clear Process From Start to Handover
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                Understand the requirement, agree on the scope, develop the solution, and hand over
                the agreed deliverables.
              </p>
            </div>

            {/* Four Concise Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
              {PROCESS_STEPS.map((step) => (
                <div
                  key={step.number}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs relative"
                >
                  <span className="text-2xl sm:text-3xl font-black text-slate-300 tracking-tight block mb-1.5 font-mono">
                    {step.number}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#172033] tracking-tight mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => handleOpenDiscussion("Project Enquiry Process")}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#172033] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
              >
                <span>Start a Project Enquiry</span>
                <ArrowRight className="w-4 h-4 text-[#B9F36B]" />
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6 — OUR APPROACH (#about)
           ========================================================================= */}
        <section id="about" className="py-10 sm:py-14 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
              <span className="text-xs font-bold text-[#172033] uppercase tracking-wider block mb-1.5">
                WHAT YOU CAN EXPECT
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172033] tracking-tight">
                Clear Scope. Practical Solutions.
              </h2>
            </div>

            {/* Four Short Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {APPROACH_POINTS.map((point, index) => (
                <div
                  key={index}
                  className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80"
                >
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#172033] mb-2">
                    {point.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7 — FAQ (#faqs)
           ========================================================================= */}
        <section id="faqs" className="py-10 sm:py-14 bg-[#F8FAFC] border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6 sm:mb-8">
              <span className="text-xs font-bold text-[#172033] uppercase tracking-wider block mb-1.5">
                QUESTIONS & ANSWERS
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172033] tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            {/* Exact Eight FAQs Accordion */}
            <div className="space-y-2.5">
              {HOMEPAGE_FAQS.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-xl sm:rounded-2xl bg-white overflow-hidden shadow-2xs transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full py-3 px-4 sm:py-3.5 sm:px-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#172033] hover:text-slate-900 focus:outline-none cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <span className="shrink-0 p-1 rounded-lg bg-slate-100 text-slate-600">
                        {isOpen ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-3.5 sm:px-5 sm:pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8 — FINAL CTA
           ========================================================================= */}
        <section className="py-10 sm:py-14 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-2xl mx-auto">
              <span className="text-xs font-bold text-[#172033] uppercase tracking-wider block mb-1.5">
                HAVE A PROJECT IN MIND?
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172033] tracking-tight">
                Have an Idea Worth Building?
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                Explore our available digital products or tell us about the calculator,
                automation, or software solution you need.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <a
                  href="#products"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#172033] hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4 text-[#B9F36B]" />
                </a>

                <button
                  type="button"
                  onClick={() => handleOpenDiscussion("Final CTA - Project Idea")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-[#172033] font-semibold text-sm transition-all cursor-pointer"
                >
                  <span>Discuss a Project</span>
                </button>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                Direct enquiries:{" "}
                <a
                  href="mailto:support@thinktools.in"
                  className="font-medium text-[#172033] underline hover:text-slate-800"
                >
                  support@thinktools.in
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          SECTION 9 — FOOTER
         ========================================================================= */}
      <Footer />

      {/* Project Discussion & Requirement Modal */}
      <ProjectDiscussionModal
        isOpen={isDiscussionOpen}
        onClose={() => setIsDiscussionOpen(false)}
        defaultTopic={discussionTopic}
      />

      {/* Free 15-Point Contractor Checklist Modal */}
      <ContractorChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />
    </div>
  );
}
