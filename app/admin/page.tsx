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
        title="관리자 모드"
        description="운영자 전용 관리 기능이 제공되는 공간입니다."
      />
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <AdminDashboard reviews={reviews} />
        </div>
      </section>
    </>
  );
}
