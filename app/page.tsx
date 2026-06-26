import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarCheck, ShieldCheck, Star, Phone, MapPin, CheckCircle } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import Footer from "@/components/Footer";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Srinu Spa | Book Relaxing Home Services at Your Convenience",
  description:
    "Book trusted home spa services like body massage, oil massage, head massage, and more. Srinu Spa brings relaxation directly to your home.",
};

export default function HomePage() {
  const previewServices = SERVICES.slice(0, 3);

  return (
    <main className="flex-1">

      {/* ── Hero Section ───────────────────────────────────── */}
      <section className="bg-gradient-circles min-h-[88vh] flex items-center px-5 md:px-12 py-16">
        <div className="max-w-[1200px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: Text Content */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#FFE3D3] text-[#8B5E3C] text-sm font-medium px-4 py-2 rounded-full mb-6">
                <Star className="w-4 h-4 fill-[#8B5E3C]" />
                Home Service Booking
              </div>

              {/* Heading */}
              <h1 className="text-[42px] md:text-[56px] lg:text-[62px] font-bold text-[#2B1D14] leading-[1.1] mb-6">
                Book Relaxing
                <span className="block text-[#8B5E3C]">Home Services</span>
                at Your Convenience
              </h1>

              {/* Description */}
              <p className="text-lg text-[#7A6A5D] leading-relaxed mb-8 max-w-md">
                Experience premium spa and massage services from the comfort of your home.
                Trusted, professional, and fully customised to your needs.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2 bg-[#8B5E3C] hover:bg-[#70492E] text-white font-semibold text-base px-7 py-4 rounded-full transition-smooth hover-lift shadow-soft"
                >
                  Book Appointment
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FFF8F0] text-[#8B5E3C] font-semibold text-base px-7 py-4 rounded-full border border-[#E8D8C8] transition-smooth hover-lift shadow-card"
                >
                  View Services
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 mt-10">
                <div className="flex items-center gap-2 text-sm text-[#7A6A5D]">
                  <CheckCircle className="w-4 h-4 text-[#7E9F7A]" />
                  Trusted Professionals
                </div>
                <div className="flex items-center gap-2 text-sm text-[#7A6A5D]">
                  <CheckCircle className="w-4 h-4 text-[#7E9F7A]" />
                  Easy Booking
                </div>
                <div className="flex items-center gap-2 text-sm text-[#7A6A5D]">
                  <CheckCircle className="w-4 h-4 text-[#7E9F7A]" />
                  Home Visit
                </div>
              </div>
            </div>

            {/* Right: Visual Card Mockup */}
            <div className="hidden lg:flex items-center justify-center relative">
              {/* Main card */}
              <div className="bg-white rounded-3xl shadow-soft border border-[#E8D8C8] p-6 w-[320px] relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFE3D3] flex items-center justify-center">
                    <CalendarCheck className="w-6 h-6 text-[#8B5E3C]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#2B1D14]">Appointment Booked!</p>
                    <p className="text-xs text-[#7A6A5D]">Confirmation pending</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Service", value: "Body Massage" },
                    { label: "Date",    value: "Today" },
                    { label: "Time",    value: "11:00 AM" },
                    { label: "Status",  value: "Pending Review" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center py-2 border-b border-[#F3E2D0] last:border-0">
                      <span className="text-xs text-[#7A6A5D] font-medium">{item.label}</span>
                      <span className="text-sm font-semibold text-[#2B1D14]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge top-right */}
              <div className="absolute top-4 right-8 bg-[#E8F3E6] text-[#3F6B3A] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#c3e0be] shadow-card z-20">
                ✓ Available Today
              </div>

              {/* Floating badge bottom-left */}
              <div className="absolute bottom-8 left-4 bg-[#FFF4D6] text-[#8A6200] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#f0d890] shadow-card z-20">
                ⚡ Easy Booking
              </div>

              {/* Background decorative circle */}
              <div className="absolute inset-0 bg-[#F3E2D0] rounded-full w-[380px] h-[380px] mx-auto opacity-30 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Preview Section ────────────────────────── */}
      <section className="px-5 md:px-12 py-20 bg-white">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-[#8B5E3C] uppercase tracking-widest mb-3">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B1D14] mb-4">Our Popular Services</h2>
            <p className="text-[#7A6A5D] max-w-lg mx-auto">
              Choose from a range of professional home services designed to bring you comfort and relaxation.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {previewServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* View All */}
          <div className="text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[#8B5E3C] font-semibold hover:gap-3 transition-smooth"
            >
              View All 6 Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works Section ────────────────────────────── */}
      <section className="px-5 md:px-12 py-20 bg-[#FFF8F0]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-[#8B5E3C] uppercase tracking-widest mb-3">Simple Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B1D14] mb-4">How It Works</h2>
            <p className="text-[#7A6A5D] max-w-lg mx-auto">
              Booking a home service has never been easier. Just 3 simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose a Service",
                desc: "Browse our services and select the one that fits your needs.",
                icon: "✨",
              },
              {
                step: "02",
                title: "Fill the Form",
                desc: "Enter your details, address, preferred date and time.",
                icon: "📋",
              },
              {
                step: "03",
                title: "We Contact You",
                desc: "The service provider reviews your request and contacts you to confirm.",
                icon: "📞",
              },
            ].map((item, i) => (
              <div key={i} className="relative bg-white border border-[#E8D8C8] rounded-3xl p-8 shadow-card hover-lift">
                <div className="text-5xl mb-4">{item.icon}</div>
                <div className="absolute top-6 right-6 text-5xl font-bold text-[#F3E2D0] select-none leading-none">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-[#2B1D14] mb-3">{item.title}</h3>
                <p className="text-[#7A6A5D] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us Section ───────────────────────────── */}
      <section className="px-5 md:px-12 py-20 bg-[#F3E2D0]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-[#8B5E3C] uppercase tracking-widest mb-3">Why Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B1D14] mb-4">Why Choose Srinu Spa?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <ShieldCheck className="w-7 h-7 text-[#8B5E3C]" />, title: "Trusted & Safe", desc: "Verified, professional service provider you can trust." },
              { icon: <CalendarCheck className="w-7 h-7 text-[#8B5E3C]" />, title: "Convenient Booking", desc: "Book anytime from anywhere — no calls needed." },
              { icon: <Star className="w-7 h-7 text-[#8B5E3C]" />, title: "Premium Quality", desc: "High-quality services tailored to your comfort." },
              { icon: <Phone className="w-7 h-7 text-[#8B5E3C]" />, title: "Personal Touch", desc: "The provider personally confirms and contacts you." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-card border border-[#E8D8C8] hover-lift text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#FFE3D3] flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-[#2B1D14] mb-2 text-lg">{item.title}</h3>
                <p className="text-sm text-[#7A6A5D] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact / Final CTA Section ─────────────────────── */}
      <section className="px-5 md:px-12 py-20 bg-[#2B1D14]">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-sm font-medium text-[#D9A89E] uppercase tracking-widest mb-4">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Book Your Session?
          </h2>
          <p className="text-[#7A6A5D] mb-8 max-w-md mx-auto leading-relaxed">
            Fill in a simple form and our service provider will contact you to confirm your appointment.
          </p>

          {/* Contact Details */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-[#D9A89E]">
              <Phone className="w-4 h-4" />
              <span className="text-sm">+91 XXXXX XXXXX</span>
            </div>
            <div className="flex items-center gap-2 text-[#D9A89E]">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Hyderabad, Telangana</span>
            </div>
          </div>

          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-[#8B5E3C] hover:bg-[#70492E] text-white font-semibold text-base px-8 py-4 rounded-full transition-smooth hover-lift shadow-soft"
          >
            Book Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
