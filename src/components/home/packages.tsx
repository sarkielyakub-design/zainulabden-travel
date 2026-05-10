"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  CalendarDays,
  Plane,
  Hotel,
  ArrowRight,
  ShieldCheck,
  Star,
  Globe2,
  Users,
} from "lucide-react";

import {
  getPackages,
} from "@/src/services/package-service";

export default function PackagesPage() {

  const [packages, setPackages] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================
     FETCH PACKAGES
  ========================= */
  useEffect(() => {

    async function fetchPackages() {

      try {

        const data =
          await getPackages();

        console.log(data);

        setPackages(
          data.data || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    }

    fetchPackages();

  }, []);

  return (
    <main className="min-h-screen bg-white">

      {/* =========================
         HERO
      ========================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-slate-950 to-slate-900 py-32 text-white">

        {/* BACKGROUND */}
        <div className="absolute inset-0">

          <img
            src="https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1600&auto=format&fit=crop"
            className="h-full w-full object-cover opacity-25"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />

        </div>

        <div className="container-custom relative">

          <div className="max-w-5xl">

            {/* BADGE */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 backdrop-blur">

              <ShieldCheck size={18} />

              <span className="font-semibold">
                Luxury Umrah & Global Packages
              </span>

            </div>

            {/* TITLE */}
            <h1 className="text-6xl font-black leading-tight lg:text-7xl">

              Discover Premium
              <span className="block text-green-400">
                Travel Experiences
              </span>

            </h1>

            {/* DESCRIPTION */}
            <p className="mt-8 max-w-4xl text-xl leading-10 text-slate-300">

              Explore luxury Umrah, Hajj,
              Dubai, Turkey and international
              travel packages carefully crafted
              for comfort, spirituality and
              unforgettable memories.

            </p>

            {/* QUICK FILTERS */}
            <div className="mt-12 flex flex-wrap gap-4">

              {[
                "Umrah",
                "Hajj",
                "Dubai",
                "Turkey",
                "London",
                "VIP Packages",
              ].map((item) => (

                <button
                  key={item}
                  className="rounded-full border border-white/10 bg-white/10 px-6 py-3 text-sm font-bold backdrop-blur transition hover:bg-green-600"
                >

                  {item}

                </button>
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* =========================
         PACKAGES
      ========================= */}
      <section className="py-24">

        <div className="container-custom">

          {/* TOP */}
          <div className="mb-16 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-green-100 px-5 py-2 text-sm font-bold text-green-700">

                <Globe2 size={18} />

                Premium Packages

              </div>

              <h2 className="text-5xl font-black text-slate-900">

                Explore Travel Packages

              </h2>

            </div>

            <div className="flex items-center gap-3 rounded-full bg-green-50 px-5 py-3 text-sm font-bold text-green-700">

              <Star
                size={16}
                className="fill-yellow-400 text-yellow-400"
              />

              Trusted by Thousands of Travelers

            </div>

          </div>

          {/* LOADING */}
          {loading && (

            <div className="flex items-center justify-center py-20">

              <h2 className="text-3xl font-black">
                Loading Packages...
              </h2>

            </div>
          )}

          {/* EMPTY */}
          {!loading &&
            packages.length === 0 && (

            <div className="rounded-[36px] bg-slate-50 p-20 text-center">

              <h2 className="text-4xl font-black text-slate-900">
                No Packages Found
              </h2>

            </div>
          )}

          {/* GRID */}
          {!loading &&
            packages.length > 0 && (

            <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">

              {packages.map(
                (item) => {

                const spotsLeft =
                  item.total_slots -
                  item.booked_slots;

                const progress =
                  (item.booked_slots /
                    item.total_slots) *
                  100;

                return (

                  <div
                    key={item.id}
                    className="group overflow-hidden rounded-[40px] bg-white shadow-[0_20px_80px_rgba(15,23,42,0.08)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_100px_rgba(15,23,42,0.16)]"
                  >

                    {/* IMAGE */}
                    <div className="relative h-[320px] overflow-hidden">

                      <img
                        src={
                          item.image_url ||
                          "https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1600&auto=format&fit=crop"
                        }
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />

                      {/* OVERLAY */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                      {/* CATEGORY */}
                      <div className="absolute left-5 top-5 rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white">

                        {item.category}

                      </div>

                      {/* PRICE */}
                      <div className="absolute bottom-5 right-5 rounded-2xl bg-white/90 px-5 py-3 backdrop-blur">

                        <h3 className="text-3xl font-black text-green-600">

                          ₦
                          {Number(
                            item.price
                          ).toLocaleString()}

                        </h3>

                      </div>

                    </div>

                    {/* BODY */}
                    <div className="p-8">

                      {/* TITLE */}
                      <h2 className="text-4xl font-black leading-tight text-slate-900">

                        {item.title}

                      </h2>

                      {/* DESCRIPTION */}
                      <p className="mt-6 line-clamp-3 text-lg leading-9 text-slate-600">

                        {item.description}

                      </p>

                      {/* FEATURES */}
                      <div className="mt-8 space-y-4">

                        {/* FLIGHT */}
                        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">

                          <Plane className="text-green-600" />

                          <span className="font-semibold text-slate-700">

                            {item.flight_name}

                          </span>

                        </div>

                        {/* HOTEL */}
                        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">

                          <Hotel className="text-green-600" />

                          <span className="font-semibold text-slate-700">

                            {item.hotel_name}

                          </span>

                        </div>

                        {/* DATE */}
                        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">

                          <CalendarDays className="text-green-600" />

                          <span className="font-semibold text-slate-700">

                            {item.departure_date}

                          </span>

                        </div>

                      </div>

                      {/* SLOT SECTION */}
                      <div className="mt-8 rounded-3xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-5">

                        {/* TOP */}
                        <div className="mb-4 flex items-center justify-between">

                          <div className="flex items-center gap-2">

                            <Users
                              size={20}
                              className="text-green-600"
                            />

                            <span className="text-lg font-bold text-green-700">

                              {spotsLeft}
                              {" "}
                              spots left

                            </span>

                          </div>

                          <span className="text-sm text-slate-500">

                            {item.booked_slots}
                            {" "}
                            booked

                          </span>

                        </div>

                        {/* PROGRESS */}
                        <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                          <div
                            className="h-full rounded-full bg-green-600 transition-all duration-700"
                            style={{
                              width:
                                `${progress}%`,
                            }}
                          />

                        </div>

                        {/* BOTTOM */}
                        <div className="mt-3 text-sm text-slate-600">

                          {item.booked_slots}
                          {" "}
                          of
                          {" "}
                          {item.total_slots}
                          {" "}
                          booked

                        </div>

                      </div>

                      {/* FOOTER */}
                      <div className="mt-10 flex items-center justify-between">

                        <div>

                          <p className="text-sm text-slate-500">
                            Starting From
                          </p>

                          <h3 className="mt-2 text-4xl font-black text-green-600">

                            ₦
                            {Number(
                              item.price
                            ).toLocaleString()}

                          </h3>

                        </div>

                        <Link
                          href={`/packages/${item.id}`}
                          className="flex items-center gap-3 rounded-2xl bg-green-600 px-6 py-5 text-lg font-bold text-white shadow-lg shadow-green-500/20 transition hover:bg-green-700"
                        >

                          View

                          <ArrowRight size={20} />

                        </Link>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </div>

      </section>

    </main>
  );
}