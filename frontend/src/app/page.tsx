import { getPopularMovies } from "@/lib/api";
import { Movie } from "@/types/movie";
import Image from "next/image";

export default async function Home() {
  let movies: Movie[] = [];
  let error: string | null = null;

  try {
    const data = await getPopularMovies();
    movies = data.results;
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load movies";
  }

  return (
    <div className="min-h-screen bg-zinc-200 font-sans relative">
      {/* Header */}
      <header className="bg-zinc-900 text-white w-full h-[64px] opacity-100 fixed top-0 left-0 z-10 relative">
        <h1
          className="font-bold absolute opacity-100"
          style={{
            fontFamily: "var(--font-roboto), Roboto, sans-serif",
            fontWeight: 700,
            fontSize: "20px",
            lineHeight: "24px",
            letterSpacing: "0%",
            width: "106px",
            height: "24px",
            top: "20px",
            left: "20px",
            color: "#FFFFFF",
          }}
        >
          Pop Movies
        </h1>
        <button
          className="flex items-center justify-center absolute opacity-100"
          style={{
            width: "28px",
            height: "28px",
            top: "18px",
            right: "18px",
          }}
        >
          <Image
            src="/more-vertical.svg"
            alt="More options"
            width={28}
            height={28}
            className="opacity-100"
          />
        </button>
      </header>

      {/* Main Content */}
      <main
        className="w-full absolute"
        style={{ top: "64px", left: "0", right: "0" }}
      >
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 m-4 rounded">
            <p>Error: {error}</p>
            <p className="text-sm mt-2">
              Please make sure THE_MOVIE_DB_API_KEY is set in your .env.local
              file
            </p>
          </div>
        )}

        {movies.length > 0 && (
          <ul className="grid grid-cols-2 gap-0 w-full">
            {movies.map((movie) => (
              <li key={movie.id} className="w-full bg-zinc-900">
                {movie.poster_path && (
                  <div
                    className="relative w-full"
                    style={{
                      aspectRatio: "188.31175231933594 / 279.462646484375",
                    }}
                  >
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      width={188.31175231933594}
                      height={279.462646484375}
                      className="opacity-100 object-cover w-full h-full"
                      priority={
                        movie.id === movies[0]?.id || movie.id === movies[1]?.id
                      }
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
