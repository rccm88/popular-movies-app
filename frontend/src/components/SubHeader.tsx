interface SubHeaderProps {
  readonly title: string;
}

export default function SubHeader({ title }: SubHeaderProps) {
  return (
    <div
      className="py-4 px-4 fixed opacity-100 z-10"
      style={{
        backgroundColor: "#746A64",
        width: "375px",
        height: "56px",
        top: "64px",
        left: "0",
        boxShadow: "0px 0px 4px 0px #0000001A",
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
          width: "74px",
          height: "24px",
          top: "16px",
          left: "16px",
          color: "#FFFFFF",
        }}
      >
        {title}
      </h2>
    </div>
  );
}

