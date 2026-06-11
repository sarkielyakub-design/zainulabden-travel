"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const API =
  process.env.NEXT_PUBLIC_API_URL;

export default function FlightPaymentPage() {
  const { bookingId } = useParams();

  const [booking, setBooking] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    loadBooking();
  }, []);

  const loadBooking = async () => {
    try {
      const response =
        await axios.get(
          `${API}/flight-bookings/${bookingId}`
        );

      setBooking(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const payNow = async () => {
    try {
      setLoading(true);

      const response =
        await axios.post(
          `${API}/flight-payments/initialize`,
          {
            booking_id: booking.id,
          }
        );

      window.location.href =
        response.data.authorization_url;

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!booking)
    return (
      <div className="p-10">
        Loading...
      </div>
    );

  return (
    <div className="mx-auto max-w-4xl p-6">

      <div className="rounded-3xl bg-white p-8 shadow-lg">

        <h1 className="mb-8 text-3xl font-black">
          Booking Summary
        </h1>

        <div className="space-y-4">

          <div>
            Passenger:
            {" "}
            {booking.first_name}
            {" "}
            {booking.last_name}
          </div>

          <div>
            Route:
            {" "}
            {booking.origin}
            {" → "}
            {booking.destination}
          </div>

          <div>
            Travel Class:
            {" "}
            {booking.travel_class}
          </div>

          <div>
            Amount:
            {" "}
            ₦
            {booking.amount}
          </div>

        </div>

        <button
          onClick={payNow}
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-green-600 py-4 font-bold text-white"
        >
          {loading
            ? "Processing..."
            : "Pay Now"}
        </button>

      </div>

    </div>
  );
}