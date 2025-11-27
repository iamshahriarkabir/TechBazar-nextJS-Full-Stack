"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Truck,
  Zap,
  Award,
  Users,
  Heart,
  Target,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 px-6 bg-gray-50/50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block py-1 px-4 rounded-full bg-blue-100 backdrop-blur-md text-blue-700 text-xs font-bold tracking-widest uppercase border border-white/10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full ">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                </span>
                <span className="text-xs font-bold tracking-widest uppercase text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 animate-gradient-x">
                  Ends in 24 Hours
                </span>
              </div>
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight"
            >
              Empowering Your <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
                Digital Lifestyle
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              We started TechBazar with a simple mission: to make premium
              technology accessible, authentic, and affordable for everyone in
              Bangladesh.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. Our Mission */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-full h-full bg-blue-100 rounded-3xl -z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
              alt="Our Team"
              className="rounded-3xl shadow-2xl w-full object-cover h-[400px] md:h-[500px]"
            />
            <div className="absolute bottom-8 right-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block">
              <p className="text-gray-500 text-sm mb-2">
                "Quality is not an act, it is a habit."
              </p>
              <p className="font-bold text-gray-900">- Team TechBazar</p>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Target size={28} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Driven by Purpose
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                In a market flooded with counterfeits, finding genuine gadgets
                was a challenge. That’s why we launched TechBazar in 2024.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mt-4">
                We dont just sell products; we sell peace of mind. Every item in
                our inventory is handpicked, verified, and backed by official
                warranty.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-bold text-gray-900 text-xl">25k+</h4>
                <p className="text-gray-500">Happy Customers</p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h4 className="font-bold text-gray-900 text-xl">100%</h4>
                <p className="text-gray-500">Authentic Items</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Stats Section */}
      <section className="py-24 bg-[#0f172a] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -mr-20 -mt-20 mix-blend-screen opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] -ml-20 -mb-20 mix-blend-screen opacity-50"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          >
            {statsData.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:bg-white/10 transition duration-300"
              >
                <h3 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400 mb-2">
                  {stat.value}
                </h3>
                <p className="text-blue-100 font-medium uppercase tracking-wider text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Why Choose Us (Updated with Border & Hover) */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Shop With Us?
            </h2>
            <p className="text-gray-500 mt-2">The TechBazar Difference</p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 group"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.colorBg} ${feature.colorText}`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto bg-[#0f172a] rounded-[2.5rem] p-10 md:p-20 text-center text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
              Ready to Upgrade <br /> Your Tech Game?
            </h2>
            <p className="text-blue-200 text-lg mb-10">
              Join 50,000+ satisfied customers who trust TechBazar for authentic
              gadgets.
            </p>

            <Link href="/products">
              <button className="bg-white text-[#0f172a] px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
                Explore Products <ArrowRight size={20} />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ---- Data Section ----
const statsData = [
  { label: "Products", value: "2.5K+" },
  { label: "Happy Users", value: "50K+" },
  { label: "Districts", value: "64" },
  { label: "Rating", value: "4.9/5" },
];

const features = [
  {
    title: "100% Authentic",
    desc: "We source products directly from brands and authorized distributors. No fakes.",
    icon: <ShieldCheck size={28} />,
    colorBg: "bg-blue-50",
    colorText: "text-blue-600",
  },
  {
    title: "Superfast Delivery",
    desc: "Get your gadgets delivered within 24–48 hours anywhere in the country.",
    icon: <Truck size={28} />,
    colorBg: "bg-green-50",
    colorText: "text-green-600",
  },
  {
    title: "Expert Support",
    desc: "Our technical team is always ready to assist you with any issues.",
    icon: <Users size={28} />,
    colorBg: "bg-purple-50",
    colorText: "text-purple-600",
  },
  {
    title: "Fair Pricing",
    desc: "We constantly monitor the market to ensure you always get the best deal.",
    icon: <Award size={28} />,
    colorBg: "bg-orange-50",
    colorText: "text-orange-600",
  },
  {
    title: "Warranty Benefits",
    desc: "Every genuine product comes with official warranty coverage.",
    icon: <Zap size={28} />,
    colorBg: "bg-yellow-50",
    colorText: "text-yellow-600",
  },
  {
    title: "Community Love",
    desc: "We are more than a shop; we are a community of tech enthusiasts.",
    icon: <Heart size={28} />,
    colorBg: "bg-red-50",
    colorText: "text-red-600",
  },
];
