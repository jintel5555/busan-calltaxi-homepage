"use client";

import { FormEvent, useEffect, useState } from "react";
import { LogIn, LogOut } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient, hasSupabasePublicEnv } from "@/lib/supabase";

const tokenKey = "busan_admin_access_token";

export function LoginPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!hasSupabasePublicEnv()) return;
    const supabase = createSupabaseBrowserClient();
    supabase.auth.getSession().then(({ data }) => {
      const token = data.session?.access_token;
      if (token) {
        localStorage.setItem(tokenKey, token);
        setSessionEmail(data.session?.user.email || null);
      }
    });
  }, []);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!hasSupabasePublicEnv()) {
      toast.error("Supabase 공개 환경변수를 먼저 설정해주세요.");
      return;
    }

    setPending(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.session?.access_token) {
        localStorage.setItem(tokenKey, data.session.access_token);
        setSessionEmail(data.user.email || null);
      }
      toast.success("로그인되었습니다.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "로그인에 실패했습니다.");
    } finally {
      setPending(false);
    }
  }

  async function signOut() {
    if (hasSupabasePublicEnv()) {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
    }
    localStorage.removeItem(tokenKey);
    setSessionEmail(null);
    toast.success("로그아웃되었습니다.");
  }

  if (sessionEmail) {
    return (
      <div className="space-y-4 rounded-lg border bg-card p-5">
        <p className="font-semibold">{sessionEmail}</p>
        <Button type="button" variant="outline" onClick={signOut}>
          <LogOut /> 로그아웃
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={signIn} className="space-y-4 rounded-lg border bg-card p-5">
      <label className="space-y-2 text-sm font-semibold">
        이메일
        <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
      </label>
      <label className="space-y-2 text-sm font-semibold">
        비밀번호
        <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
      </label>
      <Button type="submit" size="lg" disabled={pending}>
        <LogIn /> {pending ? "로그인 중" : "Supabase 로그인"}
      </Button>
    </form>
  );
}
