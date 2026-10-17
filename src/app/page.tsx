"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  FileSpreadsheet,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Calculator,
  ChevronDown,
  ChevronUp,
  Building2,
  Check,
  AlertCircle,
  Mail,
  Layers,
  Wrench,
  Bot,
  Laptop,
  CheckCircle,
  HelpCircle,
  Clock,
  Send,
  Compass,
  FileText,
  Filter
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeJsonLd from "@/components/HomeJsonLd";
import ProjectDiscussionModal from "@/components/ProjectDiscussionModal";
import {
  DIGITAL_PRODUCTS,
  CUSTOM_SOLUTIONS,
  PROJECT_WORK_STEPS,
  WHY_THINKTOOLS,
  WHO_WE_BUILD_FOR,
  HOMEPAGE_FAQS
} from "@/data/homeContent";

export default function HomePage() {
  const [isDiscussionOpen, setIsDiscussionOpen] = useState<boolean>(false);
  const [discussionTopic, setDiscussionTopic] = useState<string>("Custom Calculator Development");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleOpenDiscussion = (topic: string) => {
    setDiscussionTopic(topic);
    setIsDiscussionOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-amber-500 selection:text-slate-950 font-sans">
      <HomeJsonLd />

      {/* =========================================================================
          1. HEADER / NAVIGATION
         ========================================================================= */}
      <Header isFocusMode={false} />

      <main className="flex-1">
        {/* =========================================================================
            2. HERO SECTION
            Eyebrow: PRACTICAL DIGITAL TOOLS & SOFTWARE
            Heading: Practical Tools. Purpose-Built Solutions.
           ========================================================================= */}
        <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden border-b border-slate-200 bg-white">
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a05_1px,transparent_1px),linear-gradient(to_bottom,#0f172a05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] sm:w-[700px] h-[220px] sm:h-[300px] bg-gradient-to-b from-amber-500/10 via-amber-400/5 to-transparent rounded-full blur-[90px] pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider mb-6 shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              <span>PRACTICAL DIGITAL TOOLS & SOFTWARE</span>
            </div>

            {/* Single Page H1 */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.15] max-w-4xl mx-auto">
              Practical Tools.{" "}
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                Purpose-Built Solutions.
              </span>
            </h1>

            {/* Body */}
            <p className="mt-5 text-sm sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              ThinkTools brings together useful online calculators, ready-to-use digital products,
              and custom software solutions for real-world tasks.
            </p>
            <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Use an existing tool, explore our products, or discuss a digital solution built around
              your specific requirements.
            </p>

            {/* CTAs */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <a
                id="hero-primary-cta"
                href="#products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-md shadow-amber-500/20 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                id="hero-secondary-cta"
                href="#custom-solutions"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Build a Custom Solution</span>
              </a>
            </div>

            {/* Small supporting line */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
              <span>Digital products</span>
              <span className="text-slate-300">•</span>
              <span>Custom calculators</span>
              <span className="text-slate-300">•</span>
              <span>Software solutions</span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. DIGITAL PRODUCTS
            Eyebrow: TOOLS YOU CAN USE
            Heading: Digital Products for Practical Work (Reduced Title Size)
            3 Compact Tiles with Cover Images:
            - Construction Calculator Pro (Available Now, ₹499)
            - Construction Management SaaS (Coming Soon)
            - WhatsApp Automation (Coming Soon)
           ========================================================================= */}
        <section id="products" className="py-12 sm:py-16 bg-slate-100/70 border-y border-slate-200 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-1.5">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block">
                TOOLS YOU CAN USE
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-950 tracking-tight">
                Digital Products for Practical Work
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Explore downloadable tools and purpose-built software products for specific workflows.
              </p>
            </div>

            {/* Products Grid - Compact Tiles with Cover Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto items-stretch">
              {DIGITAL_PRODUCTS.map((prod) => (
                <div
                  key={prod.id}
                  className={`rounded-2xl overflow-hidden bg-white flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                    prod.isAvailable
                      ? "border-2 border-amber-400/90 shadow-sm shadow-amber-500/5 ring-1 ring-amber-400/20"
                      : "border border-slate-200/90 shadow-2xs"
                  }`}
                >
                  {/* Card Cover Image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                    <Image
                      src={prod.coverImage}
                      alt={prod.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top transition-transform duration-500 hover:scale-105"
                      priority={prod.isAvailable}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />

                    {/* Floating Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 pointer-events-none">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-white bg-slate-950/80 backdrop-blur-xs px-2.5 py-0.5 rounded-full font-semibold border border-white/10 shadow-xs">
                        {prod.category}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold shadow-xs ${
                          prod.isAvailable
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-900/85 backdrop-blur-xs text-slate-300 border border-white/10"
                        }`}
                      >
                        {prod.availability}
                      </span>
                    </div>

                    {/* Price Tag if available */}
                    {prod.price && (
                      <div className="absolute bottom-2.5 left-2.5 flex items-baseline gap-1.5 bg-slate-950/90 backdrop-blur-xs border border-white/15 px-2.5 py-1 rounded-lg shadow-sm">
                        <span className="text-sm font-black text-amber-400 font-mono">
                          {prod.price}
                        </span>
                        <span className="text-[10px] text-slate-300 font-medium">
                          {prod.priceNote}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <h3 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight leading-snug">
                        {prod.name}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {prod.description}
                      </p>

                      {/* Deliverables / Highlights */}
                      <ul className="space-y-1 pt-1.5 text-[11px] text-slate-600">
                        {prod.details.slice(0, 3).map((detail, idx) => (
                          <li key={idx} className="flex items-center gap-1.5 truncate">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button */}
                    <div className="pt-3 border-t border-slate-100 mt-2">
                      {prod.isAvailable && prod.ctaHref ? (
                        <Link
                          id={`product-${prod.id}-cta`}
                          href={prod.ctaHref}
                          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                        >
                          <span>{prod.ctaText}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleOpenDiscussion(`${prod.name} (Register Interest)`)}
                          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all cursor-pointer"
                        >
                          <Mail className="w-3 h-3" />
                          <span>{prod.ctaText}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. CUSTOM SOLUTIONS
            Eyebrow: BUILT FOR YOU
            Heading: Need a Tool Built for Your Workflow?
            Compact 4-Column Grid + Streamlined Consultation Bar
           ========================================================================= */}
        <section id="custom-solutions" className="py-12 sm:py-16 bg-white border-b border-slate-200 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-1.5">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block">
                BUILT FOR YOU
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-950 tracking-tight">
                Need a Tool Built for Your Workflow?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We design and build custom calculators, specialized software tools, and automated pipelines tailored to your exact business rules.
              </p>
            </div>

            {/* 4 Custom Solution Cards in a Compact 4-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto items-stretch">
              {CUSTOM_SOLUTIONS.map((service, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-amber-400/80 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center font-bold shadow-2xs group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                      {idx === 0 && <Calculator className="w-4 h-4" />}
                      {idx === 1 && <Laptop className="w-4 h-4" />}
                      {idx === 2 && <Bot className="w-4 h-4" />}
                      {idx === 3 && <Layers className="w-4 h-4" />}
                    </div>

                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-slate-950 transition-colors leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1.5 line-clamp-2">
                        {service.description}
                      </p>
                    </div>

                    {/* Compact Deliverables */}
                    <div className="pt-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-1.5">
                        Key Deliverables:
                      </span>
                      <ul className="space-y-1 text-[11px] text-slate-600">
                        {service.examples.slice(0, 3).map((ex, exIdx) => (
                          <li key={exIdx} className="flex items-center gap-1.5 truncate">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                            <span className="truncate">{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200/70 mt-4">
                    <button
                      onClick={() => handleOpenDiscussion(service.title)}
                      className="w-full text-xs font-bold text-slate-800 hover:text-amber-800 inline-flex items-center justify-between transition-colors cursor-pointer group-hover:text-amber-700"
                    >
                      <span>Discuss Requirement</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Streamlined Bottom Action Bar */}
            <div className="max-w-4xl mx-auto rounded-2xl bg-slate-950 text-white p-5 sm:p-6 border border-slate-800 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-amber-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                    Custom Project Consultation
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  Have a specific software, spreadsheet, or automation requirement?
                </h4>
                <p className="text-xs text-slate-400">
                  We assess technical feasibility, scope, timeline, and exact pricing before work begins.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => handleOpenDiscussion("General Custom Project")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>Discuss Your Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href="mailto:support@thinktools.in?subject=Custom%20Solution%20Enquiry"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 font-bold text-xs transition-all whitespace-nowrap"
                  title="support@thinktools.in"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Email Us</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. HOW A CUSTOM PROJECT WORKS
            Eyebrow: A CLEAR PROCESS
            Heading: From Requirement to Working Solution
            Steps: 01. Share Your Requirement, 02. Define the Scope,
                   03. Develop and Review, 04. Handover
           ========================================================================= */}
        <section id="process" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block">
                A CLEAR PROCESS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
                From Requirement to Working Solution
              </h2>
              <p className="text-sm text-slate-600">
                A structured four-step journey to convert your workflow requirement into a tested digital tool.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {PROJECT_WORK_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-2xl font-black text-amber-500 font-mono block">
                      {step.step}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => handleOpenDiscussion("Start a Conversation")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                <span>Start a Conversation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. WHY THINKTOOLS?
            Eyebrow: OUR APPROACH
            Heading: Practical Solutions, Clearly Explained
            4 Pillars: Built Around Real Requirements, Clear Product Information,
                       Transparent Scope and Pricing, Different Ways to Solve a Problem
           ========================================================================= */}
        <section id="about" className="py-14 sm:py-20 bg-white border-b border-slate-200 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block">
                OUR APPROACH
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
                Practical Solutions, Clearly Explained
              </h2>
              <p className="text-sm text-slate-600">
                Our focus is on clear scope and useful functionality—not exaggerated claims or
                guaranteed business outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {WHY_THINKTOOLS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs space-y-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto p-4 rounded-xl bg-slate-100 border border-slate-200 text-center text-xs text-slate-600">
              Our focus is on clear scope and useful functionality—not exaggerated claims or guaranteed business outcomes.
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. WHO WE BUILD FOR
            Eyebrow: DIFFERENT NEEDS, PRACTICAL TOOLS
            Heading: One Platform. Different Problems to Solve.
            4 items: Construction & Civil, Business & Operations,
                     Professionals & Consultants, Businesses With Specific Requirements
           ========================================================================= */}
        <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block">
                DIFFERENT NEEDS, PRACTICAL TOOLS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
                One Platform. Different Problems to Solve.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Tools and software models planned around realistic day-to-day requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {WHO_WE_BUILD_FOR.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2"
                >
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-center text-[11px] text-slate-500 max-w-2xl mx-auto leading-relaxed">
              These describe the types of requirements ThinkTools can explore; they are not claims of
              existing clients or completed projects in every category.
            </p>
          </div>
        </section>

        {/* =========================================================================
            9. FREQUENTLY ASKED QUESTIONS
            Strictly factual answers based on actual specifications.
           ========================================================================= */}
        <section id="faqs" className="py-14 sm:py-20 bg-white border-b border-slate-200 scroll-mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block">
                QUESTIONS & ANSWERS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Direct information regarding tools, products, custom development, and pricing.
              </p>
            </div>

            <div className="space-y-3">
              {HOMEPAGE_FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm hover:text-amber-700 transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            10. FINAL CTA
            Eyebrow: HAVE A PROBLEM TO SOLVE?
            Heading: Start With the Right Tool.
            Description: Explore our available products, use a free online tool,
            or tell us about a calculator or software solution you need.
            Primary CTA: Explore Products
            Secondary CTA: Discuss a Custom Solution
            Contact: support@thinktools.in
           ========================================================================= */}
        <section className="py-16 sm:py-20 bg-slate-950 text-white text-center border-t border-slate-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HAVE A PROBLEM TO SOLVE?</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Start With the Right Tool.
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Explore our available products, use a free online tool, or tell us about a calculator
              or software solution you need.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <a
                href="#products"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-md shadow-amber-500/20 transition-all cursor-pointer"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => handleOpenDiscussion("Discuss a Custom Solution")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold text-sm transition-all cursor-pointer"
              >
                <span>Discuss a Custom Solution</span>
              </button>
            </div>

            <div className="pt-4 text-xs text-slate-400">
              Contact:{" "}
              <a
                href="mailto:support@thinktools.in"
                className="text-amber-400 hover:text-amber-300 font-mono underline font-medium"
              >
                support@thinktools.in
              </a>
            </div>
          </div>
        </section>
      </main>



      {/* =========================================================================
          CUSTOM PROJECT DISCUSSION & EARLY INTEREST REGISTRATION MODAL
         ========================================================================= */}
      <ProjectDiscussionModal
        isOpen={isDiscussionOpen}
        onClose={() => setIsDiscussionOpen(false)}
        defaultTopic={discussionTopic}
      />

      {/* =========================================================================
          11. FOOTER
         ========================================================================= */}
      <Footer />
    </div>
  );
}
