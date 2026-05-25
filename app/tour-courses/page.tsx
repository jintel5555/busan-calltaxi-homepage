import type { Metadata } from "next";
import { Camera, Map, Timer } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { tourCourses } from "@/lib/dummy-data";

export const metadata: Metadata = {
  title: "관광코스 소개",
  description: "부산 관광택시 추천 코스. 감천문화마을, 송도, 해운대, 광안리, 기장 관광 동선 안내."
};

export default function TourCoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="Tour Courses"
        title="부산 관광코스 소개"
        description="부산을 처음 방문하는 손님, 부모님 동행, 야경 중심 일정에 맞춰 택시 코스를 조율합니다."
      />
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-4 md:grid-cols-3">
            {tourCourses.map((course) => (
              <div key={course.title} className="rounded-lg border bg-card p-5">
                <Badge variant="accent">{course.keyword}</Badge>
                <h2 className="mt-4 text-2xl font-black">{course.title}</h2>
                <p className="mt-3 leading-7 text-muted-foreground">{course.route}</p>
                <div className="mt-5 grid gap-2 text-sm">
                  <span className="inline-flex items-center gap-2">
                    <Timer className="size-4 text-accent" /> 4시간부터 상담
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Camera className="size-4 text-accent" /> 사진 포인트 조율
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Map className="size-4 text-accent" /> 숙소 픽업 가능
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Button asChild size="xl" className="mt-8 w-full md:w-auto">
            <a href="/reservation">관광택시 예약문의</a>
          </Button>
        </div>
      </section>
    </>
  );
}
