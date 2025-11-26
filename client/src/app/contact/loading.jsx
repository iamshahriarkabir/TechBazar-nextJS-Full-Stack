export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8 animate-pulse">
      {/* 1. Header Skeleton */}
      <div className="max-w-7xl mx-auto text-center mb-16 space-y-4">
        <div className="h-12 w-64 bg-gray-200 rounded-xl mx-auto"></div>
        <div className="h-4 w-96 bg-gray-200 rounded mx-auto"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* --- LEFT SIDE: Info Cards Skeleton --- */}
        <div className="space-y-8 lg:col-span-1">
          {/* Info Box */}
          <div className="bg-white rounded-2xl p-8 h-80 border border-gray-100">
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="h-3 w-32 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Chat Box */}
          <div className="h-48 bg-blue-100/50 rounded-2xl"></div>
        </div>

        {/* --- RIGHT SIDE: Form Skeleton --- */}
        <div className="lg:col-span-2 space-y-10">
          {/* Form Box */}
          <div className="bg-white rounded-2xl p-10 h-[500px] border border-gray-100 space-y-6">
            <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-2 gap-6">
              <div className="h-12 bg-gray-200 rounded-xl"></div>
              <div className="h-12 bg-gray-200 rounded-xl"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded-xl"></div>
            <div className="h-32 bg-gray-200 rounded-xl"></div>
            <div className="h-14 bg-gray-200 rounded-xl"></div>
          </div>

          {/* Map Skeleton */}
          <div className="h-64 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
}
