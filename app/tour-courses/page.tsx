import type { Metadata } from "next";
import { ArrowRight, Camera, CarFront, Clock3, MapPinned, Phone, Route, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "관광코스 소개",
  description:
    "부산 관광택시 추천 코스. 태종대, 흰여울문화마을, 송도, 오륙도, 해운대, 기장, 울산, 경주, 통영, 여수 관광 동선 안내."
};

const featuredSpots = [
  { name: "태종대", text: "부산의 대표 해안 절경" },
  { name: "흰여울문화마을", text: "바다와 어우러진 산책 마을" },
  { name: "송도 스카이워크", text: "바다 위 산책과 케이블카" },
  { name: "자갈치시장", text: "부산의 활기찬 전통시장" },
  { name: "오륙도", text: "해안 산책과 탁 트인 풍경" },
  { name: "해운대", text: "동백섬과 마린시티 야경" }
];

const cityCourses = [
  {
    code: "A",
    title: "자연과 문화가 만나는 코스",
    summary: "부산의 대표 명소와 전통시장을 한 번에",
    stops: ["태종대", "흰여울문화마을", "송도 스카이워크", "자갈치 국제시장", "오륙도"]
  },
  {
    code: "B",
    title: "전망과 힐링 코스",
    summary: "산과 바다를 잇는 전망 명소 중심",
    stops: ["오륙도", "스카이워크", "이기대 해안산책로", "유엔공원", "해운대 동백섬", "블루라인파크"]
  },
  {
    code: "C",
    title: "해안 명소와 도심 명소 코스",
    summary: "해운대, 기장, 사찰, 동래를 중심으로",
    stops: ["해운대", "기장", "해동용궁사", "동래읍성", "부산 전통시장"]
  },
  {
    code: "D",
    title: "시외관광 감성 코스",
    summary: "통영, 경주, 여수까지 편안하게",
    stops: ["통영 케이블카", "통영 중앙시장", "불국사", "여수 해상케이블카", "오동도"]
  }
];

const themeCourses = [
  {
    title: "부산 첫 방문 4시간 코스",
    badge: "부산택시투어",
    route: "부산역 · 감천문화마을 · 송도해상케이블카 · 자갈치 · 광안리",
    points: ["4시간부터 상담", "사진 포인트 조율", "숙소·부산역 픽업 가능"]
  },
  {
    title: "해운대 야경 프리미엄 코스",
    badge: "부산관광택시",
    route: "달맞이길 · 청사포 · 해운대마린시티 · 광안대교 · 광안리",
    points: ["야경 중심 동선", "저녁 식사 전후 조율", "커플·가족 일정 추천"]
  },
  {
    title: "부모님 동행 여유 코스",
    badge: "부산기사포함렌트",
    route: "태종대 · 흰여울문화마을 · 송도 · 국제시장 · 숙소 복귀",
    points: ["걷는 시간 최소화", "승하차 편한 동선", "부모님 동행 배려"]
  }
];

const serviceNotes = [
  { icon: CarFront, title: "전용 차량 이동", text: "일행만 탑승하는 차량으로 짐과 일정에 맞춰 이동합니다." },
  { icon: Route, title: "맞춤 코스 조율", text: "출발지, 숙소, 식사 장소, 희망 명소를 기준으로 동선을 정리합니다." },
  { icon: Camera, title: "사진 포인트 안내", text: "광안리, 송도, 영도, 기장 등 사진 찍기 좋은 지점을 함께 조율합니다." },
  { icon: ShieldCheck, title: "편안한 운행", text: "금연 차량과 차분한 응대로 부모님 동행, 가족 일정에도 어울립니다." }
];

export default function TourCoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="Tour Courses"
        title="부산 관광코스 소개"
        description="영도, 송도, 해운대, 기장, 전통시장부터 울산·경주·통영·여수 시외관광까지 일정에 맞춰 택시 코스를 조율합니다."
      />

      <section className="bg-background py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {featuredSpots.map((spot) => (
              <Card key={spot.name} className="bg-card/80">
                <CardHeader className="p-4">
                  <div className="flex size-12 items-center justify-center rounded-full border bg-secondary text-secondary-foreground">
                    <MapPinned className="size-6" />
                  </div>
                  <CardTitle className="text-base font-black">{spot.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm leading-6 text-muted-foreground">{spot.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge variant="accent">추천 관광 코스</Badge>
              <h2 className="mt-3 text-3xl font-black md:text-4xl">A부터 D까지 목적별 코스</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">
              아래 코스는 추천 일정이며, 교통 상황과 고객님의 취향에 따라 순서와 목적지를 자유롭게 조정할 수 있습니다.
            </p>
          </div>

          <div className="space-y-4">
            {cityCourses.map((course) => (
              <Card key={course.code} className="overflow-hidden">
                <div className="grid md:grid-cols-[8rem_1fr]">
                  <div className="flex items-center gap-4 bg-primary p-5 text-primary-foreground md:flex-col md:justify-center">
                    <span className="text-5xl font-black">{course.code}</span>
                    <span className="text-sm font-bold">{course.title}</span>
                  </div>
                  <div className="space-y-4 p-5">
                    <div>
                      <h3 className="text-2xl font-black">{course.title}</h3>
                      <p className="mt-2 text-muted-foreground">{course.summary}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {course.stops.map((stop, index) => (
                        <div key={`${course.code}-${stop}`} className="flex items-center gap-2">
                          <span className="rounded-full border bg-secondary px-3 py-2 text-sm font-bold text-secondary-foreground">
                            {stop}
                          </span>
                          {index < course.stops.length - 1 ? <ArrowRight className="size-4 text-muted-foreground" /> : null}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/45 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <Badge variant="accent">맞춤 코스 예시</Badge>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">상황별 추천 일정</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {themeCourses.map((course) => (
              <Card key={course.title}>
                <CardHeader>
                  <Badge variant="accent" className="w-fit">
                    {course.badge}
                  </Badge>
                  <CardTitle className="text-2xl font-black">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <p className="leading-7 text-muted-foreground">{course.route}</p>
                  <div className="grid gap-2 text-sm">
                    {course.points.map((point) => (
                      <span key={point} className="inline-flex items-center gap-2">
                        <Clock3 className="size-4 text-accent" />
                        {point}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-4">
          {serviceNotes.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title}>
                <CardHeader>
                  <Icon className="size-8 text-accent" />
                  <CardTitle className="text-xl font-black">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-7 text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-3 px-4 sm:flex-row">
          <Button asChild size="xl" className="w-full sm:w-auto">
            <a href={siteConfig.kakaoChatUrl} target="_blank" rel="noreferrer">
              관광택시 상담하기
            </a>
          </Button>
          <Button asChild size="xl" variant="outline" className="w-full sm:w-auto">
            <a href={siteConfig.phoneHref}>
              <Phone /> {siteConfig.phoneDisplay}
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
