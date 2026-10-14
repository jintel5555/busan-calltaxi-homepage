import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowRight, CarFront, CheckCircle2, MapPinned, MessageCircle, MessageSquareText, PlaneLanding, PlaneTakeoff } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { InternationalBookingForm } from "@/components/international/booking-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { internationalContacts, internationalCopy, internationalLocales, isInternationalLocale, languageAlternates } from "@/lib/international";
import { siteConfig } from "@/lib/site";

type PageProps = { params: Promise<{ locale: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return internationalLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isInternationalLocale(locale)) notFound();
  const copy = internationalCopy[locale];
  const url = `${siteConfig.url}/${locale}`;
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
  const url = `${siteConfig.url}/${locale}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", "@id": `${url}#service`, name: copy.subtitle, description: copy.description, url, areaServed: [{ "@type": "City", name: "Busan" }, { "@type": "Airport", name: "Gimhae International Airport" }], provider: { "@type": "TaxiService", name: siteConfig.name, alternateName: copy.brand, url: siteConfig.url, telephone: siteConfig.phoneDisplay, sameAs: Object.values(internationalContacts) } },
      { "@type": "WebPage", "@id": url, url, name: copy.metaTitle, inLanguage: copy.lang, description: copy.description },
      { "@type": "FAQPage", inLanguage: copy.lang, mainEntity: copy.faq.items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }
    ]
  };

  return (
    <article lang={copy.lang}>
      <JsonLd data={schema} />
      <section className="hero-international relative text-white">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
          <div className="max-w-3xl space-y-6">
            <Badge className="bg-[#f4c74d] text-[#171306]">{copy.hero.badge}</Badge>
            <h1 className="text-4xl font-black leading-tight md:text-5xl">{copy.hero.title}</h1>
            <p className="max-w-2xl text-base leading-7 text-white/90 md:text-lg md:leading-8">{copy.hero.text}</p>
            <div className="flex flex-wrap gap-2">{copy.hero.chips.map((chip) => <Badge key={chip} className="border-white/25 bg-black/30 text-white">{chip}</Badge>)}</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button asChild size="xl" className="h-auto min-h-16 whitespace-normal bg-[#25d366] px-4 py-4 text-[#052610] hover:bg-[#20bf5c]"><a href={internationalContacts.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle />{copy.whatsapp}</a></Button>
              <Button asChild size="xl" className="h-auto min-h-16 whitespace-normal bg-[#06c755] px-4 py-4 text-[#042710] hover:bg-[#05b84e]"><a href={internationalContacts.line} target="_blank" rel="noopener noreferrer"><MessageSquareText />{copy.line}</a></Button>
            </div>
            <p className="max-w-2xl border-l-2 border-[#f4c74d] pl-4 text-sm leading-7 text-white/85">{copy.messageLabel}</p>
            <a href="#tours" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#f4c74d]">{copy.nav.tour}<ArrowDown className="size-4" /></a>
          </div>
        </div>
      </section>

      <section id="tours" className="scroll-mt-36 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <MapPinned className="size-8 text-accent" aria-hidden />
          <h2 className="mt-3 text-3xl font-black leading-tight">{copy.tour.title}</h2>
          <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">{copy.tour.text}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {copy.tour.courses.map((course) => (
              <Card key={course.title}>
                <CardHeader><CarFront className="size-7 text-accent" /><CardTitle className="text-xl font-black">{course.title}</CardTitle></CardHeader>
                <CardContent className="space-y-4"><p className="font-semibold leading-7">{course.stops}</p><p className="leading-7 text-muted-foreground">{course.text}</p><a href="#booking" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold underline underline-offset-4">{copy.nav.booking}<ArrowRight className="size-4" /></a></CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-6 max-w-4xl text-sm leading-7 text-muted-foreground">{copy.tour.note}</p>
        </div>
      </section>

      <section id="airport" className="scroll-mt-36 bg-muted/45 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-black leading-tight">{copy.airport.title}</h2>
          <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">{copy.airport.text}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Card><CardHeader><PlaneLanding className="size-8 text-accent" /><CardTitle className="text-2xl font-black">{copy.airport.pickup}</CardTitle></CardHeader><CardContent><p className="leading-8 text-muted-foreground">{copy.airport.pickupText}</p></CardContent></Card>
            <Card><CardHeader><PlaneTakeoff className="size-8 text-accent" /><CardTitle className="text-2xl font-black">{copy.airport.dropoff}</CardTitle></CardHeader><CardContent><p className="leading-8 text-muted-foreground">{copy.airport.dropoffText}</p></CardContent></Card>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">{copy.airport.checklist.map((item) => <li key={item} className="flex items-start gap-2 text-sm font-semibold leading-6"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" />{item}</li>)}</ul>
          <p className="mt-6 max-w-4xl text-sm leading-7 text-muted-foreground">{copy.airport.note}</p>
        </div>
      </section>

      <section id="booking" className="scroll-mt-36 py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <MessageSquareText className="size-8 text-accent" aria-hidden />
            <h2 className="mt-3 text-3xl font-black leading-tight">{copy.booking.title}</h2>
            <p className="mt-4 leading-8 text-muted-foreground">{copy.booking.text}</p>
            <p className="mt-6 border-l-2 border-accent pl-4 text-sm leading-7">{copy.messageOnly}</p>
          </div>
          <div className="rounded-lg border bg-card p-5 sm:p-6"><InternationalBookingForm locale={locale} /></div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-36 bg-muted/45 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-black leading-tight">{copy.faq.title}</h2>
          <div className="mt-6 divide-y border-y">
            {copy.faq.items.map((item) => <details key={item.question} className="group py-4"><summary className="cursor-pointer py-2 text-lg font-semibold leading-7">{item.question}</summary><p className="mt-3 max-w-4xl pb-3 leading-8 text-muted-foreground">{item.answer}</p></details>)}
          </div>
        </div>
      </section>
    </article>
  );
}
