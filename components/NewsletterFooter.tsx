"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Phone, Mail, MapPin, X } from "lucide-react";

export function NewsletterFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [legalModal, setLegalModal] = useState<"privacy" | "terms" | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 3500);
    }
  };

  return (
    <footer id="newsletter" className="w-full relative border-t border-white/10 bg-[#0B090A] text-[#C7A9A3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Simple & Clean Newsletter Box */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <h3 className="text-xl sm:text-2xl font-light text-[#F7EFE7] tracking-tight">
              Stay in Touch
            </h3>
            <p className="text-xs sm:text-sm text-[#C7A9A3] mt-1 font-light">
              Get updates on new clothes and special offers in Kigali.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full md:w-auto flex items-center gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address..."
              className="w-full md:w-72 px-4 py-2.5 rounded-md bg-[#120F12] border border-white/15 text-[#F7EFE7] placeholder-[#C7A9A3]/60 text-xs focus:outline-none focus:border-[#E8D2C4] transition-colors"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-md bg-[#E8D2C4] hover:bg-[#F7EFE7] text-[#0B090A] font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              {subscribed ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Joined</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Clean, Minimal 3-Column Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-10 border-b border-white/10 text-xs">
          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#F7EFE7] tracking-wider uppercase text-[11px]">
              Navigation
            </h4>
            <div className="flex flex-col space-y-2">
              <Link href="/" className="hover:text-[#E8D2C4] transition-colors">
                Home
              </Link>
              <Link href="/collections" className="hover:text-[#E8D2C4] transition-colors">
                All Clothes
              </Link>
              <Link href="/book-now" className="hover:text-[#E8D2C4] transition-colors">
                Book Fitting
              </Link>
              <Link href="/contact-us" className="hover:text-[#E8D2C4] transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Stores in Kigali */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#F7EFE7] tracking-wider uppercase text-[11px] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E8D2C4]" />
              <span>Stores in Kigali</span>
            </h4>
            <div className="space-y-1.5 text-[#C7A9A3]">
              <p>
                <strong className="text-[#F7EFE7] font-medium">Kigali Heights</strong> &bull; Kimihurura
              </p>
              <p>
                <strong className="text-[#F7EFE7] font-medium">City Center</strong> &bull; Nyarugenge
              </p>
              <p>
                <strong className="text-[#F7EFE7] font-medium">Remera</strong> &bull; Near Gisimenti
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#F7EFE7] tracking-wider uppercase text-[11px]">
              Customer Care
            </h4>
            <div className="space-y-2 text-[#C7A9A3]">
              <a
                href="tel:+250788123456"
                className="hover:text-[#E8D2C4] transition-colors flex items-center gap-2 text-[#F7EFE7]"
              >
                <Phone className="w-3.5 h-3.5 text-[#E8D2C4]" />
                <span>+250 788 123 456</span>
              </a>
              <a
                href="mailto:support@kigalifashion.rw"
                className="hover:text-[#E8D2C4] transition-colors flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5 text-[#E8D2C4]" />
                <span>support@kigalifashion.rw</span>
              </a>
              <p className="text-[11px] text-[#C7A9A3]/70 pt-1">
                Fast delivery across Kigali &amp; Rwanda
              </p>
            </div>
          </div>
        </div>

        {/* Clean Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#C7A9A3]">
          <p>&copy; 2026 Kigali Modern Fashion. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setLegalModal("privacy")}
              className="hover:text-[#F7EFE7] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setLegalModal("terms")}
              className="hover:text-[#F7EFE7] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span className="text-[#E8D2C4] font-medium">Rwanda &bull; RWF</span>
          </div>
        </div>
      </div>

      {/* Simple Legal Modals */}
      <AnimatePresence>
        {legalModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-md bg-[#120F12] border border-white/15 rounded-md p-6 text-[#F7EFE7] shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-[#C7A9A3] hover:text-[#F7EFE7]"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-base font-semibold text-[#E8D2C4] mb-3">
                {legalModal === "privacy" ? "Privacy Policy" : "Terms of Service"}
              </h3>

              <div className="text-xs text-[#C7A9A3] space-y-2 leading-relaxed font-light">
                {legalModal === "privacy" ? (
                  <>
                    <p>
                      We protect your personal information. Your name, phone number, and delivery address in Rwanda are used only to process your orders.
                    </p>
                    <p>We do not share your details with third parties.</p>
                  </>
                ) : (
                  <>
                    <p>
                      Clothes can be exchanged for size within 7 days in unwashed condition at any of our Kigali stores.
                    </p>
                    <p>Payment is accepted via Mobile Money (MoMo) or Cash on delivery in Kigali.</p>
                  </>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => setLegalModal(null)}
                  className="px-4 py-1.5 rounded-md bg-[#E8D2C4] text-[#0B090A] font-semibold text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
