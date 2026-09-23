import { Sparkles } from "lucide-react";
import { FadeUp } from "@/components/animations/Reveal";
import { DecorLayer, type DecorItem } from "@/components/common/Decor";
import { Section } from "@/components/layout/Section";
import { ButtonArrow, ButtonLink } from "@/components/ui/Button";
import { routes } from "@/lib/config/routes";

const decor: readonly DecorItem[] = [
  { shape: "sparkle", className: "top-[14%] left-[8%] size-7 text-sunny", float: true },
  { shape: "sparkle", className: "right-[10%] bottom-[18%] size-6 text-turquoise", float: true, delay: -3 },
  { shape: "heart", className: "top-[20%] right-[14%] size-6 rotate-12 text-pink/70", float: true, delay: -1.5 },
  { shape: "sprinkle", className: "bottom-[22%] left-[12%] h-2.5 w-7 -rotate-45 text-turquoise", float: true, delay: -4 },
  { shape: "sprinkle", className: "top-[36%] left-[4%] hidden h-2.5 w-7 rotate-12 text-coral sm:block" },
  { shape: "sprinkle", className: "top-[60%] right-[5%] hidden h-2.5 w-7 -rotate-12 text-sunny sm:block", float: true, delay: -2 },
  { shape: "dot", className: "top-[12%] right-[32%] size-3 text-lavender-strong/40" },
];

export function FinalCTA() {
  return (
    <Section aria-labelledby="final-cta-title" spacing="sm" className="pt-0 sm:pt-0 lg:pt-0">
      <div className="relative overflow-hidden rounded-panel bg-linear-to-br from-blush via-white to-aqua-mist px-6 py-16 text-center shadow-card sm:px-12 md:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-20 size-72 rounded-full bg-pink/15 blur-3xl" />
          <div className="absolute -right-16 -bottom-24 size-80 rounded-full bg-turquoise/20 blur-3xl" />
          <div className="absolute top-1/3 left-1/2 size-56 -translate-x-1/2 rounded-full bg-sunny/20 blur-3xl" />
        </div>
        <div aria-hidden className="confetti-pattern absolute inset-0 opacity-60" />
        <DecorLayer items={decor} />
        <FadeUp className="relative mx-auto max-w-2xl">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-white text-pink shadow-card">
            <Sparkles aria-hidden className="size-7" strokeWidth={1.5} />
          </span>
          <h2 id="final-cta-title" className="mt-5 font-script text-[2.75rem] leading-[1.08] font-bold sm:text-[3.75rem]">
            <span className="block text-accent">Your Ideas Deserve</span>{" "}
            <span className="block text-gradient-brand">a Little Sprinkle &amp; Sparkle</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-base leading-relaxed text-foreground/80 sm:text-lg">
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
