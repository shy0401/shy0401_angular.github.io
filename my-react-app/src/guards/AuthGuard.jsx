import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // 사용자 인증 정보 가져오기
  const storedApiKey = localStorage.getItem("TMDb-Key"); // 로컬 저장소의 API 키
  const sessionApiKey = sessionStorage.getItem("loggedInApiKey"); // 세션 저장소의 API 키

  // 인증 상태 확인
  const isAuthenticated = storedApiKey && storedApiKey === sessionApiKey;

  if (!isAuthenticated) {
    // 인증 실패: 로그인 페이지로 리다이렉트
    return <Navigate to="/signin" />;
  }

  // 인증 성공: 자식 컴포넌트 렌더링
  return children;
};

export default ProtectedRoute;
