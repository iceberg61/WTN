"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function BusinessPage() {
  const products = [
    {
      id: "pro1",
      name: "Wireless Headphones",
      price: "$45.99",
      img: "/products/headphone.jpg",
    },
    {
      id: "pro2",
      name: "Classic Wrist Watch",
      price: "$62.50",
      img: "/products/watch.jpg",
    },
    {
      id: "pro3",
      name: "Gaming Mouse",
      price: "$29.99",
      img: "/products/mouse.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black px-6 py-20">
      <motion.h1
        className="text-4xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Marketplace
      </motion.h1>

      {/* PRODUCT GRID */}
      <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {products.map((item) => (
          <motion.div
            key={item.id}
            className="bg-white border rounded-xl shadow-md hover:shadow-xl transition p-4 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-full h-52 relative rounded-lg overflow-hidden">
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-cover hover:scale-110 transition"
              />
            </div>

            <h2 className="mt-4 font-semibold text-lg">{item.name}</h2>
            <p className="text-black/70">{item.price}</p>

            <button className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition">
              View Product
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
