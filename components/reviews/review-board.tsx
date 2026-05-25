"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ReviewCard } from "@/components/reviews/review-card";
import { ReviewWriteForm } from "@/components/reviews/review-write-form";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { primaryTags } from "@/lib/site";
import type { Review } from "@/lib/types";

export function ReviewBoard({ reviews }: { reviews: Review[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("전체");
  const [sort, setSort] = useState<"latest" | "popular">("latest");
  const [showForm, setShowForm] = useState(false);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return reviews
      .filter((review) => {
        const matchesQuery =
          !normalizedQuery ||
          `${review.title} ${review.content} ${review.author} ${review.tags.join(" ")}`
            .toLowerCase()
            .includes(normalizedQuery);
        const matchesTag = tag === "전체" || review.tags.includes(tag);
        return matchesQuery && matchesTag;
      })
      .sort((a, b) => {
        if (sort === "popular") return b.likes + b.views - (a.likes + a.views);
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
  }, [query, reviews, sort, tag]);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 rounded-lg border bg-card p-4 md:grid-cols-[1fr_auto_auto]">
        <label className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="지역, 공항, 관광, 장거리 후기를 검색하세요"
            className="pl-11"
          />
        </label>
        <select
          className="h-12 rounded-lg border bg-background px-4 text-sm font-semibold"
          value={sort}
          onChange={(event) => setSort(event.target.value as "latest" | "popular")}
        >
          <option value="latest">최신순</option>
          <option value="popular">인기순</option>
        </select>
        <button
          type="button"
          className="h-12 rounded-lg bg-primary px-5 text-sm font-black text-primary-foreground"
          onClick={() => setShowForm((value) => !value)}
        >
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

      {showForm ? <ReviewWriteForm onCreated={() => setShowForm(false)} /> : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {!filtered.length ? (
        <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">조건에 맞는 후기가 없습니다.</div>
      ) : null}
    </div>
  );
}
