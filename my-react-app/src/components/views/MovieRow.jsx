import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const MovieRow = ({ title, fetchUrl }) => {
  const gridContainerRef = useRef(null); // 컨테이너 참조
  const [movies, setMovies] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(fetchUrl);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchData();
  }, [fetchUrl]);

  // 화면 크기 변경 시 모바일 여부 업데이트
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="movie-row" ref={gridContainerRef}>
      <h2>{title}</h2>
      <div className={`movie-row__list ${isMobile ? 'mobile' : ''}`}>
        {movies.map((movie) => (
          <div key={movie.id} className="movie-row__item">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-row__title">{movie.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
