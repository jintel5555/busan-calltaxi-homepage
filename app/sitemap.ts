import type { MetadataRoute } from "next";
import { internationalLocales, languageAlternates } from "@/lib/international";
import { busanTourTaxiPages } from "@/lib/busan-tour-taxi-pages";
import { longDistanceTaxiPages } from "@/lib/long-distance-taxi-pages";
import { getPublishedReviews } from "@/lib/reviews";
import { navItems, siteConfig } from "@/lib/site";
import { createReviewSlug } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const reviews = await getPublishedReviews(500);
  const now = new Date();

  const staticRoutes = navItems
    .filter((item) => item.href.startsWith("/"))
    .map((item) => ({
      url: `${siteConfig.url}${item.href}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: item.href === "/" ? 1 : 0.82,
      ...(item.href === "/" ? { alternates: { languages: languageAlternates } } : {})
    }));

  const reviewRoutes = reviews.map((review) => ({
    url: encodeURI(`${siteConfig.url}/reviews/${createReviewSlug(review)}`),
    lastModified: new Date(review.updated_at || review.created_at),
    changeFrequency: "weekly" as const,
    priority: review.featured ? 0.9 : 0.72
  }));

  const longDistanceRoutes = longDistanceTaxiPages.map((page) => ({
    url: `${siteConfig.url}/long-distance-taxi/${page.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.84
  }));

  const busanTourTaxiRoutes = busanTourTaxiPages.map((page) => ({
    url: `${siteConfig.url}/busan-tour-taxi/${page.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.84
  }));

  const internationalRoutes = internationalLocales.map((locale) => ({
    url: `${siteConfig.url}/${locale}`,
    changeFrequency: "monthly" as const,
    priority: 0.9,
    alternates: { languages: languageAlternates }
  }));

  return [...staticRoutes, ...internationalRoutes, ...longDistanceRoutes, ...busanTourTaxiRoutes, ...reviewRoutes];
}
