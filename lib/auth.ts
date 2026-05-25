import { createClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase";

export async function isAdminRequest(request: Request) {
  const adminSecret = process.env.ADMIN_SECRET;
  const requestSecret = request.headers.get("x-admin-key");

  if (adminSecret && requestSecret && adminSecret === requestSecret) {
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
