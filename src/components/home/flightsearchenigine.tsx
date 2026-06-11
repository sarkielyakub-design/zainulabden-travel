"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftRight,
  Search,
  Plane,
  Calendar,
  Users,
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
      `/flights/results?origin=${origin}&destination=${destination}&departure_date=${departureDate}&return_date=${returnDate}`
    );
  };

  const swapAirports = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <div className="mx-auto max-w-6xl">

      <div className="overflow-hidden rounded-[40px] border border-white/20 bg-white/95 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.15)]">

        {/* Tabs */}

        <div className="flex border-b border-slate-200">

          {[
            { id: "roundtrip", label: "Round Trip" },
            { id: "oneway", label: "One Way" },
            { id: "multicity", label: "Multi City" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTripType(tab.id)}
              className={`flex-1 py-5 text-lg font-semibold transition-all ${
                tripType === tab.id
                  ? "border-b-4 border-green-600 text-green-600"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}

        </div>

        {/* Search Row */}

        <div className="grid lg:grid-cols-12">

          {/* From */}

          <div className="col-span-3 border-r border-slate-200 p-6">

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Plane size={15} />
              From
            </div>

            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="mt-3 w-full bg-transparent text-3xl font-black outline-none"
            >
              <option value="ABV">Abuja</option>
              <option value="KAN">Kano</option>
              <option value="LOS">Lagos</option>
            </select>

            <p className="mt-1 text-slate-500">
              Nigeria
            </p>

          </div>

          {/* Swap */}

          <div className="relative hidden lg:flex items-center justify-center">

            <button
              onClick={swapAirports}
              className="absolute z-10 flex h-14 w-14 items-center justify-center rounded-full border bg-white shadow-xl hover:scale-110 transition"
            >
              <ArrowLeftRight size={20} />
            </button>

          </div>

          {/* Destination */}

          <div className="col-span-3 border-r border-slate-200 p-6">

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Plane size={15} />
              To
            </div>

            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="mt-3 w-full bg-transparent text-3xl font-black outline-none"
            >
              <option value="">Anywhere</option>
              <option value="JED">Jeddah</option>
              <option value="MED">Madinah</option>
              <option value="DXB">Dubai</option>
              <option value="IST">Istanbul</option>
              <option value="LHR">London</option>
            </select>

            <p className="mt-1 text-slate-500">
              Select destination
            </p>

          </div>

          {/* Dates */}

          <div className="col-span-3 border-r border-slate-200 p-6">

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Calendar size={15} />
              Dates
            </div>

            <div className="mt-3">

              <input
                type="date"
                value={departureDate}
                onChange={(e) =>
                  setDepartureDate(e.target.value)
                }
                className="w-full bg-transparent text-lg font-bold outline-none"
              />

              {tripType === "roundtrip" && (
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) =>
                    setReturnDate(e.target.value)
                  }
                  className="mt-2 w-full bg-transparent text-lg font-bold outline-none"
                />
              )}

            </div>

          </div>

          {/* Travelers */}

          <div className="col-span-3 p-6">

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Users size={15} />
              Travelers
            </div>

            <div className="mt-3 flex gap-3">

              <select
                value={adults}
                onChange={(e) =>
                  setAdults(Number(e.target.value))
                }
                className="rounded-xl border px-4 py-3"
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
                className="rounded-xl border px-4 py-3"
              >
                <option>Economy</option>
                <option>Premium Economy</option>
                <option>Business</option>
                <option>First Class</option>
              </select>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="border-t border-slate-200 p-6">

          <button
            onClick={searchFlights}
            className="flex h-16 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 text-xl font-black text-white shadow-2xl transition-all hover:scale-[1.01]"
          >
            <Search className="mr-3 h-6 w-6" />
            Search Flights
          </button>

        </div>

      </div>

    </div>
  );
}