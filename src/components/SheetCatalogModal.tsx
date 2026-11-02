"use client";

import React, { useState } from "react";
import { X, Search } from "lucide-react";

export interface WorkbookSheetItem {
  number: number;
  name: string;
  description: string;
  part: string;
  userEnters: string;
  userGets: string;
}

interface SheetCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCheckout: () => void;
  sheets: WorkbookSheetItem[];
  price: number;
}

export default function SheetCatalogModal({
  isOpen,
  onClose,
  onOpenCheckout,
  sheets,
  price,
}: SheetCatalogModalProps) {
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const filteredSheets = sheets.filter(
    (s) =>
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()) ||
      s.part.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Complete 31-Sheet Architecture Index"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full max-h-[88vh] overflow-hidden flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-200 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="text-[10px] sm:text-xs uppercase font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
              All 31 Connected Tabs
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-950 mt-1 truncate">
              Complete 31-Sheet Architecture Index
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sheet catalog"
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 border-b border-slate-100 bg-slate-50">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search any tab (e.g. steel, concrete, bill, tiles)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3.5 space-y-2">
          {filteredSheets.map((sheet) => (
            <div
              key={sheet.number}
              className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-start justify-between gap-2 text-xs"
            >
              <div className="space-y-0.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded text-[10px]">
                    Tab {sheet.number < 10 ? `0${sheet.number}` : sheet.number}
                  </span>
                  <strong className="text-slate-900 text-xs sm:text-sm">{sheet.name}</strong>
                  <span className="text-[10px] text-slate-500 font-mono">({sheet.part})</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs">{sheet.description}</p>
              </div>
              <div className="text-[10px] sm:text-right shrink-0 font-mono text-slate-500">
                <div><span className="text-amber-800 font-bold">Input:</span> {sheet.userEnters}</div>
                <div><span className="text-emerald-700 font-bold">Output:</span> {sheet.userGets}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-2">
          <span className="text-[11px] sm:text-xs text-slate-600 font-mono">31 connected sheets</span>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenCheckout();
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 cursor-pointer whitespace-nowrap"
          >
            Download Package (₹{price})
          </button>
        </div>
      </div>
    </div>
  );
}
