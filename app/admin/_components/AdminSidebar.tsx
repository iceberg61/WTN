"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Upload,
  Library,
  LogOut,
  User,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { useState } from "react";

const links = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Materials",
    href: "/admin/materials",
    icon: BookOpen,
  },
  {
    name: "Upload Material",
    href: "/admin/upload",
    icon: Upload,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <aside className="w-64 min-h-screen bg-zinc-900 border-r border-zinc-800 flex flex-col">
      {/* Logo / Brand */}
      <div className="px-6 py-5 border-b border-zinc-800">
        <h1 className="text-xl font-bold text-yellow-400">
          West Train Network
        </h1>
        <p className="text-xs text-zinc-400">
          Admin Control Panel
        </p>
      </div>

      {/* Admin Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
                ${
                  active
                    ? "bg-yellow-400 text-black font-semibold"
                    : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                }
              `}
            >
              <link.icon size={18} />
              {link.name}
            </Link>
          );
        })}

        {/* Library */}
        <Link
          href="/library"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
        >
          <Library size={18} />
          Library
        </Link>
      </nav>

      {/* Account + Footer Section */}
      <div className="relative border-t border-zinc-800">
        {/* Account Button */}
        <div className="px-4 py-4">
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2 hover:bg-zinc-800 transition"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold">
                {user?.name?.[0] ?? "A"}
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-white">
                  {user?.name ?? "Admin"}
                </p>
                <p className="text-xs text-zinc-400">Administrator</p>
              </div>
            </div>
          </button>
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute bottom-20 left-4 right-4 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-lg z-50">
            <button
              onClick={() => router.push("/")}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800"
            >
              <User size={16} />
              Account
            </button>

            <button
              onClick={() => {
                logout();
                router.push("/auth/login");
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-zinc-800"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-3 border-t border-zinc-800 text-xs text-zinc-500 text-center">
          © {new Date().getFullYear()} West Train Network
        </div>
      </div>
    </aside>
  );
}
