"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check,
  Plus,
  ArrowRight,
  FileSpreadsheet,
  AlertCircle
} from "lucide-react";
import { ReelVideo, REEL_VIDEOS } from "@/data/products";

interface ReelPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeReelId: string;
  onSelectReel: (reelId: string) => void;
  selectedAddonIds: string[];
  onToggleAddon: (addonId: string) => void;
  onOpenCheckout: () => void;
}

export default function ReelPreviewModal({
  isOpen,
  onClose,
  activeReelId,
  onSelectReel,
  selectedAddonIds,
  onToggleAddon,
  onOpenCheckout
}: ReelPreviewModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [videoError, setVideoError] = useState<boolean>(false);
  const [showCenterIcon, setShowCenterIcon] = useState<boolean>(false);

  const reelList = Object.values(REEL_VIDEOS);
  const currentIndex = reelList.findIndex((r) => r.id === activeReelId);
  const currentReel = reelList[currentIndex] || reelList[0];

  // Handle ESC key and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === " ") {
        e.preventDefault();
        togglePlayPause();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, activeReelId, currentIndex]);

  // Reset video state on reel switch
  useEffect(() => {
    setVideoError(false);
    setProgress(0);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Browser prevented autoplay with audio or file missing
          setIsPlaying(false);
        });
    }
  }, [activeReelId]);

  if (!isOpen || !currentReel) return null;

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + reelList.length) % reelList.length;
    onSelectReel(reelList[prevIndex].id);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % reelList.length;
    onSelectReel(reelList[nextIndex].id);
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setShowCenterIcon(true);
    setTimeout(() => setShowCenterIcon(false), 600);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newMuted = !videoRef.current.muted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    if (duration > 0) {
      setProgress((current / duration) * 100);
    }
  };

  const isAddonInCart = currentReel.addonId
    ? selectedAddonIds.includes(currentReel.addonId)
    : false;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Outside close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close video walkthrough"
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-colors cursor-pointer border border-slate-600/40"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Main Reels Container (9:16 Aspect Ratio) */}
      <div
        className="relative w-full max-w-[390px] h-[85vh] max-h-[760px] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Video Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-30">
          <div
            className="h-full bg-amber-400 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Top Header Controls Overlay */}
        <div className="absolute top-2 left-0 right-0 z-30 px-3.5 pt-2 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/90 text-slate-950 text-[10px] font-black uppercase tracking-wider">
              {currentReel.priceTag}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-black/40 text-slate-300 font-mono text-[9px] font-bold border border-white/10">
              60s
            </span>
            <span className="text-xs font-semibold drop-shadow-md truncate max-w-[150px]">
              {currentReel.title}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleMute}
              className="p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-xs transition-colors cursor-pointer"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-xs transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Area (Tap to play/pause) */}
        <div
          className="relative flex-1 w-full h-full bg-slate-950 flex items-center justify-center cursor-pointer overflow-hidden select-none"
          onClick={togglePlayPause}
        >
          {videoError ? (
            /* Fallback state when MP4 is awaiting file placement */
            <div className="px-6 text-center text-slate-300 space-y-4 max-w-xs">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <FileSpreadsheet className="w-8 h-8" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold font-mono">
                  <Sparkles className="w-3 h-3" /> Reel Ready
                </span>
                <h4 className="text-base font-bold text-white mt-1.5">
                  {currentReel.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {currentReel.subtitle}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300 text-left space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Awaiting video upload:</span>
                </div>
                <p className="font-mono text-[10px] text-slate-400 break-all">
                  Drop MP4 in <span className="text-emerald-400">public{currentReel.src}</span>
                </p>
              </div>
            </div>
          ) : (
            <video
              ref={videoRef}
              src={currentReel.src}
              playsInline
              autoPlay
              loop
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onError={() => setVideoError(true)}
              className="w-full h-full object-cover"
            />
          )}

          {/* Animated Play/Pause indicator */}
          {showCenterIcon && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="p-4 rounded-full bg-black/60 text-white backdrop-blur-xs animate-in zoom-in-75 duration-150">
                {isPlaying ? <Play className="w-8 h-8 fill-current" /> : <Pause className="w-8 h-8 fill-current" />}
              </div>
            </div>
          )}

          {/* Tap to Unmute Banner (if muted and playing) */}
          {isMuted && isPlaying && !videoError && (
            <div
              onClick={toggleMute}
              className="absolute bottom-28 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 hover:bg-black/90 text-white text-[11px] font-semibold backdrop-blur-md border border-white/10 transition-colors shadow-lg cursor-pointer"
            >
              <VolumeX className="w-3.5 h-3.5 text-amber-400" />
              <span>Tap to Unmute</span>
            </div>
          )}
        </div>

        {/* Bottom Carousel / Product Switching Bar */}
        <div className="relative z-30 p-3.5 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent space-y-2.5">
          {/* Reel Switcher Pills */}
          <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 scrollbar-none">
            {reelList.map((reel, idx) => {
              const isActive = reel.id === activeReelId;
              return (
                <button
                  key={reel.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectReel(reel.id);
                  }}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold tracking-tight whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-amber-500 text-slate-950 shadow-sm"
                      : "bg-slate-800/80 hover:bg-slate-700 text-slate-300"
                  }`}
                >
                  {idx === 0 ? "🏢 31 Sheets" : `#${idx} ${reel.priceTag}`}
                </button>
              );
            })}
          </div>

          {/* Product Meta */}
          <div className="text-left">
            <h4 className="text-sm font-bold text-white leading-tight">
              {currentReel.title}
            </h4>
            <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
              {currentReel.subtitle}
            </p>
          </div>

          {/* Pinned Action CTA */}
          <div>
            {currentReel.isMainProduct ? (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
              >
                <span>Get Instant Access — ₹299</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : currentReel.addonId ? (
              <button
                type="button"
                onClick={() => onToggleAddon(currentReel.addonId!)}
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isAddonInCart
                    ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/20"
                    : "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20"
                }`}
              >
                {isAddonInCart ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Added to Order (₹99)</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Add to Order (+₹99)</span>
                  </>
                )}
              </button>
            ) : null}
          </div>
        </div>

        {/* Side Nav Arrows (Desktop) */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous reel"
          className="hidden md:flex absolute -left-12 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-600/40 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next reel"
          className="hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-600/40 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
