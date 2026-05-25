import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

export function PageHero({
  eyebrow,
  title,
  description,
  children
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-[#10100f] py-12 text-[#fff6e3] md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <Badge className="bg-[#f4c74d] text-[#171306]">{eyebrow}</Badge>
        <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[#ddd4c1]">{description}</p>
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </section>
  );
}
