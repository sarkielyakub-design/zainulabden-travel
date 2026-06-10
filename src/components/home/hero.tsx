"use client";

import Image from "next/image";
import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  Search,
  MapPin,
  CalendarDays,
  Plane,
  Star,
  ShieldCheck,
  Globe2,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";

import axios from "axios";

/* =========================
   API
========================= */
const API =
  "https://zainulabden-backend-production.up.railway.app/api/v1";

export default function Hero() {

  const [search, setSearch] =
    useState("");

  const [results, setResults] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [departureDate,
    setDepartureDate] =
    useState("");

  const [returnDate,
    setReturnDate] =
    useState("");

  const [fromAirport,
    setFromAirport] =
    useState("");

  const [toAirport,
    setToAirport] =
    useState("");

  /* =========================
     LIVE SEARCH
  ========================= */
  useEffect(() => {

    async function searchTravel() {

      if (
        !search &&
        !fromAirport &&
        !toAirport
      ) {

        setResults([]);
        return;
      }

      try {

        setLoading(true);

        // TICKETS
        const ticketResponse =
          await axios.get(
            `${API}/tickets/search?q=${search}`
          );

        // PACKAGES
        const packageResponse =
          await axios.get(
            `${API}/packages/search?q=${search}`
          );

        const tickets =
          ticketResponse.data || [];

        const packages =
          packageResponse.data || [];

        setResults([
          ...tickets,
          ...packages,
        ]);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    }

    const timeout =
      setTimeout(() => {
        searchTravel();
      }, 400);

    return () =>
      clearTimeout(timeout);

  }, [
    search,
    fromAirport,
    toAirport,
  ]);

  return (
    <section className="relative overflow-hidden bg-[#f5f7fb]">

      {/* BACKGROUND */}
      <div className="absolute inset-0">

        <div className="absolute left-[-120px] top-[-120px] h-[350px] w-[350px] rounded-full bg-green-400/10 blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] h-[420px] w-[420px] rounded-full bg-emerald-300/10 blur-3xl" />

      </div>

      <div className="container-custom relative grid min-h-screen items-center gap-16 py-16 lg:grid-cols-2 lg:py-24">

        {/* LEFT */}
        <div className="relative z-10">

          {/* BADGE */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-5 py-2 shadow-sm">

            <ShieldCheck
              size={18}
              className="text-green-600"
            />

            <span className="text-sm font-semibold text-green-700">
              Trusted By Thousands Of Travelers
            </span>

          </div>

          {/* TITLE */}
          <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">

            Book Luxury
            <span className="block text-green-600">
              Flights & Travel
            </span>

            Across The World

          </h1>

          {/* DESCRIPTION */}
          <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-600">

            Premium Umrah, Hajj, Flights,
            Hotels, Visa Processing and
            international travel experiences
            crafted for comfort and excellence.

          </p>

          {/* ACTIONS */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <Link href="/packages">

              <Button className="h-16 rounded-2xl bg-green-600 px-10 text-base font-bold shadow-lg shadow-green-500/20 hover:bg-green-700">

                Explore Packages

                <ArrowRight className="ml-2 h-5 w-5" />

              </Button>

            </Link>

            <Link href="/tickets">

              <Button
                variant="outline"
                className="h-16 rounded-2xl border-slate-300 bg-white px-10 text-base font-bold hover:bg-slate-50"
              >

                Flight Tickets

              </Button>

            </Link>

          </div>

          {/* STATS */}
          <div className="mt-16 grid grid-cols-2 gap-5 sm:grid-cols-4">

            {[
              {
                value: "10K+",
                label: "Travelers",
              },

              {
                value: "50+",
                label: "Destinations",
              },

              {
                value: "24/7",
                label: "Support",
              },

              {
                value: "4.9",
                label: "Rating",
              },
            ].map((item) => (

              <div
                key={item.label}
                className="rounded-3xl border border-white bg-white p-5 shadow-sm"
              >

                <h3 className="text-3xl font-black text-slate-900">
                  {item.value}
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  {item.label}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* RIGHT */}
        <div className="relative">

          {/* MAIN CARD */}
          <div className="overflow-hidden rounded-[40px] border border-white bg-white shadow-[0_20px_80px_rgba(15,23,42,0.12)]">

            {/* IMAGE */}
            <div className="relative h-[320px] overflow-hidden">

              <Image
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600&auto=format&fit=crop"
                alt="Travel"
                fill
                priority
                unoptimized
                className="object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* BADGE */}
              <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 backdrop-blur">

                <div className="flex items-center gap-2">

                  <Plane
                    size={16}
                    className="text-green-600"
                  />

                  <span className="text-sm font-bold text-slate-900">
                    Premium Travel
                  </span>

                </div>

              </div>

              {/* REVIEW */}
              <div className="absolute bottom-6 left-6 rounded-3xl bg-white/90 p-5 backdrop-blur">

                <div className="flex items-center gap-2">

                  <Star
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <span className="text-lg font-black text-slate-900">
                    4.9 Rating
                  </span>

                </div>

                <p className="mt-1 text-sm text-slate-600">
                  Trusted by 10,000+ travelers
                </p>

              </div>

            </div>

            {/* SEARCH */}
            <div className="p-7">

              <div className="mb-6">

                <h3 className="text-2xl font-black text-slate-900">
                  Search Flights & Packages
                </h3>

                <p className="mt-2 text-slate-600">
                  Live global travel search
                </p>

              </div>

              {/* FORM */}
              <div className="space-y-4">

                {/* KEYWORD */}
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5">

                  <Search className="text-green-600" />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                    placeholder="Search Umrah, Hajj, Dubai..."
                    className="w-full bg-transparent text-sm font-medium outline-none"
                  />

                </div>

                {/* AIRPORTS */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                  {/* FROM */}
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5">

                    <Plane className="text-green-600" />

                    <input
                      type="text"
                      value={fromAirport}
                      onChange={(e) =>
                        setFromAirport(
                          e.target.value
                        )
                      }
                      placeholder="From Airport"
                      className="w-full bg-transparent outline-none"
                    />

                  </div>

                  {/* TO */}
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5">

                    <MapPin className="text-green-600" />

                    <input
                      type="text"
                      value={toAirport}
                      onChange={(e) =>
                        setToAirport(
                          e.target.value
                        )
                      }
                      placeholder="Destination"
                      className="w-full bg-transparent outline-none"
                    />

                  </div>

                </div>

                {/* DATES */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5">

                    <CalendarDays className="text-green-600" />

                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) =>
                        setDepartureDate(
                          e.target.value
                        )
                      }
                      className="w-full bg-transparent outline-none"
                    />

                  </div>

                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5">

                    <CalendarDays className="text-green-600" />

                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) =>
                        setReturnDate(
                          e.target.value
                        )
                      }
                      className="w-full bg-transparent outline-none"
                    />

                  </div>

                </div>

                {/* BUTTON */}
                <Button className="h-16 w-full rounded-2xl bg-green-600 text-base font-bold hover:bg-green-700">

                  {loading ? (
                    <>
                      <Loader2
                        size={18}
                        className="mr-2 animate-spin"
                      />

                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-5 w-5" />

                      Search Flights & Packages
                    </>
                  )}

                </Button>

              </div>

              {/* LIVE RESULTS */}
              {results.length > 0 && (

                <div className="mt-6 space-y-3 rounded-3xl border bg-slate-50 p-5">

                  {results
                    .slice(0, 5)
                    .map((item: any) => (

                    <Link
                      key={item.id}
                      href={
                        item.airline
                          ? `/tickets/${item.id}`
                          : `/packages/${item.id}`
                      }
                      className="block rounded-2xl bg-white p-4 transition hover:bg-green-50"
                    >

                      <h4 className="font-bold text-slate-900">

                        {item.title ||
                          item.airline}

                      </h4>

                      <p className="mt-1 text-sm text-slate-500">

                        {item.from_airport &&
                          `${item.from_airport} → ${item.to_airport}`}

                      </p>

                    </Link>
                  ))}

                </div>
              )}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}