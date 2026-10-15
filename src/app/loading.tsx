import React from "react";
import { Wrench } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-600 animate-pulse">
            <Wrench className="w-7 h-7" />
          </div>
          <div className="absolute inset-0 rounded-2xl border-2 border-amber-500 border-t-transparent animate-spin" />
        </div>
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest font-mono font-bold text-slate-700">
            Thinktools<span className="text-amber-600">.in</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">Loading digital toolkit...</p>
        </div>
      </div>
    </div>
  );
}
