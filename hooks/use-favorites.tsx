"use client"

import { useCallback, useEffect, useState } from "react"
import type { Movie } from "@/types/movie"

const STORAGE_KEY = "movieflix:favorites"

type Listener = (items: Movie[]) => void

const store = (() => {
  let state: Movie[] = []
  const listeners = new Set<Listener>()

  const load = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      state = raw ? JSON.parse(raw) : []
    } catch (e) {
      state = []
    }
  }

  const save = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
      // ignore
    }
  }

  // init when possible
  if (typeof window !== "undefined") {
    load()
    // keep in sync with other tabs
    window.addEventListener("storage", (e) => {
      if (e.key === STORAGE_KEY) {
        try {
          state = e.newValue ? JSON.parse(e.newValue) : []
        } catch (_) {
          state = []
        }
        listeners.forEach((l) => l(state))
      }
    })
  }

  return {
    get: () => state,
    subscribe: (l: Listener) => {
      listeners.add(l)
      l(state)
      return () => listeners.delete(l)
    },
    set: (next: Movie[]) => {
      state = next
      save()
      listeners.forEach((l) => l(state))
    },
  }
})()

export function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>([])

  useEffect(() => {
    if (typeof window === "undefined") return
    const unsub = store.subscribe(setFavorites)
    return () => {
      // call unsubscribe and ignore its boolean return
      try {
        unsub()
      } catch (_) {
        // ignore
      }
    }
  }, [])

  const add = useCallback((movie: Movie) => {
    const next = store.get().some((m) => m.imdbId === movie.imdbId)
      ? store.get()
      : [movie, ...store.get()]
    store.set(next)
  }, [])

  const remove = useCallback((imdbId: string) => {
    const next = store.get().filter((m) => m.imdbId !== imdbId)
    store.set(next)
  }, [])

  const toggle = useCallback((movie: Movie) => {
    const exists = store.get().some((m) => m.imdbId === movie.imdbId)
    const next = exists ? store.get().filter((m) => m.imdbId !== movie.imdbId) : [movie, ...store.get()]
    store.set(next)
  }, [])

  const isFavorite = useCallback((imdbId: string) => store.get().some((m) => m.imdbId === imdbId), [])

  const clear = useCallback(() => store.set([]), [])

  return { favorites, add, remove, toggle, isFavorite, clear }
}
