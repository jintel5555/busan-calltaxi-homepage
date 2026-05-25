import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { sanitizeImageUrls, sanitizeMultiline, sanitizeText } from "@/lib/security";
import { createSupabaseAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "관리자 권한이 필요합니다." }, { status: 401 });
  }

  if (!hasSupabaseAdminEnv()) {
    return NextResponse.json({ error: "Supabase 환경변수를 설정해주세요." }, { status: 503 });
  }

  const { id } = await context.params;
  const json = await request.json().catch(() => null);
  const patch: Record<string, unknown> = {};

  if (typeof json?.title === "string") patch.title = sanitizeText(json.title, 90);
  if (typeof json?.content === "string") patch.content = sanitizeMultiline(json.content, 2400);
  if (typeof json?.author === "string") patch.author = sanitizeText(json.author, 32);
  if (typeof json?.rating === "number") patch.rating = Math.min(5, Math.max(1, Math.round(json.rating)));
  if (Array.isArray(json?.images)) patch.images = sanitizeImageUrls(json.images);
  if (Array.isArray(json?.tags)) patch.tags = json.tags.map((tag: unknown) => sanitizeText(tag, 16)).filter(Boolean);
  if (typeof json?.featured === "boolean") patch.featured = json.featured;
  if (typeof json?.hidden === "boolean") patch.hidden = json.hidden;

  patch.updated_at = new Date().toISOString();

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.from("reviews").update(patch).eq("id", id).select("*").single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ review: data });
}

export async function DELETE(request: Request, context: RouteContext) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "관리자 권한이 필요합니다." }, { status: 401 });
  }

  if (!hasSupabaseAdminEnv()) {
    return NextResponse.json({ error: "Supabase 환경변수를 설정해주세요." }, { status: 503 });
  }

  const { id } = await context.params;
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("reviews").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
