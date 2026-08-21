export interface StockImageItem {
  id: string;
  title: string;
  category: 'food' | 'shopping' | 'event' | 'cafe' | 'banner';
  url: string;
  alt: string;
}

export const STOCK_CATEGORIES: Array<{ key: StockImageItem['category']; label: string }> = [
  { key: 'food', label: '🍕 음식 & 배달' },
  { key: 'shopping', label: '🛍️ 쇼핑 & 세일' },
  { key: 'event', label: '🎉 축제 & 쿠폰' },
  { key: 'cafe', label: '☕ 카페 & 디저트' },
  { key: 'banner', label: '🎨 프로모션 배너' },
];

export const STOCK_IMAGES: StockImageItem[] = [
  // 음식 & 배달
  {
    id: 'f1',
    title: '치즈 피자',
    category: 'food',
    url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    alt: '신선한 토핑의 치즈 피자',
  },
  {
    id: 'f2',
    title: '수제 버거와 감자튀김',
    category: 'food',
    url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    alt: '두툼한 패티의 수제 버거',
  },
  {
    id: 'f3',
    title: '신선한 연어 초밥',
    category: 'food',
    url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    alt: '정갈한 모듬 초밥 세트',
  },
  {
    id: 'f4',
    title: '바삭한 프라이드 치킨',
    category: 'food',
    url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    alt: '바삭하게 튀겨진 치킨',
  },
  {
    id: 'f5',
    title: '매콤 달콤 떡볶이',
    category: 'food',
    url: 'https://images.unsplash.com/photo-1625860633266-67a149174151?auto=format&fit=crop&w=800&q=80',
    alt: '국물 떡볶이와 분식',
  },

  // 쇼핑 & 세일
  {
    id: 's1',
    title: '쇼핑백과 선물',
    category: 'shopping',
    url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
    alt: '패션 쇼핑과 쇼핑백',
  },
  {
    id: 's2',
    title: '스마트폰 & 테크 기기',
    category: 'shopping',
    url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    alt: '디지털 디바이스 세일',
  },
  {
    id: 's3',
    title: '신발 & 스니커즈',
    category: 'shopping',
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    alt: '레드 스니커즈 특가',
  },
  {
    id: 's4',
    title: '패션 룩북',
    category: 'shopping',
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    alt: '의류 매장 및 편집샵',
  },

  // 축제 & 쿠폰
  {
    id: 'e1',
    title: '파티 컨페티 & 축하',
    category: 'event',
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    alt: '화려한 축제 이벤트',
  },
  {
    id: 'e2',
    title: '선물 상자 리본',
    category: 'event',
    url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    alt: '선물 증정 프로모션',
  },
  {
    id: 'e3',
    title: '골드 풍선 파티',
    category: 'event',
    url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    alt: '기념일 축하 풍선',
  },

  // 카페 & 디저트
  {
    id: 'c1',
    title: '아이스 아메리카노 & 라떼',
    category: 'cafe',
    url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    alt: '신선한 원두 커피',
  },
  {
    id: 'c2',
    title: '달콤한 딸기 케이크',
    category: 'cafe',
    url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    alt: '디저트 베이커리 케이크',
  },
  {
    id: 'c3',
    title: '갓 구운 베이커리 크루아상',
    category: 'cafe',
    url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    alt: '크루아상 빵과 브런치',
  },

  // 프로모션 배너 배경
  {
    id: 'b1',
    title: '모던 그라디언트 블루',
    category: 'banner',
    url: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=800&q=80',
    alt: '블루 그라디언트 배너 배경',
  },
  {
    id: 'b2',
    title: '선셋 핑크 오렌지',
    category: 'banner',
    url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80',
    alt: '화사한 오렌지 핑크 배경',
  },
  {
    id: 'b3',
    title: '네온 사이버 다크',
    category: 'banner',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80',
    alt: '네온 스타일 이벤트 배경',
  },
];
