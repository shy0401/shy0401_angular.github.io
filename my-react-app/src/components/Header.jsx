import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">MyApp</div>
      <nav>
        <ul className="nav-links">
          <li>
            <a href="/">홈</a>
          </li>
          <li>
            <a href="/about">소개</a>
          </li>
          <li>
            <a href="/contact">문의</a>
          </li>
          <li>
            <a href="/login">로그인</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
