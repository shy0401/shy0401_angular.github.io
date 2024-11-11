import React from 'react';

const Banner = ({ movie }) => {
  if (!movie) return null;

  return (
    <div className="banner">
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
    </div>
  );
};

export default Banner;
