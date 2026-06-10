"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
// ... rest of your imports and code
import {
  Search,
  MapPin,
  CalendarDays,
  Plane,
  Star,
  ShieldCheck,
  ArrowRight,
  Loader2,
  Mail,
  Globe,
  Users,
  Award,
  Headphones,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";
import axios from "axios";

const API = "https://zainulabden-backend-production.up.railway.app/api/v1";

export default function Hero() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [fromAirport, setFromAirport] = useState("");
  const [toAirport, setToAirport] = useState("");

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Live search
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!search && !fromAirport && !toAirport) {
        setResults([]);
        return;
      }
      try {
        setLoading(true);
        const [ticketRes, packageRes] = await Promise.all([
          axios.get(`${API}/tickets/search?q=${search}`),
          axios.get(`${API}/packages/search?q=${search}`),
        ]);
        setResults([...(ticketRes.data || []), ...(packageRes.data || [])]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [search, fromAirport, toAirport]);

  // Stats with counter animation
  const stats = [
    { value: 12000, label: "Pilgrims Served", icon: Users, suffix: "+" },
    { value: 75, label: "Destinations", icon: Globe, suffix: "+" },
    { value: 99.8, label: "Success Rate", icon: Award, suffix: "%" },
    { value: 24, label: "Support Hours", icon: Headphones, suffix: "/7" },
  ];

  const [counters, setCounters] = useState(stats.map(() => 0));
  useEffect(() => {
    const timeouts = stats.map((stat, idx) => {
      const duration = 2000;
      const steps = 60;
      const increment = stat.value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          setCounters((prev) => {
            const newCounters = [...prev];
            newCounters[idx] = stat.value;
            return newCounters;
          });
          clearInterval(timer);
        } else {
          setCounters((prev) => {
            const newCounters = [...prev];
            newCounters[idx] = Math.floor(current);
            return newCounters;
          });
        }
      }, duration / steps);
      return timer;
    });
    return () => timeouts.forEach(clearInterval);
  }, []);

  return (
    <section
      ref={targetRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-emerald-50/30 to-white"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-green-400/20 blur-3xl animate-pulse delay-1000" />
        <div className="absolute left-0 top-1/2 h-72 w-72 rounded-full bg-teal-300/20 blur-3xl animate-pulse delay-500" />
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="container-custom relative grid min-h-screen items-center gap-12 py-16 lg:grid-cols-2 lg:py-24"
      >
        {/* LEFT COLUMN – MESSAGING */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-md backdrop-blur-sm border border-emerald-100">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-800">
              🇳🇬 West Africa’s Most Trusted Travel Partner
            </span>
          </div>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Your Sacred Journey
            <span className="block bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Begins Here
            </span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-slate-600 max-w-2xl">
            Premium Umrah, Hajj, flight tickets, visa processing, hotels & luxury travel experiences. 
            Tailored for pilgrims from Nigeria, Ghana, Senegal & across West Africa.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {["🕋 Licensed Agency", "💳 Secure Payments", "🕒 24/7 Support", "⭐ 4.9★ Rating"].map(
              (badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm border border-slate-100"
                >
                  {badge}
                </span>
              )
            )}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/packages">
              <Button className="h-14 rounded-xl bg-emerald-600 px-8 text-base font-bold shadow-lg shadow-emerald-500/30 hover:bg-emerald-700 transition-all duration-300">
                Explore Packages
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/tickets">
              <Button
                variant="outline"
                className="h-14 rounded-xl border-slate-300 bg-white/80 px-8 text-base font-bold hover:bg-slate-50"
              >
                Flight Tickets
              </Button>
            </Link>
          </div>

          {/* Newsletter */}
          <div className="mt-12 rounded-2xl bg-white/60 p-5 shadow-sm backdrop-blur-sm border border-white/50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Mail className="h-5 w-5 text-emerald-500" />
              Exclusive Umrah Deals
            </h3>
            <div className="mt-3 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-300"
              />
              <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-xl px-6">
                Subscribe
              </Button>
            </div>
          </div>

          {/* Animated Stats */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-2xl bg-white p-4 shadow-md border border-slate-100"
              >
                <stat.icon className="h-6 w-6 text-emerald-500 mb-2" />
                <p className="text-2xl font-black text-slate-900">
                  {counters[idx]}
                  {stat.suffix}
                </p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT COLUMN – SEARCH CARD + VISUAL */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-100">
            {/* Hero Image with floating cards */}
            <div className="relative h-72 md:h-80 overflow-hidden">
              <Image
                src="/images/kaaba-hero.jpg" // Ensure this image exists in public/images
                alt="Umrah travel"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 backdrop-blur-sm">
                <span className="text-xs font-bold text-emerald-700">⭐ 4.9 Rating</span>
              </div>
              <div className="absolute right-4 bottom-4 rounded-2xl bg-white/90 p-3 backdrop-blur-sm">
                <p className="text-xs text-slate-500">Starting from</p>
                <p className="text-xl font-black text-emerald-700">₦2.45M</p>
              </div>
            </div>

            {/* Live Search Form */}
            <div className="p-6">
              <h3 className="text-2xl font-black text-slate-900">Search Flights & Packages</h3>
              <p className="text-slate-500 text-sm mt-1">Real‑time availability across 75+ destinations</p>

              <div className="mt-5 space-y-4">
                {/* Keyword */}
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <Search className="h-5 w-5 text-emerald-500" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Umrah, Hajj, Dubai, London..."
                    className="w-full bg-transparent outline-none text-sm"
                  />
                </div>

                {/* Airports */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
                    <Plane className="h-4 w-4 text-emerald-500" />
                    <input
                      type="text"
                      value={fromAirport}
                      onChange={(e) => setFromAirport(e.target.value)}
                      placeholder="From"
                      className="w-full bg-transparent outline-none text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
                    <MapPin className="h-4 w-4 text-emerald-500" />
                    <input
                      type="text"
                      value={toAirport}
                      onChange={(e) => setToAirport(e.target.value)}
                      placeholder="To"
                      className="w-full bg-transparent outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
                    <CalendarDays className="h-4 w-4 text-emerald-500" />
                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="w-full bg-transparent outline-none text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
                    <CalendarDays className="h-4 w-4 text-emerald-500" />
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full bg-transparent outline-none text-sm"
                    />
                  </div>
                </div>

                <Button className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 h-12 font-bold">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Search Flights & Packages
                    </>
                  )}
                </Button>
              </div>

              {/* Live Results */}
              {results.length > 0 && (
                <div className="mt-5 rounded-xl border bg-slate-50 p-3 max-h-64 overflow-y-auto">
                  {results.slice(0, 4).map((item) => (
                    <Link
                      key={item.id}
                      href={item.airline ? `/tickets/${item.id}` : `/packages/${item.id}`}
                      className="block rounded-lg bg-white p-3 mb-2 hover:bg-emerald-50 transition"
                    >
                      <p className="font-bold text-slate-800">{item.title || item.airline}</p>
                      {item.from_airport && (
                        <p className="text-xs text-slate-500">
                          {item.from_airport} → {item.to_airport}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Trust Badge floating */}
          <div className="absolute -bottom-6 -left-6 hidden lg:block">
            <div className="rounded-full bg-white shadow-xl px-5 py-2 flex items-center gap-2 border border-emerald-100">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-semibold">12,000+ Happy Pilgrims</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}