import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import TestimonialSlider from "@/components/TestimonialSlider";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  CreditCard,
  Star,
  Gift,
  Headphones,
} from "lucide-react";

//  Express Server input
async function getTrendingProducts() {
  try {
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch products from Express Server");
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Error connecting to Express Server:", error);
    return [];
  }
}

export default async function Home() {
  const allProducts = await getTrendingProducts();
  const trendingProducts = allProducts.slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Categories Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                Browse Categories
              </h3>
              <span className="text-xs text-gray-400 md:hidden">
                Swipe to see more &rarr;
              </span>
            </div>

            <div className="flex overflow-x-auto p-4 gap-4 md:grid md:grid-cols-7 md:gap-4 scrollbar-hide">
              {[
                "Smartphones",
                "Laptops",
                "Watches",
                "Audio",
                "Cameras",
                "Gaming",
                "Accessories",
              ].map((cat) => (
                <Link
                  href={`/products?category=${cat}`}
                  key={cat}
                  className="shrink-0 px-6 py-3 rounded-xl bg-gray-50 border border-gray-100 text-gray-700 font-medium hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md text-center transform-gpu"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3. Trending Products Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-12 gap-4">
            <div>
              <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                Don't Miss Out
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                Trending Now
              </h2>
            </div>

            <Link
              href="/products"
              className="group flex items-center gap-2 text-gray-600 font-semibold hover:text-blue-600 transition-colors bg-white px-5 py-2.5 rounded-full border border-gray-200 hover:border-blue-200 shadow-sm"
            >
              View All Products
              <span className="bg-gray-100 text-gray-600 group-hover:bg-blue-600 group-hover:text-white p-1 rounded-full transition-all duration-300">
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </FadeIn>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {trendingProducts.length > 0 ? (
            trendingProducts.map((product, index) => (
              <FadeIn key={product._id} delay={index * 0.05} className="h-full">
                <ProductCard product={product} />
              </FadeIn>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-red-200">
              <div className="inline-block p-4 bg-red-50 rounded-full mb-3">
                <Truck className="text-red-400" size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">
                Cannot connect to Server
              </h3>
              <p className="text-gray-500 text-sm mt-1 mb-4">
                Make sure your <strong>Express Backend</strong> is running on
                Port 5000!
              </p>
              <div className="text-xs text-gray-400 bg-gray-100 inline-block px-3 py-2 rounded font-mono">
                npm run dev (client) + node index.js (server)
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Promo Banner */}
      <section className="py-16 px-4">
        <FadeIn>
          <div className="max-w-7xl mx-auto bg-[#0f172a] rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[120px] -mr-20 -mt-20 mix-blend-screen opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] -ml-20 -mb-20 mix-blend-screen opacity-50"></div>

            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* --- LEFT SIDE: Content --- */}
              <div className="text-center lg:text-left space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                  </span>
                  <span className="text-xs font-bold tracking-widest uppercase text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 animate-gradient-x">
                    Ends in 24 Hours
                  </span>
                </div>

                <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1]">
                  Level Up Your <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 animate-gradient-x">
                    Audio Game.
                  </span>
                </h2>

                {/* Subtitle */}
                <p className="text-blue-200 text-lg max-w-md mx-auto lg:mx-0">
                  Get flat <span className="text-white font-bold">30% OFF</span>{" "}
                  on premium noise-cancelling headphones. Experience sound like
                  never before.
                </p>

                {/* CTA Button */}
                <div className="pt-6">
                  <Link href="/products?category=Audio">
                    <button className="bg-white text-gray-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transform hover:-translate-y-1 active:scale-95 flex items-center gap-2 mx-auto lg:mx-0">
                      Shop the Sale <ArrowRight size={20} />
                    </button>
                  </Link>
                </div>
              </div>

              {/* --- RIGHT SIDE: Hero Product Image --- */}
              <div className="relative flex justify-center lg:justify-end">
                {/* Glowing Ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-linear-to-r from-blue-500 to-purple-500 rounded-full blur-[80px] opacity-60 animate-pulse"></div>

                {/* Floating Product Image */}
                <img
                  src="https://images.unsplash.com/photo-1616410011236-7a42121dd981?q=80&w=1000&auto=format&fit=crop"
                  alt="Premium Headphones"
                  className="relative rounded-2xl z-10 w-full max-w-sm drop-shadow-2xl hover:scale-105 transition duration-700 ease-out -rotate-6 hover:rotate-0"
                  style={{ filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.5))" }}
                />

                {/* Floating Price Tag */}
                <div className="absolute top-45 right-5 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 animate-bounce delay-700 hidden sm:block z-20">
                  <p className="text-xs text-gray-500 line-through font-bold">
                    $350
                  </p>
                  <p className="text-2xl font-extrabold text-gray-900">$245</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 5. Features (Compact & Sleek) */}
      <section className="py-12 bg-white border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Truck size={24} />,
                title: "Superfast Delivery",
                desc: "Within 24 hours.",
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                icon: <ShieldCheck size={24} />,
                title: "Official Warranty",
                desc: "100% Authentic.",
                color: "text-green-600",
                bg: "bg-green-50",
              },
              {
                icon: <CreditCard size={24} />,
                title: "Secure Payment",
                desc: "bKash / Cards.",
                color: "text-purple-600",
                bg: "bg-purple-50",
              },
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 bg-white group cursor-default hover:-translate-y-1">
                  {/* Icon Box (Smaller) */}
                  <div
                    className={`w-12 h-12 shrink-0 ${item.bg} ${item.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    {item.icon}
                  </div>

                  {/* Text (Compact) */}
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <TestimonialSlider />

      {/* 7. Newsletter */}
      <section className="py-24 bg-white">
        <FadeIn>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex p-4 bg-blue-50 rounded-full text-blue-600 mb-6">
              <Headphones size={28} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              Subscribe to our newsletter for exclusive deals and updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
              <button
                type="button"
                className="px-8 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-blue-600 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
