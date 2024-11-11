import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faTicket, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
// Ensure the correct CSS file is imported:
import '../home/home.css'; // Update this path to the correct CSS file location
import './Header.css'; // Ensure Header.css is in the correct path

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-left">
        <Link to="/" className="logo">
          <FontAwesomeIcon icon={faTicket} style={{ color: '#E50914' }} />
        </Link>
        <nav className="nav-links">
          <ul>
            <li><Link to="/">홈</Link></li>
            <li><Link to="/popular">대세 콘텐츠</Link></li>
            <li><Link to="/wishlist">내가 찜한 리스트</Link></li>
            <li><Link to="/search">찾아보기</Link></li>
          </ul>
        </nav>
      </div>
      <div className="header-right">
        <button className="icon-button">
          <FontAwesomeIcon icon={faUser} />
        </button>
        <button className="icon-button mobile-menu-button" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <nav>
          <ul>
            <li><Link to="/" onClick={toggleMobileMenu}>홈</Link></li>
            <li><Link to="/popular" onClick={toggleMobileMenu}>대세 콘텐츠</Link></li>
            <li><Link to="/wishlist" onClick={toggleMobileMenu}>내가 찜한 리스트</Link></li>
            <li><Link to="/search" onClick={toggleMobileMenu}>찾아보기</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
