"use client"

import { useState, useCallback } from "react"
import { SearchHeader } from "@/components/sections/search-header"
import { SearchFilters } from "@/components/sections/search-filters"
import { ResultsList } from "@/components/sections/results-list"
import { MovieDetailsModal } from "@/components/modals/movie-details-modal"
import { useMovieSearch } from "@/hooks/use-movie-search"
import type { Movie } from "@/types/movie"

export function SearchPage() {
  const [query, setQuery] = useState("")
  const [mediaType, setMediaType] = useState<"all" | "movie" | "series">("all")
  const [sortBy, setSortBy] = useState<"year-desc" | "year-asc" | "title-asc">("year-desc")
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const { results, isLoading, error, search } = useMovieSearch()

  const handleSearch = useCallback(
    (searchQuery: string) => {
      setQuery(searchQuery)
      if (searchQuery.trim()) {
        search(searchQuery)
      }
    },
    [search],
  )

  // Filter results
  const filteredResults = results.filter((movie) => {
    if (mediaType === "all") return true
    if (mediaType === "movie") return movie.type === "movie"
    if (mediaType === "series") return movie.type === "series"
    return true
  })

  // Sort results
  const sortedResults = [...filteredResults].sort((a, b) => {
    if (sortBy === "year-desc") {
      return (Number.parseInt(b.year) || 0) - (Number.parseInt(a.year) || 0)
    }
    if (sortBy === "year-asc") {
      return (Number.parseInt(a.year) || 0) - (Number.parseInt(b.year) || 0)
    }
    if (sortBy === "title-asc") {
      return a.title.localeCompare(b.title)
    }
    return 0
  })

  return (
    <div className="min-h-screen bg-[color:var(--color-background)] text-[color:var(--color-foreground)]">
      <SearchHeader onSearch={handleSearch} isLoading={isLoading} />

      {query && (
        <>
          <SearchFilters
            mediaType={mediaType}
            onMediaTypeChange={setMediaType}
            sortBy={sortBy}
            onSortChange={setSortBy}
            resultCount={sortedResults.length}
          />

          <ResultsList results={sortedResults} isLoading={isLoading} error={error} onMovieSelect={setSelectedMovie} />
        </>
      )}

      {!query && (
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-[color:var(--color-foreground)] mb-4">Discover Movies & TV Shows</h2>
            <p className="text-lg text-[color:var(--color-muted-foreground)] mb-8">Search for your favorite movies and TV shows to get started</p>
          </div>
        </div>
      )}

      {selectedMovie && (
        <MovieDetailsModal movie={selectedMovie} isOpen={!!selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  )
}
