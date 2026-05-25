import Link from "next/link";
import { MessageCircle, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navItems, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t bg-[#090909] text-[#fff6e3]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <div>
            <p className="text-sm text-[#bdb6a8]">부산 장거리택시 · 김해공항 · 부산관광 전문</p>
            <h2 className="mt-2 text-2xl font-black">{siteConfig.name}</h2>
          </div>
          <a href={siteConfig.phoneHref} className="block text-3xl font-black text-[#f4c74d]">
            {siteConfig.phoneDisplay}
          </a>
          <div className="grid gap-2 sm:grid-cols-3">
            <Button asChild size="lg" variant="accent">
              <a href={siteConfig.phoneHref}>
                <Phone /> 전화문의
              </a>
            </Button>
            <Button asChild size="lg" className="bg-[#FEE500] text-[#191600] hover:bg-[#FEE500]/90">
              <a href={siteConfig.kakaoUrl} target="_blank" rel="noreferrer">
                <MessageCircle /> 카카오톡
              </a>
            </Button>
            <Button asChild size="lg" className="bg-[#03C75A] text-white hover:bg-[#03C75A]/90">
              <a href={siteConfig.naverTalkUrl} target="_blank" rel="noreferrer">
                <Send /> 네이버 톡톡
              </a>
            </Button>
          </div>
        </div>

        <nav className="grid grid-cols-2 gap-2 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className="rounded-lg px-3 py-2 text-[#d8cfbd] hover:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
