🎬 MovieFix

MovieFix는 넷플릭스와 유사한 영화 추천 사이트를 구현한 프로젝트입니다. TMDB API를 연동하여 최신 영화, 인기 영화, 영화 세부 정보를 제공하며, 직관적인 UI와 SPA 방식을 통해 사용자가 원활한 경험을 누릴 수 있도록 설계되었습니다.



🚀 프로젝트 기본 정보

- 주제: 영화 추천 웹사이트 개발 (넷플릭스 클론)
- 프로젝트 명: MovieFix
- 주요 기능:
  - 최신 및 인기 영화 목록 제공
  - 영화 상세 정보 확인
  - 사용자 위시리스트 관리 (추가/삭제)
  - 로그인 및 알림 기능 지원
- 기술 스택:
  - React: 프론트엔드 개발
  - TMDB API: 영화 데이터 연동
  - CSS Modules: 컴포넌트별 스타일 관리
  - React Router: SPA 구현
  - Toastify: 알림 기능
  - Axios: API 데이터 통신



📂 프로젝트 폴더 구조

```plaintext
shy0401_angular.github.io/
├── my-react-app/
│   ├── build/                  # 빌드된 정적 파일
│   ├── public/                 # 정적 리소스 파일
│   ├── src/
│   │   ├── components/         # 주요 컴포넌트 폴더
│   │   │   ├── home/           # 홈 화면 컴포넌트
│   │   │   ├── layout/         # 네비게이션 및 배너 컴포넌트
│   │   │   ├── search/         # 검색 관련 컴포넌트
│   │   │   ├── services/       # 위시리스트 및 API 데이터 로직 관리
│   │   │   ├── signin/         # 로그인/회원가입 컴포넌트
│   │   │   ├── toast/          # 알림 메시지 컴포넌트
│   │   │   └── views/          # MovieGrid, InfiniteScroll 등 주요 페이지 UI 구현
│   ├── node_modules/           # 프로젝트 의존성
│   ├── package.json            # 프로젝트 설정 및 스크립트
│   └── README.md               # 프로젝트 설명 파일
```



🛠 설치 및 실행 가이드

1. 프로젝트 클론
   ```bash
   git clone https://github.com/shy0401/shy0401_angular.github.io.git
   cd shy0401_angular.github.io/my-react-app
   ```

2. 의존성 설치
   ```bash
   npm install
   ```

3. 로컬 서버 실행
   ```bash
   npm start
   ```

4. 웹사이트 접속
   브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 MovieFix를 실행합니다.



✨ 주요 기능 및 구현

1. UI/UX
- SPA 구현: `React Router`로 구성된 SPA 방식으로 페이지 리로드 없이 부드러운 탐색 경험 제공
- 알림 시스템: `Toastify`를 활용하여 로그인/영화 로딩 상태 등 실시간 피드백 제공
- 반응형 디자인: CSS Modules로 독립적인 스타일링 구현

2. 컴포넌트 구조
- `components/home`: 홈 화면에서 최신 및 인기 영화 표시
- `components/layout`: 공통 레이아웃 컴포넌트 (e.g., 배너, 네비게이션)
- `components/services`: 
  - `WishlistService.js`: 위시리스트 추가/삭제 로직 관리
- `components/views`: 
  - `MovieGrid`: 그리드 방식으로 영화 목록 표시
  - `MovieInfiniteScroll`: 무한 스크롤 구현

3. TMDB API 연동
- TMDB API를 통해 제공되는 데이터:
  - 최신 및 인기 영화 목록
  - 검색 결과
  - 영화 상세 정보 (줄거리, 평점, 포스터 등)



📈 향후 개선 사항
1. 다크 모드 지원: 사용자 테마 설정에 따른 UI 변경 기능
2. 추천 시스템: 사용자 데이터를 기반으로 한 개인화된 영화 추천
3. PWA 지원: Progressive Web App으로 개선해 네이티브 앱처럼 사용할 수 있도록 구현



💬 문의 및 피드백

MovieFix에 관심을 가져주셔서 감사합니다! 더 나은 프로젝트를 위해 언제든지 피드백과 제안을 남겨주세요. 😊  
[GitHub 페이지에서 확인하기](https://shy0401.github.io/shy0401_angular.github.io/)
