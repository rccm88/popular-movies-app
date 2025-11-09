import { getPopularMovies } from "@/lib/api";
import { Movie } from "@/types/movie";
import Header from "@/components/common/Header";
import MoviesList from "@/components/home/MoviesList";

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
      <Header title="Pop Movies" />
      <MoviesList movies={movies} error={error} />
    </div>
  );
}
