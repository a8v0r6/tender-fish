export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-outline-variant/20 p-6 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-3 flex-1">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-6 w-3/4 bg-gray-200 rounded" />
          <div className="h-3 w-1/3 bg-gray-200 rounded" />
        </div>
        <div className="h-16 w-16 bg-gray-200 rounded-xl" />
      </div>
      <div className="grid grid-cols-3 gap-6 py-4 border-y border-outline-variant/10 mb-6">
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
      </div>
      <div className="flex justify-end gap-4">
        <div className="h-10 w-24 bg-gray-200 rounded-lg" />
        <div className="h-10 w-32 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
}

export function SkeletonSupplierCard() {
  return (
    <div className="bg-white rounded-3xl border border-primary/5 shadow-xl p-8 animate-pulse">
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-3">
          <div className="h-6 w-48 bg-gray-200 rounded" />
          <div className="h-4 w-32 bg-gray-200 rounded" />
        </div>
        <div className="space-y-2 text-right">
          <div className="h-3 w-16 bg-gray-200 rounded ml-auto" />
          <div className="h-8 w-32 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="flex gap-4 mb-8">
        <div className="h-6 w-24 bg-gray-200 rounded-full" />
        <div className="h-6 w-24 bg-gray-200 rounded-full" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-12 bg-gray-200 rounded-xl" />
        <div className="h-12 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }) {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`h-4 bg-gray-200 rounded ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} />
      ))}
    </div>
  );
}

export function SkeletonResultCard() {
  return (
    <div className="bg-white rounded-3xl border border-primary/5 shadow-2xl p-10 animate-pulse">
      <div className="h-8 w-64 bg-gray-200 rounded mb-6" />
      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-6 rounded-2xl bg-gray-100">
            <div className="h-3 w-20 bg-gray-200 rounded mb-2" />
            <div className="h-8 w-32 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
      <div className="h-4 w-full bg-gray-200 rounded mb-2" />
      <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-1/2 bg-gray-200 rounded" />
    </div>
  );
}
