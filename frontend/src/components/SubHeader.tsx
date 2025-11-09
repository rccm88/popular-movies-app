interface SubHeaderProps {
  readonly title: string;
}

export default function SubHeader({ title }: SubHeaderProps) {
  return (
    <div
      className="w-full h-[56px] opacity-100 left-0 z-10 pt-4 pl-4"
      style={{
        backgroundColor: "#746A64",
      }}
    >
      <h2
        className="absolute opacity-100"
        style={{
          fontFamily: "var(--font-roboto), Roboto, sans-serif",
          fontWeight: 500,
          fontSize: "20px",
          lineHeight: "24px",
          letterSpacing: "0%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "100%",
        }}
      >
        {title}
      </h2>
    </div>
  );
}
