import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MovieFlix - Search Movies & TV Shows",
  description: "Discover and search thousands of movies and TV shows. Get details, ratings, and more with MovieFlix.",
  keywords: ["movies", "tv shows", "search", "streaming", "entertainment"],
  openGraph: {
    title: "MovieFlix - Search Movies & TV Shows",
    description: "Discover and search thousands of movies and TV shows",
    type: "website",
  },
    generator: 'v0.app'
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
      <body className={`${geist.className} antialiased`}>{children}</body>
    </html>
  )
}
