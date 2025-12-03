"use client"

interface SearchFiltersProps {
  mediaType: "all" | "movie" | "series"
  onMediaTypeChange: (type: "all" | "movie" | "series") => void
  sortBy: "year-desc" | "year-asc" | "title-asc"
  onSortChange: (sort: "year-desc" | "year-asc" | "title-asc") => void
  resultCount: number
}

export function SearchFilters({ mediaType, onMediaTypeChange, sortBy, onSortChange, resultCount }: SearchFiltersProps) {
  return (
    <div className="bg-gray-950 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-sm text-gray-400">
            Found <span className="text-gold font-semibold">{resultCount}</span> results
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Media Type Filter */}
            <div className="flex gap-2">
              {(["all", "movie", "series"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => onMediaTypeChange(type)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    mediaType === type ? "bg-[#c69d6f] text-black font-semibold" : "bg-gray-800 text-white hover:bg-gray-700"
                  }`}
                >
                  {type === "all" ? "All" : type === "movie" ? "Movies" : "TV Series"}
                </button>
              ))}
            </div>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className={`px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 transition-colors cursor-pointer ${sortBy === 'year-desc' ? 'border-[#c69d6f] text-[#c69d6f]' : 'hover:border-gold'}` }
            >
              <option value="year-desc">Newest First</option>
              <option value="year-asc">Oldest First</option>
              <option value="title-asc">A - Z</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
