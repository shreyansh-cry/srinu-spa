"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  collection, getDocs, doc, updateDoc, orderBy, query,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import { Booking, BookingStatus, AdminStats } from "@/lib/types";
import ProtectedRoute from "@/components/ProtectedRoute";
import BookingCard from "@/components/BookingCard";
import {
  LogOut, Search, CalendarCheck, Clock, CheckCircle,
  CheckCheck, Ban, XCircle, Sparkles, RefreshCw,
} from "lucide-react";

// ── Toast ─────────────────────────────────────────────────────
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#2B1D14] text-white text-sm font-medium px-5 py-3.5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] animate-in slide-in-from-bottom-4 duration-300">
      <CheckCircle className="w-4 h-4 text-[#7E9F7A] flex-shrink-0" />
      {message}
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────
function StatCard({
  label, count, dotColor, icon: Icon,
}: {
  label: string; count: number; dotColor: string; icon: React.ElementType;
}) {
  return (
    <div className="bg-white border border-[#E8D8C8] rounded-2xl p-5 min-h-[110px] flex flex-col justify-between shadow-sm hover:shadow-card transition-smooth">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#7A6A5D] uppercase tracking-wider">{label}</span>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: dotColor + "22" }}>
          <Icon className="w-3.5 h-3.5" style={{ color: dotColor }} />
        </div>
      </div>
      <div className="flex items-end gap-2 mt-2">
        <span className="text-3xl font-bold text-[#2B1D14]">{count}</span>
        <span
          className="w-2.5 h-2.5 rounded-full mb-1.5 flex-shrink-0"
          style={{ backgroundColor: dotColor }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

// ── Loading Skeleton ──────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white border border-[#E8D8C8] rounded-2xl h-[200px]" />
      ))}
    </div>
  );
}

// ── Filter Pill ───────────────────────────────────────────────
const ALL_STATUSES: (BookingStatus | "All")[] = [
  "All", "Pending", "Accepted", "Rejected", "Completed", "Cancelled",
];

const filterColors: Record<string, { bg: string; text: string; activeBg: string; activeText: string }> = {
  All:       { bg: "#F3F4F6", text: "#4B5563", activeBg: "#2B1D14", activeText: "#ffffff" },
  Pending:   { bg: "#FFF4D6", text: "#8A6200", activeBg: "#8A6200", activeText: "#ffffff" },
  Accepted:  { bg: "#E8F3E6", text: "#3F6B3A", activeBg: "#3F6B3A", activeText: "#ffffff" },
  Rejected:  { bg: "#FDE8E8", text: "#B42318", activeBg: "#B42318", activeText: "#ffffff" },
  Completed: { bg: "#E7F0FF", text: "#2457A6", activeBg: "#2457A6", activeText: "#ffffff" },
  Cancelled: { bg: "#F3F4F6", text: "#4B5563", activeBg: "#4B5563", activeText: "#ffffff" },
};

// ── Main Dashboard ────────────────────────────────────────────
function Dashboard() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<BookingStatus | "All">("All");
  const [toast, setToast] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  // ── Fetch bookings ──────────────────────────────────────────
  async function fetchBookings(showLoader = true) {
    if (showLoader) setLoading(true);
    try {
      const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const data: Booking[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Booking, "id">),
        createdAt: d.data().createdAt?.toDate?.() ?? null,
      }));
      setBookings(data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    } finally {
      setLoading(false);
    }
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchBookings(false); }, []);

  // ── Stats ───────────────────────────────────────────────────
  const stats: AdminStats = useMemo(() => ({
    total:     bookings.length,
    pending:   bookings.filter((b) => b.status === "Pending").length,
    accepted:  bookings.filter((b) => b.status === "Accepted").length,
    completed: bookings.filter((b) => b.status === "Completed").length,
    cancelled: bookings.filter((b) => b.status === "Cancelled").length,
    rejected:  bookings.filter((b) => b.status === "Rejected").length,
  }), [bookings]);

  // ── Filter + Search ─────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = bookings;
    if (activeFilter !== "All") result = result.filter((b) => b.status === activeFilter);
    const q = search.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (b) =>
          (b.name || "").toLowerCase().includes(q) ||
          (b.phone || "").toLowerCase().includes(q) ||
          (b.service || "").toLowerCase().includes(q)
      );
    }
    return result;
  }, [bookings, activeFilter, search]);

  // ── Status update ───────────────────────────────────────────
  async function handleStatusUpdate(bookingId: string, newStatus: BookingStatus) {
    setUpdatingId(bookingId);
    try {
      await updateDoc(doc(db, "bookings", bookingId), { status: newStatus });
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
      );
      setToast(`Booking marked as ${newStatus}.`);
    } catch (err) {
      console.error("Status update error:", err);
      setToast("Failed to update status. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  }

  // ── Logout ──────────────────────────────────────────────────
  async function handleLogout() {
    setLoggingOut(true);
    try {
      await signOut(auth);
      router.replace("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
      setLoggingOut(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">

      {/* ── Top Header ─────────────────────────────────────── */}
      <header className="bg-white border-b border-[#E8D8C8] sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 h-[68px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#8B5E3C] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-[#2B1D14] leading-none">Admin Dashboard</h1>
              <p className="text-xs text-[#7A6A5D] mt-0.5">Manage your bookings</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchBookings(true)}
              disabled={loading}
              aria-label="Refresh bookings"
              className="w-9 h-9 rounded-xl border border-[#E8D8C8] bg-white flex items-center justify-center text-[#7A6A5D] hover:bg-[#FFF8F0] hover:text-[#8B5E3C] transition-smooth"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-2 bg-[#FDE8E8] hover:bg-[#f5c2c2] text-[#B42318] font-semibold text-sm px-4 py-2 rounded-xl transition-smooth disabled:opacity-60"
            >
              {loggingOut ? (
                <span className="w-3.5 h-3.5 border-2 border-[#B42318]/30 border-t-[#B42318] rounded-full animate-spin" />
              ) : (
                <LogOut className="w-3.5 h-3.5" />
              )}
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-8 space-y-8">

        {/* ── Stats Row ──────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <StatCard label="Total"     count={stats.total}     dotColor="#8B5E3C" icon={CalendarCheck} />
          <StatCard label="Pending"   count={stats.pending}   dotColor="#8A6200" icon={Clock} />
          <StatCard label="Accepted"  count={stats.accepted}  dotColor="#3F6B3A" icon={CheckCircle} />
          <StatCard label="Completed" count={stats.completed} dotColor="#2457A6" icon={CheckCheck} />
          <StatCard label="Cancelled" count={stats.cancelled} dotColor="#4B5563" icon={Ban} />
          <StatCard label="Rejected"  count={stats.rejected}  dotColor="#B42318" icon={XCircle} />
        </div>

        {/* ── Search + Filters ───────────────────────────────── */}
        <div className="space-y-3">
          {/* Search */}
          <div className="relative max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B5E3C]" />
            <input
              type="text"
              placeholder="Search by name, phone, or service…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search bookings"
              className="w-full h-[44px] pl-10 pr-4 rounded-xl border border-[#E8D8C8] bg-white text-[#2B1D14] text-sm placeholder:text-[#c4b5a8] outline-none focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#8B5E3C]/10 transition-smooth"
            />
          </div>

          {/* Status filters */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
            {ALL_STATUSES.map((status) => {
              const isActive = activeFilter === status;
              const c = filterColors[status];
              return (
                <button
                  key={status}
                  onClick={() => setActiveFilter(status)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-smooth hover:-translate-y-0.5"
                  style={{
                    backgroundColor: isActive ? c.activeBg : c.bg,
                    color: isActive ? c.activeText : c.text,
                    borderColor: isActive ? c.activeBg : "transparent",
                  }}
                  aria-pressed={isActive}
                >
                  {status}
                  {status !== "All" && (
                    <span className="opacity-75">
                      ({bookings.filter((b) => b.status === status).length})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Bookings List ──────────────────────────────────── */}
        <div>
          {/* Result count */}
          {!loading && (
            <p className="text-sm text-[#7A6A5D] mb-4">
              Showing <span className="font-semibold text-[#2B1D14]">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "booking" : "bookings"}
              {activeFilter !== "All" && ` · ${activeFilter}`}
              {search && ` matching "${search}"`}
            </p>
          )}

          {loading ? (
            <LoadingSkeleton />
          ) : filtered.length === 0 ? (
            // Empty state
            <div className="bg-white border border-[#E8D8C8] rounded-2xl p-16 text-center">
              <div className="w-14 h-14 bg-[#FFE3D3] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CalendarCheck className="w-7 h-7 text-[#8B5E3C]" />
              </div>
              <h3 className="text-base font-semibold text-[#2B1D14] mb-1">No bookings found</h3>
              <p className="text-sm text-[#7A6A5D]">
                {search || activeFilter !== "All"
                  ? "Try adjusting your search or filter."
                  : "No booking requests yet. They will appear here once customers submit them."}
              </p>
              {(search || activeFilter !== "All") && (
                <button
                  onClick={() => { setSearch(""); setActiveFilter("All"); }}
                  className="mt-4 text-sm font-medium text-[#8B5E3C] hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {filtered.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onStatusUpdate={handleStatusUpdate}
                  updating={updatingId === booking.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Toast ──────────────────────────────────────────────── */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

// ── Page export with ProtectedRoute ───────────────────────────
export default function AdminPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
