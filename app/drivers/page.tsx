import type { Metadata } from "next";
import { BadgeCheck, Car, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Badge } from "@/components/ui/badge";
import { driverProfiles } from "@/lib/dummy-data";

export const metadata: Metadata = {
  title: "기사 소개",
  description: "부산 장거리택시, 김해공항 픽업, 부산 관광택시를 담당하는 프리미엄 기사 서비스 안내."
};

export default function DriversPage() {
  return (
    <>
      <PageHero
        eyebrow="Drivers"
        title="프리미엄 기사 서비스"
        description="정시 배차, 친절한 응대, 짐 도움, 관광 동선 조율까지 실제 이동에 필요한 부분을 세심하게 챙깁니다."
      />
      <section className="py-12">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-3">
          {driverProfiles.map((driver) => (
            <div key={driver.name} className="rounded-lg border bg-card p-5">
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Car className="size-6" />
              </div>
              <h2 className="mt-5 text-2xl font-black">{driver.name}</h2>
              <p className="mt-3 leading-7 text-muted-foreground">{driver.experience}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {driver.strengths.map((strength) => (
                  <Badge key={strength} variant="secondary">
                    {strength}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="pb-12">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-2">
          <div className="rounded-lg border bg-secondary p-5 text-secondary-foreground">
            <ShieldCheck className="size-8" />
            <h2 className="mt-4 text-2xl font-black">운행 기준</h2>
            <p className="mt-3 leading-7">정숙 운행, 안전 속도, 목적지 도착 시간 관리, 손님 동선 배려를 기준으로 운영합니다.</p>
          </div>
          <div className="rounded-lg border bg-card p-5">
            <BadgeCheck className="size-8 text-accent" />
            <h2 className="mt-4 text-2xl font-black">서비스 품질</h2>
            <p className="mt-3 leading-7 text-muted-foreground">후기 게시판과 관리자 모니터링으로 반복 이용 손님이 안심할 수 있게 관리합니다.</p>
          </div>
        </div>
      </section>
    </>
  );
}
