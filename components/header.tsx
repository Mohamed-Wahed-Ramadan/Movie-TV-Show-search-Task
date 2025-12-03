"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useFavorites } from "@/hooks/use-favorites"

export function Header() {
  const pathname = usePathname()
  const { favorites } = useFavorites()
  const active = pathname === "/favorites"

  return (
    <header className="w-full bg-black/70 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-white hover:text-[#c69d6f] transition-colors">
          <span className="text-2xl">📺</span>
          <span>MovieFlix</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/favorites"
            className="text-sm inline-flex items-center gap-2"
            aria-current={active ? "page" : undefined}
            style={{ color: active ? "#c69d6f" : undefined }}
          >
            <span className="text-sm">Favorites</span>
            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${active ? "bg-[#c69d6f]/20 text-[#c69d6f]" : "bg-white/5 text-gray-200"}`}>
              {favorites.length}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
