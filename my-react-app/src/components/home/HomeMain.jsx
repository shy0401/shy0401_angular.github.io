import React, { useEffect, useState } from 'react';
import Banner from '../Banner';
import MovieRow from '../views/movie/MovieRow';
import { getURL4PopularMovies, getURL4ReleaseMovies, getURL4GenreMovies, fetchFeaturedMovie } from '../../utils/urlService';
import './home-main.css';

const HomeMain = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [popularMoviesUrl, setPopularMoviesUrl] = useState('');
  const [newReleasesUrl, setNewReleasesUrl] = useState('');
  const [actionMoviesUrl, setActionMoviesUrl] = useState('');
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  const apiKey = localStorage.getItem('3b69d346c90eb9c0833ba5bf46603608') || '';

  useEffect(() => {
    // 유효한 API 키가 없을 경우 처리
    if (!apiKey) {
      setError('API Key is missing. Please set a valid TMDb API Key.');
      setLoading(false);
      return;
    }

    // URLs 설정
    setPopularMoviesUrl(getURL4PopularMovies(apiKey));
    setNewReleasesUrl(getURL4ReleaseMovies(apiKey));
    setActionMoviesUrl(getURL4GenreMovies(apiKey, '28'));

    const loadFeaturedMovie = async () => {
      try {
        const movie = await fetchFeaturedMovie(apiKey);
        if (!movie) {
          setError('Failed to fetch the featured movie.');
        } else {
          setFeaturedMovie(movie);
        }
      } catch (err) {
        console.error('Error loading featured movie:', err);
        setError('Error loading featured movie.');
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedMovie();
  }, [apiKey]);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.app-header');
      if (window.scrollY > 50) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
      <div className="home">
        <Banner movie={featuredMovie} />
        <MovieRow title="인기 영화" fetchUrl={popularMoviesUrl} />
        <MovieRow title="최신 영화" fetchUrl={newReleasesUrl} />
        <MovieRow title="액션 영화" fetchUrl={actionMoviesUrl} />
      </div>
  );
};

export default HomeMain;
