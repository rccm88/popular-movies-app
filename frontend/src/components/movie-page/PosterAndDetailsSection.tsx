import Image from "next/image";

interface MoviePosterAndDetailsProps {
  readonly posterPath: string | null;
  readonly title: string;
  readonly releaseYear: string;
  readonly runtime: string;
  readonly rating: string;
}

export default function PosterAndDetailsSection({
  posterPath,
  title,
  releaseYear,
  runtime,
  rating,
}: MoviePosterAndDetailsProps) {
  return (
    <div className="bg-white w-full">
      <div className="flex gap-4">
        {/* Movie Poster */}
        {posterPath && (
          <div className="flex-shrink-0">
            <Image
              src={`https://image.tmdb.org/t/p/w300${posterPath}`}
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
  );
}
