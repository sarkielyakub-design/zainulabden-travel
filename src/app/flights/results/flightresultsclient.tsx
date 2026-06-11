"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Plane,
  Clock3,
  Luggage,
  ArrowRight,
  Loader2,
} from "lucide-react";

const API =
  "https://zainulabden-backend-production.up.railway.app/api/v1";

export default function FlightResultsClient() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useState<any[]>([]);

  useEffect(() => {
    loadFlights();
  }, []);

  const loadFlights = async () => {
    try {
      const searchParams = new URLSearchParams(
        window.location.search
      );

      const origin =
        searchParams.get("origin");

      const destination =
        searchParams.get("destination");

      const departure_date =
        searchParams.get(
          "departure_date"
        );

      const return_date =
        searchParams.get(
          "return_date"
        );

      const adults =
        Number(
          searchParams.get("adults")
        ) || 1;

      const response =
        await axios.post(
          `${API}/flights/search`,
          {
            origin,
            destination,
            departure_date,
            return_date,
            adults,
          }
        );

      setFlights(
        response.data.data || []
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const bookFlight = (
    flight: any
  ) => {
    router.push(
      `/flights/booking?airline=${encodeURIComponent(
        flight.airline
      )}&flight_number=${encodeURIComponent(
        flight.flight_number
      )}&origin=${encodeURIComponent(
        flight.departure
      )}&destination=${encodeURIComponent(
        flight.arrival
      )}&price=${encodeURIComponent(
        flight.price
      )}&currency=${encodeURIComponent(
        flight.currency
      )}`
    );
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-green-600" />
        <span className="ml-3 text-xl font-medium">
          Searching Flights...
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <h1 className="text-5xl font-black text-white">
            Available Flights
          </h1>

          <p className="mt-3 text-lg text-white/80">
            Compare fares from
            Emirates, Qatar Airways,
            Turkish Airlines,
            Ethiopian Airlines and
            more.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl p-6">
        {flights.length === 0 ? (
          <div className="rounded-3xl bg-white p-16 text-center shadow-sm">
            <Plane className="mx-auto h-14 w-14 text-slate-400" />

            <h2 className="mt-5 text-2xl font-bold">
              No Flights Found
            </h2>

            <p className="mt-2 text-slate-500">
              Try changing your search
              criteria.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {flights.map(
              (
                flight,
                index
              ) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="p-6">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                      <div className="min-w-[220px]">
                        <div className="mb-3 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                          BEST DEAL
                        </div>

                        <h3 className="text-2xl font-black">
                          {
                            flight.airline
                          }
                        </h3>

                        <p className="text-slate-500">
                          {
                            flight.flight_number
                          }
                        </p>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-slate-500">
                              Departure
                            </p>

                            <h2 className="text-3xl font-black">
                              {
                                flight.departure
                              }
                            </h2>
                          </div>

                          <div className="mx-8 flex-1">
                            <div className="mb-3 flex items-center justify-center gap-2 text-sm text-slate-500">
                              <Clock3 size={16} />
                              {flight.duration ||
                                "5h 35m"}
                            </div>

                            <div className="relative">
                              <div className="h-[2px] bg-slate-300" />

                              <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-green-600 text-white">
                                <Plane
                                  size={16}
                                  className="rotate-90"
                                />
                              </div>
                            </div>

                            <div className="mt-3 text-center text-sm font-medium text-slate-500">
                              Direct
                              Flight
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-sm text-slate-500">
                              Arrival
                            </p>

                            <h2 className="text-3xl font-black">
                              {
                                flight.arrival
                              }
                            </h2>
                          </div>
                        </div>
                      </div>

                      <div className="min-w-[230px] text-right">
                        <p className="text-sm text-slate-500">
                          Total
                          Price
                        </p>

                        <h2 className="text-4xl font-black text-green-600">
                          {
                            flight.currency
                          }{" "}
                          {
                            flight.price
                          }
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                          Per
                          Traveler
                        </p>

                        <button
                          onClick={() =>
                            bookFlight(
                              flight
                            )
                          }
                          className="mt-4 flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-4 font-bold text-white shadow-lg transition-all hover:scale-[1.02]"
                        >
                          Book
                          Flight

                          <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3 border-t pt-5">
                      <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium">
                        ✈ Economy
                        Class
                      </div>

                      <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium">
                        <Luggage size={16} />
                        23kg
                        Baggage
                      </div>

                      <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium">
                        Refundable
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
}