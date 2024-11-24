import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/HomeMain";
import Search from "./components/search/HomeSearch";
import SignIn from "./components/signIn/SignIn";
import Header from "./components/layout/header";
import MovieWishlist from "./components/views/movie/MovieWishlist"; // 추가

const App = () => {
  return (
    <Router>
      <Header />
      <div className="body-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/wishlist" element={<MovieWishlist />} /> {/* /wishlist 경로 추가 */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
