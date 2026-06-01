import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { FloatingActions } from "@/components/site/floating-actions";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { ThemeProvider } from "@/components/site/theme-provider";
import { JsonLd } from "@/components/json-ld";
import { PwaRegister } from "@/app/pwa-register";
import { localBusinessSchema } from "@/lib/seo";
import { seoKeywords, siteConfig } from "@/lib/site";

const naverVerification = process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION;
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | 부산 장거리택시·김해공항·부산관광택시`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: seoKeywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | 부산 장거리택시·김해공항·부산관광`,
    description: siteConfig.description,
    images: [
        {
          url: siteConfig.image,
          width: 1200,
          height: 630,
          alt: "장거리전문부산콜택시 대표 이미지"
        }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | 부산 프리미엄 택시 예약`,
    description: siteConfig.description,
    images: [siteConfig.image]
  },
  verification: {
    google: googleVerification || undefined,
    other: naverVerification ? { "naver-site-verification": naverVerification } : undefined
  },
  category: "local business"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4ee" },
    { media: "(prefers-color-scheme: dark)", color: "#070707" }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <JsonLd data={localBusinessSchema()} />
          <Header />
          <main className="bottom-safe">{children}</main>
          <Footer />
          <FloatingActions />
          <Toaster richColors position="top-center" />
          <PwaRegister />
        </ThemeProvider>
      </body>
    </html>
  );
}
