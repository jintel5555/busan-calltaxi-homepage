"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MessageSquarePlus, Search } from "lucide-react";
import { Stars } from "@/components/reviews/review-card";
import { ReviewWriteForm } from "@/components/reviews/review-write-form";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { primaryTags } from "@/lib/site";
import type { Review } from "@/lib/types";
import { createReviewSlug, excerpt, formatKoreanDate } from "@/lib/utils";

export function ReviewBoard({ reviews }: { reviews: Review[] }) {
  const [localReviews, setLocalReviews] = useState(reviews);
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("전체");
  const [showForm, setShowForm] = useState(false);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return localReviews
      .filter((review) => {
        const matchesQuery =
          !normalizedQuery ||
          `${review.title} ${review.content} ${review.author} ${review.tags.join(" ")}`
            .toLowerCase()
            .includes(normalizedQuery);
        const matchesTag = tag === "전체" || review.tags.includes(tag);
        return matchesQuery && matchesTag;
      })
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [localReviews, query, tag]);

  function addCreatedReview(review: Review) {
    setLocalReviews((current) => [review, ...current]);
    setShowForm(false);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-3 rounded-lg border bg-card p-4 md:grid-cols-[1fr_auto]">
        <label className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="지역, 공항, 관광, 장거리 후기를 검색하세요"
            className="pl-11"
          />
        </label>
        <button
          type="button"
          className="h-12 rounded-lg bg-primary px-5 text-sm font-black text-primary-foreground"
          onClick={() => setShowForm((value) => !value)}
        >
          <MessageSquarePlus className="mr-2 inline size-4" />
          후기 작성
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {["전체", ...primaryTags].map((item) => (
          <button key={item} type="button" onClick={() => setTag(item)}>
            <Badge variant={tag === item ? "accent" : "outline"}>{item}</Badge>
          </button>
        ))}
      </div>

      {showForm ? <ReviewWriteForm onCreated={addCreatedReview} /> : null}

      <div className="overflow-hidden rounded-lg border bg-card">
        <div className="hidden grid-cols-[minmax(0,1fr)_8rem_8rem] border-b bg-muted/45 px-5 py-3 text-sm font-black text-muted-foreground md:grid">
          <span>후기 제목</span>
          <span>작성자</span>
          <span>작성일</span>
        </div>
        <div className="divide-y">
          {filtered.map((review) => (
            <Link
              key={review.id}
              href={`/reviews/${createReviewSlug(review)}`}
              className="grid gap-3 px-4 py-5 transition hover:bg-muted/35 md:grid-cols-[minmax(0,1fr)_8rem_8rem] md:items-center md:px-5"
            >
              <div className="min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Stars rating={review.rating} />
                  {review.featured ? <Badge variant="accent">베스트</Badge> : null}
                  {review.tags.slice(0, 3).map((item) => (
                    <Badge key={item} variant="secondary">
                      #{item}
                    </Badge>
                  ))}
                </div>
                <h3 className="truncate text-lg font-black">{review.title}</h3>
                <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{excerpt(review.content, 120)}</p>
              </div>
              <span className="text-sm font-semibold text-muted-foreground md:text-foreground">{review.author}</span>
              <span className="text-sm text-muted-foreground">{formatKoreanDate(review.created_at)}</span>
            </Link>
          ))}
        </div>
      </div>

      {!filtered.length ? (
        <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">조건에 맞는 후기가 없습니다.</div>
      ) : null}
    </div>
  );
}
