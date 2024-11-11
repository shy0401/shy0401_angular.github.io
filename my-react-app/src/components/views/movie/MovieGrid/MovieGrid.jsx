import React, { useState, useEffect, useCallback } from 'react';
import './MovieGrid.css';
import axios from 'axios';

const MovieGrid = ({ fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowSize, setRowSize] = useState(4);
  const [moviesPerPage, setMoviesPerPage] = useState(20);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [currentView, setCurrentView] = useState('grid');

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
      const totalMoviesNeeded = 120;
      const numberOfPages = Math.ceil(totalMoviesNeeded / 20);
      let allMovies = [];

      for (let page = 1; page <= numberOfPages; page++) {
        const response = await axios.get(fetchUrl, {
          params: { page, per_page: moviesPerPage },
        });
        allMovies = [...allMovies, ...response.data.results];
      }

      setMovies(allMovies.slice(0, totalMoviesNeeded));
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const calculateLayout = useCallback(() => {
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight - 50; // Adjust based on container height
    const movieCardWidth = isMobile ? 90 : 200;
    const movieCardHeight = isMobile ? 150 : 220;
    const horizontalGap = isMobile ? 10 : 15;
    const verticalGap = -10;

    setRowSize(Math.floor(containerWidth / (movieCardWidth + horizontalGap)));
    const maxRows = Math.floor(containerHeight / (movieCardHeight + verticalGap));
    setMoviesPerPage(rowSize * maxRows);
  }, [isMobile, rowSize]);

  const visibleMovieGroups = () => {
    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const paginatedMovies = movies.slice(startIndex, endIndex);

    return paginatedMovies.reduce((resultArray, item, index) => {
      const groupIndex = Math.floor(index / rowSize);
      if (!resultArray[groupIndex]) {
        resultArray[groupIndex] = [];
      }
      resultArray[groupIndex].push(item);
      return resultArray;
    }, []);
  };

  return (
    <div className="movie-grid">
      <div className={`grid-container ${currentView}`}>
        {visibleMovieGroups().map((movieGroup, i) => (
          <div
            key={i}
            className={`movie-row ${movieGroup.length === rowSize ? 'full' : ''}`}
          >
            {movieGroup.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
                <div className="movie-title">{movie.title}</div>
              </div>
            ))}
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
