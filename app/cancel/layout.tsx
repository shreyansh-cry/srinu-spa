import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancel Appointment | Srinu Spa",
  description:
    "Need to cancel your home service appointment? Submit a cancellation request and we'll confirm it shortly.",
  openGraph: {
    title: "Cancel Appointment | Srinu Spa",
    description: "Submit a cancellation request for your Srinu Spa home service appointment.",
    type: "website",
  },
};

export default function CancelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
