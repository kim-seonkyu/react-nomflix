const API_KEY = "3717b6c632b8434e14bd5345d2d24397";
const BASE_PATH = "https://api.themoviedb.org/3";
const LANGUAGE_REGION = "&language=ko-KR&region=kr";
export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  original_title: string;
  overview: string;
  name: string;
  original_name: string;
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
// Home - nowplaying Movie
export function getNowPlayingMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}${LANGUAGE_REGION}`
  ).then((response) => response.json());
}
// Home - upcoming Movie
export function getUpComingMovies() {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}${LANGUAGE_REGION}`
  ).then((response) => response.json());
}
// Home - popular Movie
export function getPopularMovies() {
  return fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}${LANGUAGE_REGION}`
  ).then((response) => response.json());
}
// Home - top_rated Movie
export function getToprateMovies() {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}${LANGUAGE_REGION}`
  ).then((response) => response.json());
}

export interface IGenre {
  id: number;
  name: string;
}
export interface IGetDetailData {
  id: number;
  original_title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  homepage: string;
  genres: IGenre[];
  release_date?: string;
  runtime: number;
  tagline?: string;
  title?: string;
  vote_average?: number;
  number_of_seasons?: number;
  first_air_date?: string;
  last_air_date?: string;
}
// modal - detaildata
export function getDetailData(requestUrl: string, movieId: number) {
  return fetch(
    `${BASE_PATH}/${requestUrl}/${movieId}?api_key=${API_KEY}${LANGUAGE_REGION}`
  ).then((response) => response.json());
}

// TV - Airing_today
export function getAiringTodayTv() {
  return fetch(
    `${BASE_PATH}/tv/airing_today?api_key=${API_KEY}${LANGUAGE_REGION}`
  ).then((response) => response.json());
}
// TV - On The Air
export function getOnTheAirTv() {
  return fetch(
    `${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}${LANGUAGE_REGION}`
  ).then((response) => response.json());
}
// TV - Top Rate
export function getTopRateTv() {
  return fetch(
    `${BASE_PATH}/tv/top_rated?api_key=${API_KEY}${LANGUAGE_REGION}`
  ).then((response) => response.json());
}
// TV - Popular
export function getPopularTv() {
  return fetch(
    `${BASE_PATH}/tv/popular?api_key=${API_KEY}${LANGUAGE_REGION}`
  ).then((response) => response.json());
}

interface ISearch {
  id: number;
  title?: string;
  original_title?: string;
  name?: string;
  original_name?: string;
  overview: string;
  backdrop_path?: string;
  poster_path?: string;
  media_type: string;
}
export interface ISearchResult {
  page: number;
  results: ISearch[];
  total_pages: number;
  total_results: number;
}

export function getSearchData(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/multi?api_key=${API_KEY}${LANGUAGE_REGION}&query=${keyword}`
  ).then((response) => response.json());
}

interface ISearchWord {
  name: string;
  id: number;
}
export interface ISearchWords {
  page: number;
  results: ISearchWord[];
  total_pages: number;
  total_results: number;
}
export function getSearchKeyword(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/keyword?api_key=${API_KEY}&query=${keyword}`
  ).then((response) => response.json());
}
