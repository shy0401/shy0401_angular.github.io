export const getURL4PopularMovies = (apiKey) =>
  `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

export const getURL4HotKoreanMovies = (apiKey, region = "KR", language = "ko-KR") =>
  `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&region=${region}&language=${language}`;

export const getURL4HotAmericanSeries = (apiKey, region = "US", language = "en-US") =>
  `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&region=${region}&language=${language}`;

export const getURL4WeeklyPopularAnimations = (apiKey, genreId = 16, language = "ja-JP") =>
  `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=${language}&sort_by=popularity.desc&time_window=week`;

export const getURL4TopRatedMovies = (apiKey, language = "ko-KR") =>
  `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=${language}`;

export const fetchFeaturedMovie = async (apiKey) => {
  const response = await fetch(getURL4PopularMovies(apiKey));
  const data = await response.json();
  return data.results[0]; // 첫 번째 인기 영화를 가져옴
};
