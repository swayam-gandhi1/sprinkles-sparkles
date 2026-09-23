import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/animations/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { ArrowLink } from "@/components/common/ArrowLink";
import { Highlight, SectionHeading } from "@/components/common/SectionHeading";
import { tones } from "@/components/common/tones";
import { Section } from "@/components/layout/Section";
import { bakingEssentials, essentialsIntro } from "@/data/home";
import { routes } from "@/lib/config/routes";
import { cn } from "@/lib/utils/cn";
import type { ProductGroup } from "@/types/content";

/** Colourful product-group tile: tinted panel, icon badge, name and a hover arrow. */
function EssentialCard({ group }: { group: ProductGroup }) {
  const Icon = group.icon;
  const tone = tones[group.tone];

  return (
    <Link
      href={group.href}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-card border border-white bg-linear-to-br p-4 shadow-card transition-[translate,box-shadow] duration-300 ease-premium hover:-translate-y-1 hover:shadow-card-hover sm:p-5",
        tone.gradient,
      )}
    >
      <span aria-hidden className="sprinkle-pattern absolute inset-0 opacity-50" />
      <Icon
        aria-hidden
        strokeWidth={1}
        className={cn(
          "absolute -right-5 -bottom-5 size-24 opacity-15 transition-transform duration-700 ease-premium group-hover:scale-110 group-hover:-rotate-6 sm:size-28",
          tone.text,
        )}
      />
      <span
        className={cn(
          "relative grid size-12 place-items-center rounded-2xl bg-white shadow-card transition-transform duration-300 ease-premium group-hover:-rotate-6 sm:size-14",
          tone.text,
        )}
      >
        <Icon aria-hidden className="size-6 sm:size-7" strokeWidth={1.6} />
      </span>
      <span className="relative mt-auto flex items-end justify-between gap-2 pt-8 sm:pt-10">
        <span className="text-[0.9375rem] leading-snug font-semibold sm:text-base">{group.name}</span>
        <span
          aria-hidden
          className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-primary-strong shadow-card transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
        >
          <ArrowRight className="size-4" />
        </span>
      </span>
    </Link>
  );
}

/** Primary product discovery grid — the hero's "Explore Products" target. */
export function BakingEssentials() {
  return (
    <Section id="products" aria-labelledby="products-title" className="scroll-mt-20 lg:scroll-mt-32">
      <FadeUp>
        <SectionHeading
          id="products-title"
          eyebrow="Everything bakers need"
          title={
            <>
              Everything You Need to <Highlight>Bake, Decorate &amp; Create</Highlight>
            </>
          }
          description={essentialsIntro}
          action={
            <ArrowLink href={routes.categories} className="hidden md:inline-flex">
              View All Categories
            </ArrowLink>
          }
        />
      </FadeUp>

      <StaggerContainer className="mt-10 lg:mt-12" stagger={0.05}>
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {bakingEssentials.map((group) => (
            <li key={group.name}>
              <StaggerItem className="h-full">
                <EssentialCard group={group} />
              </StaggerItem>
            </li>
          ))}
        </ul>
      </StaggerContainer>
    </Section>
  );
}
