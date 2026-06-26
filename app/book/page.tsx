"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CalendarCheck, CheckCircle, ArrowLeft,
  User, Phone, MapPin, Wrench, Calendar, Clock, FileText
} from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SERVICE_NAMES } from "@/lib/services";
import Footer from "@/components/Footer";

interface FormData {
  name: string;
  phone: string;
  address: string;
  service: string;
  date: string;
  time: string;
  notes: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  address?: string;
  service?: string;
  date?: string;
  time?: string;
}

function BookingForm() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") || "";

  const [form, setForm] = useState<FormData>({
    name: "", phone: "", address: "",
    service: preselectedService, date: "", time: "", notes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);



  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!form.name.trim())    newErrors.name    = "Full name is required.";
    if (!form.phone.trim())   newErrors.phone   = "Phone number is required.";
    else if (!/^[0-9+\s\-()]{7,20}$/.test(form.phone.trim()))
                              newErrors.phone   = "Enter a valid phone number.";
    if (!form.address.trim()) newErrors.address = "Address is required.";
    if (!form.service)        newErrors.service = "Please select a service.";
    if (!form.date)           newErrors.date    = "Appointment date is required.";
    else {
      const today = new Date(); today.setHours(0,0,0,0);
      if (new Date(form.date) < today) newErrors.date = "Date cannot be in the past.";
    }
    if (!form.time)           newErrors.time    = "Appointment time is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, "bookings"), {
        name:    form.name.trim(),
        phone:   form.phone.trim(),
        address: form.address.trim(),
        service: form.service,
        date:    form.date,
        time:    form.time,
        notes:   form.notes.trim(),
        status:  "Pending",
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Booking error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleChange(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  const inputClass = (error?: string) =>
    `w-full h-[50px] px-4 rounded-[14px] border text-[#2B1D14] text-sm bg-[#FFFDFB] placeholder:text-[#c4b5a8] transition-smooth outline-none ${
      error
        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
        : "border-[#E8D8C8] focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#8B5E3C]/10"
    }`;

  // ── Success State ────────────────────────────────────────
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-5 text-center">
        <div className="bg-[#E8F3E6] border border-[#c3e0be] rounded-3xl p-10 max-w-md w-full shadow-card">
          <div className="w-16 h-16 bg-[#7E9F7A] rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-[#2B1D14] mb-3">Booking Submitted!</h2>
          <p className="text-[#7A6A5D] leading-relaxed mb-6">
            Your booking request has been submitted. The service provider will review it and contact you.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#8B5E3C] hover:bg-[#70492E] text-white font-semibold px-6 py-3 rounded-full transition-smooth"
          >
            <ArrowLeft className="w-4 h-4" />
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────
  return (
    <div className="max-w-[1200px] mx-auto px-5 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

      {/* Left: Info Panel */}
      <div className="lg:sticky lg:top-28">
        <p className="text-sm font-medium text-[#8B5E3C] uppercase tracking-widest mb-3">Book a Service</p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#2B1D14] mb-4">
          Book Your Appointment
        </h1>
        <p className="text-[#7A6A5D] leading-relaxed mb-8">
          Fill in your details and we&apos;ll get back to you to confirm your appointment.
          No payment needed upfront.
        </p>
        <ul className="space-y-4">
          {[
            { icon: CalendarCheck, text: "Choose your preferred date & time" },
            { icon: User,          text: "Personal, in-home service" },
            { icon: Phone,         text: "We contact you to confirm" },
            { icon: CheckCircle,   text: "No account needed — just fill the form" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <li key={i} className="flex items-center gap-3 text-sm text-[#7A6A5D]">
                <div className="w-8 h-8 rounded-xl bg-[#FFE3D3] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-[#8B5E3C]" />
                </div>
                {item.text}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Right: Form Card */}
      <div className="bg-white border border-[#E8D8C8] rounded-[28px] p-6 md:p-8 shadow-soft">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">

          {/* Full Name */}
          <div>
            <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-[#2B1D14] mb-1.5">
              <User className="w-4 h-4 text-[#8B5E3C]" /> Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={inputClass(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && <p id="name-error" className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-[#2B1D14] mb-1.5">
              <Phone className="w-4 h-4 text-[#8B5E3C]" /> Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="e.g. +91 98765 43210"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={inputClass(errors.phone)}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="flex items-center gap-2 text-sm font-medium text-[#2B1D14] mb-1.5">
              <MapPin className="w-4 h-4 text-[#8B5E3C]" /> Address
            </label>
            <input
              id="address"
              type="text"
              placeholder="Your full home address"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className={inputClass(errors.address)}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          {/* Service */}
          <div>
            <label htmlFor="service" className="flex items-center gap-2 text-sm font-medium text-[#2B1D14] mb-1.5">
              <Wrench className="w-4 h-4 text-[#8B5E3C]" /> Service
            </label>
            <select
              id="service"
              value={form.service}
              onChange={(e) => handleChange("service", e.target.value)}
              className={`${inputClass(errors.service)} cursor-pointer appearance-none`}
            >
              <option value="" disabled>Select a service</option>
              {SERVICE_NAMES.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
            {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="flex items-center gap-2 text-sm font-medium text-[#2B1D14] mb-1.5">
                <Calendar className="w-4 h-4 text-[#8B5E3C]" /> Date
              </label>
              <input
                id="date"
                type="date"
                value={form.date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => handleChange("date", e.target.value)}
                className={inputClass(errors.date)}
              />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
            </div>
            <div>
              <label htmlFor="time" className="flex items-center gap-2 text-sm font-medium text-[#2B1D14] mb-1.5">
                <Clock className="w-4 h-4 text-[#8B5E3C]" /> Time
              </label>
              <input
                id="time"
                type="time"
                value={form.time}
                onChange={(e) => handleChange("time", e.target.value)}
                className={inputClass(errors.time)}
              />
              {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="flex items-center gap-2 text-sm font-medium text-[#2B1D14] mb-1.5">
              <FileText className="w-4 h-4 text-[#8B5E3C]" /> Notes <span className="text-[#7A6A5D] font-normal">(optional)</span>
            </label>
            <textarea
              id="notes"
              placeholder="Any special requests or information..."
              value={form.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-[14px] border border-[#E8D8C8] bg-[#FFFDFB] text-[#2B1D14] text-sm placeholder:text-[#c4b5a8] transition-smooth outline-none focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#8B5E3C]/10 resize-none min-h-[110px]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#8B5E3C] hover:bg-[#70492E] disabled:opacity-60 text-white font-semibold py-4 rounded-full transition-smooth hover-lift flex items-center justify-center gap-2 text-base"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting…
              </>
            ) : (
              <>
                <CalendarCheck className="w-5 h-5" />
                Submit Booking Request
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <main className="flex-1 bg-[#FFF8F0]">
      <Suspense fallback={<div className="py-20 text-center text-[#7A6A5D]">Loading…</div>}>
        <BookingForm />
      </Suspense>
      <Footer />
    </main>
  );
}
