import { MapPin, Sparkles } from "lucide-react";
import { FadeIn, ScaleIn } from "@/components/animations/Reveal";
import { DecorLayer, type DecorItem } from "@/components/common/Decor";
import { ImageSlot } from "@/components/common/ImageSlot";
import { ScriptNote } from "@/components/common/ScriptNote";
import { toneAt, tones } from "@/components/common/tones";
import { Container } from "@/components/layout/Container";
import { ButtonArrow, ButtonLink } from "@/components/ui/Button";
import { heroAudiences, heroHighlights } from "@/data/home";
import { siteImages } from "@/data/images";
import { routes } from "@/lib/config/routes";
import { cn } from "@/lib/utils/cn";

const backgroundDecor: readonly DecorItem[] = [
  { shape: "sparkle", className: "top-[10%] left-[3%] hidden size-5 text-turquoise xl:block", float: true },
  { shape: "sprinkle", className: "top-[68%] left-[2%] h-2 w-6 rotate-45 text-pink/60", float: true, delay: -2 },
  { shape: "sprinkle", className: "top-[18%] left-[46%] hidden h-2 w-6 -rotate-12 text-sunny lg:block", float: true, delay: -5 },
  { shape: "heart", className: "bottom-[8%] left-[40%] hidden size-5 -rotate-12 text-pink/50 lg:block", float: true, delay: -4 },
  { shape: "dot", className: "top-[8%] right-[6%] size-3 text-sunny" },
];

const collageDecor: readonly DecorItem[] = [
  { shape: "sparkle", className: "-top-5 left-[36%] size-7 text-sunny", float: true },
  { shape: "heart", className: "-top-5 right-[12%] size-6 rotate-12 text-pink", float: true, delay: -1.5 },
  { shape: "sprinkle", className: "bottom-[30%] -left-4 h-2.5 w-7 -rotate-45 text-turquoise", float: true, delay: -5 },
  { shape: "sparkle", className: "top-[48%] -right-3 size-5 text-pink", float: true, delay: -3 },
  { shape: "dot", className: "-bottom-4 right-[30%] size-3 text-lavender-vivid" },
];

const tile = "size-full rounded-[1.5rem] shadow-card-hover ring-4 ring-white";

/** Script accent for the verbs in the supporting line. */
const verb = "font-script text-[1.45em] leading-none font-bold text-accent not-italic";

/*
 * Copy enters with CSS (`animate-rise`) so the headline — the LCP element —
 * paints before hydration. The collage of the shop's real photos uses Motion.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-linear-to-br from-blush via-cream to-lavender-mist"
    >
      {/* Soft colour blooms keep the hero bright without busy imagery */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-24 size-[28rem] rounded-full bg-pink/15 blur-3xl" />
        <div className="absolute top-1/3 -right-24 size-[26rem] rounded-full bg-turquoise/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 size-[22rem] rounded-full bg-sunny/25 blur-3xl" />
      </div>
      <div
        aria-hidden
        className="confetti-pattern absolute inset-0 -z-10 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]"
      />
      <DecorLayer items={backgroundDecor} />

      <Container className="relative grid items-center gap-14 pt-10 pb-20 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:pt-16 lg:pb-24 xl:pt-20 xl:pb-28">
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:max-w-none lg:text-left">
          <p className="inline-flex animate-rise items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-[0.6875rem] font-semibold tracking-[0.12em] text-primary-strong uppercase shadow-card sm:text-[0.8125rem] sm:tracking-[0.18em]">
            <span aria-hidden className="size-2 rounded-full bg-turquoise" />
            Baking &amp; cake decorating supplies
          </p>
          <h1
            id="hero-title"
            className="mt-5 animate-rise text-[2.125rem] leading-[1.08] font-bold tracking-tight [animation-delay:90ms] sm:text-[3rem] lg:text-[2.875rem] xl:text-[3.5rem]"
          >
            <span className="block font-script text-[1.25em] leading-none text-primary">Bakers,</span>{" "}
            <span className="mt-1 block">
              Your One-Stop <span className="text-gradient-brand">Baking Destination</span> Is Here!
              <Sparkles aria-hidden className="ml-2 inline-block size-[0.7em] -translate-y-[0.35em] text-sunny" />
            </span>
          </h1>
          <p className="mt-5 animate-rise font-serif text-xl leading-snug font-medium text-foreground italic [animation-delay:180ms] sm:text-2xl">
            Everything you need to <span className={verb}>Bake</span>,{" "}
            <span className={cn(verb, "text-primary")}>Decorate</span> &amp;{" "}
            <span className={cn(verb, "text-lavender-strong")}>Create</span> — all in one place!
          </p>
          <p className="mx-auto mt-5 max-w-[50ch] animate-rise text-base leading-relaxed text-muted-foreground [animation-delay:270ms] sm:text-[1.0625rem] lg:mx-0">
            From baking ingredients to cake decoration, colours, essences, sprinkles, toppers, chocolates, boxes &amp;
            packaging — find the essentials you need for your bakery or baking business.
          </p>

          <div className="mt-6 animate-rise [animation-delay:320ms]">
            <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">Made for</p>
            <ul className="mt-2.5 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              {heroAudiences.map((audience, index) => (
                <li
                  key={audience}
                  className="inline-flex items-center gap-2 rounded-full border border-white bg-white/80 px-3.5 py-1.5 text-[0.8125rem] font-semibold text-foreground shadow-card"
                >
                  <span aria-hidden className={cn("size-2 rounded-full", tones[toneAt(index)].vivid)} />
                  {audience}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex animate-rise flex-col gap-3 [animation-delay:380ms] sm:flex-row sm:justify-center lg:justify-start">
            <ButtonLink href="#products" size="lg">
              Explore Products
              <ButtonArrow />
            </ButtonLink>
            <ButtonLink href={routes.shop} variant="accent" size="lg">
              Shop Now
              <ButtonArrow />
            </ButtonLink>
          </div>

          {/* Brand lines — a quiet highlight strip under the CTAs */}
          <ul className="mt-7 inline-flex animate-rise flex-col gap-1 rounded-2xl border border-white bg-white/85 p-2 text-left shadow-card [animation-delay:440ms]">
            {heroHighlights.map(({ text, icon: Icon }, index) => (
              <li
                key={text}
                className="flex items-center gap-2.5 px-3 py-1.5 text-sm font-semibold sm:text-[0.9375rem]"
              >
                <span
                  aria-hidden
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full",
                    index === 0 ? "bg-coral/15 text-primary-strong" : "bg-sunny-mist text-sunny-strong",
                  )}
                >
                  <Icon className="size-4" strokeWidth={2} />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Collage of the shop's own photos */}
        <div className="relative mx-auto w-full max-w-[34rem] lg:max-w-none">
          <div aria-hidden className="absolute -inset-2 -z-10 rotate-3 rounded-[2.5rem] bg-linear-to-br from-pink/25 via-lavender/50 to-turquoise/30 sm:-inset-6" />
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
              className="col-span-2 row-span-1 flex items-center justify-center gap-1.5 rounded-[1.25rem] bg-white px-3 text-center shadow-card-hover"
            >
              <MapPin aria-hidden className="hidden size-4 shrink-0 text-pink sm:block" />
              <span className="font-script text-[0.9375rem] leading-tight font-bold text-primary-strong sm:text-xl">
                From our Khanna store
              </span>
            </FadeIn>
          </div>
          <FadeIn trigger="mount" delay={0.65} className="absolute -bottom-7 -left-2 hidden sm:block lg:-left-6">
            <div className="-rotate-6 rounded-2xl bg-white px-4 py-2.5 shadow-card-hover">
              <ScriptNote as="span" className="text-xl text-accent">
                Small supplies, big creations
              </ScriptNote>
            </div>
          </FadeIn>
          <FadeIn trigger="mount" delay={0.8} className="pointer-events-none absolute inset-0">
            <DecorLayer items={collageDecor} />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
