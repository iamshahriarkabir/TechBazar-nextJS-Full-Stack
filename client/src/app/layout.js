import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { CartProvider } from "@/context/CartContext";
import { Suspense } from "react";
import CartSidebar from "@/components/CartSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TechBazar - Premium Gadget Store",
  description: "Best authentic gadgets in town",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={<div className="h-16 bg-white"></div>}>
              <Navbar />
            </Suspense>

            <CartSidebar />

            <main className="grow">{children}</main>

            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
