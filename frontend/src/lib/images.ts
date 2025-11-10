const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

/**
 * Builds a TMDB image URL for a given poster path and size
 * @param posterPath - The poster path from TMDB API
 * @param size - The image size (e.g., 'w185', 'w500', 'original')
 * @returns The full image URL
 */
export function getTmdbImageUrl(
  posterPath: string | null,
  size: string = "w185"
): string {
  if (!posterPath) {
    return "";
  }
  // Ensure poster path starts with a leading slash
  const normalizedPath = posterPath.startsWith("/")
    ? posterPath
    : `/${posterPath}`;
  return `${TMDB_IMAGE_BASE_URL}/${size}${normalizedPath}`;
}
