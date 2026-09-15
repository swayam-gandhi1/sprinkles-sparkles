import { Store } from "lucide-react";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { FadeUp } from "@/components/animations/Reveal";
import { Eyebrow } from "@/components/common/Eyebrow";
import { ImageSlot } from "@/components/common/ImageSlot";
import { Logo } from "@/components/common/Logo";
import { ScriptNote } from "@/components/common/ScriptNote";
import { Section } from "@/components/layout/Section";
import { ButtonArrow, ButtonLink } from "@/components/ui/Button";
import { aboutParagraphs } from "@/data/home";
import { siteImages } from "@/data/images";
import { routes } from "@/lib/config/routes";

/** Editorial brand story: large photo, the real logo as a badge, three short paragraphs. */
export function AboutSection() {
  return (
    <Section id="about" aria-labelledby="about-title" className="overflow-hidden">
      <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-6">
          <ImageReveal className="aspect-[4/3] rounded-panel shadow-card sm:aspect-[5/4] lg:aspect-[4/5]">
            <ImageSlot
              image={siteImages.about}
              sizes="(min-width: 1024px) 36rem, 92vw"
              tone="cream"
              icon={Store}
              label="Brand story photography"
              className="size-full"
            />
          </ImageReveal>
          <FadeUp delay={0.3} className="absolute right-4 -bottom-10 sm:right-8 lg:-right-10">
            <div className="rounded-card bg-white p-4 shadow-card-hover">
              <Logo href={null} className="w-28 sm:w-32" sizes="200px" />
            </div>
          </FadeUp>
          <div className="absolute -top-8 left-2 -rotate-6 sm:-left-4">
            <ScriptNote className="rounded-2xl bg-white/90 px-3 py-1 text-2xl sm:text-[1.75rem]">
              Create, decorate,
              <br />
              gift &amp; celebrate
            </ScriptNote>
          </div>
        </div>

        <FadeUp className="lg:col-span-6">
          <Eyebrow>Welcome to Sprinkle &amp; Sparkle</Eyebrow>
          <h2
            id="about-title"
            className="mt-4 text-[1.875rem] leading-tight font-semibold tracking-tight sm:text-[2.25rem] lg:text-[2.625rem]"
          >
            Everything for Your Baking, Decorating &amp; Gifting Journey
          </h2>
          <div className="mt-6 max-w-[60ch] space-y-4 text-base leading-relaxed text-muted-foreground">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <ButtonLink href={routes.about} size="lg" className="mt-9">
            Discover Our Story
            <ButtonArrow />
          </ButtonLink>
        </FadeUp>
      </div>
    </Section>
  );
}
