import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarClock, CheckCircle2, HelpCircle, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getLongDistanceTaxiPage,
  longDistanceTaxiPages,
  type LongDistanceTaxiPageData
} from "@/lib/long-distance-taxi-pages";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return longDistanceTaxiPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLongDistanceTaxiPage(slug);
  if (!page) return {};

  const path = `/long-distance-taxi/${page.slug}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: path
    },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      title: page.metaTitle,
      description: page.metaDescription,
      images: [
        {
          url: siteConfig.image,
          width: 800,
          height: 800,
          alt: page.metaTitle
        }
      ]
    }
  };
}

function serviceSchema(page: LongDistanceTaxiPageData) {
  const url = absoluteUrl(`/long-distance-taxi/${page.slug}`);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TaxiService",
        "@id": `${siteConfig.url}#taxi-service`,
        name: siteConfig.name,
        url: siteConfig.url,
        telephone: siteConfig.phoneDisplay,
        image: siteConfig.image,
        areaServed: ["부산광역시", page.destination],
        sameAs: [siteConfig.kakaoUrl, siteConfig.naverTalkUrl]
      },
      {
        "@type": "Service",
        name: page.mainKeyword,
        serviceType: "장거리 콜택시 예약 상담",
        provider: {
          "@id": `${siteConfig.url}#taxi-service`
        },
        areaServed: ["부산광역시", page.destination],
        url,
        description: page.metaDescription
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "홈",
            item: siteConfig.url
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "장거리택시",
            item: absoluteUrl("/long-distance-taxi")
          },
          {
            "@type": "ListItem",
            position: 3,
            name: page.mainKeyword,
            item: url
          }
        ]
      }
    ]
  };
}

export default async function LongDistanceTaxiDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getLongDistanceTaxiPage(slug);
  if (!page) notFound();

  const relatedPages = page.relatedSlugs
    .map((relatedSlug) => getLongDistanceTaxiPage(relatedSlug))
    .filter((item): item is LongDistanceTaxiPageData => Boolean(item));

  return (
    <>
      <JsonLd data={serviceSchema(page)} />
      <PageHero eyebrow={page.regionGroup} title={page.h1} description={page.summary}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="xl" variant="accent">
            <a href={siteConfig.phoneHref}>
              <Phone /> 전화문의
            </a>
          </Button>
          <Button asChild size="xl" variant="secondary">
            <a href={siteConfig.smsHref}>
              <MessageCircle /> 문자문의
            </a>
          </Button>
          <Button asChild size="xl" className="bg-[#03c75a] text-white hover:bg-[#03b050]">
            <a href={siteConfig.naverTalkUrl} target="_blank" rel="noreferrer">
              <Send /> 톡톡 상담
            </a>
          </Button>
        </div>
      </PageHero>

      <section className="py-12">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 lg:grid-cols-[0.95fr_1.05fr]">
          <Card>
            <CardHeader>
              <MapPin className="size-8 text-accent" />
              <CardTitle className="text-2xl font-black">{page.destination} 이동이 필요한 상황</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-8 text-muted-foreground">
                부산에서 {page.destination} 콜택시를 찾는 경우에는 출발 시간이 이르거나, 짐이 많거나, 대중교통 환승이
                번거로운 일정이 많습니다. 목적지 근처까지 한 번에 이동하고 싶은 경우에는 출발 위치와 도착지, 경유지,
                탑승 인원, 짐 여부를 미리 정리해 상담하는 편이 좋습니다.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {page.useCases.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-lg border bg-background p-4">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" />
                    <span className="font-semibold leading-7">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CalendarClock className="size-8 text-accent" />
              <CardTitle className="text-2xl font-black">예약 상담 전에 확인하면 좋은 내용</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="leading-8 text-muted-foreground">
                장거리 이동은 일반 시내 이동보다 일정 확인이 중요합니다. 출발 시간, 도착 희망 시간, 중간 경유지,
                왕복 여부를 알려주시면 {page.destination} 이동 조건에 맞춰 상담이 가능합니다.
              </p>
              <div className="flex flex-wrap gap-2">
                {page.checkList.map((item) => (
                  <Badge key={item} variant="secondary">
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-muted/45 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-2">
          <div>
            <p className="font-bold text-accent-foreground dark:text-accent">Departure</p>
            <h2 className="mt-3 text-3xl font-black">부산 주요 출발지 예시</h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              부산역, 김해공항, 해운대, 서면, 광안리처럼 이동 수요가 많은 지역부터 숙소, 병원, 회사, 행사장 출발까지
              상황에 따라 상담할 수 있습니다.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {page.departureExamples.map((item) => (
                <Badge key={item} variant="outline">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="font-bold text-accent-foreground dark:text-accent">Arrival</p>
            <h2 className="mt-3 text-3xl font-black">{page.destination} 주요 도착지 예시</h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              {page.destination} 이동은 시내 중심지, 역, 공항, 병원, 호텔, 회사, 관광지처럼 도착 위치가 다양합니다.
              정확한 주소를 알려주시면 이동 동선과 상담이 더 편해집니다.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {page.arrivalExamples.map((item) => (
                <Badge key={item} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-6">
            <p className="font-bold text-accent-foreground dark:text-accent">Reservation</p>
            <h2 className="mt-3 text-3xl font-black">{page.mainKeyword} 예약 문의</h2>
            <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">
              장거리 이동은 출발지, 도착지, 날짜, 시간, 인원, 짐 여부에 따라 상담이 필요합니다. 예약 가능 여부는 전화,
              문자, 카카오톡, 네이버 톡톡으로 문의해 주세요.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Button asChild size="xl" variant="accent">
              <a href={siteConfig.phoneHref}>
                <Phone /> 전화문의
              </a>
            </Button>
            <Button asChild size="xl" variant="secondary">
              <a href={siteConfig.smsHref}>
                <MessageCircle /> 문자문의
              </a>
            </Button>
            <Button asChild size="xl" className="bg-[#fee500] text-[#191600] hover:bg-[#f2d900]">
              <a href={siteConfig.kakaoUrl} target="_blank" rel="noreferrer">
                <MessageCircle /> 카카오톡 상담
              </a>
            </Button>
            <Button asChild size="xl" className="bg-[#03c75a] text-white hover:bg-[#03b050]">
              <a href={siteConfig.naverTalkUrl} target="_blank" rel="noreferrer">
                <Send /> 네이버 톡톡
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-muted/45 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-6">
            <p className="font-bold text-accent-foreground dark:text-accent">FAQ</p>
            <h2 className="mt-3 text-3xl font-black">{page.destination} 장거리 콜택시 자주 묻는 질문</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {page.faqs.map((faq) => (
              <Card key={faq.question}>
                <CardHeader>
                  <HelpCircle className="size-6 text-accent" />
                  <CardTitle className="text-xl font-black">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-8 text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-6">
            <p className="font-bold text-accent-foreground dark:text-accent">Related Areas</p>
            <h2 className="mt-3 text-3xl font-black">관련 지역 장거리택시 안내</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPages.map((related) => (
              <Link
                key={related.slug}
                href={`/long-distance-taxi/${related.slug}`}
                className="rounded-lg border bg-card p-4 transition hover:-translate-y-0.5 hover:border-accent"
              >
                <Badge variant="outline">{related.regionGroup}</Badge>
                <h3 className="mt-3 text-lg font-black">{related.mainKeyword}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{related.metaDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
