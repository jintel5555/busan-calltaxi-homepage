import { NextResponse } from "next/server";
import { createAdminSessionToken } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";
import { getClientIp, sanitizeText } from "@/lib/security";

export async function POST(request: Request) {
  const limited = checkRateLimit(`admin-login:${getClientIp(request)}`, 8, 60_000);
  if (!limited.ok) {
    return NextResponse.json({ error: "잠시 후 다시 시도해주세요." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const username = sanitizeText(body?.username || "");
  const password = String(body?.password || "");
  const expectedUsername = process.env.ADMIN_USERNAME || "admin";
  const expectedPassword = process.env.ADMIN_PASSWORD || process.env.ADMIN_SECRET || "";

  if (!expectedPassword || username !== expectedUsername || password !== expectedPassword) {
    return NextResponse.json({ error: "아이디 또는 비밀번호가 올바르지 않습니다." }, { status: 401 });
  }

  return NextResponse.json({
    token: createAdminSessionToken(username),
    username
  });
}
