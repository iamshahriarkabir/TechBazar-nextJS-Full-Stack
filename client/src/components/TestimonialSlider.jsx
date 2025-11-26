"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

// Testimonial Data
const testimonials = [
  {
    name: "Sakib John",
    initials: "SJ",
    text: "TechBazar provided the best shopping experience. Authentic products and super fast delivery!",
  },
  {
    name: "Abir Khan",
    initials: "AK",
    text: "I was looking for original Apple accessories and finally found a trusted shop. Highly recommended.",
  },
  {
    name: "Zara Rahman",
    initials: "ZR",
    text: "Customer service is top-notch. They helped me choose the perfect laptop for my needs.",
  },
  {
    name: "Rahim Uddin",
    initials: "RU",
    text: "Delivery within 24 hours as promised. The packaging was very secure and premium.",
  },
  {
    name: "Nila Chowdhury",
    initials: "NC",
    text: "Great prices compared to the local market. Will definitely order again!",
  },
];

export default function TestimonialSlider() {
  return (
    <section className="py-16 bg-gray-50 border-t border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Customer Reviews</h2>
        <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Slider Container */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Fade Effect */}
        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

        {/* Infinity Track */}
        <div className="flex">
          <motion.div
            className="flex gap-6 px-4"
            animate={{ x: "-50%" }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[...testimonials, ...testimonials].map((item, idx) => (
              <div
                key={idx}
                className="w-[350px] flex-shrink-0 p-6 rounded-2xl border border-gray-100 bg-white hover:border-blue-200 hover:shadow-lg transition-all duration-300 group cursor-default"
              >
                {/* Stars */}
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-600 mb-6 text-sm leading-relaxed italic">
                  "{item.text}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-3 border-t border-gray-50 pt-4">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">
                      {item.name}
                    </h4>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                      Verified Buyer
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
