import Link from "next/link";
import { ArrowRight, Globe2 } from "lucide-react";
import { languageOptions } from "@/lib/international";
import styles from "./language-entry.module.css";

const countryCodes = ["KR", "TW", "JP", "EN"];

export function LanguageEntry() {
  return (
    <section id="language-selection" aria-labelledby="language-entry-title" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <Globe2 className={styles.globe} aria-hidden />
          <div>
            <h2 id="language-entry-title">국가 · 언어 선택</h2>
            <p lang="en">Choose your language <span lang="zh-Hant">· 語言選擇</span> <span lang="ja">· 言語選択</span></p>
          </div>
        </div>
        <nav aria-label="국가 · 언어 선택" className={styles.options}>
          {languageOptions.map((language, index) => (
            <Link
              key={language.locale}
              href={language.locale === "ko" ? "/#korean-home" : language.path}
              lang={language.lang}
              aria-label={language.label}
              className={styles.option}
            >
              <span className={styles.code} aria-hidden>{countryCodes[index]}</span>
              <span className={styles.label}>{language.label}</span>
              <ArrowRight className={styles.arrow} aria-hidden />
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
