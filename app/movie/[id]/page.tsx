import { MovieDetailsPage } from "@/components/pages/movie-details-page"

export default function MovieDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  return <MovieDetailsPage params={params} />
}
