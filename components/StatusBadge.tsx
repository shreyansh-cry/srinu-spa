import { BookingStatus } from "@/lib/types";
import { Clock, CheckCircle, XCircle, CheckCheck, Ban } from "lucide-react";

interface StatusBadgeProps {
  status: BookingStatus;
  size?: "sm" | "md";
}

const statusConfig: Record<
  BookingStatus,
  { bg: string; text: string; icon: React.ElementType; label: string }
> = {
  Pending: {
    bg: "#FFF4D6",
    text: "#8A6200",
    icon: Clock,
    label: "Pending",
  },
  Accepted: {
    bg: "#E8F3E6",
    text: "#3F6B3A",
    icon: CheckCircle,
    label: "Accepted",
  },
  Rejected: {
    bg: "#FDE8E8",
    text: "#B42318",
    icon: XCircle,
    label: "Rejected",
  },
  Completed: {
    bg: "#E7F0FF",
    text: "#2457A6",
    icon: CheckCheck,
    label: "Completed",
  },
  Cancelled: {
    bg: "#F3F4F6",
    text: "#4B5563",
    icon: Ban,
    label: "Cancelled",
  },
};

export default function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const config = statusConfig[status] ?? statusConfig["Pending"];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full ${
        size === "sm" ? "text-xs px-2.5 py-1" : "text-sm px-3 py-1.5"
      }`}
      style={{ backgroundColor: config.bg, color: config.text }}
      role="status"
      aria-label={`Status: ${config.label}`}
    >
      <Icon className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} />
      {config.label}
    </span>
  );
}
