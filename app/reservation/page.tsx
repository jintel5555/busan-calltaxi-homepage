import type { Metadata } from "next";
import { CalendarCheck, Plane, Route } from "lucide-react";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "예약문의",
  description: "부산 장거리전문콜택시 예약문의. 공항 픽업, 관광택시, 장거리 이동 예약을 접수합니다."
};

export default function ReservationPage() {
  return (
    <>
      <PageHero
        eyebrow="Reservation"
        title="예약문의"
        description="공항, 관광, 장거리 이동 일정을 남겨주시면 운행 조건에 맞춰 안내합니다."
      />
      <section className="py-12">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="grid gap-3">
            {[
              { icon: Plane, title: "공항 픽업", text: "항공편 시간과 짐 개수를 기준으로 상담" },
              { icon: Route, title: "장거리 이동", text: "부산 출발 경남·울산·대구권 이동" },
              { icon: CalendarCheck, title: "관광 예약", text: "일정과 체류 시간에 맞춘 코스 조율" }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-lg border bg-card p-5">
                  <Icon className="size-7 text-accent" />
                  <h2 className="mt-3 text-xl font-black">{item.title}</h2>
                  <p className="mt-2 text-muted-foreground">{item.text}</p>
                </div>
              );
            })}
          </div>
          <div className="rounded-lg border bg-card p-5">
            <InquiryForm mode="reservation" />
          </div>
        </div>
      </section>
    </>
  );
}
