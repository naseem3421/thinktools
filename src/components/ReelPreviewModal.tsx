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
  AlertCircle,
  Eye,
  EyeOff
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
  const [isMuted, setIsMuted] = useState<boolean>(false); // Volume always ON by default
  const [progress, setProgress] = useState<number>(0);
  const [videoError, setVideoError] = useState<boolean>(false);
  const [showCenterIcon, setShowCenterIcon] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false); // Texts around OFF by default

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // When viewing add-ons, 31 sheets (main calculator) is completely removed from the add-on player
  const isMainProductReel = activeReelId === "main-calculator";
  const reelList = isMainProductReel
    ? [REEL_VIDEOS["main-calculator"]].filter(Boolean)
    : Object.values(REEL_VIDEOS).filter((r) => !r.isMainProduct);

  const currentIndex = reelList.findIndex((r) => r.id === activeReelId);
  const currentReel = reelList[currentIndex] || reelList[0];

  const ADDON_SHORT_TITLES: Record<string, string> = {
    "site-expense-profit-tracker": "Site Expense",
    "labour-attendance-weekly-wage-sheet": "Labour & Wage",
    "payment-collection-tracker": "Payment Tracker"
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3500);
    }
  };

  // Handle ESC key and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    // When player opens: texts around are OFF and volume is ON
    setShowControls(false);
    setIsMuted(false);

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
  }, [isOpen]);

  // Reset video state on reel switch or open
  useEffect(() => {
    if (!isOpen) return;
    setVideoError(false);
    setVideoSrc(currentReel.src);
    setProgress(0);
    setIsPlaying(true);
    setShowControls(false); // keep surrounding texts OFF
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false; // Volume always ON
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch(() => {
          // If browser policy requires user gesture for audio, temporarily mute to start playback,
          // then auto-unmute on the very first touch/click
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current
              .play()
              .then(() => {
                setIsPlaying(true);
                // Attempt to auto-unmute on first user touch/click anywhere in window
                const unmuteOnUserAction = () => {
                  if (videoRef.current) {
                    videoRef.current.muted = false;
                    setIsMuted(false);
                  }
                  window.removeEventListener("pointerdown", unmuteOnUserAction);
                  window.removeEventListener("touchstart", unmuteOnUserAction);
                  window.removeEventListener("click", unmuteOnUserAction);
                };
                window.addEventListener("pointerdown", unmuteOnUserAction, { once: true });
                window.addEventListener("touchstart", unmuteOnUserAction, { once: true });
                window.addEventListener("click", unmuteOnUserAction, { once: true });
              })
              .catch(() => setIsPlaying(false));
          }
        });
    }
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [activeReelId, isOpen, currentReel.src]);

  const [videoSrc, setVideoSrc] = useState<string>(currentReel.src);

  const handleVideoError = () => {
    if (videoSrc === currentReel.src && !videoSrc.endsWith(".mp4.mp4")) {
      // Auto-fallback: Windows frequently appends an extra .mp4
      setVideoSrc(`${currentReel.src}.mp4`);
    } else {
      setVideoError(true);
    }
  };

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
      setShowControls(false);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowControls(true);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    }
    setShowCenterIcon(true);
    setTimeout(() => setShowCenterIcon(false), 500);
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
      className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 bg-slate-950/92 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Outer Wrapper centering strict 9:16 player and exterior controls */}
      <div
        className="relative flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Exterior Desktop Close Button (never covers video) */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video player"
          className="hidden md:flex absolute -top-12 -right-4 z-[60] p-2 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white transition-all cursor-pointer border border-white/20 shadow-xl hover:scale-110"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Side Nav Arrows (Desktop - Placed outside 9:16 frame, only when multiple reels exist) */}
        {reelList.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous reel"
              className="hidden md:flex absolute -left-14 top-1/2 -translate-y-1/2 z-[60] p-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white border border-white/20 transition-all cursor-pointer shadow-xl hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next reel"
              className="hidden md:flex absolute -right-14 top-1/2 -translate-y-1/2 z-[60] p-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white border border-white/20 transition-all cursor-pointer shadow-xl hover:scale-110"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* STRICT 9:16 REELS CONTAINER */}
        <div
          className="relative aspect-[9/16] h-[min(90vh,760px)] w-auto max-w-[94vw] bg-black rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/15 flex items-center justify-center select-none"
        >
          {/* Top Video Progress Bar (Slim 2px line) */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-30 pointer-events-none">
            <div
              className="h-full bg-amber-400 transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Top Floating Controls Bar */}
          <div
            className={`absolute top-2.5 left-2.5 right-2.5 z-30 flex items-center justify-between text-white transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs shadow-md">
              <span className="font-black text-amber-400 font-mono text-[11px]">
                {currentReel.priceTag}
              </span>
              <span className="text-white/30">|</span>
              <span className="font-semibold text-slate-200 text-[11px] truncate max-w-[130px] sm:max-w-[190px]">
                {currentReel.title}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Eye toggle to instantly hide/reveal overlays so zero content is blocked */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowControls((prev) => !prev);
                }}
                className="p-1.5 rounded-full bg-black/60 hover:bg-black/85 text-slate-200 hover:text-white backdrop-blur-md border border-white/10 transition-colors cursor-pointer shadow-md"
                title="Hide overlay to view full video"
              >
                <EyeOff className="w-4 h-4" />
              </button>

              {/* Mute toggle */}
              <button
                type="button"
                onClick={toggleMute}
                className="p-1.5 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md border border-white/10 transition-colors cursor-pointer shadow-md"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-slate-300" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
              </button>

              {/* Mobile Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md border border-white/10 transition-colors cursor-pointer md:hidden shadow-md"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Persistent Eye Toggle when controls are hidden */}
          {!showControls && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowControls(true);
              }}
              className="absolute top-2.5 right-2.5 z-30 p-1.5 rounded-full bg-black/40 hover:bg-black/75 text-white/80 hover:text-white backdrop-blur-xs border border-white/10 transition-opacity animate-in fade-in cursor-pointer"
              title="Show info & controls"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Full-bleed 9:16 Video Area */}
          <div
            className="w-full h-full flex items-center justify-center cursor-pointer bg-black"
            onClick={togglePlayPause}
          >
            {videoError ? (
              <div className="px-6 text-center text-slate-300 space-y-3 max-w-xs">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <FileSpreadsheet className="w-7 h-7" />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold font-mono">
                    <Sparkles className="w-3 h-3" /> Reel Ready
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1.5">
                    {currentReel.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    {currentReel.subtitle}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[10px] text-slate-400 font-mono text-left">
                  <span>File: </span>
                  <span className="text-emerald-400 break-all">{currentReel.src}</span>
                </div>
              </div>
            ) : (
              <video
                ref={videoRef}
                src={videoSrc}
                playsInline
                autoPlay
                loop
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onError={handleVideoError}
                className="w-full h-full object-contain bg-black"
              />
            )}

            {/* Tap to Unmute Banner (shows whenever muted so mobile users can tap for audio) */}
            {isMuted && isPlaying && !videoError && (
              <div
                onClick={toggleMute}
                className="absolute top-14 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/85 hover:bg-black text-white text-xs font-semibold backdrop-blur-md border border-amber-400/40 transition-all shadow-xl cursor-pointer hover:scale-105 animate-pulse"
              >
                <VolumeX className="w-4 h-4 text-amber-400" />
                <span>Tap for Audio 🔊</span>
              </div>
            )}

            {/* Center Animated Play/Pause indicator */}
            {showCenterIcon && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                <div className="p-3.5 rounded-full bg-black/70 text-white backdrop-blur-xs animate-in zoom-in-75 duration-150">
                  {isPlaying ? (
                    <Play className="w-7 h-7 fill-current ml-0.5" />
                  ) : (
                    <Pause className="w-7 h-7 fill-current" />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Floating Reel Switcher & Action CTA (Auto-fades so video content is unblocked) */}
          <div
            className={`absolute bottom-3 left-2.5 right-2.5 z-30 space-y-2 transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Reel Switcher Pills (Only shown for the 3 Add-on tools; 31 Sheets is excluded) */}
            {reelList.length > 1 && (
              <div className="flex items-center justify-center gap-1 overflow-x-auto p-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 scrollbar-none shadow-lg">
                {reelList.map((reel) => {
                  const isActive = reel.id === activeReelId;
                  const label = ADDON_SHORT_TITLES[reel.id] || reel.title;
                  return (
                    <button
                      key={reel.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectReel(reel.id);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-tight whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? "bg-amber-500 text-slate-950 shadow-sm"
                          : "text-slate-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {label} ({reel.priceTag})
                    </button>
                  );
                })}
              </div>
            )}

            {/* Pinned Action CTA */}
            <div>
              {currentReel.isMainProduct ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                    onOpenCheckout();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-xl shadow-black/50 transition-all cursor-pointer"
                >
                  <span>Get Instant Access — ₹299</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : currentReel.addonId ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleAddon(currentReel.addonId!);
                  }}
                  className={`w-full py-2.5 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-xl shadow-black/50 transition-all cursor-pointer ${
                    isAddonInCart
                      ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                      : "bg-amber-500 hover:bg-amber-400 text-slate-950"
                  }`}
                >
                  {isAddonInCart ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>✓ Added to Order (₹99)</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>+ Add to Order (₹99)</span>
                    </>
                  )}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
