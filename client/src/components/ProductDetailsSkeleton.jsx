import ProductSkeleton from "./ProductSkeleton";

export default function ProductDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-8">
          <div className="h-4 w-12 bg-gray-200 rounded"></div>
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>

        {/* 2. Main Layout (Split Grid) */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          
          {/* Left: Large Image Skeleton */}
          <div className="aspect-square bg-gray-200 rounded-2xl w-full"></div>

          {/* Right: Details Skeleton */}
          <div className="space-y-6">
            {/* Title */}
            <div className="h-10 w-3/4 bg-gray-200 rounded-lg"></div>
            
            {/* Price & Stock */}
            <div className="flex gap-4">
              <div className="h-8 w-24 bg-gray-200 rounded"></div>
              <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
            </div>

            {/* Description lines */}
            <div className="space-y-3 pt-4 border-b border-gray-100 pb-8">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
              <div className="h-4 w-4/5 bg-gray-200 rounded"></div>
            </div>

            {/* Trust Badges Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
              <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
              <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
            </div>

            {/* Actions (Color & Cart) */}
            <div className="pt-6 space-y-4">
               {/* Colors */}
               <div className="flex gap-3">
                 <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                 <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                 <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
               </div>
               
               {/* Buttons */}
               <div className="flex gap-4 h-12">
                 <div className="w-1/3 bg-gray-200 rounded-xl"></div>
                 <div className="w-2/3 bg-gray-200 rounded-xl"></div>
               </div>
            </div>
          </div>
        </div>

        {/* 3. Related Products Skeleton */}
        <div>
           <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {[...Array(4)].map((_, i) => (
               <ProductSkeleton key={i} />
             ))}
           </div>
        </div>

      </div>
    </div>
  );
}