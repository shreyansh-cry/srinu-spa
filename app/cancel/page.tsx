"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User, Phone, FileText, CheckCircle, ArrowLeft, CalendarX,
  AlertCircle,
} from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Footer from "@/components/Footer";

interface FormData {
  name: string;
  phone: string;
  reason: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
}

export default function CancelPage() {
  const [form, setForm] = useState<FormData>({ name: "", phone: "", reason: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required.";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!/^[0-9+\s\-()]{7,20}$/.test(form.phone.trim()))
      newErrors.phone = "Enter a valid phone number.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, "cancellations"), {
        name: form.name.trim(),
        phone: form.phone.trim(),
        reason: form.reason.trim(),
        status: "Requested",
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Cancellation error:", err);
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

  // ── Success State ─────────────────────────────────────────
  if (submitted) {
    return (
      <main className="flex-1 bg-[#FFF8F0]">
        <div className="flex flex-col items-center justify-center py-24 px-5 text-center">
          <div className="bg-[#E8F3E6] border border-[#c3e0be] rounded-3xl p-10 max-w-md w-full shadow-card">
            <div className="w-16 h-16 bg-[#7E9F7A] rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-[#2B1D14] mb-3">Request Submitted!</h2>
            <p className="text-[#7A6A5D] leading-relaxed mb-6">
              Your cancellation request has been submitted. The service provider will review it and get back to you.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#8B5E3C] hover:bg-[#70492E] text-white font-semibold px-6 py-3 rounded-full transition-smooth hover-lift"
            >
              <ArrowLeft className="w-4 h-4" />
              Go to Home
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // ── Form ──────────────────────────────────────────────────
  return (
    <main className="flex-1 bg-[#FFF8F0]">
      <div className="max-w-[560px] mx-auto px-5 py-16">

        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#FFE3D3] rounded-2xl mb-4">
            <CalendarX className="w-7 h-7 text-[#8B5E3C]" />
          </div>
          <h1 className="text-3xl font-bold text-[#2B1D14] mb-3">Cancel Appointment</h1>
          <p className="text-[#7A6A5D] leading-relaxed max-w-sm mx-auto">
            Need to cancel? Fill in your details below and the owner will review your request and confirm the cancellation.
          </p>
        </div>

        {/* Info Banner */}
        <div className="flex items-start gap-3 bg-[#FFF4D6] border border-[#F5D78C] rounded-2xl px-4 py-3 mb-8">
          <AlertCircle className="w-4 h-4 text-[#8A6200] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[#8A6200]">
            Please provide the same name and phone number used when booking so we can locate your appointment.
          </p>
        </div>

        {/* Form Card */}
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
              {errors.name && (
                <p id="name-error" className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
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
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && (
                <p id="phone-error" className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Reason */}
            <div>
              <label htmlFor="reason" className="flex items-center gap-2 text-sm font-medium text-[#2B1D14] mb-1.5">
                <FileText className="w-4 h-4 text-[#8B5E3C]" /> Reason{" "}
                <span className="text-[#7A6A5D] font-normal">(optional)</span>
              </label>
              <textarea
                id="reason"
                placeholder="Let us know why you're cancelling (optional)..."
                value={form.reason}
                onChange={(e) => handleChange("reason", e.target.value)}
                rows={4}
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
                  <CalendarX className="w-5 h-5" />
                  Submit Cancellation Request
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-[#8B5E3C] hover:text-[#70492E] font-medium transition-smooth inline-flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
