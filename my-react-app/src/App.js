import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Search from './components/search/Search';
import SignIn from './components/signIn/SignIn';
import Header from './components/layout/header';
import MovieWishlist from './components/views/movie/MovieWishlist'; // MovieWishlist 컴포넌트 추가

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/wishlist" element={<MovieWishlist />} /> {/* /wishlist 경로 추가 */}
    </Routes>
  </Router>
);

export default App;
