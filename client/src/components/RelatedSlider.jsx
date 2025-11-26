"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function RelatedSlider({ products }) {
  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const infiniteProducts = [...products, ...products, ...products, ...products];

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(
        carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
      );
    }
  }, [infiniteProducts]);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Auto Play
  useEffect(() => {
    let interval;

    if (!isHovered) {
      interval = setInterval(() => {
        if (carouselRef.current) {
          if (
            carouselRef.current.scrollLeft + carouselRef.current.offsetWidth >=
            carouselRef.current.scrollWidth - 10
          ) {
            carouselRef.current.scrollTo({ left: 0, behavior: "auto" });
          } else {
            carouselRef.current.scrollBy({ left: 320, behavior: "smooth" });
          }
        }
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div
      className="mt-20 relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header & Controls */}
      <div className="flex justify-between items-end mb-8 px-1">
        <h2 className="text-2xl font-bold text-gray-900">
          You might also like
        </h2>

        {/* Buttons */}
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full border border-gray-200 bg-white hover:bg-blue-600 hover:text-white hover:border-blue-600 transition shadow-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full border border-gray-200 bg-white hover:bg-blue-600 hover:text-white hover:border-blue-600 transition shadow-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* --- SLIDER CONTAINER --- */}
      <div className="overflow-hidden" ref={carouselRef}>
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          whileTap={{ cursor: "grabbing" }}
          className="flex gap-6 cursor-grab py-4"
        >
          {infiniteProducts.map((product, index) => (
            <motion.div
              key={`${product._id}-${index}`}
              className="min-w-[280px] md:min-w-[300px] h-full transform transition-transform hover:scale-[1.02]"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mobile Swipe Hint */}
      <p className="md:hidden text-xs text-gray-400 text-center mt-2 flex items-center justify-center gap-1 animate-pulse">
        Swipe or wait for auto-slide &rarr;
      </p>
    </div>
  );
}
