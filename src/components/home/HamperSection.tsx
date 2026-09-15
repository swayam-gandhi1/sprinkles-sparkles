import { Gift, Heart } from "lucide-react";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { FadeIn, FadeUp } from "@/components/animations/Reveal";
import { Eyebrow } from "@/components/common/Eyebrow";
import { ImageSlot } from "@/components/common/ImageSlot";
import { ScriptNote } from "@/components/common/ScriptNote";
import { Section } from "@/components/layout/Section";
import { ButtonArrow, ButtonLink } from "@/components/ui/Button";
import { hamperOccasions } from "@/data/home";
import { siteImages } from "@/data/images";
import { routes } from "@/lib/config/routes";

/** Wide hamper photograph with an overlapping copy card. */
export function HamperSection() {
  return (
    <Section aria-labelledby="hamper-title">
      <div className="relative">
        <ImageReveal className="aspect-[4/3] rounded-panel shadow-card sm:aspect-[16/9] lg:aspect-[2/1]">
          <ImageSlot
            image={siteImages.hamper}
            sizes="(min-width: 1280px) 76rem, 100vw"
            tone="cream"
            icon={Gift}
            label="Customized hamper photography"
            className="size-full"
          />
        </ImageReveal>

        <FadeIn delay={0.4} className="absolute top-6 right-6 hidden lg:block">
          <div className="rotate-3 rounded-2xl bg-white/95 px-5 py-3 shadow-card-hover">
            <ScriptNote className="text-2xl">
              Thoughtful gifts
              <br />
              for special people
            </ScriptNote>
          </div>
        </FadeIn>

        <FadeUp className="relative mx-3 -mt-20 rounded-panel bg-white p-7 shadow-card-hover sm:mx-8 sm:-mt-28 sm:p-10 lg:absolute lg:bottom-10 lg:left-10 lg:m-0 lg:max-w-[34rem] lg:p-12">
          <Eyebrow>Customized hampers</Eyebrow>
          <h2
            id="hamper-title"
            className="mt-3 text-[1.875rem] leading-tight font-semibold tracking-tight sm:text-[2.25rem] lg:text-[2.5rem]"
          >
            Thoughtful Gifts, Made Your Way
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Create beautiful hampers for birthdays, festivals, corporate gifting and special occasions. Choose the
            products, packaging and finishing touches that make your gift feel personal and memorable.
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-foreground/85">
            {hamperOccasions.map((occasion) => (
              <li key={occasion} className="flex items-center gap-1.5">
                <Heart aria-hidden className="size-3 fill-primary text-primary" />
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
