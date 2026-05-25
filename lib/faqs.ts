import { dummyFaqs } from "@/lib/dummy-data";
import { createSupabaseAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase";
import type { Faq } from "@/lib/types";

export async function getPublishedFaqs(): Promise<Faq[]> {
  if (!hasSupabaseAdminEnv()) {
    return dummyFaqs;
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !data) {
    return dummyFaqs;
  }

  return data as Faq[];
}

export async function getAllFaqsForAdmin(): Promise<Faq[]> {
  if (!hasSupabaseAdminEnv()) {
    return dummyFaqs;
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !data) {
    return dummyFaqs;
  }

  return data as Faq[];
}
