import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import { Badge } from "@/components/ui/badge";
import { getPublishedFaqs } from "@/lib/faqs";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "자주 묻는 질문",
  description: "부산 장거리택시, 김해공항 픽업, 부산 관광택시 예약 전 자주 묻는 질문입니다."
};

export default async function FaqPage() {
  const faqs = await getPublishedFaqs();

  return (
    <>
      <JsonLd data={faqSchema(faqs.map((faq) => ({ question: faq.question, answer: faq.answer })))} />
      <PageHero
        eyebrow="FAQ"
        title="자주 묻는 질문"
        description="관리자가 직접 추가한 예약, 공항 픽업, 관광택시, 장거리 이동 관련 안내입니다."
      />
      <section className="py-12">
        <div className="mx-auto max-w-4xl space-y-4 px-4">
          {faqs.map((faq) => (
            <details key={faq.id} className="rounded-lg border bg-card p-5">
              <summary className="cursor-pointer list-none">
                <Badge variant="secondary">{faq.category}</Badge>
                <h2 className="mt-3 text-xl font-black">{faq.question}</h2>
              </summary>
              <p className="mt-4 whitespace-pre-line leading-8 text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
          {!faqs.length ? (
            <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">등록된 FAQ가 없습니다.</div>
          ) : null}
        </div>
      </section>
    </>
  );
}
