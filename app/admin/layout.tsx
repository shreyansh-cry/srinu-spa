import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Srinu Spa",
  description: "Owner dashboard for managing Srinu Spa bookings and appointments.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
