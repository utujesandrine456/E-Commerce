"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { NewsletterFooter } from "@/components/NewsletterFooter";
import {
  Calendar,
  MapPin,
  Check,
  ShieldCheck,
  Scissors,
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react";

export default function BookNowPage() {
  const [salon, setSalon] = useState("kigali-heights");
  const [service, setService] = useState("fitting");
  const [date, setDate] = useState("2026-11-20");
  const [time, setTime] = useState("14:00");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setIsBooked(true);
    }
  };

  const storeLocations = [
    {
      id: "kigali-heights",
      name: "Kigali Heights Store",
      address: "KG 7 Ave, Kimihurura, Kigali",
      city: "Kigali, Rwanda",
      tag: "Main Showroom",
    },
    {
      id: "nyarugenge",
      name: "City Center Store",
      address: "KN 2 Ave, Nyarugenge, Kigali",
      city: "Kigali, Rwanda",
      tag: "Downtown Branch",
    },
    {
      id: "remera",
      name: "Remera Store",
      address: "KG 11 Ave, Remera, Kigali",
      city: "Kigali, Rwanda",
      tag: "Near Gisimenti",
    },
  ];

  const storeServices = [
    {
      id: "fitting",
      title: "Outfit Fitting & Sizing",
      duration: "30 minutes",
      description: "Try on your favorite clothes, get measured, and make sure your outfit fits you comfortably.",
    },
    {
      id: "custom",
      title: "Tailoring & Adjustments",
      duration: "45 minutes",
      description: "Have your dresses, trousers, or shirts adjusted by our tailor to match your exact size.",
    },
    {
      id: "personal-shopping",
      title: "Event Outfit Consultation",
      duration: "60 minutes",
      description: "Get personalized outfit suggestions for weddings, church ceremonies, graduations, or parties.",
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#0B090A] text-[#F7EFE7] font-sans">
      <Header />

      {/* Hero Header */}
      <section className="relative w-full py-16 sm:py-24 border-b border-white/10 bg-linear-to-b from-[#141013] to-[#0B090A] px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white/5 border border-white/10 text-[#E8D2C4] text-xs font-medium tracking-[0.2em] uppercase">
            <Calendar className="w-3.5 h-3.5 text-[#E8D2C4]" />
            <span>Store Appointment</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-[#F7EFE7] uppercase">
            Book Store Visit &amp; Fitting
          </h1>
          <p className="text-[#C7A9A3] text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Book a free appointment to visit our stores in Kigali. Try on outfits, get tailored alterations, or get styling advice.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {isBooked ? (
          <div className="max-w-2xl mx-auto bg-[#120F12] border border-[#E8D2C4]/40 rounded-md p-8 sm:p-12 text-center shadow-2xl space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#E8D2C4]/20 border border-[#E8D2C4] mx-auto flex items-center justify-center text-[#E8D2C4]">
              <Check className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-light text-[#F7EFE7] tracking-tight">
              Appointment Confirmed!
            </h2>
            <p className="text-sm text-[#C7A9A3] leading-relaxed max-w-md mx-auto">
              Murakoze <strong className="text-[#F7EFE7]">{name}</strong>, your visit has been booked. We will message you on WhatsApp or call you at <strong className="text-[#E8D2C4]">{phone || email}</strong> before your visit.
            </p>

            <div className="p-4 rounded-md bg-white/5 border border-white/10 text-xs text-[#C7A9A3] text-left space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span>Store Location:</span>
                <span className="text-[#F7EFE7] font-medium">{storeLocations.find((s) => s.id === salon)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Service:</span>
                <span className="text-[#F7EFE7] font-medium">{storeServices.find((s) => s.id === service)?.title}</span>
              </div>
              <div className="flex justify-between">
                <span>Date &amp; Time:</span>
                <span className="text-[#E8D2C4] font-semibold">{date} &bull; {time}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/collections"
                className="w-full sm:w-auto px-6 py-3 rounded-md bg-[#E8D2C4] text-[#0B090A] font-bold text-xs uppercase tracking-wider hover:bg-[#F7EFE7] transition-all"
              >
                View Clothes
              </Link>
              <button
                type="button"
                onClick={() => setIsBooked(false)}
                className="w-full sm:w-auto px-6 py-3 rounded-md bg-white/5 border border-white/10 text-[#F7EFE7] hover:bg-white/10 text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Book Another Visit
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Step 1: Select Store Location */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#E8D2C4] text-[#0B090A] text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="text-lg font-medium text-[#F7EFE7]">Choose Store Location in Kigali</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {storeLocations.map((item) => {
                  const isSelected = salon === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSalon(item.id)}
                      className={`p-5 rounded-md border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-[#181316] border-[#E8D2C4] shadow-lg ring-1 ring-[#E8D2C4]/40"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <span className="text-[10px] uppercase tracking-wider text-[#E8D2C4] font-semibold">
                        {item.tag}
                      </span>
                      <h4 className="text-base font-semibold text-[#F7EFE7] mt-1">{item.name}</h4>
                      <p className="text-xs text-[#C7A9A3] mt-2 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#E8D2C4]" />
                        <span>{item.address}</span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Service */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#E8D2C4] text-[#0B090A] text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="text-lg font-medium text-[#F7EFE7]">Choose Service</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {storeServices.map((item) => {
                  const isSelected = service === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setService(item.id)}
                      className={`p-5 rounded-md border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-[#181316] border-[#E8D2C4] shadow-lg ring-1 ring-[#E8D2C4]/40"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs text-[#E8D2C4] font-semibold">
                        <span className="flex items-center gap-1">
                          <Scissors className="w-3.5 h-3.5" />
                          <span>Service</span>
                        </span>
                        <span>{item.duration}</span>
                      </div>
                      <h4 className="text-base font-semibold text-[#F7EFE7] mt-2">{item.title}</h4>
                      <p className="text-xs text-[#C7A9A3] mt-2 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Date, Time & Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-white/10">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[#E8D2C4] text-[#0B090A] text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h3 className="text-lg font-medium text-[#F7EFE7]">Choose Date &amp; Time</h3>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C7A9A3] mb-1.5">
                    Visit Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-md bg-[#120F12] border border-white/15 text-[#F7EFE7] text-sm focus:outline-none focus:border-[#E8D2C4]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C7A9A3] mb-1.5">
                    Time of Visit
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-md bg-[#120F12] border border-white/15 text-[#F7EFE7] text-sm focus:outline-none focus:border-[#E8D2C4]"
                  >
                    <option value="10:00">10:00 AM &bull; Morning</option>
                    <option value="12:00">12:00 PM &bull; Midday</option>
                    <option value="14:00">02:00 PM &bull; Afternoon</option>
                    <option value="16:00">04:00 PM &bull; Late Afternoon</option>
                    <option value="18:00">06:00 PM &bull; Evening</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[#E8D2C4] text-[#0B090A] text-xs font-bold flex items-center justify-center">
                    4
                  </span>
                  <h3 className="text-lg font-medium text-[#F7EFE7]">Your Contact Information</h3>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C7A9A3] mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marie Uwase"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-md bg-[#120F12] border border-white/15 text-[#F7EFE7] text-sm placeholder-[#C7A9A3]/50 focus:outline-none focus:border-[#E8D2C4]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C7A9A3] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-md bg-[#120F12] border border-white/15 text-[#F7EFE7] text-sm placeholder-[#C7A9A3]/50 focus:outline-none focus:border-[#E8D2C4]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C7A9A3] mb-1.5">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+250 788 123 456"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-md bg-[#120F12] border border-white/15 text-[#F7EFE7] text-sm placeholder-[#C7A9A3]/50 focus:outline-none focus:border-[#E8D2C4]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C7A9A3] mb-1.5">
                    Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Looking for a blue dress for a wedding..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-md bg-[#120F12] border border-white/15 text-[#F7EFE7] text-sm placeholder-[#C7A9A3]/50 focus:outline-none focus:border-[#E8D2C4]"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#C7A9A3]">
                <ShieldCheck className="w-4 h-4 text-[#E8D2C4]" />
                <span>Free Fitting &bull; No Obligation to Buy</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-4 rounded-md bg-[#E8D2C4] hover:bg-[#F7EFE7] text-[#0B090A] font-bold text-xs uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm Appointment</span>
                <ArrowRight className="w-4 h-4 text-[#0B090A]" />
              </button>
            </div>
          </form>
        )}
      </section>

      <NewsletterFooter />
    </main>
  );
}
