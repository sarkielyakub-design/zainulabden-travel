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
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-28">

      {/* BACKGROUND */}
      <div className="absolute inset-0">

        <div className="absolute left-[-120px] top-0 h-[350px] w-[350px] rounded-full bg-green-300/10 blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] h-[420px] w-[420px] rounded-full bg-emerald-300/10 blur-3xl" />

      </div>

      <div className="container-custom relative">

        {/* HEADER */}
        <div className="mb-20 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-green-100 px-5 py-2 text-sm font-bold text-green-700">

              <Globe2 size={18} />

              Popular Destinations

            </div>

            <h2 className="max-w-4xl text-5xl font-black leading-tight text-slate-900 lg:text-6xl">

              Explore The World's Most
              <span className="block text-green-600">
                Loved Travel Destinations
              </span>

            </h2>

            <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-600">

              Discover premium Umrah,
              luxury tours, flights and
              unforgettable travel experiences
              carefully crafted for comfort,
              spirituality and excellence.

            </p>

          </div>

          {/* CTA */}
          <Link
            href="/packages"
            className="inline-flex items-center gap-3 rounded-2xl bg-green-600 px-8 py-5 text-lg font-bold text-white shadow-lg shadow-green-500/20 transition hover:bg-green-700"
          >

            View All Packages

            <ArrowRight size={22} />

          </Link>

        </div>

        {/* GRID */}
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">

          {destinations.map((item) => (

            <Link
              key={item.title}
              href={`/packages?destination=${item.slug}`}
              className="group block"
            >

              <div className="overflow-hidden rounded-[40px] bg-white shadow-[0_20px_80px_rgba(15,23,42,0.08)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_100px_rgba(15,23,42,0.16)]">

                {/* IMAGE */}
                <div className="relative h-[420px] overflow-hidden">

                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* TOP BADGES */}
                  <div className="absolute left-5 top-5 flex items-center gap-3">

                    {/* RATING */}
                    <div className="rounded-full bg-white/90 px-4 py-2 backdrop-blur">

                      <div className="flex items-center gap-2">

                        <Star
                          size={16}
                          className="fill-yellow-400 text-yellow-400"
                        />

                        <span className="text-sm font-bold text-slate-900">

                          {item.rating}

                        </span>

                      </div>

                    </div>

                    {/* VERIFIED */}
                    <div className="rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white">

                      Verified

                    </div>

                  </div>

                  {/* BOTTOM INFO */}
                  <div className="absolute bottom-6 left-6 right-6">

                    <div className="flex items-center gap-2 text-white">

                      <MapPin size={18} />

                      <span className="font-semibold">
                        {item.title}
                      </span>

                    </div>

                    <h3 className="mt-3 text-5xl font-black text-white">

                      {item.title}

                    </h3>

                    <p className="mt-4 line-clamp-2 text-lg leading-8 text-slate-200">

                      {item.description}

                    </p>

                  </div>

                </div>

                {/* BODY */}
                <div className="p-8">

                  {/* FEATURES */}
                  <div className="grid gap-4 md:grid-cols-2">

                    {/* HOTELS */}
                    <div className="rounded-2xl bg-slate-50 p-5">

                      <div className="flex items-center gap-2">

                        <Hotel
                          size={18}
                          className="text-green-600"
                        />

                        <span className="font-bold text-slate-900">

                          {item.hotels}

                        </span>

                      </div>

                    </div>

                    {/* FLIGHTS */}
                    <div className="rounded-2xl bg-slate-50 p-5">

                      <div className="flex items-center gap-2">

                        <Plane
                          size={18}
                          className="text-green-600"
                        />

                        <span className="font-bold text-slate-900">

                          {item.flights}

                        </span>

                      </div>

                    </div>

                  </div>

                  {/* FOOTER */}
                  <div className="mt-8 flex items-center justify-between">

                    <div>

                      <p className="text-sm text-slate-500">
                        Available Packages
                      </p>

                      <h4 className="mt-2 text-2xl font-black text-slate-900">

                        {item.packages}

                      </h4>

                    </div>

                    <div className="text-right">

                      <p className="text-sm text-slate-500">
                        Starting Price
                      </p>

                      <h4 className="mt-2 text-3xl font-black text-green-600">

                        {item.price}

                      </h4>

                    </div>

                  </div>

                  {/* BUTTON */}
                  <div className="mt-8 flex items-center justify-between rounded-2xl bg-green-50 px-6 py-5 transition group-hover:bg-green-100">

                    <span className="text-lg font-bold text-slate-900">

                      Explore Destination

                    </span>

                    <div className="rounded-2xl bg-green-600 p-4 text-white transition group-hover:translate-x-1">

                      <ArrowRight size={22} />

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