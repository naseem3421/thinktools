"use client";

import React, { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Keyboard,
  ShieldAlert,
  ArrowRight,
  Eye,
  FileText,
  Lightbulb,
  Check,
  Sparkles,
  CircleDot,
  Calculator,
  Layers,
  ClipboardCheck
} from "lucide-react";

interface QuickStartPreviewProps {
  onUnlockClick: () => void;
}

export default function QuickStartPreview({ onUnlockClick }: QuickStartPreviewProps) {
  const [activeGuideTab, setActiveGuideTab] = useState<"colors" | "workflow" | "checklist" | "troubleshooting">("colors");

  return (
    <section className="py-20 bg-slate-900/50 border-y border-slate-800/80 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Customer Quick-Start Guide Preview</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Designed to Be Effortless & Impossible to Break
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            Worried about complicated formulas or Excel macro errors? The workbook uses an intuitive, standardized 3-color formula system explained in the included <strong>Customer Quick-Start Guide</strong>.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: "colors", label: "The 3-Color Cell System", badge: "Core Safety", icon: Layers },
            { id: "workflow", label: "5-Step Recommended Workflow", badge: "Simple", icon: Calculator },
            { id: "checklist", label: "Final 8-Point Project Checklist", badge: "Accuracy", icon: ClipboardCheck },
            { id: "troubleshooting", label: "Pro Shortcuts & Recalculation", badge: "Instant Fixes", icon: Keyboard },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveGuideTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeGuideTab === tab.id
                    ? "bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    activeGuideTab === tab.id
                      ? "bg-slate-950/20 text-slate-950 font-bold"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: The 3-Color Cell System */}
        {activeGuideTab === "colors" && (
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 animate-in fade-in duration-200">
            <div className="max-w-2xl">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                Section 3 of Quick-Start Guide
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                Understand the Workbook Cell Colors
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
                You never have to guess where to type or worry about overwriting sensitive calculations. Every sheet follows a strict 3-color standardized visual convention:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Yellow Cell */}
              <div className="bg-slate-900/80 border border-amber-500/40 rounded-2xl p-5 relative overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-400 flex items-center justify-center mb-4 shadow-md">
                  <CircleDot className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-md bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-xs font-bold mb-2">
                  Yellow Cells = User Input
                </div>
                <h4 className="text-sm font-bold text-white">Enter or Edit Values Here</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Only type in yellow cells. These hold your room measurements, TMT diameters, local cement bag rates, and labor charges.
                </p>
              </div>

              {/* Green Cell */}
              <div className="bg-slate-900/80 border border-emerald-500/40 rounded-2xl p-5 relative overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-emerald-400/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mb-4 shadow-md">
                  <CheckCircle2 className="w-5 h-5 fill-emerald-400/20 text-emerald-400" />
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 font-mono text-xs font-bold mb-2">
                  Green Cells = Calculated Output
                </div>
                <h4 className="text-sm font-bold text-white">Automated Formula Engine</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Formula-driven totals, concrete mix volumes, steel weight, and costs update here automatically. Never overwrite these cells.
                </p>
              </div>

              {/* Blue/Teal Header */}
              <div className="bg-slate-900/80 border border-cyan-500/40 rounded-2xl p-5 relative overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-cyan-400/20 border border-cyan-400/40 text-cyan-400 flex items-center justify-center mb-4 shadow-md">
                  <Layers className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-md bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 font-mono text-xs font-bold mb-2">
                  Teal / Blue = Section Headers
                </div>
                <h4 className="text-sm font-bold text-white">Titles, Labels & Navigation</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Clear visual guides, unit indicators (e.g. sq.ft., cu.m, kg, bags), and instant jump links across the 18 sheets.
                </p>
              </div>
            </div>

            {/* Visual Mini Mockup Table */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs overflow-x-auto">
              <div className="text-[11px] text-slate-500 mb-2 font-sans flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>Sample Excel Tab View from Sheet 06 (Nominal Mix Concrete):</span>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-cyan-950/40 border-b border-cyan-800/60 text-cyan-300">
                    <th className="p-2.5 font-bold">Item Description</th>
                    <th className="p-2.5 font-bold">Input Dimensions (Yellow User Cell)</th>
                    <th className="p-2.5 font-bold">Standard Mix</th>
                    <th className="p-2.5 font-bold">Calculated Output (Green Auto Cell)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr>
                    <td className="p-2.5">Plinth Beam Casting (RCC)</td>
                    <td className="p-2.5">
                      <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded font-bold">
                        15.0 cu.m
                      </span>
                    </td>
                    <td className="p-2.5 text-slate-400">M20 (1 : 1.5 : 3)</td>
                    <td className="p-2.5">
                      <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-bold">
                        123 Cement Bags + 6.9 cu.m Sand
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: 5-Step Recommended Workflow */}
        {activeGuideTab === "workflow" && (
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                Section 4 of Quick-Start Guide
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                The Recommended 5-Step Project Workflow
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                Follow this sequential path to take a project from blueprint measurements to an itemized preliminary BOQ in minutes:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                {
                  step: "01",
                  title: "Start & Setup",
                  desc: "Save a new project copy. Enter client name, site location & plot built-up area in Sheet 1."
                },
                {
                  step: "02",
                  title: "Local Rates",
                  desc: "Open Sheet 2 (Settings & Rates). Update current cement bag, steel, sand & labor charges for your city."
                },
                {
                  step: "03",
                  title: "Calculators",
                  desc: "Go to relevant sheets (Earthwork, RCC, Brickwork, Plaster, Tiles, Paint) and enter yellow dimension cells."
                },
                {
                  step: "04",
                  title: "Cost Estimator",
                  desc: "Review compiled quantities in Sheet 13. Adjust contingency margins and stage-wise allowances."
                },
                {
                  step: "05",
                  title: "BOQ Summary",
                  desc: "Open Sheet 14 (BOQ Summary & Rate Analysis) to export a clean, professional print-ready client estimate."
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
                >
                  <div>
                    <span className="text-xl font-black font-mono text-amber-400 block mb-2">
                      {item.step}
                    </span>
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Step Verified
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Final 8-Point Project Checklist */}
        {activeGuideTab === "checklist" && (
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                Section 11 of Quick-Start Guide
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                Final 8-Point Checklist Before Relying on an Estimate
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                Before submitting a quotation to a client or placing a major material order, run through this built-in verification checklist:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Project dimensions checked against current approved drawings or site measurements.",
                "Units confirmed for every input (do not enter millimetres where metres or feet are expected).",
                "Local material and labour rates updated in Sheet 2 with recent supplier quotes.",
                "Wastage and contingency reviewed to avoid accidental double-counting across sheets.",
                "Door and window openings deducted to avoid excess brickwork and plastering quantities.",
                "Steel laps, hooks, overlaps, and site-specific structural allowances factored in.",
                "GST, cartage transport, scaffolding, machinery equipment, and overhead exclusions verified.",
                "Project-specific workbook saved with a clear client name and date timestamp."
              ].map((chk, i) => (
                <div
                  key={i}
                  className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 flex items-start gap-3 hover:border-slate-700 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300 leading-relaxed">{chk}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Pro Shortcuts & Troubleshooting */}
        {activeGuideTab === "troubleshooting" && (
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                Sections 2 & 9 of Quick-Start Guide
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                Instant Troubleshooting & Pro Shortcuts
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                Common questions answered directly in the guide so you never get stuck:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold mb-2">
                  <Keyboard className="w-4 h-4" />
                  <span>Ctrl + Alt + F9</span>
                </div>
                <h4 className="text-sm font-bold text-white">Force Full Recalculation</h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  If you enter new rates and want Excel to refresh all 18 sheets simultaneously, press <code className="text-amber-300 bg-slate-950 px-1 py-0.5 rounded">Ctrl + Alt + F9</code>.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-bold mb-2">
                  <Lightbulb className="w-4 h-4" />
                  <span>Formula vs Result</span>
                </div>
                <h4 className="text-sm font-bold text-white">Cell Shows Formula Text?</h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  If a cell shows text instead of a number, simply change cell format from "Text" to "General", then press Enter.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold mb-2">
                  <FileText className="w-4 h-4" />
                  <span>Print Previews</span>
                </div>
                <h4 className="text-sm font-bold text-white">Clean PDF Print Layouts</h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Every sheet is pre-configured with print areas so your BOQ and client quotation exports fit cleanly on standard A4 pages.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Banner Note */}
        <div className="mt-8 bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Complete 11-Section Guide Included</h4>
              <p className="text-xs text-slate-400">
                You get the complete, printable PDF Customer Quick-Start Guide + QA Report immediately upon download.
              </p>
            </div>
          </div>

          <button
            id="btn-quickstart-cta"
            type="button"
            onClick={onUnlockClick}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/20 shrink-0 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Get Toolkit & Guide (₹499)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
