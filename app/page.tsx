"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import dynamic from "next/dynamic";

const Stars = dynamic(() => import("./components/Stars"), {
  ssr: false,
});


export default function Home() {
  const [hovered, setHovered] = useState<"none" | "library" | "store">("none");

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 bg-black text-white overflow-hidden">
      <Stars />
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/logo.jpg"
            alt="WTN Logo"
            width={160}
            height={160}
            className="rounded-full"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          West Train Network
          <br />
          <span className="text-yellow-400">Path To Excellence</span>
        </motion.h1>

        {/* BUTTONS CONTAINER */}
        <motion.div
          className="flex flex-col md:flex-row gap-8 mt-12 items-center min-h-[100px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          
          {/* LEFT BUTTON (Library)   */}
          <div
            className="relative"
            onMouseEnter={() => setHovered("library")}
            onMouseLeave={() => setHovered("none")}
          >
            <Link
              href="/library"
              className={`
                inline-block px-10 py-4 rounded-xl text-xl font-semibold border-2 transition-all duration-500 ease-in-out
                ${
                  hovered === "library"
                    ? "bg-yellow-400 text-white border-yellow-400 scale-110 opacity-100 z-10 shadow-[0_0_20px_rgba(250,204,21,0.5)]" // ACTIVE (Visible)
                    : hovered === "store"
                    ? "opacity-0 scale-50 blur-sm pointer-events-none" 
                    : "border-yellow-400 text-yellow-400 opacity-75 hover:bg-yellow-400/10" 
                }
              `}
            >
              Start Learning
            </Link>
          </div>

          {/* ======================= */}
          {/* RIGHT BUTTON (Business) */}
          <div
            className="relative"
            onMouseEnter={() => setHovered("store")}
            onMouseLeave={() => setHovered("none")}
          >
            <Link
              href="/shop"
              className={`
                inline-block px-10 py-4 rounded-xl text-xl font-semibold border-2 transition-all duration-500 ease-in-out
                ${
                  hovered === "store"
                    ? "bg-yellow-400 text-white border-yellow-400 scale-110 opacity-100 z-10 shadow-[0_0_20px_rgba(250,204,21,0.5)]" 
                    : hovered === "library"
                    ? "opacity-0 scale-50 blur-sm pointer-events-none" 
                    : "border-yellow-400 text-yellow-400 opacity-75 hover:bg-yellow-400/10" 
                }
              `}
            >
              Shop Products
            </Link>
          </div>
        </motion.div>

        {/* FOOTER LINKS */}
        <motion.div
          className="flex gap-8 mt-14 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Link href="/auth/login" className="hover:text-yellow-400 transition">
            Login
          </Link>
          <Link href="/admin" className="hover:text-yellow-400 transition">
            Admin
          </Link>
        </motion.div>
      </div>
    </div>
  );
}