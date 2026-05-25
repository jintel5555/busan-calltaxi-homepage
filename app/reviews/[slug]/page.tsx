import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, Sparkles } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { ReviewEngagement } from "@/components/reviews/review-engagement";
import { Stars } from "@/components/reviews/review-card";
import { Badge } from "@/components/ui/badge";
import { getComments, getPublishedReviews, getReviewBySlug } from "@/lib/reviews";
import { absoluteUrl, reviewSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { createReviewSlug, excerpt, formatKoreanDate } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const reviews = await getPublishedReviews(20);
  return reviews.map((review) => ({ slug: createReviewSlug(review) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const review = await getReviewBySlug(slug);
  if (!review) return {};

  const description = excerpt(review.content, 150);
  const path = `/reviews/${createReviewSlug(review)}`;

  return {
    title: review.title,
    description,
    alternates: {
      canonical: path
    },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      title: review.title,
      description,
      images: [
        {
          url: siteConfig.image,
          width: 1024,
          height: 768,
          alt: review.title
        }
      ]
    }
  };
}

export default async function ReviewDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const review = await getReviewBySlug(slug);
  if (!review) notFound();

  const comments = await getComments(review.id);

  return (
    <>
      <JsonLd data={reviewSchema(review)} />
      <article className="bg-[#10100f] py-12 text-[#fff6e3]">
        <div className="mx-auto max-w-4xl px-4">
          <div className="flex flex-wrap gap-2">
            {review.tags.map((tag) => (
              <Badge key={tag} className="bg-white/12 text-white">
                #{tag}
              </Badge>
            ))}
            {review.featured ? <Badge className="bg-[#f4c74d] text-[#171306]">베스트 후기</Badge> : null}
          </div>
          <h1 className="mt-5 text-4xl font-black leading-tight md:text-5xl">{review.title}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-[#d8cfbd]">
            <Stars rating={review.rating} />
            <span>{review.author}</span>
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="size-4" /> {formatKoreanDate(review.created_at)}
            </span>
            {review.ai_generated ? (
              <span className="inline-flex items-center gap-1">
                <Sparkles className="size-4" /> 관리자 작성
              </span>
            ) : null}
          </div>
        </div>
      </article>

      <section className="py-10">
        <div className="mx-auto max-w-4xl space-y-8 px-4">
          <div className="rounded-lg border bg-card p-6">
            <p className="whitespace-pre-line text-lg leading-9 text-card-foreground">{review.content}</p>
          </div>
          <ReviewEngagement review={review} initialComments={comments} />
        </div>
      </section>
    </>
  );
}
