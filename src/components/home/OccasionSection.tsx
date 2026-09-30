import Link from "next/link";
import { ArrowRight, Cake, Sparkles, PartyPopper, Flame, HeartHandshake, BookHeart, BriefcaseBusiness, Gift } from "lucide-react";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { FadeIn, FadeUp } from "@/components/animations/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { ImageSlot } from "@/components/common/ImageSlot";
import { ScriptNote } from "@/components/common/ScriptNote";
import { Highlight, SectionHeading } from "@/components/common/SectionHeading";
import { tones } from "@/components/common/tones";
import { Section } from "@/components/layout/Section";
import { siteImages } from "@/data/images";
import { getOccasions } from "@/lib/api/occasions";
import { routes } from "@/lib/config/routes";
import { cn } from "@/lib/utils/cn";
import type { Tone } from "@/types/content";

const occasionVisuals: Record<string, { icon: typeof Cake; tone: Tone }> = {
  birthday: { icon: Cake, tone: "blush" },
  birthdays: { icon: Cake, tone: "blush" },
  festivals: { icon: Flame, tone: "sunny" },
  diwali: { icon: Flame, tone: "sunny" },
  rakhi: { icon: HeartHandshake, tone: "cream" },
  "teachers-day": { icon: BookHeart, tone: "aqua" },
  "corporate-gifting": { icon: BriefcaseBusiness, tone: "lavender" },
  "special-occasions": { icon: PartyPopper, tone: "blush" },
  wedding: { icon: Gift, tone: "lavender" },
  anniversary: { icon: HeartHandshake, tone: "blush" },
  christmas: { icon: Sparkles, tone: "sunny" },
};

const defaultToneList: Tone[] = ["blush", "sunny", "cream", "aqua", "lavender"];

/** Aqua band: one real store photo beside colourful, scannable occasion cards from live backend. */
export async function OccasionSection() {
  const backendOccasions = await getOccasions();
  if (!backendOccasions.length) return null;

  return (
    <Section aria-labelledby="occasions-title" className="relative overflow-hidden bg-aqua-mist">
      <div aria-hidden className="sprinkle-pattern pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="relative order-last lg:order-first lg:col-span-5">
          <div
            aria-hidden
            className="absolute inset-0 translate-x-3 translate-y-3 rotate-2 rounded-panel bg-linear-to-br from-sunny/60 to-coral/40 sm:translate-x-5 sm:translate-y-5"
          />
          <ImageReveal className="relative aspect-[4/3] rounded-panel shadow-card sm:aspect-[16/10] lg:aspect-[4/5]">
            <ImageSlot image={siteImages.occasions} sizes="(min-width: 1024px) 30rem, 92vw" className="size-full" />
          </ImageReveal>
          <FadeIn delay={0.3} className="absolute -bottom-6 left-4 sm:left-8">
            <div className="-rotate-3 rounded-2xl bg-white px-5 py-3 shadow-card-hover">
              <ScriptNote className="text-xl sm:text-2xl">For every special moment</ScriptNote>
            </div>
          </FadeIn>
        </div>

        <div className="lg:col-span-7">
          <FadeUp>
            <SectionHeading
              id="occasions-title"
              accent="teal"
              title={
                <>
                  Made for Every <Highlight>Celebration</Highlight>
                </>
              }
              description="Beautiful products and gifting solutions for the moments that matter most."
            />
          </FadeUp>
          <StaggerContainer className="mt-8" stagger={0.06}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {backendOccasions.map((occasion, i) => {
                const visual = occasionVisuals[occasion.slug] || {
                  icon: PartyPopper,
                  tone: defaultToneList[i % defaultToneList.length],
                };
                const Icon = visual.icon;
                const tone = tones[visual.tone ?? "blush"];

                return (
                  <li key={occasion.slug}>
                    <StaggerItem className="h-full">
                      <Link
                        href={routes.occasion(occasion.slug)}
                        className="group flex h-full items-center gap-4 rounded-2xl border border-white bg-white px-4 py-4 shadow-card transition-[translate,box-shadow] duration-300 ease-premium hover:-translate-y-0.5 hover:shadow-card-hover sm:px-5"
                      >
                        <span
                          className={cn(
                            "grid size-12 shrink-0 place-items-center rounded-2xl transition-transform duration-300 ease-premium group-hover:scale-105 group-hover:-rotate-6",
                            tone.icon,
                          )}
                        >
                          <Icon aria-hidden className="size-6" strokeWidth={1.6} />
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="text-[0.9375rem] font-semibold text-foreground group-hover:text-primary-strong">
                            {occasion.name}
                          </span>
                          <span className="line-clamp-1 text-xs text-muted-foreground">
                            {occasion.description || "Browse collection"}
                          </span>
                        </span>
                        <span
                          aria-hidden
                          className="grid size-7 shrink-0 place-items-center rounded-full bg-cream text-muted-foreground transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground"
                        >
                          <ArrowRight className="size-3.5" />
                        </span>
                      </Link>
                    </StaggerItem>
                  </li>
                );
              })}
            </ul>
          </StaggerContainer>
        </div>
      </div>
    </Section>
  );
}
