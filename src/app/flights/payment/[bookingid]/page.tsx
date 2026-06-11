"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import {
Plane,
ShieldCheck,
CreditCard,
User,
Loader2,
CheckCircle2,
Mail,
Phone,
} from "lucide-react";

const API =
process.env.NEXT_PUBLIC_API_URL ||
"https://zainulabden-backend-production.up.railway.app/api/v1";

interface Booking {
id: number;
first_name: string;
middle_name?: string;
last_name: string;
email: string;
phone: string;
nationality: string;
origin: string;
destination: string;
travel_class: string;
adults: number;
amount: number;
}

export default function FlightPaymentPage() {
const params = useParams();

const bookingId = Array.isArray(params.bookingId)
? params.bookingId[0]
: params.bookingId;

const [booking, setBooking] =
useState<Booking | null>(null);

const [loading, setLoading] =
useState(false);

useEffect(() => {
if (bookingId) {
loadBooking();
}
}, [bookingId]);

const loadBooking = async () => {
try {
const response = await axios.get(
`${API}/flight-bookings/${bookingId}`
);

  setBooking(response.data);
} catch (error) {
  console.log(error);
}

};

const payNow = async () => {
if (!booking) return;

try {
  setLoading(true);
  const response = await axios.post(
    `${API}/flight-payments/initialize`,
    {
      booking_id: booking.id,
    }
  );
  window.location.href =
    response.data.authorization_url;
} catch (error) {
  console.log(error);
  alert("Unable to initialize payment");
} finally {
  setLoading(false);
}

};

if (!booking) {
return (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex items-center gap-2">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span>Loading booking details…</span>
    </div>
  </div>
);
}

return (
  <>
    {/* HERO */}
    <div className="bg-gradient-to-r from-green-600 to-emerald-500 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="text-5xl font-black text-white">
          Complete Your Payment
        </h1>
        <p className="mt-3 text-lg text-white/80">
          Secure your flight reservation instantly
        </p>
      </div>
    </div>
  <div className="bg-slate-50">
    <div className="mx-auto max-w-7xl p-6">
      {/* Progress */}
      <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
            <span className="mt-2 text-sm font-medium">
              Search
            </span>
          </div>
          <div className="h-1 flex-1 rounded bg-green-600 mx-4" />
          <div className="flex flex-col items-center">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
            <span className="mt-2 text-sm font-medium">
              Booking
            </span>
          </div>
          <div className="h-1 flex-1 rounded bg-slate-300 mx-4" />
          <div className="flex flex-col items-center">
            <CreditCard className="h-8 w-8 text-slate-400" />
            <span className="mt-2 text-sm font-medium">
              Payment
            </span>
          </div>
        </div>
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        {/* LEFT */}
        <div className="space-y-8 lg:col-span-2">
          {/* Passenger */}
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <User className="text-green-600" />
              <h2 className="text-2xl font-black">
                Passenger Details
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm text-slate-500">
                  Full Name
                </p>
                <h3 className="font-bold text-lg">
                  {booking.first_name}{" "}
                  {booking.middle_name}{" "}
                  {booking.last_name}
                </h3>
              </div>
              <div>
                <p className="text-sm text-slate-500">
                  Nationality
                </p>
                <h3 className="font-bold text-lg">
                  {booking.nationality}
                </h3>
              </div>
              <div>
                <p className="flex items-center gap-2 text-sm text-slate-500">
                  <Mail size={14} />
                  Email
                </p>
                <h3 className="font-bold">
                  {booking.email}
                </h3>
              </div>
              <div>
                <p className="flex items-center gap-2 text-sm text-slate-500">
                  <Phone size={14} />
                  Phone
                </p>
                <h3 className="font-bold">
                  {booking.phone}
                </h3>
              </div>
            </div>
          </div>
          {/* Flight */}
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-3">
              <Plane className="text-green-600" />
              <h2 className="text-2xl font-black">
                Flight Information
              </h2>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Departure
                </p>
                <h2 className="text-5xl font-black">
                  {booking.origin}
                </h2>
              </div>
              <div className="flex flex-col items-center">
                <Plane className="h-8 w-8 text-green-600" />
                <span className="text-sm text-slate-500">
                  Direct Flight
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">
                  Arrival
                </p>
                <h2 className="text-5xl font-black">
                  {booking.destination}
                </h2>
              </div>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">
                  Travel Class
                </p>
                <h3 className="font-bold">
                  {booking.travel_class}
                </h3>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">
                  Passengers
                </p>
                <h3 className="font-bold">
                  {booking.adults} Adult
                </h3>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">
                  Status
                </p>
                <h3 className="font-bold text-green-600">
                  Reserved
                </h3>
              </div>
            </div>
          </div>
        </div>
        {/* RIGHT */}
        <div>
          <div className="sticky top-6 rounded-3xl bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <CreditCard className="text-green-600" />
              <h2 className="text-2xl font-black">
                Payment Summary
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Flight Fare</span>
                <span>₦{booking.amount}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Fees</span>
                <span>Included</span>
              </div>
              <div className="flex justify-between">
                <span>Service Charge</span>
                <span>₦0</span>
              </div>
            </div>
            <div className="my-6 border-t" />
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">
                Total
              </span>
              <span className="text-4xl font-black text-green-600">
                ₦{booking.amount}
              </span>
            </div>
            <div className="mt-6 rounded-2xl bg-green-50 p-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-green-600" />
                <span className="font-semibold text-green-700">
                  Secure Payment
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Powered by Paystack. Your payment is
                encrypted and protected.
              </p>
            </div>
            <button
              onClick={payNow}
              disabled={loading}
              className="mt-8 flex h-16 w-full items-center justify-center rounded-2xl bg-linear-to-r from-green-600 to-emerald-500 text-lg font-bold text-white shadow-lg transition hover:shadow-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                "Pay Now"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

);
}