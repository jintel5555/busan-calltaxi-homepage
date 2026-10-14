"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { FloatingActions } from "@/components/site/floating-actions";
import { InternationalHeader, InternationalFooter, InternationalFloatingActions } from "@/components/international/chrome";
import { LanguageEntry } from "@/components/site/language-entry";
import { localeFromPath } from "@/lib/international";

export function SiteShell({ children }: { children: ReactNode }) {
  const locale = localeFromPath(usePathname());

  return (
    <>
      {locale === "ko" ? <Header /> : <InternationalHeader locale={locale} />}
      <main className="bottom-safe">{children}</main>
      {locale === "ko" ? <Footer /> : <InternationalFooter locale={locale} />}
      {locale === "ko" ? <FloatingActions /> : <InternationalFloatingActions locale={locale} />}
      <LanguageEntry />
    </>
  );
}
