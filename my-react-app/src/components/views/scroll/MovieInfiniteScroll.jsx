import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MovieInfiniteScroll.css';

const MovieInfiniteScroll = ({ apiKey, genreCode, sortingOrder, voteAverage }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!apiKey) return;

      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie`,
          {
            params: {
              api_key: apiKey,
              with_genres: genreCode,
              sort_by: sortingOrder === 'all' ? 'popularity.desc' : 'original_language',
              vote_average: voteAverage > 0 ? voteAverage : undefined,
              page,
            },
          }
        );
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
        setHasMore(response.data.results.length > 0);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [apiKey, genreCode, sortingOrder, voteAverage, page]);

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="movie-infinite-scroll">
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            <h4>{movie.title}</h4>
          </div>
        ))}
      </div>
      {loading && <div>Loading...</div>}
      {hasMore && !loading && (
        <button className="load-more" onClick={loadMore}>
          더 보기
        </button>
      )}
    </div>
  );
};

export default MovieInfiniteScroll;
