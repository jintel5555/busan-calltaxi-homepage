import { createClient } from "@supabase/supabase-js";
import { createHmac, timingSafeEqual } from "crypto";
import { createSupabaseAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase";

const adminSessionTtlMs = 1000 * 60 * 60 * 12;

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function getAdminSecret() {
  return process.env.ADMIN_SECRET || "";
}

function signAdminSession(payload: string) {
  return createHmac("sha256", getAdminSecret()).update(payload).digest("base64url");
}

export function createAdminSessionToken(username: string) {
  const expiresAt = Date.now() + adminSessionTtlMs;
  const payload = Buffer.from(JSON.stringify({ username, expiresAt })).toString("base64url");
  const signature = signAdminSession(payload);
  return `${payload}.${signature}`;
}

export function verifyAdminSessionToken(token: string | null) {
  if (!token || !getAdminSecret()) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expectedSignature = signAdminSession(payload);
  if (!safeEqual(signature, expectedSignature)) return false;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      username?: string;
      expiresAt?: number;
    };
    return Boolean(data.username && data.expiresAt && data.expiresAt > Date.now());
  } catch {
    return false;
  }
}

export async function isAdminRequest(request: Request) {
  const adminSecret = process.env.ADMIN_SECRET;
  const requestSecret = request.headers.get("x-admin-key");
  const requestSession = request.headers.get("x-admin-session");

  if (adminSecret && requestSecret && adminSecret === requestSecret) {
    return true;
  }

  if (verifyAdminSessionToken(requestSession)) {
    return true;
  }

  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!token || !supabaseUrl || !supabaseAnonKey || !hasSupabaseAdminEnv()) {
    return false;
  }

  const authClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });

  const { data, error } = await authClient.auth.getUser(token);
  if (error || !data.user) return false;

  const adminClient = createSupabaseAdminClient();
  const { data: profile } = await adminClient
    .from("users")
    .select("role")
    .eq("id", data.user.id)
    .single();

  return profile?.role === "admin";
}
