"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useFavorites } from "@/hooks/use-favorites"

export function Header() {
  const pathname = usePathname()
  const { favorites } = useFavorites()
  const active = pathname === "/favorites"

  return (
    <header className="w-full bg-[color:var(--color-sidebar)] border-b border-[color:var(--color-sidebar-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-[color:var(--color-primary)] hover:opacity-90 transition-colors"
        >
          <span className="text-2xl">📺</span>
          <span>MovieFlix</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/favorites"
            className="text-sm inline-flex items-center gap-2"
            aria-current={active ? "page" : undefined}
          >
            <span className="text-sm text-[color:var(--color-sidebar-foreground)]">Favorites</span>
            <span
              className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                active
                  ? "bg-[color:var(--color-primary)]/20 text-[color:var(--color-primary)]"
                  : "bg-[color:var(--color-sidebar-border)] text-[color:var(--color-sidebar-foreground)]"
              }`}
            >
              {favorites.length}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
