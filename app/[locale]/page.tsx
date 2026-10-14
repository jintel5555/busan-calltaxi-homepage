import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowRight, CheckCircle2, MapPin, MessageCircle, MessageSquareText, PlaneLanding, PlaneTakeoff, Plus } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { InternationalBookingForm } from "@/components/international/booking-form";
import { internationalContacts, internationalCopy, internationalLocales, isInternationalLocale, languageAlternates } from "@/lib/international";
import { internationalDesignCopy, internationalPhotos } from "@/lib/international-media";
import { siteConfig } from "@/lib/site";
import styles from "@/components/international/international.module.css";

type PageProps = { params: Promise<{ locale: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return internationalLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isInternationalLocale(locale)) notFound();
  const copy = internationalCopy[locale];
  const url = siteConfig.url + "/" + locale;
  const images = [{ url: siteConfig.image, width: 800, height: 800, alt: copy.brand }];
  return {
    title: { absolute: copy.metaTitle },
    description: copy.description,
    keywords: null,
    alternates: { canonical: url, languages: languageAlternates },
    openGraph: { type: "website", locale: copy.ogLocale, alternateLocale: ["ko_KR", ...internationalLocales.filter((other) => other !== locale).map((other) => internationalCopy[other].ogLocale)], url, siteName: copy.brand, title: copy.metaTitle, description: copy.description, images },
    twitter: { card: "summary_large_image", title: copy.metaTitle, description: copy.description, images },
    other: { "content-language": copy.lang }
  };
}

export default async function InternationalHome({ params }: PageProps) {
  const { locale } = await params;
  if (!isInternationalLocale(locale)) notFound();
  const copy = internationalCopy[locale];
  const design = internationalDesignCopy[locale];
  const url = siteConfig.url + "/" + locale;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", "@id": url + "#service", name: copy.subtitle, description: copy.description, url, areaServed: [{ "@type": "City", name: "Busan" }, { "@type": "Airport", name: "Gimhae International Airport" }], provider: { "@type": "TaxiService", name: siteConfig.name, alternateName: copy.brand, url: siteConfig.url, telephone: siteConfig.phoneDisplay, sameAs: Object.values(internationalContacts) } },
      { "@type": "WebPage", "@id": url, url, name: copy.metaTitle, inLanguage: copy.lang, description: copy.description },
      { "@type": "FAQPage", inLanguage: copy.lang, mainEntity: copy.faq.items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }
    ]
  };

  return (
    <article lang={copy.lang}>
      <JsonLd data={schema} />
      <section className={styles.hero} style={{ backgroundColor: "#122c30", color: "#ffffff" }}>
        <Image src={internationalPhotos[0].src} alt="" fill unoptimized priority sizes="100vw" className={styles.heroPhoto} />
        <div className={styles.heroShade} />
        <div className={styles.container + " " + styles.heroContent}>
          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}><MapPin className="size-4" aria-hidden />{copy.hero.badge}</p>
            <h1 className={styles.heroTitle}>{copy.hero.title}</h1>
            <p className={styles.heroText}>{copy.hero.text}</p>
            <ul className={styles.heroServices}>
              {copy.hero.chips.map((chip) => <li key={chip}><CheckCircle2 aria-hidden />{chip}</li>)}
            </ul>
            <div className={styles.heroActions}>
              <a href={internationalContacts.whatsapp} aria-label={copy.whatsapp} target="_blank" rel="noopener noreferrer" className={styles.heroPrimary}><MessageCircle aria-hidden />WhatsApp</a>
              <a href={internationalContacts.line} aria-label={copy.line} target="_blank" rel="noopener noreferrer" className={styles.heroSecondary}><MessageSquareText aria-hidden />LINE</a>
            </div>
            <p className={styles.messageLabel}><MessageSquareText aria-hidden />{copy.messageLabel}</p>
          </div>
          <div className={styles.heroBottom}>
            <a href="#tours" className={styles.heroExplore}>{copy.nav.tour}<ArrowDown aria-hidden /></a>
            <p className={styles.heroLocation}><MapPin aria-hidden />{design.location}</p>
          </div>
        </div>
      </section>

      <section id="tours" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div><p className={styles.sectionNumber}>01 / {copy.nav.tour}</p><h2 className={styles.sectionTitle}>{copy.tour.title}</h2></div>
            <p className={styles.sectionDescription}>{copy.tour.text}</p>
          </div>
          <div className={styles.courseGrid}>
            {copy.tour.courses.map((course, index) => (
              <article key={course.title} className={styles.course}>
                <div className={styles.coursePhoto}>
                  <Image src={internationalPhotos[index].src} alt={design.photoAlts[index]} fill unoptimized sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 100vw" />
                </div>
                <div className={styles.courseBody}>
                  <p className={styles.courseIndex}>0{index + 1}</p>
                  <h3 className={styles.courseTitle}>{course.title}</h3>
                  <p className={styles.courseStops}>{course.stops}</p>
                  <p className={styles.courseDescription}>{course.text}</p>
                  <a href="#booking" className={styles.courseLink}>{copy.nav.booking}<ArrowRight aria-hidden /></a>
                </div>
              </article>
            ))}
          </div>
          <p className={styles.note}>{copy.tour.note}</p>
        </div>
      </section>

      <section id="airport" className={styles.section + " " + styles.airport}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div><p className={styles.sectionNumber}>02 / {copy.nav.airport}</p><h2 className={styles.sectionTitle}>{copy.airport.title}</h2></div>
            <p className={styles.sectionDescription}>{copy.airport.text}</p>
          </div>
          <div className={styles.transferGrid}>
            <div className={styles.transfer}>
              <span className={styles.transferIcon}><PlaneLanding aria-hidden /></span>
              <p className={styles.transferRoute}><span>GIM</span><ArrowRight aria-hidden /><span>BUSAN</span></p>
              <h3 className={styles.transferTitle}>{copy.airport.pickup}</h3>
              <p className={styles.transferText}>{copy.airport.pickupText}</p>
            </div>
            <div className={styles.transfer}>
              <span className={styles.transferIcon}><PlaneTakeoff aria-hidden /></span>
              <p className={styles.transferRoute}><span>BUSAN</span><ArrowRight aria-hidden /><span>GIM</span></p>
              <h3 className={styles.transferTitle}>{copy.airport.dropoff}</h3>
              <p className={styles.transferText}>{copy.airport.dropoffText}</p>
            </div>
          </div>
          <ul className={styles.checklist}>
            {copy.airport.checklist.map((item) => <li key={item}><CheckCircle2 aria-hidden />{item}</li>)}
          </ul>
          <p className={styles.note}>{copy.airport.note}</p>
        </div>
      </section>

      <section id="booking" className={styles.section + " " + styles.booking}>
        <div className={styles.container + " " + styles.bookingGrid}>
          <div className={styles.bookingIntro}>
            <p className={styles.sectionNumber}>03 / {copy.nav.booking}</p>
            <h2 className={styles.sectionTitle}>{copy.booking.title}</h2>
            <p className={styles.sectionDescription + " mt-5"}>{copy.booking.text}</p>
            <div className={styles.bookingMessage}><MessageSquareText aria-hidden /><p>{copy.messageOnly}</p></div>
            <div className={styles.bookingContacts}>
              <a href={internationalContacts.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden />WhatsApp</a>
              <a href={internationalContacts.line} target="_blank" rel="noopener noreferrer"><MessageSquareText aria-hidden />LINE</a>
            </div>
          </div>
          <div className={styles.bookingPanel}><InternationalBookingForm locale={locale} /></div>
        </div>
      </section>

      <section id="faq" className={styles.section}>
        <div className={styles.container + " " + styles.faqGrid}>
          <div><p className={styles.sectionNumber}>04 / {copy.nav.faq}</p><h2 className={styles.sectionTitle}>{copy.faq.title}</h2></div>
          <div className={styles.faqList}>
            {copy.faq.items.map((item) => (
              <details key={item.question} className={styles.faqItem}>
                <summary>{item.question}<Plus aria-hidden /></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
