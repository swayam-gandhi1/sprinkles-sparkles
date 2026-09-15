import { GraduationCap } from "lucide-react";
import { FadeUp } from "@/components/animations/Reveal";
import { CurveDivider } from "@/components/common/CurveDivider";
import { DecorLayer, type DecorItem } from "@/components/common/Decor";
import { Eyebrow } from "@/components/common/Eyebrow";
import { Container } from "@/components/layout/Container";
import { ButtonArrow, ButtonLink } from "@/components/ui/Button";
import { routes } from "@/lib/config/routes";

const decor: readonly DecorItem[] = [
  { shape: "sparkle", className: "top-[16%] left-[10%] size-6 text-aqua", float: true },
  { shape: "sparkle", className: "right-[12%] bottom-[20%] size-5 text-primary/60", float: true, delay: -3 },
  { shape: "sprinkle", className: "top-[24%] right-[16%] h-2 w-7 rotate-45 text-primary/50", float: true, delay: -2 },
  { shape: "sprinkle", className: "bottom-[24%] left-[14%] h-2 w-7 -rotate-12 text-aqua", float: true, delay: -4 },
  { shape: "heart", className: "top-[58%] left-[6%] hidden size-5 -rotate-12 text-primary/40 md:block", float: true, delay: -1 },
  { shape: "dot", className: "top-[12%] right-[34%] size-2.5 text-aqua/70" },
];

/** Aqua, full-bleed band — typographic and deliberately distinct from the shopping sections. */
export function WorkshopSection() {
  return (
    <section aria-labelledby="workshops-title" className="relative bg-aqua-mist py-section-lg">
      <CurveDivider className="absolute inset-x-0 top-0 -translate-y-[calc(100%-1px)] text-aqua-mist" />
      <div aria-hidden className="sprinkle-pattern absolute inset-0 opacity-60" />
      <DecorLayer items={decor} />

      <Container size="narrow" className="relative text-center">
        <FadeUp>
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-white text-accent shadow-card">
            <GraduationCap aria-hidden className="size-7" strokeWidth={1.6} />
          </span>
          <Eyebrow className="mt-6 text-accent-hover">Workshops</Eyebrow>
          <h2
            id="workshops-title"
            className="mt-3 font-script text-[3rem] leading-[1.05] font-bold text-accent sm:text-[4.25rem] xl:text-[5rem]"
          >
            Learn. Create. Celebrate.
          </h2>
          <p className="mx-auto mt-6 max-w-[52ch] text-base leading-relaxed text-foreground/85 sm:text-lg">
            Discover new techniques, explore creative ideas and learn how to make the most of your cake decorating
            journey.
          </p>
          <p className="mx-auto mt-4 max-w-[52ch] text-base leading-relaxed text-foreground/75">
            Our workshops are designed for curious creators, home bakers and anyone who wants to learn something new in
            a fun and creative environment.
          </p>
          <ButtonLink href={routes.category("workshops")} variant="accent" size="lg" className="mt-9">
            Explore Workshops
            <ButtonArrow />
          </ButtonLink>
        </FadeUp>
      </Container>

      <CurveDivider flip className="absolute inset-x-0 bottom-0 translate-y-[calc(100%-1px)] text-aqua-mist" />
    </section>
  );
}
