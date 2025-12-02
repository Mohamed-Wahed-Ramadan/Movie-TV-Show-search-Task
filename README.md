# MovieFlix - Movie & TV Show Search Application

A modern, fast, and responsive movie and TV show search application built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

✨ **Search Functionality**
- Real-time search for movies and TV shows
- Debounced search input (300ms) for better performance
- Comprehensive results from OMDb API

📊 **Advanced Filtering & Sorting**
- Filter by type: Movies, TV Series, or All
- Sort by: Newest First, Oldest First, Alphabetical (A-Z)
- Live result count display

🎬 **Rich Media Details**
- Movie/series poster image
- Title, year, and type information
- Director, genre, and cast information
- Plot summary
- IMDb ratings from multiple sources
- Runtime and release information

🎨 **Beautiful UI/UX**
- Dark theme with gold accents (#000000 & #c69d6f)
- Smooth animations and transitions
- Hover effects on movie cards
- Responsive design (mobile, tablet, desktop)
- Loading states and error handling
- Empty state messaging

📱 **Responsive Design**
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface
- Smooth animations on all devices

🔄 **Modal & Detail Pages**
- Quick preview modal for fast browsing
- Full-page detail view for comprehensive information
- Easy navigation between search and details
- SEO-friendly dynamic routes

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **API**: OMDb API (Open Movie Database)
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn

### Installation

1. Clone or download the project
2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Get an OMDb API key:
   - Visit [omdbapi.com](https://www.omdbapi.com)
   - Sign up for a free API key (limited to 1,000 requests/day)
   - Replace `k_ht6rx61t` in `lib/omdb-api.ts` with your key for production

### Running Locally

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Search**: Type a movie or TV show name in the search bar
2. **Browse**: Scroll through the results grid
3. **Filter**: Click filter buttons to show Movies, Series, or All
4. **Sort**: Select a sorting option (Year or Alphabetical)
5. **Preview**: Hover on a card to see quick info or click "View Details"
6. **Explore**: Click "Full Details" to view the comprehensive page

## Project Structure

\`\`\`
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Home page
│   ├── movie/[id]/page.tsx      # Movie detail page
│   └── globals.css             # Global styles and theme
├── components/
│   ├── pages/                  # Page components
│   │   ├── search-page.tsx
│   │   └── movie-details-page.tsx
│   ├── sections/               # Reusable sections
│   │   ├── search-header.tsx
│   │   ├── search-filters.tsx
│   │   ├── results-list.tsx
│   │   └── movie-details-view.tsx
│   ├── cards/                  # Card components
│   │   ├── movie-card.tsx
│   │   └── loading-card.tsx
│   ├── modals/                 # Modal components
│   │   └── movie-details-modal.tsx
│   └── ui/                     # UI components
│       └── search-input.tsx
├── hooks/                      # Custom React hooks
│   └── use-movie-search.ts
├── lib/                        # Utilities and API calls
│   └── omdb-api.ts
├── types/                      # TypeScript types
│   └── movie.ts
└── README.md
\`\`\`

## Color Palette

- **Primary Black**: #000000
- **Accent Gold**: #c69d6f
- **Gold Light**: #d4b08a (hover states)
- **Gold Dark**: #a67c4e (pressed states)
- **Gray Dark**: #0a0a0a (cards)
- **Gray Mid**: #1a1a1a (borders)
- **Gray Light**: #3a3a3a (muted text)

## Features Implemented

✅ Search with API integration  
✅ Results filtering (Movies/Series/All)  
✅ Results sorting (Year desc/asc, Alphabetical)  
✅ Loading states with skeleton cards  
✅ Error handling and messaging  
✅ Movie card hover effects  
✅ Quick preview modal  
✅ Full detail page with routing  
✅ Responsive design  
✅ Smooth animations (Framer Motion)  
✅ Debounced search  
✅ SEO metadata  
✅ Clean component architecture  

## API Information

This project uses the **OMDb API** (Open Movie Database):
- Free tier: 1,000 requests/day
- Requires API key
- Response time: ~200-500ms
- Supports: Movies, TV Shows, Episodes

Note: The demo uses a limited public key. For production, get your own key at [omdbapi.com](https://www.omdbapi.com).

## Performance Optimizations

- Debounced search input (300ms)
- Skeleton loading cards during fetch
- Optimized image loading
- Memoized components
- Efficient filtering and sorting

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Android Latest

## Future Enhancements

- ✨ Add favorites system (localStorage)
- ✨ Pagination/infinite scroll
- ✨ Advanced search filters (genre, year range)
- ✨ User ratings and reviews
- ✨ Watch list functionality
- ✨ Multiple language support
- ✨ Dark/Light mode toggle

## License

MIT

## Support

For issues or questions:
1. Check the OMDb API documentation
2. Verify your API key is valid and has remaining requests
3. Check network tab in browser DevTools
4. Review console for error messages

---

Built with ❤️ using Next.js and React
