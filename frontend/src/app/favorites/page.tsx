import { getDb } from "@/lib/db";
import { Movie } from "@/types/movie";
import Header from "@/components/common/Header";
import MoviesList from "@/components/home/MoviesList";

interface Favorite {
  id: number;
  movie_id: number;
  title: string;
  poster_path: string | null;
  release_date: string | null;
  vote_average: number | null;
  created_at: string;
}

export default function FavoritesPage() {
  let movies: Movie[] = [];
  let error: string | null = null;

  try {
    const db = getDb();
    const favorites = db
      .prepare("SELECT * FROM favorites ORDER BY created_at DESC")
      .all() as Favorite[];
    
    // Map favorites to Movie format
    movies = favorites.map((favorite) => ({
      id: favorite.movie_id,
      title: favorite.title,
      overview: "", // Favorites don't have overview, but Movie interface requires it
      poster_path: favorite.poster_path,
      release_date: favorite.release_date || "",
      vote_average: favorite.vote_average || 0,
      vote_count: 0, // Favorites don't have vote_count, but Movie interface requires it
    }));
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load favorites";
  }

  return (
    <div className="min-h-screen bg-zinc-200 font-sans relative">
      <Header title="Favorites" showBackButton={true} />
      <MoviesList movies={movies} error={error} />
    </div>
  );
}

