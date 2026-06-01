export type LongDistanceTaxiPageData = {
  slug: string;
  regionGroup: string;
  destination: string;
  mainKeyword: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  useCases: string[];
  departureExamples: string[];
  arrivalExamples: string[];
  checkList: string[];
  faqs: Array<{ question: string; answer: string }>;
  relatedSlugs: string[];
};

const commonDepartures = [
  "부산역",
  "김해공항",
  "서면",
  "해운대",
  "광안리",
  "동래",
  "사상",
  "명지",
  "기장",
  "부산진구",
  "남포동",
  "부산 숙소",
  "부산 호텔",
  "부산 병원",
  "부산 회사"
];

const baseCheckList = [
  "출발지와 도착지 주소",
  "이동 날짜와 출발 시간",
  "탑승 인원과 짐 여부",
  "경유지 또는 왕복 여부",
  "도착 희망 시간"
];

const destinationRows = [
  {
    slug: "busan-to-seoul",
    regionGroup: "수도권",
    destination: "서울",
    arrivals: ["강남", "잠실", "서울역", "용산", "여의도", "서울 주요 병원", "호텔", "회사"],
    situations: ["서울 병원 방문", "가족 일정", "출장", "공항 연계", "늦은 밤 이동"]
  },
  {
    slug: "busan-to-incheon-airport",
    regionGroup: "수도권",
    destination: "인천공항",
    arrivals: ["인천국제공항 제1터미널", "제2터미널", "공항 인근 호텔", "장기주차장", "화물청사"],
    situations: ["해외 출국", "새벽 비행기", "짐 많은 공항 이동", "가족 공항 이동"]
  },
  {
    slug: "busan-to-gimpo-airport",
    regionGroup: "수도권",
    destination: "김포공항",
    arrivals: ["김포공항 국내선", "국제선", "공항 인근 호텔", "강서구", "마곡"],
    situations: ["국내선 탑승", "공항 환승", "출장 이동", "짐 많은 이동"]
  },
  {
    slug: "busan-to-daejeon",
    regionGroup: "충청권",
    destination: "대전",
    arrivals: ["대전역", "둔산동", "유성", "대전청사", "대전 주요 병원", "연구단지"],
    situations: ["출장", "병원 방문", "가족 방문", "KTX 환승"]
  },
  {
    slug: "busan-to-sejong",
    regionGroup: "충청권",
    destination: "세종",
    arrivals: ["세종청사", "나성동", "어진동", "세종시청", "정부청사 인근 호텔"],
    situations: ["업무 미팅", "공공기관 방문", "가족 이동", "당일 왕복"]
  },
  {
    slug: "busan-to-cheongju",
    regionGroup: "충청권",
    destination: "청주",
    arrivals: ["청주공항", "오송역", "청주시청", "흥덕구", "청주 주요 병원"],
    situations: ["공항 이동", "오송역 환승", "출장", "병원 진료"]
  },
  {
    slug: "busan-to-daegu",
    regionGroup: "경상권",
    destination: "대구",
    arrivals: ["동대구역", "수성구", "대구공항", "달서구", "대구 주요 병원", "호텔", "회사"],
    situations: ["출장", "병원 방문", "가족 행사", "KTX 환승"]
  },
  {
    slug: "busan-to-ulsan",
    regionGroup: "경상권",
    destination: "울산",
    arrivals: ["울산역", "울산 남구", "동구", "울산공항", "울산 주요 병원", "산업단지"],
    situations: ["업무 이동", "공항 이동", "병원 동행", "가족 방문"]
  },
  {
    slug: "busan-to-changwon",
    regionGroup: "경상권",
    destination: "창원",
    arrivals: ["창원중앙역", "상남동", "마산", "진해", "창원병원", "창원국가산단"],
    situations: ["출장", "병원 방문", "회사 이동", "가족 일정"]
  },
  {
    slug: "busan-to-masan",
    regionGroup: "경상권",
    destination: "마산",
    arrivals: ["마산역", "합성동", "월영동", "마산합포구", "마산회원구"],
    situations: ["가족 방문", "병원 이동", "짐 많은 이동", "늦은 밤 이동"]
  },
  {
    slug: "busan-to-jinhae",
    regionGroup: "경상권",
    destination: "진해",
    arrivals: ["진해역", "석동", "용원", "진해 해군부대 인근", "진해루"],
    situations: ["부대 방문", "가족 일정", "행사 이동", "짐 많은 이동"]
  },
  {
    slug: "busan-to-gimhae",
    regionGroup: "경상권",
    destination: "김해",
    arrivals: ["김해 장유", "김해시청", "인제대", "김해공항", "진영"],
    situations: ["공항 연계", "가족 이동", "회사 방문", "병원 이동"]
  },
  {
    slug: "busan-to-yangsan",
    regionGroup: "경상권",
    destination: "양산",
    arrivals: ["양산 부산대병원", "물금", "덕계", "양산역", "통도사 인근"],
    situations: ["병원 진료", "보호자 동행", "가족 방문", "짐 많은 이동"]
  },
  {
    slug: "busan-to-jinju",
    regionGroup: "경상권",
    destination: "진주",
    arrivals: ["진주역", "진주혁신도시", "경상국립대병원", "진주시청", "평거동"],
    situations: ["병원 방문", "출장", "가족 행사", "당일 이동"]
  },
  {
    slug: "busan-to-sacheon",
    regionGroup: "경상권",
    destination: "사천",
    arrivals: ["사천공항", "삼천포항", "사천시청", "항공산업단지"],
    situations: ["공항 이동", "업무 이동", "가족 일정", "항공단지 출장"]
  },
  {
    slug: "busan-to-geoje",
    regionGroup: "경상권",
    destination: "거제",
    arrivals: ["거제 고현", "옥포", "장승포", "대명리조트 인근", "조선소 인근"],
    situations: ["회사 출장", "가족 여행", "숙소 이동", "짐 많은 이동"]
  },
  {
    slug: "busan-to-tongyeong",
    regionGroup: "경상권",
    destination: "통영",
    arrivals: ["통영항", "강구안", "죽림", "통영 케이블카", "숙소 인근"],
    situations: ["가족 여행", "숙소 이동", "항구 이동", "늦은 밤 귀가"]
  },
  {
    slug: "busan-to-goseong",
    regionGroup: "경상권",
    destination: "고성",
    arrivals: ["고성군청", "당항포", "고성읍", "회화면", "산업단지"],
    situations: ["가족 방문", "업무 이동", "행사 참석", "당일 왕복"]
  },
  {
    slug: "busan-to-namhae",
    regionGroup: "경상권",
    destination: "남해",
    arrivals: ["남해읍", "독일마을", "상주은모래비치", "남해 숙소", "다랭이마을"],
    situations: ["가족 여행", "숙소 이동", "관광 일정", "짐 많은 이동"]
  },
  {
    slug: "busan-to-pohang",
    regionGroup: "경상권",
    destination: "포항",
    arrivals: ["포항역", "영일대", "포스코 인근", "포항공항", "포항 주요 병원"],
    situations: ["출장", "병원 이동", "가족 방문", "공항 연계"]
  },
  {
    slug: "busan-to-gyeongju",
    regionGroup: "경상권",
    destination: "경주",
    arrivals: ["경주역", "보문단지", "황리단길", "불국사", "경주 숙소"],
    situations: ["가족 여행", "숙소 이동", "행사 참석", "짐 많은 이동"]
  },
  {
    slug: "busan-to-gumi",
    regionGroup: "경상권",
    destination: "구미",
    arrivals: ["구미역", "구미산단", "금오공대", "인동", "구미 주요 회사"],
    situations: ["출장", "회사 방문", "당일 왕복", "KTX 연계"]
  },
  {
    slug: "busan-to-andong",
    regionGroup: "경상권",
    destination: "안동",
    arrivals: ["안동역", "경북도청", "하회마을", "안동병원", "안동시청"],
    situations: ["가족 방문", "병원 이동", "관광 일정", "업무 이동"]
  },
  {
    slug: "busan-to-yeongdeok",
    regionGroup: "경상권",
    destination: "영덕",
    arrivals: ["영덕읍", "강구항", "영덕해맞이공원", "장사해수욕장"],
    situations: ["가족 여행", "항구 이동", "숙소 이동", "짐 많은 이동"]
  },
  {
    slug: "busan-to-uljin",
    regionGroup: "경상권",
    destination: "울진",
    arrivals: ["울진읍", "후포항", "죽변항", "덕구온천", "울진 숙소"],
    situations: ["가족 여행", "숙소 이동", "장거리 귀가", "짐 많은 이동"]
  },
  {
    slug: "busan-to-gwangju",
    regionGroup: "전라권",
    destination: "광주",
    arrivals: ["광주송정역", "상무지구", "전남대병원", "광주시청", "광주공항"],
    situations: ["병원 방문", "출장", "가족 행사", "공항 연계"]
  },
  {
    slug: "busan-to-jeonju",
    regionGroup: "전라권",
    destination: "전주",
    arrivals: ["전주역", "전주 한옥마을", "효자동", "전북대병원", "전주시청"],
    situations: ["가족 여행", "병원 이동", "행사 참석", "숙소 이동"]
  },
  {
    slug: "busan-to-gunsan",
    regionGroup: "전라권",
    destination: "군산",
    arrivals: ["군산역", "군산공항", "수송동", "군산항", "새만금 인근"],
    situations: ["출장", "가족 방문", "공항 이동", "항구 이동"]
  },
  {
    slug: "busan-to-yeosu",
    regionGroup: "전라권",
    destination: "여수",
    arrivals: ["여수엑스포역", "여수공항", "돌산", "여수항", "여수 숙소"],
    situations: ["가족 여행", "공항 이동", "숙소 이동", "짐 많은 이동"]
  },
  {
    slug: "busan-to-suncheon",
    regionGroup: "전라권",
    destination: "순천",
    arrivals: ["순천역", "순천만", "조례동", "순천향대병원 인근", "순천시청"],
    situations: ["관광 일정", "병원 이동", "가족 방문", "당일 왕복"]
  },
  {
    slug: "busan-to-mokpo",
    regionGroup: "전라권",
    destination: "목포",
    arrivals: ["목포역", "목포항", "남악", "목포시청", "목포 숙소"],
    situations: ["항구 이동", "가족 방문", "숙소 이동", "짐 많은 이동"]
  },
  {
    slug: "busan-to-gangneung",
    regionGroup: "강원권",
    destination: "강릉",
    arrivals: ["강릉역", "경포대", "안목해변", "강릉 숙소", "강릉아산병원"],
    situations: ["가족 여행", "장거리 숙소 이동", "병원 이동", "짐 많은 이동"]
  },
  {
    slug: "busan-to-sokcho",
    regionGroup: "강원권",
    destination: "속초",
    arrivals: ["속초터미널", "속초항", "대포항", "속초 숙소", "설악산 인근"],
    situations: ["가족 여행", "숙소 이동", "장거리 귀가", "짐 많은 이동"]
  },
  {
    slug: "busan-to-chuncheon",
    regionGroup: "강원권",
    destination: "춘천",
    arrivals: ["춘천역", "강원도청", "남춘천", "춘천 주요 병원", "레고랜드 인근"],
    situations: ["가족 일정", "업무 이동", "병원 방문", "숙소 이동"]
  },
  {
    slug: "busan-to-wonju",
    regionGroup: "강원권",
    destination: "원주",
    arrivals: ["원주역", "원주세브란스기독병원", "기업도시", "혁신도시", "원주시청"],
    situations: ["병원 방문", "출장", "가족 방문", "당일 왕복"]
  }
];

function createPage(row: (typeof destinationRows)[number], index: number): LongDistanceTaxiPageData {
  const mainKeyword = `부산에서 ${row.destination} 콜택시`;
  const h1 = `${mainKeyword} | 부산 출발 ${row.destination} 장거리택시 예약 안내`;
  const relatedSlugs = destinationRows
    .filter((item) => item.slug !== row.slug && item.regionGroup === row.regionGroup)
    .slice(0, 6)
    .map((item) => item.slug);

  return {
    slug: row.slug,
    regionGroup: row.regionGroup,
    destination: row.destination,
    mainKeyword,
    title: h1,
    h1,
    metaTitle: `${mainKeyword} | 부산 출발 ${row.destination} 장거리택시 예약 안내`,
    metaDescription: `부산에서 ${row.destination}까지 콜택시 이동이 필요하신가요? 출발지, 도착지, 시간, 인원, 짐 여부를 확인해 장거리택시 예약 상담을 안내합니다. 장거리전문부산콜택시 0507-1333-7114`,
    summary: `부산에서 ${row.destination}까지 이동해야 할 때 짐이 많거나 출발 시간이 이른 경우, 또는 목적지까지 한 번에 이동하고 싶은 경우 장거리 콜택시 예약 상담을 고려할 수 있습니다. ${row.destination} 이동은 출발 위치와 도착지, 경유지, 탑승 인원, 짐 여부에 따라 이동 조건이 달라질 수 있어 사전 상담이 좋습니다.`,
    useCases: row.situations,
    departureExamples: commonDepartures,
    arrivalExamples: row.arrivals,
    checkList: baseCheckList,
    faqs: [
      {
        question: `부산에서 ${row.destination} 콜택시 예약 상담이 가능한가요?`,
        answer: `출발지, 도착지, 시간, 인원, 짐 여부에 따라 상담 후 예약 가능 여부를 확인할 수 있습니다.`
      },
      {
        question: `부산에서 ${row.destination}까지 새벽 출발도 상담할 수 있나요?`,
        answer: `장거리 이동은 사전 예약을 권장하며, 시간대에 따라 가능 여부를 미리 확인하는 것이 좋습니다.`
      },
      {
        question: `${row.destination} 이동 시 짐이 많아도 괜찮나요?`,
        answer: `캐리어, 골프백 등 짐이 있는 경우 예약 상담 때 알려주시면 차량 이용 가능 여부를 확인하는 데 도움이 됩니다.`
      },
      {
        question: `부산에서 ${row.destination} 장거리택시 요금은 어떻게 확인하나요?`,
        answer: `장거리 이동은 출발지, 도착지, 경유지, 시간대 등에 따라 달라질 수 있어 전화, 문자, 카카오톡, 네이버 톡톡 상담으로 확인하는 방식이 좋습니다.`
      }
    ],
    relatedSlugs: relatedSlugs.length
      ? relatedSlugs
      : destinationRows
          .filter((item) => item.slug !== row.slug)
          .slice(index + 1, index + 7)
          .map((item) => item.slug)
  };
}

export const longDistanceTaxiPages = destinationRows.map(createPage);

export const longDistanceTaxiPageMap = new Map(longDistanceTaxiPages.map((page) => [page.slug, page]));

export const longDistanceRegionGroups = Array.from(new Set(longDistanceTaxiPages.map((page) => page.regionGroup)));

export function getLongDistanceTaxiPage(slug: string) {
  return longDistanceTaxiPageMap.get(slug);
}
