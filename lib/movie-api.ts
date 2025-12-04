import type { Movie, MovieDetails } from "@/types/movie"

interface OMDBSearchResult {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

interface OMDBSearchResponse {
  Search?: OMDBSearchResult[]
  totalResults?: string
  Response: string
  Error?: string
}

interface OMDBDetails {
  imdbID: string
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Metascore: string
  imdbRating: string
  imdbVotes: string
  Type: string
  totalSeasons?: string
  Response: string
}

const OMDB_BASE_URL = "https://www.omdbapi.com"
const OMDB_API_KEY = "c735661c"

function mapOMDBToMovie(result: OMDBSearchResult): Movie {
  return {
    imdbId: result.imdbID,
    title: result.Title || "Unknown",
    year: result.Year || "N/A",
    type: result.Type === "series" ? "series" : "movie",
    poster: result.Poster !== "N/A" ? result.Poster : "/abstract-movie-poster.png",
  }
}

export async function searchAll(
  query: string,
  language: "ar-SA" | "en-US" = "en-US",
  page: number = 1,
): Promise<{ items: Movie[]; totalPages: number; totalResults: number; currentPage: number }> {
  if (!query.trim()) {
    return { items: [], totalPages: 0, totalResults: 0, currentPage: 1 }
  }

  try {
    const params = new URLSearchParams({
      apikey: OMDB_API_KEY,
      s: query.trim(),
      page: String(Math.max(1, Math.floor(page))),
    })

    const response = await fetch(`${OMDB_BASE_URL}/?${params}`)

    if (!response.ok) {
      throw new Error(`OMDB API error: ${response.status} ${response.statusText}`)
    }

    const data: OMDBSearchResponse = await response.json()

    if (data.Response === "False") {
      return { items: [], totalPages: 0, totalResults: 0, currentPage: page }
    }

    // Filter to only movies and series (exclude games, episodes, etc.)
    const filtered = (data.Search || []).filter((r) => r.Type === "movie" || r.Type === "series")
    const totalResults = parseInt(data.totalResults || "0", 10)
    const items = filtered.map(mapOMDBToMovie)

    // OMDB returns max 10 results per page
    const itemsPerPage = 10
    const totalPages = Math.ceil(totalResults / itemsPerPage)

    return {
      items,
      totalPages,
      totalResults,
      currentPage: page,
    }
  } catch (error) {
    console.error("OMDB search error:", error)
    throw new Error("Failed to search movies and series")
  }
}

export async function searchMovies(
  query: string,
  language: "ar-SA" | "en-US" = "en-US",
  page: number = 1,
): Promise<{ items: Movie[]; totalPages: number; totalResults: number; currentPage: number }> {
  return searchAll(query, language, page)
}

export async function searchSeries(
  query: string,
  language: "ar-SA" | "en-US" = "en-US",
  page: number = 1,
): Promise<{ items: Movie[]; totalPages: number; totalResults: number; currentPage: number }> {
  return searchAll(query, language, page)
}

export async function searchMulti(
  query: string,
  language: "ar-SA" | "en-US" = "en-US",
  page: number = 1,
): Promise<{ items: Movie[]; totalPages: number; totalResults: number; currentPage: number }> {
  return searchAll(query, language, page)
}

export async function getMovieDetails(imdbId: string): Promise<MovieDetails | null> {
  try {
    const params = new URLSearchParams({
      apikey: OMDB_API_KEY,
      i: imdbId,
      plot: "full",
    })

    const response = await fetch(`${OMDB_BASE_URL}/?${params}`)

    if (!response.ok) {
      throw new Error("Failed to fetch details")
    }

    const data: OMDBDetails = await response.json()

    if (data.Response === "False") {
      return null
    }

    return {
      imdbID: data.imdbID,
      Title: data.Title,
      Year: data.Year,
      Rated: data.Rated,
      Released: data.Released,
      Runtime: data.Runtime,
      Genre: data.Genre,
      Director: data.Director,
      Writer: data.Writer,
      Actors: data.Actors,
      Plot: data.Plot,
      Language: data.Language,
      Country: data.Country,
      Awards: data.Awards,
      Poster: data.Poster !== "N/A" ? data.Poster : "/abstract-movie-poster.png",
      Metascore: data.Metascore,
      imdbRating: data.imdbRating,
      imdbVotes: data.imdbVotes,
      Type: data.Type,
      totalSeasons: data.totalSeasons || "N/A",
      Response: data.Response,
      Ratings: [],
    }
  } catch (error) {
    console.error("OMDB details fetch error:", error)
    return null
  }
}
