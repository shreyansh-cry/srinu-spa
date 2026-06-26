import Link from "next/link";
import { Sparkles, Phone, MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#2B1D14] text-[#E8D8C8] mt-auto">
      <div className="max-w-[1200px] mx-auto px-5 md:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[#8B5E3C] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-lg">SrinuCare</span>
            </div>
            <p className="text-sm text-[#7A6A5D] leading-relaxed max-w-xs">
              Trusted home service provider bringing relaxation and wellness
              directly to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/",        label: "Home" },
                { href: "/services", label: "Services" },
                { href: "/book",    label: "Book Appointment" },
                { href: "/cancel",  label: "Cancel Appointment" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#7A6A5D] hover:text-[#D9A89E] transition-smooth"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-[#7A6A5D]">
                <Phone className="w-4 h-4 text-[#D9A89E] flex-shrink-0" />
                <span>+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-[#7A6A5D]">
                <Mail className="w-4 h-4 text-[#D9A89E] flex-shrink-0" />
                <span>shrebhaireddy@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#7A6A5D]">
                <MapPin className="w-4 h-4 text-[#D9A89E] flex-shrink-0 mt-0.5" />
                <span>Hyderabad, Telangana, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#3d2a1e] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#7A6A5D]">
            © {new Date().getFullYear()} SrinuCare. All rights reserved.
          </p>
          <p className="text-xs text-[#7A6A5D]">
            Home service booking made simple.
          </p>
        </div>
      </div>
    </footer>
  );
}
