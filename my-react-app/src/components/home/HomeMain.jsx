import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faStar } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Banner from '../Banner';
import MovieRow from '../views/movie/MovieRow';
import {
  getURL4PopularMovies,
  getURL4ReleaseMovies,
  getURL4GenreMovies,
  fetchFeaturedMovie,
} from '../../utils/urlService';
import './home-main.css';

const HomeMain = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [popularMoviesUrl, setPopularMoviesUrl] = useState('');
  const [newReleasesUrl, setNewReleasesUrl] = useState('');
  const [actionMoviesUrl, setActionMoviesUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState(
    JSON.parse(localStorage.getItem('recommendedMovies')) || []
  );

  const apiKey = localStorage.getItem('TMDb-Key') || '3b69d346c90eb9c0833ba5bf46603608'; // Use default API key if not present

  useEffect(() => {
    if (!apiKey) {
      setError('API Key is missing. Please set a valid TMDb API Key.');
      setLoading(false);
      return;
    }

    setPopularMoviesUrl(getURL4PopularMovies(apiKey));
    setNewReleasesUrl(getURL4ReleaseMovies(apiKey));
    setActionMoviesUrl(getURL4GenreMovies(apiKey, '28'));

    const loadFeaturedMovie = async () => {
      try {
        const movie = await fetchFeaturedMovie(apiKey);
        if (!movie) {
          throw new Error('Failed to fetch the featured movie.');
        }
        setFeaturedMovie(movie);
      } catch (err) {
        console.error('Error fetching featured movie:', err);
        setError('Error loading the featured movie. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedMovie();
  }, [apiKey]);

  const toggleRecommendation = (movie) => {
    const updatedRecommendations = recommendedMovies.some((m) => m.id === movie.id)
      ? recommendedMovies.filter((m) => m.id !== movie.id)
      : [...recommendedMovies, movie];

    setRecommendedMovies(updatedRecommendations);
    localStorage.setItem('recommendedMovies', JSON.stringify(updatedRecommendations));
  };

  if (loading) {
    return (
      <div className="loading">
        <FontAwesomeIcon icon={faSpinner} spin /> Loading...
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home-main">
      <Banner movie={featuredMovie} />
      <MovieRow
        title="인기 영화"
        fetchUrl={popularMoviesUrl}
        onMovieClick={toggleRecommendation}
        recommendedMovies={recommendedMovies}
      />
      <MovieRow
        title="최신 영화"
        fetchUrl={newReleasesUrl}
        onMovieClick={toggleRecommendation}
        recommendedMovies={recommendedMovies}
      />
      <MovieRow
        title="액션 영화"
        fetchUrl={actionMoviesUrl}
        onMovieClick={toggleRecommendation}
        recommendedMovies={recommendedMovies}
      />
    </div>
  );
};

export default HomeMain;
