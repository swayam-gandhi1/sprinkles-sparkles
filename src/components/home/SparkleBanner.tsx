import { Sparkles } from "lucide-react";
import { FadeUp } from "@/components/animations/Reveal";
import { DecorLayer, type DecorItem } from "@/components/common/Decor";
import { Section } from "@/components/layout/Section";
import { ButtonArrow, ButtonLink } from "@/components/ui/Button";
import { sparkleBanner } from "@/data/home";
import { routes } from "@/lib/config/routes";

const decor: readonly DecorItem[] = [
  { shape: "sparkle", className: "top-[8%] left-[3%] size-6 text-sunny", float: true },
  { shape: "sparkle", className: "right-[6%] bottom-[16%] size-5 text-white/80", float: true, delay: -3 },
  { shape: "sprinkle", className: "top-[20%] right-[30%] h-2.5 w-7 rotate-45 text-turquoise", float: true, delay: -2 },
  { shape: "sprinkle", className: "right-[24%] bottom-[12%] hidden h-2.5 w-7 -rotate-12 text-sunny lg:block", float: true, delay: -4 },
  { shape: "heart", className: "top-[10%] right-[18%] hidden size-5 -rotate-12 text-white/60 sm:block", float: true, delay: -1 },
  { shape: "dot", className: "top-[12%] right-[12%] size-3 text-turquoise" },
];

/**
 * Vivid brand banner — pink to violet so white text stays ≥ 4.7:1 across the
 * whole gradient; the yellow "Sparkle!" is large display type (≥ 3:1).
 */
export function SparkleBanner() {
  return (
    <Section aria-labelledby="sparkle-title" spacing="sm">
      <FadeUp>
        <div className="relative overflow-hidden rounded-panel bg-linear-to-r from-primary-hover via-primary to-lavender-strong px-7 py-12 text-white shadow-card-hover sm:px-12 sm:py-14 lg:px-16">
          <div aria-hidden className="confetti-pattern absolute inset-0 opacity-30 mix-blend-screen" />
          <div aria-hidden className="absolute -top-20 -right-16 size-72 rounded-full bg-turquoise/25 blur-3xl" />
          <DecorLayer items={decor} />
          <Sparkles
            aria-hidden
            strokeWidth={0.8}
            className="absolute -bottom-10 -left-10 size-56 text-white/10"
          />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <h2 id="sparkle-title" className="text-[1.875rem] leading-tight font-bold tracking-tight sm:text-[2.5rem]">
                Bakers, Don&apos;t Just Bake…{" "}
                <span className="inline-block -rotate-3 font-script text-[1.55em] leading-none text-sunny">
                  Sparkle!
                </span>
              </h2>
              <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-white/95 sm:text-lg">{sparkleBanner}</p>
            </div>
            <ButtonLink href={routes.shop} variant="outline" size="lg" className="self-start border-white lg:self-auto">
              Explore Our Collection
              <ButtonArrow />
            </ButtonLink>
          </div>
        </div>
      </FadeUp>
    </Section>
  );
}
