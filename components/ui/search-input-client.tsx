"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { SearchInput } from "@/components/ui/search-input"

interface SearchInputClientProps {
  onSearch: (query: string) => void
  isLoading: boolean
}

export function SearchInputClient({ onSearch, isLoading }: SearchInputClientProps) {
  const [query, setQuery] = useState("")
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    if (!query.trim()) {
      return
    }

    timerRef.current = setTimeout(() => {
      onSearch(query)
    }, 800)

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
    <SearchInput
      value={query}
      onChange={handleSearch}
      placeholder="Search for a movie or TV show..."
      disabled={isLoading}
    />
  )
}
