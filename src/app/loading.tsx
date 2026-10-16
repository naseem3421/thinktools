import React from "react";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#021d39] border border-slate-800 flex items-center justify-center shadow-lg animate-pulse">
            <Image
              src="/icon.png"
              alt="ThinkTools Logo"
              width={56}
              height={56}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 rounded-2xl border-2 border-lime-500 border-t-transparent animate-spin" />
        </div>
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest font-mono font-bold text-slate-700">
            Think<span className="text-[#65a30d]">Tools</span><span className="text-slate-400">.in</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">Work Smarter...</p>
        </div>
      </div>
    </div>
  );
}
