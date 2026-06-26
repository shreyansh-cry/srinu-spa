"use client";

import { Booking, BookingStatus } from "@/lib/types";
import StatusBadge from "./StatusBadge";
import {
  User, MapPin, Wrench, CalendarDays, Clock, FileText,
  CheckCircle, XCircle, CheckCheck, Ban
} from "lucide-react";

interface BookingCardProps {
  booking: Booking;
  onStatusUpdate: (bookingId: string, newStatus: BookingStatus) => Promise<void>;
  updating?: boolean;
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="w-4 h-4 text-[#D9A89E] flex-shrink-0 mt-0.5" />
      <div className="min-w-0">
        <span className="text-xs text-[#7A6A5D] font-medium uppercase tracking-wide">{label}</span>
        <p className="text-sm text-[#2B1D14] break-words">{value}</p>
      </div>
    </div>
  );
}

export default function BookingCard({ booking, onStatusUpdate, updating = false }: BookingCardProps) {
  const actionButtons: { label: string; status: BookingStatus; icon: React.ElementType; bg: string; text: string; border: string }[] = [
    {
      label: "Accept",
      status: "Accepted",
      icon: CheckCircle,
      bg: "#E8F3E6",
      text: "#3F6B3A",
      border: "#c3e0be",
    },
    {
      label: "Reject",
      status: "Rejected",
      icon: XCircle,
      bg: "#FDE8E8",
      text: "#B42318",
      border: "#f5bcbc",
    },
    {
      label: "Complete",
      status: "Completed",
      icon: CheckCheck,
      bg: "#E7F0FF",
      text: "#2457A6",
      border: "#b8d0f5",
    },
    {
      label: "Cancel",
      status: "Cancelled",
      icon: Ban,
      bg: "#F3F4F6",
      text: "#4B5563",
      border: "#d1d5db",
    },
  ];

  return (
    <div className="bg-white border border-[#E8D8C8] rounded-2xl shadow-card overflow-hidden hover:shadow-[0_12px_40px_rgba(43,29,20,0.10)] transition-smooth">
      {/* Card Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#F3E2D0] bg-[#FFFDFB]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FFE3D3] flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-[#8B5E3C]" />
          </div>
          <div>
            <p className="font-semibold text-[#2B1D14] text-sm">{booking.name}</p>
            <p className="text-xs text-[#7A6A5D]">{booking.phone}</p>
          </div>
        </div>
        <StatusBadge status={booking.status} size="sm" />
      </div>

      {/* Card Body */}
      <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <InfoRow icon={Wrench}      label="Service"  value={booking.service} />
        <InfoRow icon={CalendarDays} label="Date"    value={booking.date} />
        <InfoRow icon={Clock}       label="Time"     value={booking.time} />
        <InfoRow icon={MapPin}      label="Address"  value={booking.address} />
        {booking.notes && (
          <div className="sm:col-span-2">
            <InfoRow icon={FileText} label="Notes" value={booking.notes} />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="px-5 py-4 border-t border-[#F3E2D0] flex flex-wrap gap-2">
        {actionButtons.map((btn) => {
          const Icon = btn.icon;
          const isActive = booking.status === btn.status;
          return (
            <button
              key={btn.status}
              onClick={() => !updating && !isActive && onStatusUpdate(booking.id, btn.status)}
              disabled={updating || isActive}
              className={`
                inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold
                border transition-smooth
                ${isActive ? "opacity-100 cursor-default" : "hover:opacity-90 hover:-translate-y-0.5 cursor-pointer"}
                ${updating ? "opacity-50 cursor-not-allowed" : ""}
              `}
              style={{
                backgroundColor: btn.bg,
                color: btn.text,
                borderColor: btn.border,
              }}
              aria-label={`Mark as ${btn.status}`}
            >
              <Icon className="w-3.5 h-3.5" />
              {btn.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
