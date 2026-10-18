"use client";

import React, { useState } from "react";
import { X, Printer, ShieldAlert, ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

interface ContractorChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CHECKLIST_SECTIONS = [
  {
    category: "1. Concrete & Structural Integrity",
    items: [
      {
        q: "What concrete mix ratio is quoted for foundations, columns, and slabs?",
        lookFor: "Verify nominal mix (M20: 1:1.5:3) or design mix (M25). Ensure contractor does not use weak lean mix for load-bearing elements.",
        weight: "5 pts",
      },
      {
        q: "Who bears the cost of steel cutting wastage (scrap bar ends)?",
        lookFor: "Standard practice is max 3% to 5% wastage allowance. Reject contracts where contractor bills 10%+ scrap to the owner.",
        weight: "5 pts",
      },
      {
        q: "What is your mandatory water curing schedule for RCC slabs and brickwork?",
        lookFor: "Minimum 7 to 14 days continuous ponding for roof slabs, twice daily for masonry. Must have a designated site curing worker.",
        weight: "5 pts",
      },
      {
        q: "Which primary steel (TMT) and 53-grade cement brands are included?",
        lookFor: "Insist on primary producers (Tata Tiscon, JSW Neosteel, SAIL) and fresh 53-grade OPC/PPC (less than 60 days old from manufacturing).",
        weight: "5 pts",
      },
    ],
  },
  {
    category: "2. Site Supervision & Labour",
    items: [
      {
        q: "Will a qualified civil engineer or senior site supervisor be present daily?",
        lookFor: "Direct supervisor must be on-site during shuttering alignment, rebar binding, and concrete casting—not just visit once a week.",
        weight: "5 pts",
      },
      {
        q: "What is your typical crew size for shuttering and RCC casting days?",
        lookFor: "Need at least 10–14 masons and helpers for continuous monolithic pour to prevent cold joints on roof slabs.",
        weight: "5 pts",
      },
      {
        q: "Who is responsible for worker safety gear and construction insurance?",
        lookFor: "Contractor must provide helmets, harness for heights, and accept liability for site labour injuries in writing.",
        weight: "5 pts",
      },
      {
        q: "Can I inspect 2 active sites where you are currently casting slabs?",
        lookFor: "Never accept photos only. Active site visits reveal shuttering quality, safety practices, and cleanliness.",
        weight: "5 pts",
      },
    ],
  },
  {
    category: "3. Commercials, Measurements & Escalation",
    items: [
      {
        q: "How are built-up and plinth areas measured for billing?",
        lookFor: "Specify whether balconies, staircases, and porch areas are billed at 100%, 50%, or actual built-up area. Avoid ambiguous 'super built-up' multipliers.",
        weight: "5 pts",
      },
      {
        q: "What is the milestone-gated payment schedule?",
        lookFor: "Payments must be tied to verified site stages (e.g. Foundation cast, Plinth, Slab 1, Brickwork, Plaster), NEVER date-based calendar advances.",
        weight: "5 pts",
      },
      {
        q: "What happens if cement, steel, or diesel prices fluctuate during construction?",
        lookFor: "Fixed-rate contract vs price escalation formula with ceiling cap. Never sign open-ended escalation clauses.",
        weight: "5 pts",
      },
      {
        q: "Is there a 5% to 10% retention money clause held until final handover?",
        lookFor: "Retention money ensures contractor returns to fix minor leaks, paint touchups, and door alignment before final settlement.",
        weight: "5 pts",
      },
    ],
  },
  {
    category: "4. Snag Rectification & Defect Liability",
    items: [
      {
        q: "What is your defect liability period for plumbing leaks and roof seepage?",
        lookFor: "Standard industry expectation is 12 months minimum. Water leakage tests should be signed off before plastering.",
        weight: "5 pts",
      },
      {
        q: "Who handles electrical conduit chipping and box fixing before plaster?",
        lookFor: "Clear demarcations between civil mason and electrician avoid wall re-breaking after plaster is finished.",
        weight: "5 pts",
      },
      {
        q: "What is the penalty per week if the project exceeds the agreed handover date?",
        lookFor: "Agreed liquidated damages (e.g., ₹2,000–₹5,000/week delay) keep the project timeline accountable.",
        weight: "5 pts",
      },
    ],
  },
];

export default function ContractorChecklistModal({
  isOpen,
  onClose,
}: ContractorChecklistModalProps) {
  const [scores, setScores] = useState<Record<number, number>>({});

  if (!isOpen) return null;

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  const handleScoreChange = (index: number, val: number) => {
    setScores((prev) => ({ ...prev, [index]: val }));
  };

  const handlePrint = () => {
    window.print();
  };

  let itemCounter = 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto font-sans">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-[#172033] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#B9F36B]/20 border border-[#B9F36B]/40 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-[#B9F36B]" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#B9F36B] font-bold">
                Free Practical Reference Toolkit
              </span>
              <h2 className="text-base sm:text-xl font-bold tracking-tight">
                15-Point Contractor Interview Checklist & Scorecard
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close checklist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action / Print Bar */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <span>Scorecard: <strong>{totalScore}</strong> / 75 max points</span>
            {totalScore > 0 && (
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                totalScore >= 60 ? "bg-emerald-100 text-emerald-800" : totalScore >= 45 ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"
              }`}>
                {totalScore >= 60 ? "Recommended" : totalScore >= 45 ? "Proceed With Caution" : "High Risk Contractor"}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs shadow-2xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print Checklist</span>
            </button>
          </div>
        </div>

        {/* Modal Content / Questions */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 text-xs sm:text-sm">
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              <strong>How to use this checklist:</strong> Ask these 15 questions during your initial contractor interview. Score each response from 0 (unacceptable/vague) to 5 (clear, documented, agreed in writing). Score below 50 indicates high dispute risk.
            </p>
          </div>

          {CHECKLIST_SECTIONS.map((section, sIdx) => (
            <div key={sIdx} className="space-y-3">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider font-mono bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                {section.category}
              </h3>
              <div className="space-y-3">
                {section.items.map((item) => {
                  const currentIdx = itemCounter++;
                  return (
                    <div
                      key={currentIdx}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-3">
                        <div className="flex items-start gap-2">
                          <span className="font-mono font-bold text-amber-700 shrink-0">
                            Q{currentIdx + 1}.
                          </span>
                          <span className="font-semibold text-slate-900 leading-snug">
                            {item.q}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                          <label className="text-[11px] font-mono text-slate-500">Score:</label>
                          <select
                            value={scores[currentIdx] || 0}
                            onChange={(e) => handleScoreChange(currentIdx, Number(e.target.value))}
                            className="text-xs bg-white border border-slate-300 rounded px-2 py-1 font-mono font-bold focus:outline-none focus:border-amber-500"
                          >
                            <option value={0}>0 (Vague)</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3 (Fair)</option>
                            <option value={4}>4</option>
                            <option value={5}>5 (Verified)</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-1 sm:ml-5 text-[11px] sm:text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
                        <strong className="text-emerald-800">What to look for:</strong> {item.lookFor}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Upsell to Full Toolkit */}
          <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono text-[#B9F36B] uppercase font-bold">
                Need Automated Estimation?
              </span>
              <h4 className="text-sm font-bold mt-0.5">
                Construction Calculator Pro (31 Sheets + 13 PDFs)
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                Includes full printable worksheets, master Bill of Quantities, and contractor rate comparison sheets.
              </p>
            </div>
            <Link
              href="/p/construction-calculator-pro"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shrink-0 transition-colors whitespace-nowrap"
            >
              <span>View Full Toolkit (₹499)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">
            ThinkTools Free Civil Reference Series
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
