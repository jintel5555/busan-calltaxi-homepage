import type { Metadata } from "next";
import { Clock3, MessageCircle, Phone, Send } from "lucide-react";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "실시간 문의",
  description: "부산 장거리택시, 김해공항택시, 부산관광택시 실시간 예약 문의 페이지입니다."
};

export default function InquiryPage() {
  return (
    <>
      <PageHero
        eyebrow="Live Inquiry"
        title="실시간 문의"
        description="출발지와 도착지, 탑승 시간을 남겨주시면 부산 지역 이동에 맞춰 빠르게 상담합니다."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          <Button asChild size="lg" variant="accent">
            <a href={siteConfig.phoneHref}>
              <Phone /> 전화
            </a>
          </Button>
          <Button asChild size="lg" className="bg-[#FEE500] text-[#191600] hover:bg-[#FEE500]/90">
            <a href={siteConfig.kakaoUrl} target="_blank" rel="noreferrer">
              <MessageCircle /> 카카오톡
            </a>
          </Button>
          <Button asChild size="lg" className="bg-[#03C75A] text-white hover:bg-[#03C75A]/90">
            <a href={siteConfig.naverTalkUrl} target="_blank" rel="noreferrer">
              <Send /> 톡톡
            </a>
          </Button>
        </div>
      </PageHero>

      <section className="py-12">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 lg:grid-cols-[0.8fr_1.2fr]">
          <Card>
            <CardHeader>
              <Clock3 className="size-8 text-accent" />
              <CardTitle>상담 전 남겨주시면 좋은 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 leading-7 text-muted-foreground">
              <p>탑승 날짜와 시간, 인원, 캐리어 개수, 경유지 여부를 함께 남겨주세요.</p>
              <p>김해공항 이동은 항공편 시간 기준으로 여유 시간을 안내합니다.</p>
              <p>관광택시는 희망 코스와 체류 시간을 기준으로 동선을 맞춥니다.</p>
            </CardContent>
          </Card>
          <div className="rounded-lg border bg-card p-5">
            <InquiryForm mode="inquiry" />
          </div>
        </div>
      </section>
    </>
  );
}
