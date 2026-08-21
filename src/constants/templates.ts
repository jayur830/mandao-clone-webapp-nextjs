import { Data } from '@/types/block';

export interface PromotionTemplate {
  id: string;
  title: string;
  description: string;
  category: '할인/쿠폰' | '신상품/런칭' | '푸드/배달' | '이벤트/페스티벌';
  thumbnailColor: string;
  badge: string;
  data: Data[];
}

export const PROMOTION_TEMPLATES: PromotionTemplate[] = [
  {
    id: 'coupon-event',
    title: '🎉 첫 주문 10,000원 할인 쿠폰 이벤트',
    description: '배민 스타일의 깔끔한 쿠폰 발급 및 혜택 안내 프로모션 템플릿입니다.',
    category: '할인/쿠폰',
    thumbnailColor: '#2AC1BC',
    badge: '인기 템플릿',
    data: [
      {
        type: 'block',
        fixPaddingHorizontal: true,
        fixPaddingVertical: true,
        style: {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#2AC1BC',
          paddingTop: 32,
          paddingBottom: 32,
          paddingLeft: 20,
          paddingRight: 20,
          gap: 12,
        },
        children: [
          {
            type: 'text',
            value: '우아한 첫 만남 혜택',
            style: {
              fontSize: 16,
              fontWeight: 600,
              color: '#E0F7F6',
              textAlign: 'center',
            },
          },
          {
            type: 'text',
            value: '지금 가입하면\n10,000원 즉시 할인!',
            style: {
              fontSize: 26,
              fontWeight: 700,
              color: '#FFFFFF',
              textAlign: 'center',
              lineHeight: 1.3,
            },
          },
        ],
      },
      {
        type: 'block',
        fixPaddingHorizontal: true,
        fixPaddingVertical: true,
        style: {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          paddingTop: 24,
          paddingBottom: 24,
          paddingLeft: 16,
          paddingRight: 16,
          gap: 16,
        },
        children: [
          {
            type: 'button',
            text: '🎁 10,000원 쿠폰팩 모두 받기',
            fullWidth: true,
            style: {
              backgroundColor: '#1F1F1F',
              color: '#FFFFFF',
              fontSize: 18,
              fontWeight: 700,
              borderRadius: 8,
              paddingTop: 14,
              paddingBottom: 14,
              paddingLeft: 20,
              paddingRight: 20,
            },
          },
          {
            type: 'text',
            value: '• 유효기간: 발급일로부터 7일간\n• 배달/포장 주문 시 20,000원 이상 사용 가능\n• 1인 1회 한정 참여 가능',
            style: {
              fontSize: 12,
              fontWeight: 400,
              color: '#888888',
              textAlign: 'left',
              lineHeight: 1.6,
            },
          },
        ],
      },
    ],
  },
  {
    id: 'product-launch',
    title: '🚀 신메뉴 런칭 & 얼리버드 특가',
    description: '캐러셀 이미지 슬라이더와 제품 특징을 강조하는 신제품 소개 템플릿입니다.',
    category: '신상품/런칭',
    thumbnailColor: '#FF6B4A',
    badge: '추천',
    data: [
      {
        type: 'block',
        fixPaddingHorizontal: true,
        fixPaddingVertical: true,
        style: {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#1F1F1F',
          paddingTop: 24,
          paddingBottom: 20,
          paddingLeft: 16,
          paddingRight: 16,
          gap: 8,
        },
        children: [
          {
            type: 'text',
            value: 'NEW RELEASE',
            style: {
              fontSize: 14,
              fontWeight: 700,
              color: '#FF6B4A',
              textAlign: 'center',
            },
          },
          {
            type: 'text',
            value: '올여름을 사로잡을 시그니처 신메뉴',
            style: {
              fontSize: 22,
              fontWeight: 700,
              color: '#FFFFFF',
              textAlign: 'center',
            },
          },
        ],
      },
      {
        type: 'carousel',
        items: [
          {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80',
            fullWidth: true,
          },
          {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
            fullWidth: true,
          },
        ],
      },
      {
        type: 'block',
        fixPaddingHorizontal: true,
        fixPaddingVertical: true,
        style: {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          paddingTop: 24,
          paddingBottom: 24,
          paddingLeft: 16,
          paddingRight: 16,
          gap: 12,
        },
        children: [
          {
            type: 'text',
            value: '입안 가득 퍼지는 깊은 풍미의 프리미엄 디저트.\n얼리버드 예약 시 20% 특별 할인을 제공합니다.',
            style: {
              fontSize: 15,
              fontWeight: 400,
              color: '#444444',
              textAlign: 'center',
              lineHeight: 1.5,
            },
          },
          {
            type: 'button',
            text: '얼리버드 20% 할인 주문하기',
            fullWidth: true,
            style: {
              backgroundColor: '#FF6B4A',
              color: '#FFFFFF',
              fontSize: 17,
              fontWeight: 700,
              borderRadius: 8,
              paddingTop: 14,
              paddingBottom: 14,
              paddingLeft: 20,
              paddingRight: 20,
            },
          },
        ],
      },
    ],
  },
  {
    id: 'best-delivery',
    title: '🍱 오늘 뭐 먹지? 주말 배달 랭킹 BEST',
    description: '카테고리별 추천 메뉴와 바로 주문 버튼이 포함된 템플릿입니다.',
    category: '푸드/배달',
    thumbnailColor: '#FFB800',
    badge: '인기',
    data: [
      {
        type: 'block',
        fixPaddingHorizontal: true,
        fixPaddingVertical: true,
        style: {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFF8E7',
          paddingTop: 28,
          paddingBottom: 24,
          paddingLeft: 16,
          paddingRight: 16,
          gap: 8,
        },
        children: [
          {
            type: 'text',
            value: '🏆 이번 주 가장 많이 찾은 메뉴',
            style: {
              fontSize: 22,
              fontWeight: 700,
              color: '#333333',
              textAlign: 'center',
            },
          },
          {
            type: 'text',
            value: '리뷰 평점 4.9 이상 검증된 맛집 총집합!',
            style: {
              fontSize: 14,
              fontWeight: 400,
              color: '#777777',
              textAlign: 'center',
            },
          },
        ],
      },
      {
        type: 'block',
        fixPaddingHorizontal: true,
        fixPaddingVertical: true,
        style: {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 16,
          paddingRight: 16,
          gap: 12,
        },
        children: [
          {
            type: 'button',
            text: '치킨 & 피자 브랜드관 바로가기',
            fullWidth: true,
            style: {
              backgroundColor: '#3B82F6',
              color: '#FFFFFF',
              fontSize: 16,
              fontWeight: 600,
              borderRadius: 6,
              paddingTop: 12,
              paddingBottom: 12,
              paddingLeft: 16,
              paddingRight: 16,
            },
          },
          {
            type: 'button',
            text: '한식 / 분식 인기 맛집 바로가기',
            fullWidth: true,
            style: {
              backgroundColor: '#10B981',
              color: '#FFFFFF',
              fontSize: 16,
              fontWeight: 600,
              borderRadius: 6,
              paddingTop: 12,
              paddingBottom: 12,
              paddingLeft: 16,
              paddingRight: 16,
            },
          },
        ],
      },
    ],
  },
];
