import { SearchInputClient } from "@/components/ui/search-input-client"

interface SearchHeaderProps {
  onSearch: (query: string) => void
  isLoading: boolean
}

export function SearchHeader({ onSearch, isLoading }: SearchHeaderProps) {
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
              <SearchInputClient onSearch={onSearch} isLoading={isLoading} />
            </div>
            <div className="ml-4">
              <a
                href="/favorites"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[color:var(--color-primary)] text-[color:var(--color-primary-foreground)] font-semibold hover:opacity-90 transition-colors"
              >
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
