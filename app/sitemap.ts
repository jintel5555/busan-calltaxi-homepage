import type { MetadataRoute } from "next";
import { getPublishedReviews } from "@/lib/reviews";
import { navItems, siteConfig } from "@/lib/site";
import { createReviewSlug } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const reviews = await getPublishedReviews(100);
  const now = new Date();

  const staticRoutes = navItems.map((item) => ({
    url: `${siteConfig.url}${item.href}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: item.href === "/" ? 1 : 0.82
  }));

  const reviewRoutes = reviews.map((review) => ({
    url: `${siteConfig.url}/reviews/${createReviewSlug(review)}`,
    lastModified: new Date(review.updated_at || review.created_at),
    changeFrequency: "weekly" as const,
    priority: review.featured ? 0.9 : 0.72
  }));

  return [...staticRoutes, ...reviewRoutes];
}
