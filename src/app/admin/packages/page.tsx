"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  Pencil,
  Trash2,
  Plus,
  Loader2,
  Plane,
  Hotel,
  CalendarDays,
  ShieldCheck,
  Search,
  ArrowRight,
} from "lucide-react";

import {
  getAdminPackages,
  deletePackage,
} from "@/src/services/admin-package-service";

export default function AdminPackages() {

  const [packages, setPackages] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [deletingId,
    setDeletingId] =
    useState<number | null>(null);

  const [search, setSearch] =
    useState("");

  /* =========================
     FETCH PACKAGES
  ========================= */
  async function fetchPackages() {

    try {

      setLoading(true);

      const res =
        await getAdminPackages();

      console.log(
        "ADMIN PACKAGES:",
        res.data
      );

      const packageData =
        Array.isArray(
          res.data
        )
          ? res.data
          : res.data.packages ||
            res.data.data ||
            [];

      setPackages(packageData);

    } catch (err) {

      console.log(
        "FETCH ERROR:",
        err
      );

      setPackages([]);

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPackages();
  }, []);

  /* =========================
     DELETE
  ========================= */
  async function handleDelete(
    id: number
  ) {

    const confirmDelete =
      confirm(
        "Delete package?"
      );

    if (!confirmDelete) return;

    try {

      setDeletingId(id);

      const token =
        localStorage.getItem(
          "token"
        );

      if (!token) {
        alert("No token found");
        return;
      }

      await deletePackage(
        id,
        token
      );

      setPackages((prev) =>
        prev.filter(
          (item) => item.id !== id
        )
      );

    } catch (err) {

      console.log(
        "DELETE ERROR:",
        err
      );

      alert(
        "Delete failed"
      );

    } finally {

      setDeletingId(null);
    }
  }

  /* =========================
     FILTER
  ========================= */
  const filteredPackages =
    packages.filter((item) => {

      const value = `
        ${item.title}
        ${item.description}
        ${item.flight_name}
        ${item.hotel_name}
      `.toLowerCase();

      return value.includes(
        search.toLowerCase()
      );
    });

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

        <div>

          <h1 className="text-5xl font-black text-slate-900">
            Packages
          </h1>

          <p className="mt-3 text-lg text-slate-500">
            Manage luxury travel packages
          </p>

        </div>

        {/* CREATE */}
        <Link
          href="/admin/packages/create"
          className="flex items-center justify-center gap-3 rounded-2xl bg-green-600 px-7 py-5 text-lg font-bold text-white shadow-lg shadow-green-500/20 transition hover:bg-green-700"
        >

          <Plus size={22} />

          Create Package

        </Link>

      </div>

      {/* SEARCH */}
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-sm">

        <Search className="text-green-600" />

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="Search packages..."
          className="w-full bg-transparent text-lg outline-none"
        />

      </div>

      {/* LOADING */}
      {loading && (

        <div className="flex min-h-[40vh] items-center justify-center">

          <Loader2
            size={40}
            className="animate-spin text-green-600"
          />

        </div>
      )}

      {/* EMPTY */}
      {!loading &&
        filteredPackages.length === 0 && (

        <div className="rounded-[36px] bg-white p-20 text-center shadow-sm">

          <ShieldCheck
            size={60}
            className="mx-auto text-slate-300"
          />

          <h2 className="mt-6 text-4xl font-black text-slate-900">
            No Packages Found
          </h2>

          <p className="mt-3 text-slate-500">
            Create your first travel package
          </p>

        </div>
      )}

      {/* GRID */}
      {!loading &&
        filteredPackages.length > 0 && (

        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">

          {filteredPackages.map(
            (item) => {

            const spotsLeft =
              item.total_slots -
              item.booked_slots;

            const progress =
              (item.booked_slots /
                item.total_slots) *
              100;

            return (

              <div
                key={item.id}
                className="group overflow-hidden rounded-[40px] bg-white shadow-[0_20px_80px_rgba(15,23,42,0.08)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_100px_rgba(15,23,42,0.16)]"
              >

                {/* IMAGE */}
                <div className="relative h-[300px] overflow-hidden">

                  <img
                    src={
                      item.image_url ||
                      "https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1600&auto=format&fit=crop"
                    }
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  {/* CATEGORY */}
                  <div className="absolute left-5 top-5 rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white">

                    {item.category}

                  </div>

                  {/* PRICE */}
                  <div className="absolute bottom-5 right-5 rounded-2xl bg-white/90 px-5 py-3 backdrop-blur">

                    <h3 className="text-3xl font-black text-green-600">

                      ₦
                      {Number(
                        item.price
                      ).toLocaleString()}

                    </h3>

                  </div>

                </div>

                {/* BODY */}
                <div className="p-8">

                  {/* TITLE */}
                  <h2 className="text-4xl font-black leading-tight text-slate-900">

                    {item.title}

                  </h2>

                  {/* DESCRIPTION */}
                  <p className="mt-6 line-clamp-3 text-lg leading-9 text-slate-600">

                    {item.description}

                  </p>

                  {/* FEATURES */}
                  <div className="mt-8 space-y-4">

                    {/* FLIGHT */}
                    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">

                      <Plane className="text-green-600" />

                      <span className="font-semibold text-slate-700">

                        {item.flight_name}

                      </span>

                    </div>

                    {/* HOTEL */}
                    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">

                      <Hotel className="text-green-600" />

                      <span className="font-semibold text-slate-700">

                        {item.hotel_name}

                      </span>

                    </div>

                    {/* DATE */}
                    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">

                      <CalendarDays className="text-green-600" />

                      <span className="font-semibold text-slate-700">

                        {item.departure_date}

                      </span>

                    </div>

                  </div>

                  {/* SLOT */}
                  <div className="mt-8 rounded-3xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-5">

                    {/* TOP */}
                    <div className="mb-4 flex items-center justify-between">

                      <div className="flex items-center gap-2">

                        <ShieldCheck
                          size={18}
                          className="text-green-600"
                        />

                        <span className="font-bold text-green-700">

                          {spotsLeft}
                          {" "}
                          spots left

                        </span>

                      </div>

                      <span className="text-sm text-slate-500">

                        {item.booked_slots}
                        {" "}
                        booked

                      </span>

                    </div>

                    {/* PROGRESS */}
                    <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                      <div
                        className="h-full rounded-full bg-green-600 transition-all duration-700"
                        style={{
                          width:
                            `${progress}%`,
                        }}
                      />

                    </div>

                  </div>

                  {/* FOOTER */}
                  <div className="mt-10 flex items-center justify-between">

                    {/* EDIT */}
                    <Link
                      href={`/admin/packages/${item.id}`}
                      className="flex items-center gap-3 rounded-2xl bg-blue-500 px-5 py-4 font-bold text-white transition hover:bg-blue-600"
                    >

                      <Pencil size={18} />

                      Edit

                    </Link>

                    {/* DELETE */}
                    <button
                      onClick={() =>
                        handleDelete(
                          item.id
                        )
                      }
                      disabled={
                        deletingId ===
                        item.id
                      }
                      className="flex items-center gap-3 rounded-2xl bg-red-500 px-5 py-4 font-bold text-white transition hover:bg-red-600 disabled:opacity-50"
                    >

                      {deletingId ===
                      item.id ? (

                        <>
                          <Loader2
                            size={18}
                            className="animate-spin"
                          />

                          Deleting...
                        </>

                      ) : (

                        <>
                          <Trash2 size={18} />

                          Delete
                        </>
                      )}

                    </button>

                  </div>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}