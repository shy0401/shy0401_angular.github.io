import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ToastContainer from "./components/Toast/ToastContainer"; // ToastContainer를 가져옵니다.
import Home from "./components/home/HomeMain";
import Search from "./components/search/HomeSearch";
import SignIn from "./components/Signin/Signin";
import Popular from "./components/home/Popular"; // Popular 페이지를 추가
import Header from "./components/layout/Header";
import MovieWishlist from "./components/home/Wishlist";
import ProtectedRoute from "./guards/AuthGuard";

const App = () => {
  return (
    <Router>
      <ToastContainer /> {/* ToastContainer를 최상단에 추가 */}
      <Header />
      <div className="body-content">
        <Routes>
          {/* 메인 페이지는 로그인 없이 접근 가능 */}
          <Route path="/" element={<Home />} />

          {/* 인기 영화 페이지 */}
          <Route path="/popular" element={<Popular />} />

          {/* 인증이 필요한 페이지 */}
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />
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
