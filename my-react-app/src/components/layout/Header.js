import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBars,
  faTimes,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./header.css";

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

    // 로그인 상태 확인
    const apiKey = sessionStorage.getItem("loggedInApiKey");
    setIsLoggedIn(!!apiKey); // API 키가 있으면 로그인 상태로 간주

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate("/profile"); // 로그인 상태에서는 프로필 페이지로 이동
    } else {
      navigate("/signin"); // 비로그인 상태에서는 로그인 페이지로 이동
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
          {/* 로고 이미지 */}
          <a
            href="https://icons8.com/icon/EW-7v86RVl2y/cinema-film-play"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.icons8.com/ios-filled/50/cinema-film-play.png"
              alt="Cinema Film Play Icon"
              className="logo-image"
            />
          </a>
          <span className="logo-text">MovieFlix</span>
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
