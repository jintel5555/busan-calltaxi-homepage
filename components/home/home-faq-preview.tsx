"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Faq } from "@/lib/types";

export function HomeFaqPreview({ faqs }: { faqs: Faq[] }) {
  const groups = useMemo(() => {
    const visible = faqs.slice(0, 12);
    const chunks: Faq[][] = [];

    for (let index = 0; index < visible.length; index += 3) {
      chunks.push(visible.slice(index, index + 3));
    }

    return chunks;
  }, [faqs]);

  const [activeGroup, setActiveGroup] = useState(0);

  useEffect(() => {
    if (groups.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveGroup((current) => (current + 1) % groups.length);
    }, 9000);

    return () => window.clearInterval(timer);
  }, [groups.length]);

  const currentFaqs = groups[activeGroup] ?? groups[0] ?? [];

  if (!currentFaqs.length) return null;

  return (
    <section className="bg-background py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-bold text-accent-foreground dark:text-accent">FAQ</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">예약 전 자주 묻는 질문</h2>
          </div>
          <Button asChild variant="outline" size="lg">
            <Link href="/faq">
              FAQ 전체보기 <ArrowRight />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {currentFaqs.map((faq) => (
            <Card key={faq.id} className="min-h-[220px]">
              <CardHeader>
                <div className="mb-3 flex items-center gap-2">
                  <HelpCircle className="size-5 text-accent" />
                  <Badge variant="secondary">{faq.category}</Badge>
                </div>
                <CardTitle className="text-xl font-black leading-8">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 leading-7 text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
