"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useFavorites } from "@/hooks/use-favorites"
import { MovieCard } from "@/components/cards/movie-card"
import type { Metadata } from "next"

// Note: Metadata export is not used with "use client", but we document SEO intent
// The root layout metadata applies to this page as well
export default function FavoritesPage() {
  const { favorites, clear } = useFavorites()
  const router = useRouter()

  return (
    <div className="px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-white">Favorites</h1>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-gray-300 hover:underline">
              ← Back
            </Link>
            {favorites.length > 0 && (
              <button
                onClick={() => clear()}
                className="text-sm bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-500"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="text-gray-400">You have no favorites yet.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {favorites.map((m) => (
              <div key={m.imdbId} className="relative">
                <MovieCard
                  movie={m}
                  onClick={() => router.push(`/movie/${encodeURIComponent(m.imdbId)}`)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
