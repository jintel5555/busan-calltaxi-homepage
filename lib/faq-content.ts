import type { Faq } from "@/lib/types";

export const faqHeroDescription =
  "관리자가 직접 추가한 예약, 공항 픽업, 관광택시, 장거리 이동 관련 안내입니다. 문구는 예약 전 자주 문의주시는 내용을 정리했습니다.";

export const siteFaqs: Faq[] = [
  {
    id: "faq-airport-dawn",
    question: "김해공항 새벽 픽업도 가능한가요?",
    answer: "새벽 출발·심야 도착 시간에도 예약 가능합니다. 항공편 시간에 맞춰 여유 있게 안내해드립니다.",
    category: "공항",
    sort_order: 1,
    active: true,
    created_at: "2026-05-25T00:00:00.000Z",
    updated_at: "2026-05-25T00:00:00.000Z"
  },
  {
    id: "faq-long-distance",
    question: "서울, 울산, 대구, 거제 같은 장거리 이동도 가능한가요?",
    answer: "가능합니다. 전국 장거리 이동 어디든 예약을 받고 있습니다.",
    category: "장거리",
    sort_order: 2,
    active: true,
    created_at: "2026-05-25T00:00:00.000Z",
    updated_at: "2026-05-25T00:00:00.000Z"
  },
  {
    id: "faq-tour-course",
    question: "관광택시는 원하는 코스로 이동할 수 있나요?",
    answer: "가능합니다. 해운대, 광안리, 송도, 기장 등 원하는 관광지를 기준으로 이동 동선을 안내해드립니다.",
    category: "관광",
    sort_order: 3,
    active: true,
    created_at: "2026-05-25T00:00:00.000Z",
    updated_at: "2026-05-25T00:00:00.000Z"
  },
  {
    id: "faq-luggage",
    question: "캐리어가 많아도 이용 가능한가요?",
    answer: "가능합니다. 예약 시 캐리어 개수와 인원수를 알려주시면 상황에 맞춰 안내해드립니다.",
    category: "예약",
    sort_order: 4,
    active: true,
    created_at: "2026-05-25T00:00:00.000Z",
    updated_at: "2026-05-25T00:00:00.000Z"
  },
  {
    id: "faq-family",
    question: "부모님이나 가족과 함께 이용해도 괜찮나요?",
    answer: "가족 이동이나 부모님 동행 일정도 많이 이용합니다. 이동 동선을 편하게 조율해드립니다.",
    category: "가족",
    sort_order: 5,
    active: true,
    created_at: "2026-05-25T00:00:00.000Z",
    updated_at: "2026-05-25T00:00:00.000Z"
  },
  {
    id: "faq-station-airport",
    question: "부산역 · KTX · 공항 픽업도 가능한가요?",
    answer: "가능합니다. 부산역, 김해공항 등 도착 시간에 맞춰 픽업 예약이 가능합니다.",
    category: "픽업",
    sort_order: 6,
    active: true,
    created_at: "2026-05-25T00:00:00.000Z",
    updated_at: "2026-05-25T00:00:00.000Z"
  },
  {
    id: "faq-same-day",
    question: "당일 예약도 가능한가요?",
    answer: "일정에 따라 가능합니다. 다만 새벽 공항이나 주말 장거리 일정은 미리 예약하는 경우가 많습니다.",
    category: "예약",
    sort_order: 7,
    active: true,
    created_at: "2026-05-25T00:00:00.000Z",
    updated_at: "2026-05-25T00:00:00.000Z"
  },
  {
    id: "faq-tour-to-long",
    question: "부산 관광 후 다른 지역으로 바로 이동할 수 있나요?",
    answer: "가능합니다. 부산 관광 후 울산, 창원, 거제, 통영 등 장거리 연계 이동도 가능합니다.",
    category: "연계 이동",
    sort_order: 8,
    active: true,
    created_at: "2026-05-25T00:00:00.000Z",
    updated_at: "2026-05-25T00:00:00.000Z"
  },
  {
    id: "faq-driver-route",
    question: "기사님이 관광 동선도 안내해주시나요?",
    answer: "희망 일정과 이동 시간을 기준으로 무리 없는 동선을 함께 안내해드립니다.",
    category: "관광",
    sort_order: 9,
    active: true,
    created_at: "2026-05-25T00:00:00.000Z",
    updated_at: "2026-05-25T00:00:00.000Z"
  },
  {
    id: "faq-rain-night",
    question: "비 오는 날이나 늦은 밤에도 이용 가능한가요?",
    answer: "가능합니다. 우천·심야 시간에도 예약 일정에 맞춰 운행합니다.",
    category: "운행",
    sort_order: 10,
    active: true,
    created_at: "2026-05-25T00:00:00.000Z",
    updated_at: "2026-05-25T00:00:00.000Z"
  },
  {
    id: "faq-solo",
    question: "혼자 이동하는 경우도 예약 가능한가요?",
    answer: "가능합니다. 출장, 병원 이동, 공항 이동 등 1인 예약도 많이 이용합니다.",
    category: "예약",
    sort_order: 11,
    active: true,
    created_at: "2026-05-25T00:00:00.000Z",
    updated_at: "2026-05-25T00:00:00.000Z"
  },
  {
    id: "faq-contact",
    question: "예약은 어떻게 하면 되나요?",
    answer: "전화, 문자, 카카오톡, 네이버 톡톡으로 편하게 문의 가능합니다.",
    category: "문의",
    sort_order: 12,
    active: true,
    created_at: "2026-05-25T00:00:00.000Z",
    updated_at: "2026-05-25T00:00:00.000Z"
  }
];
