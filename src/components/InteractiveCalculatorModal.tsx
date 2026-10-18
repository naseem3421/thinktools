"use client";

import React, { useState } from "react";
import {
  X,
  AlertCircle,
  Copy,
  Check
} from "lucide-react";

export interface FreeTool {
  id?: string;
  name: string;
  description: string;
  category: string;
  status: string;
  calculatorType?: string;
}

interface InteractiveCalculatorModalProps {
  tool: FreeTool | null;
  onClose: () => void;
}

export default function InteractiveCalculatorModal({
  tool,
  onClose,
}: InteractiveCalculatorModalProps) {
  if (!tool) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold">
                {tool.category}
              </span>
              {tool.status === "Ready to Use" ? (
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30 font-semibold">
                  Active Calculator
                </span>
              ) : (
                <span className="text-[10px] font-mono text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30 font-semibold">
                  {tool.status}
                </span>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {tool.name}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {tool.description}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Calculator"
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Calculator Body */}
        <div className="p-5 sm:p-7 max-h-[75vh] overflow-y-auto">
          {tool.id === "concrete-mix-calculator" && <ConcreteCalculator />}
          {tool.id === "brick-mortar-calculator" && <BrickCalculator />}
          {tool.id === "room-paint-tile-calculator" && <RoomPaintTileCalculator />}
          {tool.id === "steel-bbs-calculator" && <SteelBbsCalculator />}
          {tool.id === "electrical-load-estimator" && <ElectricalCalculator />}
          {tool.id === "hourly-rate-margin-calculator" && <HourlyRateCalculator />}
          {tool.id === "gst-tax-invoice-calculator" && <GstCalculator />}
          {tool.id === "excavation-volume-calculator" && <ExcavationCalculator />}
          {tool.id === "plastering-mortar-calculator" && <PlasterCalculator />}
          {tool.id === "contractor-boq-template" && <BoqTemplateViewer />}
          {tool.id === "solar-rooftop-estimator" && <SolarEstimator />}
          {tool.id === "saas-cash-runway-calculator" && <SaasRunwayCalculator />}
        </div>

        {/* Footer Disclaimer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            {tool.status === "Ready to Use"
              ? "Calculations reflect standard civil/business norms. Always verify site specifics."
              : "Experimental model for early estimation only."}
          </span>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-1 rounded-lg bg-slate-200/80 hover:bg-slate-300 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

/* 1. Concrete Calculator */
function ConcreteCalculator() {
  const [length, setLength] = useState<number>(20);
  const [width, setWidth] = useState<number>(15);
  const [depth, setDepth] = useState<number>(0.5); // 6 inches in feet
  const [grade, setGrade] = useState<"M15" | "M20" | "M25">("M20");

  const wetVolumeCuFt = length * width * depth;
  const wetVolumeCuM = wetVolumeCuFt * 0.0283168;
  const dryVolumeCuM = wetVolumeCuM * 1.54; // Dry volume factor

  // Ratio definitions: cement : sand : aggregate
  const ratios = {
    M15: { cement: 1, sand: 2, agg: 4, total: 7 },
    M20: { cement: 1, sand: 1.5, agg: 3, total: 5.5 },
    M25: { cement: 1, sand: 1, agg: 2, total: 4 },
  };

  const currRatio = ratios[grade];
  const cementCuM = (dryVolumeCuM * currRatio.cement) / currRatio.total;
  const cementBags = Math.ceil(cementCuM / 0.0347); // 1 bag (50kg) = ~0.0347 cu.m
  const sandCuM = (dryVolumeCuM * currRatio.sand) / currRatio.total;
  const sandCuFt = sandCuM * 35.3147;
  const sandTonnes = sandCuM * 1.6; // ~1600 kg/m3
  const aggCuM = (dryVolumeCuM * currRatio.agg) / currRatio.total;
  const aggCuFt = aggCuM * 35.3147;
  const aggTonnes = aggCuM * 1.5; // ~1500 kg/m3

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Length (Feet)</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Width (Feet)</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Thickness / Depth (Feet)</label>
          <input
            type="number"
            step="0.1"
            value={depth}
            onChange={(e) => setDepth(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
          <span className="text-[10px] text-slate-400">e.g. 0.5 ft = 6 inches slab</span>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Nominal Mix Grade</label>
        <div className="grid grid-cols-3 gap-2">
          {(["M15", "M20", "M25"] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGrade(g)}
              className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                grade === g
                  ? "bg-amber-500 text-slate-950 border-amber-400 shadow-xs"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {g} {g === "M15" ? "(1:2:4)" : g === "M20" ? "(1:1.5:3)" : "(1:1:2)"}
            </button>
          ))}
        </div>
      </div>

      {/* Results Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white space-y-3">
        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold block">
          Calculated Material Takeoff:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">{wetVolumeCuFt.toFixed(1)}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Wet Vol (cu ft)</span>
            <span className="text-[10px] text-slate-400 font-mono">{wetVolumeCuM.toFixed(2)} m³</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">{cementBags}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Cement (Bags)</span>
            <span className="text-[10px] text-slate-400 font-mono">50 kg / bag</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-white font-mono">{sandCuFt.toFixed(0)}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Sand (cu ft)</span>
            <span className="text-[10px] text-slate-400 font-mono">~{sandTonnes.toFixed(1)} MT</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-white font-mono">{aggCuFt.toFixed(0)}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Aggregate (cu ft)</span>
            <span className="text-[10px] text-slate-400 font-mono">~{aggTonnes.toFixed(1)} MT</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 2. Brickwork Calculator */
function BrickCalculator() {
  const [length, setLength] = useState<number>(30);
  const [height, setHeight] = useState<number>(10);
  const [wallType, setWallType] = useState<"9inch" | "4.5inch">("9inch");
  const [openingsArea, setOpeningsArea] = useState<number>(42); // 1 door (21 sqft) + 1 window (21 sqft)

  const grossArea = length * height;
  const netArea = Math.max(0, grossArea - openingsArea);

  // Standard Indian modular brick with mortar joint: 200mm x 100mm x 100mm
  // In 9" (230mm) wall: ~12.5 bricks per sq ft
  // In 4.5" (115mm) wall: ~6.25 bricks per sq ft
  const bricksPerSqFt = wallType === "9inch" ? 12.5 : 6.25;
  const totalBricks = Math.ceil(netArea * bricksPerSqFt * 1.05); // 5% wastage

  // Mortar estimates
  const cementBags = Math.ceil(wallType === "9inch" ? netArea * 0.055 : netArea * 0.025);
  const sandCuFt = Math.ceil(wallType === "9inch" ? netArea * 0.28 : netArea * 0.14);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Wall Length (Feet)</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Wall Height (Feet)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Door & Window Deductions (sq ft)</label>
          <input
            type="number"
            value={openingsArea}
            onChange={(e) => setOpeningsArea(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Wall Thickness</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setWallType("9inch")}
            className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
              wallType === "9inch"
                ? "bg-amber-500 text-slate-950 border-amber-400"
                : "bg-slate-50 text-slate-700 border-slate-200"
            }`}
          >
            9-Inch Outer Wall (One Brick)
          </button>
          <button
            type="button"
            onClick={() => setWallType("4.5inch")}
            className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
              wallType === "4.5inch"
                ? "bg-amber-500 text-slate-950 border-amber-400"
                : "bg-slate-50 text-slate-700 border-slate-200"
            }`}
          >
            4.5-Inch Partition Wall (Half Brick)
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white space-y-3">
        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold block">
          Calculated Masonry Takeoff (Includes 5% Breakage):
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">{netArea.toFixed(0)}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Net Area (sq ft)</span>
            <span className="text-[10px] text-slate-400 font-mono">Deducted {openingsArea} sqft</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">{totalBricks}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Bricks Needed</span>
            <span className="text-[10px] text-slate-400 font-mono">+5% breakage</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-white font-mono">{cementBags}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Cement (Bags)</span>
            <span className="text-[10px] text-slate-400 font-mono">1:6 Mortar</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-white font-mono">{sandCuFt}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Sand (cu ft)</span>
            <span className="text-[10px] text-slate-400 font-mono">Coarse Sand</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 3. Room Paint & Tile Calculator */
function RoomPaintTileCalculator() {
  const [length, setLength] = useState<number>(14);
  const [width, setWidth] = useState<number>(12);
  const [height, setHeight] = useState<number>(10);
  const [openingsArea, setOpeningsArea] = useState<number>(35); // 1 door + 1 window

  const floorArea = length * width;
  // 600x600 mm = ~3.875 sq ft per tile. Typically 4 tiles per box = 15.5 sq ft/box.
  const tileBoxes = Math.ceil((floorArea * 1.07) / 15.5); // 7% tile cuts buffer
  const perimeter = 2 * (length + width);
  const wallGrossArea = perimeter * height;
  const wallNetArea = Math.max(0, wallGrossArea - openingsArea);

  // Paint coverage: Primer ~120 sqft/L (1 coat), Emulsion ~70 sqft/L (2 coats)
  const primerLitres = Math.ceil(wallNetArea / 120);
  const paintLitres = Math.ceil(wallNetArea / 70);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Length (Ft)</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Width (Ft)</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Height (Ft)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Openings (sq ft)</label>
          <input
            type="number"
            value={openingsArea}
            onChange={(e) => setOpeningsArea(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900"
          />
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white space-y-3">
        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold block">
          Calculated Floor & Wall Finishes:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">{floorArea}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Floor Area (sq ft)</span>
            <span className="text-[10px] text-slate-400 font-mono">Carpet Area</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">{tileBoxes}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Tile Boxes (600×600)</span>
            <span className="text-[10px] text-slate-400 font-mono">+7% cutting buffer</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-white font-mono">{wallNetArea}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Net Wall Area (sq ft)</span>
            <span className="text-[10px] text-slate-400 font-mono">Deductions applied</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-white font-mono">{paintLitres}L</span>
            <span className="block text-[11px] text-slate-300 font-medium">Paint (2 Coats)</span>
            <span className="text-[10px] text-slate-400 font-mono">Primer: {primerLitres}L</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 4. Steel Rebar Calculator */
function SteelBbsCalculator() {
  const [diameter, setDiameter] = useState<number>(12); // mm
  const [lengthMeters, setLengthMeters] = useState<number>(120);

  // Standard formula: W = (D^2 / 162.2) kg/m
  const unitWeightKgPerM = (diameter * diameter) / 162.2;
  const totalWeightKg = unitWeightKgPerM * lengthMeters;
  const totalWeightTonnes = totalWeightKg / 1000;
  const standard12mBars = Math.ceil(lengthMeters / 12);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Bar Diameter (mm)</label>
          <div className="grid grid-cols-4 gap-1.5">
            {[8, 10, 12, 16, 20, 25, 32].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDiameter(d)}
                className={`py-2 rounded-xl border text-xs font-bold ${
                  diameter === d
                    ? "bg-amber-500 text-slate-950 border-amber-400"
                    : "bg-slate-50 text-slate-700 border-slate-200"
                }`}
              >
                {d} mm
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Total Running Length (Metres)</label>
          <input
            type="number"
            value={lengthMeters}
            onChange={(e) => setLengthMeters(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900"
          />
          <span className="text-[10px] text-slate-400">Equivalent to {(lengthMeters * 3.28084).toFixed(0)} Running Feet</span>
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white space-y-3">
        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold block">
          Calculated Rebar Tonnage (IS 1786 / CPWD Standard):
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">{unitWeightKgPerM.toFixed(3)}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Unit Wt (kg/m)</span>
            <span className="text-[10px] text-slate-400 font-mono">D²/162.2</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">{totalWeightKg.toFixed(1)}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Total Weight (kg)</span>
            <span className="text-[10px] text-slate-400 font-mono">Kilograms</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-white font-mono">{totalWeightTonnes.toFixed(3)}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Weight (Tonnes)</span>
            <span className="text-[10px] text-slate-400 font-mono">MT</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-white font-mono">{standard12mBars}</span>
            <span className="block text-[11px] text-slate-300 font-medium">12-Metre Rods</span>
            <span className="text-[10px] text-slate-400 font-mono">Standard lengths</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 5. Electrical Load Estimator */
function ElectricalCalculator() {
  const [watts, setWatts] = useState<number>(3500); // 3.5 kW
  const voltage = 230; // standard Indian single phase
  const powerFactor = 0.9;

  // I = P / (V * PF)
  const currentAmps = watts / (voltage * powerFactor);
  
  // Wire sizing recommendation (conservative copper conductors):
  let wireSize = "1.5 sq mm";
  let mcbRating = "10A MCB";
  if (currentAmps > 6 && currentAmps <= 14) {
    wireSize = "2.5 sq mm";
    mcbRating = "16A MCB";
  } else if (currentAmps > 14 && currentAmps <= 22) {
    wireSize = "4.0 sq mm";
    mcbRating = "25A MCB";
  } else if (currentAmps > 22 && currentAmps <= 30) {
    wireSize = "6.0 sq mm";
    mcbRating = "32A MCB";
  } else if (currentAmps > 30) {
    wireSize = "10.0 sq mm (or 3-Phase Distribution)";
    mcbRating = "40A+ MCB / Isolator";
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Total Appliance Connected Load (Watts)</label>
          <input
            type="number"
            step="100"
            value={watts}
            onChange={(e) => setWatts(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900"
          />
          <div className="flex flex-wrap gap-1 mt-1.5">
            <button onClick={() => setWatts(1500)} className="text-[10px] bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded text-slate-600">1.5kW (Geyser)</button>
            <button onClick={() => setWatts(2500)} className="text-[10px] bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded text-slate-600">2.5kW (1.5T AC)</button>
            <button onClick={() => setWatts(5000)} className="text-[10px] bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded text-slate-600">5kW (Full Flat)</button>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Supply Spec</label>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="flex justify-between"><span>Nominal Voltage:</span> <strong className="text-slate-900 font-mono">230V AC (1-Phase)</strong></div>
            <div className="flex justify-between"><span>Operating PF:</span> <strong className="text-slate-900 font-mono">0.90</strong></div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white space-y-3">
        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold block">
          Electrical Cable & Protection Sizing:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">{currentAmps.toFixed(1)} A</span>
            <span className="block text-[11px] text-slate-300 font-medium">Continuous Load (Amps)</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">{wireSize}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Rec. Copper Wire</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-white font-mono">{mcbRating}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Circuit Breaker</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 6. Hourly Rate Calculator */
function HourlyRateCalculator() {
  const [netIncomeGoal, setNetIncomeGoal] = useState<number>(100000); // 1 Lakh/month
  const [overheadMonthly, setOverheadMonthly] = useState<number>(20000);
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState<number>(25);
  const [profitBufferPct, setProfitBufferPct] = useState<number>(20);

  const annualTarget = (netIncomeGoal + overheadMonthly) * 12;
  const annualTargetWithBuffer = annualTarget * (1 + profitBufferPct / 100);
  const totalAnnualBillableHours = billableHoursPerWeek * 48; // 48 active weeks
  const hourlyRate = Math.ceil(annualTargetWithBuffer / Math.max(1, totalAnnualBillableHours));
  const dayRate = hourlyRate * 6; // 6 billable hours per day

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Target Monthly Take-Home (₹)</label>
          <input
            type="number"
            step="5000"
            value={netIncomeGoal}
            onChange={(e) => setNetIncomeGoal(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Monthly Business Overheads (₹)</label>
          <input
            type="number"
            step="2000"
            value={overheadMonthly}
            onChange={(e) => setOverheadMonthly(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900"
          />
          <span className="text-[10px] text-slate-400">Software subscriptions, office, internet, accountant</span>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Weekly Billable Hours (Max 20-30 typical)</label>
          <input
            type="number"
            value={billableHoursPerWeek}
            onChange={(e) => setBillableHoursPerWeek(Math.max(1, parseFloat(e.target.value) || 1))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Profit & Tax Cushion Buffer (%)</label>
          <input
            type="number"
            value={profitBufferPct}
            onChange={(e) => setProfitBufferPct(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900"
          />
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white space-y-3">
        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold block">
          Calculated Pricing Benchmarks:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">₹{hourlyRate.toLocaleString("en-IN")}/hr</span>
            <span className="block text-[11px] text-slate-300 font-medium">Min. Hourly Rate</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">₹{dayRate.toLocaleString("en-IN")}/day</span>
            <span className="block text-[11px] text-slate-300 font-medium">Standard Day Rate</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-white font-mono">₹{(annualTargetWithBuffer / 12).toFixed(0)}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Monthly Gross Target</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 7. GST Split Calculator */
function GstCalculator() {
  const [amount, setAmount] = useState<number>(50000);
  const [isInclusive, setIsInclusive] = useState<boolean>(true);
  const [gstRate, setGstRate] = useState<number>(18);
  const [isInterstate, setIsInterstate] = useState<boolean>(false);

  let baseAmount = 0;
  let totalGst = 0;
  let finalTotal = 0;

  if (isInclusive) {
    baseAmount = (amount * 100) / (100 + gstRate);
    totalGst = amount - baseAmount;
    finalTotal = amount;
  } else {
    baseAmount = amount;
    totalGst = (amount * gstRate) / 100;
    finalTotal = amount + totalGst;
  }

  const cgst = isInterstate ? 0 : totalGst / 2;
  const sgst = isInterstate ? 0 : totalGst / 2;
  const igst = isInterstate ? totalGst : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Invoice Amount (₹)</label>
          <input
            type="number"
            step="1000"
            value={amount}
            onChange={(e) => setAmount(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Amount Type</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setIsInclusive(true)}
              className={`py-2 text-xs font-bold rounded-xl border ${
                isInclusive ? "bg-amber-500 text-slate-950 border-amber-400" : "bg-slate-50 text-slate-700 border-slate-200"
              }`}
            >
              GST Inclusive
            </button>
            <button
              onClick={() => setIsInclusive(false)}
              className={`py-2 text-xs font-bold rounded-xl border ${
                !isInclusive ? "bg-amber-500 text-slate-950 border-amber-400" : "bg-slate-50 text-slate-700 border-slate-200"
              }`}
            >
              GST Exclusive
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">GST Rate Slab</label>
          <div className="grid grid-cols-4 gap-1.5">
            {[5, 12, 18, 28].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setGstRate(r)}
                className={`py-2 rounded-xl border text-xs font-bold ${
                  gstRate === r
                    ? "bg-amber-500 text-slate-950 border-amber-400"
                    : "bg-slate-50 text-slate-700 border-slate-200"
                }`}
              >
                {r}%
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Tax Classification</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setIsInterstate(false)}
              className={`py-2 text-xs font-bold rounded-xl border ${
                !isInterstate ? "bg-slate-900 text-white border-slate-800" : "bg-slate-50 text-slate-700 border-slate-200"
              }`}
            >
              Intra (CGST+SGST)
            </button>
            <button
              onClick={() => setIsInterstate(true)}
              className={`py-2 text-xs font-bold rounded-xl border ${
                isInterstate ? "bg-slate-900 text-white border-slate-800" : "bg-slate-50 text-slate-700 border-slate-200"
              }`}
            >
              Interstate (IGST)
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white space-y-3">
        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold block">
          Tax Invoice Breakdown:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-white font-mono">₹{baseAmount.toFixed(2)}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Net Base Price</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">₹{totalGst.toFixed(2)}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Total GST ({gstRate}%)</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-sm sm:text-base font-bold text-slate-300 font-mono">
              {isInterstate ? `IGST: ₹${igst.toFixed(2)}` : `CGST: ₹${cgst.toFixed(2)} | SGST: ₹${sgst.toFixed(2)}`}
            </span>
            <span className="block text-[11px] text-slate-300 font-medium">Split Portions</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">₹{finalTotal.toFixed(2)}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Final Invoice Total</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 8. Excavation Calculator */
function ExcavationCalculator() {
  const [length, setLength] = useState<number>(20);
  const [width, setWidth] = useState<number>(10);
  const [depth, setDepth] = useState<number>(5);
  const [numberOfPits, setNumberOfPits] = useState<number>(4);

  const bankVolumeCuFt = length * width * depth * numberOfPits;
  const looseVolumeCuFt = bankVolumeCuFt * 1.2; // 20% soil swell factor
  const brassUnits = (looseVolumeCuFt / 100).toFixed(1); // 1 Brass = 100 cu ft
  const tipperTrips = Math.ceil(looseVolumeCuFt / 200); // 200 cu.ft tipper truck

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Pit Length (Ft)</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Pit Width (Ft)</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Depth (Ft)</label>
          <input
            type="number"
            value={depth}
            onChange={(e) => setDepth(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Total Pits</label>
          <input
            type="number"
            value={numberOfPits}
            onChange={(e) => setNumberOfPits(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900"
          />
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white space-y-3">
        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold block">
          Earthwork & Disposal Takeoff:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">{bankVolumeCuFt}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Bank Vol (cu ft)</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">{looseVolumeCuFt.toFixed(0)}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Loose Swell (cu ft)</span>
            <span className="text-[10px] text-slate-400 font-mono">+20% Bulking</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-white font-mono">{brassUnits}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Brass Units</span>
            <span className="text-[10px] text-slate-400 font-mono">100 cu ft / Brass</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-white font-mono">{tipperTrips}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Tipper Trips</span>
            <span className="text-[10px] text-slate-400 font-mono">~200 cu ft / truck</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 9. Plastering Calculator */
function PlasterCalculator() {
  const [area, setArea] = useState<number>(1000);
  const [thicknessMm, setThicknessMm] = useState<12 | 18>(12);
  const [ratio, setRatio] = useState<"1:4" | "1:6">("1:4");

  // Thickness in meters
  const thicknessM = thicknessMm / 1000;
  const areaM2 = area * 0.092903;
  const wetVolM3 = areaM2 * thicknessM;
  const dryVolM3 = wetVolM3 * 1.33; // 33% dry volume factor for plaster

  const ratioSum = ratio === "1:4" ? 5 : 7;
  const cementM3 = (dryVolM3 * 1) / ratioSum;
  const cementBags = Math.ceil(cementM3 / 0.0347);
  const sandCuFt = Math.ceil((dryVolM3 * (ratio === "1:4" ? 4 : 6)) / ratioSum * 35.3147);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Surface Area (sq ft)</label>
          <input
            type="number"
            step="100"
            value={area}
            onChange={(e) => setArea(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Plaster Thickness</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setThicknessMm(12)}
              className={`py-2 text-xs font-bold rounded-xl border ${
                thicknessMm === 12 ? "bg-amber-500 text-slate-950 border-amber-400" : "bg-slate-50 text-slate-700 border-slate-200"
              }`}
            >
              12mm (Internal)
            </button>
            <button
              onClick={() => setThicknessMm(18)}
              className={`py-2 text-xs font-bold rounded-xl border ${
                thicknessMm === 18 ? "bg-amber-500 text-slate-950 border-amber-400" : "bg-slate-50 text-slate-700 border-slate-200"
              }`}
            >
              18mm (External)
            </button>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Mortar Ratio</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setRatio("1:4")}
              className={`py-2 text-xs font-bold rounded-xl border ${
                ratio === "1:4" ? "bg-amber-500 text-slate-950 border-amber-400" : "bg-slate-50 text-slate-700 border-slate-200"
              }`}
            >
              1:4 Rich
            </button>
            <button
              onClick={() => setRatio("1:6")}
              className={`py-2 text-xs font-bold rounded-xl border ${
                ratio === "1:6" ? "bg-amber-500 text-slate-950 border-amber-400" : "bg-slate-50 text-slate-700 border-slate-200"
              }`}
            >
              1:6 General
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white space-y-3">
        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold block">
          Calculated Plaster Material Takeoff:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">{cementBags}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Cement (Bags)</span>
            <span className="text-[10px] text-slate-400 font-mono">50 kg / bag</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">{sandCuFt}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Fine Sand (cu ft)</span>
            <span className="text-[10px] text-slate-400 font-mono">Sieved Plaster Sand</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-white font-mono">{(dryVolM3 * 35.3147).toFixed(1)}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Dry Mortar (cu ft)</span>
            <span className="text-[10px] text-slate-400 font-mono">Factor 1.33</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 10. BOQ Starter Template Viewer */
function BoqTemplateViewer() {
  const [copied, setCopied] = useState(false);

  const sampleBoqCsv = `Item No,Trade Description,Unit,Quantity,Labor Rate,Material Rate,Total Amount
1.01,Site clearing and leveling,sq ft,1500,8,0,12000
2.01,Earthwork excavation for column footings,cu ft,1200,12,0,14400
3.01,P.C.C. 1:4:8 under foundations (4" thick),cu ft,400,25,95,48000
4.01,R.C.C. M20 for footings columns and plinth beam,cu ft,650,45,185,149500
5.01,Fe550 TMT Rebar steel cutting bending and placing,kg,3200,8,68,243200
6.01,9" Brickwork in cement mortar 1:6,cu ft,1450,35,110,210250
7.01,Internal wall plastering 12mm 1:4,sq ft,3800,18,12,114000
8.01,Vitrified floor tiles 600x600mm including bed,sq ft,1050,32,75,112350`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleBoqCsv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-600">
          Standard Indian civil estimate item-rate structure with trade descriptions, standard measurement units, and labor/material columns.
        </p>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 cursor-pointer shadow-2xs"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied CSV" : "Copy Template"}</span>
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 overflow-x-auto text-[11px] font-mono bg-slate-50">
        <table className="w-full text-left">
          <thead className="bg-slate-200/80 text-slate-800 font-bold">
            <tr>
              <th className="p-2 border-r border-slate-300">Item</th>
              <th className="p-2 border-r border-slate-300">Trade Description</th>
              <th className="p-2 border-r border-slate-300">Unit</th>
              <th className="p-2 border-r border-slate-300 text-right">Qty</th>
              <th className="p-2 text-right">Estimated Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700">
            <tr><td className="p-2 border-r border-slate-200">1.01</td><td className="p-2 border-r border-slate-200 font-sans">Site clearing & leveling</td><td className="p-2 border-r border-slate-200">sq ft</td><td className="p-2 border-r border-slate-200 text-right">1,500</td><td className="p-2 text-right">₹12,000</td></tr>
            <tr><td className="p-2 border-r border-slate-200">2.01</td><td className="p-2 border-r border-slate-200 font-sans">Earthwork pit excavation</td><td className="p-2 border-r border-slate-200">cu ft</td><td className="p-2 border-r border-slate-200 text-right">1,200</td><td className="p-2 text-right">₹14,400</td></tr>
            <tr><td className="p-2 border-r border-slate-200">3.01</td><td className="p-2 border-r border-slate-200 font-sans">PCC 1:4:8 under footing</td><td className="p-2 border-r border-slate-200">cu ft</td><td className="p-2 border-r border-slate-200 text-right">400</td><td className="p-2 text-right">₹48,000</td></tr>
            <tr><td className="p-2 border-r border-slate-200">4.01</td><td className="p-2 border-r border-slate-200 font-sans">RCC M20 for footings & plinth</td><td className="p-2 border-r border-slate-200">cu ft</td><td className="p-2 border-r border-slate-200 text-right">650</td><td className="p-2 text-right">₹1,49,500</td></tr>
            <tr><td className="p-2 border-r border-slate-200">5.01</td><td className="p-2 border-r border-slate-200 font-sans">Fe550 TMT Rebar Steel BBS</td><td className="p-2 border-r border-slate-200">kg</td><td className="p-2 border-r border-slate-200 text-right">3,200</td><td className="p-2 text-right">₹2,43,200</td></tr>
          </tbody>
        </table>
      </div>

      <p className="text-[11px] text-slate-500 italic">
        Looking for the comprehensive 31-tab formula-linked workbook? Check our full{" "}
        <a href="/p/construction-calculator-pro" className="text-amber-700 underline font-semibold">
          Construction Calculator Pro
        </a>.
      </p>
    </div>
  );
}

/* 11. Solar Estimator (Experimental) */
function SolarEstimator() {
  const [monthlyBill, setMonthlyBill] = useState<number>(4500); // INR
  const [roofAreaSqFt, setRoofAreaSqFt] = useState<number>(500);

  // Avg cost per kWh in India ~ ₹7.50
  const monthlyKwh = monthlyBill / 7.5;
  // 1 kWp produces ~120 kWh per month in India
  const recommendedKw = (monthlyKwh / 120);
  // 1 kWp needs ~100 sq ft shadow-free area
  const roofNeededSqFt = recommendedKw * 100;
  const isRoofSufficient = roofAreaSqFt >= roofNeededSqFt;

  return (
    <div className="space-y-6">
      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
        <span><strong>Experimental Status:</strong> Calculations provide approximate capacity sizing based on Indian solar insolation averages (4.5 Peak Sun Hours).</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Avg. Monthly Electricity Bill (₹)</label>
          <input
            type="number"
            step="500"
            value={monthlyBill}
            onChange={(e) => setMonthlyBill(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Available Shadow-Free Roof Area (sq ft)</label>
          <input
            type="number"
            step="50"
            value={roofAreaSqFt}
            onChange={(e) => setRoofAreaSqFt(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900"
          />
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white space-y-3">
        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold block">
          Solar System Capacity Sizing:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">{recommendedKw.toFixed(1)} kW</span>
            <span className="block text-[11px] text-slate-300 font-medium">Rec. Plant Size</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">{monthlyKwh.toFixed(0)}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Monthly Units (kWh)</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-white font-mono">{roofNeededSqFt.toFixed(0)}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Roof Needed (sq ft)</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className={`text-sm sm:text-base font-bold font-mono ${isRoofSufficient ? "text-emerald-400" : "text-amber-400"}`}>
              {isRoofSufficient ? "Roof OK ✓" : "Tight Area ⚠"}
            </span>
            <span className="block text-[11px] text-slate-300 font-medium">Feasibility</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 12. SaaS Runway Calculator (In Development) */
function SaasRunwayCalculator() {
  const [cashBalance, setCashBalance] = useState<number>(1500000); // 15 Lakhs
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(200000);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(350000);

  const netBurn = Math.max(0, monthlyExpenses - monthlyRevenue);
  const runwayMonths = netBurn > 0 ? (cashBalance / netBurn).toFixed(1) : "Profitable (Infinite)";

  return (
    <div className="space-y-6">
      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-900 text-xs flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-blue-600 shrink-0" />
        <span><strong>In Development:</strong> Core runway engine active. Advanced scenario projections and revenue churn simulations coming soon.</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Cash in Bank (₹)</label>
          <input
            type="number"
            step="50000"
            value={cashBalance}
            onChange={(e) => setCashBalance(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Monthly Revenue (₹)</label>
          <input
            type="number"
            step="10000"
            value={monthlyRevenue}
            onChange={(e) => setMonthlyRevenue(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Monthly Expenses (₹)</label>
          <input
            type="number"
            step="10000"
            value={monthlyExpenses}
            onChange={(e) => setMonthlyExpenses(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900"
          />
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white space-y-3">
        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold block">
          Cash Runway Projections:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">₹{netBurn.toLocaleString("en-IN")}/mo</span>
            <span className="block text-[11px] text-slate-300 font-medium">Net Monthly Burn</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">{runwayMonths} {typeof runwayMonths === "number" || !isNaN(Number(runwayMonths)) ? "Months" : ""}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Estimated Runway</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-xl sm:text-2xl font-black text-white font-mono">₹{(monthlyRevenue - monthlyExpenses).toLocaleString("en-IN")}</span>
            <span className="block text-[11px] text-slate-300 font-medium">Net Monthly Operating Flow</span>
          </div>
        </div>
      </div>
    </div>
  );
}
