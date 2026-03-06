# CineTrack 🍿

CineTrack is a modern movie discovery application built with React, TypeScript, and Vite. Browse popular movies, filter by genre and year, and discover your next favorite film.

## ✨ Features

- **Popular Movies**: Discover trending and popular movies
- **Advanced Filtering**: Filter movies by genre and release year
- **Responsive Design**: Optimized for desktop and mobile devices
- **Movie Details**: View movie posters, titles, and ratings
- **Paginated Results**: Navigate through extensive movie collections
- **Modern UI**: Clean, card-based design with smooth interactions

## 🛠 Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **TanStack Query** - Server state management
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icons

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended) or npm
- TMDB API key (free from [themoviedb.org](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cinetrack
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
# Create a .env file in the root directory
echo "VITE_TMDB_API_KEY=your_tmdb_api_key_here" > .env
```

> **Note**: You'll need to get a free API key from [The Movie Database (TMDB)](https://www.themoviedb.org/settings/api)

4. Start the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📜 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## 🏗 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── filters/        # Movie filtering components
│   ├── movies/         # Movie display components
│   └── ui/             # Base UI components (button, card, etc.)
├── hooks/              # Custom React hooks
│   ├── useGenres.ts    # Genre data fetching
│   └── useMovies.ts    # Movie data fetching
├── lib/                # Utility libraries
│   ├── axios.ts        # API client configuration
│   ├── react-query.ts  # Query client setup
│   └── utils.ts        # Helper functions
├── service/            # API service functions
│   ├── genres.ts       # Genre API calls
│   └── movies.ts       # Movie API calls
└── styles/             # Global styles
```

## 🎨 UI Components

The project uses a combination of custom components and Radix UI primitives:

- **Card**: Movie display cards with poster, title, and rating
- **Select**: Dropdown filters for genre and year selection
- **Pagination**: Navigation through movie pages
- **Button**: Interactive elements with consistent styling

## 🔧 Development

This project uses modern development tools and best practices:

- **ESLint**: Code linting with React and TypeScript rules
- **TypeScript**: Strict type checking
- **Tailwind CSS**: Utility-first styling approach
- **Component Architecture**: Modular, reusable components

## 📱 Responsive Design

CineTrack is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Open a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
