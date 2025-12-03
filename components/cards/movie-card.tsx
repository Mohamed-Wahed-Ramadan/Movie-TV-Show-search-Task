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
        <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 border border-gray-700 transition-all duration-300">
          {movie.poster && movie.poster !== "N/A" ? (
            <img
              src={movie.poster || "/placeholder.svg"}
              alt={movie.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <span className="text-center px-4">No Image</span>
            </div>
          )}

          {/* Favorite toggle top-right */}
          <div className="absolute top-2 right-2 z-10">
            <FavoriteToggle movie={movie} />
          </div>

          {/* Overlay on Hover */}
          <div
            className={`absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center p-4 transition-opacity duration-200 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-white font-semibold text-sm line-clamp-2 mb-3 text-center">{movie.title}</p>
            <p className="text-primary text-xs mb-4">{movie.year}</p>
            <button
              className="px-4 py-2 bg-primary text-black font-semibold rounded-lg hover:bg-primary/80 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                handleClick()
              }}
            >
              View Details
            </button>
          </div>
        </div>

        {/* Card Info Below */}
        <div className="mt-3">
          <h3 className="text-white font-semibold line-clamp-2 text-sm group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          <p className="text-gray-400 text-xs mt-1">
            {movie.year} • {movie.type === "movie" ? "Movie" : "Series"}
          </p>
        </div>
      </div>
    </div>
  )
}
