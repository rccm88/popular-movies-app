"use client";

import { Video } from "@/types/movie";

interface VideoModalProps {
  readonly video: Video | null;
  readonly onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  if (!video) {
    return null;
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ zIndex: 9999 }}
    >
      <button
        className="absolute inset-0 bg-black bg-opacity-75 w-full h-full"
        onClick={onClose}
        onKeyDown={handleKeyDown}
        aria-label="Close video modal"
        type="button"
      />
      <div className="relative w-full max-w-4xl mx-4 z-10">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-2xl font-bold hover:opacity-70"
          style={{ fontSize: "32px", lineHeight: "1" }}
          aria-label="Close"
        >
          ×
        </button>
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={`https://www.youtube.com/embed/${video.key}?autoplay=1`}
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.name}
          />
        </div>
      </div>
    </div>
  );
}
