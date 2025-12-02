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
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-75 z-40 animate-fade-in" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-0 animate-slide-up">
        <div className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-800 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <span className="text-white text-xl">×</span>
          </button>

          {isLoading ? (
            <div className="p-8 text-center text-gray-400">Loading...</div>
          ) : details ? (
            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Poster */}
                <div className="flex justify-center">
                  <div className="relative w-40 h-60 rounded-lg overflow-hidden bg-gray-800 border border-gray-700">
                    {details.Poster && details.Poster !== "N/A" ? (
                      <img
                        src={details.Poster || "/placeholder.svg"}
                        alt={details.Title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">No Image</div>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{details.Title}</h2>
                  <p className="text-primary text-sm mb-4">
                    {details.Year} • {details.Type} • {details.Runtime}
                  </p>

                  <div className="space-y-3">
                    <div>
                      <p className="text-primary text-xs font-semibold mb-1">GENRE</p>
                      <p className="text-gray-300 text-sm">{details.Genre}</p>
                    </div>

                    <div>
                      <p className="text-primary text-xs font-semibold mb-1">DIRECTOR</p>
                      <p className="text-gray-300 text-sm">{details.Director}</p>
                    </div>

                    {details.Ratings && details.Ratings.length > 0 && (
                      <div>
                        <p className="text-primary text-xs font-semibold mb-1">RATINGS</p>
                        <div className="space-y-1">
                          {details.Ratings.slice(0, 2).map((rating) => (
                            <p key={rating.Source} className="text-gray-300 text-sm">
                              <span className="text-gray-400">{rating.Source}:</span>{" "}
                              <span className="text-primary font-semibold">{rating.Value}</span>
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
                      className="flex-1 px-4 py-2 bg-primary text-black font-semibold rounded-lg hover:bg-primary/80 transition-colors text-center"
                    >
                      Full Details
                    </Link>
                    <button
                      onClick={onClose}
                      className="flex-1 px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>

              {/* Plot */}
              <div>
                <p className="text-primary text-xs font-semibold mb-2">PLOT</p>
                <p className="text-gray-300 text-sm leading-relaxed">{details.Plot}</p>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-red-400">Failed to load details</div>
          )}
        </div>
      </div>
    </>
  )
}
