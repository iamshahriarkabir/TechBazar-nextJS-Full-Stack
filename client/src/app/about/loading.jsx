export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6 animate-pulse">
      {/* 1. Hero Text Skeleton */}
      <div className="max-w-4xl mx-auto text-center space-y-6 mb-24">
        <div className="h-6 w-24 bg-gray-200 rounded-full mx-auto"></div>
        <div className="h-16 w-3/4 bg-gray-200 rounded-xl mx-auto"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded mx-auto"></div>
      </div>

      {/* 2. Mission Section  */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        {/* Left Image Placeholder */}
        <div className="h-[400px] w-full bg-gray-200 rounded-3xl"></div>
        {/* Right Text Placeholder */}
        <div className="space-y-6">
          <div className="h-12 w-12 bg-gray-200 rounded-xl"></div>
          <div className="h-10 w-64 bg-gray-200 rounded"></div>
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
          </div>
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="h-20 w-full bg-gray-100 rounded-xl"></div>
            <div className="h-20 w-full bg-gray-100 rounded-xl"></div>
          </div>
        </div>
      </div>

      {/* 3. Stats Section Skeleton */}
      <div className="max-w-7xl mx-auto mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-2xl"></div>
          ))}
        </div>
      </div>

      {/* 4. Features Grid Skeleton */}
      <div className="max-w-7xl mx-auto">
        <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-100 rounded-2xl"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
