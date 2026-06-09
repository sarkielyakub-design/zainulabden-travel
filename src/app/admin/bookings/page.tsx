"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  CalendarDays,
  User,
  CreditCard,
  CheckCircle2,
  Plane,
  Package,
  Loader2,
  Clock3,
  Phone,
  Mail,
} from "lucide-react";

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
        typeof window !== "undefined"
          ? localStorage.getItem(
              "token"
            )
          : null;

      if (!token) {
        alert("Unauthorized");
        return;
      }

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

      setBookings(
        response.data?.data || []
      );

    } catch (err: any) {

      console.log(
        "BOOKING ERROR:",
        err
      );

      if (
        err.response?.status === 401
      ) {
        alert(
          "Session expired. Login again."
        );
      }

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

    } catch (err: any) {

      console.log(err);

      alert(
        err.response?.data?.detail ||
          "Payment update failed"
      );

    } finally {

      setMarkingPaid(null);

    }
  }

  /* =========================
     TOTAL REVENUE
  ========================= */
  const totalRevenue =
    bookings
      .filter(
        (item) =>
          item.status === "paid"
      )
      .reduce(
        (acc, curr) =>
          acc + Number(curr.amount),
        0
      );

  /* =========================
     LOADING
  ========================= */
  if (loading) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">

        <Loader2
          size={45}
          className="animate-spin text-green-600"
        />

      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 lg:p-8">

      {/* =========================
          HEADER
      ========================= */}
      <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-4xl font-black text-slate-900 lg:text-5xl">
            Booking Management
          </h1>

          <p className="mt-3 text-lg text-slate-500">
            Manage all package and ticket reservations
          </p>

        </div>

        {/* REVENUE CARD */}
        <div className="rounded-[32px] bg-gradient-to-br from-green-600 to-emerald-700 px-8 py-6 text-white shadow-xl">

          <p className="text-sm font-medium text-green-100">
            Total Revenue
          </p>

          <h2 className="mt-2 text-4xl font-black">

            ₦
            {totalRevenue.toLocaleString()}

          </h2>

        </div>

      </div>

      {/* =========================
          EMPTY STATE
      ========================= */}
      {bookings.length === 0 && (

        <div className="rounded-[36px] bg-white p-20 text-center shadow-sm">

          <Package
            size={70}
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

      {/* =========================
          MOBILE CARDS
      ========================= */}
      <div className="grid gap-6 lg:hidden">

        {bookings.map((booking) => {

          const isPackage =
            !!booking.package_id;

          return (

            <div
              key={booking.id}
              className="rounded-[32px] bg-white p-6 shadow-sm"
            >

              {/* CUSTOMER */}
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

                    <div className="mt-2 space-y-1">

                      <div className="flex items-center gap-2 text-sm text-slate-500">

                        <Mail size={14} />

                        {booking.email}

                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-500">

                        <Phone size={14} />

                        {booking.phone}

                      </div>

                    </div>

                  </div>

                </div>

                {/* TYPE */}
                <span
                  className={`rounded-full px-4 py-2 text-xs font-bold ${
                    isPackage
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >

                  {isPackage
                    ? "Package"
                    : "Ticket"}

                </span>

              </div>

              {/* INFO */}
              <div className="mt-6 rounded-2xl bg-slate-50 p-5">

                {isPackage ? (

                  <div className="flex items-center gap-3">

                    <Package
                      size={18}
                      className="text-blue-600"
                    />

                    <span className="font-semibold text-slate-900">

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

                      <span className="font-semibold text-slate-900">

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

                <span className="text-3xl font-black">

                  ₦
                  {Number(
                    booking.amount || 0
                  ).toLocaleString()}

                </span>

              </div>

              {/* FOOTER */}
              <div className="mt-6 flex items-center justify-between">

                {/* STATUS */}
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

                {/* DATE */}
                <div className="flex items-center gap-2 text-sm text-slate-500">

                  <CalendarDays
                    size={15}
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

      {/* =========================
          DESKTOP TABLE
      ========================= */}
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

            {bookings.map((booking) => {

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

                        <p className="mt-1 text-sm text-slate-400">

                          {booking.phone}

                        </p>

                      </div>

                    </div>

                  </td>

                  {/* TYPE */}
                  <td className="py-6">

                    <span
                      className={`rounded-full px-4 py-2 text-xs font-bold ${
                        isPackage
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >

                      {isPackage
                        ? "Package"
                        : "Ticket"}

                    </span>

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

    </main>
  );
}