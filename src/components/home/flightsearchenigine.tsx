"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Search,
  Plane,
  CalendarDays,
  Users,
  ArrowLeftRight,
  Loader2,
} from "lucide-react";

export default function FlightSearchEngine() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [tripType, setTripType] =
    useState("roundtrip");

  const [origin, setOrigin] =
    useState("");

  const [destination, setDestination] =
    useState("");

  const [departureDate, setDepartureDate] =
    useState("");

  const [returnDate, setReturnDate] =
    useState("");

  const [adults, setAdults] =
    useState(1);

  const [children, setChildren] =
    useState(0);

  const [infants, setInfants] =
    useState(0);

  const [travelClass, setTravelClass] =
    useState("ECONOMY");

  const airports = [
    {
      code: "ABV",
      city: "Abuja",
    },
    {
      code: "KAN",
      city: "Kano",
    },
    {
      code: "LOS",
      city: "Lagos",
    },
    {
      code: "JED",
      city: "Jeddah",
    },
    {
      code: "MED",
      city: "Madinah",
    },
    {
      code: "DXB",
      city: "Dubai",
    },
    {
      code: "IST",
      city: "Istanbul",
    },
    {
      code: "CAI",
      city: "Cairo",
    },
    {
      code: "LHR",
      city: "London",
    },
  ];

  const searchFlights =
    async () => {
      if (
        !origin ||
        !destination ||
        !departureDate
      ) {
        alert(
          "Please fill all required fields"
        );
        return;
      }

      try {
        setLoading(true);

        router.push(
          `/flights/results?origin=${origin}&destination=${destination}&departure_date=${departureDate}&return_date=${returnDate}&adults=${adults}&children=${children}&infants=${infants}&travel_class=${travelClass}&trip_type=${tripType}`
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="rounded-[32px] border bg-white p-8 shadow-2xl">

      <div className="mb-8">

        <h2 className="text-4xl font-black text-slate-900">
          Search Flights
        </h2>

        <p className="mt-2 text-slate-500">
          Compare airlines and find
          the best fares worldwide
        </p>

      </div>

      {/* Trip Type */}

      <div className="mb-8 flex gap-3">

        <button
          onClick={() =>
            setTripType(
              "roundtrip"
            )
          }
          className={`rounded-xl px-6 py-3 font-bold transition ${
            tripType ===
            "roundtrip"
              ? "bg-green-600 text-white"
              : "bg-slate-100"
          }`}
        >
          Round Trip
        </button>

        <button
          onClick={() =>
            setTripType(
              "oneway"
            )
          }
          className={`rounded-xl px-6 py-3 font-bold transition ${
            tripType ===
            "oneway"
              ? "bg-green-600 text-white"
              : "bg-slate-100"
          }`}
        >
          One Way
        </button>

      </div>

      {/* Airports */}

      <div className="grid gap-5 lg:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm font-semibold">
            Flying From
          </label>

          <select
            value={origin}
            onChange={(e) =>
              setOrigin(
                e.target.value
              )
            }
            className="w-full rounded-xl border p-4"
          >
            <option value="">
              Select Airport
            </option>

            {airports.map(
              (airport) => (
                <option
                  key={
                    airport.code
                  }
                  value={
                    airport.code
                  }
                >
                  {airport.city}
                  {" "}
                  (
                  {airport.code}
                  )
                </option>
              )
            )}

          </select>

        </div>

        <div>

          <label className="mb-2 block text-sm font-semibold">
            Destination
          </label>

          <select
            value={
              destination
            }
            onChange={(e) =>
              setDestination(
                e.target.value
              )
            }
            className="w-full rounded-xl border p-4"
          >
            <option value="">
              Select Destination
            </option>

            {airports.map(
              (airport) => (
                <option
                  key={
                    airport.code
                  }
                  value={
                    airport.code
                  }
                >
                  {airport.city}
                  {" "}
                  (
                  {airport.code}
                  )
                </option>
              )
            )}

          </select>

        </div>

      </div>

      {/* Dates */}

      <div className="mt-6 grid gap-5 lg:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm font-semibold">
            Departure Date
          </label>

          <input
            type="date"
            value={
              departureDate
            }
            onChange={(e) =>
              setDepartureDate(
                e.target.value
              )
            }
            className="w-full rounded-xl border p-4"
          />

        </div>

        {tripType ===
          "roundtrip" && (
          <div>

            <label className="mb-2 block text-sm font-semibold">
              Return Date
            </label>

            <input
              type="date"
              value={
                returnDate
              }
              onChange={(e) =>
                setReturnDate(
                  e.target.value
                )
              }
              className="w-full rounded-xl border p-4"
            />

          </div>
        )}

      </div>

      {/* Passengers */}

      <div className="mt-6 grid gap-5 md:grid-cols-4">

        <div>

          <label className="mb-2 block text-sm font-semibold">
            Adults
          </label>

          <input
            type="number"
            min={1}
            value={adults}
            onChange={(e) =>
              setAdults(
                Number(
                  e.target.value
                )
              )
            }
            className="w-full rounded-xl border p-4"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-semibold">
            Children
          </label>

          <input
            type="number"
            min={0}
            value={children}
            onChange={(e) =>
              setChildren(
                Number(
                  e.target.value
                )
              )
            }
            className="w-full rounded-xl border p-4"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-semibold">
            Infants
          </label>

          <input
            type="number"
            min={0}
            value={infants}
            onChange={(e) =>
              setInfants(
                Number(
                  e.target.value
                )
              )
            }
            className="w-full rounded-xl border p-4"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-semibold">
            Cabin Class
          </label>

          <select
            value={
              travelClass
            }
            onChange={(e) =>
              setTravelClass(
                e.target.value
              )
            }
            className="w-full rounded-xl border p-4"
          >
            <option value="ECONOMY">
              Economy
            </option>

            <option value="PREMIUM_ECONOMY">
              Premium Economy
            </option>

            <option value="BUSINESS">
              Business
            </option>

            <option value="FIRST">
              First Class
            </option>

          </select>

        </div>

      </div>

      {/* Search Button */}

      <button
        onClick={searchFlights}
        disabled={loading}
        className="mt-8 flex w-full items-center justify-center rounded-xl bg-green-600 py-4 text-lg font-bold text-white transition hover:bg-green-700"
      >

        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Searching Flights...
          </>
        ) : (
          <>
            <Search className="mr-2 h-5 w-5" />
            Search Flights
          </>
        )}

      </button>

    </div>
  );
}