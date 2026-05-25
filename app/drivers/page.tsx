import type { Metadata } from "next";
import {
  BriefcaseBusiness,
  CarFront,
  CheckCircle2,
  Clock3,
  MapPinned,
  Moon,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "기사 서비스 안내",
  description: "부산 장거리택시, 김해공항 픽업, 부산 관광택시를 담당하는 기사 서비스 안내."
};

const driverServices = [
  {
    icon: Clock3,
    title: "공항 픽업 전담 기사",
    text: "김해공항 새벽 도착, 심야 비행 일정까지 항공편 시간에 맞춰 여유 있게 배차합니다.",
    points: ["항공편 시간 확인", "캐리어 상하차 도움", "심야 운행 가능"]
  },
  {
    icon: MapPinned,
    title: "부산 관광 코스 기사",
    text: "해운대, 광안리, 송도, 기장 등 이동 동선을 고려해 편하게 관광할 수 있도록 안내합니다.",
    points: ["사진 포인트 안내", "부모님 동행 배려", "일정 동선 조율"]
  },
  {
    icon: CarFront,
    title: "장거리 VIP 기사",
    text: "부산 출발 기준으로 울산, 거제, 대구, 경남 장거리 이동도 가능합니다.",
    points: ["정속 운행", "쾌적한 차량 관리", "장거리 이동 경험"]
  }
];

const serviceStandards = [
  {
    icon: ShieldCheck,
    title: "정속 · 안전 운행",
    text: "급하게 운행하기보다 편안한 이동 흐름을 우선으로 안내합니다."
  },
  {
    icon: Sparkles,
    title: "청결한 차량 관리",
    text: "금연 차량 기준으로 관리하며 실내 청결 상태를 꾸준히 유지합니다."
  },
  {
    icon: Clock3,
    title: "시간 약속 기준 운영",
    text: "공항 픽업, 병원 이동, 장거리 일정 등 시간 여유를 고려해 배차합니다."
  },
  {
    icon: Moon,
    title: "조용한 이동 분위기",
    text: "피곤한 이동이나 늦은 밤 일정은 편안한 분위기로 이동할 수 있도록 배려합니다."
  }
];

const commonUseCases = [
  "부모님 부산 관광 동행",
  "김해공항 심야 픽업",
  "출장 · 업무 장거리 이동",
  "병원 이동 및 보호자 동행",
  "비 오는 날 부산 야경 드라이브",
  "KTX · 공항 연계 이동",
  "캐리어 많은 가족 이동",
  "부산 첫 여행 관광 이동"
];

const infoChips = ["출발 위치", "목적지", "인원수", "이동 시간", "캐리어 여부"];

export default function DriversPage() {
  return (
    <>
      <PageHero
        eyebrow="Drivers"
        title="부산 이동을 더 편안하게 안내합니다"
        description="공항 픽업, 관광 이동, 장거리 운행까지 실제 이동 상황에 맞춰 편안하고 안정적으로 안내합니다."
      />

      <section className="py-12">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-3">
          {driverServices.map((driver) => {
            const Icon = driver.icon;
            return (
              <Card key={driver.title}>
                <CardHeader>
                  <div className="flex size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Icon className="size-6" />
                  </div>
                  <CardTitle className="text-2xl font-black">{driver.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <p className="leading-7 text-muted-foreground">{driver.text}</p>
                  <div className="flex flex-wrap gap-2">
                    {driver.points.map((point) => (
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
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-6">
            <p className="font-bold text-accent-foreground dark:text-accent">Service Standard</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">이런 부분을 중요하게 생각합니다</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {serviceStandards.map((standard) => {
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

      <section className="py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="font-bold text-accent-foreground dark:text-accent">Use Case</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">이런 일정으로 많이 이용합니다</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              공항, 관광, 병원, 출장, 장거리 일정까지 출발 위치와 목적지에 맞춰 편한 이동을 안내합니다.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {commonUseCases.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-lg border bg-card p-4">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" />
                <span className="font-semibold leading-7">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/45 py-12">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-[1fr_1fr]">
          <Card>
            <CardHeader>
              <BriefcaseBusiness className="size-8 text-accent" />
              <CardTitle className="text-2xl font-black">예약 시 알려주시면 좋아요</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="leading-8 text-muted-foreground">
                출발 위치, 목적지, 인원수, 캐리어 여부, 이동 시간을 알려주시면 상황에 맞춰 가장 편한 이동
                방식으로 안내드립니다.
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
              <CarFront className="size-8 text-accent" />
              <CardTitle className="text-2xl font-black">편안한 이동이 필요하신가요?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="leading-8 text-primary-foreground/82">
                공항 픽업부터 관광 · 장거리 이동까지 상황에 맞춰 편하게 안내해드립니다.
              </p>
              <Button asChild size="xl" variant="accent" className="w-full sm:w-auto">
                <a href={siteConfig.kakaoChatUrl} target="_blank" rel="noreferrer">
                  기사 서비스 문의하기
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
