"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Sparkles } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setStatus("authenticated");
      } else {
        setStatus("unauthenticated");
        router.replace("/admin/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Loading spinner while Firebase checks auth state
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#8B5E3C] flex items-center justify-center animate-pulse">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#8B5E3C] animate-bounce [animation-delay:0ms]" />
            <span className="w-2 h-2 rounded-full bg-[#8B5E3C] animate-bounce [animation-delay:150ms]" />
            <span className="w-2 h-2 rounded-full bg-[#8B5E3C] animate-bounce [animation-delay:300ms]" />
          </div>
          <p className="text-sm text-[#7A6A5D]">Verifying access…</p>
        </div>
      </div>
    );
  }

  // Unauthenticated state — router.replace already called above
  if (status === "unauthenticated") return null;

  return <>{children}</>;
}
