import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/security";
import { createSupabaseAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const ip = getClientIp(request);
  const rate = checkRateLimit(`like:${ip}:${id}`, 4, 60_000);
  if (!rate.ok) {
    return NextResponse.json({ error: "잠시 후 다시 시도해주세요." }, { status: 429 });
  }

  if (!hasSupabaseAdminEnv()) {
    return NextResponse.json({ likes: 1 });
  }

  const supabase = createSupabaseAdminClient();
  const { data: current, error: readError } = await supabase.from("reviews").select("likes").eq("id", id).single();
  if (readError) return NextResponse.json({ error: readError.message }, { status: 500 });

  const likes = Number(current?.likes || 0) + 1;
  const { error } = await supabase.from("reviews").update({ likes }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ likes });
}
