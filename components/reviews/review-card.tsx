import Link from "next/link";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Review } from "@/lib/types";
import { createReviewSlug, excerpt, formatKoreanDate } from "@/lib/utils";

export function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`별점 ${rating}점`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`size-4 ${index < rating ? "fill-[#f4c74d] text-[#f4c74d]" : "text-muted-foreground/40"}`}
        />
      ))}
    </div>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <Card className="h-full overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
      <CardHeader className="gap-3">
        <div className="flex items-start justify-between gap-3">
          <Stars rating={review.rating} />
          {review.featured ? <Badge variant="accent">베스트</Badge> : null}
        </div>
        <CardTitle className="line-clamp-2">
          <Link href={`/reviews/${createReviewSlug(review)}`}>{review.title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="min-h-20 text-sm leading-7 text-muted-foreground">{excerpt(review.content, 130)}</p>
        <div className="flex flex-wrap gap-2">
          {review.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              #{tag}
            </Badge>
          ))}
        </div>
        <div className="border-t pt-4 text-xs text-muted-foreground">
          {review.author} · {formatKoreanDate(review.created_at)}
        </div>
      </CardContent>
    </Card>
  );
}
