import React from 'react';
import HomeMain from './HomeMain';
import HomePopular from './HomePopular';
import HomeWishlist from './HomeWishlist';
import './Home.css';

const Home = () => (
  <div className="home">
    <HomeMain />
    <HomePopular />
    <HomeWishlist />
  </div>
);

export default Home;
