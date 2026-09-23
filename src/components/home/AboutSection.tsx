import { Store } from "lucide-react";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { FadeUp } from "@/components/animations/Reveal";
import { DecorLayer, type DecorItem } from "@/components/common/Decor";
import { Eyebrow } from "@/components/common/Eyebrow";
import { ImageSlot } from "@/components/common/ImageSlot";
import { Logo } from "@/components/common/Logo";
import { ScriptNote } from "@/components/common/ScriptNote";
import { Highlight } from "@/components/common/SectionHeading";
import { Section } from "@/components/layout/Section";
import { ButtonArrow, ButtonLink } from "@/components/ui/Button";
import { aboutParagraphs } from "@/data/home";
import { siteImages } from "@/data/images";
import { routes } from "@/lib/config/routes";
import { cn } from "@/lib/utils/cn";

const decor: readonly DecorItem[] = [
  { shape: "sparkle", className: "-top-3 right-[18%] size-6 text-sunny", float: true },
  { shape: "sprinkle", className: "top-[40%] -left-3 h-2.5 w-7 rotate-45 text-turquoise", float: true, delay: -3 },
  { shape: "dot", className: "bottom-[18%] -left-2 size-3 text-pink" },
];

/**
 * Editorial brand story: large photo, the real logo as a badge, three short paragraphs.
 * On the About page itself the "Discover Our Story" link is hidden (it would point to itself).
 */
export function AboutSection({ showCta = true, className }: { showCta?: boolean; className?: string }) {
  return (
    <Section id="about" aria-labelledby="about-title" className={cn("overflow-hidden", className)}>
      <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-6">
          {/* Offset colour block behind the photo */}
          <div
            aria-hidden
            className="absolute inset-0 translate-x-3 translate-y-3 -rotate-2 rounded-panel bg-linear-to-br from-turquoise/35 via-aqua-mist to-lavender sm:translate-x-5 sm:translate-y-5"
          />
          <ImageReveal className="relative aspect-[4/3] rounded-panel shadow-card sm:aspect-[5/4] lg:aspect-[4/5]">
            <ImageSlot
              image={siteImages.about}
              sizes="(min-width: 1024px) 36rem, 92vw"
              tone="cream"
              icon={Store}
              label="Brand story photography"
              className="size-full"
            />
          </ImageReveal>
          <DecorLayer items={decor} />
          <FadeUp delay={0.3} className="absolute right-4 -bottom-10 sm:right-8 lg:-right-10">
            <div className="rounded-card bg-white p-4 shadow-card-hover ring-4 ring-blush">
              <Logo href={null} className="w-28 sm:w-32" sizes="200px" />
            </div>
          </FadeUp>
          <div className="absolute -top-8 left-2 -rotate-6 sm:-left-4">
            <ScriptNote className="rounded-2xl bg-white px-4 py-1.5 text-2xl shadow-card sm:text-[1.75rem]">
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
            className="mt-4 text-[1.875rem] leading-tight font-bold tracking-tight sm:text-[2.25rem] lg:text-[2.625rem]"
          >
            Your Baking &amp; Cake Decor Store in <Highlight>Khanna, Punjab</Highlight>
          </h2>
          <div className="mt-6 max-w-[60ch] space-y-4 text-base leading-relaxed text-muted-foreground">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          {showCta ? (
            <ButtonLink href={routes.about} size="lg" className="mt-9">
              Discover Our Story
              <ButtonArrow />
            </ButtonLink>
          ) : null}
        </FadeUp>
      </div>
    </Section>
  );
}
