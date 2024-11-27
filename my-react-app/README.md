```markdown
# MovieFix 🎬

MovieFix는 넷플릭스와 같은 영화 추천 사이트를 구현한 프로젝트입니다. TMDB API를 연동하여 최신 영화, 인기 영화, 영화 세부 정보 등을 제공하며, 직관적인 UI와 SPA 방식으로 사용자 경험을 극대화했습니다.

## 🚀 프로젝트 기본 정보

- **주제**: 넷플릭스와 유사한 영화 추천 웹사이트
- **프로젝트 명**: MovieFix
- **기능**:
  - 최신 영화 및 인기 영화 목록 표시
  - 영화 세부 정보 제공
  - 위시리스트 추가/삭제 기능
  - 로그인 및 알림 기능
- **기술 스택**:
  - **React**: 프론트엔드 개발
  - **TMDB API**: 영화 관련 데이터 제공
  - **CSS Modules**: 컴포넌트별 스타일 적용
  - **React Router**: SPA 네비게이션
  - **Custom Services**: 위시리스트 및 기타 서비스 관리

---

## 📂 프로젝트 폴더 구조

```
shy0401_angular.github.io/
├── my-react-app/
│   ├── build/                  # 빌드된 정적 파일
│   ├── public/                 # 정적 리소스 파일
│   ├── src/
│   │   ├── components/         # 주요 컴포넌트
│   │   │   ├── home/           # 홈 화면 관련 컴포넌트
│   │   │   ├── layout/         # 레이아웃 및 공통 UI 컴포넌트 (e.g., Banner.js)
│   │   │   ├── search/         # 검색 기능 컴포넌트
│   │   │   ├── services/       # 데이터 관리 서비스 (e.g., WishlistService.js)
│   │   │   ├── Signin/         # 로그인/회원가입 관련 컴포넌트
│   │   │   ├── Toast/          # 알림 메시지 컴포넌트
│   │   │   └── views/          # MovieGrid, MovieInfiniteScroll 등 주요 기능 구현
│   ├── node_modules/           # 프로젝트 의존성
│   ├── package.json            # 프로젝트 설정 및 의존성
│   └── README.md               # 프로젝트 설명 파일
```

---

## 🛠 설치 및 실행 가이드

1. **프로젝트 클론**
   ```bash
   git clone https://github.com/your-username/shy0401_angular.github.io.git
   cd shy0401_angular.github.io/my-react-app
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **로컬 서버 실행**
   ```bash
   npm start
   ```

4. **접속**
   브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 MovieFix를 실행합니다.

---

## ✨ 주요 기능 및 구현

### 1. **UI/UX**
- **SPA 구성**: `React Router`를 사용하여 페이지 전환 없이 부드러운 탐색 경험 제공
- **직관적 알림 시스템**: `Toast` 컴포넌트를 통해 로그인 및 영화 정보 로드 시 사용자 피드백 제공
- **반응형 디자인**: CSS Modules을 활용하여 컴포넌트별로 독립적인 스타일링 적용

### 2. **컴포넌트 구조**
- `components/home`: 홈 화면에서 인기 영화 및 최신 영화 목록 표시
- `components/layout`: 공통 UI 요소 (e.g., 네비게이션 바, 배너)
- `components/services`: 데이터 로직 관리 (e.g., `WishlistService.js`를 통해 위시리스트 관리)
- `components/views`:
  - `MovieGrid`: 그리드 형식으로 영화 목록 표시
  - `MovieInfiniteScroll`: 스크롤 시 영화 목록 동적 로드

### 3. **TMDB API 연동**
- TMDB API를 활용하여 다음 데이터 제공:
  - 인기 영화 목록
  - 영화 검색 결과
  - 영화 세부 정보 (평점, 설명 등)

---

## 📈 향후 개선사항
- **다크 모드**: 사용자 설정에 따라 UI 테마 변경
- **추천 시스템**: 개인화된 영화 추천 기능 추가
- **PWA**: Progressive Web App 구현을 통해 앱 형태로 사용할 수 있도록 개선

---

MovieFix를 사용해 주셔서 감사합니다! 더 나은 프로젝트를 위해 언제든 피드백을 남겨주세요. 😊
```
