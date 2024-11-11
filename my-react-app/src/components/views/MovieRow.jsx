import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MovieRow.css';

const MovieRow = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(fetchUrl);
        setMovies(response.data.results || []);
      } catch (err) {
        console.error(`Error fetching movies for ${title}:`, err);
        setError('Failed to load movies.');
      } finally {
        setLoading(false);
      }
    };

    if (fetchUrl) {
      fetchMovies();
    }
  }, [fetchUrl]);

  if (loading) {
    return <p>Loading {title}...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!movies || movies.length === 0) {
    return <p>No movies available for {title}.</p>;
  }

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div className="movie-row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className="movie-row__poster"
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
