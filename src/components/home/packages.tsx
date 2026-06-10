"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  Plane,
  Hotel,
  ArrowRight,
  ShieldCheck,
  Star,
  Globe2,
  Users,
  Crown,
  Filter,
  X,
} from "lucide-react";
import { getPackages } from "@/src/services/package-service";

export default function PackagesPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    async function fetchPackages() {
      try {
        const data = await getPackages();
        setPackages(data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchPackages();
  }, []);

  // Extract unique categories from packages
  const categories = useMemo(() => {
    const cats = packages.map((pkg) => pkg.category).filter(Boolean);
    return ["All", ...Array.from(new Set(cats))];
  }, [packages]);

  const filteredPackages = useMemo(() => {
    if (activeCategory === "All") return packages;
    return packages.filter((pkg) => pkg.category === activeCategory);
  }, [packages, activeCategory]);

  // Helper for safe number formatting
  const safeNumber = (value: any, defaultValue = 0) => {
    const num = Number(value);
    return isNaN(num) ? defaultValue : num;
  };

  return (
    <main className="min-h-screen bg-[#fef7e8]">
      {/* =========================
         VINTAGE HERO SECTION – FIXED
      ========================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2e241f] via-[#3a2c24] to-[#1c1814] py-28 text-[#ece2d4]">
        {/* Fixed pattern overlay – no quote errors */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' width='80' height='80'%3E%3Cpath fill='%23d9a13b' d='M40 0L50 12L40 24L30 12L40 0zM0 40L12 30L24 40L12 50L0 40zM80 40L68 30L56 40L68 50L80 40zM40 80L50 68L40 56L30 68L40 80z'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
        
        {/* Optional texture – safe fallback */}
        <div className="absolute inset-0 opacity-20 mix-blend-multiply" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")` }}
        />
        
        <div className="container-custom relative z-10">
          <div className="max-w-5xl">
            {/* Vintage badge */}
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#d9a13b]/40 bg-[#2e241f]/80 px-6 py-2.5 backdrop-blur-sm shadow-lg">
              <Crown size={18} className="text-[#d9a13b]" />
              <span className="font-serif text-sm font-bold tracking-wide text-[#d9a13b]">
                EST. 2020 • TIMELESS TRAVEL
              </span>
            </div>

            <h1 className="font-serif text-6xl font-black leading-tight tracking-tight text-[#fef7e8] drop-shadow-xl md:text-7xl lg:text-8xl">
              Discover Premium
              <span className="block bg-gradient-to-r from-[#d9a13b] via-[#e8c47f] to-[#b8860b] bg-clip-text text-transparent">
                Vintage Journeys
              </span>
            </h1>

            <p className="mt-6 max-w-3xl font-sans text-xl leading-relaxed text-[#d6cfb8]">
              Curated Umrah, Hajj, and global escapes – wrapped in old‑world elegance, 
              modern comfort, and impeccable service. Each package tells a story.
            </p>

            {/* Vintage filter chips with active state */}
            <div className="mt-12 flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-6 py-2.5 font-serif text-sm font-semibold tracking-wide backdrop-blur transition-all ${
                    activeCategory === category
                      ? "border-[#d9a13b] bg-[#d9a13b] text-[#1c1814] shadow-lg"
                      : "border-[#d9a13b]/40 bg-[#2e241f]/60 text-[#ece2d4] hover:border-[#d9a13b] hover:bg-[#d9a13b] hover:text-[#1c1814]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================
         PACKAGES GRID – VINTAGE PRO MAX
      ========================= */}
      <section className="py-28">
        <div className="container-custom">
          {/* Section header with antique flair */}
          <div className="mb-20 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#e6e4d9] px-5 py-2 text-sm font-bold text-[#b8860b] shadow-inner">
              <Globe2 size={18} className="text-[#b8860b]" />
              <span className="font-serif tracking-wide">THE GRAND COLLECTION</span>
            </div>
            <h2 className="font-serif text-5xl font-black italic tracking-tight text-[#2e241f] md:text-6xl">
              Our Finest Packages
            </h2>
            <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#d9a13b] to-[#b8860b]" />
            <p className="mt-6 max-w-2xl font-sans text-lg text-[#5a4a3a]">
              Handpicked for the discerning traveler – where heritage meets horizon.
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#e6e4d9] border-t-[#d9a13b]" />
              <p className="mt-6 font-serif text-2xl font-bold text-[#b8860b]">Unfolding vintage experiences...</p>
            </div>
          )}

          {/* No packages */}
          {!loading && filteredPackages.length === 0 && (
            <div className="rounded-[48px] border border-[#e2d5bd] bg-[#fffbf2] p-20 text-center shadow-xl">
              <h2 className="font-serif text-4xl font-black text-[#2e241f]">No Packages Found</h2>
              <p className="mt-3 font-sans text-[#8b7355]">Try a different category or check back later.</p>
              <button
                onClick={() => setActiveCategory("All")}
                className="mt-6 rounded-full bg-[#b8860b] px-6 py-3 font-serif font-bold text-[#fef7e8] transition hover:bg-[#d9a13b]"
              >
                View All Packages
              </button>
            </div>
          )}

          {/* Package grid */}
          {!loading && filteredPackages.length > 0 && (
            <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-3">
              {filteredPackages.map((item, idx) => {
                const totalSlots = safeNumber(item.total_slots, 1);
                const bookedSlots = safeNumber(item.booked_slots);
                const spotsLeft = totalSlots - bookedSlots;
                const progress = (bookedSlots / totalSlots) * 100;
                const price = safeNumber(item.price);

                return (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-[32px] bg-[#fffbf2] shadow-[0_20px_40px_-12px_rgba(30,20,10,0.15)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_32px_56px_-16px_rgba(15,23,42,0.25)]"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    {/* Vintage border accent */}
                    <div className="absolute inset-0 rounded-[32px] border border-[#e2d5bd] pointer-events-none" />
                    
                    {/* Image container */}
                    <div className="relative h-[320px] overflow-hidden">
                      <Image
                        src={item.image_url || "https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1600&auto=format&fit=crop"}
                        alt={item.title || "Travel package"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1c1814]/80 via-[#1c1814]/20 to-transparent" />
                      
                      {/* Category badge */}
                      <div className="absolute left-6 top-6 rounded-full bg-[#b8860b] px-5 py-2 text-sm font-serif font-bold tracking-wide text-[#fef7e8] shadow-lg">
                        {item.category || "Exclusive"}
                      </div>
                      
                      {/* Price medallion */}
                      <div className="absolute bottom-6 right-6 rounded-xl border border-[#d9a13b]/40 bg-[#fffbf2]/90 px-5 py-2.5 backdrop-blur-sm shadow-lg">
                        <p className="font-serif text-xs uppercase tracking-wider text-[#b8860b]">From</p>
                        <p className="font-serif text-2xl font-black text-[#2e241f]">₦{price.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-7">
                      <h3 className="font-serif text-3xl font-black leading-tight text-[#2e241f]">{item.title || "Untitled Package"}</h3>
                      <p className="mt-4 line-clamp-3 font-sans text-base leading-relaxed text-[#5a4a3a]">{item.description || "Experience luxury travel with premium services."}</p>

                      {/* Travel details */}
                      <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-3 rounded-xl bg-[#efe6d7] px-4 py-3">
                          <Plane size={20} className="text-[#b8860b]" />
                          <span className="font-serif font-semibold text-[#2e241f]">{item.flight_name || "Premium Airline"}</span>
                        </div>
                        <div className="flex items-center gap-3 rounded-xl bg-[#efe6d7] px-4 py-3">
                          <Hotel size={20} className="text-[#b8860b]" />
                          <span className="font-serif font-semibold text-[#2e241f]">{item.hotel_name || "Luxury Hotel"}</span>
                        </div>
                        <div className="flex items-center gap-3 rounded-xl bg-[#efe6d7] px-4 py-3">
                          <CalendarDays size={20} className="text-[#b8860b]" />
                          <span className="font-serif font-semibold text-[#2e241f]">{item.departure_date || "Flexible Dates"}</span>
                        </div>
                      </div>

                      {/* Availability meter */}
                      <div className="mt-8 rounded-2xl border border-[#e2d5bd] bg-gradient-to-br from-[#fef7e8] to-[#fffbf2] p-5">
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users size={20} className="text-[#b8860b]" />
                            <span className="font-serif font-bold text-[#b8860b]">
                              {spotsLeft} spot{spotsLeft !== 1 ? "s" : ""} left
                            </span>
                          </div>
                          <span className="font-sans text-sm text-[#8b7355]">{bookedSlots} booked</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-[#e2d5bd]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#d9a13b] to-[#b8860b] transition-all duration-1000"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                        <div className="mt-2 text-right font-sans text-xs text-[#8b7355]">
                          {bookedSlots} of {totalSlots} claimed
                        </div>
                      </div>

                      {/* Footer CTA */}
                      <div className="mt-8 flex items-center justify-between">
                        <div>
                          <p className="font-serif text-xs uppercase tracking-wider text-[#b8860b]">Starting from</p>
                          <p className="font-serif text-3xl font-black text-[#b8860b]">₦{price.toLocaleString()}</p>
                        </div>
                        <Link
                          href={`/packages/${item.id}`}
                          className="group/btn flex items-center gap-2 rounded-full bg-[#b8860b] px-6 py-3 font-serif font-bold text-[#fef7e8] shadow-lg transition-all hover:bg-[#d9a13b] hover:shadow-xl"
                        >
                          View Journey
                          <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </div>
                    </div>

                    {/* Vintage decorative corner */}
                    <div className="absolute bottom-3 right-3 opacity-20">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4L20 20M20 4L4 20" stroke="#b8860b" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Vintage bottom ornament */}
      <div className="relative mt-12 h-2 w-full bg-gradient-to-r from-transparent via-[#d9a13b] to-transparent" />
    </main>
  );
}