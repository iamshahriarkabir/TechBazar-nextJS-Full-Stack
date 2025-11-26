"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product._id}`} className="group block h-full">
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 h-full flex flex-col relative"
      >
        {/* Image Section */}
        <div className="h-64 bg-gray-50 flex items-center justify-center relative overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
            src={product.image || product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm border border-gray-200">
              {product.category}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 grow flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition line-clamp-1 mb-2">
              {product.title}
            </h3>
            <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-4">
              {product.description || product.shortDescription}
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="text-xl font-extrabold text-gray-900">
              ${product.price}
            </span>
            <span className="text-sm font-medium text-blue-600 group-hover:underline flex items-center gap-1">
              Details &rarr;
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
