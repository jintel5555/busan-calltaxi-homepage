import { dummyComments, dummyReviews } from "@/lib/dummy-data";
import { createSupabaseAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase";
import type { Comment, Review } from "@/lib/types";
import { createReviewSlug } from "@/lib/utils";

type DbReview = Review & {
  hidden?: boolean | null;
};

function normalizeReview(review: DbReview): Review {
  return {
    ...review,
    images: Array.isArray(review.images) ? review.images : [],
    tags: Array.isArray(review.tags) ? review.tags : [],
    hidden: Boolean(review.hidden)
  };
}

export async function getPublishedReviews(limit = 24): Promise<Review[]> {
  if (!hasSupabaseAdminEnv()) {
    return dummyReviews.slice(0, limit);
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("hidden", false)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) {
    return dummyReviews.slice(0, limit);
  }

  return data.map((review) => normalizeReview(review as DbReview));
}

export async function getAllReviewsForAdmin(limit = 80): Promise<Review[]> {
  if (!hasSupabaseAdminEnv()) {
    return dummyReviews.slice(0, limit);
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) {
    return dummyReviews.slice(0, limit);
  }

  return data.map((review) => normalizeReview(review as DbReview));
}

export async function getReviewBySlug(slug: string): Promise<Review | null> {
  const normalizedSlug = decodeURIComponent(slug);

  if (hasSupabaseAdminEnv()) {
    const id = normalizedSlug.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)?.[0];

    if (id) {
      const supabase = createSupabaseAdminClient();
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .eq("id", id)
        .eq("hidden", false)
        .maybeSingle();

      if (data) {
        return normalizeReview(data as DbReview);
      }
    }
  }

  const reviews = await getPublishedReviews(100);
  return (
    reviews.find((review) => createReviewSlug(review) === normalizedSlug) ||
    reviews.find((review) => normalizedSlug.endsWith(review.id)) ||
    null
  );
}

export async function getComments(reviewId: string): Promise<Comment[]> {
  if (!hasSupabaseAdminEnv()) {
    return dummyComments.filter((comment) => comment.review_id === reviewId);
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("review_id", reviewId)
    .order("created_at", { ascending: true });

  if (error || !data) {
    return dummyComments.filter((comment) => comment.review_id === reviewId);
  }

  return data as Comment[];
}
