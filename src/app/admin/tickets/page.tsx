"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  Plane,
  Plus,
  Pencil,
  Trash2,
  CalendarDays,
  Search,
  Loader2,
} from "lucide-react";

import {
  getTickets,
  deleteTicket,
} from "@/src/services/ticket-service";

export default function AdminTicketsPage() {

  const [tickets, setTickets] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  /* =========================
     FETCH TICKETS
  ========================= */
  async function fetchTickets() {

    try {

      setLoading(true);

      const data =
        await getTickets();

      console.log(
        "TICKETS:",
        data
      );

      setTickets(
        Array.isArray(data)
          ? data
          : data.tickets || []
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTickets();
  }, []);

  /* =========================
     DELETE
  ========================= */
  async function handleDelete(
    id: number
  ) {

    const token =
      localStorage.getItem(
        "token"
      );

    if (!confirm("Delete ticket?"))
      return;

    try {

      setDeletingId(id);

      await deleteTicket(
        id,
        token!
      );

      setTickets((prev) =>
        prev.filter(
          (item) => item.id !== id
        )
      );

    } catch (error) {

      console.log(error);

      alert(
        "Delete failed"
      );

    } finally {

      setDeletingId(null);
    }
  }

  /* =========================
     FILTER
  ========================= */
  const filteredTickets =
    tickets.filter((ticket) => {

      const value = `
        ${ticket.airline}
        ${ticket.from_airport}
        ${ticket.to_airport}
      `.toLowerCase();

      return value.includes(
        search.toLowerCase()
      );
    });

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-5xl font-black text-slate-900">
            Flight Tickets
          </h1>

          <p className="mt-3 text-lg text-slate-500">
            Manage premium international flight tickets
          </p>

        </div>

        {/* CREATE */}
        <Link
          href="/admin/tickets/create"
          className="flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-7 py-4 text-lg font-bold text-white shadow-lg shadow-green-500/20 transition hover:bg-green-700"
        >

          <Plus size={22} />

          Create Ticket

        </Link>

      </div>

      {/* SEARCH */}
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">

        <Search className="text-green-600" />

        <input
          type="text"
          placeholder="Search airline, airport..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full bg-transparent outline-none"
        />

      </div>

      {/* LOADING */}
      {loading && (

        <div className="flex items-center justify-center py-20">

          <Loader2
            size={40}
            className="animate-spin text-green-600"
          />

        </div>
      )}

      {/* EMPTY */}
      {!loading &&
        filteredTickets.length === 0 && (

        <div className="rounded-[32px] bg-white p-20 text-center shadow-sm">

          <Plane
            size={60}
            className="mx-auto text-slate-300"
          />

          <h2 className="mt-6 text-4xl font-black text-slate-900">
            No Tickets Found
          </h2>

          <p className="mt-3 text-slate-500">
            Create your first airline ticket
          </p>

        </div>
      )}

      {/* GRID */}
      {!loading &&
        filteredTickets.length > 0 && (

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {filteredTickets.map(
            (ticket) => (

            <div
              key={ticket.id}
              className="group overflow-hidden rounded-[36px] bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >

              {/* IMAGE */}
              <div className="relative h-[240px] overflow-hidden">

                <img
                  src={
                    ticket.image ||
                    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600&auto=format&fit=crop"
                  }
                  alt={ticket.airline}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

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

                {/* PRICE */}
                <div className="absolute bottom-5 right-5 rounded-2xl bg-white/90 px-5 py-3 backdrop-blur">

                  <h3 className="text-2xl font-black text-green-600">

                    ₦
                    {Number(
                      ticket.price
                    ).toLocaleString()}

                  </h3>

                </div>

              </div>

              {/* CONTENT */}
              <div className="p-7">

                {/* ROUTE */}
                <h2 className="text-3xl font-black text-slate-900">

                  {ticket.from_airport}

                  <span className="mx-3 text-green-600">
                    →
                  </span>

                  {ticket.to_airport}

                </h2>

                {/* META */}
                <div className="mt-5 flex items-center gap-3 text-slate-500">

                  <CalendarDays
                    size={18}
                  />

                  <span>
                    {ticket.departure_date}
                  </span>

                </div>

                {/* CLASS */}
                <div className="mt-4">

                  <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">

                    {ticket.seat_class}

                  </span>

                </div>

                {/* DESCRIPTION */}
                <p className="mt-6 line-clamp-2 leading-7 text-slate-600">

                  {ticket.description}

                </p>

                {/* ACTIONS */}
                <div className="mt-8 flex items-center justify-between">

                  {/* EDIT */}
                  <Link
                    href={`/admin/tickets/${ticket.id}`}
                    className="flex items-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 font-bold text-white transition hover:bg-blue-600"
                  >

                    <Pencil size={18} />

                    Edit

                  </Link>

                  {/* DELETE */}
                  <button
                    onClick={() =>
                      handleDelete(
                        ticket.id
                      )
                    }
                    disabled={
                      deletingId ===
                      ticket.id
                    }
                    className="flex items-center gap-2 rounded-2xl bg-red-500 px-5 py-3 font-bold text-white transition hover:bg-red-600 disabled:opacity-50"
                  >

                    {deletingId ===
                    ticket.id ? (
                      <>
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />

                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 size={18} />

                        Delete
                      </>
                    )}

                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}