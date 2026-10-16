"use client";

import React, { useState } from "react";
import {
  Calculator,
  Scale,
  Layers,
  Percent,
  ArrowRightLeft,
  DollarSign,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export default function PopularTools() {
  const [activeToolId, setActiveToolId] = useState<string | null>("concrete");

  // Tool 1: Concrete Volume & Cement Bags State
  const [concreteLength, setConcreteLength] = useState<number>(10);
  const [concreteWidth, setConcreteWidth] = useState<number>(10);
  const [concreteDepth, setConcreteDepth] = useState<number>(5); // inches
  const [concreteGrade, setConcreteGrade] = useState<string>("M20");

  // Concrete calculation:
  const concreteCuFt = (concreteLength * concreteWidth * (concreteDepth / 12));
  const concreteCuM = concreteCuFt * 0.0283168;
  // Dry volume factor 1.54
  const dryVolCuM = concreteCuM * 1.54;
  // Mix ratio: M15 (1:2:4, total 7), M20 (1:1.5:3, total 5.5), M25 (1:1:2, total 4)
  const ratioTotal = concreteGrade === "M15" ? 7 : concreteGrade === "M20" ? 5.5 : 4;
  const cementCuM = dryVolCuM * (1 / ratioTotal);
  // 1 m3 cement = 1440 kg = 28.8 bags (50kg)
  const cementBags = Math.ceil(cementCuM * 28.8);

  // Tool 2: Rebar Steel Weight State
  const [rebarDia, setRebarDia] = useState<number>(12); // mm
  const [rebarLength, setRebarLength] = useState<number>(12); // metres
  const [rebarBars, setRebarBars] = useState<number>(10);
  // IS 1786 formula: D^2 / 162 kg/m
  const unitWeightPerMetre = (rebarDia * rebarDia) / 162;
  const totalSteelWeightKg = (unitWeightPerMetre * rebarLength * rebarBars).toFixed(2);

  // Tool 3: Brickwork Estimator State
  const [wallLength, setWallLength] = useState<number>(10); // ft
  const [wallHeight, setWallHeight] = useState<number>(10); // ft
  const [wallType, setWallType] = useState<string>("9inch"); // 9inch or 4.5inch
  const wallAreaSqFt = wallLength * wallHeight;
  // Standard Indian modular bricks: ~500 bricks per 100 sq ft for 4.5", ~1000 for 9"
  const bricksCount = Math.round(wallAreaSqFt * (wallType === "9inch" ? 9.5 : 4.8));
  const brickCementBags = Math.ceil(wallAreaSqFt * (wallType === "9inch" ? 0.12 : 0.06));

  // Tool 4: GST Calculator State
  const [gstAmount, setGstAmount] = useState<number>(10000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [gstType, setGstType] = useState<string>("add"); // add or extract
  const gstCalculated = gstType === "add"
    ? {
        net: gstAmount,
        tax: Math.round(gstAmount * (gstRate / 100)),
        total: Math.round(gstAmount * (1 + gstRate / 100))
      }
    : {
        net: Math.round(gstAmount / (1 + gstRate / 100)),
        tax: Math.round(gstAmount - (gstAmount / (1 + gstRate / 100))),
        total: gstAmount
      };

  // Tool 5: Unit Converter State
  const [convValue, setConvValue] = useState<number>(100);
  const [convType, setConvType] = useState<string>("sqft-sqm");
  const getConvertedResult = () => {
    switch (convType) {
      case "sqft-sqm":
        return `${(convValue * 0.092903).toFixed(2)} Square Metres`;
      case "sqm-sqft":
        return `${(convValue * 10.7639).toFixed(2)} Square Feet`;
      case "brass-cuft":
        return `${(convValue * 100).toFixed(1)} Cubic Feet (100 cu.ft/brass)`;
      case "cuft-brass":
        return `${(convValue / 100).toFixed(2)} Brass`;
      case "m-ft":
        return `${(convValue * 3.28084).toFixed(2)} Feet`;
      case "ft-m":
        return `${(convValue * 0.3048).toFixed(2)} Metres`;
      default:
        return "";
    }
  };

  // Tool 6: Project Margin State
  const [costAmount, setCostAmount] = useState<number>(50000);
  const [marginPct, setMarginPct] = useState<number>(20);
  const [bufferPct, setBufferPct] = useState<number>(5);
  const totalBuffer = Math.round(costAmount * (bufferPct / 100));
  const basePlusBuffer = costAmount + totalBuffer;
  const recommendedQuote = Math.round(basePlusBuffer / (1 - marginPct / 100));
  const expectedProfit = recommendedQuote - costAmount - totalBuffer;

  const toolsList = [
    {
      id: "concrete",
      name: "Concrete Volume & Cement Bags",
      category: "Construction & Civil",
      icon: <Calculator className="w-5 h-5 text-[#172033]" />,
      problem: "Calculates slab or footing concrete volume in cubic feet & cubic metres, plus required 50kg cement bags based on IS 456 mix ratios.",
    },
    {
      id: "rebar",
      name: "IS 1786 Rebar Steel Weight",
      category: "Civil Engineering",
      icon: <Scale className="w-5 h-5 text-[#172033]" />,
      problem: "Instant reinforcement weight calculation for 8mm–32mm TMT steel bars using the standard engineering formula W = D² / 162 kg/m.",
    },
    {
      id: "brickwork",
      name: "Brickwork & Mortar Estimator",
      category: "Masonry",
      icon: <Layers className="w-5 h-5 text-[#172033]" />,
      problem: "Estimates the number of red clay bricks or AAC blocks and cement mortar bags needed for any 4.5\" partition or 9\" main wall.",
    },
    {
      id: "gst",
      name: "GST & Tax Invoice Splitter",
      category: "Business & Finance",
      icon: <Percent className="w-5 h-5 text-[#172033]" />,
      problem: "Instantly add or extract 5%, 12%, 18%, or 28% GST to calculate base pricing, CGST, SGST, and final invoice amounts.",
    },
    {
      id: "units",
      name: "Construction Unit Converter",
      category: "Measurement",
      icon: <ArrowRightLeft className="w-5 h-5 text-[#172033]" />,
      problem: "Seamlessly converts Indian site measurement units: Square Feet ↔ Square Metres, Brass ↔ Cu.ft, and Metres ↔ Feet.",
    },
    {
      id: "margin",
      name: "Project Margin & Client Quote",
      category: "Budgeting",
      icon: <DollarSign className="w-5 h-5 text-[#172033]" />,
      problem: "Helps contractors and professionals calculate a safe client quotation factoring direct costs, contingency buffer, and desired margin.",
    }
  ];

  return (
    <div className="space-y-8">
      {/* 6-Card Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {toolsList.map((tool) => {
          const isActive = activeToolId === tool.id;
          return (
            <div
              key={tool.id}
              className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                isActive
                  ? "bg-white border-[#172033] shadow-md ring-1 ring-[#172033]"
                  : "bg-white border-[#E2E8F0] hover:border-slate-300 shadow-xs"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F7FA] border border-[#E2E8F0] flex items-center justify-center">
                    {tool.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-[#64748B] bg-[#F5F7FA] px-2.5 py-0.5 rounded-full border border-[#E2E8F0]">
                    {tool.category}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading text-base font-bold text-[#172033]">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">
                    {tool.problem}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveToolId(isActive ? null : tool.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#172033] text-white"
                      : "bg-[#B9F36B] hover:bg-[#a8eb56] text-[#172033]"
                  }`}
                >
                  <span>{isActive ? "Hide Calculator" : "Use Tool Free"}</span>
                  {isActive ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                <span className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Free Online
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Live Calculation Box (Expands when any tool is selected) */}
      {activeToolId && (
        <div className="rounded-2xl bg-white border border-[#172033]/20 shadow-md p-6 sm:p-8 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4 mb-6">
            <div>
              <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                Interactive Online Calculator
              </span>
              <h4 className="font-heading text-lg sm:text-xl font-bold text-[#172033] mt-0.5">
                {toolsList.find((t) => t.id === activeToolId)?.name}
              </h4>
            </div>
            <button
              onClick={() => setActiveToolId(null)}
              className="text-xs font-semibold text-[#64748B] hover:text-[#172033] px-3 py-1.5 rounded-lg border border-[#E2E8F0] hover:bg-slate-50 cursor-pointer"
            >
              Close Tool
            </button>
          </div>

          {/* Tool 1: Concrete */}
          {activeToolId === "concrete" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">Length (Feet)</label>
                  <input
                    type="number"
                    value={concreteLength}
                    onChange={(e) => setConcreteLength(Number(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F5F7FA] text-sm text-[#172033] tabular-nums focus:outline-none focus:border-[#172033]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">Width (Feet)</label>
                  <input
                    type="number"
                    value={concreteWidth}
                    onChange={(e) => setConcreteWidth(Number(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F5F7FA] text-sm text-[#172033] tabular-nums focus:outline-none focus:border-[#172033]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">Thickness / Depth (Inches)</label>
                  <input
                    type="number"
                    value={concreteDepth}
                    onChange={(e) => setConcreteDepth(Number(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F5F7FA] text-sm text-[#172033] tabular-nums focus:outline-none focus:border-[#172033]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">Concrete Mix Grade</label>
                  <select
                    value={concreteGrade}
                    onChange={(e) => setConcreteGrade(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F5F7FA] text-sm text-[#172033] font-semibold focus:outline-none focus:border-[#172033]"
                  >
                    <option value="M15">M15 (1:2:4 - Foundation / PCC)</option>
                    <option value="M20">M20 (1:1.5:3 - Standard Slab / RCC)</option>
                    <option value="M25">M25 (1:1:2 - Heavy Columns / Beams)</option>
                  </select>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#F5F7FA] border border-[#E2E8F0] rounded-2xl p-6 space-y-3">
                <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                  Calculation Results
                </span>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center py-1 border-b border-[#E2E8F0]">
                    <span className="text-[#475569]">Wet Concrete Volume:</span>
                    <span className="tabular-nums font-bold text-[#172033]">
                      {concreteCuFt.toFixed(1)} cu.ft ({concreteCuM.toFixed(2)} m³)
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-[#E2E8F0]">
                    <span className="text-[#475569]">Dry Volume (×1.54):</span>
                    <span className="tabular-nums font-bold text-[#172033]">{dryVolCuM.toFixed(2)} m³</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 text-base">
                    <span className="font-bold text-[#172033]">Cement Bags (50kg):</span>
                    <span className="tabular-nums font-black text-[#172033] text-lg bg-[#B9F36B]/40 px-2.5 py-0.5 rounded-lg border border-[#B9F36B]">
                      {cementBags} Bags
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tool 2: Rebar Steel */}
          {activeToolId === "rebar" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">Bar Diameter</label>
                  <select
                    value={rebarDia}
                    onChange={(e) => setRebarDia(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F5F7FA] text-sm text-[#172033] font-semibold focus:outline-none focus:border-[#172033]"
                  >
                    {[8, 10, 12, 16, 20, 25, 32].map((dia) => (
                      <option key={dia} value={dia}>{dia} mm</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">Length Per Bar (Metres)</label>
                  <input
                    type="number"
                    value={rebarLength}
                    onChange={(e) => setRebarLength(Number(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F5F7FA] text-sm text-[#172033] tabular-nums focus:outline-none focus:border-[#172033]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">Number of Bars</label>
                  <input
                    type="number"
                    value={rebarBars}
                    onChange={(e) => setRebarBars(Number(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F5F7FA] text-sm text-[#172033] tabular-nums focus:outline-none focus:border-[#172033]"
                  />
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#F5F7FA] border border-[#E2E8F0] rounded-2xl p-6 space-y-3">
                <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                  IS 1786 Constant: W = D² / 162
                </span>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center py-1 border-b border-[#E2E8F0]">
                    <span className="text-[#475569]">Unit Weight:</span>
                    <span className="tabular-nums font-bold text-[#172033]">{unitWeightPerMetre.toFixed(3)} kg/m</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-[#E2E8F0]">
                    <span className="text-[#475569]">Total Metres:</span>
                    <span className="tabular-nums font-bold text-[#172033]">{rebarLength * rebarBars} Metres</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 text-base">
                    <span className="font-bold text-[#172033]">Total Rebar Weight:</span>
                    <span className="tabular-nums font-black text-[#172033] text-lg bg-[#B9F36B]/40 px-2.5 py-0.5 rounded-lg border border-[#B9F36B]">
                      {totalSteelWeightKg} kg ({(Number(totalSteelWeightKg) / 1000).toFixed(3)} Tonnes)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tool 3: Brickwork */}
          {activeToolId === "brickwork" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">Wall Length (Feet)</label>
                  <input
                    type="number"
                    value={wallLength}
                    onChange={(e) => setWallLength(Number(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F5F7FA] text-sm text-[#172033] tabular-nums focus:outline-none focus:border-[#172033]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">Wall Height (Feet)</label>
                  <input
                    type="number"
                    value={wallHeight}
                    onChange={(e) => setWallHeight(Number(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F5F7FA] text-sm text-[#172033] tabular-nums focus:outline-none focus:border-[#172033]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">Wall Thickness</label>
                  <select
                    value={wallType}
                    onChange={(e) => setWallType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F5F7FA] text-sm text-[#172033] font-semibold focus:outline-none focus:border-[#172033]"
                  >
                    <option value="9inch">9-Inch (Main Load-Bearing Wall)</option>
                    <option value="4.5inch">4.5-Inch (Partition Wall)</option>
                  </select>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#F5F7FA] border border-[#E2E8F0] rounded-2xl p-6 space-y-3">
                <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                  Material Takeoff
                </span>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center py-1 border-b border-[#E2E8F0]">
                    <span className="text-[#475569]">Total Wall Surface Area:</span>
                    <span className="tabular-nums font-bold text-[#172033]">{wallAreaSqFt} sq.ft</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-[#E2E8F0]">
                    <span className="text-[#475569]">Estimated Bricks:</span>
                    <span className="tabular-nums font-bold text-[#172033]">{bricksCount} Bricks</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 text-base">
                    <span className="font-bold text-[#172033]">Mortar Cement:</span>
                    <span className="tabular-nums font-black text-[#172033] text-lg bg-[#B9F36B]/40 px-2.5 py-0.5 rounded-lg border border-[#B9F36B]">
                      {brickCementBags} Bags
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tool 4: GST */}
          {activeToolId === "gst" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    value={gstAmount}
                    onChange={(e) => setGstAmount(Number(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F5F7FA] text-sm text-[#172033] tabular-nums focus:outline-none focus:border-[#172033]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">GST Rate (%)</label>
                  <select
                    value={gstRate}
                    onChange={(e) => setGstRate(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F5F7FA] text-sm text-[#172033] font-semibold focus:outline-none focus:border-[#172033]"
                  >
                    {[5, 12, 18, 28].map((rate) => (
                      <option key={rate} value={rate}>{rate}%</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">Calculation Mode</label>
                  <select
                    value={gstType}
                    onChange={(e) => setGstType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F5F7FA] text-sm text-[#172033] font-semibold focus:outline-none focus:border-[#172033]"
                  >
                    <option value="add">Add GST to Amount</option>
                    <option value="extract">Extract GST (Already Inclusive)</option>
                  </select>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#F5F7FA] border border-[#E2E8F0] rounded-2xl p-6 space-y-3">
                <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                  Tax Breakdown
                </span>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center py-1 border-b border-[#E2E8F0]">
                    <span className="text-[#475569]">Base Net Amount:</span>
                    <span className="tabular-nums font-bold text-[#172033]">₹{gstCalculated.net.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-[#E2E8F0]">
                    <span className="text-[#475569]">GST ({gstRate}%):</span>
                    <span className="tabular-nums font-bold text-[#172033]">₹{gstCalculated.tax.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 text-base">
                    <span className="font-bold text-[#172033]">Total Invoice Value:</span>
                    <span className="tabular-nums font-black text-[#172033] text-lg bg-[#B9F36B]/40 px-2.5 py-0.5 rounded-lg border border-[#B9F36B]">
                      ₹{gstCalculated.total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tool 5: Units */}
          {activeToolId === "units" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">Value to Convert</label>
                  <input
                    type="number"
                    value={convValue}
                    onChange={(e) => setConvValue(Number(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F5F7FA] text-sm text-[#172033] tabular-nums focus:outline-none focus:border-[#172033]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">Conversion Type</label>
                  <select
                    value={convType}
                    onChange={(e) => setConvType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F5F7FA] text-sm text-[#172033] font-semibold focus:outline-none focus:border-[#172033]"
                  >
                    <option value="sqft-sqm">Square Feet → Square Metres</option>
                    <option value="sqm-sqft">Square Metres → Square Feet</option>
                    <option value="brass-cuft">Brass → Cubic Feet</option>
                    <option value="cuft-brass">Cubic Feet → Brass</option>
                    <option value="m-ft">Metres → Feet</option>
                    <option value="ft-m">Feet → Metres</option>
                  </select>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#F5F7FA] border border-[#E2E8F0] rounded-2xl p-6 space-y-3">
                <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                  Converted Result
                </span>
                <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] text-center">
                  <div className="text-xl sm:text-2xl font-black text-[#172033] tabular-nums">
                    {getConvertedResult()}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tool 6: Margin */}
          {activeToolId === "margin" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">Estimated Direct Cost (₹)</label>
                  <input
                    type="number"
                    value={costAmount}
                    onChange={(e) => setCostAmount(Number(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F5F7FA] text-sm text-[#172033] tabular-nums focus:outline-none focus:border-[#172033]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">Target Profit Margin (%)</label>
                  <input
                    type="number"
                    value={marginPct}
                    onChange={(e) => setMarginPct(Number(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F5F7FA] text-sm text-[#172033] tabular-nums focus:outline-none focus:border-[#172033]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">Risk Buffer (%)</label>
                  <input
                    type="number"
                    value={bufferPct}
                    onChange={(e) => setBufferPct(Number(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F5F7FA] text-sm text-[#172033] tabular-nums focus:outline-none focus:border-[#172033]"
                  />
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#F5F7FA] border border-[#E2E8F0] rounded-2xl p-6 space-y-3">
                <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                  Quote Recommendations
                </span>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center py-1 border-b border-[#E2E8F0]">
                    <span className="text-[#475569]">Buffer ({bufferPct}%):</span>
                    <span className="tabular-nums font-bold text-[#172033]">₹{totalBuffer.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-[#E2E8F0]">
                    <span className="text-[#475569]">Expected Net Profit:</span>
                    <span className="tabular-nums font-bold text-emerald-800">₹{expectedProfit.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 text-base">
                    <span className="font-bold text-[#172033]">Recommended Quote:</span>
                    <span className="tabular-nums font-black text-[#172033] text-lg bg-[#B9F36B]/40 px-2.5 py-0.5 rounded-lg border border-[#B9F36B]">
                      ₹{recommendedQuote.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
