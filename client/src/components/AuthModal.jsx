"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, ArrowRight, Loader2, Github } from "lucide-react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AuthModal({ isOpen, onClose }) {
  const [mode, setMode] = useState("login"); 
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  //Mood change
  const switchMode = (newMode) => {
    setMode(newMode);
    setFormData({ name: "", email: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "register") {
        // --- REGISTER LOGIC ---
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Registration failed");
        
        toast.success("Account created! Logging you in...");
        
        // auto login
        await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });
        
        onClose(); 
        router.refresh(); 
      } else {
        // --- LOGIN LOGIC ---
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result.error) {
          toast.error("Invalid Email or Password!");
        } else {
          toast.success("Welcome back!");
          onClose();
          router.refresh();
        }
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden border border-gray-100 p-6 md:p-8"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"
            >
              <X size={20} />
            </button>

            {/* Header & Toggle */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                {mode === "login" ? "Welcome Back" : "Join TechBazar"}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                {mode === "login" ? "Access your account & orders" : "Start your tech journey today"}
              </p>

              {/* Tab Switcher */}
              <div className="bg-gray-100 p-1 rounded-xl inline-flex relative">
                <div 
                   className={`absolute top-1 bottom-1 w-1/2 bg-white rounded-lg shadow-sm transition-all duration-300 ${mode === "login" ? "left-1" : "left-[48.5%]"}`}
                ></div>
                <button 
                  onClick={() => switchMode("login")}
                  className={`relative z-10 px-6 py-2 text-sm font-bold transition ${mode === "login" ? "text-blue-600" : "text-gray-500"}`}
                >
                  Log In
                </button>
                <button 
                  onClick={() => switchMode("register")}
                  className={`relative z-10 px-6 py-2 text-sm font-bold transition ${mode === "register" ? "text-blue-600" : "text-gray-500"}`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {mode === "register" && (
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-200 disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    {mode === "login" ? "Sign In" : "Create Account"} 
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
              <div className="relative flex justify-center text-xs"><span className="px-2 bg-white text-gray-500">Or continue with</span></div>
            </div>

            <button
               onClick={() => signIn("google")}
               className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition text-sm font-medium text-gray-700"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5" alt="Google" />
              Sing In With Google
            </button>
            
            

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}