import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-3xl font-extrabold text-white tracking-tight">
              Tech<span className="text-blue-500">Bazar</span>
            </h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Your trusted destination for premium gadgets. We ensure
              authenticity, fast delivery, and excellent after-sales support.
            </p>
            <div className="flex space-x-4 pt-2">
              <SocialIcon icon={<Facebook size={18} />} href="#" />
              <SocialIcon icon={<Twitter size={18} />} href="#" />
              <SocialIcon icon={<Instagram size={18} />} href="#" />
              <SocialIcon icon={<Linkedin size={18} />} href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <FooterLink href="/">Home</FooterLink>
              </li>
              <li>
                <FooterLink href="/products">All Products</FooterLink>
              </li>
              <li>
                <FooterLink href="/about">About Us</FooterLink>
              </li>
              <li>
                <FooterLink href="/contact">Contact Support</FooterLink>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Customer Service
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <FooterLink href="#">Shipping Policy</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Returns & Refunds</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Terms & Conditions</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Privacy Policy</FooterLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Get in Touch
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="text-blue-500 shrink-0" size={20} />
                <span>+880 1712 345 678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-blue-500 shrink-0" size={20} />
                <span>support@techbazar.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-blue-500 shrink-0" size={20} />
                <span>Level 4, Gulshan-1, Dhaka-1212, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} TechBazar. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer transition">
              Privacy
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Terms
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Cookies
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Helper Components
function SocialIcon({ icon, href }) {
  return (
    <a
      href={href}
      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 hover:-translate-y-1"
    >
      {icon}
    </a>
  );
}

function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      className="hover:text-blue-400 transition-colors duration-200 block"
    >
      {children}
    </Link>
  );
}
