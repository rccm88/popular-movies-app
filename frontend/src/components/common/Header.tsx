"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  readonly title: string;
  readonly showBackButton?: boolean;
}

export default function Header({ title, showBackButton = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const titleStyle = showBackButton
    ? {
        height: "24px",
        top: "20px",
        left: "54px",
      }
    : {
        width: "106px",
        height: "24px",
        top: "20px",
        left: "20px",
      };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    return () => {
      setIsMenuOpen(false);
    };
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className="text-white w-full opacity-100 fixed top-0 left-0 z-10 relative"
      style={{ backgroundColor: "#212121", height: "64px" }}
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

      <div className="relative">
        <button
          ref={buttonRef}
          onClick={toggleMenu}
          className="flex items-center justify-center absolute opacity-100 hover:opacity-80 transition-opacity"
          style={{
            width: "28px",
            height: "28px",
            top: "18px",
            right: "18px",
          }}
          aria-label="More options"
          aria-expanded={isMenuOpen}
        >
          <Image
            src="/more-vertical.svg"
            alt="More options"
            width={28}
            height={28}
            className="opacity-100"
          />
        </button>

        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute rounded shadow-lg py-2 min-w-[160px]"
            style={{
              top: "50px",
              right: "18px",
              zIndex: 1000,
              backgroundColor: "#212121",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            {pathname === "/" ? (
              <Link
                href="/favorites"
                className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Favorites
              </Link>
            ) : (
              <Link
                href="/"
                className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Pop Movies
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
