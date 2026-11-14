"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { Maximize2, MapPin, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { OutfitItem } from "@/data/outfits";

interface HeroSpatialCarouselProps {
  outfits: OutfitItem[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenDetail: (item: OutfitItem) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export function Hero({
  outfits,
  currentIndex,
  onSelectIndex,
  onOpenDetail,
  favorites,
  onToggleFavorite,
}: HeroSpatialCarouselProps) {
  const total = outfits.length;

  const handlePrev = useCallback(() => {
    onSelectIndex((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onSelectIndex]);

  const handleNext = useCallback(() => {
    onSelectIndex((currentIndex + 1) % total);
  }, [currentIndex, total, onSelectIndex]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    },
    [handlePrev, handleNext]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const getCardTransform = (index: number) => {
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const absDiff = Math.abs(diff);

    if (absDiff > 2) {
      return {
        style: {
          transform: `translateX(${diff > 0 ? 620 : -620}px) scale(0.65)`,
          opacity: 0,
          pointerEvents: "none" as const,
          zIndex: 0,
        },
        isActive: false,
      };
    }

    if (diff === 0) {
      return {
        style: {
          transform: "translateX(0px) scale(1)",
          opacity: 1,
          zIndex: 35,
          pointerEvents: "auto" as const,
        },
        isActive: true,
      };
    }

    if (diff === -1) {
      return {
        style: {
          transform: "translateX(-290px) scale(0.9)",
          opacity: 0.95,
          zIndex: 25,
          pointerEvents: "auto" as const,
        },
        isActive: false,
      };
    }

    if (diff === 1) {
      return {
        style: {
          transform: "translateX(290px) scale(0.9)",
          opacity: 0.95,
          zIndex: 25,
          pointerEvents: "auto" as const,
        },
        isActive: false,
      };
    }

    if (diff === -2) {
      return {
        style: {
          transform: "translateX(-520px) scale(0.8)",
          opacity: 0.85,
          zIndex: 15,
          pointerEvents: "auto" as const,
        },
        isActive: false,
      };
    }

    return {
      style: {
        transform: "translateX(520px) scale(0.8)",
        opacity: 0.85,
        zIndex: 15,
        pointerEvents: "auto" as const,
      },
      isActive: false,
    };
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-6 select-none">
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous piece"
        className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/85 hover:bg-[#E8D2C4] text-[#F7EFE7] hover:text-[#0B090A] border border-white/20 hover:border-[#E8D2C4] flex items-center justify-center transition-all shadow-[0_10px_30px_rgba(0,0,0,0.8)] active:scale-95 cursor-pointer backdrop-blur-xl group"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Next piece"
        className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/85 hover:bg-[#E8D2C4] text-[#F7EFE7] hover:text-[#0B090A] border border-white/20 hover:border-[#E8D2C4] flex items-center justify-center transition-all shadow-[0_10px_30px_rgba(0,0,0,0.8)] active:scale-95 cursor-pointer backdrop-blur-xl group"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
      </button>

      <div className="relative w-full max-w-5xl h-110 sm:h-122.5 md:h-132.5 flex items-center justify-center px-16 sm:px-24 md:px-32">
        {outfits.map((item, index) => {
          const { style, isActive } = getCardTransform(index);
          const isLiked = favorites.includes(item.id);

          return (
            <div
              key={item.id}
              onClick={() => {
                if (isActive) {
                  onOpenDetail(item);
                } else {
                  onSelectIndex(index);
                }
              }}
              style={style}
              className={`absolute top-0 w-65 sm:w-77.5 md:w-87.5 h-105 sm:h-117.5 md:h-127.5 rounded-md cursor-pointer will-change-transform transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group ${
                isActive
                  ? "ring-1 ring-white/40 shadow-[0_30px_70px_rgba(0,0,0,0.95)]"
                  : "ring-1 ring-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:ring-[#E8D2C4]/60 hover:brightness-105"
              }`}
            >
              <div className="relative w-full h-full bg-[#141013]/95 rounded-md overflow-hidden border border-white/15 flex flex-col justify-between p-4 sm:p-5">
                {/* Image & Gradient */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 280px, 350px"
                    priority={isActive}
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/30 to-transparent pointer-events-none" />
                </div>

                {/* Top Card Controls */}
                <div className="relative z-10 flex items-center justify-between w-full">
                  {isActive ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDetail(item);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-[#F7EFE7] bg-black/75 backdrop-blur-md border border-white/20 shadow-md hover:border-[#E8D2C4] hover:text-[#E8D2C4] transition-all cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(item.id);
                    }}
                    aria-label={isLiked ? "Unlike outfit" : "Like outfit"}
                    title={isLiked ? "Unlike" : "Like"}
                    className={`p-2 rounded-full shadow-md transition-all active:scale-90 flex items-center justify-center border backdrop-blur-md cursor-pointer ${
                      isLiked
                        ? "bg-[#E8D2C4] text-[#0B090A] border-[#E8D2C4]"
                        : "bg-black/70 text-[#C7A9A3] hover:text-[#F7EFE7] border-white/20 hover:border-[#E8D2C4]"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform ${
                        isLiked ? "fill-[#0B090A] text-[#0B090A] scale-110" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Bottom Card Info */}
                <div className="relative z-10 flex flex-col text-left space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <h3
                      className={`font-semibold tracking-tight text-[#F7EFE7] ${
                        isActive ? "text-lg sm:text-xl" : "text-sm sm:text-base"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <span className="text-xs font-semibold text-[#E8D2C4] shrink-0 ml-2">
                      {item.price}
                    </span>
                  </div>

                  {isActive ? (
                    <div className="space-y-1.5 transition-opacity duration-300">
                      <p className="text-xs text-[#F7EFE7]/85 line-clamp-2 leading-relaxed font-light">
                        {item.description}
                      </p>

                      <div className="pt-1.5 flex items-center justify-between text-[11px] text-[#C7A9A3] border-t border-white/10">
                        <div className="flex items-center gap-1 text-[#F7EFE7]/90 truncate">
                          <MapPin className="w-3 h-3 text-[#E8D2C4] shrink-0" />
                          <span className="truncate">{item.location}</span>
                        </div>
                        <span className="text-[10px] text-[#C7A9A3] shrink-0 ml-2 font-mono">
                          {item.coordinates}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-[#C7A9A3] truncate">
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>

                {!isActive && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onSelectIndex(index);
                    }}
                    aria-label={`Select ${item.title}`}
                    className="absolute inset-0 z-20 w-full h-full bg-transparent cursor-pointer rounded-md focus:outline-none"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Indicators & Active Details */}
      <div className="mt-8 flex flex-col items-center gap-2.5 z-30">
        <div className="flex items-center gap-2">
          {outfits.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectIndex(idx)}
              aria-label={`Jump to piece ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentIndex
                  ? "w-8 h-2 bg-[#E8D2C4] shadow-[0_0_12px_rgba(232,210,196,0.6)]"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
