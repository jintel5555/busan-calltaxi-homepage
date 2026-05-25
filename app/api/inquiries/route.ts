import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { inquiryPayloadSchema } from "@/lib/schemas";
import { getClientIp, sanitizeMultiline, sanitizeText } from "@/lib/security";
import { createSupabaseAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`inquiry:${ip}`, 4, 10 * 60_000);
  if (!rate.ok) {
    return NextResponse.json({ error: "잠시 후 다시 시도해주세요." }, { status: 429 });
  }

  const json = await request.json().catch(() => null);
  const parsed = inquiryPayloadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "입력값을 확인해주세요." }, { status: 400 });
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!hasSupabaseAdminEnv()) {
    return NextResponse.json({ error: "Supabase 환경변수를 설정해야 문의 저장이 가능합니다." }, { status: 503 });
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("inquiries")
    .insert({
      name: sanitizeText(parsed.data.name, 32),
      phone: sanitizeText(parsed.data.phone, 24),
      from_place: sanitizeText(parsed.data.from_place, 80),
      to_place: sanitizeText(parsed.data.to_place, 80),
      message: sanitizeMultiline(parsed.data.message, 1000),
      service_type: parsed.data.service_type
    })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ inquiry: data }, { status: 201 });
}
