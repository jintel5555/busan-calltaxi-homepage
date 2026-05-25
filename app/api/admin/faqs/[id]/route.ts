import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { sanitizeMultiline, sanitizeText } from "@/lib/security";
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

  if (typeof json?.question === "string") patch.question = sanitizeText(json.question, 160);
  if (typeof json?.answer === "string") patch.answer = sanitizeMultiline(json.answer, 2000);
  if (typeof json?.category === "string") patch.category = sanitizeText(json.category, 40) || "일반";
  if (typeof json?.sort_order === "number") patch.sort_order = Math.max(0, Math.min(9999, Math.round(json.sort_order)));
  if (typeof json?.active === "boolean") patch.active = json.active;
  patch.updated_at = new Date().toISOString();

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.from("faqs").update(patch).eq("id", id).select("*").single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ faq: data });
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
  const { error } = await supabase.from("faqs").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
