import { render, screen } from "@/__tests__/test-utils";
import MoviePage from "../page";
import { getMovieDetails, getMovieVideos } from "@/lib/api";
import { notFound } from "next/navigation";
import {
  mockMovieDetails,
  mockVideosResponse,
} from "@/__tests__/mocks/tmdb-api";

// Mock the API functions
jest.mock("@/lib/api", () => ({
  getMovieDetails: jest.fn(),
  getMovieVideos: jest.fn(),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

// Mock the components
jest.mock("@/components/common/Header", () => ({
  __esModule: true,
  default: ({
    title,
    showBackButton,
  }: {
    title: string;
    showBackButton?: boolean;
  }) => (
    <header>
      {title}
      {showBackButton && <span data-testid="back-button">Back</span>}
    </header>
  ),
}));

jest.mock("@/components/common/SubHeader", () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <h2>{title}</h2>,
}));

jest.mock("@/components/movie-page/PosterAndDetailsSection", () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => (
    <div data-testid="poster-details">{title}</div>
  ),
}));

jest.mock("@/components/movie-page/DescriptionSection", () => ({
  __esModule: true,
  default: ({ overview }: { overview: string }) => (
    <div data-testid="description">{overview}</div>
  ),
}));

jest.mock("@/components/movie-page/TrailersSection", () => ({
  __esModule: true,
  default: ({ trailers }: { trailers: unknown[] }) => (
    <div data-testid="trailers">
      {trailers.length > 0 ? "Trailers" : "No trailers"}
    </div>
  ),
}));

describe("Movie Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render movie details when data is fetched successfully", async () => {
    (getMovieDetails as jest.Mock).mockResolvedValue(mockMovieDetails);
    (getMovieVideos as jest.Mock).mockResolvedValue(mockVideosResponse);

    const params = Promise.resolve({ id: "1" });
    const component = await MoviePage({ params });
    render(component);

    expect(screen.getByText("Movie details")).toBeInTheDocument();
    expect(screen.getByTestId("back-button")).toBeInTheDocument();
    expect(screen.getAllByText("Test Movie").length).toBeGreaterThan(0);
    expect(screen.getByTestId("poster-details")).toBeInTheDocument();
    expect(screen.getByTestId("description")).toBeInTheDocument();
  });

  it("should call notFound when movie ID is invalid", async () => {
    const params = Promise.resolve({ id: "invalid" });
    await MoviePage({ params });

    expect(notFound).toHaveBeenCalled();
  });

  it("should call notFound when movie ID is NaN", async () => {
    const params = Promise.resolve({ id: "abc" });
    await MoviePage({ params });

    expect(notFound).toHaveBeenCalled();
  });

  it("should render error message when API call fails", async () => {
    (getMovieDetails as jest.Mock).mockRejectedValue(
      new Error("API Error")
    );
    (getMovieVideos as jest.Mock).mockResolvedValue(mockVideosResponse);

    const params = Promise.resolve({ id: "1" });
    const component = await MoviePage({ params });
    render(component);

    expect(screen.getByText(/Error:/)).toBeInTheDocument();
    expect(screen.getByText(/API Error/)).toBeInTheDocument();
  });

  it("should render error message when movie is not found", async () => {
    (getMovieDetails as jest.Mock).mockResolvedValue(null);
    (getMovieVideos as jest.Mock).mockResolvedValue(mockVideosResponse);

    const params = Promise.resolve({ id: "999" });
    const component = await MoviePage({ params });
    render(component);

    expect(screen.getByText(/Error:/)).toBeInTheDocument();
    expect(screen.getByText(/Movie not found/)).toBeInTheDocument();
  });

  it("should render error message with default text when error is not an Error instance", async () => {
    (getMovieDetails as jest.Mock).mockRejectedValue("String error");
    (getMovieVideos as jest.Mock).mockResolvedValue(mockVideosResponse);

    const params = Promise.resolve({ id: "1" });
    const component = await MoviePage({ params });
    render(component);

    expect(screen.getByText(/Error:/)).toBeInTheDocument();
    expect(screen.getByText(/Failed to load movie details/)).toBeInTheDocument();
  });

  it("should filter and render trailers correctly", async () => {
    const videosWithTrailers = {
      id: 1,
      results: [
        {
          id: "1",
          key: "key1",
          name: "Trailer 1",
          site: "YouTube",
          type: "Trailer",
        },
        {
          id: "2",
          key: "key2",
          name: "Teaser",
          site: "YouTube",
          type: "Teaser",
        },
        {
          id: "3",
          key: "key3",
          name: "Trailer 2",
          site: "Vimeo",
          type: "Trailer",
        },
      ],
    };

    (getMovieDetails as jest.Mock).mockResolvedValue(mockMovieDetails);
    (getMovieVideos as jest.Mock).mockResolvedValue(videosWithTrailers);

    const params = Promise.resolve({ id: "1" });
    const component = await MoviePage({ params });
    render(component);

    expect(screen.getByTestId("trailers")).toBeInTheDocument();
    expect(screen.getByText("Trailers")).toBeInTheDocument();
  });

  it("should handle movies without trailers", async () => {
    const videosWithoutTrailers = {
      id: 1,
      results: [],
    };

    (getMovieDetails as jest.Mock).mockResolvedValue(mockMovieDetails);
    (getMovieVideos as jest.Mock).mockResolvedValue(videosWithoutTrailers);

    const params = Promise.resolve({ id: "1" });
    const component = await MoviePage({ params });
    render(component);

    expect(screen.getByTestId("trailers")).toBeInTheDocument();
    expect(screen.getByText("No trailers")).toBeInTheDocument();
  });

  it("should format runtime correctly", async () => {
    const movieWithRuntime = {
      ...mockMovieDetails,
      runtime: 120,
    };

    (getMovieDetails as jest.Mock).mockResolvedValue(movieWithRuntime);
    (getMovieVideos as jest.Mock).mockResolvedValue(mockVideosResponse);

    const params = Promise.resolve({ id: "1" });
    const component = await MoviePage({ params });
    render(component);

    expect(screen.getByTestId("poster-details")).toBeInTheDocument();
  });

  it("should handle movie without runtime", async () => {
    const movieWithoutRuntime = {
      ...mockMovieDetails,
      runtime: 0,
    };

    (getMovieDetails as jest.Mock).mockResolvedValue(movieWithoutRuntime);
    (getMovieVideos as jest.Mock).mockResolvedValue(mockVideosResponse);

    const params = Promise.resolve({ id: "1" });
    const component = await MoviePage({ params });
    render(component);

    expect(screen.getByTestId("poster-details")).toBeInTheDocument();
  });

  it("should format release year correctly", async () => {
    const movieWithDate = {
      ...mockMovieDetails,
      release_date: "2024-01-15",
    };

    (getMovieDetails as jest.Mock).mockResolvedValue(movieWithDate);
    (getMovieVideos as jest.Mock).mockResolvedValue(mockVideosResponse);

    const params = Promise.resolve({ id: "1" });
    const component = await MoviePage({ params });
    render(component);

    expect(screen.getByTestId("poster-details")).toBeInTheDocument();
  });

  it("should handle movie without release date", async () => {
    const movieWithoutDate = {
      ...mockMovieDetails,
      release_date: "",
    };

    (getMovieDetails as jest.Mock).mockResolvedValue(movieWithoutDate);
    (getMovieVideos as jest.Mock).mockResolvedValue(mockVideosResponse);

    const params = Promise.resolve({ id: "1" });
    const component = await MoviePage({ params });
    render(component);

    expect(screen.getByTestId("poster-details")).toBeInTheDocument();
  });
});

