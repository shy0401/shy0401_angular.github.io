import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faTicket,
  faBars,
  faTimes,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Check login status
    const apiKey = sessionStorage.getItem("loggedInApiKey");
    setIsLoggedIn(!!apiKey);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      navigate("/signin");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("loggedInApiKey");
    localStorage.removeItem("TMDb-Key");
    setIsLoggedIn(false);
    navigate("/signin");
  };

  return (
    <header className={`app-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-left">
        <Link to="/" className="logo">
          <FontAwesomeIcon icon={faTicket} className="logo-icon" />
          <span>MovieApp</span>
        </Link>
        <nav className="nav-links desktop-nav">
          <ul>
            <li>
              <Link to="/">홈</Link>
            </li>
            <li>
              <Link to="/popular">대세 콘텐츠</Link>
            </li>
            <li>
              <Link to="/wishlist">내가 찜한 리스트</Link>
            </li>
            <li>
              <Link to="/search">찾아보기</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header-right">
        <button className="icon-button" onClick={handleProfileClick}>
          <FontAwesomeIcon icon={faUser} />
        </button>
        {isLoggedIn && (
          <button className="icon-button logout-button" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        )}
        <button
          className="icon-button mobile-menu-button"
          onClick={toggleMobileMenu}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isMobileMenuOpen ? "open" : ""}`}>
        <button className="close-button" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <nav>
          <ul>
            <li>
              <Link to="/" onClick={toggleMobileMenu}>
                홈
              </Link>
            </li>
            <li>
              <Link to="/popular" onClick={toggleMobileMenu}>
                대세 콘텐츠
              </Link>
            </li>
            <li>
              <Link to="/wishlist" onClick={toggleMobileMenu}>
                내가 찜한 리스트
              </Link>
            </li>
            <li>
              <Link to="/search" onClick={toggleMobileMenu}>
                찾아보기
              </Link>
            </li>
          </ul>
        </nav>
        {isLoggedIn && (
          <button className="icon-button logout-button" onClick={handleLogout}>
            로그아웃
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
