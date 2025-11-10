import { render, screen } from "@/__tests__/test-utils";
import MoviesList from "../MoviesList";
import { Movie } from "@/types/movie";

const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Movie 1",
    overview: "Overview 1",
    poster_path: "/poster1.jpg",
    release_date: "2024-01-01",
    vote_average: 8.5,
    vote_count: 1000,
  },
  {
    id: 2,
    title: "Movie 2",
    overview: "Overview 2",
    poster_path: "/poster2.jpg",
    release_date: "2024-02-01",
    vote_average: 7.5,
    vote_count: 500,
  },
];

describe("MoviesList", () => {
  it("should render error message when error is provided", () => {
    render(<MoviesList movies={[]} error="Test error" />);
    expect(screen.getByText("Error: Test error")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Please make sure THE_MOVIE_DB_API_KEY is set in your .env.local file"
      )
    ).toBeInTheDocument();
  });

  it("should not render error when error is null", () => {
    render(<MoviesList movies={mockMovies} error={null} />);
    expect(screen.queryByText(/Error:/)).not.toBeInTheDocument();
  });

  it("should render movies list when movies are provided", () => {
    render(<MoviesList movies={mockMovies} error={null} />);
    // Movie titles are in alt attributes, not as text
    expect(screen.getByAltText("Movie 1")).toBeInTheDocument();
    expect(screen.getByAltText("Movie 2")).toBeInTheDocument();
  });

  it("should render movie posters", () => {
    render(<MoviesList movies={mockMovies} error={null} />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute("alt", "Movie 1");
    expect(images[1]).toHaveAttribute("alt", "Movie 2");
  });

  it("should render links to movie detail pages", () => {
    render(<MoviesList movies={mockMovies} error={null} />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/movie/1");
    expect(links[1]).toHaveAttribute("href", "/movie/2");
  });

  it("should not render movies list when movies array is empty", () => {
    render(<MoviesList movies={[]} error={null} />);
    const list = screen.queryByRole("list");
    expect(list).not.toBeInTheDocument();
  });

  it("should render movies with priority for first two", () => {
    render(<MoviesList movies={mockMovies} error={null} />);
    const images = screen.getAllByRole("img");
    // Note: priority is a prop on Next.js Image, we can't easily test it
    // but we can verify images are rendered
    expect(images).toHaveLength(2);
  });

  it("should handle movies without poster_path", () => {
    const moviesWithoutPoster: Movie[] = [
      {
        ...mockMovies[0],
        poster_path: null,
      },
    ];
    render(<MoviesList movies={moviesWithoutPoster} error={null} />);
    // Movie should still be in the list, but without image
    const images = screen.queryAllByRole("img");
    expect(images).toHaveLength(0);
  });
});
