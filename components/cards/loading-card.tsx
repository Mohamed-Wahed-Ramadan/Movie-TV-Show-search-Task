"use client"

export function LoadingCard() {
  return (
    <div className="w-full animate-pulse">
      <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 mb-3"></div>
      <div className="h-4 bg-gray-800 rounded mb-2"></div>
      <div className="h-3 bg-gray-800 rounded w-2/3"></div>
    </div>
  )
}
