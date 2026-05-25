"use client";

import { FormEvent, useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { primaryTags } from "@/lib/site";
import type { Review } from "@/lib/types";

export function ReviewWriteForm({ onCreated }: { onCreated?: (review: Review) => void }) {
  const [rating, setRating] = useState(5);
  const [tags, setTags] = useState<string[]>(["지역"]);
  const [pending, setPending] = useState(false);

  function toggleTag(tag: string) {
    setTags((current) => (current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setPending(true);
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          title: formData.get("title"),
          content: formData.get("content"),
          author: formData.get("author"),
          rating,
          tags,
          images: [],
          honeypot: formData.get("website")
        })
      });

      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || "후기 등록에 실패했습니다.");

      toast.success("후기가 등록되었습니다.");
      form.reset();
      setRating(5);
      setTags(["지역"]);
      onCreated?.(result.review as Review);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "잠시 후 다시 시도해주세요.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-lg border bg-card p-5">
      <input className="hidden" name="website" tabIndex={-1} autoComplete="off" />
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold">
          작성자
          <Input name="author" required placeholder="예: 해운대 손님" />
        </label>
        <label className="space-y-2 text-sm font-semibold">
          제목
          <Input name="title" required placeholder="예: 김해공항 새벽 픽업 후기" />
        </label>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold">별점</p>
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, index) => {
            const value = index + 1;
            return (
              <button
                key={value}
                type="button"
                className="rounded-lg border bg-background p-3 transition active:scale-95"
                onClick={() => setRating(value)}
                aria-label={`${value}점`}
              >
                <Star className={`size-6 ${value <= rating ? "fill-[#f4c74d] text-[#f4c74d]" : "text-muted-foreground"}`} />
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold">태그</p>
        <div className="flex flex-wrap gap-2">
          {primaryTags.map((tag) => (
            <button key={tag} type="button" onClick={() => toggleTag(tag)}>
              <Badge variant={tags.includes(tag) ? "accent" : "outline"}>#{tag}</Badge>
            </button>
          ))}
        </div>
      </div>

      <label className="block space-y-2 text-sm font-semibold">
        후기 내용
        <Textarea name="content" required placeholder="실제 이용하신 느낌을 편하게 남겨주세요." />
      </label>

      <Button type="submit" size="xl" className="w-full" disabled={pending}>
        {pending ? "등록 중" : "후기 등록하기"}
      </Button>
    </form>
  );
}
