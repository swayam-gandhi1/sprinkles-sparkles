import { Heart, MapPin } from "lucide-react";
import { FadeIn, ScaleIn } from "@/components/animations/Reveal";
import { DecorLayer, type DecorItem } from "@/components/common/Decor";
import { ImageSlot } from "@/components/common/ImageSlot";
import { Container } from "@/components/layout/Container";
import { ButtonArrow, ButtonLink } from "@/components/ui/Button";
import { heroAudiences } from "@/data/home";
import { siteImages } from "@/data/images";
import { routes } from "@/lib/config/routes";

const backgroundDecor: readonly DecorItem[] = [
  { shape: "sparkle", className: "top-[10%] left-[3%] size-4 text-aqua/60", float: true },
  { shape: "sprinkle", className: "top-[68%] left-[2%] h-1.5 w-5 rotate-45 text-primary/35", float: true, delay: -2 },
  { shape: "heart", className: "bottom-[8%] left-[40%] hidden size-4 -rotate-12 text-primary/35 lg:block", float: true, delay: -4 },
];

const collageDecor: readonly DecorItem[] = [
  { shape: "sparkle", className: "-top-4 left-[36%] size-6 text-primary", float: true },
  { shape: "heart", className: "-top-5 right-[12%] size-5 rotate-12 text-primary/70", float: true, delay: -1.5 },
  { shape: "sprinkle", className: "bottom-[30%] -left-4 h-2 w-6 -rotate-45 text-aqua", float: true, delay: -5 },
  { shape: "sparkle", className: "top-[48%] -right-3 size-4 text-aqua", float: true, delay: -3 },
];

const tile = "size-full rounded-[1.5rem] shadow-card ring-4 ring-white";

/*
 * Copy enters with CSS (`animate-rise`) so the headline — the LCP element —
 * paints before hydration. The collage of the shop's real photos uses Motion.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-linear-to-br from-blush via-[#fff7fa] to-cream"
    >
      <div
        aria-hidden
        className="sprinkle-pattern absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <DecorLayer items={backgroundDecor} />

      <Container className="relative grid items-center gap-16 pt-10 pb-16 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:py-20 xl:py-24">
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:max-w-none lg:text-left">
          <p className="animate-rise text-[0.8125rem] font-semibold tracking-[0.18em] text-primary-strong uppercase">
            Your one-stop cake decor shop
          </p>
          <h1
            id="hero-title"
            className="mt-5 font-script text-[2.75rem] leading-[1.05] font-bold sm:text-[3.5rem] lg:text-[3.25rem] xl:text-[3.875rem]"
          >
            <span className="block animate-rise text-accent [animation-delay:90ms]">Everything You Need to</span>
            <span className="block animate-rise text-primary [animation-delay:180ms]">Create, Decorate &amp; Gift</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[46ch] animate-rise text-base leading-relaxed text-foreground/80 [animation-delay:270ms] sm:text-lg lg:mx-0">
            From cake decorating essentials and baking supplies to beautiful packaging, toppers and gifting accessories
            — discover everything you need to bring your ideas to life.
          </p>
          <div className="mt-9 flex animate-rise flex-col gap-3 [animation-delay:360ms] sm:flex-row sm:justify-center lg:justify-start">
            <ButtonLink href={routes.shop} size="lg">
              Shop Now
              <ButtonArrow />
            </ButtonLink>
            <ButtonLink href="#collections" variant="outline" size="lg">
              Explore Categories
            </ButtonLink>
          </div>
          <p className="mt-8 flex animate-rise flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-sm font-medium text-foreground/80 [animation-delay:450ms] lg:justify-start">
            <span>For</span>
            {heroAudiences.map((audience, index) => (
              <span key={audience} className="flex items-center gap-3">
                {index > 0 ? <Heart aria-hidden className="size-3 fill-primary text-primary" /> : null}
                {audience}
              </span>
            ))}
          </p>
        </div>

        {/* Collage of the shop's own photos */}
        <div className="relative mx-auto w-full max-w-[34rem] lg:max-w-none">
          <div className="grid aspect-[5/4] grid-cols-5 grid-rows-5 gap-3 sm:gap-4">
            <ScaleIn trigger="mount" delay={0.15} className="col-span-3 row-span-3">
              <ImageSlot image={siteImages.heroHampers} preload sizes="(min-width: 1024px) 22rem, 58vw" className={tile} />
            </ScaleIn>
            <ScaleIn trigger="mount" delay={0.25} className="col-span-2 row-span-4">
              <ImageSlot image={siteImages.heroFlowers} sizes="(min-width: 1024px) 15rem, 38vw" className={tile} />
            </ScaleIn>
            <ScaleIn trigger="mount" delay={0.35} className="col-span-3 row-span-2">
              <ImageSlot image={siteImages.heroJars} sizes="(min-width: 1024px) 22rem, 58vw" className={tile} />
            </ScaleIn>
            <FadeIn
              trigger="mount"
              delay={0.5}
              className="col-span-2 row-span-1 flex items-center justify-center gap-1.5 rounded-[1.25rem] bg-white/90 px-3 text-center shadow-card"
            >
              <MapPin aria-hidden className="size-4 shrink-0 text-primary" />
              <span className="font-script text-lg leading-tight font-bold text-primary-strong sm:text-xl">
                From our Khanna store
              </span>
            </FadeIn>
          </div>
          <FadeIn trigger="mount" delay={0.8} className="pointer-events-none absolute inset-0">
            <DecorLayer items={collageDecor} />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
