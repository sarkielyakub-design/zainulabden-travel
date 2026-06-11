"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Plane } from "lucide-react";

const API =
  "https://zainulabden-backend-production.up.railway.app/api/v1";

export default function FlightResultsClient() {
  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useState<any[]>([]);

  useEffect(() => {
    loadFlights();
  }, []);

  const loadFlights = async () => {
    try {
      // Manually parse query parameters from the current URL
      const searchParams = new URLSearchParams(window.location.search);
      const origin = searchParams.get("origin");
      const destination = searchParams.get("destination");
      const departure_date = searchParams.get("departure_date");
      const return_date = searchParams.get("return_date");
      const adults = Number(searchParams.get("adults")) || 1;

      const response = await axios.post(`${API}/flights/search`, {
        origin,
        destination,
        departure_date,
        return_date,
        adults,
      });

      setFlights(response.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading Flights...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-8 text-4xl font-black">Available Flights</h1>

      <div className="space-y-6">
        {flights.map((flight, index) => (
          <div
            key={index}
            className="rounded-3xl border bg-white p-6 shadow-sm"
          >
            <div className="grid gap-6 lg:grid-cols-5">
              <div>
                <h3 className="text-xl font-black">{flight.airline}</h3>
                <p className="text-slate-500">{flight.flight_number}</p>
              </div>

              <div>
                <p className="font-bold">{flight.departure}</p>
                <p className="text-slate-500">Departure</p>
              </div>

              <div className="flex items-center justify-center">
                <Plane />
              </div>

              <div>
                <p className="font-bold">{flight.arrival}</p>
                <p className="text-slate-500">Arrival</p>
              </div>

              <div className="text-right">
                <h2 className="text-3xl font-black text-green-600">
                  {flight.currency} {flight.price}
                </h2>
                <button className="mt-3 rounded-xl bg-green-600 px-5 py-3 text-white">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}