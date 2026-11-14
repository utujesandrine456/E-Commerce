"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { OUTFITS, OutfitItem } from "@/data/outfits";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CuratedGrid } from "@/components/Collections";
import { DetailModal } from "@/components/DetailModal";
import { NewsletterFooter } from "@/components/NewsletterFooter";
import { ShoppingBag, X, Check, ArrowRight, Sparkles, Layers } from "lucide-react";

export default function CollectionsPage() {
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

  return (
    <main className="relative min-h-screen bg-[#0B090A] text-[#F7EFE7] font-sans">
      {/* Header */}
      <Header
        currentOutfit={currentOutfit}
        currentIndex={currentIndex}
        totalOutfits={OUTFITS.length}
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

      {/* Collections Banner */}
      <section className="relative w-full py-16 sm:py-24 border-b border-white/10 bg-linear-to-b from-[#120F12] to-[#0B090A] text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white/5 border border-white/10 text-[#E8D2C4] text-xs font-medium tracking-[0.2em] uppercase">
            <Layers className="w-3.5 h-3.5 text-[#E8D2C4]" />
            <span>All Clothes &bull; 2026 Collection</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-[#F7EFE7] uppercase">
            Our Clothes Collection
          </h1>
          <p className="text-[#C7A9A3] text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Explore all our modern clothes for men and women in Kigali.
            High quality fabrics, comfortable styles, and affordable prices.
          </p>
        </motion.div>
      </section>

      {/* 3D Runway Perspective */}
      <section className="w-full relative py-16 sm:py-20 border-b border-white/10 overflow-hidden bg-[#0e0c0e]">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[#E8D2C4] text-xs font-medium tracking-widest uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>3D Outfit View</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-light text-[#F7EFE7]">
            Featured Outfits
          </h2>
        </motion.div>

        <Hero
          outfits={OUTFITS}
          currentIndex={currentIndex}
          onSelectIndex={handleSelectIndex}
          onOpenDetail={handleOpenDetail}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      </section>

      {/* Curated Grid */}
      <CuratedGrid
        outfits={OUTFITS}
        onOpenDetail={handleOpenDetail}
        onAddToCart={handleAddToCart}
      />

      {/* Footer */}
      <NewsletterFooter />

      {/* Detail Modal */}
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
                  <h3 className="text-lg font-medium text-[#F7EFE7] tracking-tight">Your Atelier Bag</h3>
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
                  <p className="text-sm font-light">Your acquisition bag is currently empty.</p>
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
                          showToast("Item removed from bag");
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
                  <span className="text-[#C7A9A3]">Complimentary White-Glove Courier</span>
                  <span className="text-[#E8D2C4] font-bold">Included</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    showToast("Redirecting to private checkout salon...");
                  }}
                  className="w-full py-3.5 rounded-md bg-[#E8D2C4] hover:bg-[#F7EFE7] text-[#0B090A] font-bold text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Private Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#0B090A]" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B090A]/95 border border-[#E8D2C4]/40 px-4 py-2.5 rounded-md flex items-center gap-2 text-xs font-medium text-[#F7EFE7] shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
          <Check className="w-3.5 h-3.5 text-[#E8D2C4]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </main>
  );
}
