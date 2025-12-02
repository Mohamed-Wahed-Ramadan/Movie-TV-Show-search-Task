"use client"

import { MovieCard } from "@/components/cards/movie-card"
import { LoadingCard } from "@/components/cards/loading-card"
import type { Movie } from "@/types/movie"

interface ResultsListProps {
  results: Movie[]
  isLoading: boolean
  error: string | null
  onMovieSelect: (movie: Movie) => void
}

export function ResultsList({ results, isLoading, error, onMovieSelect }: ResultsListProps) {
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-900 bg-opacity-20 border border-red-800 rounded-lg p-6">
          <p className="text-red-400 font-semibold">{error}</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-gray-400 text-lg">No results found. Try a different search.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {results.map((movie, index) => (
          <MovieCard key={`${movie.imdbId}-${index}`} movie={movie} onClick={() => onMovieSelect(movie)} />
        ))}
      </div>
    </div>
  )
}
