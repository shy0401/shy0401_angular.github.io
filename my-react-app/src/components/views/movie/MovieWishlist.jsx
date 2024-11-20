import React, { useState, useEffect, useRef } from "react";
import WishlistService from "../../services/WishlistService"; // WishlistService 경로 확인
import "./MovieWishlist.css";

const MovieWishlist = () => {
  const gridContainerRef = useRef(null);
  const [rowSize, setRowSize] = useState(4);
  const [moviesPerPage, setMoviesPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlistMovies, setWishlistMovies] = useState([]);
  const [visibleWishlistMovies, setVisibleWishlistMovies] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // WishlistService에서 wishlist 구독
  useEffect(() => {
    const subscription = WishlistService.wishlist$.subscribe({
      next: (movies) => {
        setWishlistMovies(movies);
      },
      error: (err) => {
        console.error("Error fetching wishlist movies:", err);
      },
    });

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      calculateLayout();
    };

    window.addEventListener("resize", handleResize);

    if (gridContainerRef.current) {
      calculateLayout();
    }

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // wishlistMovies 상태가 변경될 때 visibleMovies 업데이트
  useEffect(() => {
    updateVisibleMovies(wishlistMovies);
  }, [wishlistMovies, currentPage, rowSize, moviesPerPage]);

  const calculateLayout = () => {
    if (gridContainerRef.current) {
      const containerWidth = gridContainerRef.current.offsetWidth;
      const containerHeight = window.innerHeight - gridContainerRef.current.offsetTop;
      const movieCardWidth = isMobile ? 90 : 220;
      const movieCardHeight = isMobile ? 150 : 330;
      const horizontalGap = isMobile ? 10 : 15;

      const newRowSize = Math.floor(containerWidth / (movieCardWidth + horizontalGap));
      const maxRows = Math.floor(containerHeight / (movieCardHeight + 10));
      const newMoviesPerPage = newRowSize * maxRows;

      setRowSize(newRowSize);
      setMoviesPerPage(newMoviesPerPage);
    }
  };

  const updateVisibleMovies = (movies) => {
    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;

    const paginatedMovies = movies.slice(startIndex, endIndex);
    const groupedMovies = paginatedMovies.reduce((resultArray, item, index) => {
      const groupIndex = Math.floor(index / rowSize);
      if (!resultArray[groupIndex]) {
        resultArray[groupIndex] = [];
      }
      resultArray[groupIndex].push(item);
      return resultArray;
    }, []);

    setVisibleWishlistMovies(groupedMovies);
  };

  const toggleWishlist = (movie) => {
    try {
      WishlistService.toggleWishlist(movie);
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  const totalPages = Math.ceil(wishlistMovies.length / moviesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const getImageUrl = (path) => {
    return path ? `https://image.tmdb.org/t/p/w300${path}` : "/placeholder-image.jpg";
  };

  return (
    <div className="movie-grid" ref={gridContainerRef}>
      <div className={`grid-container ${isMobile ? "list" : "grid"}`}>
        {visibleWishlistMovies.map((movieGroup, i) => (
          <div key={i} className={`movie-row ${movieGroup.length === rowSize ? "full" : ""}`}>
            {movieGroup.map((movie) => (
              <div key={movie.id} className="movie-card" onClick={() => toggleWishlist(movie)}>
                <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
                <div className="movie-title">{movie.title}</div>
                <div className="wishlist-indicator">👍</div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {wishlistMovies.length === 0 && (
        <div className="empty-wishlist">위시리스트가 비어 있습니다.</div>
      )}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            &lt; 이전
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            다음 &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieWishlist;
