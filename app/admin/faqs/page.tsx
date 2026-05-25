import type { Metadata } from "next";
import { FaqAdmin } from "@/components/admin/faq-admin";
import { PageHero } from "@/components/sections/page-hero";
import { getAllFaqsForAdmin } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "FAQ 관리",
  robots: {
    index: false,
    follow: false
  }
};

export default async function AdminFaqsPage() {
  const faqs = await getAllFaqsForAdmin();

  return (
    <>
      <PageHero eyebrow="Admin FAQ" title="FAQ 관리" description="자주 묻는 질문을 추가, 수정, 숨김, 삭제할 수 있습니다." />
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <FaqAdmin faqs={faqs} />
        </div>
      </section>
    </>
  );
}
