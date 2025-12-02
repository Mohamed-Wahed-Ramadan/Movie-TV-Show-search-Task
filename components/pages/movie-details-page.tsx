"use client"

import { use } from "react"
import Link from "next/link"
import { MovieDetailsView } from "@/components/sections/movie-details-view"

export function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const decodedId = decodeURIComponent(id)

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors mb-8"
        >
          <span>←</span>
          <span>Back to Search</span>
        </Link>
      </div>
      <MovieDetailsView imdbId={decodedId} />
    </div>
  )
}
