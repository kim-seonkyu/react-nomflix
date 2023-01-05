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
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  otal_pages: number;
  otal_results: number;
}

export function getNowPlayingMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}${LANGUAGE_REGION}`
  ).then((response) => response.json());
}

export function getUpComingMovies() {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}${LANGUAGE_REGION}`
  ).then((response) => response.json());
}
