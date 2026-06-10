"use client";

import Link from "next/link";
import Image from "next/image";

import {
  MapPin,
  ArrowRight,
  Star,
  Plane,
  Hotel,
  Globe2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const destinations = [
  {
    title: "Makkah",
    slug: "makkah",
    image:
      "https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1600&auto=format&fit=crop",
    packages: "24 Packages",
    price: "From ₦1.8M",
    rating: "4.9",
    hotels: "5 Star Hotels",
    flights: "Direct Flights",
    description:
      "Premium Umrah & spiritual journeys with VIP transportation and luxury accommodation.",
  },
  {
    title: "Dubai",
    slug: "dubai",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop",
    packages: "18 Packages",
    price: "From ₦2.2M",
    rating: "4.8",
    hotels: "Luxury Resorts",
    flights: "Emirates & Qatar",
    description:
      "Luxury Dubai tours, desert safari, Burj Khalifa and premium shopping experiences.",
  },
  {
    title: "Turkey",
    slug: "turkey",
    image:
      "https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=1600&auto=format&fit=crop",
    packages: "12 Packages",
    price: "From ₦2.5M",
    rating: "4.7",
    hotels: "Boutique Hotels",
    flights: "Turkish Airlines",
    description:
      "Explore Istanbul, Cappadocia and breathtaking historical destinations in comfort.",
  },
];

export default function Destinations() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-28">
      {/* Premium background orbs */}
      <div className="absolute inset-0">
        <div className="absolute left-[-150px] top-[-150px] h-[400px] w-[400px] rounded-full bg-gradient-to-br from-emerald-300/15 via-teal-300/10 to-transparent blur-3xl" />
        <div className="absolute bottom-[-100px] right-[-100px] h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-blue-300/10 to-emerald-300/15 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200/5 blur-3xl" />
      </div>

      <div className="container-custom relative">
        {/* HEADER – Premium elevated */}
        <div className="mb-20 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-5 py-2.5 shadow-sm backdrop-blur-sm">
              <Sparkles size={18} className="text-emerald-600" />
              <span className="text-sm font-bold uppercase tracking-wide text-emerald-700">
                Exotic Destinations
              </span>
            </div>
            <h2 className="max-w-4xl text-5xl font-black leading-tight tracking-tight text-slate-900 lg:text-6xl">
              Explore The World's Most
              <span className="block bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                Cherished Travel Destinations
              </span>
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
              Discover premium Umrah, luxury tours, flights, and unforgettable
              travel experiences – carefully crafted for comfort, spirituality,
              and excellence.
            </p>
          </div>

          <Link
            href="/packages"
            className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-7 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 hover:shadow-xl"
          >
            View All Packages
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* GRID – Premium cards */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {destinations.map((item, idx) => (
            <Link
              key={item.title}
              href={`/packages?destination=${item.slug}`}
              className="group block transition-all duration-500 hover:-translate-y-3"
            >
              <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-100/50">
                {/* IMAGE CONTAINER */}
                <div className="relative h-[380px] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-cover transition duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                  {/* Top badges – premium styling */}
                  <div className="absolute left-5 top-5 flex gap-2">
                    <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-md backdrop-blur-sm">
                      <Star size={14} className="fill-amber-400 text-amber-400" />
                      <span className="text-sm font-bold text-slate-800">
                        {item.rating}
                      </span>
                    </div>
                    <div className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-md">
                      Premium
                    </div>
                  </div>

                  {/* Bottom floating info */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="mb-2 flex items-center gap-1.5 text-white/90">
                      <MapPin size={16} />
                      <span className="text-sm font-medium tracking-wide">
                        {item.title}
                      </span>
                    </div>
                    <h3 className="text-4xl font-black text-white drop-shadow-lg">
                      {item.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-base leading-relaxed text-white/80">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* CARD BODY */}
                <div className="p-6">
                  {/* Feature chips */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 transition-colors group-hover:bg-emerald-50">
                      <Hotel size={18} className="text-emerald-600" />
                      <span className="text-sm font-semibold text-slate-700">
                        {item.hotels}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 transition-colors group-hover:bg-emerald-50">
                      <Plane size={18} className="text-emerald-600" />
                      <span className="text-sm font-semibold text-slate-700">
                        {item.flights}
                      </span>
                    </div>
                  </div>

                  {/* Pricing row */}
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Available Packages
                      </p>
                      <p className="text-xl font-black text-slate-800">
                        {item.packages}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Starting Price
                      </p>
                      <p className="text-2xl font-black text-emerald-600">
                        {item.price}
                      </p>
                    </div>
                  </div>

                  {/* Explore button – premium */}
                  <div className="mt-6 flex cursor-pointer items-center justify-between rounded-xl border border-slate-100 bg-white px-5 py-4 transition-all group-hover:border-emerald-200 group-hover:bg-emerald-50/50">
                    <span className="font-bold text-slate-700 group-hover:text-emerald-700">
                      Explore Destination
                    </span>
                    <div className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 p-2.5 text-white shadow-md transition-all group-hover:translate-x-1">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}