import type { Metadata } from "next";
import { BriefcaseBusiness, CarFront, Route } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "장거리택시 안내",
  description: "부산장거리택시 안내. 부산 출발 울산, 창원, 대구, 경남권 장거리 이동 예약 상담."
};

export default function LongDistanceTaxiPage() {
  return (
    <>
      <PageHero
        eyebrow="Long Distance Taxi"
        title="부산 장거리택시 안내"
        description="출장, 병원 이동, 가족 방문, 공항 연계 이동처럼 시간이 중요한 장거리 일정을 편하게 연결합니다."
      >
        <Button asChild size="xl" variant="accent">
          <a href={siteConfig.phoneHref}>장거리 이동 전화문의</a>
        </Button>
      </PageHero>
      <section className="py-12">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-3">
          {[
            { icon: Route, title: "부산 출발 장거리", text: "울산, 창원, 김해, 양산, 대구권 이동 상담을 지원합니다." },
            { icon: BriefcaseBusiness, title: "출장 이동", text: "조용한 차량 환경과 정시 도착을 우선합니다." },
            { icon: CarFront, title: "프리미엄 차량", text: "짐과 인원에 맞춰 편안한 차량 배차를 상담합니다." }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-lg border bg-card p-5">
                <Icon className="size-8 text-accent" />
                <h2 className="mt-4 text-2xl font-black">{item.title}</h2>
                <p className="mt-3 leading-7 text-muted-foreground">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
