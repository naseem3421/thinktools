"use client";

import React, { useState } from "react";
import { Calculator, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

interface InteractiveCalculatorProps {
  onUnlockClick: () => void;
}

export default function InteractiveCalculatorPreview({ onUnlockClick }: InteractiveCalculatorProps) {
  const [area, setArea] = useState<number>(1500);
  const [grade, setGrade] = useState<"standard" | "premium" | "luxury">("premium");
  const [floors, setFloors] = useState<number>(1);

  // Construction thumb rules based on Indian civil engineering standards
  const rates = {
    standard: 1650, // Rs per sq.ft
    premium: 2150,
    luxury: 2850,
  };

  const totalArea = area * floors;
  const costPerSqFt = rates[grade];
  const totalCost = totalArea * costPerSqFt;

  // Approximate thumb rules for materials:
  const cementBags = Math.round(totalArea * 0.42); // ~0.4 - 0.45 bags/sqft
  const steelTonnes = ((totalArea * 3.5) / 1000).toFixed(2); // ~3.5 - 4.0 kg/sqft
  const sandCuFt = Math.round(totalArea * 1.8); // ~1.8 cu.ft/sqft
  const bricksCount = Math.round(totalArea * 18); // ~18-20 bricks/sqft
  const estMargin = Math.round(totalCost * 0.15); // ~15% contractor margin

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-white border border-slate-200 p-6 md:p-8 shadow-xl relative overflow-hidden">
      {/* Background ambient subtle tint */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Live Interactive Demo
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Calculator className="w-6 h-6 text-amber-600" />
            Quick Site Estimation Simulator
          </h3>
          <p className="text-slate-500 text-sm mt-1">
            Test how the underlying algorithms estimate materials & budgets in real-time.
          </p>
        </div>
        <div className="text-right hidden md:block">
          <span className="text-xs text-slate-400 block font-medium">Calculation Method</span>
          <span className="text-xs font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md inline-block mt-0.5 font-semibold">
            IS Code Thumb Rules Verified
          </span>
        </div>
      </div>

      {/* Controls & Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-slate-200">
        {/* Built-up Area Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm font-medium">
            <label className="text-slate-700 font-semibold">Plot / Built-up Area</label>
            <span className="text-amber-800 font-mono font-bold text-base bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded">
              {area.toLocaleString()} sq.ft
            </span>
          </div>
          <input
            type="range"
            min="400"
            max="6000"
            step="50"
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className="w-full accent-amber-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>400 sq.ft</span>
            <span>3,000 sq.ft</span>
            <span>6,000 sq.ft</span>
          </div>
        </div>

        {/* Construction Finish Grade */}
        <div className="space-y-2">
          <label className="text-slate-700 text-sm font-semibold block">Finishing Quality Grade</label>
          <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {(["standard", "premium", "luxury"] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGrade(g)}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                  grade === g
                    ? "bg-white text-slate-900 border border-slate-200 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-500">
            {grade === "standard" && "Basic finishes, standard red brick / cement (₹1,650/sq.ft)"}
            {grade === "premium" && "Vitrified tiles, teak fittings, branded paint (₹2,150/sq.ft)"}
            {grade === "luxury" && "Italian marble, modular fittings, smart wiring (₹2,850/sq.ft)"}
          </p>
        </div>

        {/* Floors */}
        <div className="space-y-2">
          <label className="text-slate-700 text-sm font-semibold block">Number of Floors</label>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setFloors(num)}
                className={`py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  floors === num
                    ? "bg-amber-500 border-amber-500 text-slate-950 font-bold shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {num === 1 ? "G Ground" : num === 2 ? "G + 1" : "G + 2"}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-500">
            Total Construction Area: <span className="text-slate-900 font-bold font-mono">{totalArea.toLocaleString()} sq.ft</span>
          </p>
        </div>
      </div>

      {/* Output Results Grid */}
      <div className="py-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-amber-50/80 via-slate-50 to-amber-50/40 border border-amber-200 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-amber-800 block">
              Estimated Total Project Cost
            </span>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono mt-0.5">
              ₹{totalCost.toLocaleString("en-IN")}
            </div>
            <span className="text-xs text-slate-500 mt-1 block">
              Based on ₹{costPerSqFt.toLocaleString("en-IN")}/sq.ft average turnkey estimate
            </span>
          </div>

          <div className="bg-white border border-emerald-200 px-4 py-3 rounded-xl sm:text-right shadow-2xs">
            <span className="text-xs text-emerald-800 font-bold block">Est. Contractor Margin (~15%)</span>
            <span className="text-xl font-bold font-mono text-emerald-700">
              ₹{estMargin.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Material breakdown cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 shadow-2xs">
            <span className="text-xs text-slate-500 block font-semibold">Cement Bags</span>
            <div className="text-lg sm:text-xl font-bold font-mono text-amber-800 mt-1">
              ~{cementBags.toLocaleString()} <span className="text-xs text-slate-500">Bags</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5 block">@ 0.42 bags/sq.ft</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 shadow-2xs">
            <span className="text-xs text-slate-500 block font-semibold">Steel / TMT</span>
            <div className="text-lg sm:text-xl font-bold font-mono text-blue-800 mt-1">
              ~{steelTonnes} <span className="text-xs text-slate-500">Tonnes</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5 block">@ 3.5 kg/sq.ft</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 shadow-2xs">
            <span className="text-xs text-slate-500 block font-semibold">Sand / Coarse</span>
            <div className="text-lg sm:text-xl font-bold font-mono text-emerald-800 mt-1">
              ~{sandCuFt.toLocaleString()} <span className="text-xs text-slate-500">cu.ft</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5 block">~{(sandCuFt / 100).toFixed(1)} Brass</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 shadow-2xs">
            <span className="text-xs text-slate-500 block font-semibold">Red Bricks / Blocks</span>
            <div className="text-lg sm:text-xl font-bold font-mono text-purple-800 mt-1">
              ~{bricksCount.toLocaleString()} <span className="text-xs text-slate-500">Nos</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5 block">Standard masonry</span>
          </div>
        </div>
      </div>

      {/* Teaser CTA */}
      <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-600 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            The full workbook includes <strong>35+ material breakdown</strong>, automated BOQ quotations, labor wages & variance tracking.
          </span>
        </div>

        <button
          id="btn-interactive-unlock"
          onClick={onUnlockClick}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-amber-500/20 shrink-0 cursor-pointer"
        >
          <span>Unlock Full Excel Sheet</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
