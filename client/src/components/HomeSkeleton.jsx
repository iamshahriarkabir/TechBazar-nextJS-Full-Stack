import ProductSkeleton from "./ProductSkeleton";

export default function HomeSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* 1. Hero Section Skeleton */}
      <div className="w-full h-[500px] or h-[80vh] bg-gray-200 relative mb-12">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Text */}
            <div className="space-y-4">
              <div className="h-8 w-32 bg-gray-300 rounded-full"></div>
              <div className="h-16 w-3/4 bg-gray-300 rounded-xl"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
              <div className="flex gap-4 pt-4">
                <div className="h-12 w-32 bg-gray-300 rounded-full"></div>
                <div className="h-12 w-32 bg-gray-300 rounded-full"></div>
              </div>
            </div>
            {/* Right Image */}
            <div className="hidden lg:block h-64 w-64 bg-gray-300 rounded-3xl mx-auto"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. Categories Skeleton */}
        <div className="flex justify-center gap-4 mb-20 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-10 w-28 bg-gray-200 rounded-full shrink-0"
            ></div>
          ))}
        </div>

        {/* 3. Trending Section Header Skeleton */}
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-10 w-48 bg-gray-200 rounded"></div>
          </div>
          <div className="h-6 w-32 bg-gray-200 rounded"></div>
        </div>

        {/* 4. Product Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[...Array(4)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>

        {/* 5. Banner Skeleton */}
        <div className="h-80 w-full bg-gray-200 rounded-3xl mb-20"></div>
      </div>
    </div>
  );
}
