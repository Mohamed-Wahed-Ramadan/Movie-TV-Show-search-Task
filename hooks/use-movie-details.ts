"use client"

import { useEffect, useState } from "react"
import type { MovieDetails } from "@/types/movie"
import { getMovieDetails } from "@/lib/movie-api"

export function useMovieDetails(imdbId: string | null, shouldFetch: boolean) {
  const [details, setDetails] = useState<MovieDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!shouldFetch || !imdbId) {
      setDetails(null)
      setError(null)
      return
    }

    const fetchDetails = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getMovieDetails(imdbId)
        if (data && data.Response === "True") {
          setDetails(data)
        } else {
          setError("Failed to load details")
        }
      } catch (err) {
        console.error("Failed to fetch details:", err)
        setError("Error fetching movie details")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDetails()
  }, [shouldFetch, imdbId])

  return { details, isLoading, error }
}
