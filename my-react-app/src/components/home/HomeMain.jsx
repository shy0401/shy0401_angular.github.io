import React, { useEffect, useState } from "react";
import styles from "./HomeMain.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Banner from "../Banner";
import { getURL4PopularMovies, fetchFeaturedMovie } from "../../utils/urlService";

const HomeMain = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = localStorage.getItem("TMDb-Key") || "3b69d346c90eb9c0833ba5bf46603608";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const featured = await fetchFeaturedMovie(apiKey);
        const popularResponse = await fetch(getURL4PopularMovies(apiKey));
        const popularData = await popularResponse.json();

        if (!featured || !popularData.results) {
          throw new Error("Failed to fetch data");
        }

        setFeaturedMovie(featured);
        setPopularMovies(popularData.results.slice(0, 10));
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
      alert("이미 위시리스트에 추가된 영화입니다.");
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <FontAwesomeIcon icon={faSpinner} spin /> Loading...
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.homeMain}>
      {featuredMovie && <Banner movie={featuredMovie} />}
      <div className={styles.section}>
        <h2>인기 영화</h2>
        <div className={styles.movieGrid}>
          {popularMovies.map((movie) => (
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
              <div className={styles.movieInfo}>
                <h3 className={styles.movieTitle}>{movie.title}</h3>
                <p className={styles.rating}>평점: {movie.vote_average}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeMain;
