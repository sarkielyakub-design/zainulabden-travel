"use client";

import { useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  Globe,
  CreditCard,
  Plane,
  Shield,
  Loader2,
  CheckCircle,
  Calendar,
  MapPin,
  Users,
  Star,
  Briefcase,
  Crown,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function FlightBookingPage() {
  const [loading, setLoading] = useState(false);

  // Complete form state with all fields from both snippets
  const [form, setForm] = useState({
    // Flight details (from selection, typically read-only)
    airline: "Qatar Airways",
    origin: "KAN",
    destination: "JED",
    departure_date: "2026-06-12",
    return_date: "2026-06-27",
    
    // Passenger personal info
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    
    // Contact
    email: "",
    phone: "",
    
    // Nationality
    nationality: "",
    
    // Passport info
    passport_number: "",
    passport_issue_date: "",
    passport_expiry_date: "",
    passport_issuing_country: "",
    
    // Extra
    emergency_contact: "",
    special_request: "",
    
    // Booking configuration
    adults: 1,
    travel_class: "ECONOMY",
    amount: 350,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "adults" ? parseInt(value) || 1 : value,
    }));
  };

  const createBooking = async () => {
    // Basic validation for required fields
    const requiredFields = [
      "first_name", "last_name", "email", "phone", "nationality",
      "passport_number", "passport_issue_date", "passport_expiry_date",
      "gender", "date_of_birth", "passport_issuing_country"
    ];
    const missing = requiredFields.filter(field => !form[field as keyof typeof form]);
    if (missing.length > 0) {
      alert(`Please fill in required fields: ${missing.join(", ")}`);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${API}/flight-bookings/`, form);
      const booking = response.data;
      window.location.href = `/flights/payment/${booking.booking_id}`;
    } catch (error: any) {
      console.log(error);
      console.log(error?.response?.data);
      alert(error?.response?.data?.detail || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  // Helper for travel class display
  const getTravelClassDisplay = (cls: string) => {
    const map: Record<string, string> = {
      ECONOMY: "Economy Class",
      BUSINESS: "Business Class",
      FIRST: "First Class",
    };
    return map[cls] || cls;
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
          background: #f4ecd8;
          background-image: radial-gradient(circle at 25% 40%, rgba(210, 180, 140, 0.08) 2%, transparent 2.5%),
                            radial-gradient(circle at 75% 60%, rgba(160, 120, 80, 0.06) 1.5%, transparent 2%);
          background-size: 48px 48px, 32px 32px;
        }
        
        .vintage-card {
          background: #fffef7;
          border: 1px solid #e8dcc8;
          box-shadow: 8px 8px 24px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.03);
          transition: all 0.3s ease;
        }
        
        .vintage-card:hover {
          box-shadow: 12px 12px 28px rgba(0, 0, 0, 0.1);
          border-color: #d4c4a8;
        }
        
        .vintage-input {
          background: #ffffff;
          border: 1px solid #e2d6c2;
          transition: all 0.2s;
          font-family: 'Inter', sans-serif;
        }
        
        .vintage-input:focus {
          border-color: #b8860b;
          box-shadow: 0 0 0 3px rgba(184, 134, 11, 0.1);
          outline: none;
        }
        
        .vintage-button {
          background: linear-gradient(135deg, #8b6914 0%, #c9a03d 50%, #dbb45c 100%);
          border: 1px solid #f5e6b0;
          box-shadow: 0 4px 12px rgba(139, 105, 20, 0.3);
          transition: all 0.25s;
        }
        
        .vintage-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(139, 105, 20, 0.4);
          background: linear-gradient(135deg, #9b7824 0%, #dbb04d 50%, #e8c46c 100%);
        }
        
        .vintage-button:active:not(:disabled) {
          transform: translateY(1px);
        }
        
        .vintage-label {
          font-family: 'Playfair Display', serif;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: #4a3b22;
        }
        
        .vintage-heading {
          font-family: 'Playfair Display', serif;
          font-weight: 800;
          background: linear-gradient(135deg, #6b4c1a, #b8860b);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.05);
        }
        
        .ornate-border {
          position: relative;
          border-radius: 24px;
        }
        
        .ornate-border::before {
          content: '';
          position: absolute;
          top: 12px;
          left: 12px;
          right: 12px;
          bottom: 12px;
          pointer-events: none;
          border: 1px dashed rgba(184, 134, 11, 0.2);
          border-radius: 20px;
        }
        
        .step-active {
          background: linear-gradient(135deg, #d4af37, #f5e6b0);
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2);
        }
      `}</style>

      <div className="min-h-screen font-['Inter',sans-serif]">
        {/* VINTAGE HEADER WITH ORNATE DETAILS */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#2c2416] via-[#4a3720] to-[#2c2416] border-b-4 border-[#d4af37]">
          <div className="absolute inset-0 opacity-10" 
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`, backgroundRepeat: 'repeat' }}></div>
          <div className="mx-auto max-w-7xl px-6 py-12 relative">
            <div className="flex items-center gap-3 mb-2">
              <Plane className="h-8 w-8 text-[#d4af37]" fill="#d4af37" />
              <span className="text-[#f5e6b0] font-['Playfair_Display'] text-sm tracking-widest">EST. 2024</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-['Playfair_Display'] font-black text-white tracking-tight">
              Royal <span className="text-[#d4af37]">Booking</span>
            </h1>
            <p className="mt-3 text-[#e8dcc8] text-lg max-w-xl font-['Inter']">
              Complete your passage with elegance and precision — fill in your travel documents below.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* LEFT SIDE - FORM SECTIONS */}
            <div className="lg:col-span-2 space-y-8">
              {/* VINTAGE PROGRESS INDICATOR */}
              <div className="vintage-card rounded-3xl p-6 flex items-center gap-4 relative ornate-border">
                <CheckCircle className="h-8 w-8 text-[#d4af37]" />
                <div className="flex-1 h-2 bg-[#e8dcc8] rounded-full overflow-hidden">
                  <div className="w-2/5 h-full bg-gradient-to-r from-[#d4af37] to-[#f5e6b0] rounded-full"></div>
                </div>
                <div className="h-2 flex-1 bg-[#e8dcc8] rounded-full"></div>
                <div className="h-2 flex-1 bg-[#e8dcc8] rounded-full"></div>
                <span className="text-xs font-semibold text-[#8b6914] font-['Playfair_Display']">Step 1 of 3</span>
              </div>

              {/* FLIGHT DETAILS SUMMARY CARD (read-only reference) */}
              <div className="vintage-card rounded-3xl p-8 ornate-border">
                <div className="flex items-center gap-3 mb-6">
                  <Briefcase className="h-6 w-6 text-[#b8860b]" />
                  <h2 className="vintage-heading text-2xl">Itinerary Overview</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                  <div>
                    <p className="text-xs text-[#8a7a62] uppercase tracking-wide">Route</p>
                    <p className="font-bold text-[#2c2416]">{form.origin} ✈ {form.destination}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#8a7a62] uppercase tracking-wide">Dates</p>
                    <p className="font-medium text-sm">{form.departure_date} — {form.return_date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#8a7a62] uppercase tracking-wide">Carrier</p>
                    <p className="font-semibold">{form.airline}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#8a7a62] uppercase tracking-wide">Class</p>
                    <p className="font-semibold flex items-center gap-1"><Crown className="h-3 w-3 text-[#d4af37]"/> {getTravelClassDisplay(form.travel_class)}</p>
                  </div>
                </div>
              </div>

              {/* PASSENGER INFORMATION */}
              <div className="vintage-card rounded-3xl p-8 ornate-border">
                <div className="flex items-center gap-3 mb-6">
                  <User className="h-6 w-6 text-[#b8860b]" />
                  <h2 className="vintage-heading text-2xl">Passenger Details</h2>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                  <input name="first_name" placeholder="First Name *" onChange={handleChange} className="vintage-input rounded-2xl p-4" />
                  <input name="middle_name" placeholder="Middle Name" onChange={handleChange} className="vintage-input rounded-2xl p-4" />
                  <input name="last_name" placeholder="Surname *" onChange={handleChange} className="vintage-input rounded-2xl p-4" />
                </div>
                <div className="grid gap-5 md:grid-cols-2 mt-5">
                  <select name="gender" onChange={handleChange} className="vintage-input rounded-2xl p-4 bg-white">
                    <option value="">Gender *</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <input type="date" name="date_of_birth" placeholder="Date of Birth *" onChange={handleChange} className="vintage-input rounded-2xl p-4" />
                </div>
                <div className="grid gap-5 md:grid-cols-2 mt-5">
                  <div className="flex items-center gap-3 bg-[#faf7f0] p-3 rounded-2xl">
                    <Users className="h-5 w-5 text-[#b8860b]" />
                    <select name="adults" value={form.adults} onChange={handleChange} className="bg-transparent font-medium focus:outline-none">
                      {[1,2,3,4,5,6,7,8,9].map(num => <option key={num} value={num}>{num} Adult{num !== 1 ? 's' : ''}</option>)}
                    </select>
                  </div>
                  <select name="travel_class" value={form.travel_class} onChange={handleChange} className="vintage-input rounded-2xl p-4">
                    <option value="ECONOMY">Economy Class</option>
                    <option value="BUSINESS">Business Class</option>
                    <option value="FIRST">First Class</option>
                  </select>
                </div>
              </div>

              {/* CONTACT DETAILS */}
              <div className="vintage-card rounded-3xl p-8 ornate-border">
                <div className="flex items-center gap-3 mb-6">
                  <Mail className="h-6 w-6 text-[#b8860b]" />
                  <h2 className="vintage-heading text-2xl">Contact Information</h2>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <input name="email" type="email" placeholder="Email Address *" onChange={handleChange} className="vintage-input rounded-2xl p-4" />
                  <input name="phone" placeholder="Phone Number *" onChange={handleChange} className="vintage-input rounded-2xl p-4" />
                </div>
                <input name="nationality" placeholder="Nationality / Country *" onChange={handleChange} className="vintage-input rounded-2xl p-4 mt-5 w-full" />
              </div>

              {/* PASSPORT & DOCUMENTS */}
              <div className="vintage-card rounded-3xl p-8 ornate-border">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="h-6 w-6 text-[#b8860b]" />
                  <h2 className="vintage-heading text-2xl">Passport & Travel Documents</h2>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <input name="passport_number" placeholder="Passport Number *" onChange={handleChange} className="vintage-input rounded-2xl p-4" />
                  <input name="passport_issuing_country" placeholder="Issuing Country *" onChange={handleChange} className="vintage-input rounded-2xl p-4" />
                  <input type="date" name="passport_issue_date" onChange={handleChange} className="vintage-input rounded-2xl p-4" />
                  <input type="date" name="passport_expiry_date" onChange={handleChange} className="vintage-input rounded-2xl p-4" />
                </div>
              </div>

              {/* ADDITIONAL REQUESTS */}
              <div className="vintage-card rounded-3xl p-8 ornate-border">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="h-6 w-6 text-[#b8860b]" />
                  <h2 className="vintage-heading text-2xl">Special Assistance</h2>
                </div>
                <input name="emergency_contact" placeholder="Emergency Contact (Name + Phone)" onChange={handleChange} className="vintage-input rounded-2xl p-4 mb-5 w-full" />
                <textarea name="special_request" placeholder="Meal preferences, wheelchair, medical needs, or other requests..." rows={3} onChange={handleChange} className="vintage-input rounded-2xl p-4 w-full resize-none"></textarea>
              </div>
            </div>

            {/* RIGHT SIDE - SUMMARY & PAYMENT */}
            <div>
              <div className="sticky top-6 vintage-card rounded-3xl p-8 ornate-border">
                <div className="flex items-center gap-3 mb-6 border-b border-[#e8dcc8] pb-4">
                  <Plane className="h-7 w-7 text-[#d4af37]" fill="#d4af37" />
                  <h2 className="vintage-heading text-2xl">Booking Summary</h2>
                </div>
                
                <div className="space-y-5 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-[#6b5a42]">Flight</span>
                    <span className="font-semibold">{form.airline}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6b5a42]">Route</span>
                    <span className="font-mono font-bold">{form.origin} → {form.destination}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6b5a42]">Departure</span>
                    <span>{form.departure_date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6b5a42]">Cabin</span>
                    <span className="flex items-center gap-1"><Star className="h-3 w-3 text-[#d4af37]"/>{getTravelClassDisplay(form.travel_class)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6b5a42]">Travelers</span>
                    <span>{form.adults} Adult{form.adults !== 1 ? 's' : ''}</span>
                  </div>
                </div>

                <div className="my-6 border-t border-dashed border-[#e0d0b6]" />

                <div className="mb-2 flex justify-between items-baseline">
                  <span className="text-[#6b5a42] text-sm">Base fare</span>
                  <span>${form.amount}</span>
                </div>
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-[#6b5a42] text-sm">Taxes & surcharges</span>
                  <span>$48</span>
                </div>
                
                <div className="border-t border-[#e8dcc8] my-4 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="vintage-label text-lg">Total Amount</span>
                    <h3 className="text-4xl font-black text-[#b8860b]">${form.amount + 48}</h3>
                  </div>
                  <p className="text-[10px] text-[#8a7a62] mt-1">Including taxes & service fees</p>
                </div>

                <button
                  onClick={createBooking}
                  disabled={loading}
                  className="vintage-button mt-6 flex h-14 w-full items-center justify-center rounded-2xl text-white font-bold text-lg gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Crown className="h-5 w-5" />
                      Continue to Payment
                    </>
                  )}
                </button>
                <p className="text-center text-[10px] text-[#a0927a] mt-4">*All fields marked with asterisk are mandatory</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}