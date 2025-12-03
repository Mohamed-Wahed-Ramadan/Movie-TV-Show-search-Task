"use client"

import { useState, useEffect } from "react"
import { getMovieDetails } from "@/lib/omdb-api"
import type { MovieDetails } from "@/types/movie"

interface MovieDetailsViewProps {
  imdbId: string
}

export function MovieDetailsView({ imdbId }: MovieDetailsViewProps) {
  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true)
        const data = await getMovieDetails(imdbId)
        if (data && data.Response === "True") {
          setMovie(data)
        } else {
          setError("Could not load movie details")
        }
      } catch (err) {
        setError("Failed to fetch movie details")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDetails()
  }, [imdbId])

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-96 bg-[color:var(--color-card)] rounded-lg mb-8"></div>
          <div className="h-8 bg-[color:var(--color-card)] rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-[color:var(--color-card)] rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[color:var(--color-destructive)]/10 border border-[color:var(--color-destructive)] rounded-lg p-6">
          <p className="text-[color:var(--color-destructive)]">{error || "Movie not found"}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-slide-up">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Poster */}
        <div className="md:col-span-1">
          <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-[color:var(--color-card)] border border-[color:var(--color-border)]">
            {movie.Poster && movie.Poster !== "N/A" ? (
              <img src={movie.Poster || "/placeholder.svg"} alt={movie.Title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[color:var(--color-muted-foreground)]">No Image</div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold text-[color:var(--color-foreground)] mb-2">{movie.Title}</h1>
          <p className="text-[color:var(--color-primary)] text-lg mb-6">
            {movie.Year} • {movie.Type} • {movie.Runtime}
          </p>

          <div className="space-y-4 mb-8">
            <div>
              <h3 className="text-[color:var(--color-primary)] font-semibold mb-2">Genre</h3>
              <p className="text-[color:var(--color-muted-foreground)]">{movie.Genre}</p>
            </div>

            <div>
              <h3 className="text-[color:var(--color-primary)] font-semibold mb-2">Director</h3>
              <p className="text-[color:var(--color-muted-foreground)]">{movie.Director}</p>
            </div>

            <div>
              <h3 className="text-[color:var(--color-primary)] font-semibold mb-2">Plot</h3>
              <p className="text-[color:var(--color-muted-foreground)] leading-relaxed">{movie.Plot}</p>
            </div>

            {movie.Actors && movie.Actors !== "N/A" && (
              <div>
                <h3 className="text-[color:var(--color-primary)] font-semibold mb-2">Cast</h3>
                <p className="text-[color:var(--color-muted-foreground)]">{movie.Actors}</p>
              </div>
            )}

            {movie.Ratings && movie.Ratings.length > 0 && (
              <div>
                <h3 className="text-[color:var(--color-primary)] font-semibold mb-2">Ratings</h3>
                <div className="space-y-2">
                  {movie.Ratings.map((rating) => (
                    <div key={rating.Source} className="flex justify-between items-center">
                      <span className="text-[color:var(--color-muted-foreground)]">{rating.Source}</span>
                      <span className="text-[color:var(--color-primary)] font-semibold">{rating.Value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
