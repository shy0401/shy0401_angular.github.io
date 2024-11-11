import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Search from './components/search/Search';
import SignIn from './components/signIn/SignIn';
import Header from './components/layout/header';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  </Router>
);

export default App;
