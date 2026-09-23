import { Lightbulb } from "lucide-react";
import { FadeUp } from "@/components/animations/Reveal";
import { DecorLayer, type DecorItem } from "@/components/common/Decor";
import { Section } from "@/components/layout/Section";
import { ButtonArrow, ButtonLink } from "@/components/ui/Button";
import { routes } from "@/lib/config/routes";

const decor: readonly DecorItem[] = [
  { shape: "sparkle", className: "top-6 right-[38%] size-5 text-sunny", float: true },
  { shape: "sprinkle", className: "bottom-8 left-[46%] h-2 w-6 -rotate-45 text-turquoise", float: true, delay: -3 },
  { shape: "heart", className: "top-8 right-[8%] hidden size-5 rotate-12 text-pink/60 md:block", float: true, delay: -1 },
  { shape: "dot", className: "top-10 left-[30%] size-2 text-pink" },
];

/** Compact banner leading to the future inspiration/blog page. */
export function GetInspired() {
  return (
    <Section aria-labelledby="inspiration-title" spacing="lg" className="pb-0 sm:pb-0 lg:pb-0">
      <FadeUp>
        <div className="relative overflow-hidden rounded-panel bg-linear-to-r from-lavender via-lavender-mist to-blush px-7 py-10 sm:px-12 sm:py-12">
          <div aria-hidden className="confetti-pattern absolute inset-0 opacity-50" />
          <DecorLayer items={decor} />
          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <span className="grid size-16 shrink-0 -rotate-6 place-items-center rounded-2xl bg-sunny text-navy shadow-card">
                <Lightbulb aria-hidden className="size-7" strokeWidth={1.6} />
              </span>
              <div>
                <h2 id="inspiration-title" className="font-script text-[2.75rem] leading-none font-bold text-lavender-strong sm:text-[3.25rem]">
                  Get Inspired
                </h2>
                <p className="mt-3 max-w-[48ch] text-base leading-relaxed text-foreground/85">
                  Explore creative ideas, new arrivals, decorating inspiration and beautiful ways to present your
                  creations.
                </p>
              </div>
            </div>
            <ButtonLink href={routes.inspiration} size="lg" className="self-start md:self-auto">
              Explore Inspiration
              <ButtonArrow />
            </ButtonLink>
          </div>
        </div>
      </FadeUp>
    </Section>
  );
}
