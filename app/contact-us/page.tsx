"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { NewsletterFooter } from "@/components/NewsletterFooter";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Check,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function ContactUsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Order & Delivery Question");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setIsSent(true);
    }
  };

  const stores = [
    {
      city: "Kigali Heights Showroom",
      address: "KG 7 Ave, Kimihurura",
      postal: "Gasabo, Kigali, Rwanda",
      phone: "+250 788 123 456",
      email: "info@fashion.rw",
      hours: "Mon – Sat: 8:30 AM – 8:00 PM",
    },
    {
      city: "City Center Store",
      address: "KN 2 Ave, Nyarugenge",
      postal: "Downtown Kigali, Rwanda",
      phone: "+250 788 654 321",
      email: "citycenter@fashion.rw",
      hours: "Mon – Sat: 8:00 AM – 7:30 PM",
    },
    {
      city: "Remera Store",
      address: "KG 11 Ave, Remera",
      postal: "Near Gisimenti, Kigali",
      phone: "+250 790 112 233",
      email: "remera@fashion.rw",
      hours: "Mon – Sun: 9:00 AM – 9:00 PM",
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#0B090A] text-[#F7EFE7] font-sans">
      <Header />

      {/* Hero Header */}
      <section className="relative w-full py-16 sm:py-24 border-b border-white/10 bg-linear-to-b from-[#141013] to-[#0B090A] px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white/5 border border-white/10 text-[#E8D2C4] text-xs font-medium tracking-[0.2em] uppercase">
            <Mail className="w-3.5 h-3.5 text-[#E8D2C4]" />
            <span>Customer Support</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-[#F7EFE7] uppercase">
            Contact Us
          </h1>
          <p className="text-[#C7A9A3] text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Have questions about sizes, clothes, or delivery in Kigali and Rwanda? Reach out to us directly or visit any of our stores.
          </p>
        </div>
      </section>

      {/* Stores & Contact Form Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Stores Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stores.map((store, idx) => (
            <div
              key={idx}
              className="bg-[#120F12] border border-white/10 rounded-md p-6 hover:border-[#E8D2C4]/40 transition-all shadow-lg space-y-3"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 border border-[#E8D2C4]/30 flex items-center justify-center text-[#E8D2C4] mb-2">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-semibold text-[#F7EFE7]">{store.city}</h3>
              <p className="text-xs text-[#C7A9A3] leading-relaxed">
                {store.address}
                <br />
                {store.postal}
              </p>
              <div className="pt-2 border-t border-white/10 space-y-1.5 text-xs text-[#C7A9A3]">
                <p className="flex items-center gap-2 text-[#F7EFE7]">
                  <Phone className="w-3.5 h-3.5 text-[#E8D2C4]" />
                  <a href={`tel:${store.phone}`} className="hover:text-[#E8D2C4] transition-colors">
                    {store.phone}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#E8D2C4]" />
                  <a href={`mailto:${store.email}`} className="hover:text-[#E8D2C4] transition-colors">
                    {store.email}
                  </a>
                </p>
                <p className="flex items-center gap-2 text-[11px] text-[#C7A9A3]">
                  <Clock className="w-3.5 h-3.5 text-[#E8D2C4]" />
                  <span>{store.hours}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Form Container */}
        <div className="bg-[#120F12] border border-white/10 rounded-md p-8 sm:p-12 shadow-2xl">
          {isSent ? (
            <div className="max-w-md mx-auto text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#E8D2C4]/20 border border-[#E8D2C4] mx-auto flex items-center justify-center text-[#E8D2C4]">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-light text-[#F7EFE7]">Message Sent!</h3>
              <p className="text-xs text-[#C7A9A3] leading-relaxed">
                Murakoze, <strong className="text-[#F7EFE7]">{name}</strong>. We have received your message and our team will get back to you shortly via WhatsApp or email.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSent(false);
                  setMessage("");
                }}
                className="mt-4 px-6 py-2.5 rounded-md bg-[#E8D2C4] text-[#0B090A] font-bold text-xs uppercase tracking-wider hover:bg-[#F7EFE7] transition-all cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <span className="text-xs uppercase tracking-[0.2em] text-[#E8D2C4] font-semibold">
                  Send a Message
                </span>
                <h2 className="text-2xl sm:text-3xl font-light text-[#F7EFE7] mt-1">
                  How Can We Help You?
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C7A9A3] mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jean Claude"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-md bg-black/60 border border-white/15 text-[#F7EFE7] text-sm placeholder-[#C7A9A3]/50 focus:outline-none focus:border-[#E8D2C4]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C7A9A3] mb-1.5">
                    Email Address or Phone
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="email@example.com or +250 788..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-md bg-black/60 border border-white/15 text-[#F7EFE7] text-sm placeholder-[#C7A9A3]/50 focus:outline-none focus:border-[#E8D2C4]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C7A9A3] mb-1.5">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-black/60 border border-white/15 text-[#F7EFE7] text-sm focus:outline-none focus:border-[#E8D2C4]"
                >
                  <option value="Order & Delivery Question">Order &amp; Delivery Question</option>
                  <option value="Size & Fitting Inquiry">Size &amp; Fitting Inquiry</option>
                  <option value="Custom Tailoring Request">Custom Tailoring Request</option>
                  <option value="Wholesale or Partnership">General Question</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C7A9A3] mb-1.5">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what you need or ask any questions about our clothes..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-black/60 border border-white/15 text-[#F7EFE7] text-sm placeholder-[#C7A9A3]/50 focus:outline-none focus:border-[#E8D2C4]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-[#C7A9A3]">
                  <ShieldCheck className="w-4 h-4 text-[#E8D2C4]" />
                  <span>Fast Response via WhatsApp or Email</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-10 py-3.5 rounded-md bg-[#E8D2C4] hover:bg-[#F7EFE7] text-[#0B090A] font-bold text-xs uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Send Message</span>
                  <ArrowRight className="w-4 h-4 text-[#0B090A]" />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <NewsletterFooter />
    </main>
  );
}
