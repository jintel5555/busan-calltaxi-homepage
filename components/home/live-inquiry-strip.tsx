"use client";

import { useEffect, useMemo, useState } from "react";
import { Radio } from "lucide-react";

const fromPlaces = ["해운대", "부산역", "서면", "광안리", "기장", "동래", "남포동", "센텀시티", "송정", "영도"];
const toPlaces = ["김해공항", "울산", "창원", "대구", "감천문화마을", "송도", "해운대 숙소", "부산항", "양산", "광안리"];
const purposes = [
  "새벽 공항 픽업 문의",
  "가족 이동 차량 문의",
  "장거리 이동 견적 요청",
  "부산 관광택시 코스 상담",
  "캐리어 많은 공항 이동",
  "부모님 동행 차량 문의",
  "출장 이동 예약 문의",
  "심야 도착 픽업 상담"
];

function createInquiryText(index: number) {
  const from = fromPlaces[index % fromPlaces.length];
  const to = toPlaces[(index * 3 + 2) % toPlaces.length];
  const purpose = purposes[(index * 5 + 1) % purposes.length];
  const hour = (index * 2 + 5) % 24;
  return `${from} → ${to} ${hour.toString().padStart(2, "0")}시 ${purpose}`;
}

export function LiveInquiryStrip() {
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSeed((value) => value + 1);
    }, 3500);

    return () => window.clearInterval(timer);
  }, []);

  const items = useMemo(() => {
    const generated = Array.from({ length: 10 }, (_, index) => createInquiryText(seed + index));
    return [...generated, ...generated];
  }, [seed]);

  return (
    <section className="overflow-hidden border-y bg-primary py-4 text-primary-foreground">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4">
        <div className="flex shrink-0 items-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm font-black text-accent-foreground">
          <Radio className="size-4" />
          실시간 문의
        </div>
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="ticker flex w-max gap-8 text-sm" key={seed}>
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
