import Link from "next/link";
import ProductActions from "@/components/ProductActions";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle,
  XCircle,
} from "lucide-react";
import RelatedSlider from "@/components/RelatedSlider";

async function getProduct(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

async function getRelatedProducts(category, currentId) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      next: { revalidate: 60 },
    });
    const allProducts = await res.json();
    return allProducts
      .filter((p) => p.category === category && p._id !== currentId)
      .slice(0, 8);
  } catch (error) {
    return [];
  }
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  const relatedProducts = await getRelatedProducts(product.category, id);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <ChevronRight size={16} className="mx-2" />
          <Link href="/products" className="hover:text-blue-600 transition">
            Products
          </Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-900 font-medium">{product.title}</span>
        </nav>

        {/* Main Section */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Image */}
          <div className="relative group">
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center relative">
              <img
                src={product.image || product.imageUrl}
                alt={product.title}
                className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm border border-gray-200">
                  {product.category}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Product Details */}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-blue-600">
                ${product.price}
              </span>

              {/* 🔥 STOCK STATUS LOGIC */}
              {product.inStock !== false ? (
                <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wide">
                  <CheckCircle size={14} /> In Stock
                </span>
              ) : (
                <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase tracking-wide">
                  <XCircle size={14} /> Out of Stock
                </span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed text-lg mb-8 border-b border-gray-100 pb-8">
              {product.description || product.fullDescription}
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Truck size={20} />
                </div>
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <ShieldCheck size={20} />
                </div>
                <span>1 Year Warranty</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <RotateCcw size={20} />
                </div>
                <span>30 Days Return</span>
              </div>
            </div>

            {/* Interactive Actions */}
            <ProductActions product={product} />
          </div>
        </div>

        {/* Slider */}
        {relatedProducts.length > 0 && (
          <RelatedSlider products={relatedProducts} />
        )}
      </div>
    </div>
  );
}
