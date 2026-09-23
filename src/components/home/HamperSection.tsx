import { Gift } from "lucide-react";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { FadeIn, FadeUp } from "@/components/animations/Reveal";
import { DecorLayer, type DecorItem } from "@/components/common/Decor";
import { Eyebrow } from "@/components/common/Eyebrow";
import { ImageSlot } from "@/components/common/ImageSlot";
import { ScriptNote } from "@/components/common/ScriptNote";
import { Highlight } from "@/components/common/SectionHeading";
import { toneAt, tones } from "@/components/common/tones";
import { Section } from "@/components/layout/Section";
import { ButtonArrow, ButtonLink } from "@/components/ui/Button";
import { hamperOccasions } from "@/data/home";
import { siteImages } from "@/data/images";
import { routes } from "@/lib/config/routes";
import { cn } from "@/lib/utils/cn";

const decor: readonly DecorItem[] = [
  { shape: "sparkle", className: "-top-4 left-[30%] size-7 text-sunny", float: true },
  { shape: "heart", className: "-top-3 left-[44%] hidden size-5 rotate-12 text-pink sm:block", float: true, delay: -2 },
  { shape: "sprinkle", className: "top-[30%] -right-3 h-2.5 w-7 rotate-45 text-turquoise", float: true, delay: -4 },
];

/** Wide hamper photograph with an overlapping copy card. */
export function HamperSection() {
  return (
    <Section aria-labelledby="hamper-title">
      <div className="relative">
        <div className="relative">
          <div
            aria-hidden
            className="absolute inset-0 -translate-x-2 translate-y-3 rotate-1 rounded-panel bg-linear-to-r from-pink/30 via-lavender to-turquoise/40 sm:-translate-x-4 sm:translate-y-5"
          />
          <ImageReveal className="relative aspect-[4/3] rounded-panel shadow-card sm:aspect-[16/9] lg:aspect-[2/1]">
            <ImageSlot
              image={siteImages.hamper}
              sizes="(min-width: 1280px) 76rem, 100vw"
              tone="cream"
              icon={Gift}
              label="Customized hamper photography"
              className="size-full"
            />
          </ImageReveal>
          <DecorLayer items={decor} />
        </div>

        <FadeIn delay={0.4} className="absolute top-6 right-6 hidden lg:block">
          <div className="rotate-3 rounded-2xl bg-white px-5 py-3 shadow-card-hover ring-4 ring-blush">
            <ScriptNote className="text-2xl">
              Thoughtful gifts
              <br />
              for special people
            </ScriptNote>
          </div>
        </FadeIn>

        <FadeUp className="relative mx-3 -mt-20 overflow-hidden rounded-panel bg-white p-7 shadow-card-hover sm:mx-8 sm:-mt-28 sm:p-10 lg:absolute lg:bottom-10 lg:left-10 lg:m-0 lg:max-w-[34rem] lg:p-12">
          <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-pink via-sunny to-turquoise" />
          <Eyebrow>Customized hampers</Eyebrow>
          <h2
            id="hamper-title"
            className="mt-3 text-[1.875rem] leading-tight font-bold tracking-tight sm:text-[2.25rem] lg:text-[2.5rem]"
          >
            Thoughtful Gifts, <Highlight>Made Your Way</Highlight>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Create beautiful hampers for birthdays, festivals, corporate gifting and special occasions. Choose the
            products, packaging and finishing touches that make your gift feel personal and memorable.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2 text-[0.8125rem] font-semibold">
            {hamperOccasions.map((occasion, index) => (
              <li key={occasion} className={cn("rounded-full px-3 py-1.5", tones[toneAt(index)].icon)}>
                {occasion}
              </li>
            ))}
          </ul>
          <ButtonLink href={routes.collection("gifting")} size="lg" className="mt-8">
            Explore Gifting
            <ButtonArrow />
          </ButtonLink>
        </FadeUp>
      </div>
    </Section>
  );
}
