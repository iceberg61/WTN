"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Stars from "../components/Stars";

export default function LibraryPage() {
  const content = [
    { id: "math101", title: "Mathematics 101", type: "PDF" },
    { id: "eng201", title: "English Literature", type: "Video" },
    { id: "bio110", title: "Biology Essentials", type: "PDF" },
    { id: "chem110", title: "Chemisty Essentials", type: "PDF" },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white px-6 py-20 overflow-hidden">
      
      {/* Background Stars */}
      <Stars />

      {/* Title */}
      <motion.h1
        className="text-4xl font-bold text-center text-gold relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Library
      </motion.h1>

      {/* Cards Grid - NO HOVER WHATSOEVER */}
      <div className="relative z-10 max-w-6xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {content.map((item) => (
          <motion.div
            key={item.id}
            className="bg-black/60 border border-gold rounded-xl p-6"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-semibold text-xl">{item.title}</h2>
            <p className="text-sm opacity-70">{item.type}</p>

            <Link
              href={`/library/${item.id}`}
              className="block mt-4 text-gold"
            >
              Open Material →
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}