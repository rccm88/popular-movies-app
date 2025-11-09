import { MoviesResponse } from '@/types/movie';

const API_BASE_URL = 'https://api.themoviedb.org/3';

export async function getPopularMovies(): Promise<MoviesResponse> {
  const apiKey = process.env.THE_MOVIE_DB_API_KEY;
  
  if (!apiKey) {
    throw new Error('THE_MOVIE_DB_API_KEY is not set');
  }

  const response = await fetch(
    `${API_BASE_URL}/movie/popular?api_key=${apiKey}`,
    {
      next: { revalidate: 3600 }, // Revalidate every hour
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }

  return response.json();
}

export async function getTopRatedMovies(): Promise<MoviesResponse> {
  const apiKey = process.env.THE_MOVIE_DB_API_KEY;
  
  if (!apiKey) {
    throw new Error('THE_MOVIE_DB_API_KEY is not set');
  }

  const response = await fetch(
    `${API_BASE_URL}/movie/top_rated?api_key=${apiKey}`,
    {
      next: { revalidate: 3600 }, // Revalidate every hour
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch top rated movies');
  }

  return response.json();
}

export async function getMovieDetails(movieId: number) {
  const apiKey = process.env.THE_MOVIE_DB_API_KEY;
  
  if (!apiKey) {
    throw new Error('THE_MOVIE_DB_API_KEY is not set');
  }

  const response = await fetch(
    `${API_BASE_URL}/movie/${movieId}?api_key=${apiKey}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }

  return response.json();
}

export async function getMovieVideos(movieId: number) {
  const apiKey = process.env.THE_MOVIE_DB_API_KEY;
  
  if (!apiKey) {
    throw new Error('THE_MOVIE_DB_API_KEY is not set');
  }

  const response = await fetch(
    `${API_BASE_URL}/movie/${movieId}/videos?api_key=${apiKey}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch movie videos');
  }

  return response.json();
}

