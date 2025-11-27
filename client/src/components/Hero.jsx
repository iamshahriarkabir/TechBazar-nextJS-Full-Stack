"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Zap, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* 1. Background Glow Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-300/50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob z-10" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-300/50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob animation-delay-2000" />
        <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] bg-purple-300/50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* --- LEFT SIDE: Content --- */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold tracking-wide "
            >
              <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                  </span>
              New Arrivals 2027
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1]"
            >
              Next Gen <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
                Tech for You.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Experience the future with our curated collection of premium
              gadgets. Authentic products, official warranty, and lightning-fast
              delivery.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link href="/products" className="w-full sm:w-auto">
                <button className="w-full px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200 flex items-center justify-center gap-2 group">
                  Shop Now
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <button className="w-full px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-bold text-lg hover:bg-gray-50 hover:border-gray-300 transition flex items-center justify-center gap-2">
                  Learn More
                </button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-sm font-medium text-gray-500"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-green-500" size={18} /> 100%
                Authentic
              </div>
              <div className="flex items-center gap-2">
                <Zap className="text-yellow-500" size={18} /> Fast Delivery
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT SIDE: Floating Image & Elements --- */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            {/* Main Product Image with Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 w-full max-w-md"
            >
              <motion.img
                animate={{ y: [0, -20, 0] }} // Floating Animation
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                src="https://images.unsplash.com/photo-1616410011236-7a42121dd981?q=80&w=1000&auto=format&fit=crop"
                alt="Tech Gadgets"
                className="w-full h-auto drop-shadow-2xl rounded-3xl object-cover mask-image-gradient"
              />

              {/* Floating Glassmorphism Card 1 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/40 hidden sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <Star size={20} fill="currentColor" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">4.9 Rating</p>
                    <p className="text-xs text-gray-500">From 10k+ Reviews</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Glassmorphism Card 2 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -top-6 -right-6 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/40 hidden sm:block"
              >
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                    Discount
                  </p>
                  <p className="text-2xl font-extrabold text-blue-600">
                    20% OFF
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Decorative Circle behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-linear-to-tr from-blue-100 to-transparent rounded-full opacity-40 blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
