import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { FadeUp } from "@/components/animations/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { ArrowLink } from "@/components/common/ArrowLink";
import { DecorLayer, type DecorItem } from "@/components/common/Decor";
import { ScrollRow } from "@/components/common/ScrollRow";
import { Highlight, SectionHeading } from "@/components/common/SectionHeading";
import { tones } from "@/components/common/tones";
import { Section } from "@/components/layout/Section";
import { ButtonArrow, ButtonLink } from "@/components/ui/Button";
import { categories } from "@/data/categories";
import { routes } from "@/lib/config/routes";
import { cn } from "@/lib/utils/cn";
import type { Category } from "@/types/content";

const festiveDecor: readonly DecorItem[] = [
  { shape: "sparkle", className: "top-6 right-[8%] size-7 text-sunny", float: true },
  { shape: "sparkle", className: "top-[55%] right-[32%] size-4 text-sunny/70", float: true, delay: -3 },
  { shape: "sparkle", className: "bottom-6 left-[48%] hidden size-5 text-pink sm:block", float: true, delay: -1 },
  { shape: "dot", className: "top-10 right-[40%] size-2 text-turquoise" },
  { shape: "sprinkle", className: "top-[30%] right-[16%] h-2 w-6 rotate-45 text-coral", float: true, delay: -2 },
  { shape: "sprinkle", className: "bottom-8 right-[10%] h-2 w-6 -rotate-12 text-turquoise", float: true, delay: -4 },
];

/**
 * Round category tile — a colourful illustrated disc until category
 * photography exists (then `category.image.src` can be rendered in the disc).
 */
function CategoryTile({ category }: { category: Category }) {
  const Icon = category.icon;
  const tone = tones[category.tone];

  return (
    <Link href={routes.category(category.slug)} className="group flex flex-col items-center gap-3 text-center">
      <span
        className={cn(
          "relative grid aspect-square w-full max-w-28 place-items-center overflow-hidden rounded-full bg-linear-to-br shadow-card ring-4 ring-white transition-[translate,box-shadow] duration-300 ease-premium group-hover:-translate-y-1 group-hover:shadow-card-hover group-hover:ring-blush-strong",
          tone.gradient,
        )}
      >
        <span aria-hidden className="sprinkle-pattern absolute inset-0 opacity-70" />
        <Icon
          aria-hidden
          className={cn("relative size-9 transition-transform duration-500 ease-premium group-hover:scale-110", tone.text)}
          strokeWidth={1.5}
        />
      </span>
      <span className="text-[0.8125rem] leading-snug font-semibold transition-colors group-hover:text-primary-strong sm:text-sm">
        {category.name}
      </span>
    </Link>
  );
}

/** Illustrated festive banner (no photography needed): navy-to-violet with gold accents. */
function FestiveFeature({ className }: { className?: string }) {
  return (
    <Link
      href={routes.category("diwali-collection")}
      className={cn(
        "group relative flex flex-col gap-6 overflow-hidden rounded-panel bg-linear-to-r from-navy to-lavender-strong p-7 text-white shadow-card-hover sm:flex-row sm:items-center sm:justify-between sm:p-10",
        className,
      )}
    >
      <div aria-hidden className="confetti-pattern absolute inset-0 opacity-35" />
      <DecorLayer items={festiveDecor} />
      <Flame
        aria-hidden
        strokeWidth={1}
        className="absolute -right-8 -bottom-10 size-56 text-sunny/15 transition-transform duration-700 ease-premium group-hover:scale-110 group-hover:-rotate-6"
      />
      <div className="relative">
        <p className="text-[0.8125rem] font-semibold tracking-[0.16em] text-sunny uppercase">Festive favourites</p>
        <h3 className="mt-2 font-script text-[2.75rem] leading-none font-bold text-sunny sm:text-[3.25rem]">
          Diwali Collection
        </h3>
        <p className="mt-3 max-w-[40ch] text-[0.9375rem] leading-relaxed text-white/90">
          Festive essentials and gifting for the season of lights.
        </p>
      </div>
      <span className="relative inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-button bg-sunny px-6 text-sm font-semibold text-navy shadow-card transition-transform duration-300 ease-premium group-hover:-translate-y-0.5 sm:self-auto">
        Explore the collection
        <ArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-premium group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export function CategoryShowcase() {
  return (
    <Section id="collections" aria-labelledby="collections-title" className="scroll-mt-20 bg-cream lg:scroll-mt-32">
      <FadeUp>
        <SectionHeading
          id="collections-title"
          title={
            <>
              Explore Our <Highlight>Collections</Highlight>
            </>
          }
          description="Browse every range in our store — from baking tins and knife cutters to festive and birthday collections."
          action={
            <ArrowLink href={routes.categories} className="hidden md:inline-flex">
              View All Categories
            </ArrowLink>
          }
        />
      </FadeUp>

      <StaggerContainer className="mt-10 lg:mt-12" stagger={0.04}>
        {/* Swipeable on phones; centred rows of six from tablet up (so an uneven last row stays balanced) */}
        <ScrollRow className="gap-5 pt-1 md:mx-0 md:flex-wrap md:justify-center md:gap-x-5 md:gap-y-8 md:overflow-visible md:px-0 md:pb-0">
          {categories.map((category) => (
            <li key={category.slug} className="w-24 shrink-0 snap-start sm:w-28 md:w-[calc((100%-6.25rem)/6)]">
              <StaggerItem className="h-full">
                <CategoryTile category={category} />
              </StaggerItem>
            </li>
          ))}
        </ScrollRow>
      </StaggerContainer>

      <ButtonLink href={routes.categories} variant="outline" className="mt-8 w-full sm:w-auto md:hidden">
        View All Categories
        <ButtonArrow />
      </ButtonLink>

      <FadeUp className="mt-12 lg:mt-14">
        <FestiveFeature />
      </FadeUp>
    </Section>
  );
}
