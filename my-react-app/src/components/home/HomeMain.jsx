import React, { useEffect, useState } from "react";
import styles from "./HomeMain.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Banner from "../Banner";
import {
  getURL4PopularMovies,
  getURL4HotKoreanMovies,
  getURL4HotAmericanSeries,
  getURL4WeeklyPopularAnimations,
  getURL4TopRatedMovies,
  fetchFeaturedMovie,
} from "../../utils/urlService";

const HomeMain = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [popularMovies, setPopularMovies] = useState([]);
  const [hotKoreanMovies, setHotKoreanMovies] = useState([]);
  const [hotAmericanSeries, setHotAmericanSeries] = useState([]);
  const [weeklyPopularAnimations, setWeeklyPopularAnimations] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = localStorage.getItem("TMDb-Key") || "3b69d346c90eb9c0833ba5bf46603608";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const featured = await fetchFeaturedMovie(apiKey);

        const popularResponse = fetch(getURL4PopularMovies(apiKey));
        const koreanResponse = fetch(getURL4HotKoreanMovies(apiKey));
        const americanResponse = fetch(getURL4HotAmericanSeries(apiKey));
        const animationResponse = fetch(getURL4WeeklyPopularAnimations(apiKey));
        const topRatedResponse = fetch(getURL4TopRatedMovies(apiKey));

        const [
          popularData,
          koreanData,
          americanData,
          animationData,
          topRatedData,
        ] = await Promise.all([
          popularResponse.then((res) => res.json()),
          koreanResponse.then((res) => res.json()),
          americanResponse.then((res) => res.json()),
          animationResponse.then((res) => res.json()),
          topRatedResponse.then((res) => res.json()),
        ]);

        if (
          !featured ||
          !popularData.results ||
          !koreanData.results ||
          !americanData.results ||
          !animationData.results ||
          !topRatedData.results
        ) {
          throw new Error("Failed to fetch data");
        }

        setFeaturedMovie(featured);
        setPopularMovies(popularData.results.slice(0, 10));
        setHotKoreanMovies(koreanData.results.slice(0, 10));
        setHotAmericanSeries(americanData.results.slice(0, 10));
        setWeeklyPopularAnimations(animationData.results.slice(0, 10));
        setTopRatedMovies(topRatedData.results.slice(0, 10));
      } catch (err) {
        console.error(err);
        setError("Error loading content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiKey]);

  const addToWishlist = (movie) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (!wishlist.find((item) => item.id === movie.id)) {
      wishlist.push(movie);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert(`${movie.title}이(가) 위시리스트에 추가되었습니다.`);
    } else {
      alert("이미 위시리스트에 추가된 콘텐츠입니다.");
    }
  };

  const renderSection = (title, content) => (
    <div className={styles.section}>
      <h2>{title}</h2>
      <div className={styles.movieGrid}>
        {content.map((movie, index) => (
          <div
            key={movie.id}
            className={styles.movieCard}
            onClick={() => addToWishlist(movie)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={styles.poster}
            />
            {index < 10 && (
              <div className={styles.rankBadge}>{index + 1}</div>
            )}
            <div className={styles.movieInfo}>
              <h3 className={styles.movieTitle}>{movie.title}</h3>
              <p className={styles.rating}>평점: {movie.vote_average}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className={styles.loading}>
        <FontAwesomeIcon icon={faSpinner} spin /> 로딩 중입니다...
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.homeMain}>
      {featuredMovie && <Banner movie={featuredMovie} />}
      {renderSection("인기 영화", popularMovies)}
      {renderSection("현재 핫한 한국영화", hotKoreanMovies)}
      {renderSection("현재 핫한 미국 드라마", hotAmericanSeries)}
      {renderSection("주간 인기 애니메이션", weeklyPopularAnimations)}
      {renderSection("평점이 가장 좋은 영화 TOP 10", topRatedMovies)}
    </div>
  );
};

export default HomeMain;
