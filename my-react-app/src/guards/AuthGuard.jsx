import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const storedApiKey = localStorage.getItem('TMDb-Key'); // TMDB API 키 저장 확인
  const sessionApiKey = sessionStorage.getItem('loggedInApiKey'); // 현재 로그인된 API 키 확인

  if (!storedApiKey || storedApiKey !== sessionApiKey) {
    // API 키가 저장되어 있지 않거나 일치하지 않을 경우 로그인 페이지로 리다이렉트
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;
