import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/animations/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { DecorLayer, type DecorItem } from "@/components/common/Decor";
import { ScrollRow, scrollItemClass } from "@/components/common/ScrollRow";
import { Highlight, SectionHeading } from "@/components/common/SectionHeading";
import { tones } from "@/components/common/tones";
import { Section } from "@/components/layout/Section";
import { shoppingNeeds } from "@/data/home";
import { cn } from "@/lib/utils/cn";
import type { ShoppingNeed } from "@/types/content";

const panelDecor: readonly DecorItem[] = [
  { shape: "sparkle", className: "top-5 left-6 size-5 text-white", float: true },
  { shape: "sprinkle", className: "right-7 bottom-6 h-2 w-6 -rotate-45 text-pink/70", float: true, delay: -3 },
  { shape: "sprinkle", className: "top-8 right-10 h-2 w-6 rotate-12 text-turquoise", float: true, delay: -1.5 },
  { shape: "dot", className: "bottom-8 left-10 size-2.5 text-sunny" },
  { shape: "heart", className: "top-[46%] left-[18%] size-4 -rotate-12 text-pink/50" },
];

/**
 * Card with an illustrated colour panel in place of a photo (no stock imagery
 * by policy — swap the panel for a real shop photo when the client supplies one).
 */
function NeedCard({ need }: { need: ShoppingNeed }) {
  const Icon = need.icon;
  const tone = tones[need.tone];

  return (
    <Link
      href={need.href}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-border bg-white shadow-card transition-[translate,box-shadow,border-color] duration-500 ease-premium hover:-translate-y-1.5 hover:border-transparent hover:shadow-card-hover"
    >
      <div aria-hidden className={cn("relative grid aspect-[16/10] place-items-center overflow-hidden bg-linear-to-br", tone.gradient)}>
        <div className="confetti-pattern absolute inset-0 opacity-60" />
        <DecorLayer items={panelDecor} />
        <Icon
          strokeWidth={1}
          className={cn(
            "absolute -right-6 -bottom-8 size-36 opacity-15 transition-transform duration-700 ease-premium group-hover:scale-110 group-hover:-rotate-6",
            tone.text,
          )}
        />
        <span
          className={cn(
            "relative grid size-20 place-items-center rounded-full bg-white shadow-card-hover ring-8 ring-white/50 transition-transform duration-500 ease-premium group-hover:scale-105 group-hover:-rotate-6",
            tone.text,
          )}
        >
          <Icon className="size-9" strokeWidth={1.5} />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold tracking-tight">{need.title}</h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{need.description}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary-strong">
          {need.cta}
          <ArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-premium group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function ShopByNeed() {
  return (
    <Section aria-labelledby="needs-title">
      <FadeUp>
        <SectionHeading
          id="needs-title"
          eyebrow="Start with what you need"
          title={
            <>
              Shop by Your <Highlight>Baking Journey</Highlight>
            </>
          }
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
