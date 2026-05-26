import type { Metadata } from "next";
import { ReviewBoard } from "@/components/reviews/review-board";
import { PageHero } from "@/components/sections/page-hero";
import { getPublishedReviews } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "후기 게시판",
  description: "장거리전문부산콜택시를 직접 이용한 손님들의 이용 후기입니다."
};

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const reviews = await getPublishedReviews(300);

  return (
    <>
      <PageHero
        eyebrow="Review Board"
        title="후기 게시판"
        description="장거리전문부산콜택시를 직접 이용한 손님들의 이용 후기입니다."
      />
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <ReviewBoard reviews={reviews} />
        </div>
      </section>
    </>
  );
}
