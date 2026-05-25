import type { Comment, Review } from "@/lib/types";

export const dummyReviews: Review[] = [
  {
    id: "rv-gimhae-001",
    title: "새벽 김해공항 픽업을 편하게 이용했어요",
    content:
      "새벽 비행기라 걱정했는데 시간 맞춰 와주셔서 편하게 이동했어요. 짐도 많았는데 기사님이 먼저 도와주셔서 출발부터 마음이 놓였습니다.",
    rating: 5,
    images: [],
    tags: ["공항", "새벽콜", "지역"],
    created_at: "2026-05-18T09:00:00.000Z",
    updated_at: "2026-05-18T09:00:00.000Z",
    likes: 38,
    views: 428,
    author: "해운대 손님",
    ai_generated: false,
    featured: true
  },
  {
    id: "rv-tour-002",
    title: "부모님 모시고 부산 관광택시로 다녀왔습니다",
    content:
      "부모님 모시고 감천문화마을, 송도, 해운대까지 천천히 돌았습니다. 이동 동선이 편했고 기사님이 사진 찍기 좋은 곳도 알려주셔서 만족했습니다.",
    rating: 5,
    images: [],
    tags: ["관광", "VIP", "지역"],
    created_at: "2026-05-16T04:30:00.000Z",
    updated_at: "2026-05-16T04:30:00.000Z",
    likes: 29,
    views: 312,
    author: "서울 가족여행",
    ai_generated: false,
    featured: true
  },
  {
    id: "rv-long-003",
    title: "부산에서 울산 장거리 이동 후기",
    content:
      "회의 시간이 애매해서 장거리택시를 예약했습니다. 차량이 조용하고 깨끗해서 이동 중에 자료를 볼 수 있었고, 도착 시간도 잘 맞았습니다.",
    rating: 5,
    images: [],
    tags: ["장거리", "VIP"],
    created_at: "2026-05-14T12:20:00.000Z",
    updated_at: "2026-05-14T12:20:00.000Z",
    likes: 21,
    views: 268,
    author: "출장 이용객",
    ai_generated: true,
    featured: false
  },
  {
    id: "rv-baggage-004",
    title: "짐이 많은 공항 이동도 괜찮았습니다",
    content:
      "캐리어가 세 개라 일반 택시는 불안했는데 예약할 때 미리 말하니 넉넉한 차량으로 배차해주셨습니다. 덕분에 가족들이 편하게 갔어요.",
    rating: 5,
    images: [],
    tags: ["공항", "장거리"],
    created_at: "2026-05-10T01:10:00.000Z",
    updated_at: "2026-05-10T01:10:00.000Z",
    likes: 18,
    views: 205,
    author: "기장 가족",
    ai_generated: false,
    featured: false
  }
];

export const dummyComments: Comment[] = [
  {
    id: "cm-001",
    review_id: "rv-gimhae-001",
    author: "관리자",
    content: "이용해주셔서 감사합니다. 새벽 공항 이동은 예약 시간보다 여유 있게 배차하고 있습니다.",
    created_at: "2026-05-18T10:20:00.000Z"
  },
  {
    id: "cm-002",
    review_id: "rv-tour-002",
    author: "관리자",
    content: "부모님과 좋은 여행 되셨다니 다행입니다. 다음 부산 일정도 편하게 도와드리겠습니다.",
    created_at: "2026-05-16T08:40:00.000Z"
  }
];

export const liveInquirySamples = [
  "해운대 → 김해공항 새벽 5시 예약 문의",
  "부산역 → 감천문화마을 관광코스 상담",
  "서면 → 울산 장거리 이동 견적 요청",
  "기장 → 김해공항 대형 캐리어 3개 문의",
  "광안리 야경 투어 기사 포함 예약"
];

export const tourCourses = [
  {
    title: "부산 첫 방문 4시간 코스",
    route: "부산역 · 감천문화마을 · 송도해상케이블카 · 자갈치 · 광안리",
    keyword: "부산택시투어"
  },
  {
    title: "해운대 야경 프리미엄 코스",
    route: "달맞이길 · 청사포 · 해운대마린시티 · 광안대교 · 광안리",
    keyword: "부산관광택시"
  },
  {
    title: "부모님 동행 여유 코스",
    route: "태종대 · 흰여울문화마을 · 송도 · 국제시장 · 숙소 복귀",
    keyword: "부산기사포함렌트"
  }
];

export const driverProfiles = [
  {
    name: "공항 픽업 전담 기사",
    experience: "김해공항 새벽콜·심야콜 중심 배차",
    strengths: ["항공편 시간 확인", "짐 상하차 지원", "정숙 운행"]
  },
  {
    name: "부산 관광 코스 기사",
    experience: "해운대·영도·송도·기장 관광 동선 추천",
    strengths: ["사진 포인트 안내", "어르신 동행 배려", "일정 조율"]
  },
  {
    name: "장거리 VIP 기사",
    experience: "부산 출발 경남·울산·대구·경북 이동",
    strengths: ["정시 도착", "쾌적한 차량", "업무 이동 배려"]
  }
];

export const dummyFaqs = [
  {
    id: "faq-001",
    question: "김해공항 새벽 픽업도 가능한가요?",
    answer: "가능합니다. 항공편 시간과 짐 개수를 남겨주시면 출발지 기준으로 여유 있는 픽업 시간을 안내합니다.",
    category: "공항",
    sort_order: 1,
    active: true,
    created_at: "2026-05-20T00:00:00.000Z",
    updated_at: "2026-05-20T00:00:00.000Z"
  },
  {
    id: "faq-002",
    question: "부산에서 울산, 대구, 경남 장거리 이동도 예약할 수 있나요?",
    answer: "부산 출발 장거리 이동 예약을 지원합니다. 이동 거리, 시간대, 경유 여부에 따라 상담 후 안내합니다.",
    category: "장거리",
    sort_order: 2,
    active: true,
    created_at: "2026-05-20T00:00:00.000Z",
    updated_at: "2026-05-20T00:00:00.000Z"
  },
  {
    id: "faq-003",
    question: "부산 관광택시는 코스를 직접 정할 수 있나요?",
    answer: "가능합니다. 감천문화마을, 송도, 해운대, 기장, 광안리 등 희망지를 기준으로 동선을 조율합니다.",
    category: "관광",
    sort_order: 3,
    active: true,
    created_at: "2026-05-20T00:00:00.000Z",
    updated_at: "2026-05-20T00:00:00.000Z"
  }
];
