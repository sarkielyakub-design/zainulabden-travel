"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  Plane,
  Hotel,
  CalendarDays,
  Globe2,
  Loader2,
  ArrowRight,
  Trash2,
  ShieldCheck,
} from "lucide-react";

import {
  getSinglePackage,
  updatePackage,
  deletePackage,
} from "@/src/services/admin-package-service";

export default function EditPackage({
  params,
}: any) {

  const router = useRouter();

  const [data, setData] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  /* =========================
     FETCH PACKAGE
  ========================= */
  async function fetchPackage() {

    try {

      const res =
        await getSinglePackage(
          params.id
        );

      console.log(res.data);

      setData(
        res.data
      );

    } catch (error) {

      console.log(error);

    }
  }

  useEffect(() => {
    fetchPackage();
  }, []);

  /* =========================
     UPDATE
  ========================= */
  async function handleSubmit(
    e: any
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      const formData =
        new FormData(e.target);

      await updatePackage(
        params.id,
        formData,
        token!
      );

      alert(
        "Package updated successfully"
      );

      router.push(
        "/admin/packages"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Update failed"
      );

    } finally {

      setLoading(false);
    }
  }

  /* =========================
     DELETE
  ========================= */
  async function handleDelete() {

    const confirmDelete =
      confirm(
        "Delete package?"
      );

    if (!confirmDelete) return;

    try {

      setDeleting(true);

      const token =
        localStorage.getItem(
          "token"
        );

      await deletePackage(
        Number(params.id),
        token!
      );

      alert(
        "Package deleted"
      );

      router.push(
        "/admin/packages"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Delete failed"
      );

    } finally {

      setDeleting(false);
    }
  }

  /* =========================
     LOADING
  ========================= */
  if (!data) {

    return (
      <div className="flex min-h-[50vh] items-center justify-center">

        <Loader2
          size={40}
          className="animate-spin text-green-600"
        />

      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl rounded-[40px] bg-white p-10 shadow-xl">

      {/* HEADER */}
      <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-green-100 text-green-600">

            <Globe2 size={40} />

          </div>

          <h1 className="text-5xl font-black text-slate-900">
            Edit Package
          </h1>

          <p className="mt-4 text-lg text-slate-500">
            Update package information professionally
          </p>

        </div>

        {/* DELETE */}
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center justify-center gap-3 rounded-2xl bg-red-500 px-7 py-5 text-lg font-bold text-white transition hover:bg-red-600 disabled:opacity-50"
        >

          {deleting ? (
            <>
              <Loader2
                size={22}
                className="animate-spin"
              />

              Deleting...
            </>
          ) : (
            <>
              <Trash2 size={22} />

              Delete Package
            </>
          )}

        </button>

      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid gap-6 md:grid-cols-2"
      >

        {/* TITLE */}
        <input
          name="title"
          defaultValue={data.title}
          placeholder="Package Title"
          className="rounded-2xl border p-5"
        />

        {/* CATEGORY */}
        <select
          name="category"
          defaultValue={data.category}
          className="rounded-2xl border p-5"
        >

          <option value="Umrah">
            Umrah
          </option>

          <option value="Hajj">
            Hajj
          </option>

          <option value="Dubai">
            Dubai
          </option>

          <option value="Turkey">
            Turkey
          </option>

          <option value="VIP">
            VIP
          </option>

        </select>

        {/* AIRLINE */}
        <input
          name="flight_name"
          defaultValue={data.flight_name}
          placeholder="Flight Name"
          className="rounded-2xl border p-5"
        />

        {/* HOTEL */}
        <input
          name="hotel_name"
          defaultValue={data.hotel_name}
          placeholder="Hotel Name"
          className="rounded-2xl border p-5"
        />

        {/* FROM */}
        <input
          name="flight_from"
          defaultValue={data.flight_from}
          placeholder="Departure Airport"
          className="rounded-2xl border p-5"
        />

        {/* TO */}
        <input
          name="flight_to"
          defaultValue={data.flight_to}
          placeholder="Destination Airport"
          className="rounded-2xl border p-5"
        />

        {/* HOTEL RATING */}
        <input
          name="hotel_rating"
          defaultValue={data.hotel_rating}
          placeholder="Hotel Rating"
          className="rounded-2xl border p-5"
        />

        {/* DURATION */}
        <input
          name="duration_days"
          defaultValue={data.duration_days}
          type="number"
          placeholder="Duration Days"
          className="rounded-2xl border p-5"
        />

        {/* SLOTS */}
        <input
          name="total_slots"
          defaultValue={data.total_slots}
          type="number"
          placeholder="Total Slots"
          className="rounded-2xl border p-5"
        />

        {/* PRICE */}
        <input
          name="price"
          defaultValue={data.price}
          type="number"
          placeholder="Price"
          className="rounded-2xl border p-5"
        />

        {/* DEPARTURE */}
        <div className="flex items-center gap-3 rounded-2xl border p-5">

          <CalendarDays className="text-green-600" />

          <input
            name="departure_date"
            type="date"
            defaultValue={data.departure_date}
            className="w-full outline-none"
          />

        </div>

        {/* RETURN */}
        <div className="flex items-center gap-3 rounded-2xl border p-5">

          <CalendarDays className="text-green-600" />

          <input
            name="return_date"
            type="date"
            defaultValue={data.return_date}
            className="w-full outline-none"
          />

        </div>

        {/* IMAGE */}
        <input
          name="image_url"
          defaultValue={data.image_url}
          placeholder="Image URL"
          className="rounded-2xl border p-5 md:col-span-2"
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          defaultValue={data.description}
          placeholder="Package Description"
          className="min-h-[180px] rounded-2xl border p-5 md:col-span-2"
        />

        {/* STATUS */}
        <div className="flex items-center gap-3 rounded-2xl bg-green-50 px-5 py-4 text-green-700 md:col-span-2">

          <ShieldCheck size={20} />

          <span className="font-bold">
            Package ID:
            {" "}
            {data.id}
          </span>

        </div>

        {/* BUTTON */}
        <button
          disabled={loading}
          className="flex items-center justify-center gap-3 rounded-2xl bg-green-600 py-5 text-lg font-bold text-white transition hover:bg-green-700 md:col-span-2"
        >

          {loading ? (
            <>
              <Loader2
                size={22}
                className="animate-spin"
              />

              Updating Package...
            </>
          ) : (
            <>
              Update Package

              <ArrowRight size={22} />
            </>
          )}

        </button>

      </form>

    </div>
  );
}