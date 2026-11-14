"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { OUTFITS, OutfitItem } from "@/data/outfits";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { DetailModal } from "@/components/DetailModal";
import { Collections } from "@/components/Collections";
import { NewsletterFooter } from "@/components/NewsletterFooter";
import {
  ShoppingBag,
  X,
  Check,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ChevronDown,
} from "lucide-react";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOutfit, setSelectedOutfit] = useState<OutfitItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<{ item: OutfitItem; size: string; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentOutfit = OUTFITS[currentIndex];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + OUTFITS.length) % OUTFITS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % OUTFITS.length);
  };

  const handleSelectIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const handleOpenDetail = (item: OutfitItem) => {
    setSelectedOutfit(item);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const isFav = prev.includes(id);
      if (isFav) {
        showToast("Removed from Saved Outfits");
        return prev.filter((item) => item !== id);
      } else {
        showToast("Saved to your Favorites");
        return [...prev, id];
      }
    });
  };

  const handleAddToCart = (item: OutfitItem, size: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.item.id === item.id && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id && i.size === size ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { item, size, quantity: 1 }];
    });
    showToast(`Added to Cart: ${item.title} (Size ${size})`);
  };

  const totalCartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  // Scroll expansion animation hooks
  const { scrollY } = useScroll();

  // The hero section is pinned while scrolling through 200vh
  // As user scrolls from 0 to 480px:
  // - The frame expands from 28px inset to 0px (full bleed)
  // - The border radius animates from 28px to 0px
  // - The image scales slightly for parallax depth
  // - The hero text dissolves gracefully
  // - Once scroll reaches 480px+, frame is at maximum expansion, and scrolls smoothly to Section 2
  const frameInset = useTransform(scrollY, [0, 480], [28, 0]);
  const frameRadius = useTransform(scrollY, [0, 480], [28, 0]);
  const frameBorderOpacity = useTransform(scrollY, [0, 360], [0.3, 0]);
  const bgImageScale = useTransform(scrollY, [0, 520], [1.02, 1.18]);
  const heroContentOpacity = useTransform(scrollY, [0, 260], [1, 0]);
  const heroContentY = useTransform(scrollY, [0, 260], [0, -45]);
  const progressScale = useTransform(scrollY, [0, 480], [0, 1]);
  const progressOpacity = useTransform(scrollY, [0, 420, 500], [1, 1, 0]);

  return (
    <main className="relative min-h-screen bg-[#0B090A] text-[#F7EFE7] font-sans">
      <Header
        currentOutfit={currentOutfit}
        currentIndex={currentIndex}
        totalOutfits={OUTFITS.length}
        onPrev={handlePrev}
        onNext={handleNext}
        cartCount={totalCartCount}
        wishlistCount={favorites.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {
          showToast(`Saved Outfits: ${favorites.length} items`);
        }}
        onOpenProfile={() => {
          showToast("Kigali Modern Fashion Member");
        }}
      />

      {/* Pinned Hero Section with Scroll Frame Expansion */}
      <section
        className="relative z-10 w-full"
        style={{ height: "200vh" }}
      >
        <div className="sticky top-0 w-full h-screen flex flex-col justify-between overflow-hidden bg-[#0B090A]">
          {/* Expanding Frame Container */}
          <motion.div
            className="absolute overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.9)] will-change-transform"
            style={{
              top: frameInset,
              bottom: frameInset,
              left: frameInset,
              right: frameInset,
              borderRadius: frameRadius,
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "rgba(232, 210, 196, 0.25)",
            }}
          >
            {/* Background Image inside expanding frame */}
            <motion.div
              className="absolute inset-0 will-change-transform"
              style={{ scale: bgImageScale }}
            >
              <Image
                src="/Background.jpg"
                alt="Kigali Modern Fashion Background"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>

            {/* Dark luxury ambiance overlays for text readability */}
            <div className="absolute inset-0 bg-black/45 pointer-events-none" />
            <div className="absolute inset-0 bg-linear-to-t from-[#0B090A] via-black/25 to-black/60 pointer-events-none" />
            <div className="absolute inset-0 bg-radial from-transparent via-black/25 to-[#0B090A]/85 pointer-events-none" />

            {/* Clean Hero Content — Dissolves as frame expands to full view */}
            <motion.div
              style={{
                opacity: heroContentOpacity,
                y: heroContentY,
              }}
              className="relative z-20 w-full h-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center"
            >
              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#F7EFE7] tracking-tight leading-[1.08] max-w-4xl mx-auto"
              >
                Quality Clothes. <br />
                <span className="font-normal text-transparent bg-clip-text bg-linear-to-r from-[#F7EFE7] via-[#E8D2C4] to-[#C7A9A3]">
                  Modern Style.
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 text-sm sm:text-base md:text-lg text-[#F7EFE7]/85 max-w-2xl mx-auto font-light leading-relaxed"
              >
                Discover the best modern outfits for men and women in Kigali.
                Quality fabrics, great designs, and fast delivery across Rwanda.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex flex-wrap items-center justify-center gap-4"
              >
                <a
                  href="#runway"
                  className="px-6 py-3 rounded-md bg-[#E8D2C4] hover:bg-[#F7EFE7] text-[#0B090A] font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <span>Featured Outfits</span>
                  <ArrowRight className="w-4 h-4 text-[#0B090A]" />
                </a>

                <a
                  href="#collection"
                  className="px-6 py-3 rounded-md bg-white/5 hover:bg-white/10 text-[#F7EFE7] border border-white/15 hover:border-[#E8D2C4] font-medium text-xs sm:text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Browse All Clothes
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Runway Section */}
      <section
        id="runway"
        className="w-full relative py-20 sm:py-28 bg-linear-to-b from-[#0B090A] via-[#120F12] to-[#0B090A] border-t border-b border-white/10 overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center"
        >
          <h2 className="text-3xl sm:text-5xl font-light text-[#F7EFE7] tracking-tight">
            Featured Outfits
          </h2>
          <p className="text-[#C7A9A3] text-sm sm:text-base max-w-2xl mx-auto mt-3 font-light leading-relaxed">
            Browse our top-rated clothes in 3D. Click any outfit to view size and fabric details, or use the buttons below to switch outfits.
          </p>

          {/* Interactive Controller Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              type="button"
              onClick={handlePrev}
              aria-label="Previous outfit"
              className="p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-[#F7EFE7] transition-colors shadow-lg flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>

            <div className="px-5 py-2.5 rounded-md bg-black/60 border border-white/15 backdrop-blur-md flex items-center gap-3 shadow-lg">
              <span className="text-xs font-semibold text-[#E8D2C4]">
                {String(currentIndex + 1).padStart(2, "0")} / {String(OUTFITS.length).padStart(2, "0")}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className="text-xs font-medium text-[#F7EFE7] truncate max-w-52">
                {currentOutfit.title}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              type="button"
              onClick={handleNext}
              aria-label="Next outfit"
              className="p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-[#F7EFE7] transition-colors shadow-lg flex items-center justify-center cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        <div className="relative w-full flex flex-col items-center justify-center overflow-x-hidden pt-4 pb-8">
          <Hero
            outfits={OUTFITS}
            currentIndex={currentIndex}
            onSelectIndex={handleSelectIndex}
            onOpenDetail={handleOpenDetail}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      </section>

      {/* Section Divider Glow */}
      <div className="relative w-full flex items-center justify-center">
        <div className="w-full max-w-5xl h-px bg-linear-to-r from-transparent via-[#E8D2C4]/25 to-transparent" />
      </div>

      {/* Curated Grid Section with 6-item Pagination */}
      <Collections
        outfits={OUTFITS}
        onOpenDetail={handleOpenDetail}
        onAddToCart={handleAddToCart}
      />

      {/* Atmospheric Transition Glow */}
      <div className="relative w-full flex items-center justify-center">
        <div className="w-full max-w-5xl h-px bg-linear-to-r from-transparent via-[#E8D2C4]/25 to-transparent" />
      </div>

      <NewsletterFooter />

      <DetailModal
        item={selectedOutfit}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
        onAddToCart={handleAddToCart}
        isFavorited={selectedOutfit ? favorites.includes(selectedOutfit.id) : false}
        onToggleFavorite={() => {
          if (selectedOutfit) handleToggleFavorite(selectedOutfit.id);
        }}
      />

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />

          <div className="relative w-full max-w-md h-full bg-[#0E0C0F] border-l border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_60px_rgba(0,0,0,0.9)] z-10 text-[#F7EFE7]">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#E8D2C4]" />
                  <h3 className="text-lg font-medium text-[#F7EFE7]">Your Shopping Cart</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-[#C7A9A3] hover:text-[#F7EFE7] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="py-24 text-center text-[#C7A9A3] space-y-3">
                  <ShoppingBag className="w-10 h-10 mx-auto opacity-30 text-[#C7A9A3]" />
                  <p className="text-sm font-light">Your shopping cart is currently empty.</p>
                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2 text-xs text-[#E8D2C4] hover:underline"
                  >
                    Start browsing clothes
                  </button>
                </div>
              ) : (
                <div className="py-6 space-y-4 max-h-[60vh] overflow-y-auto">
                  {cart.map((entry, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 rounded-md bg-white/5 border border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-14 rounded-md overflow-hidden shrink-0 border border-white/15">
                          <Image
                            src={entry.item.image}
                            alt={entry.item.title}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-[#F7EFE7] truncate max-w-40">
                            {entry.item.title}
                          </h4>
                          <p className="text-xs text-[#C7A9A3]">Size: {entry.size}</p>
                          <p className="text-xs text-[#E8D2C4] font-bold mt-0.5">
                            {entry.item.price} &times; {entry.quantity}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setCart((prev) => prev.filter((_, i) => i !== idx));
                          showToast("Item removed from cart");
                        }}
                        className="text-[#C7A9A3] hover:text-[#E8D2C4] p-1.5 transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#C7A9A3]">Delivery in Kigali</span>
                  <span className="text-[#E8D2C4] font-bold">Fast &amp; Free</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    showToast("Order received! We will contact you for delivery in Kigali.");
                    setCart([]);
                    setIsCartOpen(false);
                  }}
                  className="w-full py-3.5 rounded-md bg-[#E8D2C4] hover:bg-[#F7EFE7] text-[#0B090A] font-bold text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#0B090A]" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B090A]/95 border border-[#E8D2C4]/40 px-4 py-2.5 rounded-md flex items-center gap-2 text-xs font-medium text-[#F7EFE7] shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
          <Check className="w-3.5 h-3.5 text-[#E8D2C4]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </main>
  );
}
