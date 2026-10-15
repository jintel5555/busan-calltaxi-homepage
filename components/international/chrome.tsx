"use client";

import Link from "next/link";
import { AtSign, Camera, CarFront, Globe2, MessageCircle, MessageSquareText } from "lucide-react";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { internationalContacts, internationalCopy, languageOptions, type InternationalLocale } from "@/lib/international";
import { internationalDesignCopy, internationalPhotos } from "@/lib/international-media";
import styles from "./international.module.css";

export function InternationalHeader({ locale }: { locale: InternationalLocale }) {
  const copy = internationalCopy[locale];
  const items = [
    { id: "tours", label: copy.nav.tour }, { id: "airport", label: copy.nav.airport },
    { id: "booking", label: copy.nav.booking }, { id: "faq", label: copy.nav.faq }
  ];

  return (
    <header lang={copy.lang} className={styles.header}>
      <div className={styles.container + " " + styles.headerInner}>
        <Link href={"/" + locale} className={styles.brand}>
          <span className={styles.brandMark}><CarFront className="size-6" aria-hidden /></span>
          <span><span className={styles.brandName}>{copy.brand}</span><span className={styles.brandSubtitle}>{copy.subtitle}</span></span>
        </Link>
        <nav aria-label={copy.menu} className={styles.navigation}>
          {items.map((item) => <a key={item.id} href={"/" + locale + "#" + item.id}>{item.label}</a>)}
        </nav>
        <div className={styles.headerTools}>
          <LanguageSwitcher locale={locale} label={copy.language} />
          <ThemeToggle label={copy.theme} />
        </div>
      </div>
    </header>
  );
}

export function InternationalFooter({ locale }: { locale: InternationalLocale }) {
  const copy = internationalCopy[locale];
  return (
    <footer lang={copy.lang} className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerTop}>
          <div>
            <p className={styles.footerBrand}>{copy.brand}</p>
            <p className={styles.footerText}>{copy.footer}</p>
            <p className={styles.footerText}>{copy.koreaPhone}</p>
            <div className={styles.footerLinks}>
              <a href={internationalContacts.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden />WhatsApp</a>
              <a href={internationalContacts.line} target="_blank" rel="noopener noreferrer"><MessageSquareText aria-hidden />LINE</a>
            </div>
          </div>
          <div>
            <p className="font-semibold">{copy.social}</p>
            <p className={styles.footerText}>{copy.messageOnly}</p>
            <div className={styles.footerLinks}>
              {[
                { label: "Facebook", href: internationalContacts.facebook, icon: Globe2 },
                { label: "Instagram", href: internationalContacts.instagram, icon: Camera },
                { label: "Threads", href: internationalContacts.threads, icon: AtSign }
              ].map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer"><Icon aria-hidden />{label}</a>)}
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <nav aria-label={copy.language} className={styles.languageLinks}>
            {languageOptions.map((option) => <Link key={option.locale} href={option.path} lang={option.lang}>{option.shortLabel}</Link>)}
          </nav>
          <details className={styles.credits}>
            <summary>{internationalDesignCopy[locale].photoCredits}</summary>
            {internationalPhotos.map((photo) => <p key={photo.src}><a href={photo.source} target="_blank" rel="noopener noreferrer">{photo.author}</a> · <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer">{photo.license}</a></p>)}
          </details>
        </div>
      </div>
    </footer>
  );
}

export function InternationalFloatingActions({ locale }: { locale: InternationalLocale }) {
  const copy = internationalCopy[locale];
  return (
    <div lang={copy.lang} className={styles.floating}>
      <p className={styles.floatingNote}><MessageSquareText aria-hidden />{copy.messageLabel}</p>
      <div className={styles.floatingButtons}>
        <a href={internationalContacts.whatsapp} aria-label={copy.whatsapp} target="_blank" rel="noopener noreferrer" className={styles.floatingPrimary}><MessageCircle aria-hidden />WhatsApp</a>
        <a href={internationalContacts.line} aria-label={copy.line} target="_blank" rel="noopener noreferrer" className={styles.floatingSecondary}><MessageSquareText aria-hidden />LINE</a>
      </div>
    </div>
  );
}
