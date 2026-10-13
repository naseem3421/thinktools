"use client";

import React, { useState } from "react";
import {
  FileSpreadsheet,
  Layers,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  Table,
  Zap,
  TrendingUp,
  Download,
  AlertTriangle
} from "lucide-react";

interface SpreadsheetHeroMockupProps {
  onUnlockClick: () => void;
}

export default function SpreadsheetHeroMockup({ onUnlockClick }: SpreadsheetHeroMockupProps) {
  const [activeTab, setActiveTab] = useState<"rcc" | "steel" | "bill_check" | "rates" | "boq">("rcc");

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden transition-all duration-300 hover:border-amber-400 hover:shadow-2xl">
      {/* OS Window Top Bar (Light Chrome) */}
      <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
          </div>
          <span className="text-slate-700 text-[11px] font-mono ml-2 flex items-center gap-1.5 font-medium">
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            Construction_Calculator_Pro_INDIA_v2.xlsx [31 Tabs]
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
          <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">
            Dual Units: Feet / Metres
          </span>
        </div>
      </div>

      {/* Excel Ribbon Tabs */}
      <div className="bg-slate-50/90 border-b border-slate-200 px-3 pt-2 flex items-center gap-1 overflow-x-auto text-xs font-medium scrollbar-none">
        {[
          { id: "rcc", label: "08. Concrete RCC", code: "Mix & Bags" },
          { id: "steel", label: "11. Steel Rebar", code: "D²/162 Weight" },
          { id: "bill_check", label: "25. Bill Check", code: "Contractor Audit" },
          { id: "rates", label: "20. Master Rates", code: "City Rates" },
          { id: "boq", label: "30. BOQ Quotation", code: "Client Proposal" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-t-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === tab.id
                ? "bg-white text-amber-700 border-t-2 border-amber-500 border-x border-slate-200 shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Formula Bar */}
      <div className="bg-slate-50 px-3 py-1.5 border-b border-slate-200 flex items-center gap-2 text-xs font-mono">
        <span className="text-slate-800 font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[10px] shadow-2xs">
          {activeTab === "rcc" ? "E14" : activeTab === "steel" ? "F09" : activeTab === "bill_check" ? "G12" : activeTab === "rates" ? "C04" : "G22"}
        </span>
        <span className="text-slate-400 font-serif italic text-xs">fx</span>
        <span className="text-slate-700 text-[11px] truncate flex-1 font-medium">
          {activeTab === "rcc" && "=ROUNDUP((B14*C14*D14)*1.54/0.0347, 0) & ' Bags'"}
          {activeTab === "steel" && "=(B09*B09/162)*C09*D09 / 1000 & ' Tonnes'"}
          {activeTab === "bill_check" && "=IF(ABS(Claimed-Calculated)/Calculated > Tolerance, 'FLAG OVERCLAIM', 'OK')"}
          {activeTab === "rates" && "=VLOOKUP(B04, Market_Rates_Table, 3, FALSE)"}
          {activeTab === "boq" && "=SUM(Item_Cost_Range) * (1 + Contingency_Rate)"}
        </span>
      </div>

      {/* Spreadsheet Grid Body */}
      <div className="bg-white p-3 sm:p-4 text-xs font-mono select-none overflow-x-auto">
        {/* TAB 1: RCC Concrete */}
        {activeTab === "rcc" && (
          <div className="space-y-2 animate-in fade-in duration-150">
            <div className="flex items-center justify-between text-[11px] text-slate-500 pb-1 border-b border-slate-200 font-sans">
              <span className="font-bold text-slate-900">Sheet 08: Concrete & Nominal Mix Breakdown (M20 Grade)</span>
              <span className="text-emerald-700 font-medium">🟡 Yellow = Input | 🟢 Green = Auto</span>
            </div>
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="text-slate-500 bg-slate-50/80 border-b border-slate-200">
                  <th className="p-1.5">Structural Member</th>
                  <th className="p-1.5">Length (ft)</th>
                  <th className="p-1.5">Width (ft)</th>
                  <th className="p-1.5">Depth (ft)</th>
                  <th className="p-1.5 text-right">Cement (Bags)</th>
                  <th className="p-1.5 text-right">Steel (Kg)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-1.5 text-slate-900 font-medium">Plinth Beams (G.F)</td>
                  <td className="p-1.5"><span className="bg-amber-100 text-amber-900 border border-amber-300 font-semibold px-1.5 py-0.5 rounded">120.0</span></td>
                  <td className="p-1.5"><span className="bg-amber-100 text-amber-900 border border-amber-300 font-semibold px-1.5 py-0.5 rounded">0.75</span></td>
                  <td className="p-1.5"><span className="bg-amber-100 text-amber-900 border border-amber-300 font-semibold px-1.5 py-0.5 rounded">1.25</span></td>
                  <td className="p-1.5 text-right"><span className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-1.5 py-0.5 rounded font-bold">92 Bags</span></td>
                  <td className="p-1.5 text-right"><span className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-1.5 py-0.5 rounded font-bold">780 Kg</span></td>
                </tr>
                <tr>
                  <td className="p-1.5 text-slate-900 font-medium">Columns (12 Nos)</td>
                  <td className="p-1.5"><span className="bg-amber-100 text-amber-900 border border-amber-300 font-semibold px-1.5 py-0.5 rounded">0.75</span></td>
                  <td className="p-1.5"><span className="bg-amber-100 text-amber-900 border border-amber-300 font-semibold px-1.5 py-0.5 rounded">1.00</span></td>
                  <td className="p-1.5"><span className="bg-amber-100 text-amber-900 border border-amber-300 font-semibold px-1.5 py-0.5 rounded">10.50</span></td>
                  <td className="p-1.5 text-right"><span className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-1.5 py-0.5 rounded font-bold">81 Bags</span></td>
                  <td className="p-1.5 text-right"><span className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-1.5 py-0.5 rounded font-bold">960 Kg</span></td>
                </tr>
                <tr>
                  <td className="p-1.5 text-slate-900 font-medium">Roof Slab (5&quot; Thk)</td>
                  <td className="p-1.5"><span className="bg-amber-100 text-amber-900 border border-amber-300 font-semibold px-1.5 py-0.5 rounded">45.0</span></td>
                  <td className="p-1.5"><span className="bg-amber-100 text-amber-900 border border-amber-300 font-semibold px-1.5 py-0.5 rounded">30.0</span></td>
                  <td className="p-1.5"><span className="bg-amber-100 text-amber-900 border border-amber-300 font-semibold px-1.5 py-0.5 rounded">0.42</span></td>
                  <td className="p-1.5 text-right"><span className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-1.5 py-0.5 rounded font-bold">452 Bags</span></td>
                  <td className="p-1.5 text-right"><span className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-1.5 py-0.5 rounded font-bold">4,250 Kg</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: Steel Rebar */}
        {activeTab === "steel" && (
          <div className="space-y-2 animate-in fade-in duration-150">
            <div className="flex items-center justify-between text-[11px] text-slate-500 pb-1 border-b border-slate-200 font-sans">
              <span className="font-bold text-blue-700">Sheet 11: Steel Rebar Theoretical Weight (IS:1786 Standard)</span>
              <span className="text-emerald-700 font-medium">Formula: D² / 162 kg/m</span>
            </div>
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="text-slate-500 bg-slate-50/80 border-b border-slate-200">
                  <th className="p-1.5">Bar Diameter</th>
                  <th className="p-1.5">Unit Weight (kg/m)</th>
                  <th className="p-1.5">Length (m)</th>
                  <th className="p-1.5">Nos of Bars</th>
                  <th className="p-1.5 text-right">Total Weight</th>
                  <th className="p-1.5 text-right">Est. Cost (₹68/kg)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-1.5 text-slate-900 font-bold">8 mm TMT (Stirrups)</td>
                  <td className="p-1.5 text-slate-500">0.395 kg/m</td>
                  <td className="p-1.5"><span className="bg-amber-100 text-amber-900 border border-amber-300 font-semibold px-1.5 py-0.5 rounded">12.0 m</span></td>
                  <td className="p-1.5"><span className="bg-amber-100 text-amber-900 border border-amber-300 font-semibold px-1.5 py-0.5 rounded">180</span></td>
                  <td className="p-1.5 text-right"><span className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-1.5 py-0.5 rounded font-bold">853.2 kg</span></td>
                  <td className="p-1.5 text-right font-bold text-slate-900">₹58,017</td>
                </tr>
                <tr>
                  <td className="p-1.5 text-slate-900 font-bold">12 mm TMT (Main Beams)</td>
                  <td className="p-1.5 text-slate-500">0.888 kg/m</td>
                  <td className="p-1.5"><span className="bg-amber-100 text-amber-900 border border-amber-300 font-semibold px-1.5 py-0.5 rounded">12.0 m</span></td>
                  <td className="p-1.5"><span className="bg-amber-100 text-amber-900 border border-amber-300 font-semibold px-1.5 py-0.5 rounded">140</span></td>
                  <td className="p-1.5 text-right"><span className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-1.5 py-0.5 rounded font-bold">1,491.8 kg</span></td>
                  <td className="p-1.5 text-right font-bold text-slate-900">₹1,01,442</td>
                </tr>
                <tr>
                  <td className="p-1.5 text-slate-900 font-bold">16 mm TMT (Columns)</td>
                  <td className="p-1.5 text-slate-500">1.580 kg/m</td>
                  <td className="p-1.5"><span className="bg-amber-100 text-amber-900 border border-amber-300 font-semibold px-1.5 py-0.5 rounded">12.0 m</span></td>
                  <td className="p-1.5"><span className="bg-amber-100 text-amber-900 border border-amber-300 font-semibold px-1.5 py-0.5 rounded">95</span></td>
                  <td className="p-1.5 text-right"><span className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-1.5 py-0.5 rounded font-bold">1,801.2 kg</span></td>
                  <td className="p-1.5 text-right font-bold text-slate-900">₹1,22,481</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: Bill Check (Contractor Audit) */}
        {activeTab === "bill_check" && (
          <div className="space-y-2 animate-in fade-in duration-150">
            <div className="flex items-center justify-between text-[11px] text-slate-500 pb-1 border-b border-slate-200 font-sans">
              <span className="font-bold text-rose-700 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                Sheet 25: Contractor Bill Audit (Tolerance: 5%)
              </span>
              <span className="text-slate-500 font-medium">Flags overclaims before you pay</span>
            </div>
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="text-slate-500 bg-slate-50/80 border-b border-slate-200">
                  <th className="p-1.5">Billed Item</th>
                  <th className="p-1.5">Contractor Claimed</th>
                  <th className="p-1.5">Our Calculated</th>
                  <th className="p-1.5">Variance</th>
                  <th className="p-1.5 text-right">Audit Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-1.5 text-slate-900 font-medium">Plinth Concrete (Cu.m)</td>
                  <td className="p-1.5"><span className="bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.5 rounded font-bold">38.0 m³</span></td>
                  <td className="p-1.5 text-slate-700">36.8 m³</td>
                  <td className="p-1.5 text-emerald-700 font-semibold">+3.2%</td>
                  <td className="p-1.5 text-right text-emerald-700 font-bold">Within 5% OK</td>
                </tr>
                <tr className="bg-rose-50/70">
                  <td className="p-1.5 text-slate-900 font-bold">TMT Steel 16mm (Stage 2)</td>
                  <td className="p-1.5"><span className="bg-rose-100 text-rose-950 border border-rose-300 px-1.5 py-0.5 rounded font-black">2,050 kg</span></td>
                  <td className="p-1.5 text-slate-700 font-bold">1,801 kg</td>
                  <td className="p-1.5 text-rose-700 font-black">+13.8% OVER</td>
                  <td className="p-1.5 text-right text-rose-700 font-black">⚠️ HOLD: Get Bar Log</td>
                </tr>
                <tr>
                  <td className="p-1.5 text-slate-900 font-medium">Cement Bags (Masonry)</td>
                  <td className="p-1.5"><span className="bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.5 rounded font-bold">185 Bags</span></td>
                  <td className="p-1.5 text-slate-700">180 Bags</td>
                  <td className="p-1.5 text-emerald-700 font-semibold">+2.7%</td>
                  <td className="p-1.5 text-right text-emerald-700 font-bold">Within 5% OK</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: Master Rates */}
        {activeTab === "rates" && (
          <div className="space-y-2 animate-in fade-in duration-150">
            <div className="flex items-center justify-between text-[11px] text-slate-500 pb-1 border-b border-slate-200 font-sans">
              <span className="font-bold text-purple-700">Sheet 20: 16 Editable City Material & Labor Rates</span>
              <span className="text-amber-700 font-medium">Update Once → Recalculates Entire Project</span>
            </div>
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="text-slate-500 bg-slate-50/80 border-b border-slate-200">
                  <th className="p-1.5">Material / Labor Head</th>
                  <th className="p-1.5">Unit of Measurement</th>
                  <th className="p-1.5">Default State Rate</th>
                  <th className="p-1.5">Your Local City Rate (🟡)</th>
                  <th className="p-1.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-1.5 text-slate-900 font-medium">OPC 53 Cement Bag</td>
                  <td className="p-1.5 text-slate-500">Per 50 Kg Bag</td>
                  <td className="p-1.5 text-slate-400">₹390.00</td>
                  <td className="p-1.5"><span className="bg-amber-100 text-amber-900 border border-amber-300 font-bold px-1.5 py-0.5 rounded">₹385.00</span></td>
                  <td className="p-1.5 text-right text-emerald-700 font-sans text-[10px] font-bold">Active</td>
                </tr>
                <tr>
                  <td className="p-1.5 text-slate-900 font-medium">Fe550D TMT Steel Rebar</td>
                  <td className="p-1.5 text-slate-500">Per Kilogram (Kg)</td>
                  <td className="p-1.5 text-slate-400">₹67.50</td>
                  <td className="p-1.5"><span className="bg-amber-100 text-amber-900 border border-amber-300 font-bold px-1.5 py-0.5 rounded">₹66.00</span></td>
                  <td className="p-1.5 text-right text-emerald-700 font-sans text-[10px] font-bold">Active</td>
                </tr>
                <tr>
                  <td className="p-1.5 text-slate-900 font-medium">River Sand / M-Sand</td>
                  <td className="p-1.5 text-slate-500">Per Brass (100 cu.ft)</td>
                  <td className="p-1.5 text-slate-400">₹5,200.00</td>
                  <td className="p-1.5"><span className="bg-amber-100 text-amber-900 border border-amber-300 font-bold px-1.5 py-0.5 rounded">₹4,950.00</span></td>
                  <td className="p-1.5 text-right text-emerald-700 font-sans text-[10px] font-bold">Active</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 5: BOQ Summary */}
        {activeTab === "boq" && (
          <div className="space-y-2 animate-in fade-in duration-150">
            <div className="flex items-center justify-between text-[11px] text-slate-500 pb-1 border-b border-slate-200 font-sans">
              <span className="font-bold text-emerald-700">Sheet 30: Client Bill of Quantities (BOQ) Quotation</span>
              <span className="text-slate-500">Print-Ready Format (A4)</span>
            </div>
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="text-slate-500 bg-slate-50/80 border-b border-slate-200">
                  <th className="p-1.5">Trade / Scope Phase</th>
                  <th className="p-1.5">Est. Qty</th>
                  <th className="p-1.5">Unit Rate</th>
                  <th className="p-1.5 text-right">Total Phase Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-1.5 text-slate-900 font-medium">1.0 Substructure & Excavation</td>
                  <td className="p-1.5 text-slate-500">Lumpsum Stage</td>
                  <td className="p-1.5 text-slate-500">-</td>
                  <td className="p-1.5 text-right text-slate-900 font-bold">₹1,85,400</td>
                </tr>
                <tr>
                  <td className="p-1.5 text-slate-900 font-medium">2.0 Superstructure RCC & Masonry</td>
                  <td className="p-1.5 text-slate-500">1,500 sq.ft</td>
                  <td className="p-1.5 text-slate-500">₹945/sq.ft</td>
                  <td className="p-1.5 text-right text-slate-900 font-bold">₹14,17,500</td>
                </tr>
                <tr>
                  <td className="p-1.5 text-slate-900 font-medium">3.0 Flooring, Tile & Plaster Finishes</td>
                  <td className="p-1.5 text-slate-500">1,500 sq.ft</td>
                  <td className="p-1.5 text-slate-500">₹580/sq.ft</td>
                  <td className="p-1.5 text-right text-slate-900 font-bold">₹8,70,000</td>
                </tr>
                <tr className="bg-emerald-50 text-emerald-900 font-bold">
                  <td className="p-1.5">PRELIMINARY ESTIMATED TOTAL</td>
                  <td className="p-1.5">-</td>
                  <td className="p-1.5">Turnkey Avg</td>
                  <td className="p-1.5 text-right text-sm font-black">₹24,72,900</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Mockup Footer Bar */}
      <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-700 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            31 Connected Workbook Tabs
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="hidden sm:inline text-slate-500">3 Workbooks Included (Blank, 3BHK, Renovation)</span>
        </div>

        <button
          onClick={onUnlockClick}
          className="text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>Unlock Full Package</span>
          <Download className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
