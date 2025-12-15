"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BusinessPage() {
  const categories = [
    {
      id: "fashion",
      title: "Fashion",
      image: "/marketplace/fashion.jpeg",
    },
    {
      id: "beauty",
      title: "Beauty",
      image: "/marketplace/beauty.jpeg",
    },
    {
      id: "home",
      title: "Home",
      image: "/marketplace/home.jpeg",
    },
    {
      id: "electronics",
      title: "Electronics",
      image: "/marketplace/electronics.jpeg",
    },
    {
      id: "pets",
      title: "Pets",
      image: "/marketplace/pets.jpeg",
    },
    {
      id: "Women",
      title: "Women",
      image: "/marketplace/women.jpeg",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-6 py-16">
      {/* Title */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center text-gray-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Discover Products from Entrepreneurs
      </motion.h1>

      {/* Subtitle */}
      <p className="text-center text-gray-600 mt-3">
        Browse categories and connect with business owners directly.
      </p>

      {/* Category Grid */}
      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              href={`/business/${cat.id}`}
              className="block bg-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              {/* Category Image */}
              <div className="relative w-full h-28 sm:h-32">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Title */}
              <div className="p-3 text-center text-gray-800 font-medium">
                {cat.title}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
