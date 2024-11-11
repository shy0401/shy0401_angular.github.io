import React, { useState } from 'react';
import MovieSearch from './MovieSearch'; // 경로 수정
import MovieInfiniteScroll from '../views/movie/MovieInfiniteScroll/MovieInfiniteScroll'; // 경로 수정
import './MovieSearch.css'; // HomeSearch.css가 아니라 MovieSearch.css로 대체

const HomeSearch = () => {
  const [apiKey] = useState(localStorage.getItem('TMDb-Key') || '');
  const [genreId, setGenreId] = useState('28');
  const [ageId, setAgeId] = useState(-1);
  const [sortId, setSortId] = useState('all');

  const genreCode = {
    '장르 (전체)': 0,
    'Action': 28,
    'Adventure': 12,
    'Comedy': 35,
    'Crime': 80,
    'Family': 10751,
  };

  const sortingCode = {
    '언어 (전체)': 'all',
    '영어': 'en',
    '한국어': 'ko',
  };

  const ageCode = {
    '평점 (전체)': -1,
    '9~10': 9,
    '8~9': 8,
    '7~8': 7,
    '6~7': 6,
    '5~6': 5,
    '4~5': 4,
    '4점 이하': -2,
  };

  const changeOptions = (options) => {
    setGenreId(genreCode[options.originalLanguage] || '0');
    setAgeId(ageCode[options.translationLanguage] || -1);
    setSortId(sortingCode[options.sorting] || 'all');
  };

  return (
    <div className="container-search">
      <div className="container-search-bar">
        <MovieSearch changeOptions={changeOptions} />
      </div>
      <div className="content-search">
        <MovieInfiniteScroll
          apiKey={apiKey}
          genreCode={genreId}
          sortingOrder={sortId}
          voteEverage={ageId}
        />
      </div>
    </div>
  );
};

export default HomeSearch;
