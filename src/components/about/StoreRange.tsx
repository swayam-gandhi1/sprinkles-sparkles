import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/animations/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { Highlight, SectionHeading } from "@/components/common/SectionHeading";
import { tones } from "@/components/common/tones";
import { Section } from "@/components/layout/Section";
import { shopCategories } from "@/data/shop";
import { shopHref } from "@/lib/products/query";
import { cn } from "@/lib/utils/cn";

/** Every shop category as a colourful link tile — "what we stock", straight into the filtered shop. */
export function StoreRange() {
  return (
    <Section aria-labelledby="range-title" className="bg-cream">
      <FadeUp>
        <SectionHeading
          id="range-title"
          eyebrow="What we stock"
          align="center"
          title={
            <>
              Everything <Highlight>Under One Roof</Highlight>
            </>
          }
          description="From the first sprinkle to the final ribbon — explore the ranges you'll find at Sprinkle & Sparkle."
        />
      </FadeUp>
      <StaggerContainer className="mt-10" stagger={0.04}>
        <ul className="flex flex-wrap justify-center gap-3">
          {shopCategories.map((category) => {
            const tone = tones[category.tone];
            return (
              <li key={category.slug}>
                <StaggerItem>
                  <Link
                    href={shopHref({ categories: [category.slug] })}
                    className="group inline-flex min-h-14 items-center gap-3 rounded-full border border-white bg-white py-2 pr-4 pl-2 shadow-card transition-[translate,box-shadow] duration-300 ease-premium hover:-translate-y-0.5 hover:shadow-card-hover"
                  >
                    <span className={cn("grid size-10 place-items-center rounded-full", tone.icon)}>
                      <category.icon aria-hidden className="size-5" strokeWidth={1.7} />
                    </span>
                    <span className="text-sm font-semibold transition-colors group-hover:text-primary-strong">
                      {category.name}
                    </span>
                    <ArrowRight
                      aria-hidden
                      className="size-4 text-primary-strong transition-transform duration-300 ease-premium group-hover:translate-x-0.5"
                    />
                  </Link>
                </StaggerItem>
              </li>
            );
          })}
        </ul>
      </StaggerContainer>
    </Section>
  );
}
