import type { Movie, MovieDetails } from "@/types/movie"

interface TVMazeShow {
  id: number
  name: string
  premiered: string
  type: string
  image: {
    medium: string
    original: string
  } | null
  summary: string
  genres?: string[]
}

interface TVMazeSearchResult {
  score: number
  show: TVMazeShow
}

const TVMAZE_BASE_URL = "https://api.tvmaze.com"

async function searchTVMaze(query: string): Promise<Movie[]> {
  try {
    const response = await fetch(`${TVMAZE_BASE_URL}/search/shows?q=${encodeURIComponent(query)}`, {
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch from TVMaze")
    }

    const results: TVMazeSearchResult[] = await response.json()

    return results
      .filter((result) => result.show && result.show.name)
      .slice(0, 10)
      .map((result) => ({
        imdbId: `tvmaze-${result.show.id}`,
        title: result.show.name,
        year: result.show.premiered ? result.show.premiered.split("-")[0] : "N/A",
        type: result.show.type?.toLowerCase() === "scripted series" ? "series" : "series",
        poster: result.show.image?.medium || "/abstract-movie-poster.png",
      }))
  } catch (error) {
    console.error("[v0] TVMaze search error:", error)
    throw new Error("Failed to search")
  }
}

export async function searchMovies(query: string): Promise<Movie[]> {
  return searchTVMaze(query)
}

export async function searchSeries(query: string): Promise<Movie[]> {
  return searchTVMaze(query)
}

export async function searchAll(query: string): Promise<Movie[]> {
  return searchTVMaze(query)
}

export async function getMovieDetails(imdbId: string): Promise<MovieDetails | null> {
  try {
    // Extract TVMaze ID from our custom format
    const tvmazeId = imdbId.replace("tvmaze-", "")

    const response = await fetch(`${TVMAZE_BASE_URL}/shows/${tvmazeId}?embed=cast`)

    if (!response.ok) {
      throw new Error("Failed to fetch details")
    }

    const show: TVMazeShow & { url?: string; genres?: string[] } = await response.json()

    return {
      imdbID: imdbId,
      Title: show.name,
      Year: show.premiered ? show.premiered.split("-")[0] : "N/A",
      Rated: "N/A",
      Released: show.premiered || "N/A",
      Runtime: "N/A",
      Genre: show.genres?.join(", ") || "N/A",
      Director: "N/A",
      Writer: "N/A",
      Actors: "N/A",
      Plot: show.summary?.replace(/<[^>]*>/g, "") || "No description available",
      Language: "N/A",
      Country: "N/A",
      Awards: "N/A",
      Poster: show.image?.original || "/abstract-movie-poster.png",
      Metascore: "N/A",
      imdbRating: "N/A",
      imdbVotes: "N/A",
      Type: show.type?.toLowerCase() === "scripted series" ? "series" : "series",
      totalSeasons: "N/A",
      Response: "True",
    }
  } catch (error) {
    console.error("[v0] Details fetch error:", error)
    return null
  }
}
