import type { Metadata } from "next";
import {
  BriefcaseBusiness,
  CarFront,
  CheckCircle2,
  Clock3,
  Luggage,
  MapPinned,
  Moon,
  Route,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "부산 장거리택시 안내",
  description: "부산 출발 장거리택시 안내. 출장, 병원 이동, 가족 방문, 공항 연계 이동 상담."
};

const coreBenefits = [
  {
    icon: Route,
    title: "부산 출발 장거리 이동",
    text: "울산, 창원, 거제, 대구, 경북 등 부산 출발 기준 장거리 이동 상담이 가능합니다.",
    points: ["전국 장거리 이동", "공항 · KTX 연계", "심야 이동 가능"]
  },
  {
    icon: BriefcaseBusiness,
    title: "출장 · 업무 이동",
    text: "정시 도착과 조용한 차량 환경을 우선으로 업무 일정에 맞춰 이동을 안내합니다.",
    points: ["시간 약속 우선", "조용한 차량 분위기", "새벽 출발 가능"]
  },
  {
    icon: CarFront,
    title: "프리미엄 차량 이동",
    text: "짐과 인원수에 맞춰 편안한 이동이 가능하도록 차량을 안내합니다.",
    points: ["금연 · 청결 차량", "캐리어 적재 가능", "장거리 운행 경험"]
  }
];

const useCases = [
  "부산 ↔ 울산 장거리 이동",
  "부산 ↔ 대구 출장 이동",
  "병원 진료 및 보호자 동행",
  "김해공항 연계 이동",
  "부모님 가족 방문 이동",
  "KTX 시간 맞춤 이동",
  "늦은 밤 귀가 이동",
  "거제 · 통영 장거리 이동"
];

const drivingStandards = [
  {
    icon: ShieldCheck,
    title: "정속 · 안전 운행",
    text: "빠른 이동보다 편안하고 안정적인 이동 흐름을 우선합니다."
  },
  {
    icon: Clock3,
    title: "시간 여유 배차",
    text: "출발 시간과 도착 시간을 고려해 무리 없는 일정으로 안내합니다."
  },
  {
    icon: Moon,
    title: "조용한 이동 분위기",
    text: "출장, 병원 이동, 새벽 일정 등 피로도를 줄일 수 있도록 운행합니다."
  },
  {
    icon: Sparkles,
    title: "장거리 이동 경험",
    text: "반복적인 장거리 운행 경험을 바탕으로 이동 동선을 안정적으로 안내합니다."
  }
];

const infoChips = ["출발 위치", "목적지", "출발 시간", "인원수", "캐리어 여부"];

export default function LongDistanceTaxiPage() {
  return (
    <>
      <PageHero
        eyebrow="Long Distance Taxi"
        title="부산 출발 장거리 이동을 편안하게"
        description="출장, 병원 이동, 가족 방문, 공항 연계 이동까지 시간이 중요한 장거리 일정을 편하게 연결해드립니다."
      >
        <Button asChild size="xl" variant="accent">
          <a href={siteConfig.kakaoChatUrl} target="_blank" rel="noreferrer">
            장거리 이동 문의하기
          </a>
        </Button>
      </PageHero>

      <section className="py-12">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-3">
          {coreBenefits.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title}>
                <CardHeader>
                  <Icon className="size-8 text-accent" />
                  <CardTitle className="text-2xl font-black">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <p className="leading-7 text-muted-foreground">{item.text}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.points.map((point) => (
                      <Badge key={point} variant="secondary">
                        {point}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="bg-muted/45 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="font-bold text-accent-foreground dark:text-accent">Long Distance Schedule</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">이런 일정으로 많이 이용합니다</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              부산에서 출발하거나 부산으로 도착하는 장거리 일정에 맞춰 공항, KTX, 병원, 업무 이동을 안내합니다.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {useCases.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-lg border bg-card p-4">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" />
                <span className="font-semibold leading-7">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-6">
            <p className="font-bold text-accent-foreground dark:text-accent">Driving Standard</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">장거리 이동 시 중요하게 생각합니다</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {drivingStandards.map((standard) => {
              const Icon = standard.icon;
              return (
                <Card key={standard.title}>
                  <CardHeader>
                    <Icon className="size-8 text-accent" />
                    <CardTitle className="text-xl font-black">{standard.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-7 text-muted-foreground">{standard.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted/45 py-12">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-[1fr_1fr]">
          <Card>
            <CardHeader>
              <Luggage className="size-8 text-accent" />
              <CardTitle className="text-2xl font-black">예약 시 알려주시면 좋아요</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="leading-8 text-muted-foreground">
                출발 위치, 목적지, 인원수, 캐리어 여부, 원하는 출발 시간을 알려주시면 상황에 맞춰 가장 편한
                이동 방식으로 안내드립니다.
              </p>
              <div className="flex flex-wrap gap-2">
                {infoChips.map((chip) => (
                  <span key={chip} className="rounded-full border bg-background px-4 py-2 text-sm font-bold">
                    {chip}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <MapPinned className="size-8 text-accent" />
              <CardTitle className="text-2xl font-black">장거리 이동 예약이 필요하신가요?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="leading-8 text-primary-foreground/82">
                출장 · 공항 · 가족 이동까지 편안하게 이동하실 수 있도록 안내해드립니다.
              </p>
              <Button asChild size="xl" variant="accent" className="w-full sm:w-auto">
                <a href={siteConfig.kakaoChatUrl} target="_blank" rel="noreferrer">
                  장거리 이동 문의하기
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
