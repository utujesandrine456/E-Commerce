"use client";

import React, { useState } from "react";
import { Paperclip, Heart, User } from "lucide-react";

interface LeftDockProps {
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenProfile: () => void;
}

export function LeftHeader({ wishlistCount, onOpenWishlist, onOpenProfile }: LeftDockProps) {
  const [hasPinned, setHasPinned] = useState(false);

  return (
    <aside
      aria-label="Quick Actions Dock"
      className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center"
    >
      <div className="glass-pill flex flex-col items-center gap-5 px-2.5 py-4 rounded-full shadow-2xl transition-all duration-300">
        <button
          type="button"
          onClick={() => setHasPinned(!hasPinned)}
          aria-label="Pin Lookbook"
          title="Pin Lookbook"
          className={`p-2 rounded-full transition-all duration-300 ${
            hasPinned
              ? "bg-amber-500/20 text-amber-300 ring-1 ring-amber-400/40"
              : "text-zinc-300 hover:text-white hover:bg-white/10"
          }`}
        >
          <Paperclip className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onOpenWishlist}
          aria-label="View Wishlist"
          title="Saved Pieces"
          className="p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-all duration-300 relative"
        >
          <Heart className={`w-4 h-4 ${wishlistCount > 0 ? "fill-rose-500 text-rose-500" : ""}`} />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={onOpenProfile}
          aria-label="Atelier Profile"
          title="Atelier Profile"
          className="p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-all duration-300"
        >
          <User className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}

