"use client"

import { useState, useCallback } from "react"
import { SearchInput } from "@/components/ui/search-input"

interface SearchHeaderProps {
  onSearch: (query: string) => void
  isLoading: boolean
}

export function SearchHeader({ onSearch, isLoading }: SearchHeaderProps) {
  const [query, setQuery] = useState("")

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value)
      // Debounce search
      const timer = setTimeout(() => {
        onSearch(value)
      }, 300)
      return () => clearTimeout(timer)
    },
    [onSearch],
  )

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 border-b border-gray-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">MovieFlix</h1>
          <p className="text-gray-400">Search movies and TV shows</p>
        </div>
        <SearchInput
          value={query}
          onChange={handleSearch}
          placeholder="Search for a movie or TV show..."
          disabled={isLoading}
        />
      </div>
    </div>
  )
}
