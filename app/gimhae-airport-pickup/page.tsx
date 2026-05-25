import type { Metadata } from "next";
import { Clock3, Luggage, Plane } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "김해공항 픽업 안내",
  description: "김해공항택시, 부산공항픽업, 새벽 공항콜 예약 안내. 부산 전 지역에서 김해공항 이동 상담."
};

export default function GimhaeAirportPickupPage() {
  return (
    <>
      <PageHero
        eyebrow="Gimhae Airport Pickup"
        title="김해공항 픽업 안내"
        description="새벽 출발, 심야 도착, 캐리어가 많은 가족 이동까지 김해공항 기준으로 여유 있게 배차합니다."
      >
        <Button asChild size="xl" variant="accent">
          <a href={siteConfig.phoneHref}>공항 픽업 전화문의</a>
        </Button>
      </PageHero>
      <section className="py-12">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-3">
          {[
            { icon: Clock3, title: "새벽 공항콜", text: "항공편 시간보다 여유 있게 픽업 시간을 조율합니다." },
            { icon: Luggage, title: "짐 많은 이동", text: "캐리어 개수와 인원을 미리 확인해 차량을 안내합니다." },
            { icon: Plane, title: "국내선·국제선", text: "터미널 위치와 도착 상황에 맞춰 안내합니다." }
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
