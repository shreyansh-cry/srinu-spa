import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Home Service Booking | Book Relaxing Home Services",
  description:
    "Book trusted home services like body massage, oil massage, head massage, foot massage, relaxation therapy, and home spa services online. Simple, fast, and convenient.",
  keywords: "home service, massage booking, spa booking, appointment booking, home spa",
  openGraph: {
    title: "Home Service Booking | Book Relaxing Home Services",
    description:
      "Book trusted home services online. Choose a service, fill a simple form, and we'll contact you to confirm.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
