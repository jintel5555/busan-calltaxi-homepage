"use client";

import Link from "next/link";
import { Menu, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { navItems, siteConfig } from "@/lib/site";
import { ThemeToggle } from "@/components/site/theme-toggle";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/88 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex min-w-0 flex-col" onClick={() => setOpen(false)}>
          <span className="truncate text-base font-black">{siteConfig.name}</span>
          <span className="text-xs text-muted-foreground">부산 장거리 · 공항 · 관광 전문</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.slice(0, 7).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button asChild aria-label="관리자 모드" variant="ghost" size="icon">
            <Link href="/admin">
              <ShieldCheck />
            </Link>
          </Button>
          <ThemeToggle />
          <Button
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t bg-background lg:hidden">
          <nav className="mx-auto grid max-w-6xl grid-cols-2 gap-2 p-4">
            <Link
              href="/admin"
              className="rounded-lg border bg-card px-4 py-4 text-sm font-semibold"
              onClick={() => setOpen(false)}
            >
              관리자 모드
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border bg-card px-4 py-4 text-sm font-semibold"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
