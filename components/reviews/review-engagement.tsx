"use client";

import { FormEvent, useEffect, useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Comment, Review } from "@/lib/types";
import { formatKoreanDate } from "@/lib/utils";

export function ReviewEngagement({ review, initialComments }: { review: Review; initialComments: Comment[] }) {
  const [comments, setComments] = useState(initialComments);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    fetch(`/api/reviews/${review.id}/view`, { method: "POST" }).catch(() => undefined);
  }, [review.id]);

  async function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setPending(true);

    try {
      const response = await fetch(`/api/reviews/${review.id}/comments`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          author: formData.get("author"),
          content: formData.get("content"),
          honeypot: formData.get("website")
        })
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || "댓글 등록에 실패했습니다.");
      setComments((current) => [...current, result.comment]);
      form.reset();
      toast.success("댓글이 등록되었습니다.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "잠시 후 다시 시도해주세요.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="space-y-5">
      <div className="space-y-3">
        <h2 className="text-xl font-black">댓글</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between gap-3 text-sm">
              <strong>{comment.author}</strong>
              <span className="text-muted-foreground">{formatKoreanDate(comment.created_at)}</span>
            </div>
            <p className="mt-2 leading-7 text-muted-foreground">{comment.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={submitComment} className="space-y-3 rounded-lg border bg-card p-4">
        <input className="hidden" name="website" tabIndex={-1} autoComplete="off" />
        <Input name="author" required placeholder="작성자" />
        <Textarea name="content" required placeholder="댓글을 남겨주세요." />
        <Button type="submit" size="lg" disabled={pending}>
          <Send /> {pending ? "등록 중" : "댓글 등록"}
        </Button>
      </form>
    </section>
  );
}
