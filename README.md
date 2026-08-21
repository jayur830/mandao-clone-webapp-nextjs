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

### 3. 🎠 캐러셀(Carousel) 컴포넌트
- 다중 이미지 슬라이드 등록, 좌우 네비게이션, 인디케이터 지원

### 4. 👁️ 반응형 실시간 미리보기 (Preview Viewer)
- 모바일(512px) 및 전체 너비(Full Width) 반응형 모드 전환
- 빌더에서 작성한 결과물을 실제 완성형 웹/모바일 프로모션 페이지로 렌더링

### 5. 💾 저장 & 불러오기 (Local Storage & JSON Export/Import)
- 브라우저 LocalStorage 자동 저장 및 세션 복구
- 템플릿 JSON 파일 다운로드(Export) 및 가져오기(Import) 기능

### 6. ↩️ 히스토리 관리 (Undo / Redo)
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