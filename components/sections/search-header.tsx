"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { SearchInput } from "@/components/ui/search-input"

interface SearchHeaderProps {
  onSearch: (query: string) => void
  isLoading: boolean
}

export function SearchHeader({ onSearch, isLoading }: SearchHeaderProps) {
  const [query, setQuery] = useState("")
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Debounce logic with useEffect
  useEffect(() => {
    // Clear previous timer
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    // If query is empty, don't search
    if (!query.trim()) {
      return
    }

    // Debounce for 800ms - only search after user stops typing
    timerRef.current = setTimeout(() => {
      onSearch(query)
    }, 800)

    // Cleanup on unmount or when query changes
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [query, onSearch])

  const handleSearch = useCallback((value: string) => {
    setQuery(value)
  }, [])

  return (
    <>
      <div
        className="border-b border-[color:var(--color-border)] fixed top-0 left-0 right-0 z-40 transition-colors duration-300"
        style={{
          background: 'linear-gradient(to bottom, var(--color-background) 0%, var(--color-background) 50%, var(--color-primary) 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-[color:var(--color-primary)] mb-2">MovieFlix</h1>
            <p className="text-[color:var(--color-muted-foreground)]">Search movies and TV shows</p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <SearchInput
                value={query}
                onChange={handleSearch}
                placeholder="Search for a movie or TV show..."
                disabled={isLoading}
              />
            </div>
            <div className="ml-4">
              <a href="/favorites" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[color:var(--color-primary)] text-[color:var(--color-primary-foreground)] font-semibold hover:opacity-90 transition-colors">
                ❤️ Favorites
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Spacer to prevent content overlap with fixed header */}
      <div className="h-64 md:h-56" />
    </>
  )
}
