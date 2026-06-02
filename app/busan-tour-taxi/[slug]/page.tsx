import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarClock, CheckCircle2, HelpCircle, MapPinned, MessageCircle, Phone, Route, Send } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  busanTourTaxiPages,
  getBusanTourTaxiPage,
  type BusanTourTaxiPageData
} from "@/lib/busan-tour-taxi-pages";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return busanTourTaxiPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getBusanTourTaxiPage(slug);
  if (!page) return {};

  const path = `/busan-tour-taxi/${page.slug}`;

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

function tourTaxiSchema(page: BusanTourTaxiPageData) {
  const url = absoluteUrl(`/busan-tour-taxi/${page.slug}`);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "TaxiService"],
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
        serviceType: "부산 관광택시 예약 상담",
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
            name: "부산관광택시",
            item: absoluteUrl("/busan-tour-taxi")
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

export default async function BusanTourTaxiDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getBusanTourTaxiPage(slug);
  if (!page) notFound();

  const relatedPages = page.relatedSlugs
    .map((relatedSlug) => getBusanTourTaxiPage(relatedSlug))
    .filter((item): item is BusanTourTaxiPageData => Boolean(item));

  return (
    <>
      <JsonLd data={tourTaxiSchema(page)} />
      <PageHero eyebrow={page.category} title={page.h1} description={page.summary}>
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
          <Button asChild size="xl" className="bg-[#fee500] text-[#191600] hover:bg-[#f2d900]">
            <a href={siteConfig.kakaoUrl} target="_blank" rel="noreferrer">
              <MessageCircle /> 카카오톡 상담
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
              <MapPinned className="size-8 text-accent" />
              <CardTitle className="text-2xl font-black">{page.destination} 관광택시가 필요한 상황</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-8 text-muted-foreground">
                {page.destination} 관광은 관광지와 식사 장소, 숙소 위치에 따라 이동 시간이 달라집니다. 김해공항,
                부산역, 부산항, 호텔에서 출발하는 경우에는 캐리어 보관과 경유지 확인이 중요합니다. 사전에 원하는
                코스를 알려주시면 이동 순서와 예약 가능 여부를 상담할 수 있습니다.
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
              <CardTitle className="text-2xl font-black">이런 분께 추천합니다</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-8 text-muted-foreground">
                부산은 바다, 시장, 산복도로, 야경 명소가 넓게 퍼져 있어 일정이 짧을수록 이동 동선이 중요합니다.
                대중교통 환승을 줄이고 원하는 장소 위주로 둘러보고 싶다면 관광택시 상담이 도움이 됩니다.
              </p>
              <div className="flex flex-wrap gap-2">
                {page.recommendedFor.map((item) => (
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
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-6">
            <p className="font-bold text-accent-foreground dark:text-accent">Course Example</p>
            <h2 className="mt-3 text-3xl font-black">{page.mainKeyword} 코스 예시</h2>
            <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">
              아래 코스는 상담 때 많이 나오는 예시입니다. 실제 이동은 출발지, 교통 상황, 관광지 운영 시간, 식사
              계획에 따라 조정될 수 있습니다.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {page.courseExamples.map((course) => (
              <Card key={course}>
                <CardHeader>
                  <Route className="size-8 text-accent" />
                  <CardTitle className="text-xl font-black">{course}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-8 text-muted-foreground">
                    출발 시간과 탑승 인원, 짐 여부를 함께 알려주시면 무리 없는 순서로 상담해드립니다.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-[1fr_1fr]">
          <Card>
            <CardHeader>
              <CheckCircle2 className="size-8 text-accent" />
              <CardTitle className="text-2xl font-black">예약 상담 전 확인할 내용</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="leading-8 text-muted-foreground">
                관광택시는 정해진 패키지보다 실제 일정에 맞춰 상담하는 편이 좋습니다. 항공편, KTX, 호텔 체크인
                시간이 있다면 함께 알려주세요.
              </p>
              <div className="flex flex-wrap gap-2">
                {page.checkList.map((item) => (
                  <Badge key={item} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <MessageCircle className="size-8 text-accent" />
              <CardTitle className="text-2xl font-black">{page.mainKeyword} 예약 문의</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="leading-8 text-primary-foreground/82">
                전화, 문자, 카카오톡, 네이버 톡톡으로 예약 가능 여부를 확인할 수 있습니다. 사전 예약을 권장하며,
                당일 문의는 배차 상황에 따라 안내됩니다.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
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
                    <MessageCircle /> 카카오톡
                  </a>
                </Button>
                <Button asChild size="xl" className="bg-[#03c75a] text-white hover:bg-[#03b050]">
                  <a href={siteConfig.naverTalkUrl} target="_blank" rel="noreferrer">
                    <Send /> 톡톡
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-muted/45 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-6">
            <p className="font-bold text-accent-foreground dark:text-accent">FAQ</p>
            <h2 className="mt-3 text-3xl font-black">{page.destination} 관광택시 자주 묻는 질문</h2>
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
            <p className="font-bold text-accent-foreground dark:text-accent">Related Course</p>
            <h2 className="mt-3 text-3xl font-black">관련 부산 관광택시 상세 안내</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPages.map((related) => (
              <Link
                key={related.slug}
                href={`/busan-tour-taxi/${related.slug}`}
                className="rounded-lg border bg-card p-4 transition hover:-translate-y-0.5 hover:border-accent"
              >
                <Badge variant="outline">{related.category}</Badge>
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
