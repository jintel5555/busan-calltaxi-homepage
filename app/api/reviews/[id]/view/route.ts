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
  const rate = checkRateLimit(`view:${ip}:${id}`, 2, 30 * 60_000);
  if (!rate.ok) {
    return NextResponse.json({ ok: true });
  }

  if (!hasSupabaseAdminEnv()) {
    return NextResponse.json({ ok: true });
  }

  const supabase = createSupabaseAdminClient();
  const { data: current } = await supabase.from("reviews").select("views").eq("id", id).single();
  const views = Number(current?.views || 0) + 1;
  await supabase.from("reviews").update({ views }).eq("id", id);

  return NextResponse.json({ ok: true, views });
}
