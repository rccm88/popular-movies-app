"use client";

import { useState } from "react";
import Image from "next/image";
import { Video } from "@/types/movie";
import VideoModal from "./VideoModal";

interface TrailersProps {
  readonly trailers: Video[];
}

export default function TrailersSection({ trailers }: TrailersProps) {
  const [playingTrailer, setPlayingTrailer] = useState<Video | null>(null);

  if (trailers.length === 0) {
    return null;
  }

  const handlePlayTrailer = (trailer: Video) => {
    setPlayingTrailer(trailer);
  };

  const handleCloseModal = () => {
    setPlayingTrailer(null);
  };

  return (
    <>
      <div className="bg-white w-full pt-5">
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
            height: "0px",
            borderTop: "1px solid #DEDEDE",
            marginBottom: "16px",
            display: "block",
          }}
        ></div>

        <div className="flex flex-col">
          {trailers.slice(0, 2).map((trailer, index) => (
            <button
              key={trailer.id}
              onClick={() => handlePlayTrailer(trailer)}
              className="rounded-md flex items-center transition-colors hover:opacity-80"
              style={{
                backgroundColor: "#FAFAFA",
                height: "60px",
                padding: "16px",
                marginBottom: "8px",
              }}
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{ width: "28px", height: "28px", position: "relative" }}
              >
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
                  paddingLeft: "16px",
                }}
              >
                Play trailer {index + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      <VideoModal video={playingTrailer} onClose={handleCloseModal} />
    </>
  );
}
