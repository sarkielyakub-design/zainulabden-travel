"use client";

import { useEffect, useState } from "react";

import {
  getFlightBookings,
  confirmBooking,
  ticketBooking,
} from "@/src/services/flight-booking-service";

export default function FlightBookingsPage() {
  const [bookings, setBookings] =
    useState<any[]>([]);

  const loadBookings = async () => {
    const data =
      await getFlightBookings();

    setBookings(data);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div className="p-6">

      <h1 className="mb-6 text-3xl font-bold">
        Flight Bookings
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full border">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-3">
                Ref
              </th>

              <th className="p-3">
                Passenger
              </th>

              <th className="p-3">
                Route
              </th>

              <th className="p-3">
                Amount
              </th>

              <th className="p-3">
                Payment
              </th>

              <th className="p-3">
                Status
              </th>

              <th className="p-3">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {bookings.map(
              (booking) => (
                <tr
                  key={booking.id}
                  className="border-t"
                >

                  <td className="p-3">
                    {
                      booking.booking_reference
                    }
                  </td>

                  <td className="p-3">
                    {booking.first_name}{" "}
                    {booking.last_name}
                  </td>

                  <td className="p-3">
                    {booking.origin}
                    {" → "}
                    {
                      booking.destination
                    }
                  </td>

                  <td className="p-3">
                    ₦
                    {booking.amount}
                  </td>

                  <td className="p-3">
                    {
                      booking.payment_status
                    }
                  </td>

                  <td className="p-3">
                    {
                      booking.booking_status
                    }
                  </td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={async () => {
                        await confirmBooking(
                          booking.id
                        );

                        loadBookings();
                      }}
                      className="rounded bg-green-600 px-3 py-1 text-white"
                    >
                      Confirm
                    </button>

                    <button
                      onClick={async () => {
                        await ticketBooking(
                          booking.id
                        );

                        loadBookings();
                      }}
                      className="rounded bg-blue-600 px-3 py-1 text-white"
                    >
                      Ticketed
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}