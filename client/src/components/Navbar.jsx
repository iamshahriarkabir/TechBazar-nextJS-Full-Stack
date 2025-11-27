"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import {
  ShoppingBag,
  Menu,
  X,
  LogOut,
  PlusCircle,
  LayoutDashboard,
  User,
  LogIn,
} from "lucide-react";
import toast from "react-hot-toast";
import AuthModal from "@/components/AuthModal";

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const { data: session } = useSession();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userImage =
    session?.user?.image ||
    `https://ui-avatars.com/api/?name=${
      session?.user?.name || "User"
    }&background=0D8ABC&color=fff`;

  const handleLogout = () => {
    setProfileDropdownOpen(false);
    toast.success("See you again! 👋");
    setTimeout(() => signOut(), 1000);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 shadow-sm
          ${
            isScrolled
              ? "bg-white/50 backdrop-blur-md shadow-md "
              : "bg-white md:bg-white/80"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Hamburger & Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-0.5 rounded-lg hover:bg-gray-200 transition border border-gray-600 text-gray-600"
              >
                <Menu size={24} />
              </button>

              <Link href="/" className="flex items-center gap-2">
                <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                  <ShoppingBag size={20} />
                </div>
                <span className="text-xl md:text-2xl font-extrabold ">
                  <span className="text-gray-800">Tech</span><span className="bg-linear-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">Bazar</span>
                </span>
              </Link>
            </div>

            {/* Center: Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative font-medium transition duration-300 text-sm uppercase tracking-wide ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="underline"
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right: Cart & Auth */}
            <div className="flex items-center gap-3">
              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
              >
                <ShoppingBag size={24} />
                {isMounted && cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Auth Button / Profile */}
              {session ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 focus:outline-none border border-gray-200 rounded-full p-1 bg-white hover:shadow-md transition"
                  >
                    <img
                      src={userImage}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border border-gray-100"
                    />
                    <span className="hidden md:block text-sm font-semibold text-gray-700 max-w-[80px] truncate pr-2">
                      {session.user.name}
                    </span>
                  </button>

                  <AnimatePresence>
                    {profileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
                      >
                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                          <p className="text-xs text-gray-500 uppercase tracking-wider">
                            Signed in as
                          </p>
                          <p className="text-sm font-bold text-gray-800 truncate">
                            {session.user.email}
                          </p>
                        </div>
                        <div className="py-2">
                          <Link
                            href="/add-product"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                          >
                            <PlusCircle size={16} className="mr-2" /> Add
                            Product
                          </Link>
                          <Link
                            href="/manage-products"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                          >
                            <LayoutDashboard size={16} className="mr-2" />{" "}
                            Manage Products
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                          >
                            <LogOut size={16} className="mr-2" /> Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                // 🔥 LOGIN BUTTON (Triggers Modal)
                <>
                  <button
                    onClick={() => setIsAuthOpen(true)}
                    className="hidden md:flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-gray-900 rounded-full hover:bg-blue-600 transition shadow-lg shadow-gray-200"
                  >
                    <LogIn size={18} />
                    Login
                  </button>
                  {/* Mobile Icon */}
                  <button
                    onClick={() => setIsAuthOpen(true)}
                    className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full transition"
                  >
                    <User size={24} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Sidebar (Drawer) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 h-screen bg-black/70 z-[60] md:hidden "
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 h-screen w-[280px] bg-white shadow-2xl z-[70] md:hidden flex flex-col border-r border-gray-200 overflow-hidden"
              >
                <div className="p-5 flex justify-between items-center border-b border-gray-100 bg-gray-50">
                  <span className="text-xl font-bold text-gray-800">Menu</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 bg-white border border-gray-200 rounded-lg"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-white">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                    >
                      {link.name}
                    </Link>
                  ))}

                  {/* {!session && (
                    <div className="pt-6 border-t border-gray-100 mt-4">
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setIsAuthOpen(true);
                        }}
                        className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg"
                      >
                        Login / Register
                      </button>
                    </div>
                  )} */}
                </div>

                <div className="p-4 bg-gray-50 text-xs text-center text-gray-400 border-t border-gray-100">
                  &copy; TechBazar Mobile
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* 🔥 AUTH MODAL (Global) */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
