# Popular Movies App

A modern Next.js application that displays popular movies from The Movie Database (TMDB). Browse through popular movies, view detailed information, watch trailers, and explore top-rated films.

## Features

- 🎬 Browse popular movies
- ⭐ View top-rated movies
- 📱 Responsive design
- 🎥 Watch movie trailers
- 📝 Detailed movie information (runtime, rating, release date, overview)
- 🖼️ High-quality movie posters

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd popular-movies-app/frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Get Your TMDB API Key

1. Visit [The Movie Database (TMDB)](https://www.themoviedb.org/)
2. Create a free account or log in to your existing account
3. Go to your [Account Settings](https://www.themoviedb.org/settings/api)
4. Click on the "API" tab
5. Request an API key by filling out the application form
   - Select "Developer" as the type
   - Accept the terms of use
   - Provide a brief description of your project
6. Once approved, copy your API key (it will look like: `abcd1234efgh5678ijkl9012mnop3456`)

### 4. Set Up Environment Variables

1. Create a `.env.local` file in the `frontend` directory (copy from `.env.example` if it exists):

```bash
cp .env.example .env.local
```

2. Open `.env.local` and add your TMDB API key:

```env
THE_MOVIE_DB_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with the actual API key you obtained from TMDB.

**Important:** Never commit your `.env.local` file to version control. It's already included in `.gitignore`.

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
frontend/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── page.tsx      # Home page (popular movies)
│   │   └── movie/
│   │       └── [id]/     # Dynamic movie detail page
│   ├── components/       # React components
│   │   ├── common/       # Shared components (Header, SubHeader)
│   │   ├── home/         # Home page components
│   │   └── movie-page/   # Movie detail page components
│   ├── lib/              # Utility functions
│   │   ├── api.ts        # TMDB API functions
│   │   └── images.ts     # Image utility functions
│   └── types/            # TypeScript type definitions
│       └── movie.ts      # Movie-related types
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues

## Technologies Used

- [Next.js 16](https://nextjs.org/) - React framework
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [The Movie Database API](https://www.themoviedb.org/documentation/api) - Movie data

## Troubleshooting

### API Key Issues

If you encounter errors like "THE_MOVIE_DB_API_KEY is not set":

1. Make sure you've created a `.env.local` file in the `frontend` directory
2. Verify the variable name is exactly: `THE_MOVIE_DB_API_KEY`
3. Ensure there are no spaces around the `=` sign
4. Restart your development server after creating/modifying `.env.local`

### API Rate Limiting

TMDB has rate limits on their free API tier. If you hit rate limits:

- Wait a few minutes before making more requests
- Consider upgrading to a paid plan if you need higher limits

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [The Movie Database API Documentation](https://www.themoviedb.org/documentation/api)
- [React Documentation](https://react.dev/)

## License

This project is open source and available under the MIT License.
