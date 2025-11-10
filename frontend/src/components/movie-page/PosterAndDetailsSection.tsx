"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getTmdbImageUrl } from "@/lib/images";

interface MoviePosterAndDetailsProps {
  readonly movieId: number;
  readonly posterPath: string | null;
  readonly title: string;
  readonly releaseYear: string;
  readonly runtime: string;
  readonly rating: string;
  readonly releaseDate?: string;
}

export default function PosterAndDetailsSection({
  movieId,
  posterPath,
  title,
  releaseYear,
  runtime,
  rating,
  releaseDate,
}: MoviePosterAndDetailsProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if movie is already favorited on mount
  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const response = await fetch(`/api/favorites/${movieId}`);
        if (response.ok) {
          const data = await response.json();
          setIsFavorited(data.isFavorited);
        }
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    checkFavorite();
  }, [movieId]);

  const handleToggleFavorite = async () => {
    setIsLoading(true);
    try {
      if (isFavorited) {
        // Remove from favorites
        const response = await fetch(`/api/favorites?movie_id=${movieId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setIsFavorited(false);
        } else {
          console.error("Failed to remove favorite");
        }
      } else {
        // Add to favorites
        const response = await fetch("/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movie_id: movieId,
            title,
            poster_path: posterPath,
            release_date: releaseDate,
            vote_average: Number.parseFloat(rating),
          }),
        });

        if (response.ok) {
          setIsFavorited(true);
        } else {
          console.error("Failed to add favorite");
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-white w-full">
      <div className="flex gap-4">
        {/* Movie Poster */}
        {posterPath && (
          <div className="flex-shrink-0">
            <Image
              src={getTmdbImageUrl(posterPath, "w185")}
              alt={title}
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
              onClick={handleToggleFavorite}
              disabled={isLoading}
              className="bg-zinc-800 text-white text-sm font-medium opacity-100 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
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
                {(() => {
                  if (isLoading) return "Loading...";
                  if (isFavorited) return "Remove from Favorites";
                  return "Add to Favorite";
                })()}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
