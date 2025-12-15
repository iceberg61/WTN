"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

// Dummy full product details — replace with DB later
const productDB = {
  f1: {
    id: "f1",
    title: "Blue T-Shirt",
    price: "₦8,000",
    seller: "TrendWear",
    phone: "08123456789",
    image: "/products/shirt.jpeg",
    description:
      "High-quality cotton t-shirt. Available in all sizes. Very comfortable and long-lasting.",
  },

  f2: {
    id: "f2",
    title: "Designer Sneakers",
    price: "₦25,000",
    seller: "UrbanKickz",
    phone: "07099888777",
    image: "/products/shoe.jpeg",
    description:
      "Premium sneakers with perfect comfort and style. Available in multiple sizes.",
  },

  e1: {
    id: "e1",
    title: "Wireless Headphones",
    price: "₦30,000",
    seller: "TechZone",
    phone: "08122233445",
    image: "/products/headphone.jpg",
    description:
      "Noise-cancelling wireless headphones with long battery life and deep bass sound.",
  },
};

export default function ProductPage() {
  const { id } = useParams();
  const product = productDB[id as keyof typeof productDB];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Product not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 py-16">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="relative w-full h-80 rounded-xl overflow-hidden bg-gray-100 shadow">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">
            {product.title}
          </h1>

          <p className="text-xl text-gray-700 mt-2">{product.price}</p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <p className="mt-4 text-gray-500 text-sm">
            Seller: <span className="font-semibold">{product.seller}</span>
          </p>

          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/234${product.phone.slice(1)}?text=Hello, I'm interested in your product: ${product.title}`}
            target="_blank"
            className="mt-6 block bg-green-600 text-white py-3 rounded-lg text-center font-medium hover:bg-green-700 transition"
          >
            Contact Seller on WhatsApp
          </a>
        </motion.div>
      </div>
    </div>
  );
}
