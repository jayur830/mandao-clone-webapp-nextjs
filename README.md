# 🥟 만다오(Mandao) 클론코딩

> 우아한형제들의 프로모션 웹앱 빌더 **'만다오(Mandao)'**를 클론 코딩한 오픈소스 웹 애플리케이션 프로젝트입니다.

---

## 🎯 프로젝트 소개 & 동기

프로모션 페이지 및 이벤트 랜딩 페이지를 코드 없이 손쉽게 제작할 수 있는 웹앱 빌더의 동작 원리를 연구하고 직접 구현한 프로젝트입니다.

- **원리 탐구**: 복잡한 드래그 앤 드롭 빌더와 컴포넌트 트리 아키텍처 구현 분석
- **실무 활용 & 오픈소스**: 실무에서 자주 발생하는 프로모션 페이지 제작 효율화 및 오픈소스 공개 목표
- **포트폴리오**: 모던 프론트엔드 아키텍처 및 인터랙티브 UI 설계 역량 집약

---

## ✨ 주요 기능

### 1. 🧩 컴포넌트 블록 기반 UI 빌더
- **다양한 블록 지원**: 레이아웃 블록, 이미지, 비디오, 캐러셀(슬라이더), 버튼, 텍스트
- **세부 속성 조작 패널**: 배경색(ColorPicker), 여백(Padding), 정렬(Flexbox), 타이포그래피, 이미지/비디오 URL 등 커스텀

### 2. 🔀 인터랙티브 드래그 앤 드롭 & 순서 정렬
- 블록 및 내부 자식 요소 간의 직관적인 HTML5 Drag & Drop 재배치
- 요소별 위/아래 순서 이동 및 삭제 컨트롤 제공

### 3. 🎨 1-Click 프로모션 템플릿 프리셋 갤러리
- 할인/쿠폰 이벤트, 신상품 런칭, 음식 배달 프로모션 등 기성 템플릿 1클릭 적용

### 4. 📦 독립형 정적 HTML 파일 내보내기 & 실시간 공유
- 서버나 빌드 없이 브라우저에서 바로 열 수 있는 **단일 Standalone HTML 파일 다운로드**
- 고유 데이터가 포함된 실시간 웹 미리보기 URL 복사 및 새 탭 뷰어 지원

### 5. ⚡ 컴포넌트 인터랙션 (클릭 이벤트)
- 버튼 및 이미지 클릭 시 **웹 링크 이동(새 창/현재 창)** 및 **알림 팝업(Alert)** 이벤트 트리거 지원

### 6. 🎭 스타일 & CSS 애니메이션 고도화
- 블록별 모서리 둥글기(Border Radius), 테두리(Border), 그림자(Box Shadow) 조작
- 스크롤/등장 시 **페이드 인(Fade In), 슬라이드 업(Slide Up), 바운스(Bounce)** 애니메이션 효과 적용

### 7. 🌲 레이어(Layer) 계층 트리 & 🔍 캔버스 줌(Zoom)
- 전체 블록 및 자식 요소들의 계층 구조를 한눈에 보고 선택/삭제할 수 있는 사이드 레이어 패널
- 50% ~ 150% 캔버스 줌 인/아웃 및 100% 원본 배율 리셋 툴바

### 8. 🎠 캐러셀(Carousel) 슬라이더
- 다중 이미지 슬라이드 등록, 좌우 네비게이션, 인디케이터 지원

### 9. 👁️ 반응형 실시간 미리보기 (Preview Viewer)
- 모바일(512px) 및 전체 너비(Full Width) 반응형 모드 전환
- 빌더에서 작성한 결과물을 실제 완성형 웹/모바일 프로모션 페이지로 렌더링

### 10. 💾 저장 & 불러오기 (Local Storage & JSON Export/Import)
- 브라우저 LocalStorage 자동 저장 및 세션 복구
- 템플릿 JSON 파일 다운로드(Export) 및 가져오기(Import) 기능

### 11. ↩️ 히스토리 관리 (Undo / Redo)
- `Cmd/Ctrl + Z`, `Cmd/Ctrl + Shift + Z` 단축키 및 툴바 액션을 통한 작업 되돌리기/다시 실행

---

## 🛠 기술 스택

- **Framework**: [Next.js 16 (Turbopack, App Router)](https://nextjs.org/)
- **Core**: [React 19](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/)
- **UI & Styling**: [Material UI (MUI v6)](https://mui.com/), [Emotion](https://emotion.sh/), `react-color-palette`
- **Lint & Format**: ESLint 9 (Flat Config), Prettier, Simple Import Sort
- **Git Hook & Commit**: Husky, Commitlint, Commitizen

---

## 🚀 시작하기

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```
브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속합니다.

### 프로덕션 빌드
```bash
npm run build
npm run start
```

### 코드 린트 & 타입 검사
```bash
npm run lint
npx tsc --noEmit
```