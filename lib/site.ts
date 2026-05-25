export const siteConfig = {
  name: "장거리전문부산콜택시",
  shortName: "부산콜택시",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://busan-long-taxi.vercel.app",
  description:
    "부산 장거리택시, 김해공항 픽업, 부산관광택시, 기사 포함 VIP 이동 예약을 지원하는 모바일 후기 플랫폼입니다.",
  phoneDisplay: "0507-1333-7114",
  phoneHref: "tel:050713337114",
  smsHref: "sms:050713337114",
  kakaoUrl: "https://pf.kakao.com/_QRGwn",
  naverTalkUrl: "https://talk.naver.com/ct/ww4d5rr",
  address: "부산광역시 전 지역 배차",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/1/1c/Gwangan_Bridge_at_Night%2C_Busan.jpg",
  imageCredit:
    "Gwangan Bridge at Night, Busan by Ken Eckert, CC BY-SA 4.0, Wikimedia Commons"
};

export const seoKeywords = [
  "부산장거리택시",
  "김해공항택시",
  "부산관광택시",
  "부산콜택시",
  "부산공항픽업",
  "부산VIP택시",
  "부산기사포함렌트",
  "부산택시투어",
  "장거리전문부산콜택시",
  "부산 새벽 공항콜",
  "부산 프리미엄 택시"
];

export const navItems = [
  { href: "/", label: "홈" },
  { href: "/inquiry", label: "실시간 문의" },
  { href: "/reviews", label: "후기" },
  { href: "/tour-courses", label: "관광코스" },
  { href: "/drivers", label: "기사 소개" },
  { href: "/reservation", label: "예약문의" },
  { href: "/gimhae-airport-pickup", label: "김해공항" },
  { href: "/busan-tour-taxi", label: "관광택시" },
  { href: "/long-distance-taxi", label: "장거리택시" },
  { href: "/faq", label: "FAQ" }
];

export const primaryTags = ["지역", "공항", "관광", "장거리", "VIP", "새벽콜"];
