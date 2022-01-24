const BASE_PATH = "https://api.themoviedb.org/3"
export const API_KEY = "0549c16bd6c6068c3aac7f7eb2bb7d89";

export interface IMovie {
  name: string;
  adult: false;
  first_air_date: string;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: false
  vote_average: number;
  vote_count: number;
  genres: {
    name: string;
  };
  production_companies: {
    name: string;
    logo_path: string | null;
  }
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function getMoviesNowPlaying() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(res => res.json());
}
export function getMoviesTopRated() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(res => res.json());
}
export function getMoviesUpcoming() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(res => res.json());
}
export function getMoviesSearch(query: string) {
  return fetch(`${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${query}`).then(res => res.json());
}
export function getTVTopRated() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(res => res.json());
}
export function getTVLastest() {
  return fetch(`${BASE_PATH}/tv/latest?api_key=${API_KEY}`).then(res => res.json());
}
export function getTVAiringToday() {
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then(res => res.json());
}
export function getTVPopular() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then(res => res.json());
}

export function getTVSearch(query: string) {
  return fetch(`${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${query}`).then(res => res.json());
}