"use client";

import { useState } from "react";
import { ShoppingCart, Heart, Minus, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";

export default function ProductActions({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Stock check
  const isAvailable = product.inStock !== false;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      toast.success("Added to wishlist! ❤️");
    } else {
      toast.success("Removed from wishlist 💔", {
        icon: null,
        style: { background: "#f8d7da", color: "#721c24" },
      });
    }
  };

  return (
    <div className="mt-8">
      {/* Quantity & Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Quantity Counter */}
        <div
          className={`flex items-center border border-gray-300 rounded-xl w-max ${
            !isAvailable ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-3 hover:bg-gray-100 rounded-l-xl transition"
          >
            <Minus size={18} />
          </button>
          <span className="w-12 text-center font-bold text-gray-900">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-3 hover:bg-gray-100 rounded-r-xl transition"
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="flex flex-1 gap-4">
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!isAvailable}
            className={`flex-1 flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold text-lg transition shadow-lg 
                ${
                  isAvailable
                    ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                }`}
          >
            <ShoppingCart size={20} />
            {isAvailable ? "Add to Cart" : "Out of Stock"}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`p-3 border-2 rounded-xl transition-all duration-300 ${
              isWishlisted
                ? "bg-red-50 border-red-200 text-red-500 shadow-sm transform scale-105"
                : "border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-500 hover:bg-red-50"
            }`}
          >
            <Heart
              size={24}
              fill={isWishlisted ? "currentColor" : "none"}
              className={`transition-transform duration-300 ${
                isWishlisted ? "scale-110" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
