"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Sparkles,
  ShoppingBag,
  Check,
  ShieldCheck,
  Truck,
  Heart,
} from "lucide-react";
import { OutfitItem } from "@/data/outfits";

interface DetailModalProps {
  item: OutfitItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: OutfitItem, size: string) => void;
  isFavorited: boolean;
  onToggleFavorite: () => void;
}

export function DetailModal({
  item,
  isOpen,
  onClose,
  onAddToCart,
  isFavorited,
  onToggleFavorite,
}: DetailModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [isAdded, setIsAdded] = useState<boolean>(false);

  if (!item) return null;

  const currentSize = selectedSize || item.sizes[0];

  const handleAdd = () => {
    setIsAdded(true);
    onAddToCart(item, currentSize);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity"
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0E0C0F] rounded-md p-6 sm:p-8 md:p-10 z-10 border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-[#F7EFE7] animate-in fade-in zoom-in-95 duration-200">
            {/* Top Bar */}
            <div className="flex items-center justify-end pb-6 border-b border-white/10">
              <div className="flex items-right gap-2">
                <button
                  type="button"
                  onClick={onToggleFavorite}
                  aria-label="Save to Wishlist"
                  className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                    isFavorited
                      ? "bg-[#E8D2C4] text-[#0B090A] border-[#E8D2C4]"
                      : "bg-white/5 border-white/15 text-[#C7A9A3] hover:text-[#F7EFE7]"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? "fill-[#0B090A]" : ""}`} />
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close details"
                  className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-[#F7EFE7] transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              {/* Image */}
              <div className="relative aspect-3/4 w-full rounded-md overflow-hidden ring-1 ring-white/15 shadow-2xl bg-black group">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#F7EFE7]">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E8D2C4]" />
                    {item.location}
                  </span>
                </div>
              </div>

              {/* Info & Actions */}
              <div className="flex flex-col justify-between space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-normal text-[#F7EFE7] tracking-tight">
                    {item.title}
                  </h2>
                  <p className="text-[#E8D2C4] text-sm font-medium mt-1">{item.subtitle}</p>

                  <div className="text-2xl sm:text-3xl font-bold text-[#F7EFE7] mt-4">
                    {item.price}
                  </div>

                  <p className="text-sm text-[#F7EFE7]/80 leading-relaxed mt-4 font-light">
                    {item.description}
                  </p>
                </div>

                {/* Materials */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <h3 className="text-xs font-semibold tracking-wider uppercase text-[#C7A9A3]">
                    Fabric &amp; Materials
                  </h3>
                  <ul className="text-xs text-[#F7EFE7]/90 space-y-1.5 font-light">
                    {item.materials.map((mat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E8D2C4]" />
                        {mat}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Size Selection */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold uppercase tracking-wider text-[#C7A9A3]">
                      Select Size
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.sizes.map((size) => {
                      const isSel = currentSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 rounded-md text-xs font-medium transition-all cursor-pointer ${
                            isSel
                              ? "bg-[#E8D2C4] text-[#0B090A] font-bold shadow-lg scale-105"
                              : "bg-white/5 text-[#F7EFE7] border border-white/15 hover:border-[#E8D2C4]"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* CTA */}
                <div className="space-y-3 pt-2">
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="w-full py-3.5 px-6 rounded-md bg-[#E8D2C4] hover:bg-[#F7EFE7] text-[#0B090A] font-bold text-sm tracking-wide shadow-xl active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 text-[#0B090A]" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-[#0B090A]" />
                        Add to Cart &bull; {item.price}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
