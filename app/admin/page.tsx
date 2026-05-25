import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { PageHero } from "@/components/sections/page-hero";
import { getAllReviewsForAdmin } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "관리자",
  robots: {
    index: false,
    follow: false
  }
};

export default async function AdminPage() {
  const reviews = await getAllReviewsForAdmin(80);

  return (
    <>
      <PageHero
        eyebrow="Admin"
        title="후기와 공지 관리"
        description="후기 삭제, 수정, 숨김, 베스트 지정, AI 후기 생성 후 승인 등록을 처리합니다."
      />
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <AdminDashboard reviews={reviews} />
        </div>
      </section>
    </>
  );
}
