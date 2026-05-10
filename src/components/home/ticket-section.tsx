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
} from "lucide-react";

import {
  getTickets,
} from "@/src/services/ticket-service";

export default function TicketSection() {

  const [tickets, setTickets] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================
     FETCH TICKETS
  ========================= */
  useEffect(() => {

    async function fetchTickets() {

      try {

        const data =
          await getTickets();

        console.log(data);

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
      <section className="py-20">

        <div className="container-custom flex items-center justify-center">

          <h2 className="text-3xl font-black">
            Loading Tickets...
          </h2>

        </div>

      </section>
    );
  }

  return (
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

              <Plane size={18} />

              Flight Tickets

            </div>

            <h2 className="text-5xl font-black leading-tight text-slate-900 lg:text-6xl">

              International
              <span className="block text-green-600">
                Flight Deals
              </span>

            </h2>

            <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-600">

              Explore premium local and international
              airline ticket offers with luxury
              comfort and secure travel booking.

            </p>

          </div>

          {/* BUTTON */}
          <Link
            href="/tickets"
            className="inline-flex items-center gap-3 rounded-2xl bg-green-600 px-8 py-5 text-lg font-bold text-white shadow-lg shadow-green-500/20 transition hover:bg-green-700"
          >

            View All Tickets

            <ArrowRight size={22} />

          </Link>

        </div>

        {/* EMPTY */}
        {tickets.length === 0 && (

          <div className="rounded-[36px] bg-white p-20 text-center shadow-sm">

            <h2 className="text-4xl font-black text-slate-900">
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
                  `http://172.20.10.3:8000${ticket.image}`;
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
  );
}