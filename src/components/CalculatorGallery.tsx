"use client";

import React, { useState } from "react";
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  Sparkles,
  ZoomIn,
  CheckCircle2,
  FileSpreadsheet
} from "lucide-react";

export interface CalculatorScreenshot {
  id: string;
  tabNumber: number;
  tabName: string;
  shortLabel: string;
  category: "measure" | "budget" | "track" | "overview";
  categoryLabel: string;
  headline: string;
  subtitle: string;
  imageSrc: string;
  altText: string;
  keyMetric: string;
}

export const CALCULATOR_SCREENSHOTS: CalculatorScreenshot[] = [
  {
    id: "cost-estimate",
    tabNumber: 13,
    tabName: "13. Cost Estimate",
    shortLabel: "13. Cost Estimate",
    category: "budget",
    categoryLabel: "Cost & Budget",
    headline: "Know your full build cost before you sign",
    subtitle: "Every cost line, contingency and headroom vs. budget",
    imageSrc: "/screenshots/01_cost_estimate.png",
    altText: "Tab 13 Cost Estimate - Know your full build cost before you sign",
    keyMetric: "Subtotal, 10% contingency, ₹17,08,134 at ₹1,139/sq.ft"
  },
  {
    id: "dashboard",
    tabNumber: 24,
    tabName: "24. Dashboard",
    shortLabel: "24. Dashboard",
    category: "overview",
    categoryLabel: "Overview & Controls",
    headline: "Your whole project on one screen",
    subtitle: "Live totals, materials and charts update as you work",
    imageSrc: "/screenshots/02_dashboard.png",
    altText: "Tab 24 Dashboard - Your whole project on one screen",
    keyMetric: "Spend vs estimate chart, material rollups, headroom gauge"
  },
  {
    id: "room-area",
    tabNumber: 4,
    tabName: "04. Room Area",
    shortLabel: "04. Room Area",
    category: "measure",
    categoryLabel: "Measure & Quantify",
    headline: "Enter room sizes once. Everything else calculates.",
    subtitle: "Areas in sq ft and sq m, added up automatically",
    imageSrc: "/screenshots/03_room_area.png",
    altText: "Tab 04 Room Area - Enter room sizes once. Everything else calculates.",
    keyMetric: "Up to 12 rooms, carpet area 1,034 sq ft, automatic conversions"
  },
  {
    id: "paint-tiles",
    tabNumber: 6,
    tabName: "06. Paint & Tiles",
    shortLabel: "06. Paint & Tiles",
    category: "measure",
    categoryLabel: "Measure & Quantify",
    headline: "Paint and tile quantities, worked out for you",
    subtitle: "Litres, tiles and costs per room, with openings deducted",
    imageSrc: "/screenshots/04_paint_tiles.png",
    altText: "Tab 06 Paint and Tiles - Litres, tiles and costs per room",
    keyMetric: "Net wall area 3,592 sq ft, 80L paint, 294 floor tiles (600×600)"
  },
  {
    id: "order-list",
    tabNumber: 17,
    tabName: "17. Order List",
    shortLabel: "17. Order List",
    category: "track",
    categoryLabel: "Buy, Track & Approve",
    headline: "Know exactly what to buy, and from whom",
    subtitle: "Quantities with wastage, rates and a total material cost",
    imageSrc: "/screenshots/05_order_list.png",
    altText: "Tab 17 Order List - Know exactly what to buy, and from whom",
    keyMetric: "203 cement bags, 3.425T steel, 22,302 bricks with buffers"
  },
  {
    id: "stage-budget",
    tabNumber: 15,
    tabName: "15. Stage Budget",
    shortLabel: "15. Stage Budget",
    category: "budget",
    categoryLabel: "Cost & Budget",
    headline: "Track spend stage by stage against your target",
    subtitle: "Flags any stage that goes over its budget",
    imageSrc: "/screenshots/06_stage_budget.png",
    altText: "Tab 15 Stage Budget - Track spend stage by stage against your target",
    keyMetric: "Stage share targets, estimated vs target bars, Over-budget warning"
  },
  {
    id: "bill-check",
    tabNumber: 25,
    tabName: "25. Bill Check",
    shortLabel: "25. Bill Check",
    category: "track",
    categoryLabel: "Buy, Track & Approve",
    headline: "Catch overcharged contractor bills",
    subtitle: "Compares your calculation with the contractor's claim",
    imageSrc: "/screenshots/07_bill_check.png",
    altText: "Tab 25 Bill Check - Catch overcharged contractor bills",
    keyMetric: "5% allowed tolerance, auto red alert when claims exceed norms"
  },
  {
    id: "quotation",
    tabNumber: 30,
    tabName: "30. Quotation",
    shortLabel: "30. Quotation",
    category: "overview",
    categoryLabel: "Overview & Controls",
    headline: "A print-ready quotation for your client",
    subtitle: "Itemised, with contingency, GST and validity terms",
    imageSrc: "/screenshots/08_quotation.png",
    altText: "Tab 30 Quotation - A print-ready quotation for your client",
    keyMetric: "Print-ready BOQ proposal, 30-day validity, contract terms"
  }
];

export default function CalculatorGallery() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const currentItem = CALCULATOR_SCREENSHOTS[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % CALCULATOR_SCREENSHOTS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + CALCULATOR_SCREENSHOTS.length) % CALCULATOR_SCREENSHOTS.length);
  };

  return (
    <section id="calculator-gallery" className="py-12 bg-slate-900 text-white border-y border-slate-800 relative overflow-hidden">
      {/* Background ambient subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Compact Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 font-semibold mb-2">
            <Eye className="w-3.5 h-3.5" />
            <span>Visual Proof · 8 Real Worksheets</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Calculator Gallery
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5">
            Click any tab below to inspect the authentic formulas, tolerance flags, and layouts:
          </p>
        </div>

        {/* Compact Tab Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-5">
          {CALCULATOR_SCREENSHOTS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeIndex === idx
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/25 scale-[1.02]"
                  : "bg-slate-800/90 hover:bg-slate-700/80 text-slate-300 border border-slate-700/60"
              }`}
            >
              <span>{item.shortLabel}</span>
            </button>
          ))}
        </div>

        {/* Compact Spotlight Window */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
          {/* Top Window Bar */}
          <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              </div>
              <span className="text-amber-400 font-mono font-semibold ml-2 text-[11px]">
                {currentItem.tabName}
              </span>
              <span className="text-slate-500 hidden sm:inline text-[11px]">· {currentItem.headline}</span>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium border border-slate-700 transition-colors cursor-pointer"
            >
              <Maximize2 className="w-3 h-3 text-amber-400" />
              <span>Full Screen</span>
            </button>
          </div>

          {/* Screenshot Display Area with Prev/Next Controls */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] max-h-[460px] bg-slate-950 flex items-center justify-center overflow-hidden group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentItem.imageSrc}
              alt={currentItem.altText}
              onClick={() => setIsModalOpen(true)}
              className="w-full h-full object-contain cursor-zoom-in transition-transform duration-300 hover:scale-[1.01]"
            />

            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/85 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 flex items-center justify-center shadow-lg transition-all cursor-pointer backdrop-blur-xs"
              title="Previous Screenshot"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/85 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 flex items-center justify-center shadow-lg transition-all cursor-pointer backdrop-blur-xs"
              title="Next Screenshot"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Click to zoom pill on hover */}
            <div
              onClick={() => setIsModalOpen(true)}
              className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
              <span>Click image to zoom</span>
            </div>
          </div>

          {/* Bottom Caption Bar */}
          <div className="px-4 py-3 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div>
              <span className="text-white font-bold">{currentItem.headline}</span>
              <span className="text-slate-400 ml-2 hidden sm:inline">{currentItem.subtitle}</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-emerald-400 font-mono text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {currentItem.keyMetric}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {activeIndex + 1} / {CALCULATOR_SCREENSHOTS.length}
              </span>
            </div>
          </div>
        </div>

        {/* Compact Mini-Thumbnail Strip */}
        <div className="mt-3 grid grid-cols-4 sm:grid-cols-8 gap-2">
          {CALCULATOR_SCREENSHOTS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative rounded-lg overflow-hidden border transition-all cursor-pointer aspect-[16/10] bg-slate-950 ${
                activeIndex === idx
                  ? "border-amber-400 ring-2 ring-amber-400/30 scale-[1.04]"
                  : "border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageSrc}
                alt={item.altText}
                className="w-full h-full object-cover object-top"
              />
              <span className="absolute bottom-0 inset-x-0 bg-slate-950/85 text-[9px] font-mono text-center text-amber-300 py-0.5 truncate px-0.5">
                Tab {item.tabNumber < 10 ? `0${item.tabNumber}` : item.tabNumber}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* FULL-SCREEN HIGH-RESOLUTION LIGHTBOX MODAL */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded">
                  Tab {currentItem.tabNumber < 10 ? `0${currentItem.tabNumber}` : currentItem.tabNumber} · {currentItem.tabName}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-lg">
                  {currentItem.headline}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                  title="Previous Screenshot"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                  title="Next Screenshot"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors ml-2 cursor-pointer"
                  title="Close Lightbox"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Image Body - Uncropped High-Res View */}
            <div className="flex-1 overflow-auto bg-slate-950 p-2 sm:p-4 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentItem.imageSrc}
                alt={currentItem.altText}
                className="max-w-full max-h-[75vh] object-contain rounded-xl border border-slate-800 shadow-2xl"
              />
            </div>

            {/* Modal Footer Description */}
            <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="text-white font-bold">{currentItem.headline}: </span>
                <span className="text-slate-400">{currentItem.subtitle}</span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-emerald-400 font-mono text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {currentItem.keyMetric}
                </span>
                <span className="text-[11px] text-amber-400 font-mono font-semibold">
                  {activeIndex + 1} of {CALCULATOR_SCREENSHOTS.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
