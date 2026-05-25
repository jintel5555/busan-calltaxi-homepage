import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CarFront,
  Clock3,
  Luggage,
  MapPinned,
  MessageCircle,
  Phone,
  Plane,
  Send,
  ShieldCheck
} from "lucide-react";
import { HomeFaqPreview } from "@/components/home/home-faq-preview";
import { HomeReviewShowcase } from "@/components/home/home-review-showcase";
import { LiveInquiryStrip } from "@/components/home/live-inquiry-strip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublishedFaqs } from "@/lib/faqs";
import { getPublishedReviews } from "@/lib/reviews";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Plane,
    title: "김해공항 픽업",
    text: "새벽 비행기, 심야 도착, 가족 짐 이동까지 시간에 맞춰 배차합니다.",
    href: "/gimhae-airport-pickup"
  },
  {
    icon: MapPinned,
    title: "부산 관광택시",
    text: "해운대, 영도, 송도, 감천문화마을 등 코스를 목적에 맞게 조율합니다.",
    href: "/busan-tour-taxi"
  },
  {
    icon: CarFront,
    title: "🚕 장거리택시",
    text: "부산 출발 경남, 울산, 대구권은 물론 서울, 경기도, 강원도, 전라도 등 전국 장거리 이동을 편안하게 지원합니다.",
    href: "/long-distance-taxi",
    highlight: true
  }
];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const reviews = await getPublishedReviews(24);
  const faqs = await getPublishedFaqs();

  return (
    <>
      <section className="hero-busan relative flex min-h-[calc(100svh-4rem)] items-center text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-8 md:py-14">
          <div className="soft-rise max-w-3xl space-y-5">
            <div className="flex flex-wrap gap-2">
              <Badge className="border-white/15 bg-white/12 text-white backdrop-blur">24시간 상담</Badge>
              <Badge className="border-white/15 bg-[#f4c74d] text-[#171306]">쾌적한 금연 차량</Badge>
              <Badge className="border-white/15 bg-[#20d7c5] text-[#031514]">친절한 젊은 기사</Badge>
            </div>
            <div className="space-y-4">
              <p className="text-lg font-bold text-[#f4c74d] md:text-xl">부산 장거리택시 · 김해공항 · 부산관광 전문</p>
              <h1 className="text-[35px] font-black leading-tight md:text-[59px]">{siteConfig.name}</h1>
              <p className="max-w-2xl text-lg leading-8 text-white/86">
                부산의 밤처럼 조용하고 편안한 이동, 관광택시부터 장거리까지
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Button asChild size="xl" variant="accent">
                <a href={siteConfig.phoneHref}>
                  <Phone /> 전화문의
                </a>
              </Button>
              <Button asChild size="xl" className="bg-white text-black hover:bg-white/90">
                <a href={siteConfig.smsHref}>
                  <Send /> 문자문의
                </a>
              </Button>
              <Button asChild size="xl" className="bg-[#FEE500] text-[#191600] hover:bg-[#FEE500]/90">
                <a href={siteConfig.kakaoUrl} target="_blank" rel="noreferrer">
                  <MessageCircle /> 카카오톡
                </a>
              </Button>
              <Button asChild size="xl" className="bg-[#03C75A] text-white hover:bg-[#03C75A]/90">
                <a href={siteConfig.naverTalkUrl} target="_blank" rel="noreferrer">
                  <Send /> 네이버 톡톡
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <LiveInquiryStrip />

      <HomeReviewShowcase reviews={reviews} />

      <section className="bg-background py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-bold text-accent-foreground dark:text-accent">장거리전문부산콜택시</p>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">공항 · 장거리 · 관광까지 한번에 예약!</h2>
            </div>
            <Button asChild variant="outline" size="lg">
              <a href={siteConfig.kakaoUrl} target="_blank" rel="noreferrer">
                예약문의 <ArrowRight />
              </a>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.title}
                  className={cn(
                    "transition hover:-translate-y-1 hover:shadow-xl",
                    service.highlight && "border-[#f4c74d] bg-gradient-to-b from-[#fff8dc] to-card dark:from-[#2a2108]"
                  )}
                >
                  <CardHeader>
                    <div
                      className={cn(
                        "mb-3 flex size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground",
                        service.highlight && "bg-[#f4c74d] text-[#171306]"
                      )}
                    >
                      <Icon className="size-6" />
                    </div>
                    <CardTitle className={cn(service.highlight && "text-[#171306] dark:text-[#f4c74d]")}>
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <p className="leading-7 text-muted-foreground">{service.text}</p>
                    <Link href={service.href} className="inline-flex items-center gap-2 text-sm font-black">
                      자세히 보기 <ArrowRight className="size-4" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#10100f] py-14 text-[#fff6e3]">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-4">
          {[
            { icon: Clock3, title: "24시간 상담", text: "새벽·심야 이동 대응" },
            { icon: ShieldCheck, title: "프리미엄 기사", text: "친절·정숙·정시 운행" },
            { icon: Luggage, title: "짐 많은 이동", text: "공항 캐리어 상담" },
            { icon: BadgeCheck, title: "후기 기반", text: "실제 이용 후기 운영" }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-5">
                <Icon className="size-7 text-[#f4c74d]" />
                <h3 className="mt-4 text-lg font-black">{item.title}</h3>
                <p className="mt-2 text-sm text-[#d7cebd]">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <HomeFaqPreview faqs={faqs} />

    </>
  );
}
