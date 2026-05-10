import Image from "next/image";

import {
  Search,
  MapPin,
  CalendarDays,
  Plane,
  Star,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100">

      {/* Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-green-300/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl" />

      <div className="container-custom relative grid min-h-screen items-center gap-16 py-16 lg:grid-cols-2 lg:py-24">

        {/* LEFT CONTENT */}
        <div className="max-w-2xl">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
            <Plane size={15} />
            Trusted Travel & Tour Agency
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Discover Luxury Travel Experiences Around The World
          </h1>

          {/* Paragraph */}
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            Premium Hajj, Umrah, International Tours,
            Visa Processing, Hotel Reservations and
            Flight Booking Services crafted for comfort,
            safety and excellence.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">

            <Button className="h-14 rounded-2xl bg-green-600 px-8 text-base hover:bg-green-700">
              Start Booking
            </Button>

            <Button
              variant="outline"
              className="h-14 rounded-2xl border-green-600 px-8 text-base text-green-700 hover:bg-green-50"
            >
              Explore Packages
            </Button>

          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 sm:flex sm:gap-12">

            <div>
              <h3 className="text-3xl font-black text-slate-900">
                10K+
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                Happy Travelers
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-black text-slate-900">
                50+
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                Destinations
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-black text-slate-900">
                24/7
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                Support
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="relative">

          {/* Main Card */}
          <div className="overflow-hidden rounded-[32px] border border-white/40 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.08)]">

            {/* Image */}
            <div className="relative h-[300px] w-full sm:h-[380px]">

              <Image
                src="https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1400&auto=format&fit=crop"
                alt="Travel"
                fill
                priority
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Floating Review */}
              <div className="absolute bottom-5 left-5 rounded-2xl bg-white/90 px-4 py-3 backdrop-blur">

                <div className="flex items-center gap-1">

                  <Star
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <span className="font-bold text-slate-900">
                    4.9 Rating
                  </span>

                </div>

                <p className="mt-1 text-sm text-slate-600">
                  Trusted by thousands
                </p>
              </div>
            </div>

            {/* Search Area */}
            <div className="space-y-4 p-6">

              {/* Destination */}
              <div className="flex items-center gap-3 rounded-2xl border bg-slate-50 px-4 py-4">

                <MapPin className="text-green-600" />

                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>

              {/* Date */}
              <div className="flex items-center gap-3 rounded-2xl border bg-slate-50 px-4 py-4">

                <CalendarDays className="text-green-600" />

                <input
                  type="date"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>

              {/* Search Button */}
              <Button className="h-14 w-full rounded-2xl bg-green-600 text-base hover:bg-green-700">

                <Search className="mr-2 h-5 w-5" />

                Search Packages

              </Button>

              {/* Bottom Cards */}
              <div className="grid grid-cols-2 gap-4 pt-2">

                <div className="rounded-2xl bg-green-50 p-4">

                  <h4 className="font-bold text-slate-900">
                    Umrah 2026
                  </h4>

                  <p className="mt-1 text-sm text-slate-600">
                    From ₦1.8M
                  </p>

                </div>

                <div className="rounded-2xl bg-slate-100 p-4">

                  <h4 className="font-bold text-slate-900">
                    Dubai Tour
                  </h4>

                  <p className="mt-1 text-sm text-slate-600">
                    Luxury 7 Days
                  </p>

                </div>

              </div>
            </div>
          </div>

          {/* Floating Card */}
          <div className="absolute -bottom-5 -left-5 hidden rounded-3xl bg-white px-6 py-5 shadow-2xl lg:block">

           
          

          </div>
        </div>
      </div>
    </section>
  );
}