import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Popular Movies App",
  description: "Browse popular movies from The Movie Database",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased`}
        style={{
          fontFamily: "var(--font-roboto), Roboto, sans-serif",
          backgroundColor: "#FFFFFF",
          width: "100vw",
        }}
      >
        {children}
      </body>
    </html>
  );
}
