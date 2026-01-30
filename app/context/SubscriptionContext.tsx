"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

type SubscriptionStatus = "none" | "active" | "expired";

interface SubscriptionContextType {
  status: SubscriptionStatus;
  isSubscribed: boolean;
  loading: boolean;
  refresh: () => Promise<void>;
}

const SubscriptionContext =
  createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading: authLoading } = useAuth();

  const [status, setStatus] = useState<SubscriptionStatus>("none");
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/subscription/status", {
        cache: "no-store",
      });

      const data = await res.json();

      console.log("[SUB CONTEXT] response:", data);

      setStatus(data.status ?? "none");
    } catch (err) {
      console.error("[SUB CONTEXT] error:", err);
      setStatus("none");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      refresh();
    }
  }, [authLoading]);

  return (
    <SubscriptionContext.Provider
      value={{
        status,
        isSubscribed: status === "active",
        loading,
        refresh,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error(
      "useSubscription must be used within SubscriptionProvider"
    );
  }
  return context;
}
