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
      const res = await searchAll(query)
      // searchAll returns { items, totalPages, totalResults, currentPage }
      setResults(res.items || [])

      if ((res.items || []).length === 0) {
        setError("No results found. Try another search.")
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error("Search hook error:", msg)
      setError(`Search failed: ${msg}`)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { results, isLoading, error, search }
}
