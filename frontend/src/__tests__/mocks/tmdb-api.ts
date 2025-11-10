import { MoviesResponse, MovieDetails, VideosResponse } from '@/types/movie';

export const mockMovie: MoviesResponse['results'][0] = {
  id: 1,
  title: 'Test Movie',
  overview: 'Test overview',
  poster_path: '/test-poster.jpg',
  release_date: '2024-01-01',
  vote_average: 8.5,
  vote_count: 1000,
};

export const mockMoviesResponse: MoviesResponse = {
  page: 1,
  results: [mockMovie],
  total_pages: 1,
  total_results: 1,
};

export const mockMovieDetails: MovieDetails = {
  id: 1,
  title: 'Test Movie',
  overview: 'Test overview',
  poster_path: '/test-poster.jpg',
  release_date: '2024-01-01',
  vote_average: 8.5,
  vote_count: 1000,
  runtime: 120,
  genres: [{ id: 1, name: 'Action' }],
  production_companies: [{ id: 1, name: 'Test Studio' }],
};

export const mockVideosResponse: VideosResponse = {
  id: 1,
  results: [
    {
      id: '1',
      key: 'test-key',
      name: 'Test Trailer',
      site: 'YouTube',
      type: 'Trailer',
    },
  ],
};

