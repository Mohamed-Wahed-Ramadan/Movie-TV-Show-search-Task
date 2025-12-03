"use client"

import { useState } from "react"
import type { Movie } from "@/types/movie"
import { FavoriteToggle } from "@/components/favorite-toggle"

interface MovieCardProps {
  movie: Movie
  onClick?: () => void
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    onClick?.()
  }

  return (
    <div className="group relative animate-fade-in-scale">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        className="relative w-full h-full cursor-pointer"
      >
        {/* Poster Image */}
        <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-[color:var(--color-card)] border border-[color:var(--color-border)] transition-all duration-300">
          {movie.poster && movie.poster !== "N/A" ? (
            <img
              src={movie.poster || "/placeholder.svg"}
              alt={movie.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[color:var(--color-muted-foreground)]">
              <span className="text-center px-4">No Image</span>
            </div>
          )}

          {/* Favorite toggle top-right */}
          <div className="absolute top-2 right-2 z-10">
            <FavoriteToggle movie={movie} />
          </div>

          {/* Overlay on Hover: vertical gradient — dark at bottom, transparent at top */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-200 pointer-events-none ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background: 'linear-gradient(to top, rgba(var(--primary-rgb), 0.95) 0%, rgba(var(--primary-rgb), 0.6) 40%, rgba(var(--primary-rgb), 0.25) 60%, rgba(var(--primary-rgb), 0) 100%)',
            }}
          >
            <div className="pointer-events-auto w-full flex flex-col items-center">
              <p className="text-[color:var(--color-primary-foreground)] font-semibold text-sm line-clamp-2 mb-3 text-center">{movie.title}</p>
              <p className="text-[color:var(--color-primary-foreground)] text-xs mb-4">{movie.year}</p>
              <button
                className="px-4 py-2 bg-[color:var(--color-primary-foreground)] text-[color:var(--color-primary)] font-semibold rounded-lg hover:opacity-90 transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  handleClick()
                }}
              >
                View Details
              </button>
            </div>
          </div>
        </div>

        {/* Card Info Below */}
        <div className="mt-3">
          <h3 className="text-[color:var(--color-foreground)] font-semibold line-clamp-2 text-sm group-hover:text-[color:var(--color-primary)] transition-colors">
            {movie.title}
          </h3>
          <p className="text-[color:var(--color-muted-foreground)] text-xs mt-1">
            {movie.year} • {movie.type === "movie" ? "Movie" : "Series"}
          </p>
        </div>
      </div>
    </div>
  )
}
