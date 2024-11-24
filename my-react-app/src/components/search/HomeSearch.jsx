import React, { useState, useEffect } from 'react';
import styles from './HomeSearch.module.css';

const HomeSearch = () => {
  const [apiKey] = useState(localStorage.getItem('TMDb-Key') || '3b69d346c90eb9c0833ba5bf46603608');
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('0');
  const [language, setLanguage] = useState('ko-KR');
  const [voteAverage, setVoteAverage] = useState(0);
  const [sortBy, setSortBy] = useState('popularity.desc'); // Default: 인기순 내림차순
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const maxVisiblePages = 5;

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=${language}`
        );
        const data = await response.json();
        setGenres([{ id: '0', name: '장르 (전체)' }, ...data.genres]);
      } catch (error) {
        console.error('Failed to fetch genres:', error);
      }
    };

    fetchGenres();
  }, [apiKey, language]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const genreParam = selectedGenre !== '0' ? `&with_genres=${selectedGenre}` : '';
        const voteParam = voteAverage > 0 ? `&vote_average.gte=${voteAverage}` : '';
        const sortParam = sortBy ? `&sort_by=${sortBy}` : '';
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=${language}${genreParam}${voteParam}${sortParam}&page=${currentPage}`
        );
        const data = await response.json();
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    fetchMovies();
  }, [apiKey, selectedGenre, language, voteAverage, sortBy, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const resetFilters = () => {
    setSelectedGenre('0');
    setLanguage('ko-KR');
    setVoteAverage(0);
    setSortBy('popularity.desc');
    setCurrentPage(1);
  };

  const calculatePageNumbers = () => {
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages && start > 1) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>추천 영화 찾기</h1>
      <div className={styles.searchBar}>
        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className={styles.select}>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <select value={voteAverage} onChange={(e) => setVoteAverage(Number(e.target.value))} className={styles.select}>
          <option value="0">평점 (전체)</option>
          <option value="9">9점 이상</option>
          <option value="8">8점 이상</option>
          <option value="7">7점 이상</option>
          <option value="6">6점 이상</option>
          <option value="5">5점 이상</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={styles.select}>
          <option value="popularity.desc">인기순 (내림차순)</option>
          <option value="popularity.asc">인기순 (오름차순)</option>
          <option value="vote_average.desc">평점 (높은순)</option>
          <option value="vote_average.asc">평점 (낮은순)</option>
          <option value="release_date.desc">개봉일 (최신순)</option>
          <option value="release_date.asc">개봉일 (오래된순)</option>
        </select>
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className={styles.select}>
          <option value="ko-KR">한국어</option>
          <option value="en-US">영어</option>
          <option value="ja-JP">일본어</option>
        </select>
        <button onClick={resetFilters} className={styles.resetButton}>
          초기화
        </button>
      </div>
      <div className={styles.results}>
        {movies.length > 0 ? (
          <div className={styles.grid}>
            {movies.map((movie) => (
              <div key={movie.id} className={styles.card}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.poster}
                />
                <div className={styles.info}>
                  <h3 className={styles.movieTitle}>{movie.title}</h3>
                  <p className={styles.rating}>평점: {movie.vote_average}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.noResults}>조건에 맞는 영화가 없습니다.</p>
        )}
      </div>
      <div className={styles.pagination}>
        <button
          className={styles.arrowButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &#8249;
        </button>
        {calculatePageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`${styles.pageButton} ${page === currentPage ? styles.activePage : ''}`}
          >
            {page}
          </button>
        ))}
        <button
          className={styles.arrowButton}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default HomeSearch;
