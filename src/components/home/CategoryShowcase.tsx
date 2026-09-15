import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { FadeUp } from "@/components/animations/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { DecorLayer, type DecorItem } from "@/components/common/Decor";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Section } from "@/components/layout/Section";
import { ButtonArrow, ButtonLink } from "@/components/ui/Button";
import { categories } from "@/data/categories";
import { routes } from "@/lib/config/routes";
import { cn } from "@/lib/utils/cn";
import type { Category, Tone } from "@/types/content";

const toneClasses: Record<Tone, string> = {
  blush: "bg-blush text-primary-strong",
  aqua: "bg-aqua-mist text-accent",
  cream: "bg-cream text-primary-strong",
};

const festiveDecor: readonly DecorItem[] = [
  { shape: "sparkle", className: "top-8 right-10 size-6 text-white/80", float: true },
  { shape: "sparkle", className: "top-[42%] right-[30%] size-3.5 text-cream/70", float: true, delay: -3 },
  { shape: "dot", className: "top-16 right-[44%] size-2 text-white/60" },
  { shape: "sprinkle", className: "top-[30%] right-12 h-2 w-6 rotate-45 text-cream/70", float: true, delay: -2 },
];

/** Compact directory tile — scannable, and honest until category photography exists. */
function CategoryTile({ category }: { category: Category }) {
  const Icon = category.icon;
  return (
    <Link
      href={routes.category(category.slug)}
      className="group flex h-full items-center gap-3 rounded-2xl border border-border bg-white p-3 transition-[border-color,box-shadow,translate] duration-300 ease-premium hover:-translate-y-0.5 hover:border-blush-strong hover:shadow-card sm:gap-4 sm:p-4"
    >
      <span className={cn("grid size-11 shrink-0 place-items-center rounded-xl sm:size-12", toneClasses[category.tone])}>
        <Icon aria-hidden className="size-5" strokeWidth={1.6} />
      </span>
      <span className="min-w-0 flex-1 text-sm leading-snug font-semibold transition-colors group-hover:text-primary-strong">
        {category.name}
      </span>
      <ArrowRight
        aria-hidden
        className="hidden size-4 shrink-0 -translate-x-1 text-primary-strong opacity-0 transition duration-300 ease-premium group-hover:translate-x-0 group-hover:opacity-100 sm:block"
      />
    </Link>
  );
}

/** Illustrated feature panel for the festive range (no photography needed). */
function FestiveFeature({ className }: { className?: string }) {
  return (
    <Link
      href={routes.category("diwali-collection")}
      className={cn(
        "group relative flex min-h-[18rem] flex-col justify-end overflow-hidden rounded-panel bg-linear-to-br from-primary-strong via-primary to-primary-hover p-7 text-white shadow-card sm:p-9",
        className,
      )}
    >
      <div aria-hidden className="sprinkle-pattern absolute inset-0 opacity-30 mix-blend-screen" />
      <DecorLayer items={festiveDecor} />
      <Flame
        aria-hidden
        strokeWidth={1}
        className="absolute -top-6 -right-6 size-52 text-white/10 transition-transform duration-700 ease-premium group-hover:scale-110 group-hover:-rotate-6"
      />
      <div className="relative">
        <p className="text-[0.8125rem] font-semibold tracking-[0.16em] text-white/85 uppercase">Festive favourites</p>
        <h3 className="mt-2 font-script text-[2.75rem] leading-none font-bold">Diwali Collection</h3>
        <p className="mt-3 max-w-[32ch] text-[0.9375rem] leading-relaxed text-white/90">
          Festive essentials and gifting for the season of lights.
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
          Explore the collection
          <ArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-premium group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function CategoryShowcase() {
  return (
    <Section id="collections" aria-labelledby="collections-title" className="scroll-mt-20 bg-cream lg:scroll-mt-32">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col lg:col-span-5">
          <FadeUp>
            <SectionHeading
              id="collections-title"
              title="Explore Our Collections"
              description="Discover carefully selected products for baking, decorating, packaging and gifting."
            />
            <ButtonLink href={routes.categories} variant="outline" className="mt-7 hidden lg:inline-flex">
              View All Categories
              <ButtonArrow />
            </ButtonLink>
          </FadeUp>
          <FadeUp delay={0.1} className="mt-8 flex lg:mt-10 lg:flex-1">
            <FestiveFeature className="w-full" />
          </FadeUp>
        </div>

        <div className="lg:col-span-7 lg:self-end">
          <StaggerContainer stagger={0.04}>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {categories.map((category) => (
                <li key={category.slug}>
                  <StaggerItem className="h-full">
                    <CategoryTile category={category} />
                  </StaggerItem>
                </li>
              ))}
            </ul>
          </StaggerContainer>
          <ButtonLink href={routes.categories} variant="outline" className="mt-8 w-full sm:w-auto lg:hidden">
            View All Categories
            <ButtonArrow />
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
