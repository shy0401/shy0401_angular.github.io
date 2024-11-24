import React, { useState, useEffect, useRef } from "react";
import styles from "./Popular.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { getURL4PopularMovies } from "../../utils/urlService";

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("infiniteScroll"); // "table" or "infiniteScroll"
  const scrollRef = useRef(null);

  const apiKey = localStorage.getItem("TMDb-Key") || "3b69d346c90eb9c0833ba5bf46603608";

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const fetchMovies = async (pageNum) => {
    setLoading(true);
    try {
      const response = await fetch(getURL4PopularMovies(apiKey) + `&page=${pageNum}`);
      const data = await response.json();
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
    } catch (err) {
      setError("Failed to load movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      scrollRef.current &&
      window.innerHeight + window.scrollY >= scrollRef.current.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (viewMode === "infiniteScroll") {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [viewMode]);

  const switchToTableView = () => setViewMode("table");
  const switchToInfiniteScroll = () => setViewMode("infiniteScroll");

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.popularPage} ref={scrollRef}>
      <div className={styles.header}>
        <h1>대세 콘텐츠</h1>
        <div className={styles.viewModeToggle}>
          <button
            className={`${styles.toggleButton} ${
              viewMode === "infiniteScroll" ? styles.active : ""
            }`}
            onClick={switchToInfiniteScroll}
          >
            무한 스크롤
          </button>
          <button
            className={`${styles.toggleButton} ${
              viewMode === "table" ? styles.active : ""
            }`}
            onClick={switchToTableView}
          >
            Table View
          </button>
        </div>
      </div>
      {viewMode === "infiniteScroll" ? (
        <div className={styles.movieGrid}>
          {movies.map((movie) => (
            <div key={movie.id} className={styles.movieCard}>
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
          {loading && (
            <div className={styles.loading}>
              <FontAwesomeIcon icon={faSpinner} spin /> Loading...
            </div>
          )}
        </div>
      ) : (
        <table className={styles.tableView}>
          <thead>
          <tr>
            <th>포스터</th>
            <th>제목</th>
            <th>평점</th>
            <th>개봉일</th>
          </tr>
          </thead>
          <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.posterSmall}
                />
              </td>
              <td>{movie.title}</td>
              <td>{movie.vote_average}</td>
              <td>{movie.release_date}</td>
            </tr>
          ))}
          </tbody>
        </table>
      )}
      <button className={styles.scrollToTopButton} onClick={scrollToTop}>
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  );
};

export default Popular;
