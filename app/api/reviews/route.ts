import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";
import { reviewPayloadSchema } from "@/lib/schemas";
import { getClientIp, sanitizeImageUrls, sanitizeMultiline, sanitizeText } from "@/lib/security";
import { createSupabaseAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase";

export async function GET() {
  if (!hasSupabaseAdminEnv()) {
    return NextResponse.json({ reviews: [] });
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("hidden", false)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(80);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ reviews: data });
}

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = reviewPayloadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "입력값을 확인해주세요." }, { status: 400 });
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const isAdmin = await isAdminRequest(request);
  if (!isAdmin) {
    const ip = getClientIp(request);
    const rate = checkRateLimit(`review:${ip}`, 5, 10 * 60_000);
    if (!rate.ok) {
      return NextResponse.json({ error: "잠시 후 다시 시도해주세요." }, { status: 429 });
    }
  }

  if ((parsed.data.ai_generated || parsed.data.featured) && !isAdmin) {
    return NextResponse.json({ error: "관리자 권한이 필요합니다." }, { status: 401 });
  }

  if (!hasSupabaseAdminEnv()) {
    return NextResponse.json({ error: "Supabase 환경변수를 설정해야 후기 등록이 가능합니다." }, { status: 503 });
  }

  const supabase = createSupabaseAdminClient();
  const payload = {
    title: sanitizeText(parsed.data.title, 90),
    content: sanitizeMultiline(parsed.data.content, 2400),
    rating: parsed.data.rating,
    images: sanitizeImageUrls(parsed.data.images),
    tags: parsed.data.tags.map((tag) => sanitizeText(tag, 16)).filter(Boolean),
    author: sanitizeText(parsed.data.author, 32),
    ai_generated: isAdmin ? parsed.data.ai_generated : false,
    featured: isAdmin ? parsed.data.featured : false,
    hidden: false
  };

  const { data, error } = await supabase.from("reviews").insert(payload).select("*").single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ review: data }, { status: 201 });
}
