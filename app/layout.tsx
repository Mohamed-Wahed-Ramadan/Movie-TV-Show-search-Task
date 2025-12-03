import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Link from "next/link"
import "./globals.css"
import { Header } from "@/components/header"
import { StructuredData } from "@/components/structured-data"
const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MovieFlix - Search Movies & TV Shows | Free Movie Database",
  description: "Discover and search thousands of movies and TV shows. Get details, ratings, reviews, and more with MovieFlix. Find your favorite movies and series instantly.",
  keywords: ["movies", "tv shows", "search", "streaming", "entertainment", "film database", "tv series", "watch movies online", "movie search engine"],
  metadataBase: new URL("https://movieflix-mwk.netlify.app/"),
  openGraph: {
    title: "MovieFlix - Search Movies & TV Shows | Free Movie Database",
    description: "Discover and search thousands of movies and TV shows. Get details, ratings, reviews, and more with MovieFlix.",
    type: "website",
    url: "https://movieflix-mwk.netlify.app/",
    siteName: "MovieFlix",
    images: [
      {
        url: "https://movieflix-mwk.netlify.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "MovieFlix - Movie and TV Show Search Engine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MovieFlix - Search Movies & TV Shows",
    description: "Discover thousands of movies and TV shows with detailed information",
    images: ["https://movieflix-mwk.netlify.app/twitter-image.png"],
  },
  alternates: {
    canonical: "https://movieflix-mwk.netlify.app/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "Next.js",
  applicationName: "MovieFlix",
  referrer: "origin-when-cross-origin",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75' fill='%23c69d6f'>📺</text></svg>",
    apple: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75' fill='%23c69d6f'>📺</text></svg>",
  },
}

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75' fill='%23c69d6f'>📺</text></svg>" />
          <link rel="alternate" type="application/rss+xml" title="MovieFlix Feed" href="/feed.xml" />
          <StructuredData />
      </head>
      <body className={`${geist.className} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
