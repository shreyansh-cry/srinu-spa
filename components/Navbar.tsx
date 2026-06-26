"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";

const navLinks = [
  { href: "/",        label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/book",    label: "Book" },
  { href: "/cancel",  label: "Cancel" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Don't show public navbar on admin pages
  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 navbar-glass">
      <div className="max-w-[1200px] mx-auto px-5 md:px-12 h-[72px] flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-[#8B5E3C] flex items-center justify-center shadow-sm group-hover:scale-105 transition-smooth">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-[#2B1D14] text-lg tracking-tight">
            SrinuCare
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-smooth ${
                pathname === link.href
                  ? "bg-[#F3E2D0] text-[#8B5E3C]"
                  : "text-[#7A6A5D] hover:text-[#2B1D14] hover:bg-[#F3E2D0]/60"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-[#8B5E3C] hover:bg-[#70492E] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-smooth hover-lift shadow-card"
          >
            Book Appointment
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl text-[#7A6A5D] hover:bg-[#F3E2D0] transition-smooth"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#E8D8C8] bg-[#FFF8F0]">
          <nav className="max-w-[1200px] mx-auto px-5 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-smooth ${
                  pathname === link.href
                    ? "bg-[#F3E2D0] text-[#8B5E3C]"
                    : "text-[#7A6A5D] hover:text-[#2B1D14] hover:bg-[#F3E2D0]/60"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 pt-2 border-t border-[#E8D8C8]">
              <Link
                href="/book"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center bg-[#8B5E3C] text-white text-sm font-semibold px-5 py-3 rounded-full transition-smooth"
              >
                Book Appointment
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
