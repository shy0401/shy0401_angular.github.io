import React, { useState, useEffect, useCallback } from 'react';
import './MovieGrid.css';
import axios from 'axios';

const MovieGrid = ({ fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowSize, setRowSize] = useState(4);
  const [moviesPerPage, setMoviesPerPage] = useState(20);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    fetchMovies();
    calculateLayout();
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      calculateLayout();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const calculateLayout = useCallback(() => {
    const containerWidth = window.innerWidth;
    const movieCardWidth = isMobile ? 90 : 200;
    const horizontalGap = isMobile ? 10 : 15;

    setRowSize(Math.floor(containerWidth / (movieCardWidth + horizontalGap)));
  }, [isMobile]);

  const visibleMovies = () => {
    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    return movies.slice(startIndex, endIndex);
  };

  return (
    <div className="movie-grid">
      <div className="grid-container">
        {visibleMovies().map((movie, index) => (
          <div key={movie.id} className="movie-card">
            <div className="movie-rank">{index + 1}</div>
            <img
              className="movie-poster"
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-title">{movie.title}</div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
          이전
        </button>
        <span>
          {currentPage} / {Math.ceil(movies.length / moviesPerPage)}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(movies.length / moviesPerPage)))
          }
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default MovieGrid;
