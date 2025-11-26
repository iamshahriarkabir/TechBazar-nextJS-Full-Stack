export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm animate-pulse">
      {/* Image Skeleton */}
      <div className="h-56 bg-gray-200 rounded-xl mb-4"></div>
      
      {/* Text Skeleton */}
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-full mb-4"></div>
      
      {/* Price & Button Skeleton */}
      <div className="flex justify-between items-center pt-2">
        <div className="h-6 bg-gray-200 rounded w-20"></div>
        <div className="h-8 bg-gray-200 rounded w-8"></div>
      </div>
    </div>
  );
}