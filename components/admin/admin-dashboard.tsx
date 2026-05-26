"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { Bot, EyeOff, Medal, Pencil, Send, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AdminLoginCard, getAdminSessionToken } from "@/components/admin/admin-login-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Review } from "@/lib/types";

const aiFields = [
  ["from", "출발지", "예: 해운대 숙소"],
  ["to", "도착지", "예: 김해공항 국내선"],
  ["duration", "이동시간", "예: 약 45분"],
  ["purpose", "이용 목적", "예: 새벽 비행기"],
  ["customerType", "손님 유형", "예: 가족 손님"],
  ["vehicleType", "차량 종류", "예: 대형 세단"],
  ["situation", "이동 상황", "예: 캐리어가 많고 비가 조금 왔음"]
] as const;

export function AdminDashboard({ reviews }: { reviews: Review[] }) {
  const [accessToken, setAccessToken] = useState(() =>
    typeof window === "undefined" ? "" : localStorage.getItem("busan_admin_access_token") || ""
  );
  const [draft, setDraft] = useState("");
  const [draftTitle, setDraftTitle] = useState("김해공항 이동 후기");
  const [draftAuthor, setDraftAuthor] = useState("관리자");
  const [pending, setPending] = useState<string | null>(null);
  const [localReviews, setLocalReviews] = useState(reviews);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const visibleReviews = useMemo(() => localReviews, [localReviews]);

  function headers() {
    const result: Record<string, string> = {
      "content-type": "application/json"
    };
    const adminSession = getAdminSessionToken();
    if (adminSession) result["x-admin-session"] = adminSession;
    if (accessToken) result.authorization = `Bearer ${accessToken}`;
    return result;
  }

  async function generateAiReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(aiFields.map(([name]) => [name, formData.get(name)]));

    setPending("ai");
    try {
      const response = await fetch("/api/admin/ai-review", {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || "AI 후기 생성에 실패했습니다.");
      setDraft(result.content);
      setDraftTitle(`${formData.get("from")} → ${formData.get("to")} 이동 후기`);
      toast.success(result.provider === "openai" ? "AI 후기를 생성했습니다." : "샘플 초안을 생성했습니다.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "잠시 후 다시 시도해주세요.");
    } finally {
      setPending(null);
    }
  }

  async function publishDraft() {
    if (!draft.trim()) return toast.error("등록할 후기 초안이 없습니다.");
    setPending("publish");
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({
          title: draftTitle,
          content: draft,
          author: draftAuthor,
          rating: 5,
          tags: ["공항", "장거리"],
          images: [],
          ai_generated: true,
          featured: false
        })
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || "후기 등록에 실패했습니다.");
      setLocalReviews((current) => [result.review, ...current]);
      setDraft("");
      toast.success("승인 후기가 등록되었습니다.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "잠시 후 다시 시도해주세요.");
    } finally {
      setPending(null);
    }
  }

  async function updateReview(review: Review, patch: Partial<Review>) {
    setPending(review.id);
    try {
      const response = await fetch(`/api/reviews/${review.id}`, {
        method: "PATCH",
        headers: headers(),
        body: JSON.stringify(patch)
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || "수정에 실패했습니다.");
      setLocalReviews((current) => current.map((item) => (item.id === review.id ? result.review : item)));
      toast.success("수정되었습니다.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "잠시 후 다시 시도해주세요.");
    } finally {
      setPending(null);
    }
  }

  function startEdit(review: Review) {
    setEditingId(review.id);
    setEditTitle(review.title);
    setEditContent(review.content);
  }

  async function deleteReview(review: Review) {
    if (!confirm("이 후기를 삭제할까요?")) return;
    setPending(review.id);
    try {
      const response = await fetch(`/api/reviews/${review.id}`, {
        method: "DELETE",
        headers: headers()
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || "삭제에 실패했습니다.");
      setLocalReviews((current) => current.filter((item) => item.id !== review.id));
      toast.success("삭제되었습니다.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "잠시 후 다시 시도해주세요.");
    } finally {
      setPending(null);
    }
  }

  async function submitNotice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setPending("notice");
    try {
      const response = await fetch("/api/admin/notices", {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({
          title: formData.get("title"),
          content: formData.get("content"),
          active: true
        })
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || "공지 등록에 실패했습니다.");
      form.reset();
      toast.success("공지 등록이 완료되었습니다.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "잠시 후 다시 시도해주세요.");
    } finally {
      setPending(null);
    }
  }

  return (
    <AdminLoginCard>
    <div className="space-y-8">
      <section className="rounded-lg border bg-card p-5">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-black">관리자 메뉴</h2>
          <Button asChild type="button" variant="outline">
            <Link href="/admin/faqs">FAQ 관리 페이지</Link>
          </Button>
        </div>
        <div className="grid gap-3">
          <label className="space-y-2 text-sm font-semibold">
            Supabase 토큰
            <Input
              type="password"
              value={accessToken}
              onChange={(event) => {
                setAccessToken(event.target.value);
                localStorage.setItem("busan_admin_access_token", event.target.value);
              }}
              placeholder="/login 후 자동 입력"
            />
          </label>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <form onSubmit={generateAiReview} className="space-y-4 rounded-lg border bg-card p-5">
          <div className="flex items-center gap-2">
            <Bot className="size-6 text-accent" />
            <h2 className="text-2xl font-black">AI 후기 생성</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {aiFields.map(([name, label, placeholder]) => (
              <label key={name} className="space-y-2 text-sm font-semibold">
                {label}
                <Input name={name} required placeholder={placeholder} />
              </label>
            ))}
          </div>
          <Button type="submit" size="lg" disabled={pending === "ai"}>
            <Bot /> {pending === "ai" ? "생성 중" : "자연스러운 후기 생성"}
          </Button>
        </form>

        <div className="space-y-4 rounded-lg border bg-card p-5">
          <h2 className="text-2xl font-black">수정 후 승인 등록</h2>
          <Input value={draftTitle} onChange={(event) => setDraftTitle(event.target.value)} placeholder="후기 제목" />
          <Input value={draftAuthor} onChange={(event) => setDraftAuthor(event.target.value)} placeholder="작성자" />
          <Textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="AI 생성 후 이곳에서 수정합니다." />
          <Button type="button" size="lg" variant="accent" onClick={publishDraft} disabled={pending === "publish"}>
            <Send /> {pending === "publish" ? "등록 중" : "승인 후 등록"}
          </Button>
        </div>
      </section>

      <section className="rounded-lg border bg-card p-5">
        <h2 className="mb-4 text-2xl font-black">공지 등록</h2>
        <form onSubmit={submitNotice} className="grid gap-3 md:grid-cols-[0.8fr_1.2fr_auto]">
          <Input name="title" required placeholder="공지 제목" />
          <Input name="content" required placeholder="공지 내용" />
          <Button type="submit" disabled={pending === "notice"}>
            <Pencil /> 등록
          </Button>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-black">후기 관리</h2>
        <div className="grid gap-3">
          {visibleReviews.map((review) => (
            <div key={review.id} className="rounded-lg border bg-card p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap gap-2">
                    {review.featured ? <Badge variant="accent">베스트</Badge> : null}
                    {review.hidden ? <Badge variant="outline">숨김</Badge> : null}
                    {review.ai_generated ? <Badge variant="secondary">AI</Badge> : null}
                  </div>
                  <h3 className="mt-2 text-lg font-black">{review.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">{review.content}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={pending === review.id}
                    onClick={() => startEdit(review)}
                  >
                    <Pencil /> 수정
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={pending === review.id}
                    onClick={() => updateReview(review, { featured: !review.featured })}
                  >
                    <Medal /> 베스트
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={pending === review.id}
                    onClick={() => updateReview(review, { hidden: !review.hidden })}
                  >
                    <EyeOff /> 숨김
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    disabled={pending === review.id}
                    onClick={() => deleteReview(review)}
                  >
                    <Trash2 /> 삭제
                  </Button>
                </div>
              </div>
              {editingId === review.id ? (
                <div className="mt-4 space-y-3 border-t pt-4">
                  <Input value={editTitle} onChange={(event) => setEditTitle(event.target.value)} />
                  <Textarea value={editContent} onChange={(event) => setEditContent(event.target.value)} />
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      onClick={async () => {
                        await updateReview(review, { title: editTitle, content: editContent });
                        setEditingId(null);
                      }}
                    >
                      저장
                    </Button>
                    <Button type="button" size="sm" variant="outline" onClick={() => setEditingId(null)}>
                      취소
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </div>
    </AdminLoginCard>
  );
}
