"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  Settings,
  Save,
  Globe,
  Phone,
  Mail,
  MapPin,
  Image as ImageIcon,
  Loader2,
  ShieldCheck,
  CreditCard,
} from "lucide-react";

/* =========================
   API
========================= */
const API =
  "https://zainulabden-backend-production.up.railway.app/api/v1";

/* =========================
   PAGE
========================= */
export default function AdminSettings() {

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [formData, setFormData] =
    useState({

      company_name:
        "ZAIN Travel & Tours",

      email:
        "zain.travelsng@gmail.com",

      phone:
        "+2348155558069",

      address:
        "No. 3D Karaye Plaza, Opposite Ado Bayero Mall, Zoo Road, Kano",

      website:
        "https://zaintravel.com",

      currency:
        "NGN",

      support_email:
        "support@zaintravel.com",

      logo:
        "/logo.png",

      about:
        "Premium Hajj, Umrah, Visa and International Travel Services.",

    });

  /* =========================
     FETCH SETTINGS
  ========================= */
  async function fetchSettings() {

    try {

      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await axios.get(
          `${API}/admin/settings`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      if (
        response.data?.data
      ) {

        setFormData(
          response.data.data
        );
      }

    } catch (error) {

      console.log(
        "SETTINGS ERROR:",
        error
      );

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSettings();
  }, []);

  /* =========================
     HANDLE CHANGE
  ========================= */
  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  }

  /* =========================
     SAVE SETTINGS
  ========================= */
  async function saveSettings() {

    try {

      setSaving(true);

      const token =
        localStorage.getItem(
          "token"
        );

      await axios.put(
        `${API}/admin/settings`,
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert(
        "Settings updated successfully"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to save settings"
      );

    } finally {

      setSaving(false);
    }
  }

  /* =========================
     LOADING
  ========================= */
  if (loading) {

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
    <div className="space-y-10">

      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="flex items-center gap-4 text-5xl font-black text-slate-900">

            <Settings
              size={42}
              className="text-green-600"
            />

            Settings

          </h1>

          <p className="mt-3 text-lg text-slate-500">
            Manage your platform configuration
          </p>

        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={saveSettings}
          disabled={saving}
          className="flex items-center justify-center gap-3 rounded-2xl bg-green-600 px-8 py-5 text-lg font-bold text-white shadow-lg transition hover:bg-green-700 disabled:opacity-50"
        >

          {saving ? (

            <>
              <Loader2
                size={20}
                className="animate-spin"
              />

              Saving...
            </>

          ) : (

            <>
              <Save size={20} />

              Save Settings
            </>
          )}

        </button>

      </div>

      {/* SETTINGS CARD */}
      <div className="grid gap-8 lg:grid-cols-2">

        {/* COMPANY INFO */}
        <div className="rounded-[36px] bg-white p-8 shadow-sm">

          <h2 className="mb-8 text-3xl font-black text-slate-900">
            Company Information
          </h2>

          <div className="space-y-6">

            {/* COMPANY NAME */}
            <div>

              <label className="mb-3 block font-bold text-slate-700">
                Company Name
              </label>

              <div className="relative">

                <ShieldCheck
                  size={20}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-green-600"
                />

                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-5 pl-14 pr-5 outline-none focus:border-green-600"
                />

              </div>

            </div>

            {/* EMAIL */}
            <div>

              <label className="mb-3 block font-bold text-slate-700">
                Company Email
              </label>

              <div className="relative">

                <Mail
                  size={20}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-green-600"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-5 pl-14 pr-5 outline-none focus:border-green-600"
                />

              </div>

            </div>

            {/* PHONE */}
            <div>

              <label className="mb-3 block font-bold text-slate-700">
                Phone Number
              </label>

              <div className="relative">

                <Phone
                  size={20}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-green-600"
                />

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-5 pl-14 pr-5 outline-none focus:border-green-600"
                />

              </div>

            </div>

            {/* ADDRESS */}
            <div>

              <label className="mb-3 block font-bold text-slate-700">
                Office Address
              </label>

              <div className="relative">

                <MapPin
                  size={20}
                  className="absolute left-5 top-5 text-green-600"
                />

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="min-h-[140px] w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 pl-14 outline-none focus:border-green-600"
                />

              </div>

            </div>

          </div>

        </div>

        {/* PLATFORM */}
        <div className="rounded-[36px] bg-white p-8 shadow-sm">

          <h2 className="mb-8 text-3xl font-black text-slate-900">
            Platform Settings
          </h2>

          <div className="space-y-6">

            {/* WEBSITE */}
            <div>

              <label className="mb-3 block font-bold text-slate-700">
                Website URL
              </label>

              <div className="relative">

                <Globe
                  size={20}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-green-600"
                />

                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-5 pl-14 pr-5 outline-none focus:border-green-600"
                />

              </div>

            </div>

            {/* SUPPORT EMAIL */}
            <div>

              <label className="mb-3 block font-bold text-slate-700">
                Support Email
              </label>

              <div className="relative">

                <Mail
                  size={20}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-green-600"
                />

                <input
                  type="email"
                  name="support_email"
                  value={formData.support_email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-5 pl-14 pr-5 outline-none focus:border-green-600"
                />

              </div>

            </div>

           {/* CURRENCY */}
<div>

  <label className="mb-3 block font-bold text-slate-700">
    Currency
  </label>

  <div className="relative">

    <CreditCard
      size={20}
      className="absolute left-5 top-1/2 -translate-y-1/2 text-green-600"
    />

    <input
      type="text"
      name="currency"
      value={formData.currency}
      onChange={handleChange}
      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-5 pl-14 pr-5 outline-none focus:border-green-600"
    />

  </div>

</div>

{/* LOGO */}
<div>

  <label className="mb-3 block font-bold text-slate-700">
    Logo URL
  </label>

  <div className="relative">

    <ImageIcon
      size={20}
      className="absolute left-5 top-1/2 -translate-y-1/2 text-green-600"
    />

    <input
      type="text"
      name="logo"
      value={formData.logo}
      onChange={handleChange}
      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-5 pl-14 pr-5 outline-none focus:border-green-600"
    />

  </div>

</div>

{/* ABOUT */}
<div>

  <label className="mb-3 block font-bold text-slate-700">
    About Company
  </label>

  <textarea
    name="about"
    value={formData.about}
    onChange={handleChange}
    className="min-h-[160px] w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 outline-none focus:border-green-600"
  />

</div>

</div>

</div>

</div>

{/* PREVIEW */}
<div className="rounded-[36px] bg-gradient-to-r from-green-600 to-emerald-700 p-10 text-white shadow-lg">

  <div className="flex items-center gap-5">

    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-white/10 backdrop-blur">

      <img
        src={formData.logo}
        alt="Logo"
        className="h-16 object-contain"
      />

    </div>

    <div>

      <h2 className="text-4xl font-black">
        {formData.company_name}
      </h2>

      <p className="mt-2 text-green-100">
        {formData.about}
      </p>

    </div>

  </div>

  <div className="mt-10 grid gap-6 md:grid-cols-2">

    <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">

      <div className="flex items-center gap-3">

        <Phone size={20} />

        <span className="font-semibold">
          {formData.phone}
        </span>

      </div>

    </div>

    <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">

      <div className="flex items-center gap-3">

        <Mail size={20} />

        <span className="font-semibold">
          {formData.email}
        </span>

      </div>

    </div>

    <div className="rounded-3xl bg-white/10 p-6 backdrop-blur md:col-span-2">

      <div className="flex items-start gap-3">

        <MapPin size={20} />

        <span className="font-semibold">
          {formData.address}
        </span>

      </div>

    </div>

  </div>

</div>

</div>
);
}