"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  role?: "user" | "seller" | "admin";
  subscription: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    console.log("[Auth] fetching /api/auth/me");

    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include", // 🔑 send cookies
      });

      const data = await res.json();

      console.log("[Auth] /me response", data);

      setUser(data.user ?? null);
    } catch (err) {
      console.error("[Auth] /me failed", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

   const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  console.log("[AuthProvider] render →", { user, loading });

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, logout, }}>
      {children}
    </AuthContext.Provider>
  );
};
