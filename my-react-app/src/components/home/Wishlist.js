import React, { useState, useEffect } from "react";
import styles from "./Wishlist.module.css";

const Wishlist = () => {
  const [wishlistMovies, setWishlistMovies] = useState([]);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlistMovies(wishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlistMovies.filter((movie) => movie.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlistMovies(updatedWishlist);
  };

  return (
    <div className={styles.wishlistContainer}>
      <h2>위시리스트</h2>
      {wishlistMovies.length === 0 ? (
        <div className={styles.emptyMessage}>위시리스트가 비어 있습니다.</div>
      ) : (
        <div className={styles.movieGrid}>
          {wishlistMovies.map((movie) => (
            <div key={movie.id} className={styles.movieCard}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={styles.poster}
              />
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
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
