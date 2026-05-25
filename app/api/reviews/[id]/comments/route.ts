import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { commentPayloadSchema } from "@/lib/schemas";
import { getClientIp, sanitizeMultiline, sanitizeText } from "@/lib/security";
import { createSupabaseAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  if (!hasSupabaseAdminEnv()) {
    return NextResponse.json({ comments: [] });
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("review_id", id)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ comments: data });
}

export async function POST(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const ip = getClientIp(request);
  const rate = checkRateLimit(`comment:${ip}`, 6, 10 * 60_000);
  if (!rate.ok) {
    return NextResponse.json({ error: "잠시 후 다시 시도해주세요." }, { status: 429 });
  }

  const json = await request.json().catch(() => null);
  const parsed = commentPayloadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "입력값을 확인해주세요." }, { status: 400 });
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!hasSupabaseAdminEnv()) {
    return NextResponse.json({ error: "Supabase 환경변수를 설정해야 댓글 등록이 가능합니다." }, { status: 503 });
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("comments")
    .insert({
      review_id: id,
      author: sanitizeText(parsed.data.author, 32),
      content: sanitizeMultiline(parsed.data.content, 1000)
    })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ comment: data }, { status: 201 });
}
