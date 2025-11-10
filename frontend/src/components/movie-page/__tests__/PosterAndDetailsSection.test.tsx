import { render, screen, waitFor } from '@/__tests__/test-utils';
import userEvent from '@testing-library/user-event';
import PosterAndDetailsSection from '../PosterAndDetailsSection';

// Mock fetch
globalThis.fetch = jest.fn();

describe('PosterAndDetailsSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset fetch mock - ensure it returns a promise
    (globalThis.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({ isFavorited: false }),
      })
    );
  });

  const defaultProps = {
    movieId: 1,
    posterPath: '/test-poster.jpg',
    title: 'Test Movie',
    releaseYear: '2024',
    runtime: '120 mins',
    rating: '8.5',
    releaseDate: '2024-01-01',
  };

  it('should render movie details', () => {
    render(<PosterAndDetailsSection {...defaultProps} />);
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('120 mins')).toBeInTheDocument();
    expect(screen.getByText('8.5/10')).toBeInTheDocument();
  });

  it('should render poster when posterPath is provided', () => {
    render(<PosterAndDetailsSection {...defaultProps} />);
    const image = screen.getByAltText('Test Movie');
    expect(image).toBeInTheDocument();
  });

  it('should not render poster when posterPath is null', () => {
    render(<PosterAndDetailsSection {...defaultProps} posterPath={null} />);
    const image = screen.queryByAltText('Test Movie');
    expect(image).not.toBeInTheDocument();
  });

  it('should check favorite status on mount', async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ isFavorited: false }),
    });

    render(<PosterAndDetailsSection {...defaultProps} />);

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith('/api/favorites/1');
    });
  });

  it('should show "Add to Favorite" button when not favorited', async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ isFavorited: false }),
    });

    render(<PosterAndDetailsSection {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText('Add to Favorite')).toBeInTheDocument();
    });
  });

  it('should show "Remove from Favorites" button when favorited', async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ isFavorited: true }),
    });

    render(<PosterAndDetailsSection {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText('Remove from Favorites')).toBeInTheDocument();
    });
  });

  it('should add to favorites when button is clicked', async () => {
    const user = userEvent.setup();
    (globalThis.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ isFavorited: false }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

    render(<PosterAndDetailsSection {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText('Add to Favorite')).toBeInTheDocument();
    });

    const button = screen.getByText('Add to Favorite');
    await user.click(button);

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movie_id: 1,
          title: 'Test Movie',
          poster_path: '/test-poster.jpg',
          release_date: '2024-01-01',
          vote_average: 8.5,
        }),
      });
    });
  });

  it('should remove from favorites when button is clicked', async () => {
    const user = userEvent.setup();
    (globalThis.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ isFavorited: true }),
      })
      .mockResolvedValueOnce({
        ok: true,
      });

    render(<PosterAndDetailsSection {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText('Remove from Favorites')).toBeInTheDocument();
    });

    const button = screen.getByText('Remove from Favorites');
    await user.click(button);

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        '/api/favorites?movie_id=1',
        {
          method: 'DELETE',
        }
      );
    });
  });

  it('should show loading state when toggling favorite', async () => {
    const user = userEvent.setup();
    (globalThis.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ isFavorited: false }),
      })
      .mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                ok: true,
                json: async () => ({}),
              });
            }, 100);
          })
      );

    render(<PosterAndDetailsSection {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText('Add to Favorite')).toBeInTheDocument();
    });

    const button = screen.getByText('Add to Favorite');
    await user.click(button);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should disable button when loading', async () => {
    const user = userEvent.setup();
    (globalThis.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ isFavorited: false }),
      })
      .mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                ok: true,
                json: async () => ({}),
              });
            }, 100);
          })
      );

    render(<PosterAndDetailsSection {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText('Add to Favorite')).toBeInTheDocument();
    });

    const button = screen.getByRole('button', { name: /Add to Favorite/i });
    await user.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
    });
  });
});

