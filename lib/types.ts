// ─── Booking Status ─────────────────────────────────────────
export type BookingStatus =
  | "Pending"
  | "Accepted"
  | "Rejected"
  | "Completed"
  | "Cancelled";

// ─── Cancellation Status ────────────────────────────────────
export type CancellationStatus = "Requested";

// ─── Service Names ──────────────────────────────────────────
export type ServiceName =
  | "Body Massage"
  | "Oil Massage"
  | "Head Massage"
  | "Foot Massage"
  | "Relaxation Therapy"
  | "Home Spa Service";

// ─── Booking Document ───────────────────────────────────────
export interface Booking {
  id: string;           // Firestore document ID
  name: string;
  phone: string;
  address: string;
  service: ServiceName | string;
  date: string;         // ISO date string e.g. "2025-08-15"
  time: string;         // e.g. "10:30"
  notes: string;
  status: BookingStatus;
  createdAt: Date | null;
}

// ─── Booking Form Data (without id/status/createdAt) ────────
export interface BookingFormData {
  name: string;
  phone: string;
  address: string;
  service: string;
  date: string;
  time: string;
  notes: string;
}

// ─── Cancellation Document ──────────────────────────────────
export interface Cancellation {
  id: string;           // Firestore document ID
  name: string;
  phone: string;
  reason: string;
  status: CancellationStatus;
  createdAt: Date | null;
}

// ─── Cancellation Form Data ─────────────────────────────────
export interface CancellationFormData {
  name: string;
  phone: string;
  reason: string;
}

// ─── Service Card Data ──────────────────────────────────────
export interface Service {
  id: string;
  name: ServiceName;
  description: string;
  duration: string;
  price: string;
  icon: string;         // lucide-react icon name
}

// ─── Admin Stats ────────────────────────────────────────────
export interface AdminStats {
  total: number;
  pending: number;
  accepted: number;
  completed: number;
  cancelled: number;
  rejected: number;
}
