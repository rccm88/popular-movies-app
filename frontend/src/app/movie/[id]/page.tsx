import { getMovieDetails, getMovieVideos } from "@/lib/api";
import { MovieDetails, VideosResponse } from "@/types/movie";
import { notFound } from "next/navigation";
import Header from "@/components/common/Header";
import SubHeader from "@/components/common/SubHeader";
import Trailers from "@/components/movie-page/TrailersSection";
import MovieDescriptionSection from "@/components/movie-page/DescriptionSection";
import MoviePosterAndDetails from "@/components/movie-page/PosterAndDetailsSection";

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movieId = parseInt(id);

  if (isNaN(movieId)) {
    notFound();
  }

  let movie: MovieDetails | null = null;
  let videos: VideosResponse | null = null;
  let error: string | null = null;

  try {
    [movie, videos] = await Promise.all([
      getMovieDetails(movieId),
      getMovieVideos(movieId),
    ]);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load movie details";
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-zinc-200 font-sans">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 m-4 rounded">
          <p>Error: {error || "Movie not found"}</p>
        </div>
      </div>
    );
  }

  // Filter trailers from videos
  const trailers =
    videos?.results.filter(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    ) || [];

  // Format runtime
  const runtime = movie.runtime ? `${movie.runtime} mins` : "N/A";
  const releaseYear = movie.release_date?.split("-")[0] || "N/A";
  const rating = movie.vote_average.toFixed(1);

  return (
    <>
      <Header title="Movie details" showBackButton={true} />

      <SubHeader title={movie.title} />

      <div style={{ backgroundColor: "#FFFFFF" }}>
        {/* Main Content */}
        <main
          className="w-full absolute"
          style={{
            top: "120px",
            left: "0",
            right: "0",
            padding: "24px 24px",
          }}
        >
          {/* Movie Poster and Details Block */}
          <MoviePosterAndDetails
            posterPath={movie.poster_path}
            title={movie.title}
            releaseYear={releaseYear}
            runtime={runtime}
            rating={rating}
          />

          {/* Movie Description */}
          <MovieDescriptionSection overview={movie.overview} />

          {/* Trailers Section */}
          <Trailers trailers={trailers} />
        </main>
      </div>
    </>
  );
}
