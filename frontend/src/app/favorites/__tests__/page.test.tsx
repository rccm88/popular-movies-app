import { render, screen } from "@/__tests__/test-utils";
import FavoritesPage from "../page";
import { getDb } from "@/lib/db";
import { Movie } from "@/types/movie";

// Mock the database
jest.mock("@/lib/db", () => ({
  getDb: jest.fn(),
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
      {movies.length === 0 && !error && (
        <div data-testid="empty-state">No favorites</div>
      )}
    </div>
  ),
}));

describe("Favorites Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render header with correct title and back button", () => {
    const mockDb = {
      prepare: jest.fn(() => ({
        all: jest.fn(() => []),
      })),
    };
    (getDb as jest.Mock).mockReturnValue(mockDb);

    const component = FavoritesPage();
    render(component);

    expect(screen.getByText("Favorites")).toBeInTheDocument();
    expect(screen.getByTestId("back-button")).toBeInTheDocument();
  });

  it("should render favorites list when favorites exist", () => {
    const mockFavorites = [
      {
        id: 1,
        movie_id: 1,
        title: "Favorite Movie 1",
        poster_path: "/poster1.jpg",
        release_date: "2024-01-01",
        vote_average: 8.5,
        created_at: "2024-01-01T00:00:00Z",
      },
      {
        id: 2,
        movie_id: 2,
        title: "Favorite Movie 2",
        poster_path: "/poster2.jpg",
        release_date: "2024-02-01",
        vote_average: 7.5,
        created_at: "2024-02-01T00:00:00Z",
      },
    ];

    const mockDb = {
      prepare: jest.fn(() => ({
        all: jest.fn(() => mockFavorites),
      })),
    };
    (getDb as jest.Mock).mockReturnValue(mockDb);

    const component = FavoritesPage();
    render(component);

    expect(screen.getByTestId("movies-list")).toBeInTheDocument();
    expect(screen.getByText("Favorite Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Favorite Movie 2")).toBeInTheDocument();
  });

  it("should render empty state when no favorites exist", () => {
    const mockDb = {
      prepare: jest.fn(() => ({
        all: jest.fn(() => []),
      })),
    };
    (getDb as jest.Mock).mockReturnValue(mockDb);

    const component = FavoritesPage();
    render(component);

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    expect(screen.queryByTestId("movies-list")).not.toBeInTheDocument();
  });

  it("should render error message when database query fails", () => {
    const mockDb = {
      prepare: jest.fn(() => {
        throw new Error("Database error");
      }),
    };
    (getDb as jest.Mock).mockReturnValue(mockDb);

    const component = FavoritesPage();
    render(component);

    expect(screen.getByTestId("error")).toBeInTheDocument();
    expect(screen.getByText("Database error")).toBeInTheDocument();
  });

  it("should render error message with default text when error is not an Error instance", () => {
    const mockDb = {
      prepare: jest.fn(() => {
        throw "String error";
      }),
    };
    (getDb as jest.Mock).mockReturnValue(mockDb);

    const component = FavoritesPage();
    render(component);

    expect(screen.getByTestId("error")).toBeInTheDocument();
    expect(screen.getByText("Failed to load favorites")).toBeInTheDocument();
  });

  it("should map favorites to Movie format correctly", () => {
    const mockFavorites = [
      {
        id: 1,
        movie_id: 123,
        title: "Test Movie",
        poster_path: "/test-poster.jpg",
        release_date: "2024-01-01",
        vote_average: 8.5,
        created_at: "2024-01-01T00:00:00Z",
      },
    ];

    const mockDb = {
      prepare: jest.fn(() => ({
        all: jest.fn(() => mockFavorites),
      })),
    };
    (getDb as jest.Mock).mockReturnValue(mockDb);

    const component = FavoritesPage();
    render(component);

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
  });

  it("should handle null values in favorite data", () => {
    const mockFavorites = [
      {
        id: 1,
        movie_id: 123,
        title: "Test Movie",
        poster_path: null,
        release_date: null,
        vote_average: null,
        created_at: "2024-01-01T00:00:00Z",
      },
    ];

    const mockDb = {
      prepare: jest.fn(() => ({
        all: jest.fn(() => mockFavorites),
      })),
    };
    (getDb as jest.Mock).mockReturnValue(mockDb);

    const component = FavoritesPage();
    render(component);

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
  });
});
