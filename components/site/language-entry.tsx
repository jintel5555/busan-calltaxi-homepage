"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, Globe2 } from "lucide-react";
import { languageOptions, localeFromPath, type SiteLocale } from "@/lib/international";
import { languagePreferenceKey, rememberLanguage } from "@/components/site/language-switcher";

export function LanguageEntry() {
  const pathname = usePathname();
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const locale = localeFromPath(pathname);
    const language = languageOptions.find((option) => option.locale === locale)!;
    document.documentElement.lang = language.lang;
    if (locale !== "ko") {
      rememberLanguage(locale);
      return;
    }
    if (pathname !== "/") return;
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(languagePreferenceKey);
    } catch {
      // Cookie fallback supports browsers where localStorage is unavailable.
    }
    saved ||= document.cookie.split("; ").find((cookie) => cookie.startsWith(`${languagePreferenceKey}=`))?.split("=")[1] || null;
    const preference = languageOptions.find((option) => option.locale === saved);
    if (preference && preference.locale !== "ko") {
      router.replace(preference.path);
    } else if (!preference) {
      dialog.current?.showModal();
    }
  }, [pathname, router]);

  function choose(locale: SiteLocale) {
    const language = languageOptions.find((option) => option.locale === locale)!;
    rememberLanguage(locale);
    dialog.current?.close();
    if (language.path !== pathname) router.push(language.path);
  }

  if (pathname !== "/") return null;

  return (
    <dialog
      ref={dialog}
      aria-labelledby="language-entry-title"
      aria-describedby="language-entry-description"
      className="language-entry m-auto w-[calc(100%_-_2rem)] max-w-md rounded-lg border bg-background p-6 text-foreground shadow-2xl backdrop:bg-black/75"
      onCancel={() => choose("ko")}
    >
      <Globe2 className="size-9 text-accent" aria-hidden />
      <p className="mt-4 text-sm font-semibold text-muted-foreground">장거리전문부산콜택시 · Busan Call Taxi</p>
      <h2 id="language-entry-title" className="mt-2 text-2xl font-black">언어 선택 · Choose language</h2>
      <p id="language-entry-description" className="mt-3 text-sm leading-6 text-muted-foreground">語言選擇 · 言語を選択</p>
      <div className="mt-6 grid gap-3">
        {languageOptions.map((language) => (
          <button key={language.locale} type="button" lang={language.lang} onClick={() => choose(language.locale)} className="flex min-h-14 items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left font-bold transition hover:border-accent hover:bg-muted focus-visible:outline-2 focus-visible:outline-accent">
            {language.label}<ArrowRight className="size-5 shrink-0" aria-hidden />
          </button>
        ))}
      </div>
    </dialog>
  );
}
