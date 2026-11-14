"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  User,
  ShoppingBag,
  Layers,
  Calendar,
  Mail,
  Home,
} from "lucide-react";
import { OutfitItem } from "@/data/outfits";

interface ECommerceHeaderProps {
  currentOutfit?: OutfitItem;
  currentIndex?: number;
  totalOutfits?: number;
  onPrev?: () => void;
  onNext?: () => void;
  cartCount?: number;
  wishlistCount?: number;
  onOpenCart?: () => void;
  onOpenWishlist?: () => void;
  onOpenProfile?: () => void;
}

export function Header({
  cartCount = 0,
  wishlistCount = 0,
  onOpenCart = () => {},
  onOpenWishlist = () => {},
  onOpenProfile = () => {},
}: ECommerceHeaderProps) {
  return (
    <motion.aside
      aria-label="Navigation Dock"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-60 select-none"
    >
      <nav className="flex flex-col items-center gap-2.5 p-2 bg-black/95 border border-white/10 rounded-md shadow-[0_12px_40px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
        {/* Brand Home Icon */}
        <motion.div whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }} className="relative group">
          <Link
            href="/"
            title="Kigali Fashion Home"
            aria-label="Kigali Fashion Home"
            className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[#E8D2C4] hover:text-[#F7EFE7] transition-all relative cursor-pointer border border-white/10 hover:border-[#E8D2C4]/60 flex items-center justify-center"
          >
            <Home className="w-4 h-4 text-[#E8D2C4]" />
          </Link>
          <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-[#120F12] border border-white/15 text-[11px] font-medium text-[#F7EFE7] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl whitespace-nowrap z-50">
            Home
          </span>
        </motion.div>

        {/* Subtle Divider */}
        <div className="w-5 h-px bg-white/15 my-0.5" />

        {/* Collections */}
        <motion.div whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }} className="relative group">
          <Link
            href="/collections"
            title="All Clothes"
            aria-label="All Clothes"
            className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[#C7A9A3] hover:text-[#F7EFE7] transition-all relative cursor-pointer border border-white/10 hover:border-[#E8D2C4]/60 flex items-center justify-center"
          >
            <Layers className="w-4 h-4 group-hover:text-[#E8D2C4] transition-colors" />
          </Link>
          <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-[#120F12] border border-white/15 text-[11px] font-medium text-[#F7EFE7] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl whitespace-nowrap z-50">
            Clothes
          </span>
        </motion.div>

        {/* Book Now Page Link */}
        <motion.div whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }} className="relative group">
          <Link
            href="/book-now"
            title="Book Store Visit"
            aria-label="Book Store Visit"
            className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[#C7A9A3] hover:text-[#F7EFE7] transition-all relative cursor-pointer border border-white/10 hover:border-[#E8D2C4]/60 flex items-center justify-center"
          >
            <Calendar className="w-4 h-4 group-hover:text-[#E8D2C4] transition-colors" />
          </Link>
          <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-[#120F12] border border-white/15 text-[11px] font-medium text-[#F7EFE7] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl whitespace-nowrap z-50">
            Book Visit
          </span>
        </motion.div>

        {/* Contact Us Page Link */}
        <motion.div whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }} className="relative group">
          <Link
            href="/contact-us"
            title="Contact Us"
            aria-label="Contact Us"
            className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[#C7A9A3] hover:text-[#F7EFE7] transition-all relative cursor-pointer border border-white/10 hover:border-[#E8D2C4]/60 flex items-center justify-center"
          >
            <Mail className="w-4 h-4 group-hover:text-[#E8D2C4] transition-colors" />
          </Link>
          <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-[#120F12] border border-white/15 text-[11px] font-medium text-[#F7EFE7] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl whitespace-nowrap z-50">
            Contact
          </span>
        </motion.div>

        {/* Subtle Divider */}
        <div className="w-5 h-px bg-white/15 my-0.5" />

        {/* Saved Looks / Wishlist */}
        <motion.div whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }} className="relative group">
          <button
            type="button"
            onClick={onOpenWishlist}
            aria-label="Saved Items"
            title="Saved Items"
            className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[#C7A9A3] hover:text-[#F7EFE7] transition-all relative cursor-pointer border border-white/10 hover:border-[#E8D2C4]/60 flex items-center justify-center"
          >
            <Heart
              className={`w-4 h-4 ${
                wishlistCount > 0 ? "fill-[#E8D2C4] text-[#E8D2C4]" : "text-[#C7A9A3]"
              }`}
            />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E8D2C4] text-[#0B090A] text-[9px] font-bold rounded-full flex items-center justify-center shadow-md">
                {wishlistCount}
              </span>
            )}
          </button>
          <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-[#120F12] border border-white/15 text-[11px] font-medium text-[#F7EFE7] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl whitespace-nowrap z-50">
            Saved {wishlistCount > 0 ? `(${wishlistCount})` : ""}
          </span>
        </motion.div>

        {/* Shopping Cart */}
        <motion.div whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }} className="relative group">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label="Shopping Cart"
            title="Shopping Cart"
            className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[#C7A9A3] hover:text-[#F7EFE7] transition-all relative cursor-pointer border border-white/10 hover:border-[#E8D2C4]/60 flex items-center justify-center"
          >
            <ShoppingBag className="w-4 h-4 text-[#C7A9A3] hover:text-[#E8D2C4]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E8D2C4] text-[#0B090A] text-[9px] font-bold rounded-full flex items-center justify-center shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
          <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-[#120F12] border border-white/15 text-[11px] font-medium text-[#F7EFE7] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl whitespace-nowrap z-50">
            Cart {cartCount > 0 ? `(${cartCount})` : ""}
          </span>
        </motion.div>

        {/* User Account */}
        <motion.div whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }} className="relative group">
          <button
            type="button"
            onClick={onOpenProfile}
            aria-label="My Account"
            title="My Account"
            className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[#C7A9A3] hover:text-[#F7EFE7] transition-all cursor-pointer border border-white/10 hover:border-[#E8D2C4]/60 flex items-center justify-center"
          >
            <User className="w-4 h-4 text-[#C7A9A3] hover:text-[#E8D2C4]" />
          </button>
          <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-[#120F12] border border-white/15 text-[11px] font-medium text-[#F7EFE7] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl whitespace-nowrap z-50">
            Account
          </span>
        </motion.div>
      </nav>
    </motion.aside>
  );
}