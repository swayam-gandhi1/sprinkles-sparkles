import { Sparkles } from "lucide-react";
import { FadeUp } from "@/components/animations/Reveal";
import { DecorLayer, type DecorItem } from "@/components/common/Decor";
import { Section } from "@/components/layout/Section";
import { ButtonArrow, ButtonLink } from "@/components/ui/Button";
import { routes } from "@/lib/config/routes";

const decor: readonly DecorItem[] = [
  { shape: "sparkle", className: "top-[14%] left-[8%] size-6 text-primary/70", float: true },
  { shape: "sparkle", className: "right-[10%] bottom-[18%] size-5 text-aqua", float: true, delay: -3 },
  { shape: "heart", className: "top-[20%] right-[14%] size-5 rotate-12 text-primary/50", float: true, delay: -1.5 },
  { shape: "sprinkle", className: "bottom-[22%] left-[12%] h-2 w-6 -rotate-45 text-aqua", float: true, delay: -4 },
  { shape: "sprinkle", className: "top-[36%] left-[4%] hidden h-2 w-6 rotate-12 text-primary/50 sm:block" },
  { shape: "dot", className: "top-[12%] right-[32%] size-2.5 text-aqua/70" },
];

export function FinalCTA() {
  return (
    <Section aria-labelledby="final-cta-title" spacing="sm" className="pt-0 sm:pt-0 lg:pt-0">
      <div className="relative overflow-hidden rounded-panel bg-linear-to-br from-blush via-white to-aqua-mist px-6 py-16 text-center sm:px-12 md:py-24">
        <div aria-hidden className="sprinkle-pattern absolute inset-0 opacity-50" />
        <DecorLayer items={decor} />
        <FadeUp className="relative mx-auto max-w-2xl">
          <Sparkles aria-hidden className="mx-auto size-7 text-primary" strokeWidth={1.5} />
          <h2 id="final-cta-title" className="mt-4 font-script text-[2.75rem] leading-[1.08] font-bold sm:text-[3.75rem]">
            <span className="block text-accent">Your Ideas Deserve</span>
            <span className="block text-primary">a Little Sprinkle &amp; Sparkle</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-base leading-relaxed text-foreground/75 sm:text-lg">
            Whether you&apos;re decorating, packaging, gifting or simply creating something special, we&apos;re here to
            help you find the details that bring your ideas to life.
          </p>
          <ButtonLink href={routes.shop} size="lg" className="mt-9">
            Start Exploring
            <ButtonArrow />
          </ButtonLink>
        </FadeUp>
      </div>
    </Section>
  );
}
