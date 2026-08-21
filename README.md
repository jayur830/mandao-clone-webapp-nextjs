# 🥟 만다오(Mandao) 클론코딩

> 우아한형제들의 프로모션 웹앱 빌더 **'만다오(Mandao)'**를 클론 코딩한 완성형 오픈소스 웹 애플리케이션 프로젝트입니다.

---

## 🎯 프로젝트 소개 & 동기

프로모션 페이지 및 이벤트 랜딩 페이지를 코드 없이 손쉽게 제작할 수 있는 웹앱 빌더의 동작 원리를 연구하고 직접 구현한 프로젝트입니다.

- **원리 탐구**: 복잡한 드래그 앤 드롭 빌더와 컴포넌트 트리 아키텍처 구현 분석
- **실무 활용 & 오픈소스**: 실무에서 자주 발생하는 프로모션 페이지 제작 효율화 및 오픈소스 공개 목표
- **포트폴리오**: 모던 프론트엔드 아키텍처 및 인터랙티브 UI 설계 역량 집약

---

## ✨ 주요 기능

### 1. 🧩 컴포넌트 블록 기반 UI 빌더
- **다양한 블록 지원**: 레이아웃 블록, **⏰ 카운트다운 타이머**, **📝 이벤트 응모/사전예약 폼**, 이미지, 비디오, 캐러셀(슬라이더), 버튼, 텍스트
- **세부 속성 조작 패널**: 배경색(ColorPicker), 여백(Padding), 정렬(Flexbox), 타이포그래피, 이미지/비디오 URL 등 커스텀

### 2. ⏰ 마감 임박 카운트다운 타이머 (Countdown Timer)
- 프로모션 마감 일시(D-Day/시간)를 1초 단위로 실시간 카운트다운
- 캔버스, 실시간 미리보기, 독립형 HTML 내보내기에서 자동 갱신 JS 로직 탑재

### 3. 📝 이벤트 응모 & 사전예약 폼 (Lead Form)
- 성함, 연락처, 개인정보 수집 동의 체크박스 등 유연한 인풋 필드 구성
- 제출 시 필수 입력값 실시간 유효성 검사 및 성공 알림 팝업 인터랙션

### 4. 📌 화면 하단 고정 플로팅 바 (Sticky CTA Bar)
- 스크롤을 내려도 화면 하단에 항상 고정되는 구매/신청 플로팅 CTA 바 모드 지원

### 5. 🖼️ 무료 고화질 프로모션 스톡 이미지 갤러리
- 음식/배달, 쇼핑/세일, 축제/이벤트, 카페/디저트, 배너 배경 등 카테고리별 고화질 스톡 이미지 1-Click 삽입

### 6. 🎨 1-Click 프로모션 템플릿 프리셋 갤러리
- 할인/쿠폰 이벤트, 신상품 런칭, 음식 배달 랭킹 BEST 기성 템플릿 1클릭 적용

### 7. 📦 독립형 정적 HTML 파일 내보내기 & 실시간 공유
- 서버나 빌드 없이 브라우저에서 바로 열 수 있는 **단일 Standalone HTML 파일 다운로드**
- 고유 데이터가 포함된 URL-Safe 실시간 웹 미리보기 링크 복사 및 새 탭 뷰어 지원

### 8. ⚡ 컴포넌트 인터랙션 (클릭 이벤트)
- 버튼 및 이미지 클릭 시 **웹 링크 이동(새 창/현재 창)** 및 **알림 팝업(Alert)** 이벤트 트리거 지원

### 9. 🎭 스타일 & CSS 애니메이션 고도화
- 블록별 모서리 둥글기(Border Radius), 테두리(Border), 그림자(Box Shadow) 조작
- 스크롤/등장 시 **페이드 인(Fade In), 슬라이드 업(Slide Up), 바운스(Bounce)** 애니메이션 효과 적용

### 10. 🌲 레이어(Layer) 계층 트리 & 🔍 캔버스 줌(Zoom)
- 전체 블록 및 자식 요소들의 계층 구조를 한눈에 보고 선택/삭제할 수 있는 사이드 레이어 패널
- 50% ~ 150% 캔버스 줌 인/아웃 및 100% 원본 배율 리셋 툴바

### 11. ⌨️ 키보드 단축키 & 빌더 가이드
- `?` 단축키 또는 상단 툴바를 통해 히스토리 단축키(`Cmd+Z`, `Cmd+Shift+Z`) 및 빌더 활용 팁 제공

### 12. 🎠 캐러셀(Carousel) 슬라이더
- 다중 이미지 슬라이드 등록, 좌우 네비게이션, 인디케이터 지원

### 13. 👁️ 반응형 실시간 미리보기 (Preview Viewer)
- 모바일(512px) 및 전체 너비(Full Width) 반응형 모드 전환
- 빌더에서 작성한 결과물을 실제 완성형 웹/모바일 프로모션 페이지로 렌더링

### 14. 💾 저장 & 불러오기 (Local Storage & JSON Export/Import)
- 브라우저 LocalStorage 자동 저장 및 세션 복구
- 템플릿 JSON 파일 다운로드(Export) 및 가져오기(Import) 기능

### 15. ↩️ 히스토리 관리 (Undo / Redo)
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