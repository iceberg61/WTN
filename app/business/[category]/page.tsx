"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

// Dummy product data — we will later replace with database
const productsDB = {
  fashion: [
    {
      id: "f1",
      title: "Blue T-Shirt",
      price: "₦8,000",
      image: "/products/shirt.jpeg",
      seller: "TrendWear",
    },
    {
      id: "f2",
      title: "Designer Sneakers",
      price: "₦25,000",
      image: "/products/shoe.jpeg",
      seller: "UrbanKickz",
    },
  ],

  electronics: [
    {
      id: "e1",
      title: "Wireless Headphones",
      price: "₦30,000",
      image: "/products/headphone.jpg",
      seller: "TechZone",
    },
  ],
};

export default function CategoryPage() {
  const { category } = useParams();
  const products = productsDB[category as keyof typeof productsDB] || [];

  return (
    <div className="min-h-screen bg-white px-6 py-16">
      {/* Title */}
      <motion.h1
        className="text-3xl font-bold text-gray-900 text-center capitalize"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {category} Products
      </motion.h1>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link
              href={`/business/product/${p.id}`}
              className="block bg-gray-100 rounded-xl overflow-hidden shadow hover:shadow-md transition"
            >
              <div className="relative w-full h-32 sm:h-40">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-3">
                <h2 className="font-medium text-gray-900">{p.title}</h2>
                <p className="text-gray-500 text-sm">{p.price}</p>
                <p className="text-xs text-gray-400 mt-1">Seller: {p.seller}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-center text-gray-500 mt-20 text-lg">
          No products listed yet for this category.
        </p>
      )}
    </div>
  );
}
