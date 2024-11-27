import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import styles from "./Wishlist.module.css";

const Wishlist = () => {
  const [wishlistMovies, setWishlistMovies] = useState([]);
  const [viewMode, setViewMode] = useState("infinite"); // "table" or "infinite"
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(12);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    toast.info("위시리스트 가져오는 중...", { autoClose: 1500 }); // Toast 알림
    setTimeout(() => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlistMovies(wishlist);
      setIsLoading(false);
    }, 1000); // 로딩 시뮬레이션
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlistMovies.filter((movie) => movie.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlistMovies(updatedWishlist);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 10 &&
      !isFetching &&
      currentPage * moviesPerPage < wishlistMovies.length
    ) {
      setIsFetching(true);
    }
  };

  useEffect(() => {
    if (viewMode === "infinite") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [viewMode, isFetching, wishlistMovies]);

  useEffect(() => {
    if (isFetching && currentPage * moviesPerPage < wishlistMovies.length) {
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
        setIsFetching(false);
      }, 500); // Simulate fetch delay
    }
  }, [isFetching, currentPage, wishlistMovies.length]);

  const renderMovies = (movies) =>
    movies.map((movie) => (
      <div key={movie.id} className={styles.movieCard}>
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className={styles.poster}
          />
        ) : (
          <div className={styles.loadingPlaceholder}>
            <FontAwesomeIcon icon={faSpinner} spin />
          </div>
        )}
        <div className={styles.movieInfo}>
          <h3 className={styles.movieTitle}>{movie.title}</h3>
          <button
            className={styles.removeButton}
            onClick={() => removeFromWishlist(movie.id)}
          >
            삭제
          </button>
        </div>
      </div>
    ));

  const renderTablePagination = () => {
    const totalPages = Math.ceil(wishlistMovies.length / moviesPerPage);
    const moviesToDisplay = wishlistMovies.slice(
      (currentPage - 1) * moviesPerPage,
      currentPage * moviesPerPage
    );

    return (
      <>
        <div className={styles.movieGrid}>{renderMovies(moviesToDisplay)}</div>
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={styles.arrowButton}
          >
            &#8249;
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`${styles.pageButton} ${
                page === currentPage ? styles.activePage : ""
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={styles.arrowButton}
          >
            &#8250;
          </button>
        </div>
      </>
    );
  };

  const renderInfiniteScroll = () => {
    const moviesToDisplay = wishlistMovies.slice(0, currentPage * moviesPerPage);
    return (
      <>
        <div className={styles.movieGrid}>
          {isLoading ? (
            <div className={styles.loading}>
              <FontAwesomeIcon icon={faSpinner} spin /> Loading...
            </div>
          ) : (
            renderMovies(moviesToDisplay)
          )}
        </div>
        {isFetching && <div className={styles.loading}>Loading...</div>}
      </>
    );
  };

  return (
    <div className={styles.wishlistContainer}>
      <h2>위시리스트</h2>
      <div className={styles.viewModeToggle}>
        <button
          onClick={() => setViewMode("table")}
          className={viewMode === "table" ? styles.activeViewMode : ""}
        >
          테이블 뷰
        </button>
        <button
          onClick={() => setViewMode("infinite")}
          className={viewMode === "infinite" ? styles.activeViewMode : ""}
        >
          무한 스크롤
        </button>
      </div>
      {wishlistMovies.length === 0 && !isLoading ? (
        <div className={styles.emptyMessage}>위시리스트가 비어 있습니다.</div>
      ) : viewMode === "table" ? (
        renderTablePagination()
      ) : (
        renderInfiniteScroll()
      )}
      {viewMode === "infinite" && (
        <button
          className={styles.topButton}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          맨 위로
        </button>
      )}
    </div>
  );
};

export default Wishlist;
