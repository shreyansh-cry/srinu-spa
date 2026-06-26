import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Appointment | Srinu Spa",
  description:
    "Book a home service appointment with Srinu Spa. Choose from body massage, oil massage, head massage, foot massage, relaxation therapy, or home spa service.",
  openGraph: {
    title: "Book Appointment | Srinu Spa",
    description:
      "Book a relaxing home service with Srinu Spa. Fill the form and we'll contact you to confirm.",
    type: "website",
  },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
