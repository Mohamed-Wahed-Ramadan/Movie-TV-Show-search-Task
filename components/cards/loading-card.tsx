"use client"

export function LoadingCard() {
  return (
    <div className="w-full animate-pulse">
      <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-[color:var(--color-card)] mb-3"></div>
      <div className="h-4 bg-[color:var(--color-card)] rounded mb-2"></div>
      <div className="h-3 bg-[color:var(--color-card)] rounded w-2/3"></div>
    </div>
  )
}
