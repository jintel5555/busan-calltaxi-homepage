import type { Review } from "@/lib/types";
import { siteConfig, seoKeywords } from "@/lib/site";
import { createReviewSlug, excerpt } from "@/lib/utils";

export function absoluteUrl(path = "") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phoneDisplay,
    image: siteConfig.image,
    areaServed: [
      "부산광역시",
      "김해국제공항",
      "해운대",
      "광안리",
      "부산역",
      "기장",
      "울산",
      "경남"
    ],
    address: {
      "@type": "PostalAddress",
      addressRegion: "부산광역시",
      addressCountry: "KR"
    },
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "$$",
    serviceType: ["부산장거리택시", "김해공항택시", "부산관광택시", "부산공항픽업"],
    sameAs: [siteConfig.kakaoUrl, siteConfig.naverTalkUrl],
    keywords: seoKeywords.join(", ")
  };
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function reviewSchema(review: Review) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "TaxiService",
      name: siteConfig.name,
      telephone: siteConfig.phoneDisplay,
      url: siteConfig.url
    },
    author: {
      "@type": "Person",
      name: review.author
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1
    },
    headline: review.title,
    reviewBody: review.content,
    datePublished: review.created_at,
    url: absoluteUrl(`/reviews/${createReviewSlug(review)}`),
    description: excerpt(review.content, 150)
  };
}
