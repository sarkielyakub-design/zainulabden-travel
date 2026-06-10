"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  Plane,
  CalendarDays,
  ArrowRight,
  Star,
  ShieldCheck,
  Globe2,
  Menu,
  X,
} from "lucide-react";

import {
  getTickets,
} from "@/src/services/ticket-service";

export default function TicketsPage() {

  const [tickets, setTickets] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [mobileMenu, setMobileMenu] =
    useState(false);

  /* =========================
     FETCH TICKETS
  ========================= */
  useEffect(() => {

    async function fetchTickets() {

      try {

        const data =
          await getTickets();

        console.log(
          "TICKETS:",
          data
        );

        setTickets(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    }

    fetchTickets();

  }, []);

  /* =========================
     LOADING
  ========================= */
  if (loading) {

    return (
      <div className="flex min-h-[60vh] items-center justify-center">

        <h2 className="text-3xl font-black">
          Loading Tickets...
        </h2>

      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">

      {/* =========================
         NAVBAR
      ========================= */}
      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">

        <div className="container-custom flex h-20 items-center justify-between">

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-3"
          >

            <img
              src="/logo.png"
              alt="Logo"
              className="h-14"
            />

            <div>

              <h2 className="text-xl font-black text-slate-900">
                ZAIN
              </h2>

              <p className="text-sm text-slate-500">
                Travel & Tours
              </p>

            </div>

          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-8 lg:flex">

            <Link
              href="/"
              className="font-medium text-slate-700 hover:text-green-600"
            >
              Home
            </Link>

            <Link
              href="/packages"
              className="font-medium text-slate-700 hover:text-green-600"
            >
              Packages
            </Link>

            <Link
              href="/tickets"
              className="font-bold text-green-600"
            >
              Tickets
            </Link>

            <Link
              href="/visa-services"
              className="font-medium text-slate-700 hover:text-green-600"
            >
              Visa Services
            </Link>

            <Link
              href="/about"
              className="font-medium text-slate-700 hover:text-green-600"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="font-medium text-slate-700 hover:text-green-600"
            >
              Contact
            </Link>

          </nav>

          {/* MOBILE BUTTON */}
          <button
            onClick={() =>
              setMobileMenu(
                !mobileMenu
              )
            }
            className="rounded-xl border p-2 lg:hidden"
          >

            {mobileMenu ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}

          </button>

        </div>

        {/* MOBILE NAV */}
        {mobileMenu && (

          <div className="border-t bg-white lg:hidden">

            <div className="container-custom flex flex-col gap-5 py-6">

              <Link href="/">
                Home
              </Link>

              <Link href="/packages">
                Packages
              </Link>

              <Link href="/tickets">
                Tickets
              </Link>

              <Link href="/visa-services">
                Visa Services
              </Link>

              <Link href="/about">
                About
              </Link>

              <Link href="/contact">
                Contact
              </Link>

            </div>

          </div>
        )}

      </header>

      {/* =========================
         HERO
      ========================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-slate-950 to-slate-900 py-32 text-white">

        {/* BACKGROUND */}
        <div className="absolute inset-0">

          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600&auto=format&fit=crop"
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
                International Airline Tickets
              </span>

            </div>

            {/* TITLE */}
            <h1 className="text-6xl font-black leading-tight lg:text-7xl">

              Premium
              <span className="block text-green-400">
                Flight Tickets
              </span>

            </h1>

            {/* DESCRIPTION */}
            <p className="mt-8 max-w-4xl text-xl leading-10 text-slate-300">

              Book international and local
              airline tickets with comfort,
              speed and premium travel support.

            </p>

          </div>

        </div>

      </section>

      {/* =========================
         TICKETS
      ========================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-28">

        {/* BACKGROUND */}
        <div className="absolute inset-0">

          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-green-200/20 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl" />

        </div>

        <div className="container-custom relative">

          {/* HEADER */}
          <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-green-100 px-5 py-2 text-sm font-bold text-green-700">

                <Globe2 size={18} />

                Flight Deals

              </div>

              <h2 className="text-5xl font-black leading-tight text-slate-900 lg:text-6xl">

                Explore Flight
                <span className="block text-green-600">
                  Ticket Offers
                </span>

              </h2>

            </div>

            {/* TRUST */}
            <div className="flex items-center gap-3 rounded-full bg-green-50 px-5 py-3 text-sm font-bold text-green-700">

              <Star
                size={16}
                className="fill-yellow-400 text-yellow-400"
              />

              Trusted by Thousands of Travelers

            </div>

          </div>

          {/* EMPTY */}
          {tickets.length === 0 && (

            <div className="rounded-[36px] bg-white p-20 text-center shadow-sm">

              <h2 className="text-4xl font-black">
                No Tickets Found
              </h2>

            </div>
          )}

          {/* GRID */}
          {tickets.length > 0 && (

            <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">

              {tickets.map((ticket: any) => {

                /* =========================
                   IMAGE PATH
                ========================= */

                let imageUrl =
                  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600&auto=format&fit=crop";

                // LOCAL IMAGE
                if (
                  ticket.image &&
                  !ticket.image.startsWith("http") &&
                  !ticket.image.startsWith("/uploads")
                ) {

                  imageUrl =
                    `/tickets/${ticket.image}`;
                }

                // BACKEND UPLOADS
                if (
                  ticket.image &&
                  ticket.image.startsWith("/uploads")
                ) {

                  imageUrl =
                    `https://zainulabden-backend-production.up.railway.app${ticket.image}`;
                }

                // FULL URL
                if (
                  ticket.image &&
                  ticket.image.startsWith("http")
                ) {

                  imageUrl =
                    ticket.image;
                }

                return (

                  <div
                    key={ticket.id}
                    className="group overflow-hidden rounded-[40px] bg-white shadow-[0_20px_80px_rgba(15,23,42,0.08)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_100px_rgba(15,23,42,0.16)]"
                  >

                    {/* IMAGE */}
                    <div className="relative h-[300px] overflow-hidden">

                      <img
                        src={imageUrl}
                        alt={ticket.airline}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />

                      {/* OVERLAY */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                      {/* AIRLINE */}
                      <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 backdrop-blur">

                        <div className="flex items-center gap-2">

                          <Plane
                            size={16}
                            className="text-green-600"
                          />

                          <span className="text-sm font-bold text-slate-900">

                            {ticket.airline}

                          </span>

                        </div>

                      </div>

                      {/* RATING */}
                      <div className="absolute right-5 top-5 rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white">

                        4.9

                      </div>

                      {/* PRICE */}
                      <div className="absolute bottom-5 right-5 rounded-2xl bg-white/90 px-5 py-3 backdrop-blur">

                        <h3 className="text-3xl font-black text-green-600">

                          ₦
                          {Number(
                            ticket.price
                          ).toLocaleString()}

                        </h3>

                      </div>

                    </div>

                    {/* BODY */}
                    <div className="p-8">

                      {/* ROUTE */}
                      <h2 className="text-4xl font-black leading-tight text-slate-900">

                        {ticket.from_airport}

                        <span className="mx-3 text-green-600">
                          →
                        </span>

                        {ticket.to_airport}

                      </h2>

                      {/* DATE */}
                      <div className="mt-6 flex items-center gap-3 text-slate-700">

                        <CalendarDays className="text-green-600" />

                        <span className="font-semibold">

                          Departure:
                          {" "}
                          {ticket.departure_date}

                        </span>

                      </div>

                      {/* RETURN */}
                      <div className="mt-4 flex items-center gap-3 text-slate-700">

                        <CalendarDays className="text-green-600" />

                        <span className="font-semibold">

                          Return:
                          {" "}
                          {ticket.return_date}

                        </span>

                      </div>

                      {/* CLASS */}
                      <div className="mt-6 flex items-center gap-3">

                        <ShieldCheck
                          className="text-green-600"
                        />

                        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">

                          {ticket.seat_class}

                        </span>

                      </div>

                      {/* DESCRIPTION */}
                      <p className="mt-6 line-clamp-2 text-lg leading-9 text-slate-600">

                        {ticket.description}

                      </p>

                      {/* FOOTER */}
                      <div className="mt-10 flex items-center justify-between">

                        <div className="flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-bold text-green-700">

                          <Star
                            size={16}
                            className="fill-yellow-400 text-yellow-400"
                          />

                          Premium Airline

                        </div>

                        <Link
                          href={`/tickets/${ticket.id}`}
                          className="flex items-center gap-3 rounded-2xl bg-green-600 px-6 py-5 text-lg font-bold text-white shadow-lg shadow-green-500/20 transition hover:bg-green-700"
                        >

                          Book Now

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