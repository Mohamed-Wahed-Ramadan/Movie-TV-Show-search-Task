import type { Metadata } from "next"
import { SearchPage } from "@/components/pages/search-page"

export const metadata: Metadata = {
  title: "MovieFlix - Search Movies & TV Shows | Free Movie Database",
  description: "Discover and search thousands of movies and TV shows instantly. Get detailed information, ratings, release dates, and more. Your ultimate movie and TV series search engine.",
  keywords: ["movie search", "TV show search", "film database", "entertainment search", "movie finder", "watch movies", "TV series database"],
  openGraph: {
    title: "MovieFlix - Search Movies & TV Shows",
    description: "Discover thousands of movies and TV shows with detailed information and ratings",
    type: "website",
    url: "https://movieflix.wahed.app",
  },
  alternates: {
    canonical: "https://movieflix.wahed.app",
  },
}

export default function Home() {
  return <SearchPage />
}
