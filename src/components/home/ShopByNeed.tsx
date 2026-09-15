import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/animations/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { ScrollRow, scrollItemClass } from "@/components/common/ScrollRow";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Section } from "@/components/layout/Section";
import { shoppingNeeds } from "@/data/home";
import { cn } from "@/lib/utils/cn";
import type { ShoppingNeed, Tone } from "@/types/content";

const toneStyles: Record<Tone, { card: string; title: string; badge: string }> = {
  blush: { card: "bg-blush", title: "text-primary", badge: "text-primary-strong" },
  aqua: { card: "bg-aqua-mist", title: "text-accent", badge: "text-accent" },
  cream: { card: "bg-cream", title: "text-primary", badge: "text-primary-strong" },
};

/** Illustrated pastel card — no stock photography; the large icon doubles as a watermark. */
function NeedCard({ need }: { need: ShoppingNeed }) {
  const Icon = need.icon;
  const tone = toneStyles[need.tone];

  return (
    <Link
      href={need.href}
      className={cn(
        "group relative flex h-full min-h-[21rem] flex-col overflow-hidden rounded-card border border-white/60 p-7 shadow-card transition-[translate,box-shadow] duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-card-hover",
        tone.card,
      )}
    >
      <div aria-hidden className="sprinkle-pattern absolute inset-0 opacity-60" />
      <Icon
        aria-hidden
        strokeWidth={1.1}
        className={cn(
          "absolute -right-8 -bottom-8 size-44 opacity-[0.09] transition-transform duration-700 ease-premium group-hover:scale-110 group-hover:-rotate-6",
          tone.badge,
        )}
      />
      <span className={cn("relative grid size-14 place-items-center rounded-2xl bg-white shadow-card", tone.badge)}>
        <Icon aria-hidden className="size-6" strokeWidth={1.6} />
      </span>
      <h3 className={cn("relative mt-auto pt-10 font-script text-[2.75rem] leading-none font-bold", tone.title)}>
        {need.title}
      </h3>
      <p className="relative mt-3 text-[0.9375rem] leading-relaxed text-foreground/75">{need.description}</p>
      <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-strong">
        {need.cta}
        <ArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-premium group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export function ShopByNeed() {
  return (
    <Section aria-labelledby="needs-title">
      <FadeUp>
        <SectionHeading
          id="needs-title"
          title="Find What You Need, Your Way"
          description="Whether you're decorating a cake, preparing packaging or creating a thoughtful gift, start with what you're looking for."
        />
      </FadeUp>
      <StaggerContainer className="mt-10 lg:mt-12">
        <ScrollRow className="md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4 lg:gap-6">
          {shoppingNeeds.map((need) => (
            <li key={need.title} className={cn(scrollItemClass, "md:w-auto")}>
              <StaggerItem className="h-full">
                <NeedCard need={need} />
              </StaggerItem>
            </li>
          ))}
        </ScrollRow>
      </StaggerContainer>
    </Section>
  );
}
