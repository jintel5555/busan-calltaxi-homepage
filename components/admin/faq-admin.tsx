"use client";

import { FormEvent, useState } from "react";
import { EyeOff, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Faq } from "@/lib/types";

export function FaqAdmin({ faqs }: { faqs: Faq[] }) {
  const [items, setItems] = useState(faqs);
  const [adminKey, setAdminKey] = useState("");
  const [accessToken, setAccessToken] = useState(() =>
    typeof window === "undefined" ? "" : localStorage.getItem("busan_admin_access_token") || ""
  );
  const [pending, setPending] = useState<string | null>(null);

  function headers() {
    const result: Record<string, string> = { "content-type": "application/json" };
    if (adminKey) result["x-admin-key"] = adminKey;
    if (accessToken) result.authorization = `Bearer ${accessToken}`;
    return result;
  }

  async function createFaq(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setPending("create");

    try {
      const response = await fetch("/api/admin/faqs", {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({
          question: formData.get("question"),
          answer: formData.get("answer"),
          category: formData.get("category") || "일반",
          sort_order: Number(formData.get("sort_order") || 100),
          active: true
        })
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || "FAQ 등록에 실패했습니다.");
      setItems((current) => [result.faq, ...current].sort((a, b) => a.sort_order - b.sort_order));
      form.reset();
      toast.success("FAQ가 등록되었습니다.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "잠시 후 다시 시도해주세요.");
    } finally {
      setPending(null);
    }
  }

  async function patchFaq(faq: Faq, patch: Partial<Faq>) {
    setPending(faq.id);
    try {
      const response = await fetch(`/api/admin/faqs/${faq.id}`, {
        method: "PATCH",
        headers: headers(),
        body: JSON.stringify(patch)
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || "FAQ 수정에 실패했습니다.");
      setItems((current) =>
        current.map((item) => (item.id === faq.id ? result.faq : item)).sort((a, b) => a.sort_order - b.sort_order)
      );
      toast.success("수정되었습니다.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "잠시 후 다시 시도해주세요.");
    } finally {
      setPending(null);
    }
  }

  async function deleteFaq(faq: Faq) {
    if (!confirm("이 FAQ를 삭제할까요?")) return;
    setPending(faq.id);
    try {
      const response = await fetch(`/api/admin/faqs/${faq.id}`, {
        method: "DELETE",
        headers: headers()
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || "FAQ 삭제에 실패했습니다.");
      setItems((current) => current.filter((item) => item.id !== faq.id));
      toast.success("삭제되었습니다.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "잠시 후 다시 시도해주세요.");
    } finally {
      setPending(null);
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-lg border bg-card p-5">
        <div className="grid gap-3 md:grid-cols-2">
          <label className="space-y-2 text-sm font-semibold">
            관리자 키
            <Input type="password" value={adminKey} onChange={(event) => setAdminKey(event.target.value)} />
          </label>
          <label className="space-y-2 text-sm font-semibold">
            Supabase 토큰
            <Input
              type="password"
              value={accessToken}
              onChange={(event) => {
                setAccessToken(event.target.value);
                localStorage.setItem("busan_admin_access_token", event.target.value);
              }}
            />
          </label>
        </div>
      </section>

      <form onSubmit={createFaq} className="space-y-4 rounded-lg border bg-card p-5">
        <h2 className="text-2xl font-black">FAQ 추가</h2>
        <div className="grid gap-3 md:grid-cols-[1fr_160px_120px]">
          <Input name="question" required placeholder="질문" />
          <Input name="category" placeholder="분류 예: 공항" />
          <Input name="sort_order" type="number" placeholder="순서" />
        </div>
        <Textarea name="answer" required placeholder="답변" />
        <Button type="submit" disabled={pending === "create"}>
          <Plus /> FAQ 등록
        </Button>
      </form>

      <section className="space-y-4">
        <h2 className="text-2xl font-black">FAQ 목록</h2>
        {items.map((faq) => (
          <div key={faq.id} className="space-y-3 rounded-lg border bg-card p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-bold text-muted-foreground">
                  {faq.category} · 순서 {faq.sort_order} · {faq.active ? "노출" : "숨김"}
                </p>
                <h3 className="mt-2 text-lg font-black">{faq.question}</h3>
                <p className="mt-2 leading-7 text-muted-foreground">{faq.answer}</p>
              </div>
              <div className="flex gap-2">
                <Button type="button" size="sm" variant="outline" onClick={() => patchFaq(faq, { active: !faq.active })}>
                  <EyeOff /> {faq.active ? "숨김" : "노출"}
                </Button>
                <Button type="button" size="sm" variant="destructive" onClick={() => deleteFaq(faq)}>
                  <Trash2 /> 삭제
                </Button>
              </div>
            </div>
            <details className="rounded-lg border bg-background p-3">
              <summary className="cursor-pointer font-semibold">내용 수정</summary>
              <EditFaqForm faq={faq} pending={pending === faq.id} onSave={(patch) => patchFaq(faq, patch)} />
            </details>
          </div>
        ))}
      </section>
    </div>
  );
}

function EditFaqForm({
  faq,
  pending,
  onSave
}: {
  faq: Faq;
  pending: boolean;
  onSave: (patch: Partial<Faq>) => void;
}) {
  const [question, setQuestion] = useState(faq.question);
  const [answer, setAnswer] = useState(faq.answer);
  const [category, setCategory] = useState(faq.category);
  const [sortOrder, setSortOrder] = useState(faq.sort_order);

  return (
    <div className="mt-4 space-y-3">
      <div className="grid gap-3 md:grid-cols-[1fr_160px_120px]">
        <Input value={question} onChange={(event) => setQuestion(event.target.value)} />
        <Input value={category} onChange={(event) => setCategory(event.target.value)} />
        <Input type="number" value={sortOrder} onChange={(event) => setSortOrder(Number(event.target.value))} />
      </div>
      <Textarea value={answer} onChange={(event) => setAnswer(event.target.value)} />
      <Button type="button" size="sm" disabled={pending} onClick={() => onSave({ question, answer, category, sort_order: sortOrder })}>
        <Save /> 저장
      </Button>
    </div>
  );
}
