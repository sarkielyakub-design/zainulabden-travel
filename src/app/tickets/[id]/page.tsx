"use client";

import {
  useEffect,
  useState,
} from "react";

import { useParams } from "next/navigation";

import {
  Plane,
  CalendarDays,
  ArrowRight,
  Clock3,
  ShieldCheck,
} from "lucide-react";

import Link from "next/link";

import {
  getSingleTicket,
} from "@/src/services/ticket-service";

export default function TicketDetailsPage() {

  const params = useParams();

  const [ticket, setTicket] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  /* =========================
     FETCH TICKET
  ========================= */
  useEffect(() => {

    async function fetchTicket() {

      try {

        const data =
          await getSingleTicket(
            params.id as string
          );

        console.log(data);

        setTicket(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    }

    fetchTicket();

  }, [params.id]);

  /* =========================
     LOADING
  ========================= */
  if (loading) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">

        <h2 className="text-3xl font-black text-slate-900">
          Loading Ticket...
        </h2>

      </div>
    );
  }

  /* =========================
     NOT FOUND
  ========================= */
  if (!ticket) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">

        <h2 className="text-4xl font-black text-red-500">
          Ticket not found
        </h2>

      </div>
    );
  }

  /* =========================
     IMAGE PATH
  ========================= */
  let imageUrl =
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600&auto=format&fit=crop";

  // LOCAL PUBLIC IMAGE
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

    imageUrl = ticket.image;
  }

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-20">

      <div className="container-custom">

        <div className="grid gap-16 lg:grid-cols-2">

          {/* IMAGE */}
          <div className="overflow-hidden rounded-[40px] bg-white shadow-[0_20px_80px_rgba(0,0,0,0.08)]">

            <img
              src={imageUrl}
              alt={ticket.airline}
              className="h-full w-full object-cover"
            />

          </div>

          {/* CONTENT */}
          <div>

            {/* AIRLINE */}
            <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-green-100 px-5 py-3">

              <Plane
                className="text-green-600"
                size={20}
              />

              <span className="text-lg font-bold text-green-700">

                {ticket.airline}

              </span>

            </div>

            {/* ROUTE */}
            <h1 className="text-5xl font-black leading-tight text-slate-900 lg:text-6xl">

              {ticket.from_airport}

              <span className="mx-3 text-green-600">
                →
              </span>

              {ticket.to_airport}

            </h1>

            {/* DATES */}
            <div className="mt-10 space-y-5">

              <div className="flex items-center gap-3 text-slate-700">

                <CalendarDays
                  size={20}
                  className="text-green-600"
                />

                <span className="text-lg font-medium">

                  Departure:
                  {" "}
                  {ticket.departure_date}

                </span>

              </div>

              <div className="flex items-center gap-3 text-slate-700">

                <CalendarDays
                  size={20}
                  className="text-green-600"
                />

                <span className="text-lg font-medium">

                  Return:
                  {" "}
                  {ticket.return_date}

                </span>

              </div>

            </div>

            {/* CLASS */}
            <div className="mt-10 flex items-center gap-3">

              <ShieldCheck
                className="text-green-600"
                size={20}
              />

              <span className="rounded-full bg-green-100 px-5 py-3 text-lg font-bold text-green-700">

                {ticket.seat_class}

              </span>

            </div>

            {/* PRICE */}
            <div className="mt-12">

              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">

                Starting From

              </p>

              <h3 className="mt-4 text-6xl font-black text-green-600">

                ₦
                {Number(
                  ticket.price
                ).toLocaleString()}

              </h3>

            </div>

            {/* DESCRIPTION */}
            <p className="mt-10 text-lg leading-9 text-slate-600">

              {ticket.description}

            </p>

            {/* FEATURES */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">

              <div className="rounded-2xl bg-white p-5 shadow-sm">

                <div className="flex items-center gap-3">

                  <Plane className="text-green-600" />

                  <span className="font-bold">
                    International Flight
                  </span>

                </div>

              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">

                <div className="flex items-center gap-3">

                  <Clock3 className="text-green-600" />

                  <span className="font-bold">
                    Instant Booking
                  </span>

                </div>

              </div>

            </div>

            {/* BUTTON */}
            <Link
              href={`/tickets/${ticket.id}/book`}
              className="mt-12 inline-flex items-center gap-3 rounded-2xl bg-green-600 px-8 py-5 text-lg font-bold text-white shadow-lg shadow-green-500/20 transition hover:bg-green-700"
            >

              Book Ticket

              <ArrowRight size={22} />

            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}