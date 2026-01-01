export default function ImageCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-xl shadow-md bg-gray-800/20">
      {/* Efecto de shimmer */}
      <div className="absolute inset-0 bg-linear-to-r from-gray-800/20 via-gray-700/30 to-gray-800/20 animate-shimmer"></div>

      {/* Imagen simulada */}
      <div className="relative h-40 w-full bg-gray-700/20"></div>

      {/* Info simulada */}
      <div className="relative p-4 space-y-2">
        <div className="h-4 bg-gray-700/20 rounded w-3/4"></div>
        <div className="h-3 bg-gray-700/20 rounded w-1/2"></div>
        <div className="h-3 bg-gray-700/20 rounded w-1/4"></div>
      </div>
    </div>
  );
}
