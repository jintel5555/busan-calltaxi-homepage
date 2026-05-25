import type { Metadata } from "next";
import { Camera, MapPinned, Users } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "부산 관광택시 안내",
  description: "부산관광택시, 부산택시투어, 부산기사포함렌트 안내. 해운대, 광안리, 영도, 송도 관광 코스."
};

export default function BusanTourTaxiPage() {
  return (
    <>
      <PageHero
        eyebrow="Busan Tour Taxi"
        title="부산 관광택시 안내"
        description="낯선 부산 여행도 기사 포함 이동으로 편하게 연결합니다. 가족, 부모님, 출장 손님 일정에 맞춥니다."
      />
      <section className="py-12">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-3">
          {[
            { icon: MapPinned, title: "코스 조율", text: "숙소 위치와 희망지를 기준으로 효율적인 동선을 안내합니다." },
            { icon: Camera, title: "야경·사진", text: "광안리, 마린시티, 청사포 등 사진 포인트 중심 이동도 가능합니다." },
            { icon: Users, title: "가족 동행", text: "어르신과 아이가 있는 일정은 걷는 시간을 줄여 편하게 이동합니다." }
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
        <div className="mx-auto mt-8 max-w-6xl px-4">
          <Button asChild size="xl" className="w-full md:w-auto">
            <a href="/tour-courses">관광코스 보기</a>
          </Button>
        </div>
      </section>
    </>
  );
}
