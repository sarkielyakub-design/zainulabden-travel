"use client";

import Image from "next/image";
import FlightSearchEngine from "@/src/components/home/flightsearchenigine";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* Background */}

      <div className="absolute inset-0">

        <Image
          src="/image/hero-flight.jpg"
          alt="Travel"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

      </div>

      {/* Content */}

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-20">

        {/* Heading */}

        <div className="max-w-5xl text-center">

          <div className="mb-6 inline-flex rounded-full bg-white/10 px-5 py-2 backdrop-blur">

            <span className="text-sm font-semibold text-white">
              ✈️ Trusted Travel Partner Across Africa
            </span>

          </div>

          <h1 className="text-5xl font-black leading-tight text-white md:text-7xl">

            Find Flights,
            Hotels & Umrah Packages

          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90 md:text-xl">

            Compare fares from Emirates,
            Qatar Airways,
            Turkish Airlines,
            Ethiopian Airlines,
            Saudi Airlines and more.

          </p>

        </div>

        {/* Search Engine */}

        <div className="mt-12 w-full max-w-7xl">

          <FlightSearchEngine />

        </div>

        {/* Airlines */}

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 rounded-2xl bg-white/10 px-8 py-5 backdrop-blur">

          <img
            src="/airlines/emirates.png"
            alt="Emirates"
            className="h-10 object-contain"
          />

          <img
            src="/airlines/qatar.png"
            alt="Qatar"
            className="h-10 object-contain"
          />

          <img
            src="/airlines/turkish.png"
            alt="Turkish"
            className="h-10 object-contain"
          />

          <img
            src="/airlines/saudia.png"
            alt="Saudia"
            className="h-10 object-contain"
          />

          <img
            src="/airlines/ethiopian.png"
            alt="Ethiopian"
            className="h-10 object-contain"
          />

        </div>

        {/* Trust Stats */}

        <div className="mt-10 grid w-full max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">

          <div className="rounded-2xl bg-white/10 p-5 text-center backdrop-blur">
            <h3 className="text-3xl font-black text-white">
              12K+
            </h3>
            <p className="text-white/80">
              Travelers
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-5 text-center backdrop-blur">
            <h3 className="text-3xl font-black text-white">
              75+
            </h3>
            <p className="text-white/80">
              Destinations
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-5 text-center backdrop-blur">
            <h3 className="text-3xl font-black text-white">
              4.9★
            </h3>
            <p className="text-white/80">
              Rating
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-5 text-center backdrop-blur">
            <h3 className="text-3xl font-black text-white">
              24/7
            </h3>
            <p className="text-white/80">
              Support
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}