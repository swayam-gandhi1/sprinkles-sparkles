import { MapPin } from "lucide-react";
import { FadeIn, ScaleIn } from "@/components/animations/Reveal";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { DecorLayer, type DecorItem } from "@/components/common/Decor";
import { ImageSlot } from "@/components/common/ImageSlot";
import { ScriptNote } from "@/components/common/ScriptNote";
import { Container } from "@/components/layout/Container";
import { ButtonArrow, ButtonLink } from "@/components/ui/Button";
import { siteImages } from "@/data/images";
import { routes } from "@/lib/config/routes";
import { siteConfig } from "@/lib/config/site";

const decor: readonly DecorItem[] = [
  { shape: "sparkle", className: "top-[12%] left-[46%] hidden size-6 text-sunny lg:block", float: true },
  { shape: "sprinkle", className: "bottom-[16%] left-[4%] h-2.5 w-7 rotate-45 text-turquoise", float: true, delay: -3 },
  { shape: "heart", className: "top-[14%] right-[4%] size-5 rotate-12 text-pink/60", float: true, delay: -1.5 },
  { shape: "dot", className: "bottom-[10%] left-[44%] size-3 text-lavender-vivid" },
];

const tile = "size-full rounded-[1.5rem] shadow-card-hover ring-4 ring-white";

/** About page banner: headline, short intro and two real store photos. */
export function AboutHero() {
  return (
    <section
      aria-labelledby="about-page-title"
      className="relative isolate overflow-hidden bg-linear-to-br from-blush via-cream to-lavender-mist"
    >
      <div aria-hidden className="confetti-pattern absolute inset-0 -z-10 opacity-50" />
      <div aria-hidden className="absolute -top-24 -right-20 -z-10 size-96 rounded-full bg-turquoise/20 blur-3xl" />
      <DecorLayer items={decor} />

      <Container className="relative grid items-center gap-12 pt-8 pb-16 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:pt-10 lg:pb-20">
        <div>
          <Breadcrumbs items={[{ label: "Home", href: routes.home }, { label: "About Us", href: routes.about }]} />
          <h1
            id="about-page-title"
            className="mt-6 animate-rise text-[2.5rem] leading-[1.05] font-bold tracking-tight sm:text-[3.25rem] lg:text-[3.5rem]"
          >
            About{" "}
            <span className="block font-script text-[1.15em] leading-tight text-gradient-brand sm:inline">
              Sprinkle &amp; Sparkle
            </span>
          </h1>
          <p className="mt-5 max-w-[50ch] animate-rise text-lg leading-relaxed text-muted-foreground [animation-delay:120ms]">
            {siteConfig.tagline} in {siteConfig.contact.location} — your one-stop destination for baking
            ingredients, cake decorating supplies, packaging, toppers and gifting, all under one roof.
          </p>
          <p className="mt-5 inline-flex animate-rise items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-semibold shadow-card [animation-delay:200ms]">
            <MapPin aria-hidden className="size-4 text-pink" />
            Visit us in {siteConfig.contact.location}
          </p>
          <div className="mt-8 flex animate-rise flex-col gap-3 [animation-delay:280ms] sm:flex-row">
            <ButtonLink href={routes.shop} size="lg">
              Shop Our Products
              <ButtonArrow />
            </ButtonLink>
            <ButtonLink href="#visit" variant="outline" size="lg">
              Get in Touch
            </ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[32rem] lg:max-w-none">
          <div aria-hidden className="absolute -inset-2 -z-10 -rotate-2 rounded-[2.5rem] bg-linear-to-br from-pink/25 via-lavender/60 to-turquoise/30 sm:-inset-5" />
          <div className="grid aspect-[5/4] grid-cols-5 gap-3 sm:gap-4">
            <ScaleIn trigger="mount" delay={0.1} className="col-span-3">
              <ImageSlot image={siteImages.hamper} preload sizes="(min-width: 1024px) 20rem, 56vw" className={tile} />
            </ScaleIn>
            <ScaleIn trigger="mount" delay={0.2} className="col-span-2">
              <ImageSlot image={siteImages.heroFlowers} sizes="(min-width: 1024px) 14rem, 38vw" className={tile} />
            </ScaleIn>
          </div>
          <FadeIn trigger="mount" delay={0.4} className="absolute -bottom-6 left-4 sm:left-8">
            <div className="-rotate-3 rounded-2xl bg-white px-4 py-2.5 shadow-card-hover">
              <ScriptNote as="span" className="text-xl sm:text-2xl">
                Little details, big smiles
              </ScriptNote>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
