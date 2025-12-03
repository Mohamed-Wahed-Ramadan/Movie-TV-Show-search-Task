export function StructuredData() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "MovieFlix",
    description:
      "Search and discover thousands of movies and TV shows with detailed information, ratings, and reviews",
    url: "https://movieflix-mwk.netlify.app/",
    applicationCategory: "MultimediaApplication",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "5000",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}
