"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { FloatingActions } from "@/components/site/floating-actions";
import { InternationalHeader, InternationalFooter, InternationalFloatingActions } from "@/components/international/chrome";
import { DocumentLanguage } from "@/components/site/document-language";
import { localeFromPath } from "@/lib/international";
import styles from "@/components/international/international.module.css";

export function SiteShell({ children }: { children: ReactNode }) {
  const locale = localeFromPath(usePathname());

  return (
    <div className={locale === "ko" ? undefined : styles.site}>
      {locale === "ko" ? <Header /> : <InternationalHeader locale={locale} />}
      <main className="bottom-safe">{children}</main>
      {locale === "ko" ? <Footer /> : <InternationalFooter locale={locale} />}
      {locale === "ko" ? <FloatingActions /> : <InternationalFloatingActions locale={locale} />}
      <DocumentLanguage />
    </div>
  );
}
