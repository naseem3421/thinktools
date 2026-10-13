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
  ArrowRight
} from "lucide-react";

export interface CalculatorScreenshot {
  id: string;
  tabNumber: number;
  tabName: string;
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
    tabName: "13 Cost Estimate",
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
    tabName: "24 Dashboard",
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
    tabName: "04 Room Area",
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
    tabName: "06 Paint & Tiles",
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
    tabName: "17 Order List",
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
    tabName: "15 Stage Budget",
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
    tabName: "25 Bill Check",
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
    tabName: "30 Quotation",
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
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState<number | null>(null);

  const filteredScreenshots = CALCULATOR_SCREENSHOTS.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  const activeItem =
    selectedScreenshotIndex !== null ? CALCULATOR_SCREENSHOTS[selectedScreenshotIndex] : null;

  const handleNext = () => {
    if (selectedScreenshotIndex === null) return;
    setSelectedScreenshotIndex((selectedScreenshotIndex + 1) % CALCULATOR_SCREENSHOTS.length);
  };

  const handlePrev = () => {
    if (selectedScreenshotIndex === null) return;
    setSelectedScreenshotIndex(
      (selectedScreenshotIndex - 1 + CALCULATOR_SCREENSHOTS.length) % CALCULATOR_SCREENSHOTS.length
    );
  };

  return (
    <section id="calculator-gallery" className="py-20 bg-slate-900 text-white border-y border-slate-800 relative overflow-hidden">
      {/* Background ambient subtle glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 font-semibold mb-3">
            <Eye className="w-3.5 h-3.5" />
            <span>High-Resolution Sheet Screenshots</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Calculator Gallery
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            Inspect the exact worksheets, formulas, and layouts from the live package. Click any screenshot to view full resolution.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: "all", label: "All 8 Worksheets", count: 8 },
            { id: "measure", label: "Measure & Quantify", count: 2 },
            { id: "budget", label: "Cost & Budget", count: 2 },
            { id: "track", label: "Buy & Track Bills", count: 2 },
            { id: "overview", label: "Dashboard & Client BOQ", count: 2 },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeCategory === cat.id
                  ? "bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20"
                  : "bg-slate-800/80 border border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-600"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  activeCategory === cat.id
                    ? "bg-slate-950/20 text-slate-950 font-bold"
                    : "bg-slate-700 text-slate-400"
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Screenshot Grid - Exactly the 8 Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredScreenshots.map((item) => {
            const globalIndex = CALCULATOR_SCREENSHOTS.findIndex((s) => s.id === item.id);

            return (
              <div
                key={item.id}
                onClick={() => setSelectedScreenshotIndex(globalIndex)}
                className="group bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-amber-400/80 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/10"
              >
                {/* Visual Image Preview */}
                <div className="relative aspect-[16/10] bg-slate-900 border-b border-slate-800/80 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageSrc}
                    alt={item.altText}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Hover Overlay with Zoom Icon */}
                  <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-2xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs">
                    <Maximize2 className="w-4 h-4 text-amber-400" />
                    <span>Click to Zoom</span>
                  </div>

                  {/* Tab Number Badge */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-slate-950/85 backdrop-blur-md border border-slate-700/80 text-[10px] font-mono text-amber-400 font-bold shadow-xs">
                    Tab {item.tabNumber < 10 ? `0${item.tabNumber}` : item.tabNumber}
                  </div>
                </div>

                {/* Card Info Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] text-emerald-400 uppercase tracking-wider mb-1 font-semibold">
                      {item.categoryLabel}
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                      {item.headline}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Metric Pill at card bottom */}
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-amber-400/90 font-mono text-[10px] truncate max-w-[200px]">
                      {item.keyMetric}
                    </span>
                    <span className="text-slate-500 group-hover:text-amber-400 transition-colors shrink-0">
                      <ZoomIn className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FULL-SCREEN HIGH-RESOLUTION LIGHTBOX MODAL */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedScreenshotIndex(null)}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded">
                  Tab {activeItem.tabNumber < 10 ? `0${activeItem.tabNumber}` : activeItem.tabNumber} · {activeItem.tabName}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-lg">
                  {activeItem.headline}
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
                  onClick={() => setSelectedScreenshotIndex(null)}
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
                src={activeItem.imageSrc}
                alt={activeItem.altText}
                className="max-w-full max-h-[75vh] object-contain rounded-xl border border-slate-800 shadow-2xl"
              />
            </div>

            {/* Modal Footer Description */}
            <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="text-white font-bold">{activeItem.headline}: </span>
                <span className="text-slate-400">{activeItem.subtitle}</span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-emerald-400 font-mono text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {activeItem.keyMetric}
                </span>
                <span className="text-[11px] text-amber-400 font-mono font-semibold">
                  {selectedScreenshotIndex !== null ? selectedScreenshotIndex + 1 : 0} of {CALCULATOR_SCREENSHOTS.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
