interface MovieDescriptionSectionProps {
  readonly overview: string;
}

export default function DescriptionSection({
  overview,
}: MovieDescriptionSectionProps) {
  return (
    <div className="bg-white w-full pt-5">
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
        {overview}
      </p>
    </div>
  );
}
