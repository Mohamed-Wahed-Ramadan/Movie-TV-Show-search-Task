import type { Metadata } from "next"
import { MovieDetailsPage } from "@/components/pages/movie-details-page"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params

  return {
    title: `Movie Details - MovieFlix`,
    description: `View detailed information about this movie or TV show including plot, ratings, release date, and more on MovieFlix.`,
    keywords: ["movie details", "TV show details", "film information", "ratings"],
    openGraph: {
      title: `Movie Details - MovieFlix`,
      description: `Explore detailed information about movies and TV shows on MovieFlix`,
      type: "article",
      url: `https://movieflix.wahed.app/movie/${id}`,
    },
  }
}

export default function MovieDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  return <MovieDetailsPage params={params} />
}
