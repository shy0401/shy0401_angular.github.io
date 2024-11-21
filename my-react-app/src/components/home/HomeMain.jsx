import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Banner from '../Banner';
import MovieGrid from '../views/movie/MovieGrid/MovieGrid';
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

  const apiKey = localStorage.getItem('TMDb-Key') || '3b69d346c90eb9c0833ba5bf46603608';

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
      <div className="section">
        <h2>인기 영화</h2>
        <MovieGrid fetchUrl={popularMoviesUrl} />
      </div>
      <div className="section">
        <h2>최신 영화</h2>
        <MovieGrid fetchUrl={newReleasesUrl} />
      </div>
      <div className="section">
        <h2>액션 영화</h2>
        <MovieGrid fetchUrl={actionMoviesUrl} />
      </div>
    </div>
  );
};

export default HomeMain;
