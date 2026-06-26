import Link from "next/link";
import { Clock, IndianRupee, ArrowRight, HandHeart, Droplets, Brain, Footprints, Smile, Sparkles } from "lucide-react";
import { Service } from "@/lib/types";

const IconMap: Record<string, React.ElementType> = {
  HandHeart,
  Droplets,
  Brain,
  Footprints,
  Smile,
  Sparkles,
};

interface ServiceCardProps {
  service: Service;
  compact?: boolean; // smaller version for homepage preview
}

export default function ServiceCard({ service, compact = false }: ServiceCardProps) {
  // Dynamically get the icon component from the explicit map
  const IconComponent = IconMap[service.icon];

  return (
    <div
      className={`
        bg-white border border-[#E8D8C8] rounded-3xl shadow-card hover-lift
        flex flex-col transition-smooth group
        ${compact ? "p-5" : "p-6"}
      `}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-2xl bg-[#FFE3D3] flex items-center justify-center mb-4 group-hover:bg-[#F3E2D0] transition-smooth">
        {IconComponent ? (
          <IconComponent className="w-6 h-6 text-[#8B5E3C]" />
        ) : (
          <span className="text-2xl">✨</span>
        )}
      </div>

      {/* Name */}
      <h3 className={`font-semibold text-[#2B1D14] mb-2 ${compact ? "text-lg" : "text-xl"}`}>
        {service.name}
      </h3>

      {/* Description */}
      <p className={`text-[#7A6A5D] leading-relaxed flex-1 ${compact ? "text-sm" : "text-base"} mb-4`}>
        {service.description}
      </p>

      {/* Badges */}
      <div className="flex items-center gap-2 mb-5">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFF4D6] text-[#8A6200] text-xs font-medium">
          <Clock className="w-3 h-3" />
          {service.duration}
        </span>
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E8F3E6] text-[#3F6B3A] text-xs font-medium">
          <IndianRupee className="w-3 h-3" />
          {service.price}
        </span>
      </div>

      {/* Book Now Button */}
      <Link
        href={`/book?service=${encodeURIComponent(service.name)}`}
        className="inline-flex items-center justify-center gap-2 w-full bg-[#8B5E3C] hover:bg-[#70492E] text-white text-sm font-semibold py-3 rounded-full transition-smooth group/btn"
      >
        Book Now
        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-smooth" />
      </Link>
    </div>
  );
}
