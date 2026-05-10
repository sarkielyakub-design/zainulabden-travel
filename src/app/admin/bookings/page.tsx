"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  CalendarDays,
  User,
  CreditCard,
  CheckCircle2,
  Plane,
  Package,
  Loader2,
  Clock3,
} from "lucide-react";

import axios from "axios";

/* =========================
   API
========================= */
const API =
  "http://172.20.10.3:8000/api/v1";

/* =========================
   TYPES
========================= */
type Booking = {
  id: number;

  surname: string;

  first_name: string;

  email: string;

  phone: string;

  package_title?: string;

  ticket_airline?: string;

  from_airport?: string;

  to_airport?: string;

  amount: number;

  status: string;

  created_at: string;

  package_id?: number;

  ticket_id?: number;
};

/* =========================
   PAGE
========================= */
export default function AdminBookings() {

  const [bookings, setBookings] =
    useState<Booking[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [markingPaid, setMarkingPaid] =
    useState<number | null>(null);

  /* =========================
     FETCH BOOKINGS
  ========================= */
  async function fetchBookings() {

    try {

      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await axios.get(
          `${API}/admin/bookings`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      console.log(
        "BOOKINGS:",
        response.data
      );

      const bookingsData =
        Array.isArray(
          response.data
        )
          ? response.data
          : response.data.bookings ||
            response.data.data ||
            [];

      setBookings(bookingsData);

    } catch (err) {

      console.log(
        "BOOKING ERROR:",
        err
      );

      setBookings([]);

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  /* =========================
     MARK PAID
  ========================= */
  async function markPaid(
    bookingId: number
  ) {

    try {

      setMarkingPaid(
        bookingId
      );

      const token =
        localStorage.getItem(
          "token"
        );

      await axios.put(
        `${API}/admin/bookings/${bookingId}/pay`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert(
        "Booking marked as paid"
      );

      fetchBookings();

    } catch (err) {

      console.log(err);

      alert(
        "Payment update failed"
      );

    } finally {

      setMarkingPaid(null);
    }
  }

  /* =========================
     LOADING
  ========================= */
  if (loading) {

    return (
      <div className="flex min-h-[50vh] items-center justify-center">

        <Loader2
          size={40}
          className="animate-spin text-green-600"
        />

      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

        <div>

          <h1 className="text-4xl font-black text-slate-900 lg:text-5xl">
            Bookings
          </h1>

          <p className="mt-3 text-lg text-slate-500">
            Manage package and ticket reservations
          </p>

        </div>

      </div>

      {/* EMPTY */}
      {bookings.length === 0 && (

        <div className="rounded-[36px] bg-white p-20 text-center shadow-sm">

          <Package
            size={60}
            className="mx-auto text-slate-300"
          />

          <h2 className="mt-6 text-4xl font-black text-slate-900">
            No Bookings Found
          </h2>

          <p className="mt-3 text-slate-500">
            Customer bookings will appear here
          </p>

        </div>
      )}

      {/* MOBILE CARDS */}
      <div className="grid gap-6 lg:hidden">

        {bookings.map((booking) => {

          const isTicket =
            !!booking.ticket_id;

          const isPackage =
            !!booking.package_id;

          return (

            <div
              key={booking.id}
              className="rounded-[32px] bg-white p-6 shadow-sm"
            >

              {/* TOP */}
              <div className="flex items-start justify-between gap-4">

                <div className="flex items-center gap-4">

                  <div className="rounded-full bg-green-100 p-3 text-green-600">

                    <User size={18} />

                  </div>

                  <div>

                    <h3 className="font-black text-slate-900">

                      {booking.surname}
                      {" "}
                      {booking.first_name}

                    </h3>

                    <p className="mt-1 text-sm text-slate-500">

                      {booking.email}

                    </p>

                  </div>

                </div>

                {/* TYPE */}
                {isPackage ? (

                  <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-bold text-blue-700">

                    Package

                  </span>

                ) : (

                  <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-bold text-green-700">

                    Ticket

                  </span>
                )}

              </div>

              {/* INFO */}
              <div className="mt-6">

                {isPackage ? (

                  <div className="flex items-center gap-3">

                    <Package
                      size={18}
                      className="text-blue-600"
                    />

                    <span className="font-semibold">

                      {booking.package_title}

                    </span>

                  </div>

                ) : (

                  <div>

                    <div className="flex items-center gap-3">

                      <Plane
                        size={18}
                        className="text-green-600"
                      />

                      <span className="font-semibold">

                        {booking.ticket_airline}

                      </span>

                    </div>

                    <p className="mt-2 text-sm text-slate-500">

                      {booking.from_airport}
                      {" → "}
                      {booking.to_airport}

                    </p>

                  </div>
                )}

              </div>

              {/* PRICE */}
              <div className="mt-6 flex items-center gap-3 text-green-600">

                <CreditCard size={18} />

                <span className="text-2xl font-black">

                  ₦
                  {Number(
                    booking.amount || 0
                  ).toLocaleString()}

                </span>

              </div>

              {/* STATUS */}
              <div className="mt-6 flex items-center justify-between">

                <span
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold ${
                    booking.status ===
                    "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >

                  {booking.status ===
                  "paid" ? (

                    <CheckCircle2
                      size={12}
                    />

                  ) : (

                    <Clock3
                      size={12}
                    />
                  )}

                  {booking.status}

                </span>

                <div className="flex items-center gap-2 text-sm text-slate-500">

                  <CalendarDays
                    size={16}
                  />

                  {booking.created_at
                    ? new Date(
                        booking.created_at
                      ).toLocaleDateString()
                    : "N/A"}

                </div>

              </div>

              {/* ACTION */}
              {booking.status !==
                "paid" && (

                <button
                  onClick={() =>
                    markPaid(
                      booking.id
                    )
                  }
                  disabled={
                    markingPaid ===
                    booking.id
                  }
                  className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-green-600 py-4 text-sm font-bold text-white transition hover:bg-green-700 disabled:opacity-50"
                >

                  {markingPaid ===
                  booking.id ? (

                    <>
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />

                      Processing...
                    </>

                  ) : (

                    <>
                      <CheckCircle2
                        size={16}
                      />

                      Mark Paid
                    </>
                  )}

                </button>
              )}

            </div>
          );
        })}

      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden overflow-x-auto rounded-[36px] bg-white p-8 shadow-sm lg:block">

        <table className="w-full min-w-[1200px]">

          <thead>

            <tr className="border-b">

              <th className="pb-5 text-left text-sm font-bold text-slate-500">
                Customer
              </th>

              <th className="pb-5 text-left text-sm font-bold text-slate-500">
                Type
              </th>

              <th className="pb-5 text-left text-sm font-bold text-slate-500">
                Travel Info
              </th>

              <th className="pb-5 text-left text-sm font-bold text-slate-500">
                Amount
              </th>

              <th className="pb-5 text-left text-sm font-bold text-slate-500">
                Status
              </th>

              <th className="pb-5 text-left text-sm font-bold text-slate-500">
                Date
              </th>

              <th className="pb-5 text-left text-sm font-bold text-slate-500">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {bookings.map(
              (booking) => {

              const isTicket =
                !!booking.ticket_id;

              const isPackage =
                !!booking.package_id;

              return (

                <tr
                  key={booking.id}
                  className="border-b last:border-none"
                >

                  {/* CUSTOMER */}
                  <td className="py-6">

                    <div className="flex items-center gap-4">

                      <div className="rounded-full bg-green-100 p-3 text-green-600">

                        <User size={18} />

                      </div>

                      <div>

                        <h3 className="font-bold text-slate-900">

                          {booking.surname}
                          {" "}
                          {booking.first_name}

                        </h3>

                        <p className="mt-1 text-sm text-slate-500">

                          {booking.email}

                        </p>

                      </div>

                    </div>

                  </td>

                  {/* TYPE */}
                  <td className="py-6">

                    {isPackage ? (

                      <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-bold text-blue-700">

                        Package

                      </span>

                    ) : (

                      <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-bold text-green-700">

                        Ticket

                      </span>
                    )}

                  </td>

                  {/* INFO */}
                  <td className="py-6">

                    {isPackage ? (

                      <span className="font-semibold text-slate-900">

                        {booking.package_title}

                      </span>

                    ) : (

                      <div>

                        <p className="font-semibold text-slate-900">

                          {booking.ticket_airline}

                        </p>

                        <p className="mt-1 text-sm text-slate-500">

                          {booking.from_airport}
                          {" → "}
                          {booking.to_airport}

                        </p>

                      </div>
                    )}

                  </td>

                  {/* AMOUNT */}
                  <td className="py-6">

                    <div className="flex items-center gap-2 font-black text-green-600">

                      <CreditCard
                        size={18}
                      />

                      ₦
                      {Number(
                        booking.amount || 0
                      ).toLocaleString()}

                    </div>

                  </td>

                  {/* STATUS */}
                  <td className="py-6">

                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold ${
                        booking.status ===
                        "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >

                      {booking.status ===
                      "paid" ? (

                        <CheckCircle2
                          size={12}
                        />

                      ) : (

                        <Clock3
                          size={12}
                        />
                      )}

                      {booking.status}

                    </span>

                  </td>

                  {/* DATE */}
                  <td className="py-6">

                    <div className="flex items-center gap-2 text-slate-600">

                      <CalendarDays
                        size={16}
                      />

                      {booking.created_at
                        ? new Date(
                            booking.created_at
                          ).toLocaleDateString()
                        : "N/A"}

                    </div>

                  </td>

                  {/* ACTION */}
                  <td className="py-6">

                    {booking.status !==
                      "paid" && (

                      <button
                        onClick={() =>
                          markPaid(
                            booking.id
                          )
                        }
                        disabled={
                          markingPaid ===
                          booking.id
                        }
                        className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
                      >

                        {markingPaid ===
                        booking.id ? (

                          <>
                            <Loader2
                              size={18}
                              className="animate-spin"
                            />

                            Processing...
                          </>

                        ) : (

                          <>
                            <CheckCircle2
                              size={18}
                            />

                            Mark Paid
                          </>
                        )}

                      </button>
                    )}

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
}