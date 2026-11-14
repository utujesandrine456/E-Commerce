"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { OutfitItem } from "@/data/outfits";

interface BottomControllerProps {
  outfits: OutfitItem[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
  isFavorited: boolean;
  onToggleFavorite: () => void;
}

export function BottomController({
  outfits,
  currentIndex,
  onPrev,
  onNext,
  onSelectIndex,
  isFavorited,
  onToggleFavorite,
}: BottomControllerProps) {
  const current = outfits[currentIndex];

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 mt-6 z-30 relative select-none">
      <div className="glass-pill flex items-center justify-between gap-4 px-4 py-2.5 rounded-full min-w-70 sm:min-w-85 max-w-md shadow-2xl transition-all duration-300">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous Outfit"
          className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Center Item Avatar and Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-white/30 shrink-0 shadow-md">
            <Image
              src={current.image}
              alt={current.title}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col text-left min-w-0">
            <span className="text-xs sm:text-sm font-semibold text-white tracking-wide truncate">
              {current.title}
            </span>
            <span className="text-[11px] text-zinc-400 truncate tracking-tight">
              {current.subtitle}
            </span>
          </div>
        </div>

        {/* Right Actions: Favorite + Next Arrow */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleFavorite}
            aria-label="Favorite Look"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-95 border ${
              isFavorited
                ? "bg-rose-500/20 text-rose-400 border-rose-500/40"
                : "bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white border-white/10"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorited ? "fill-rose-400" : ""}`} />
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label="Next Outfit"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 py-1">
        {outfits.map((item, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`transition-all duration-300 rounded-full ${
                isActive
                  ? "w-6 h-1.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                  : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

