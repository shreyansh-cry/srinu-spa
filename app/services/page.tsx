import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import Footer from "@/components/Footer";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Our Services | Srinu Spa",
  description:
    "Choose from body massage, oil massage, head massage, foot massage, relaxation therapy, or home spa service. Book any service online in minutes.",
};

export default function ServicesPage() {
  return (
    <main className="flex-1">

      {/* ── Page Header ────────────────────────────────────── */}
      <section className="bg-[#F3E2D0] px-5 md:px-12 py-16">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-sm font-medium text-[#8B5E3C] uppercase tracking-widest mb-3">
            What We Offer
          </p>
          <h1 className="text-3xl md:text-[44px] font-bold text-[#2B1D14] mb-4">
            Our Services
          </h1>
          <p className="text-[#7A6A5D] max-w-xl mx-auto text-lg leading-relaxed">
            Choose a service and submit your appointment request. We&apos;ll contact you to confirm.
          </p>
        </div>
      </section>

      {/* ── Services Grid ───────────────────────────────────── */}
      <section className="px-5 md:px-12 py-16 bg-[#FFF8F0]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA Banner ───────────────────────────────── */}
      <section className="px-5 md:px-12 py-16 bg-[#F3E2D0]">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-[#2B1D14] rounded-3xl px-8 py-12 md:px-16 text-center">
            <p className="text-sm font-medium text-[#D9A89E] uppercase tracking-widest mb-3">
              Ready to Relax?
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Book?
            </h2>
            <p className="text-[#7A6A5D] mb-8 max-w-md mx-auto">
              Fill in a simple form and we&apos;ll confirm your appointment and visit you at home.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-[#8B5E3C] hover:bg-[#70492E] text-white font-semibold px-7 py-4 rounded-full transition-smooth hover-lift shadow-soft"
            >
              Book Appointment
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
