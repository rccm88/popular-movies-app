import { getPopularMovies, getMovieDetails, getMovieVideos } from "../api";
import {
  mockMoviesResponse,
  mockMovieDetails,
  mockVideosResponse,
} from "@/__tests__/mocks/tmdb-api";

// Store original fetch
const originalFetch = globalThis.fetch;

describe("API functions", () => {
  beforeEach(() => {
    // Reset environment variables
    delete process.env.THE_MOVIE_DB_API_KEY;
  });

  afterEach(() => {
    // Restore original fetch
    globalThis.fetch = originalFetch;
  });

  describe("getPopularMovies", () => {
    it("should fetch popular movies successfully", async () => {
      process.env.THE_MOVIE_DB_API_KEY = "test-api-key";

      globalThis.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: async () => mockMoviesResponse,
        } as Response)
      );

      const result = await getPopularMovies();

      expect(result).toEqual(mockMoviesResponse);
      expect(globalThis.fetch).toHaveBeenCalledWith(
        "https://api.themoviedb.org/3/movie/popular?api_key=test-api-key",
        { next: { revalidate: 3600 } }
      );
    });

    it("should throw error when API key is not set", async () => {
      delete process.env.THE_MOVIE_DB_API_KEY;

      await expect(getPopularMovies()).rejects.toThrow(
        "THE_MOVIE_DB_API_KEY is not set"
      );
    });

    it("should throw error when API request fails", async () => {
      process.env.THE_MOVIE_DB_API_KEY = "test-api-key";

      globalThis.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
        } as Response)
      );

      await expect(getPopularMovies()).rejects.toThrow(
        "Failed to fetch popular movies"
      );
    });

    it("should throw error when fetch throws", async () => {
      process.env.THE_MOVIE_DB_API_KEY = "test-api-key";

      globalThis.fetch = jest.fn(() =>
        Promise.reject(new Error("Network error"))
      );

      await expect(getPopularMovies()).rejects.toThrow("Network error");
    });
  });

  describe("getMovieDetails", () => {
    it("should fetch movie details successfully", async () => {
      process.env.THE_MOVIE_DB_API_KEY = "test-api-key";

      globalThis.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: async () => mockMovieDetails,
        } as Response)
      );

      const result = await getMovieDetails(1);

      expect(result).toEqual(mockMovieDetails);
      expect(globalThis.fetch).toHaveBeenCalledWith(
        "https://api.themoviedb.org/3/movie/1?api_key=test-api-key",
        { next: { revalidate: 3600 } }
      );
    });

    it("should throw error when API key is not set", async () => {
      delete process.env.THE_MOVIE_DB_API_KEY;

      await expect(getMovieDetails(1)).rejects.toThrow(
        "THE_MOVIE_DB_API_KEY is not set"
      );
    });

    it("should throw error when API request fails", async () => {
      process.env.THE_MOVIE_DB_API_KEY = "test-api-key";

      globalThis.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
        } as Response)
      );

      await expect(getMovieDetails(999)).rejects.toThrow(
        "Failed to fetch movie details"
      );
    });

    it("should handle different movie IDs", async () => {
      process.env.THE_MOVIE_DB_API_KEY = "test-api-key";

      globalThis.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: async () => mockMovieDetails,
        } as Response)
      );

      await getMovieDetails(123);

      expect(globalThis.fetch).toHaveBeenCalledWith(
        "https://api.themoviedb.org/3/movie/123?api_key=test-api-key",
        { next: { revalidate: 3600 } }
      );
    });
  });

  describe("getMovieVideos", () => {
    it("should fetch movie videos successfully", async () => {
      process.env.THE_MOVIE_DB_API_KEY = "test-api-key";

      globalThis.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: async () => mockVideosResponse,
        } as Response)
      );

      const result = await getMovieVideos(1);

      expect(result).toEqual(mockVideosResponse);
      expect(globalThis.fetch).toHaveBeenCalledWith(
        "https://api.themoviedb.org/3/movie/1/videos?api_key=test-api-key",
        { next: { revalidate: 3600 } }
      );
    });

    it("should throw error when API key is not set", async () => {
      delete process.env.THE_MOVIE_DB_API_KEY;

      await expect(getMovieVideos(1)).rejects.toThrow(
        "THE_MOVIE_DB_API_KEY is not set"
      );
    });

    it("should throw error when API request fails", async () => {
      process.env.THE_MOVIE_DB_API_KEY = "test-api-key";

      globalThis.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
        } as Response)
      );

      await expect(getMovieVideos(1)).rejects.toThrow(
        "Failed to fetch movie videos"
      );
    });

    it("should handle different movie IDs", async () => {
      process.env.THE_MOVIE_DB_API_KEY = "test-api-key";

      globalThis.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: async () => mockVideosResponse,
        } as Response)
      );

      await getMovieVideos(456);

      expect(globalThis.fetch).toHaveBeenCalledWith(
        "https://api.themoviedb.org/3/movie/456/videos?api_key=test-api-key",
        { next: { revalidate: 3600 } }
      );
    });
  });
});
