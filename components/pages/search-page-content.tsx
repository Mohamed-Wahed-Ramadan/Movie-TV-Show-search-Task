import { SearchHeader } from "@/components/sections/search-header"
import { SearchFilters } from "@/components/sections/search-filters"
import { ResultsList } from "@/components/sections/results-list"
import { MovieDetailsModal } from "@/components/modals/movie-details-modal"
import type { Movie } from "@/types/movie"

interface SearchPageContentProps {
  query: string
  results: Movie[]
  isLoading: boolean
  error: string | null
  mediaType: "all" | "movie" | "series"
  sortBy: "year-desc" | "year-asc" | "title-asc"
  selectedMovie: Movie | null
  onSearch: (query: string) => void
  onMediaTypeChange: (type: "all" | "movie" | "series") => void
  onSortChange: (sort: "year-desc" | "year-asc" | "title-asc") => void
  onMovieSelect: (movie: Movie) => void
  onCloseModal: () => void
}

export function SearchPageContent({
  query,
  results,
  isLoading,
  error,
  mediaType,
  sortBy,
  selectedMovie,
  onSearch,
  onMediaTypeChange,
  onSortChange,
  onMovieSelect,
  onCloseModal,
}: SearchPageContentProps) {
  // Filter results (this is pure logic, could be memoized)
  const filteredResults = results.filter((movie) => {
    if (mediaType === "all") return true
    if (mediaType === "movie") return movie.type === "movie"
    if (mediaType === "series") return movie.type === "series"
    return true
  })

  // Sort results (pure logic)
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
      <SearchHeader onSearch={onSearch} isLoading={isLoading} />

      {query && (
        <>
          <SearchFilters
            mediaType={mediaType}
            onMediaTypeChange={onMediaTypeChange}
            sortBy={sortBy}
            onSortChange={onSortChange}
            resultCount={sortedResults.length}
          />

          <ResultsList results={sortedResults} isLoading={isLoading} error={error} onMovieSelect={onMovieSelect} />
        </>
      )}

      {!query && (
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-[color:var(--color-foreground)] mb-4">
              Discover Movies & TV Shows
            </h2>
            <p className="text-lg text-[color:var(--color-muted-foreground)] mb-8">
              Search for your favorite movies and TV shows to get started
            </p>
          </div>
        </div>
      )}

      {selectedMovie && (
        <MovieDetailsModal movie={selectedMovie} isOpen={!!selectedMovie} onClose={onCloseModal} />
      )}
    </div>
  )
}
