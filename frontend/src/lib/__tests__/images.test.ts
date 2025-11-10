import { getTmdbImageUrl } from "../images";

describe("getTmdbImageUrl", () => {
  it("should build correct URL with poster path and default size", () => {
    const result = getTmdbImageUrl("/test-poster.jpg");
    expect(result).toBe("https://image.tmdb.org/t/p/w185/test-poster.jpg");
  });

  it("should build correct URL with poster path and custom size", () => {
    const result = getTmdbImageUrl("/test-poster.jpg", "w500");
    expect(result).toBe("https://image.tmdb.org/t/p/w500/test-poster.jpg");
  });

  it("should build correct URL with original size", () => {
    const result = getTmdbImageUrl("/test-poster.jpg", "original");
    expect(result).toBe("https://image.tmdb.org/t/p/original/test-poster.jpg");
  });

  it("should return empty string for null poster path", () => {
    const result = getTmdbImageUrl(null);
    expect(result).toBe("");
  });

  it("should handle poster paths with leading slash correctly", () => {
    const result = getTmdbImageUrl("/poster.jpg", "w342");
    expect(result).toBe("https://image.tmdb.org/t/p/w342/poster.jpg");
  });

  it("should handle poster paths without leading slash correctly", () => {
    const result = getTmdbImageUrl("poster.jpg", "w342");
    // The function adds a leading slash if missing
    expect(result).toBe("https://image.tmdb.org/t/p/w342/poster.jpg");
  });
});
