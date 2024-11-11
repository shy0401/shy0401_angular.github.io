import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // 글로벌 스타일
import App from './App'; // 메인 App 컴포넌트
import reportWebVitals from './reportWebVitals'; // 성능 측정 관련

// React 18의 createRoot를 사용하여 앱 초기화
const root = ReactDOM.createRoot(document.getElementById('root'));

// 앱 렌더링
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 성능 측정 활성화 (필요하지 않으면 제거 가능)
reportWebVitals(console.log);
