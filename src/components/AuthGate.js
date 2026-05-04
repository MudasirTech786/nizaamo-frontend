"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGate({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user === null) {
      router.replace("/login");
    }
  }, [user, loading]);

  // 🚨 BLOCK EVERYTHING UNTIL AUTH IS RESOLVED
  if (loading || user === undefined) {
    return null;
  }

  if (user === null) {
    return null;
  }

  return children;
}