import ProductSkeleton from "@/components/ProductSkeleton";

export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-10 animate-pulse">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-gray-200 rounded"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
          <div className="h-12 w-full md:w-96 bg-gray-200 rounded-xl"></div>
        </div>

        {/* Categories Skeleton */}
        <div className="flex gap-3 mb-10 overflow-hidden animate-pulse">
           {[...Array(6)].map((_, i) => (
             <div key={i} className="h-10 w-24 bg-gray-200 rounded-full"></div>
           ))}
        </div>

        {/* Grid Skeleton (8 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>

      </div>
    </div>
  );
}