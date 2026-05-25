import type { Metadata } from "next";
import { CarFront, CheckCircle2, Clock3, Luggage, MapPinned, Plane } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "김해공항 픽업 안내",
  description: "김해공항택시, 부산공항픽업, 새벽 공항콜 예약 안내. 가족 이동과 부산·경남 장거리 이동 상담."
};

const pickupCards = [
  {
    icon: Clock3,
    title: "도착 시간 맞춤 픽업",
    text: "항공편 시간과 도착 상황을 확인해 무리 없는 픽업 시간을 조율합니다."
  },
  {
    icon: Luggage,
    title: "짐 많은 가족 이동",
    text: "캐리어, 유모차, 골프백 등 짐이 많은 이동도 편하게 도와드립니다."
  },
  {
    icon: MapPinned,
    title: "부산 · 경남 장거리 이동",
    text: "부산 시내는 물론 창원, 울산, 거제, 통영 등 장거리 이동도 가능합니다."
  }
];

const recommendedFor = [
  "새벽 비행기 도착 후 택시 잡기 걱정되는 분",
  "부모님, 아이와 함께 이동하는 가족",
  "캐리어가 많아 대중교통이 불편한 분",
  "김해공항에서 부산 외 지역으로 이동하는 분",
  "관광 일정까지 함께 상담하고 싶은 분"
];

export default function GimhaeAirportPickupPage() {
  return (
    <>
      <PageHero
        eyebrow="Gimhae Airport Pickup"
        title="김해공항 도착부터 목적지까지 편안하게"
        description="비행기 도착 시간에 맞춰 김해공항에서 대기하고, 짐이 많은 가족 이동이나 늦은 밤 도착도 여유 있게 안내합니다."
      >
        <Button asChild size="xl" variant="accent">
          <a href={siteConfig.kakaoChatUrl} target="_blank" rel="noreferrer">
            공항 픽업 예약하기
          </a>
        </Button>
      </PageHero>

      <section className="py-12">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-3">
          {pickupCards.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title}>
                <CardHeader>
                  <Icon className="size-8 text-accent" />
                  <CardTitle className="text-2xl font-black">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-7 text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="bg-muted/45 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="font-bold text-accent-foreground dark:text-accent">Airport Pickup</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">이런 분께 추천드립니다</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              김해공항 도착 이후 이동이 걱정되는 상황이라면 도착 시간, 짐, 목적지에 맞춰 편한 이동을 안내합니다.
            </p>
          </div>
          <div className="grid gap-3">
            {recommendedFor.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-lg border bg-card p-4">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" />
                <span className="font-semibold leading-7">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-[1fr_1fr]">
          <Card>
            <CardHeader>
              <Plane className="size-8 text-accent" />
              <CardTitle className="text-2xl font-black">예약 시 알려주시면 좋아요</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-8 text-muted-foreground">
                출발 공항, 도착 시간, 인원수, 캐리어 개수, 목적지를 알려주시면 상황에 맞춰 가장 편한 이동
                방식으로 안내드립니다.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CarFront className="size-8 text-accent" />
              <CardTitle className="text-2xl font-black">김해공항 픽업이 필요하신가요?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="leading-8 text-primary-foreground/82">도착 시간에 맞춰 편안하게 모시겠습니다.</p>
              <Button asChild size="xl" variant="accent" className="w-full sm:w-auto">
                <a href={siteConfig.kakaoChatUrl} target="_blank" rel="noreferrer">
                  공항 픽업 예약하기
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
