import { getMovieDetails, getMovieVideos } from "@/lib/api";
import { MovieDetails, VideosResponse } from "@/types/movie";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";

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
  const trailers = videos?.results.filter(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  ) || [];

  // Format runtime
  const runtime = movie.runtime ? `${movie.runtime} mins` : "N/A";
  const releaseYear = movie.release_date?.split("-")[0] || "N/A";
  const rating = movie.vote_average.toFixed(1);

  return (
    <div className="min-h-screen bg-zinc-200 font-sans">
      <Header
        title="Movie details"
        showBackButton={true}
        titleStyle={{
          width: "121px",
          height: "24px",
          top: "20px",
          left: "54px",
        }}
      />

      <SubHeader title={movie.title} />

      {/* Main Content */}
      <main className="w-full absolute" style={{ top: "120px", left: "0", right: "0" }}>

        {/* Movie Poster and Details Block */}
        <div className="bg-white w-full p-4">
          <div className="flex gap-4">
            {/* Movie Poster */}
            {movie.poster_path && (
              <div className="flex-shrink-0">
                <Image
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="rounded object-cover"
                  style={{ width: "120px", height: "180px" }}
                />
              </div>
            )}

            {/* Movie Metadata */}
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <p className="text-zinc-700 text-sm">{releaseYear}</p>
                <p className="text-zinc-700 text-sm">{runtime}</p>
                <p className="text-zinc-700 text-sm">{rating}/10</p>
              </div>
              <button className="bg-zinc-800 text-white px-4 py-2 rounded-md text-sm font-medium mt-2">
                Add to Favorite
              </button>
            </div>
          </div>
        </div>

        {/* Movie Description */}
        <div className="bg-white w-full px-4 py-4">
          <p className="text-zinc-700 text-sm leading-relaxed">{movie.overview}</p>
        </div>

        {/* Trailers Section */}
        {trailers.length > 0 && (
          <div className="bg-white w-full px-4 py-4">
            <h3
              className="text-zinc-900 text-lg font-bold mb-4 uppercase"
              style={{
                fontFamily: "var(--font-roboto), Roboto, sans-serif",
              }}
            >
              TRAILERS
            </h3>
            <div className="flex flex-col gap-3">
              {trailers.slice(0, 2).map((trailer, index) => (
                <button
                  key={trailer.id}
                  className="bg-zinc-200 hover:bg-zinc-300 px-4 py-3 rounded-md flex items-center gap-3 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-zinc-900 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 4L12 8L6 12V4Z"
                        fill="#000000"
                      />
                    </svg>
                  </div>
                  <span className="text-zinc-900 text-sm font-medium">
                    Play trailer {index + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

