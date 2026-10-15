"use client";

import { Languages } from "lucide-react";
import { useRouter } from "next/navigation";
import { languageOptions, type SiteLocale } from "@/lib/international";

export function LanguageSwitcher({ locale = "ko", label = "언어 선택" }: { locale?: SiteLocale; label?: string }) {
  const router = useRouter();

  return (
    <label className="relative flex h-11 shrink-0 items-center gap-1 rounded-lg border px-2 text-sm">
      <Languages className="size-4 shrink-0" aria-hidden />
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={locale}
        className="h-full max-w-24 cursor-pointer bg-transparent pr-1 text-xs font-semibold focus-visible:outline-2 focus-visible:outline-accent sm:max-w-44"
        onChange={(event) => {
          const next = languageOptions.find((option) => option.locale === event.target.value);
          if (!next) return;
          router.push(next.path);
        }}
      >
        {languageOptions.map((option) => <option key={option.locale} value={option.locale} className="bg-background text-foreground">{option.shortLabel}</option>)}
      </select>
    </label>
  );
}
