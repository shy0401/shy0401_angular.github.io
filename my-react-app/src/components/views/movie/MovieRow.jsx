import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieRow = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
    };

    fetchData();
  }, [fetchUrl]);

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div className="movie-row__list">
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
