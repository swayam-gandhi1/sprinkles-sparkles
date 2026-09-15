import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { FadeIn, FadeUp } from "@/components/animations/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { ImageSlot } from "@/components/common/ImageSlot";
import { ScriptNote } from "@/components/common/ScriptNote";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Section } from "@/components/layout/Section";
import { occasions } from "@/data/home";
import { siteImages } from "@/data/images";

/** Split layout: one real store photo beside an elegant, scannable list of occasions. */
export function OccasionSection() {
  return (
    <Section aria-labelledby="occasions-title" className="bg-cream">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="relative order-last lg:order-first lg:col-span-5">
          <ImageReveal className="aspect-[4/3] rounded-panel shadow-card sm:aspect-[16/10] lg:aspect-[4/5]">
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
              title="Made for Every Celebration"
              description="Beautiful products and gifting solutions for the moments that matter most."
            />
          </FadeUp>
          <StaggerContainer className="mt-8" stagger={0.06}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {occasions.map((occasion) => (
                <li key={occasion.name}>
                  <StaggerItem className="h-full">
                    <Link
                      href={occasion.href}
                      className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-border bg-white px-5 py-4 transition-[border-color,box-shadow,translate] duration-300 ease-premium hover:-translate-y-0.5 hover:border-blush-strong hover:shadow-card"
                    >
                      <span>
                        <span className="block text-base font-semibold transition-colors group-hover:text-primary-strong">
                          {occasion.name}
                        </span>
                        <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">
                          {occasion.description}
                        </span>
                      </span>
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-blush text-primary-strong transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                        <ArrowRight aria-hidden className="size-4" />
                      </span>
                    </Link>
                  </StaggerItem>
                </li>
              ))}
            </ul>
          </StaggerContainer>
        </div>
      </div>
    </Section>
  );
}
