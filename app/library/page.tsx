"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LibraryMaterial } from "../types/library";
import dynamic from "next/dynamic";

const Stars = dynamic(() => import("../components/Stars"), {
  ssr: false,
});

export default function LibraryPage() {
  const [materials, setMaterials] = useState<LibraryMaterial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await fetch("/api/library", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch materials");
        }

        const data: LibraryMaterial[] = await res.json();
        setMaterials(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white px-6 py-20 overflow-hidden">
      <Stars />

      <motion.h1
        className="text-4xl font-bold text-center text-gold relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Library
      </motion.h1>

      {/* Loading */}
      {loading && (
        <p className="relative z-10 text-center mt-12 opacity-70">
          Loading materials...
        </p>
      )}

      {/* Empty state */}
      {!loading && materials.length === 0 && (
        <p className="relative z-10 text-center mt-12 opacity-70">
          No materials available yet.
        </p>
      )}

      {/* Materials */}
      <div className="relative z-10 max-w-6xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {materials.map((item) => (
          <motion.div
            key={item._id}
            className="bg-black/60 border border-gold rounded-xl p-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-semibold text-xl">{item.title}</h2>

            <p className="text-sm opacity-70">
              {item.subject} • {item.level}
            </p>

            <p className="text-xs mt-1 opacity-50">{item.type}</p>

            <Link
              href={`/library/${item._id}`}
              className="block mt-4 text-gold"
            >
              {item.isPremium
                ? "Subscribe to Unlock →"
                : "Open Material →"}
            </Link>

            {item.isPremium && (
              <p className="text-xs mt-2 opacity-60">🔒 Premium</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
