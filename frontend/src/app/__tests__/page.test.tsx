import { render, screen } from "@/__tests__/test-utils";
import Home from "../page";
import { getPopularMovies } from "@/lib/api";
import { mockMoviesResponse } from "@/__tests__/mocks/tmdb-api";
import { Movie } from "@/types/movie";

// Mock the API function
jest.mock("@/lib/api", () => ({
  getPopularMovies: jest.fn(),
}));

// Mock the components
jest.mock("@/components/common/Header", () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <header>{title}</header>,
}));

jest.mock("@/components/home/MoviesList", () => ({
  __esModule: true,
  default: ({ movies, error }: { movies: Movie[]; error: string | null }) => (
    <div>
      {error && <div data-testid="error">{error}</div>}
      {movies.length > 0 && (
        <ul data-testid="movies-list">
          {movies.map((movie: Movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      )}
    </div>
  ),
}));

describe("Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render header with correct title", async () => {
    (getPopularMovies as jest.Mock).mockResolvedValue(mockMoviesResponse);

    const component = await Home();
    render(component);

    expect(screen.getByText("Pop Movies")).toBeInTheDocument();
  });

  it("should render movies list when data is fetched successfully", async () => {
    (getPopularMovies as jest.Mock).mockResolvedValue(mockMoviesResponse);

    const component = await Home();
    render(component);

    expect(screen.getByTestId("movies-list")).toBeInTheDocument();
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
  });

  it("should render error message when API call fails", async () => {
    (getPopularMovies as jest.Mock).mockRejectedValue(new Error("API Error"));

    const component = await Home();
    render(component);

    expect(screen.getByTestId("error")).toBeInTheDocument();
    expect(screen.getByText("API Error")).toBeInTheDocument();
  });

  it("should render error message with default text when error is not an Error instance", async () => {
    (getPopularMovies as jest.Mock).mockRejectedValue("String error");

    const component = await Home();
    render(component);

    expect(screen.getByTestId("error")).toBeInTheDocument();
    expect(screen.getByText("Failed to load movies")).toBeInTheDocument();
  });

  it("should render empty movies list when API returns empty results", async () => {
    (getPopularMovies as jest.Mock).mockResolvedValue({
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 0,
    });

    const component = await Home();
    render(component);

    expect(screen.queryByTestId("movies-list")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
  });
});
