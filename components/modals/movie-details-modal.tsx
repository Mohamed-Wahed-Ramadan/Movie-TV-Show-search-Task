"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import type { Movie, MovieDetails } from "@/types/movie"
import { getMovieDetails } from "@/lib/movie-api"

interface MovieDetailsModalProps {
  movie: Movie
  isOpen: boolean
  onClose: () => void
}

export function MovieDetailsModal({ movie, isOpen, onClose }: MovieDetailsModalProps) {
  const [details, setDetails] = useState<MovieDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen && movie.imdbId) {
      const fetchDetails = async () => {
        try {
          setIsLoading(true)
          const data = await getMovieDetails(movie.imdbId)
          if (data && data.Response === "True") {
            setDetails(data)
          }
        } catch (err) {
          console.error("Failed to fetch details:", err)
        } finally {
          setIsLoading(false)
        }
      }

      fetchDetails()
    }
  }, [isOpen, movie.imdbId])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop: when modal open, show primary color background */}
      <div onClick={onClose} className="fixed inset-0 z-40 animate-fade-in" style={{ background: 'var(--color-primary)' }} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-0 animate-slide-up">
        <div className="bg-[color:var(--color-popover)] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[color:var(--color-border)] relative text-[color:var(--color-popover-foreground)]">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[color:var(--color-card)] hover:opacity-90 transition-colors"
          >
            <span className="text-[color:var(--color-card-foreground)] text-xl">×</span>
          </button>

          {isLoading ? (
            <div className="p-8 text-center text-[color:var(--color-muted-foreground)]">Loading...</div>
          ) : details ? (
            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Poster */}
                <div className="flex justify-center">
                  <div className="relative w-40 h-60 rounded-lg overflow-hidden bg-[color:var(--color-card)] border border-[color:var(--color-border)]">
                    {details.Poster && details.Poster !== "N/A" ? (
                      <img
                        src={details.Poster || "/placeholder.svg"}
                        alt={details.Title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[color:var(--color-muted-foreground)]">No Image</div>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <h2 className="text-2xl font-bold text-[color:var(--color-foreground)] mb-2">{details.Title}</h2>
                  <p className="text-[color:var(--color-primary)] text-sm mb-4">
                    {details.Year} • {details.Type} • {details.Runtime}
                  </p>

                  <div className="space-y-3">
                    <div>
                      <p className="text-[color:var(--color-primary)] text-xs font-semibold mb-1">GENRE</p>
                      <p className="text-[color:var(--color-muted-foreground)] text-sm">{details.Genre}</p>
                    </div>

                    <div>
                      <p className="text-[color:var(--color-primary)] text-xs font-semibold mb-1">DIRECTOR</p>
                      <p className="text-[color:var(--color-muted-foreground)] text-sm">{details.Director}</p>
                    </div>

                    {details.Ratings && details.Ratings.length > 0 && (
                      <div>
                        <p className="text-[color:var(--color-primary)] text-xs font-semibold mb-1">RATINGS</p>
                        <div className="space-y-1">
                          {details.Ratings.slice(0, 2).map((rating) => (
                            <p key={rating.Source} className="text-[color:var(--color-muted-foreground)] text-sm">
                              <span className="text-[color:var(--color-muted-foreground)]">{rating.Source}:</span>{" "}
                              <span className="text-[color:var(--color-primary)] font-semibold">{rating.Value}</span>
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6">
                    <Link
                      href={`/movie/${encodeURIComponent(movie.imdbId)}`}
                      onClick={onClose}
                      className="flex-1 px-4 py-2 bg-[color:var(--color-primary)] text-[color:var(--color-primary-foreground)] font-semibold rounded-lg hover:opacity-90 transition-colors text-center"
                    >
                      Full Details
                    </Link>
                    <button
                      onClick={onClose}
                      className="flex-1 px-4 py-2 bg-[color:var(--color-card)] text-[color:var(--color-card-foreground)] font-semibold rounded-lg hover:opacity-90 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>

              {/* Plot */}
              <div>
                <p className="text-[color:var(--color-primary)] text-xs font-semibold mb-2">PLOT</p>
                <p className="text-[color:var(--color-muted-foreground)] text-sm leading-relaxed">{details.Plot}</p>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-[color:var(--color-destructive)]">Failed to load details</div>
          )}
        </div>
      </div>
    </>
  )
}
