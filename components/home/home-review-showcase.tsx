"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ReviewCard } from "@/components/reviews/review-card";
import { Button } from "@/components/ui/button";
import type { Review } from "@/lib/types";

function pickRandomReviews(reviews: Review[], count: number) {
  return [...reviews].sort(() => Math.random() - 0.5).slice(0, count);
}

export function HomeReviewShowcase({ reviews }: { reviews: Review[] }) {
  const initialReviews = useMemo(() => reviews.slice(0, 6), [reviews]);
  const [visibleReviews, setVisibleReviews] = useState(initialReviews);

  useEffect(() => {
    const firstShuffle = window.setTimeout(() => {
      setVisibleReviews(pickRandomReviews(reviews, 6));
    }, 600);
    const timer = window.setInterval(() => {
      setVisibleReviews(pickRandomReviews(reviews, 6));
    }, 18000);

    return () => {
      window.clearTimeout(firstShuffle);
      window.clearInterval(timer);
    };
  }, [reviews]);

  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-bold text-muted-foreground">Review Board</p>
            <h2 className="mt-2 text-3xl font-black">실제 이용 후기 모음</h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/reviews">전체 후기</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
