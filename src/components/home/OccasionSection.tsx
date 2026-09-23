import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { FadeIn, FadeUp } from "@/components/animations/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { ImageSlot } from "@/components/common/ImageSlot";
import { ScriptNote } from "@/components/common/ScriptNote";
import { Highlight, SectionHeading } from "@/components/common/SectionHeading";
import { tones } from "@/components/common/tones";
import { Section } from "@/components/layout/Section";
import { occasions } from "@/data/home";
import { siteImages } from "@/data/images";
import { cn } from "@/lib/utils/cn";

/** Aqua band: one real store photo beside colourful, scannable occasion cards. */
export function OccasionSection() {
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
              {occasions.map((occasion) => {
                const Icon = occasion.icon;
                return (
                  <li key={occasion.name}>
                    <StaggerItem className="h-full">
                      <Link
                        href={occasion.href}
                        className="group flex h-full items-center gap-4 rounded-2xl border border-white bg-white px-4 py-4 shadow-card transition-[translate,box-shadow] duration-300 ease-premium hover:-translate-y-0.5 hover:shadow-card-hover sm:px-5"
                      >
                        <span
                          className={cn(
                            "grid size-12 shrink-0 place-items-center rounded-2xl transition-transform duration-300 ease-premium group-hover:-rotate-6",
                            tones[occasion.tone].icon,
                          )}
                        >
                          <Icon aria-hidden className="size-6" strokeWidth={1.7} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-base font-semibold transition-colors group-hover:text-primary-strong">
                            {occasion.name}
                          </span>
                          <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">
                            {occasion.description}
                          </span>
                        </span>
                        <ArrowRight
                          aria-hidden
                          className="size-4 shrink-0 text-primary-strong transition-transform duration-300 ease-premium group-hover:translate-x-1"
                        />
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
