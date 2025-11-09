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
            padding: "0 24px",
          }}
        >
          {/* Movie Poster and Details Block */}
          <div className="bg-white w-full">
            <div className="flex gap-4">
              {/* Movie Poster */}
              {movie.poster_path && (
                <div className="flex-shrink-0">
                  <Image
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    width={115}
                    height={170}
                    className="object-cover opacity-100"
                    style={{
                      width: "115px",
                      height: "170px",
                      borderRadius: "2px",
                    }}
                  />
                </div>
              )}

              {/* Movie Metadata */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex flex-col gap-1">
                  <p
                    className="text-zinc-700"
                    style={{
                      fontSize: "20px",
                      fontWeight: 400,
                      lineHeight: "24px",
                      letterSpacing: "0%",
                    }}
                  >
                    {releaseYear}
                  </p>
                  <p
                    className="text-zinc-700 text-sm"
                    style={{
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "24px",
                      letterSpacing: "0%",
                    }}
                  >
                    {runtime}
                  </p>
                </div>
                <div>
                  <p
                    className="text-zinc-700 text-sm"
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: "24px",
                      letterSpacing: "0%",
                      paddingBottom: "16px",
                    }}
                  >
                    {rating}/10
                  </p>
                  <button
                    className="bg-zinc-800 text-white text-sm font-medium opacity-100"
                    style={{
                      width: "196px",
                      height: "56px",
                      borderRadius: "2px",
                      backgroundColor: "#746A64",
                    }}
                  >
                    <p
                      className="text-zinc-700 text-sm"
                      style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "24px",
                        letterSpacing: "0%",
                        alignItems: "center",
                        color: "#FFFFFF",
                      }}
                    >
                      Add to Favorite
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Movie Description */}
          <div className="bg-white w-full py-4">
            <p
              className="text-zinc-700 text-sm leading-relaxed"
              style={{
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "24px",
                letterSpacing: "0%",
                color: "#757575",
              }}
            >
              {movie.overview}
            </p>
          </div>

          {/* Trailers Section */}
          {trailers.length > 0 && (
            <div className="bg-white w-full py-4">
              <h3
                className="text-zinc-900 text-lg font-bold uppercase"
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  letterSpacing: "0%",
                  color: "#757575",
                }}
              >
                TRAILERS
              </h3>
              {/* Draw a line of 327px width 0 height and border 1px color #DEDEDE*/}
              <div
                style={{
                  width: "327px",
                  height: "0px",
                  borderTop: "1px solid #DEDEDE",
                  marginBottom: "16px",
                  display: "block",
                }}
              ></div>

              <div className="flex flex-col gap-3">
                {trailers.slice(0, 2).map((trailer, index) => (
                  <button
                    key={trailer.id}
                    className="px-4 py-3 rounded-md flex items-center gap-3 transition-colors"
                    style={{
                      backgroundColor: "#FAFAFA",
                      height: "60px",
                    }}
                  >
                    <div className="flex items-center justify-center flex-shrink-0">
                      <Image
                        src="/play-circle.png"
                        alt="Play"
                        width={20}
                        height={20}
                        className="object-contain"
                        color="#746A64"
                      />
                    </div>
                    <span
                      className="text-zinc-900 text-sm font-medium"
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "24px",
                        letterSpacing: "2%",
                        color: "#757575",
                      }}
                    >
                      Play trailer {index + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
