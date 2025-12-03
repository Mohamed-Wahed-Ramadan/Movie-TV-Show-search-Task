"use client"

import React from "react"
import type { Movie } from "@/types/movie"
import { useFavorites } from "@/hooks/use-favorites"

interface Props {
  movie: Movie
  className?: string
}

export function FavoriteToggle({ movie, className }: Props) {
  const { isFavorite, toggle } = useFavorites()
  const fav = isFavorite(movie.imdbId)

  return (
    <button
      aria-pressed={fav}
      onClick={(e) => {
        e.stopPropagation()
        toggle(movie)
      }}
      className={`inline-flex items-center justify-center rounded-full p-1 transition-colors ${className || ""}`}
      title={fav ? "Remove from favorites" : "Add to favorites"}
      style={{ color: fav ? "var(--color-destructive)" : "#ffffff" }}
    >
      {fav ? (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path d="M12.1 8.64l-.1.1-.11-.11C10.14 6.7 7.6 6.7 6.13 8.17 4.66 9.64 4.66 12.17 6.13 13.64L12 19.5l5.87-5.86c1.47-1.47 1.47-4 0-5.47-1.47-1.47-3.99-1.47-5.77.47z" />
        </svg>
      )}
    </button>
  )
}
