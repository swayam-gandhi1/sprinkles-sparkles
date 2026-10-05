import { FadeIn, FadeUp } from "@/components/animations/Reveal";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { DecorLayer, type DecorItem } from "@/components/common/Decor";
import { Eyebrow } from "@/components/common/Eyebrow";
import { ImageSlot } from "@/components/common/ImageSlot";
import { Section } from "@/components/layout/Section";
import { ButtonArrow, ButtonLink } from "@/components/ui/Button";
import { diwaliFeature } from "@/data/home";
import { diwaliFeatureImages as photos } from "@/data/images";
import { routes } from "@/lib/config/routes";

const decor: readonly DecorItem[] = [
  { shape: "sparkle", className: "top-[5%] right-[6%] size-6 text-sunny-strong", float: true },
  { shape: "sparkle", className: "right-[5%] bottom-[8%] hidden size-5 text-pink sm:block", float: true, delay: -3 },
  { shape: "sprinkle", className: "top-[12%] right-[40%] hidden h-2.5 w-7 rotate-45 text-turquoise lg:block", float: true, delay: -2 },
  { shape: "dot", className: "bottom-[14%] left-[42%] hidden size-3 text-coral lg:block" },
];

/** Hover zoom for collage photos (pointer devices; the frame clips it). */
const zoom = "transition-transform duration-700 ease-premium hover:scale-[1.05]";

/** Seasonal promo: Diwali copy beside a small collage of the client's Diwali product photos. */
export function DiwaliFeature() {
  return (
    <Section aria-labelledby="diwali-title" spacing="sm">
      <div className="relative overflow-hidden rounded-panel bg-linear-to-br from-sunny-mist via-cream to-blush px-5 py-10 shadow-card sm:px-10 sm:py-12 lg:px-14 lg:py-14">
        <div aria-hidden className="confetti-pattern absolute inset-0 opacity-25" />
        <div aria-hidden className="absolute -top-24 -left-20 size-72 rounded-full bg-sunny/30 blur-3xl" />
        <div aria-hidden className="absolute -right-16 -bottom-24 size-72 rounded-full bg-pink/20 blur-3xl" />
        <DecorLayer items={decor} />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          <FadeUp>
            <Eyebrow>
              <span aria-hidden>✨</span> Diwali Collection
            </Eyebrow>
            <h2
              id="diwali-title"
              className="mt-3 text-[1.875rem] leading-tight font-bold tracking-tight sm:text-[2.25rem] lg:text-[2.5rem]"
            >
              Make This Diwali{" "}
              <span className="inline-block -rotate-3 font-script text-[1.4em] leading-none text-primary-strong">
                Sparkle
              </span>{" "}
              <span aria-hidden>✨</span>
            </h2>
            <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
              {diwaliFeature}
            </p>
            <ButtonLink href={routes.category("diwali-collection")} size="lg" className="mt-8">
              Explore Diwali Collection
              <ButtonArrow />
            </ButtonLink>
          </FadeUp>

          <div className="relative">
            <div className="grid aspect-[4/3] grid-cols-3 grid-rows-2 gap-3 sm:gap-4">
              <ImageReveal className="col-span-2 row-span-2 rounded-panel shadow-card-hover ring-4 ring-white">
                <ImageSlot
                  image={photos.featured}
                  sizes="(min-width: 1280px) 26rem, (min-width: 1024px) 34vw, 62vw"
                  className="size-full"
                  imageClassName={zoom}
                />
              </ImageReveal>
              <ImageReveal delay={0.15} className="rounded-card shadow-card ring-4 ring-white">
                <ImageSlot
                  image={photos.roses}
                  sizes="(min-width: 1024px) 13rem, 30vw"
                  className="size-full"
                  imageClassName={zoom}
                />
              </ImageReveal>
              <ImageReveal delay={0.3} className="rounded-card shadow-card ring-4 ring-white">
                <ImageSlot
                  image={photos.treats}
                  sizes="(min-width: 1024px) 13rem, 30vw"
                  className="size-full"
                  imageClassName={zoom}
                />
              </ImageReveal>
            </div>

            {/* Overlapping accent card — only where there's room for it */}
            <FadeIn delay={0.45} className="absolute -bottom-8 -left-8 hidden w-28 sm:block lg:-left-10 lg:w-32">
              <div className="-rotate-6 overflow-hidden rounded-2xl bg-white p-1.5 shadow-card-hover">
                <ImageSlot image={photos.scallop} sizes="9rem" className="aspect-square rounded-xl" />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </Section>
  );
}
