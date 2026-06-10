"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plane,
  CalendarDays,
  ArrowRight,
  Star,
  ShieldCheck,
  Globe2,
  Clock,
  ChevronRight,
} from "lucide-react";
import { getTickets } from "@/src/services/ticket-service";

export default function TicketSection() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const data = await getTickets();
        setTickets(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchTickets();
  }, []);

  // Helper for image URL
  const getImageUrl = (ticket: any) => {
    if (!ticket.image) {
      return "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600&auto=format&fit=crop";
    }
    if (ticket.image.startsWith("http")) return ticket.image;
    if (ticket.image.startsWith("/uploads")) {
      return `https://zainulabden-backend-production.up.railway.app${ticket.image}`;
    }
    return `/tickets/${ticket.image}`;
  };

  if (loading) {
    return (
      <section className="py-28 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-custom flex flex-col items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
          <p className="mt-4 text-lg font-semibold text-slate-600">Loading best flight deals...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-20 md:py-28">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-emerald-100/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sky-100/30 blur-3xl" />
      </div>

      <div className="container-custom relative">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              <Plane size={16} />
              Flight Tickets
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              International Flight Deals
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Compare & book premium airline tickets at the best prices.
              Comfort, flexibility, and secure booking.
            </p>
          </div>
          <Link
            href="/tickets"
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-5 py-2.5 font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-50 hover:shadow"
          >
            View all flights
            <ChevronRight size={18} />
          </Link>
        </div>

        {/* Empty state */}
        {tickets.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <Plane size={48} className="mx-auto text-slate-300" />
            <h3 className="mt-4 text-2xl font-bold text-slate-800">No flights available</h3>
            <p className="mt-2 text-slate-500">Please check back later for new deals.</p>
          </div>
        )}

        {/* Ticket Grid – Airbnb/Booking.com style */}
        {tickets.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tickets.map((ticket) => {
              const imageUrl = getImageUrl(ticket);
              const price = Number(ticket.price) || 0;

              return (
                <Link
                  key={ticket.id}
                  href={`/tickets/${ticket.id}`}
                  className="group block transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
                    {/* Image container */}
                    <div className="relative h-56 overflow-hidden bg-slate-100">
                      <img
                        src={imageUrl}
                        alt={ticket.airline || "Flight"}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      {/* Airline badge */}
                      <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-slate-800 shadow-sm backdrop-blur-sm">
                        {ticket.airline || "Airline"}
                      </div>
                      {/* Deal badge */}
                      {price < 500000 && (
                        <div className="absolute right-3 top-3 rounded-full bg-rose-600 px-2 py-0.5 text-xs font-semibold text-white shadow-sm">
                          Deal
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      {/* Route */}
                      <div className="flex items-baseline justify-between">
                        <h3 className="text-lg font-bold text-slate-800">
                          {ticket.from_airport || "LOS"} → {ticket.to_airport || "DXB"}
                        </h3>
                        <div className="flex items-center gap-0.5">
                          <Star size={14} className="fill-amber-400 text-amber-400" />
                          <span className="text-sm font-medium text-slate-600">4.9</span>
                        </div>
                      </div>

                      {/* Dates */}
                      <div className="mt-2 space-y-1.5 text-sm text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <CalendarDays size={14} />
                          <span>Depart: {ticket.departure_date || "Flexible"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CalendarDays size={14} />
                          <span>Return: {ticket.return_date || "Flexible"}</span>
                        </div>
                      </div>

                      {/* Class and description */}
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                          {ticket.seat_class || "Economy"}
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500 line-clamp-1">
                          {ticket.description || "Direct flight"}
                        </span>
                      </div>

                      {/* Price and action */}
                      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                        <div>
                          <p className="text-xs text-slate-500">Starting from</p>
                          <p className="text-xl font-bold text-emerald-600">
                            ₦{price.toLocaleString()}
                          </p>
                        </div>
                        <div className="rounded-xl bg-emerald-600 p-2 text-white transition group-hover:bg-emerald-700">
                          <ArrowRight size={18} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Trust badge row */}
        {tickets.length > 0 && (
          <div className="mt-16 flex flex-wrap justify-center gap-6 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-600" />
              <span>Secure payments</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe2 size={18} className="text-emerald-600" />
              <span>Global airlines</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-emerald-600" />
              <span>24/7 support</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}