import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { sanitizeMultiline, sanitizeText } from "@/lib/security";
import { createSupabaseAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase";

export async function POST(request: Request) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "관리자 권한이 필요합니다." }, { status: 401 });
  }

  if (!hasSupabaseAdminEnv()) {
    return NextResponse.json({ error: "Supabase 환경변수를 설정해주세요." }, { status: 503 });
  }

  const json = await request.json().catch(() => null);
  const title = sanitizeText(json?.title, 80);
  const content = sanitizeMultiline(json?.content, 600);

  if (!title || !content) {
    return NextResponse.json({ error: "공지 제목과 내용을 입력해주세요." }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("notices")
    .insert({
      title,
      content,
      active: Boolean(json?.active ?? true)
    })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ notice: data }, { status: 201 });
}
