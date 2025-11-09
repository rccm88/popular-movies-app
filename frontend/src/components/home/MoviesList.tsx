import { Movie } from "@/types/movie";
import Image from "next/image";
import Link from "next/link";
import { getTmdbImageUrl } from "@/lib/images";

interface MoviesListProps {
  readonly movies: Movie[];
  readonly error: string | null;
}

export default function MoviesList({ movies, error }: MoviesListProps) {
  return (
    <main
      className="w-full absolute"
      style={{ top: "64px", left: "0", right: "0" }}
    >
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 m-4 rounded">
          <p>Error: {error}</p>
          <p className="text-sm mt-2">
            Please make sure THE_MOVIE_DB_API_KEY is set in your .env.local file
          </p>
        </div>
      )}

      {movies.length > 0 && (
        <ul className="grid grid-cols-2 gap-0 w-full">
          {movies.map((movie) => (
            <li key={movie.id} className="w-full bg-zinc-900">
              <Link href={`/movie/${movie.id}`}>
                {movie.poster_path && (
                  <div
                    className="relative w-full"
                    style={{
                      aspectRatio: "188.31175231933594 / 279.462646484375",
                    }}
                  >
                    <Image
                      src={getTmdbImageUrl(movie.poster_path, "w342")}
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
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
