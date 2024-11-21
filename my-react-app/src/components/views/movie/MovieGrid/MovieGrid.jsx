import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // PropTypes 추가
import './MovieGrid.css';
import axios from 'axios';

const MovieGrid = ({ fetchUrl, title }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(fetchUrl);
        if (response.data && response.data.results) {
          setMovies(response.data.results);
        } else {
          throw new Error('No movies found.');
        }
      } catch (err) {
        console.error('Error fetching movies:', err.message);
        setError('영화를 불러오는 중 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [fetchUrl]);

  if (loading) {
    return <div className="loading">영화를 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="movie-slider">
      <h2>{title || '영화 목록'}</h2>
      <div className="movie-container">
        {movies.map((movie, index) => (
          <div key={movie.id} className="movie-card">
            <div className="movie-rank">{index + 1}</div>
            <img
              className="movie-poster"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : 'https://via.placeholder.com/140x196?text=No+Image'
              }
              alt={movie.title || 'No Title'}
            />
            <div className="movie-title">{movie.title || 'Untitled'}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// PropTypes 설정
MovieGrid.propTypes = {
  fetchUrl: PropTypes.string.isRequired, // 필수 URL
  title: PropTypes.string, // 선택적 제목
};

export default MovieGrid;
