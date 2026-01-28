"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

interface SubscriptionContextType {
  isSubscribed: boolean;
  loading: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined
);

export function SubscriptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading: authLoading } = useAuth();

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    const fetchStatus = async () => {
      try {
        const res = await fetch("/api/subscription/status", {
          cache: "no-store",
        });
        const data = await res.json();
        setIsSubscribed(Boolean(data.isSubscribed));
      } catch {
        setIsSubscribed(false);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [authLoading]);

  return (
    <SubscriptionContext.Provider value={{ isSubscribed, loading }}>
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
