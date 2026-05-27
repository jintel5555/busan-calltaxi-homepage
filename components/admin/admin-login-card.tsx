"use client";

import { FormEvent, ReactNode, useState } from "react";
import { Lock, LogOut } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const sessionKey = "busan_admin_session_token";
const usernameKey = "busan_admin_username";

function isSessionTokenFresh(token: string) {
  const [payload] = token.split(".");
  if (!payload) return false;

  try {
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const data = JSON.parse(atob(padded)) as { expiresAt?: number };
    return Boolean(data.expiresAt && data.expiresAt > Date.now());
  } catch {
    return false;
  }
}

export function clearAdminSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(sessionKey);
  localStorage.removeItem(usernameKey);
}

export function getAdminSessionToken() {
  if (typeof window === "undefined") return "";
  const token = localStorage.getItem(sessionKey) || "";
  if (!token) return "";
  if (isSessionTokenFresh(token)) return token;
  clearAdminSession();
  return "";
}

function getSavedAdminUser() {
  if (typeof window === "undefined") return "";
  const token = getAdminSessionToken();
  const savedUsername = localStorage.getItem(usernameKey);
  return token && savedUsername ? savedUsername : "";
}

export function AdminLoginCard({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sessionUser, setSessionUser] = useState(getSavedAdminUser);
  const [pending, setPending] = useState(false);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || "로그인에 실패했습니다.");

      localStorage.setItem(sessionKey, result.token);
      localStorage.setItem(usernameKey, result.username);
      setSessionUser(result.username);
      setPassword("");
      toast.success("관리자 모드로 로그인했습니다.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "잠시 후 다시 시도해주세요.");
    } finally {
      setPending(false);
    }
  }

  function signOut() {
    clearAdminSession();
    setSessionUser("");
    toast.success("로그아웃했습니다.");
  }

  if (sessionUser) {
    return (
      <div className="space-y-6">
        <section className="flex flex-col gap-3 rounded-lg border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">관리자 접속 중</p>
            <p className="text-xl font-black">{sessionUser}</p>
          </div>
          <Button type="button" variant="outline" onClick={signOut}>
            <LogOut /> 로그아웃
          </Button>
        </section>
        {children}
      </div>
    );
  }

  return (
    <form onSubmit={signIn} className="mx-auto max-w-md space-y-4 rounded-lg border bg-card p-5">
      <div className="flex items-center gap-2">
        <Lock className="size-5 text-accent" />
        <h2 className="text-2xl font-black">관리자 로그인</h2>
      </div>
      <label className="space-y-2 text-sm font-semibold">
        아이디
        <Input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required />
      </label>
      <label className="space-y-2 text-sm font-semibold">
        비밀번호
        <Input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
        />
      </label>
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        <Lock /> {pending ? "확인 중" : "관리자 모드 접속"}
      </Button>
    </form>
  );
}
