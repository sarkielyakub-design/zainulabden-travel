"use client";

import { useEffect, useState } from "react";

import {
  Search,
  Plane,
  CreditCard,
  CheckCircle,
  Ticket,
} from "lucide-react";

import {
  getFlightBookings,
  confirmBooking,
  ticketBooking,
} from "@/src/services/flight-booking-service";

export default function FlightBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  // 🔒 Force HTTPS – if page loads over HTTP, redirect to HTTPS
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.protocol === "http:") {
      const httpsUrl = `https://${window.location.host}${window.location.pathname}${window.location.search}`;
      window.location.replace(httpsUrl);
    }
  }, []);

  const loadBookings = async () => {
    try {
      const data = await getFlightBookings();
      console.log("BOOKINGS FROM API:", data);
      setBookings(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) =>
    `${booking.booking_reference}
     ${booking.first_name}
     ${booking.last_name}
     ${booking.origin}
     ${booking.destination}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + Number(booking.amount || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-black text-slate-900">Flight Bookings</h1>
        <p className="mt-2 text-slate-500">
          Manage flight reservations and passengers
        </p>
      </div>

      {/* STATS */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Bookings</p>
              <h2 className="mt-2 text-3xl font-black">{bookings.length}</h2>
            </div>
            <Plane className="text-blue-600" />
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Paid</p>
              <h2 className="mt-2 text-3xl font-black text-green-600">
                {bookings.filter((b) => b.payment_status === "paid").length}
              </h2>
            </div>
            <CreditCard className="text-green-600" />
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Ticketed</p>
              <h2 className="mt-2 text-3xl font-black text-blue-600">
                {bookings.filter((b) => b.booking_status === "ticketed").length}
              </h2>
            </div>
            <Ticket className="text-blue-600" />
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Revenue</p>
              <h2 className="mt-2 text-2xl font-black text-emerald-600">
                ₦{totalRevenue.toLocaleString()}
              </h2>
            </div>
            <CheckCircle className="text-emerald-600" />
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="rounded-3xl bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3 rounded-2xl border px-4 py-3">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search booking..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 text-left">Reference</th>
                <th className="p-4 text-left">Passenger</th>
                <th className="p-4 text-left">Route</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Payment</th>
                <th className="p-4 text-left">Booking</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-t hover:bg-slate-50">
                    <td className="p-4 font-bold">{booking.booking_reference}</td>
                    <td className="p-4">
                      {booking.first_name} {booking.last_name}
                    </td>
                    <td className="p-4">
                      {booking.origin} → {booking.destination}
                    </td>
                    <td className="p-4 font-semibold">
                      ₦{Number(booking.amount).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          booking.payment_status === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {booking.payment_status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          booking.booking_status === "ticketed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {booking.booking_status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={async () => {
                            await confirmBooking(booking.id);
                            loadBookings();
                          }}
                          className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={async () => {
                            await ticketBooking(booking.id);
                            loadBookings();
                          }}
                          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                          Ticket
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-12 text-center">
                    <Plane size={50} className="mx-auto mb-4 text-slate-300" />
                    <h3 className="text-xl font-bold text-slate-700">
                      No Flight Bookings Found
                    </h3>
                    <p className="mt-2 text-slate-500">
                      Flight bookings will appear here.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}