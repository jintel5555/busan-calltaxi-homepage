"use client";

import { Radio } from "lucide-react";

const inquiryItems = [
  "해운대 → 김해공항 05시 공항 이동 상담",
  "부산역 → 광안리 11시 관광택시 문의",
  "서면 → 울산 14시 장거리 견적 요청",
  "기장 → 김해공항 06시 캐리어 이동 문의",
  "광안리 → 부산역 21시 픽업 상담",
  "동래 → 창원 09시 업무 이동 예약",
  "남포동 → 송도 13시 가족 이동 문의",
  "센텀시티 → 대구 16시 장거리 예약",
  "송정 → 김해공항 04시 새벽 출발 상담",
  "영도 → 부산항 08시 여객터미널 이동",
  "부산역 → 감천문화마을 10시 관광코스 상담",
  "해운대 숙소 → 기장 15시 관광택시 문의",
  "서면 → 양산 19시 장거리 이동 상담",
  "부산역 → 해운대 22시 심야 픽업 문의",
  "광안리 → 김해공항 07시 공항 예약",
  "동래 → 경주 12시 장거리 견적 요청",
  "부산항 → 부산역 09시 짐 많은 이동 상담",
  "센텀시티 → 울산 17시 출장 이동 문의",
  "남포동 → 태종대 14시 관광택시 코스",
  "기장 → 부산역 18시 가족 이동 예약",
  "해운대 → 창원 20시 장거리 이동 상담",
  "부산역 → 송정 16시 쾌적한 차량 문의",
  "영도 → 김해공항 05시 금연 차량 요청",
  "서면 → 부산항 07시 이른 아침 픽업",
  "광안리 → 대구 13시 장거리 예약 상담",
  "부산역 → 자갈치 12시 부모님 동행 문의",
  "해운대 → 양산 23시 심야 이동 상담",
  "동래 → 감천문화마을 11시 관광 이동",
  "부산항 → 김해공항 06시 환승 이동 문의",
  "센텀시티 → 부산역 10시 출장객 이동"
];

export function LiveInquiryStrip() {
  const items = [...inquiryItems, ...inquiryItems];

  return (
    <section className="overflow-hidden border-y bg-primary py-4 text-primary-foreground">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4">
        <div className="flex shrink-0 items-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm font-black text-accent-foreground">
          <Radio className="size-4" />
          실시간 문의
        </div>
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="ticker flex w-max gap-8 text-sm">
            {items.map((item, index) => (
              <span key={`${item}-${index}`} className="whitespace-nowrap text-primary-foreground/86">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
