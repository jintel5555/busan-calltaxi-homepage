import { MessageCircle, MessageSquareText, Phone, Send } from "lucide-react";
import { siteConfig } from "@/lib/site";

const actions = [
  { label: "전화", href: siteConfig.phoneHref, icon: Phone, className: "bg-accent text-accent-foreground" },
  { label: "문자", href: siteConfig.smsHref, icon: MessageSquareText, className: "bg-primary text-primary-foreground" },
  { label: "카카오", href: siteConfig.kakaoUrl, icon: MessageCircle, className: "bg-[#FEE500] text-[#191600]" },
  { label: "톡톡", href: siteConfig.naverTalkUrl, icon: Send, className: "bg-[#03C75A] text-white" }
];

export function FloatingActions() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/92 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl md:left-auto md:right-5 md:bottom-5 md:w-80 md:rounded-lg md:border md:p-3">
      <div className="grid grid-cols-4 gap-2 md:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <a
              key={action.label}
              href={action.href}
              className={`${action.className} pulse-ring tap-target flex flex-col items-center justify-center gap-1 rounded-lg px-2 py-3 text-sm font-black shadow-lg transition active:scale-[0.98] md:flex-row md:text-base`}
              target={action.href.startsWith("http") ? "_blank" : undefined}
              rel={action.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <Icon className="size-5" aria-hidden />
              <span>{action.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
