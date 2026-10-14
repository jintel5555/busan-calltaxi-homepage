"use client";

import Link from "next/link";
import { AtSign, Camera, Globe2, MessageCircle, MessageSquareText } from "lucide-react";
import { LanguageSwitcher, rememberLanguage } from "@/components/site/language-switcher";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { internationalContacts, internationalCopy, languageOptions, type InternationalLocale } from "@/lib/international";

function navigation(locale: InternationalLocale) {
  const copy = internationalCopy[locale];
  return [
    { id: "tours", label: copy.nav.tour },
    { id: "airport", label: copy.nav.airport },
    { id: "booking", label: copy.nav.booking },
    { id: "faq", label: copy.nav.faq }
  ];
}

export function InternationalHeader({ locale }: { locale: InternationalLocale }) {
  const copy = internationalCopy[locale];
  return (
    <header lang={copy.lang} className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-3 px-4 py-2">
        <Link href={`/${locale}`} className="min-w-0">
          <span className="block text-base font-black leading-6 sm:text-lg">{copy.brand}</span>
          <span className="hidden text-xs text-muted-foreground sm:block">{copy.subtitle}</span>
        </Link>
        <div className="flex shrink-0 items-center gap-1">
          <LanguageSwitcher locale={locale} label={copy.language} />
          <ThemeToggle label={copy.theme} />
        </div>
      </div>
      <nav aria-label={copy.menu} className="mx-auto grid max-w-6xl grid-cols-4 px-2">
        {navigation(locale).map((item) => <a key={item.id} href={`/${locale}#${item.id}`} className="flex min-h-12 items-center justify-center px-1 py-2 text-center text-xs font-semibold transition hover:bg-muted sm:text-sm">{item.label}</a>)}
      </nav>
    </header>
  );
}

export function InternationalFooter({ locale }: { locale: InternationalLocale }) {
  const copy = internationalCopy[locale];
  return (
    <footer lang={copy.lang} className="border-t bg-[#090909] text-white">
      <div className="mx-auto max-w-6xl space-y-7 px-4 py-10">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-2xl font-black">{copy.brand}</p>
            <p className="mt-3 leading-7 text-white/75">{copy.footer}</p>
            <p className="mt-3 text-sm leading-6 text-white/65">{copy.koreaPhone}</p>
          </div>
          <div>
            <p className="text-sm leading-6 text-white/80">{copy.messageOnly}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={internationalContacts.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#25d366] px-4 py-3 font-bold text-[#052610]"><MessageCircle className="size-5" />WhatsApp</a>
              <a href={internationalContacts.line} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#06c755] px-4 py-3 font-bold text-[#042710]"><MessageSquareText className="size-5" />LINE</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/15 pt-6">
          <p className="mb-3 font-semibold">{copy.social}</p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Facebook", href: internationalContacts.facebook, icon: Globe2 },
              { label: "Instagram", href: internationalContacts.instagram, icon: Camera },
              { label: "Threads", href: internationalContacts.threads, icon: AtSign }
            ].map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/25 px-4 py-2 text-sm font-semibold hover:bg-white/10"><Icon className="size-5" />{label}</a>)}
          </div>
        </div>
        <nav aria-label={copy.language} className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
          {languageOptions.map((option) => <Link key={option.locale} href={option.path} lang={option.lang} onClick={() => rememberLanguage(option.locale)} className="py-2 underline underline-offset-4">{option.label}</Link>)}
        </nav>
        <p className="text-xs leading-6 text-white/50">Photo: <a href="https://commons.wikimedia.org/wiki/File:Gwangan_Bridge_at_Night,_Busan.jpg" target="_blank" rel="noopener noreferrer" className="underline">Ken Eckert</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" className="underline">CC BY-SA 4.0</a> · resized / WebP</p>
      </div>
    </footer>
  );
}

export function InternationalFloatingActions({ locale }: { locale: InternationalLocale }) {
  const copy = internationalCopy[locale];
  return (
    <div lang={copy.lang} className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl md:left-auto md:right-5 md:bottom-5 md:w-80 md:rounded-lg md:border md:p-3">
      <div className="grid grid-cols-2 gap-2">
        <a href={internationalContacts.whatsapp} aria-label={copy.whatsapp} target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center justify-center gap-2 rounded-lg bg-[#25d366] px-3 py-3 font-black text-[#052610] transition active:scale-[0.98]"><MessageCircle className="size-5 shrink-0" />WhatsApp</a>
        <a href={internationalContacts.line} aria-label={copy.line} target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center justify-center gap-2 rounded-lg bg-[#06c755] px-3 py-3 font-black text-[#042710] transition active:scale-[0.98]"><MessageSquareText className="size-5 shrink-0" />LINE</a>
      </div>
    </div>
  );
}
