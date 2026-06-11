"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftRight,
  Search,
} from "lucide-react";

export default function FlightSearchEngine() {
  const router = useRouter();

  const [tripType, setTripType] = useState("roundtrip");
  const [origin, setOrigin] = useState("ABV");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [travelClass, setTravelClass] = useState("Economy");

  const searchFlights = () => {
    router.push(
      `/flights/results?origin=${origin}&destination=${destination}`
    );
  };

  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">

      {/* Tabs */}

      <div className="flex border-b">

        <button
          onClick={() => setTripType("roundtrip")}
          className={`flex-1 py-4 text-lg font-semibold ${
            tripType === "roundtrip"
              ? "border-b-4 border-green-600 text-black"
              : "text-slate-500"
          }`}
        >
          Round Trip
        </button>

        <button
          onClick={() => setTripType("oneway")}
          className={`flex-1 py-4 text-lg font-semibold ${
            tripType === "oneway"
              ? "border-b-4 border-green-600 text-black"
              : "text-slate-500"
          }`}
        >
          One Way
        </button>

      </div>

      {/* From */}

      <div className="border-b p-5">

        <label className="mb-1 block text-sm text-slate-500">
          Flying From
        </label>

        <select
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="w-full bg-transparent text-2xl font-bold outline-none"
        >
          <option value="ABV">
            Abuja (ABV)
          </option>

          <option value="KAN">
            Kano (KAN)
          </option>

          <option value="LOS">
            Lagos (LOS)
          </option>

        </select>

      </div>

      {/* To */}

      <div className="relative border-b p-5">

        <button
          onClick={() => {
            const temp = origin;
            setOrigin(destination);
            setDestination(temp);
          }}
          className="absolute right-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl border bg-white shadow-sm"
        >
          <ArrowLeftRight size={18} />
        </button>

        <label className="mb-1 block text-sm text-slate-500">
          Destination
        </label>

        <select
          value={destination}
          onChange={(e) =>
            setDestination(e.target.value)
          }
          className="w-full bg-transparent pr-16 text-2xl font-bold outline-none"
        >
          <option value="">
            Select Destination
          </option>

          <option value="JED">
            Jeddah (JED)
          </option>

          <option value="MED">
            Madinah (MED)
          </option>

          <option value="DXB">
            Dubai (DXB)
          </option>

          <option value="IST">
            Istanbul (IST)
          </option>

          <option value="LHR">
            London (LHR)
          </option>

        </select>

      </div>

      {/* Dates */}

      <div className="border-b p-5">

        <label className="mb-1 block text-sm text-slate-500">
          Travel Dates
        </label>

        <div className="grid grid-cols-2 gap-4">

          <input
            type="date"
            value={departureDate}
            onChange={(e) =>
              setDepartureDate(e.target.value)
            }
            className="bg-transparent text-lg outline-none"
          />

          {tripType === "roundtrip" && (
            <input
              type="date"
              value={returnDate}
              onChange={(e) =>
                setReturnDate(e.target.value)
              }
              className="bg-transparent text-lg outline-none"
            />
          )}

        </div>

      </div>

      {/* Travelers */}

      <div className="border-b p-5">

        <label className="mb-1 block text-sm text-slate-500">
          Travelers & Cabin
        </label>

        <div className="flex flex-wrap gap-3">

          <select
            value={adults}
            onChange={(e) =>
              setAdults(Number(e.target.value))
            }
            className="rounded-lg border px-3 py-2"
          >
            {[1,2,3,4,5,6].map((n) => (
              <option key={n}>
                {n} Adult
              </option>
            ))}
          </select>

          <select
            value={travelClass}
            onChange={(e) =>
              setTravelClass(e.target.value)
            }
            className="rounded-lg border px-3 py-2"
          >
            <option>Economy</option>
            <option>Premium Economy</option>
            <option>Business</option>
            <option>First Class</option>
          </select>

        </div>

      </div>

      {/* Search */}

      <div className="p-5">

        <button
          onClick={searchFlights}
          className="flex h-14 w-full items-center justify-center rounded-2xl bg-green-600 text-lg font-bold text-white hover:bg-green-700"
        >
          <Search className="mr-2 h-5 w-5" />
          Search Flights
        </button>

      </div>

    </div>
  );
}