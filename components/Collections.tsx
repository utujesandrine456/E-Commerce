"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  ShoppingBag,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { OutfitItem } from "@/data/outfits";

interface CuratedGridProps {
  outfits: OutfitItem[];
  onOpenDetail: (item: OutfitItem) => void;
  onAddToCart: (item: OutfitItem, size: string) => void;
}

const ITEMS_PER_PAGE = 6;

export function Collections({ outfits, onOpenDetail, onAddToCart }: CuratedGridProps) {
  const [filter, setFilter] = useState<"ALL" | "MEN" | "WOMEN">("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isPageLoading, setIsPageLoading] = useState(false);

  // Filter outfits
  const filteredOutfits = outfits.filter((item) => {
    if (filter === "MEN")
      return (
        item.category.toLowerCase().includes("sartorial") ||
        item.category.toLowerCase().includes("essentials") ||
        item.title.toLowerCase().includes("men")
      );
    if (filter === "WOMEN")
      return (
        item.category.toLowerCase().includes("women") ||
        item.category.toLowerCase().includes("eveningwear") ||
        item.category.toLowerCase().includes("leisure") ||
        item.category.toLowerCase().includes("contemporary") ||
        item.category.toLowerCase().includes("shirting") ||
        item.title.toLowerCase().includes("women") ||
        item.title.toLowerCase().includes("gown") ||
        item.title.toLowerCase().includes("dress") ||
        item.title.toLowerCase().includes("knit")
      );
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredOutfits.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentOutfits = filteredOutfits.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleFilterChange = (cat: "ALL" | "MEN" | "WOMEN") => {
    if (filter === cat) return;
    setIsPageLoading(true);
    setFilter(cat);
    setCurrentPage(1);
    setTimeout(() => {
      setIsPageLoading(false);
    }, 320);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setIsPageLoading(true);
    setCurrentPage(newPage);

    const el = document.getElementById("collection");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setTimeout(() => {
      setIsPageLoading(false);
    }, 380);
  };

  return (
    <section id="collection" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
      >
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#F7EFE7] tracking-tight">
            Our Clothes Collection
          </h2>
          <p className="text-[#C7A9A3] text-sm sm:text-base max-w-xl mt-2 font-light leading-relaxed">
            Quality modern clothes for men and women in Kigali. Great designs, comfortable fit, and affordable prices.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-black/80 border border-white/10 p-1.5 rounded-md self-start md:self-auto shadow-2xl backdrop-blur-xl">
          {(["ALL", "MEN", "WOMEN"] as const).map((cat) => {
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleFilterChange(cat)}
                className={`relative px-4 py-2 rounded-sm text-xs font-medium transition-colors cursor-pointer ${
                  isActive ? "text-[#0B090A] font-semibold" : "text-[#C7A9A3] hover:text-[#F7EFE7]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 bg-[#E8D2C4] rounded-sm shadow-md"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {cat === "ALL" ? "All Outfits" : cat === "MEN" ? "Men's Wear" : "Women's Wear"}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      <div className="relative min-h-155">
        <AnimatePresence mode="wait">
          {isPageLoading ? (
            <motion.div
              key="loading-skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="bg-[#120F12]/80 border border-white/5 rounded-md p-4 animate-pulse space-y-4"
                >
                  <div className="aspect-3/4 w-full rounded-md bg-white/5 relative overflow-hidden flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-[#E8D2C4]/20 border-t-[#E8D2C4] animate-spin" />
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="h-4 bg-white/10 rounded-sm w-3/4" />
                    <div className="h-3 bg-white/5 rounded-sm w-1/2" />
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            /* Real Clothes Cards Grid */
            <motion.div
              key={`grid-page-${currentPage}-${filter}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {currentOutfits.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 35, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.5,
                    delay: (idx % 6) * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -6 }}
                  onClick={() => onOpenDetail(item)}
                  className="group bg-[#120F12]/90 border border-white/10 rounded-md overflow-hidden p-3.5 sm:p-4 cursor-pointer hover:border-[#E8D2C4]/50 transition-colors duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex flex-col justify-between"
                >
                  {/* Image Container */}
                  <div className="relative aspect-3/4 w-full rounded-md overflow-hidden bg-black/60">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/15 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

                    {/* Category Tag & Rating */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="bg-black/75 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-md text-[11px] font-medium text-[#F7EFE7] tracking-wide">
                        {item.category}
                      </span>

                      <div className="bg-black/75 backdrop-blur-md border border-white/15 px-2 py-0.5 rounded-md flex items-center gap-1 text-[11px] text-[#E8D2C4]">
                        <Star className="w-3 h-3 fill-[#E8D2C4]" />
                        <span>{item.rating}</span>
                      </div>
                    </div>

                    {/* Quick View Hover Pill */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                      <span className="bg-black/85 backdrop-blur-md border border-[#E8D2C4]/70 px-4 py-2 rounded-md text-xs font-medium text-[#F7EFE7] flex items-center gap-2 shadow-2xl">
                        <Eye className="w-3.5 h-3.5 text-[#E8D2C4]" />
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Garment Title & Price */}
                  <div className="pt-4 px-1 flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-medium text-[#F7EFE7] tracking-tight group-hover:text-[#E8D2C4] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#C7A9A3] font-light truncate mt-0.5">
                          {item.tagline}
                        </p>
                      </div>
                      <span className="text-base font-bold text-[#E8D2C4] shrink-0 font-mono">
                        {item.price}
                      </span>
                    </div>

                    {/* Location & Quick Add Button */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#C7A9A3]">
                      <span className="truncate text-[11px]">{item.location}</span>
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(item, item.sizes[0]);
                        }}
                        className="p-2 rounded-full bg-white/5 hover:bg-[#E8D2C4] text-[#F7EFE7] hover:text-[#0B090A] transition-colors flex items-center justify-center border border-white/10 cursor-pointer shadow-md"
                        aria-label={`Quick add ${item.title}`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination Controls Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        {/* Status Count */}
        <p className="text-xs text-[#C7A9A3] font-light">
          Showing{" "}
          <strong className="text-[#F7EFE7] font-medium">
            {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, filteredOutfits.length)}
          </strong>{" "}
          of <strong className="text-[#E8D2C4] font-medium">{filteredOutfits.length}</strong> outfits
        </p>

        {/* Page Switcher */}
        <div className="flex items-center gap-2">
          {/* Previous Page Button */}
          <motion.button
            whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
            whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
            type="button"
            disabled={currentPage === 1 || isPageLoading}
            onClick={() => handlePageChange(currentPage - 1)}
            aria-label="Previous page"
            className={`p-2.5 rounded-md border flex items-center justify-center transition-all ${
              currentPage === 1
                ? "opacity-30 border-white/5 text-[#C7A9A3] cursor-not-allowed"
                : "bg-black/60 border-white/15 text-[#F7EFE7] hover:border-[#E8D2C4] hover:text-[#E8D2C4] cursor-pointer shadow-md"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.button>

          {/* Numbered Page Buttons */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => {
              const isCurrent = currentPage === pg;
              return (
                <motion.button
                  key={pg}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  type="button"
                  onClick={() => handlePageChange(pg)}
                  aria-label={`Go to page ${pg}`}
                  className={`w-9 h-9 rounded-md text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                    isCurrent
                      ? "bg-[#E8D2C4] text-[#0B090A] shadow-lg shadow-[#E8D2C4]/20"
                      : "bg-white/5 border border-white/10 text-[#C7A9A3] hover:text-[#F7EFE7] hover:border-white/20"
                  }`}
                >
                  {pg}
                </motion.button>
              );
            })}
          </div>

          <motion.button
            whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
            whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
            type="button"
            disabled={currentPage === totalPages || isPageLoading}
            onClick={() => handlePageChange(currentPage + 1)}
            aria-label="Next page"
            className={`p-2.5 rounded-md border flex items-center justify-center transition-all ${
              currentPage === totalPages
                ? "opacity-30 border-white/5 text-[#C7A9A3] cursor-not-allowed"
                : "bg-black/60 border-white/15 text-[#F7EFE7] hover:border-[#E8D2C4] hover:text-[#E8D2C4] cursor-pointer shadow-md"
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}

export const CuratedGrid = Collections;
