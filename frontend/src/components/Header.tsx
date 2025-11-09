import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  readonly title: string;
  readonly showBackButton?: boolean;
  readonly titleStyle?: {
    readonly width?: string;
    readonly height?: string;
    readonly top?: string;
    readonly left?: string;
  };
}

export default function Header({
  title,
  showBackButton = false,
  titleStyle = {
    width: "106px",
    height: "24px",
    top: "20px",
    left: "20px",
  },
}: HeaderProps) {
  return (
    <header
      className="text-white w-full h-[64px] opacity-100 fixed top-0 left-0 z-10 relative"
      style={{ backgroundColor: "#212121" }}
    >
      {showBackButton && (
        <Link
          href="/"
          className="absolute opacity-100"
          style={{
            width: "28px",
            height: "28px",
            top: "18px",
            left: "18px",
          }}
        >
          <Image
            src="/arrow-left.svg"
            alt="Back"
            width={28}
            height={28}
            className="opacity-100"
          />
        </Link>
      )}

      <h1
        className="absolute opacity-100"
        style={{
          fontFamily: "var(--font-roboto), Roboto, sans-serif",
          fontWeight: 700,
          fontSize: "20px",
          lineHeight: "24px",
          letterSpacing: "0%",
          color: "#FFFFFF",
          ...titleStyle,
        }}
      >
        {title}
      </h1>

      <button
        className="flex items-center justify-center absolute opacity-100"
        style={{
          width: "28px",
          height: "28px",
          top: "18px",
          right: "18px",
        }}
      >
        <Image
          src="/more-vertical.svg"
          alt="More options"
          width={28}
          height={28}
          className="opacity-100"
        />
      </button>
    </header>
  );
}
