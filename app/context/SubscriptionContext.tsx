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
  const { user, loading: authLoading } = useAuth();

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait until auth is fully resolved
    if (authLoading) return;

    setIsSubscribed(Boolean(user?.subscription));
    setLoading(false);
  }, [authLoading, user]);

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
