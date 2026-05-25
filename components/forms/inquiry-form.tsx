"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type InquiryFormProps = {
  mode?: "inquiry" | "reservation";
};

export function InquiryForm({ mode = "inquiry" }: InquiryFormProps) {
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      from_place: formData.get("from_place"),
      to_place: formData.get("to_place"),
      message: formData.get("message"),
      service_type: mode,
      honeypot: formData.get("website")
    };

    setPending(true);
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || "문의 저장에 실패했습니다.");
      }

      toast.success("문의가 접수되었습니다. 빠르게 연락드리겠습니다.");
      form.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "잠시 후 다시 시도해주세요.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input className="hidden" name="website" tabIndex={-1} autoComplete="off" />
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold">
          이름
          <Input name="name" required placeholder="홍길동" />
        </label>
        <label className="space-y-2 text-sm font-semibold">
          연락처
          <Input name="phone" required inputMode="tel" placeholder="010-0000-0000" />
        </label>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold">
          출발지
          <Input name="from_place" required placeholder="예: 해운대구 숙소" />
        </label>
        <label className="space-y-2 text-sm font-semibold">
          도착지
          <Input name="to_place" required placeholder="예: 김해공항 국내선" />
        </label>
      </div>
      <label className="block space-y-2 text-sm font-semibold">
        요청사항
        <Textarea name="message" placeholder="탑승 시간, 인원, 짐 개수, 관광 희망지를 남겨주세요." />
      </label>
      <Button type="submit" size="xl" className="w-full" disabled={pending}>
        {pending ? "접수 중" : mode === "reservation" ? "예약문의 보내기" : "실시간 문의 보내기"}
      </Button>
    </form>
  );
}
