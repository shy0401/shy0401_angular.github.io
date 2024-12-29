import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ToastContainer from "./components/Toast/ToastContainer"; // Toast 알림 컴포넌트
import Home from "./components/home/HomeMain"; // 메인 페이지
import Search from "./components/search/HomeSearch"; // 검색 페이지
import SignIn from "./components/Signin/Signin"; // 로그인 페이지
import Popular from "./components/home/Popular"; // 인기 콘텐츠 페이지
import Header from "./components/layout/Header"; // 헤더 컴포넌트
import Profile from "./components/Profile"; // 프로필 페이지
import MovieWishlist from "./components/home/Wishlist"; // 위시리스트 페이지
import ProtectedRoute from "./guards/AuthGuard"; // 보호된 라우트

const App = () => {
  return (
    <Router>
      <ToastContainer /> {/* ToastContainer를 최상단에 추가 */}
      <Header /> {/* 헤더는 모든 페이지에 표시 */}
      <div className="body-content">
        <Routes>
          {/* 메인 페이지 */}
          <Route path="/" element={<Home />} />

          {/* 인기 영화 페이지 */}
          <Route path="/popular" element={<Popular />} />

          {/* 프로필 페이지 */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* 검색 페이지 */}
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />

          {/* 위시리스트 페이지 */}
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <MovieWishlist />
              </ProtectedRoute>
            }
          />

          {/* 로그인 페이지 */}
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
