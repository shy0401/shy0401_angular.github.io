import React, { useState, useEffect, useRef } from 'react';
import './MovieInfiniteScroll.css';
import axios from 'axios';

const MovieInfiniteScroll = ({ apiKey, genreCode, sortingOrder, voteEverage }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadingTriggerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchMovies();
        }
      },
      { rootMargin: '100px' }
    );
    if (loadingTriggerRef.current) {
      observer.observe(loadingTriggerRef.current);
    }
    return () => {
      if (loadingTriggerRef.current) observer.disconnect();
    };
  }, [isLoading, hasMore]);

  const fetchMovies = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const url =
        genreCode === '0'
          ? 'https://api.themoviedb.org/3/movie/popular'
          : 'https://api.themoviedb.org/3/discover/movie';

      const params = {
        api_key: apiKey,
        language: 'ko-KR',
        page: currentPage,
        with_genres: genreCode !== '0' ? genreCode : undefined,
      };

      const response = await axios.get(url, { params });
      const newMovies = response.data.results;

      if (newMovies.length > 0) {
        setMovies((prev) => [...prev, ...newMovies]);
        setCurrentPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="movie-infinite-scroll">
      <div className="grid-container">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              loading="lazy"
            />
            <div className="movie-title">{movie.title}</div>
          </div>
        ))}
      </div>
      <div ref={loadingTriggerRef} className="loading-trigger">
        {isLoading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <span>Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieInfiniteScroll;
