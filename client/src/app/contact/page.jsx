"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // API Call Simulation
    setTimeout(() => {
      toast.success(
        "Message sent successfully! We'll get back to you soon. 🚀"
      );
      setLoading(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* 1. Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
        >
          Get in <span className="text-blue-600">Touch</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Have questions about our products or need support? We are here to
          help. Chat with us or drop a message below.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* --- LEFT SIDE: Contact Info & Map --- */}
        <div className="space-y-8 lg:col-span-5">

          <div className="flex flex-col md:flex-row lg:flex-col gap-10">
            {/* Info Cards */}
          <div className="flex-1 bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-8">
            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Call Us</h3>
                <p className="text-sm text-gray-500 mb-1">
                  Mon-Fri from 9am to 6pm
                </p>
                <a
                  href="tel:+8801712345678"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  +880 1712 345 678
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Email Us</h3>
                <p className="text-sm text-gray-500 mb-1">
                  Our friendly team is here to help.
                </p>
                <a
                  href="mailto:support@techbazar.com"
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  support@techbazar.com
                </a>
              </div>
            </div>

            {/* Office */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Visit Us</h3>
                <p className="text-sm text-gray-500 mb-1">
                  Come say hello at our office.
                </p>
                <p className="text-gray-700 font-medium">
                  Level 4, Gulshan-1, <br /> Dhaka-1212, Bangladesh
                </p>
              </div>
            </div>
          </div>

          {/* Quick Chat Box */}
          <div className="flex-1 bg-linear-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <MessageSquare size={20} /> Live Chat
              </h3>
              <p className="text-blue-100 text-sm mb-4">
                Wait time: ~5 minutes
              </p>
              <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition">
                Start Chat
              </button>
            </div>
            {/* Decoration */}
            <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </div>
          </div>
          
        </div>

        {/* --- RIGHT SIDE: Contact Form --- */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-7"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="Order inquiry, Support, etc."
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows="5"
                  name="message"
                  required
                  placeholder="How can we help you today?"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-blue-600 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>Sending...</>
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
