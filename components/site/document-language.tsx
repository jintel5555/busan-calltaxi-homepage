"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { languageOptions, localeFromPath } from "@/lib/international";

export function DocumentLanguage() {
  const pathname = usePathname();

  useEffect(() => {
    const locale = localeFromPath(pathname);
    document.documentElement.lang = languageOptions.find((option) => option.locale === locale)!.lang;

    // Retire only the old language preference; retain auth and other browser settings.
    try {
      localStorage.removeItem("busan_site_language");
    } catch {
      // Navigation does not depend on browser storage.
    }
    document.cookie = `busan_site_language=; Path=/; Max-Age=0; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  }, [pathname]);

  return null;
}
