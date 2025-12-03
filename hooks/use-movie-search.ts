"use client"

import { useState, useCallback } from "react"
import type { Movie } from "@/types/movie"
import { searchAll } from "@/lib/movie-api"

export function useMovieSearch() {
  const [results, setResults] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([])
      setError(null)
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      const data = await searchAll(query)
      setResults(data)

      if (data.length === 0) {
        setError("No results found. Try another search.")
      }
    } catch (err) {
      setError("Failed to search. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { results, isLoading, error, search }
}
