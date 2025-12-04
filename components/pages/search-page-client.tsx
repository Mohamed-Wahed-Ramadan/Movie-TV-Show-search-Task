"use client"

import { useState, useCallback } from "react"
import type { Movie } from "@/types/movie"
import { SearchHeader } from "@/components/sections/search-header"
import { SearchFilters } from "@/components/sections/search-filters"
import { ResultsList } from "@/components/sections/results-list"
import { MovieDetailsModal } from "@/components/modals/movie-details-modal"
import { useMovieSearch } from "@/hooks/use-movie-search"
import { SearchPageContent } from "./search-page-content"

export function SearchPageClient() {
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

  return (
    <SearchPageContent
      query={query}
      results={results}
      isLoading={isLoading}
      error={error}
      mediaType={mediaType}
      sortBy={sortBy}
      selectedMovie={selectedMovie}
      onSearch={handleSearch}
      onMediaTypeChange={setMediaType}
      onSortChange={setSortBy}
      onMovieSelect={setSelectedMovie}
      onCloseModal={() => setSelectedMovie(null)}
    />
  )
}
