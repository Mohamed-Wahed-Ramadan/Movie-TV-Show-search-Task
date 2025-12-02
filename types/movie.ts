export interface Movie {
  imdbId: string
  title: string
  year: string
  type: "movie" | "series" | "episode"
  poster: string
}

export interface MovieDetails {
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
  Ratings: Array<{
    Source: string
    Value: string
  }>
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  totalSeasons?: string
  Response: string
}

export interface OmdbSearchResponse {
  Search: Array<{
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
  }>
  totalResults: string
  Response: string
  Error?: string
}
