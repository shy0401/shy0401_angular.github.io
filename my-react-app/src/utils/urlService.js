export const getURL4PopularMovies = (apiKey) =>
  `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

export const getURL4ReleaseMovies = (apiKey) =>
  `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;

export const getURL4GenreMovies = (apiKey, genreId) =>
  `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`;

export const fetchFeaturedMovie = async (apiKey) => {
  const response = await fetch(getURL4PopularMovies(apiKey));
  const data = await response.json();
  return data.results[0]; // 첫 번째 인기 영화를 가져옴
};
