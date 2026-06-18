export function ProductCardSkeleton() {
  return (
    <div className="flex-shrink-0 w-72 bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
      <div className="bg-gray-200 h-56" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="flex items-center justify-between gap-2">
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
          <div className="flex-1 h-10 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
          <div className="bg-gray-200 h-56" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="flex items-center justify-between gap-2">
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
              <div className="flex-1 h-10 bg-gray-200 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function FeaturedProductsSkeleton() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div className="flex-shrink-0 w-36 animate-pulse">
      <div className="bg-gray-200 rounded-full w-28 h-28 mx-auto mb-3" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
    </div>
  );
}

export function CategoriesSkeleton() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <CategorySkeleton key={i} />
      ))}
    </div>
  );
}
