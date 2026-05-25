import type { Metadata } from "next";
import { Camera, CarFront, CheckCircle2, Clock3, MapPinned, Moon, Users } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "부산 관광택시 안내",
  description: "부산 관광택시, 부산 여행 코스, 야경 드라이브, 가족 여행 이동 상담. 해운대, 광안리, 송도, 기장 관광 이동 안내."
};

const serviceCards = [
  {
    icon: Moon,
    title: "부산 야경 드라이브",
    text: "광안리, 마린시티, 청사포 등 부산 특유의 야경 코스를 편하게 이동합니다."
  },
  {
    icon: Camera,
    title: "사진 스팟 이동",
    text: "흰여울문화마을, 해동용궁사, 오륙도 등 사진 포인트 중심 이동도 가능합니다."
  },
  {
    icon: Users,
    title: "부모님 · 가족 동행",
    text: "걷는 시간을 줄이고 편하게 관광할 수 있도록 이동 동선을 안내합니다."
  }
];

const commonSchedules = [
  "부모님과 함께하는 부산 여행",
  "커플 부산 야경 드라이브",
  "부산 첫 여행 관광 코스",
  "KTX · 공항 연계 관광 이동",
  "당일치기 부산 여행",
  "비 오는 날 감성 드라이브",
  "친구들과 사진 여행 코스"
];

const popularCourses = [
  {
    title: "해운대 · 청사포 · 송정 · 기장",
    text: "바다 드라이브와 카페 코스를 함께 이동합니다."
  },
  {
    title: "광안리 · 마린시티 · 오륙도 야경",
    text: "부산 대표 야경 코스를 편하게 둘러볼 수 있습니다."
  },
  {
    title: "감천문화마을 · 송도 · 흰여울문화마을",
    text: "부산 감성 여행 코스로 많이 찾는 일정입니다."
  },
  {
    title: "부산역 · 국제시장 · 영도",
    text: "부산 원도심 분위기를 느낄 수 있는 관광 코스입니다."
  }
];

const infoChips = ["출발 위치", "관광 희망지", "인원수", "이동 시간", "캐리어 여부"];

export default function BusanTourTaxiPage() {
  return (
    <>
      <PageHero
        eyebrow="Busan Tour Taxi"
        title="부산 여행을 더 편안하게 이동하세요"
        description="해운대, 광안리, 송도, 기장까지 부산 여행 코스와 이동 동선을 편하게 연결해드립니다."
      />

      <section className="py-12">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-3">
          {serviceCards.map((item) => {
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
        <div className="mx-auto mt-8 max-w-6xl px-4">
          <Button asChild size="xl" className="w-full md:w-auto">
            <a href="/tour-courses">관광코스 보기</a>
          </Button>
        </div>
      </section>

      <section className="bg-muted/45 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="font-bold text-accent-foreground dark:text-accent">Tour Schedule</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">이런 일정에 많이 이용합니다</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              부산역, 김해공항, 숙소에서 출발해 원하는 관광지와 이동 시간을 기준으로 동선을 맞춰드립니다.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {commonSchedules.map((item) => (
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
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="font-bold text-accent-foreground dark:text-accent">Popular Course</p>
              <h2 className="mt-3 text-3xl font-black md:text-4xl">많이 찾는 부산 관광 코스</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {popularCourses.map((course) => (
              <Card key={course.title}>
                <CardHeader>
                  <MapPinned className="size-8 text-accent" />
                  <CardTitle className="text-2xl font-black">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-7 text-muted-foreground">{course.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/45 py-12">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-[1fr_1fr]">
          <Card>
            <CardHeader>
              <Clock3 className="size-8 text-accent" />
              <CardTitle className="text-2xl font-black">예약 시 알려주시면 좋아요</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="leading-8 text-muted-foreground">
                출발 위치, 원하는 관광지, 인원수, 이동 시간을 알려주시면 일정에 맞춰 가장 편한 이동 동선으로
                안내드립니다.
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
              <CardTitle className="text-2xl font-black">부산 관광 이동이 필요하신가요?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="leading-8 text-primary-foreground/82">
                야경 드라이브부터 가족 여행 이동까지 편안하게 안내해드립니다.
              </p>
              <Button asChild size="xl" variant="accent" className="w-full sm:w-auto">
                <a href={siteConfig.kakaoChatUrl} target="_blank" rel="noreferrer">
                  관광택시 문의하기
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
