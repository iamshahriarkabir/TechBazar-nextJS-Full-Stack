"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Upload,
  Save,
  Link as LinkIcon,
  Image as ImageIcon,
} from "lucide-react";

export default function AddProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });

  // authentication check
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-blue-600 font-bold">
        Checking permissions...
      </div>
    );
  }

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.category) {
      toast.error("Please select a category");
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        userEmail: session?.user?.email, 
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Product published successfully! 🚀");
        router.push("/products");
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to add product.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/manage-products"
              className="p-2 bg-white rounded-full border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-200 transition"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Add New Product
              </h1>
              <p className="text-gray-500 text-sm">
                Create a new listing for your store
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT SIDE: The Form --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Title */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Product Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. iPhone 15 Pro Max Titanium"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Price ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      name="price"
                      required
                      placeholder="999"
                      className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition cursor-pointer"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    {[
                      "Phone",
                      "Laptop",
                      "Watch",
                      "Audio",
                      "Camera",
                      "Gaming",
                      "Accessories",
                    ].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Image URL
                </label>
                <div className="relative">
                  <LinkIcon
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="url"
                    name="image"
                    required
                    placeholder="https://example.com/image.jpg"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    value={formData.image}
                    onChange={handleChange}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  *Tip: Copy an image address from Unsplash or Google Images.
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="5"
                  required
                  placeholder="Describe your product nicely..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 disabled:bg-blue-300 disabled:cursor-not-allowed transform hover:-translate-y-1"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Publishing...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Publish Product
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* --- RIGHT SIDE: Live Preview --- */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                Live Preview
              </h3>

              {/* Preview Card */}
              <motion.div
                layout
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xl"
              >
                {/* Preview Image */}
                <div className="h-64 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/600x400?text=Invalid+Image";
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center text-gray-400">
                      <ImageIcon size={48} className="mb-2 opacity-50" />
                      <span className="text-sm">Image Preview</span>
                    </div>
                  )}

                  {formData.category && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                        {formData.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Preview Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-2">
                    {formData.title || "Product Title"}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {formData.description ||
                      "Product description will appear here..."}
                  </p>

                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-2xl font-extrabold text-blue-600">
                      ${formData.price || "00"}
                    </span>
                    <span className="text-sm font-medium text-gray-400 cursor-not-allowed">
                      View Details &rarr;
                    </span>
                  </div>
                </div>
              </motion.div>

              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-800">
                  <strong>✨ Pro Tip:</strong> Use high-quality images and a
                  catchy description to attract more buyers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}