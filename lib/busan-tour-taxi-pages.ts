export type BusanTourTaxiPageData = {
  slug: string;
  category: string;
  destination: string;
  mainKeyword: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  useCases: string[];
  recommendedFor: string[];
  courseExamples: string[];
  checkList: string[];
  faqs: Array<{ question: string; answer: string }>;
  relatedSlugs: string[];
};

type TourPageRow = {
  slug: string;
  category: string;
  destination: string;
  mainKeyword: string;
  anchors: string[];
  focus: string;
  recommended?: string[];
};

const checkList = [
  "출발지와 도착지",
  "희망 관광지",
  "이동 날짜와 시간",
  "탑승 인원",
  "캐리어와 짐 여부",
  "경유지 여부",
  "관광 희망 시간",
  "공항·역·호텔 픽업 여부"
];

const commonRecommended = [
  "부산 여행 동선을 짧게 잡고 싶은 분",
  "부모님, 가족과 편하게 이동하려는 분",
  "짐이 있거나 대중교통 환승이 번거로운 분",
  "사진 명소와 식사 장소를 함께 들르고 싶은 분"
];

const tourPageRows: TourPageRow[] = [
  {
    slug: "haeundae",
    category: "부산 주요 관광지",
    destination: "해운대",
    mainKeyword: "부산 해운대 관광택시",
    anchors: ["해운대해수욕장", "동백섬", "달맞이길", "마린시티"],
    focus: "해운대 바다와 주변 야경, 숙소 이동까지 한 번에 연결하기 좋은 일정"
  },
  {
    slug: "gwangalli",
    category: "부산 주요 관광지",
    destination: "광안리",
    mainKeyword: "부산 광안리 관광택시",
    anchors: ["광안리해수욕장", "광안대교", "민락수변공원", "마린시티"],
    focus: "광안대교 야경과 바닷가 식사 동선을 함께 잡기 좋은 일정"
  },
  {
    slug: "songdo",
    category: "부산 주요 관광지",
    destination: "송도",
    mainKeyword: "부산 송도 관광택시",
    anchors: ["송도해수욕장", "송도해상케이블카", "암남공원", "남포동"],
    focus: "송도 바다와 원도심 관광을 함께 둘러보기 좋은 일정"
  },
  {
    slug: "gamcheon-culture-village",
    category: "부산 주요 관광지",
    destination: "감천문화마을",
    mainKeyword: "부산 감천문화마을 관광택시",
    anchors: ["감천문화마을", "송도", "자갈치시장", "국제시장"],
    focus: "골목길 사진 명소와 시장 관광을 함께 연결하기 좋은 일정"
  },
  {
    slug: "huinnyeoul-culture-village",
    category: "부산 주요 관광지",
    destination: "흰여울문화마을",
    mainKeyword: "부산 흰여울문화마을 관광택시",
    anchors: ["흰여울문화마을", "영도", "태종대", "남포동"],
    focus: "영도 바다 풍경과 카페, 원도심 이동을 함께 잡기 좋은 일정"
  },
  {
    slug: "taejongdae",
    category: "부산 주요 관광지",
    destination: "태종대",
    mainKeyword: "부산 태종대 관광택시",
    anchors: ["태종대", "영도대교", "흰여울문화마을", "남포동"],
    focus: "영도권 관광지를 편하게 이어서 둘러보기 좋은 일정"
  },
  {
    slug: "oryukdo",
    category: "부산 주요 관광지",
    destination: "오륙도",
    mainKeyword: "부산 오륙도 관광택시",
    anchors: ["오륙도스카이워크", "이기대", "광안리", "마린시티"],
    focus: "해안 산책 포인트와 광안리 야경을 함께 묶기 좋은 일정"
  },
  {
    slug: "gijang",
    category: "부산 주요 관광지",
    destination: "기장",
    mainKeyword: "부산 기장 관광택시",
    anchors: ["기장시장", "해동용궁사", "오시리아", "일광"],
    focus: "부산 동부권 바다, 사찰, 카페 코스를 여유 있게 이동하는 일정"
  },
  {
    slug: "haedong-yonggungsa",
    category: "부산 주요 관광지",
    destination: "해동용궁사",
    mainKeyword: "부산 해동용궁사 관광택시",
    anchors: ["해동용궁사", "기장", "청사포", "송정"],
    focus: "바다 사찰과 동부산 드라이브를 함께 잡기 좋은 일정"
  },
  {
    slug: "cheongsapo",
    category: "부산 주요 관광지",
    destination: "청사포",
    mainKeyword: "부산 청사포 관광택시",
    anchors: ["청사포", "달맞이길", "해운대", "송정"],
    focus: "해안도로와 카페, 해변 열차 주변 이동을 편하게 잇는 일정"
  },
  {
    slug: "songjeong",
    category: "부산 주요 관광지",
    destination: "송정",
    mainKeyword: "부산 송정 관광택시",
    anchors: ["송정해수욕장", "청사포", "기장", "해운대"],
    focus: "송정 바다와 동부산 카페, 해운대 숙소 이동을 함께 잡는 일정"
  },
  {
    slug: "dadaepo",
    category: "부산 주요 관광지",
    destination: "다대포",
    mainKeyword: "부산 다대포 관광택시",
    anchors: ["다대포해수욕장", "몰운대", "감천문화마을", "송도"],
    focus: "서부산 노을과 바다 풍경을 중심으로 이동하기 좋은 일정"
  },
  {
    slug: "yeongdo",
    category: "부산 주요 관광지",
    destination: "영도",
    mainKeyword: "부산 영도 관광택시",
    anchors: ["영도", "흰여울문화마을", "태종대", "부산항"],
    focus: "영도 바다길, 카페, 원도심 관광지를 함께 둘러보는 일정"
  },
  {
    slug: "nampo-dong",
    category: "부산 주요 관광지",
    destination: "남포동",
    mainKeyword: "부산 남포동 관광택시",
    anchors: ["남포동", "BIFF광장", "자갈치시장", "국제시장"],
    focus: "부산 원도심 쇼핑, 시장, 식사 동선을 편하게 이동하는 일정"
  },
  {
    slug: "jagalchi-market",
    category: "부산 주요 관광지",
    destination: "자갈치시장",
    mainKeyword: "부산 자갈치시장 관광택시",
    anchors: ["자갈치시장", "남포동", "국제시장", "송도"],
    focus: "시장 관광과 식사, 송도 또는 감천문화마을을 함께 잇는 일정"
  },
  {
    slug: "gukje-market",
    category: "부산 주요 관광지",
    destination: "국제시장",
    mainKeyword: "부산 국제시장 관광택시",
    anchors: ["국제시장", "깡통시장", "남포동", "자갈치시장"],
    focus: "원도심 시장 투어와 부산역, 호텔 이동을 함께 잡기 좋은 일정"
  },
  {
    slug: "half-day",
    category: "여행 상황별 관광택시",
    destination: "반나절 부산여행",
    mainKeyword: "부산 반나절 관광택시",
    anchors: ["부산역", "해운대", "광안리", "감천문화마을"],
    focus: "짧은 시간 안에 핵심 코스만 골라 이동하는 반나절 일정",
    recommended: ["KTX 도착 후 시간이 짧은 여행객", "오전 또는 오후만 관광 가능한 분", "공항 이동 전 잠깐 둘러보고 싶은 분"]
  },
  {
    slug: "one-day",
    category: "여행 상황별 관광택시",
    destination: "하루 부산여행",
    mainKeyword: "부산 하루 관광택시",
    anchors: ["해운대", "광안리", "영도", "남포동"],
    focus: "부산 대표 관광지를 하루 일정으로 연결하는 이동",
    recommended: ["당일치기 부산 여행객", "부산 첫 방문 여행객", "관광지 사이 이동 시간을 줄이고 싶은 분"]
  },
  {
    slug: "three-days",
    category: "여행 상황별 관광택시",
    destination: "부산 2박3일 여행",
    mainKeyword: "부산 2박3일 관광택시",
    anchors: ["해운대", "기장", "영도", "남포동"],
    focus: "2박3일 동안 동부산, 원도심, 야경 코스를 나누어 이동하는 일정",
    recommended: ["가족 2박3일 여행객", "부산 주요 권역을 나누어 보고 싶은 분", "숙소 이동과 관광을 함께 상담하려는 분"]
  },
  {
    slug: "family-trip",
    category: "여행 상황별 관광택시",
    destination: "부산 가족여행",
    mainKeyword: "부산 가족여행 관광택시",
    anchors: ["해운대", "기장", "송도", "광안리"],
    focus: "아이와 부모님이 함께 움직이기 편한 가족여행 이동",
    recommended: ["아이 동반 가족", "캐리어가 많은 가족 여행객", "걷는 시간을 줄이고 싶은 분"]
  },
  {
    slug: "parents-trip",
    category: "여행 상황별 관광택시",
    destination: "부산 부모님 여행",
    mainKeyword: "부산 부모님 여행 관광택시",
    anchors: ["해동용궁사", "태종대", "광안리", "자갈치시장"],
    focus: "부모님 체력과 휴식 시간을 고려해 관광지를 연결하는 일정",
    recommended: ["부모님 모시고 부산 여행하는 분", "계단과 환승을 줄이고 싶은 분", "식사 장소까지 편하게 이동하려는 분"]
  },
  {
    slug: "couple-trip",
    category: "여행 상황별 관광택시",
    destination: "부산 커플여행",
    mainKeyword: "부산 커플여행 관광택시",
    anchors: ["광안리", "청사포", "해운대", "흰여울문화마을"],
    focus: "사진 스팟과 야경, 카페 코스를 함께 이동하는 커플 일정",
    recommended: ["부산 데이트 코스를 찾는 분", "사진 명소를 여러 곳 들르고 싶은 분", "야경 이동을 편하게 하고 싶은 분"]
  },
  {
    slug: "rainy-day",
    category: "여행 상황별 관광택시",
    destination: "비오는날 부산여행",
    mainKeyword: "부산 비오는날 관광택시",
    anchors: ["부산역", "남포동", "해운대", "광안리"],
    focus: "비 오는 날 우산과 짐 부담을 줄이고 실내외 코스를 연결하는 일정",
    recommended: ["비 예보가 있는 부산 여행객", "아이 또는 부모님 동반 여행객", "차량 이동 중심으로 일정을 조정하고 싶은 분"]
  },
  {
    slug: "night-view",
    category: "여행 상황별 관광택시",
    destination: "부산 야경",
    mainKeyword: "부산 야경 관광택시",
    anchors: ["광안대교", "마린시티", "황령산", "청사포"],
    focus: "부산 야경 포인트를 안전하게 이어 보는 저녁 이동",
    recommended: ["저녁 도착 여행객", "야경 사진을 찍고 싶은 분", "숙소 귀가까지 한 번에 상담하려는 분"]
  },
  {
    slug: "photo-spots",
    category: "여행 상황별 관광택시",
    destination: "부산 사진스팟",
    mainKeyword: "부산 사진스팟 관광택시",
    anchors: ["흰여울문화마을", "청사포", "감천문화마을", "오륙도"],
    focus: "사진 명소를 이동 동선에 맞춰 여러 곳 들르는 일정",
    recommended: ["사진 여행을 준비하는 분", "SNS용 부산 여행 코스를 찾는 분", "대중교통으로 연결이 번거로운 포인트를 가려는 분"]
  },
  {
    slug: "food-tour",
    category: "여행 상황별 관광택시",
    destination: "부산 맛집투어",
    mainKeyword: "부산 맛집투어 관광택시",
    anchors: ["남포동", "자갈치시장", "기장", "광안리"],
    focus: "식사 장소와 관광지를 함께 연결하는 부산 맛집투어 이동",
    recommended: ["시장 음식과 바다 코스를 함께 즐기려는 분", "가족 식사 장소까지 편하게 이동하려는 분", "여러 지역 맛집을 하루에 묶고 싶은 분"]
  },
  {
    slug: "market-tour",
    category: "여행 상황별 관광택시",
    destination: "부산 시장투어",
    mainKeyword: "부산 시장투어 관광택시",
    anchors: ["자갈치시장", "국제시장", "깡통시장", "부산역"],
    focus: "부산 원도심 시장과 식사, 쇼핑을 편하게 이동하는 일정",
    recommended: ["부산 시장을 여유 있게 둘러보고 싶은 분", "부모님과 원도심 관광을 하는 분", "부산역 출발 또는 귀가 전 들르려는 분"]
  },
  {
    slug: "coastal-road",
    category: "여행 상황별 관광택시",
    destination: "부산 해안도로",
    mainKeyword: "부산 해안도로 관광택시",
    anchors: ["해운대", "청사포", "송정", "기장"],
    focus: "부산 바다길을 따라 드라이브와 카페 코스를 잇는 일정",
    recommended: ["바다 드라이브를 원하는 분", "걷기보다 차 안에서 풍경을 보고 싶은 분", "동부산 코스를 여유 있게 보고 싶은 분"]
  },
  {
    slug: "gimhae-airport",
    category: "공항 · 역 · 항만 픽업 관광",
    destination: "김해공항",
    mainKeyword: "김해공항 부산 관광택시",
    anchors: ["김해공항", "부산역", "해운대", "광안리"],
    focus: "공항 도착 후 바로 관광을 시작하거나 귀국 전 관광을 연결하는 일정",
    recommended: ["김해공항 도착 여행객", "캐리어가 있는 가족 여행객", "비행기 시간에 맞춰 관광을 조정하려는 분"]
  },
  {
    slug: "busan-station",
    category: "공항 · 역 · 항만 픽업 관광",
    destination: "부산역",
    mainKeyword: "부산역 관광택시",
    anchors: ["부산역", "남포동", "영도", "광안리"],
    focus: "KTX 도착 후 짐을 싣고 바로 부산 관광을 시작하기 좋은 일정"
  },
  {
    slug: "busan-port",
    category: "공항 · 역 · 항만 픽업 관광",
    destination: "부산항 국제여객터미널",
    mainKeyword: "부산항 국제여객터미널 관광택시",
    anchors: ["부산항", "영도", "남포동", "해운대"],
    focus: "터미널 도착 또는 출항 전 부산 관광을 연결하는 일정"
  },
  {
    slug: "hotel-pickup",
    category: "공항 · 역 · 항만 픽업 관광",
    destination: "부산 호텔 픽업",
    mainKeyword: "부산 호텔 픽업 관광택시",
    anchors: ["해운대 호텔", "광안리 숙소", "서면 호텔", "부산역"],
    focus: "숙소 앞 픽업으로 관광지 이동과 귀가 동선을 편하게 잡는 일정"
  },
  {
    slug: "haeundae-hotel",
    category: "공항 · 역 · 항만 픽업 관광",
    destination: "해운대 호텔",
    mainKeyword: "해운대 호텔 관광택시",
    anchors: ["해운대 호텔", "청사포", "기장", "광안리"],
    focus: "해운대 숙소에서 출발해 동부산과 야경 코스를 연결하는 일정"
  },
  {
    slug: "gwangalli-hotel",
    category: "공항 · 역 · 항만 픽업 관광",
    destination: "광안리 호텔",
    mainKeyword: "광안리 호텔 관광택시",
    anchors: ["광안리 호텔", "마린시티", "오륙도", "해운대"],
    focus: "광안리 숙소에서 야경, 해안 코스, 식사 장소를 잇는 일정"
  },
  {
    slug: "seomyeon-hotel",
    category: "공항 · 역 · 항만 픽업 관광",
    destination: "서면 호텔",
    mainKeyword: "서면 호텔 관광택시",
    anchors: ["서면 호텔", "부산역", "남포동", "광안리"],
    focus: "서면 숙소를 기준으로 원도심과 해변 관광지를 연결하는 일정"
  },
  {
    slug: "cruise",
    category: "공항 · 역 · 항만 픽업 관광",
    destination: "부산 크루즈",
    mainKeyword: "부산 크루즈 관광택시",
    anchors: ["부산항", "크루즈터미널", "영도", "해운대"],
    focus: "크루즈 일정 전후로 부산 주요 관광지를 편하게 이동하는 일정"
  },
  {
    slug: "foreign-tourist",
    category: "공항 · 역 · 항만 픽업 관광",
    destination: "부산 외국인 관광",
    mainKeyword: "부산 외국인 관광택시",
    anchors: ["김해공항", "부산역", "해운대", "감천문화마을"],
    focus: "외국인 손님 또는 해외 지인 동행 시 편한 이동을 상담하는 일정"
  },
  {
    slug: "busan-to-gyeongju",
    category: "부산 출발 근교 관광",
    destination: "경주",
    mainKeyword: "부산 출발 경주 관광택시",
    anchors: ["경주 보문단지", "황리단길", "불국사", "첨성대"],
    focus: "부산에서 경주 역사 관광지를 당일 또는 숙박 일정으로 이동하는 코스"
  },
  {
    slug: "busan-to-ganjeolgot",
    category: "부산 출발 근교 관광",
    destination: "간절곶",
    mainKeyword: "부산 출발 간절곶 관광택시",
    anchors: ["간절곶", "울산 대왕암", "일산해수욕장", "해운대"],
    focus: "부산에서 울산 해안 명소와 일출 포인트를 함께 둘러보는 코스"
  },
  {
    slug: "busan-to-tongyeong",
    category: "부산 출발 근교 관광",
    destination: "통영",
    mainKeyword: "부산 출발 통영 관광택시",
    anchors: ["통영 케이블카", "동피랑", "강구안", "통영항"],
    focus: "부산에서 통영 바다 관광과 항구 주변 이동을 연결하는 코스"
  },
  {
    slug: "busan-to-geoje",
    category: "부산 출발 근교 관광",
    destination: "거제",
    mainKeyword: "부산 출발 거제 관광택시",
    anchors: ["거제 바람의언덕", "외도 선착장", "고현", "장승포"],
    focus: "부산에서 거제 숙소, 선착장, 바다 명소를 편하게 이동하는 코스"
  },
  {
    slug: "busan-to-namhae",
    category: "부산 출발 근교 관광",
    destination: "남해",
    mainKeyword: "부산 출발 남해 관광택시",
    anchors: ["남해 독일마을", "다랭이마을", "상주은모래비치", "남해 숙소"],
    focus: "부산에서 남해 여행지와 숙소 이동을 함께 상담하는 장거리 관광 코스"
  },
  {
    slug: "busan-to-yeosu",
    category: "부산 출발 근교 관광",
    destination: "여수",
    mainKeyword: "부산 출발 여수 관광택시",
    anchors: ["여수엑스포역", "오동도", "낭만포차거리", "여수 숙소"],
    focus: "부산에서 여수 관광지와 숙소까지 편하게 이동하는 코스"
  },
  {
    slug: "busan-to-jinju",
    category: "부산 출발 근교 관광",
    destination: "진주",
    mainKeyword: "부산 출발 진주 관광택시",
    anchors: ["진주성", "남강", "진주역", "진주혁신도시"],
    focus: "부산에서 진주 행사, 관광, 가족 방문 일정을 함께 이동하는 코스"
  },
  {
    slug: "busan-to-miryang",
    category: "부산 출발 근교 관광",
    destination: "밀양",
    mainKeyword: "부산 출발 밀양 관광택시",
    anchors: ["밀양 영남루", "위양지", "표충사", "밀양역"],
    focus: "부산에서 밀양 자연 풍경과 역사 코스를 당일로 이동하는 일정"
  },
  {
    slug: "busan-to-cheongdo",
    category: "부산 출발 근교 관광",
    destination: "청도",
    mainKeyword: "부산 출발 청도 관광택시",
    anchors: ["청도 프로방스", "와인터널", "운문사", "청도역"],
    focus: "부산에서 청도 드라이브와 가족 나들이 코스를 연결하는 일정"
  },
  {
    slug: "busan-to-pohang",
    category: "부산 출발 근교 관광",
    destination: "포항",
    mainKeyword: "부산 출발 포항 관광택시",
    anchors: ["포항 영일대", "호미곶", "포항역", "죽도시장"],
    focus: "부산에서 포항 바다 관광과 시장, 역 이동을 함께 상담하는 일정"
  }
];

function relatedSlugsFor(row: TourPageRow) {
  const sameCategory = tourPageRows.filter((item) => item.category === row.category && item.slug !== row.slug);
  const sameIndex = tourPageRows.findIndex((item) => item.slug === row.slug);
  const rotated = sameCategory.slice(sameIndex % Math.max(sameCategory.length, 1)).concat(sameCategory.slice(0, sameIndex));

  return rotated.slice(0, 5).map((item) => item.slug);
}

function createCourseExamples(row: TourPageRow) {
  const [first, second, third, fourth] = row.anchors;

  return [
    `${first} 출발 또는 도착 기준으로 ${second}, ${third}를 함께 둘러보는 코스`,
    `부산역, 김해공항, 호텔 픽업 후 ${row.destination} 중심으로 이동하는 코스`,
    `${row.destination} 관광 후 ${fourth || "숙소"} 또는 식사 장소까지 이어지는 코스`,
    `비행기, KTX, 크루즈 시간에 맞춰 ${row.destination} 일정을 조정하는 코스`
  ];
}

function createFaqs(row: TourPageRow) {
  return [
    {
      question: `${row.mainKeyword} 예약은 어떻게 하나요?`,
      answer: `전화, 문자, 카카오톡, 네이버 톡톡으로 출발지와 희망 관광지, 날짜, 시간을 알려주시면 ${row.destination} 일정에 맞춰 예약 가능 여부를 상담할 수 있습니다.`
    },
    {
      question: `${row.destination}만 보고 다른 곳도 경유할 수 있나요?`,
      answer: `가능 여부는 일정과 이동 시간에 따라 달라집니다. ${row.anchors.join(", ")}처럼 가까운 관광지를 함께 묶어 상담하는 경우가 많습니다.`
    },
    {
      question: `김해공항이나 부산역에서 바로 출발할 수 있나요?`,
      answer: `김해공항, 부산역, 부산항, 호텔 픽업을 기준으로 상담 가능합니다. 항공편이나 열차 도착 시간이 있으면 사전에 알려주시는 편이 좋습니다.`
    },
    {
      question: `부모님이나 가족 여행에도 괜찮나요?`,
      answer: `걷는 시간을 줄이고 짐을 차량에 둘 수 있어 부모님, 아이 동반 가족 여행에 맞춰 상담하기 좋습니다. 다만 관광지 운영 시간과 현장 상황은 사전 확인이 필요합니다.`
    },
    {
      question: `요금은 바로 확정되나요?`,
      answer: `출발지, 방문지, 대기 시간, 왕복 여부에 따라 달라질 수 있어 상담 후 안내됩니다. 무리한 확정 안내보다 실제 일정에 맞춘 확인을 권장합니다.`
    }
  ];
}

function createPage(row: TourPageRow): BusanTourTaxiPageData {
  const summary = `${row.mainKeyword}는 ${row.focus}입니다. 부산 여행은 관광지 사이 거리가 생각보다 넓고, 주차와 환승이 번거로운 구간이 있어 출발지와 방문지를 미리 정리하면 이동 동선을 더 편하게 잡을 수 있습니다. 장거리전문부산콜택시는 김해공항, 부산역, 부산항, 해운대·광안리·서면 호텔 픽업부터 관광 후 숙소 귀가까지 일정에 맞춘 상담을 제공합니다.`;

  return {
    slug: row.slug,
    category: row.category,
    destination: row.destination,
    mainKeyword: row.mainKeyword,
    title: row.mainKeyword,
    h1: `${row.mainKeyword} 예약 상담`,
    metaTitle: `${row.mainKeyword} | 장거리전문부산콜택시`,
    metaDescription: `${row.mainKeyword} 예약 상담. ${row.anchors.join(", ")} 코스, 김해공항·부산역·호텔 픽업, 가족여행과 야경 이동 상담 가능.`,
    summary,
    useCases: [
      `${row.focus}`,
      `${row.anchors[0]}와 ${row.anchors[1]}를 함께 이동하려는 일정`,
      "김해공항, 부산역, 부산항 도착 후 바로 관광을 시작하는 일정",
      "부모님, 아이, 캐리어 동반으로 환승을 줄이고 싶은 일정"
    ],
    recommendedFor: row.recommended || commonRecommended,
    courseExamples: createCourseExamples(row),
    checkList,
    faqs: createFaqs(row),
    relatedSlugs: relatedSlugsFor(row)
  };
}

export const busanTourTaxiPages = tourPageRows.map(createPage);

export const busanTourTaxiCategories = Array.from(new Set(busanTourTaxiPages.map((page) => page.category)));

export function getBusanTourTaxiPage(slug: string) {
  return busanTourTaxiPages.find((page) => page.slug === slug);
}
