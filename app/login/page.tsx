import type { Metadata } from "next";
import { LoginPanel } from "@/components/auth/login-panel";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "로그인",
  robots: {
    index: false,
    follow: false
  }
};

export default function LoginPage() {
  return (
    <>
      <PageHero
        eyebrow="Login"
        title="관리자 로그인"
        description="Supabase Auth 계정으로 로그인하면 관리자 권한 요청에 Bearer 토큰을 사용할 수 있습니다."
      />
      <section className="py-12">
        <div className="mx-auto max-w-xl px-4">
          <LoginPanel />
        </div>
      </section>
    </>
  );
}
