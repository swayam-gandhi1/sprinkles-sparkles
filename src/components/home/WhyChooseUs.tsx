import { FadeUp } from "@/components/animations/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { ScriptNote } from "@/components/common/ScriptNote";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Section } from "@/components/layout/Section";
import { benefits, whyIntro } from "@/data/home";
import { cn } from "@/lib/utils/cn";

/** Split layout: heading and intro on the left, an airy benefits list on the right. */
export function WhyChooseUs() {
  return (
    <Section aria-labelledby="why-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <FadeUp className="lg:col-span-5">
          <SectionHeading id="why-title" title="Why Choose Sprinkle & Sparkle?" description={whyIntro} />
          <ScriptNote className="mt-7 text-2xl text-balance sm:text-[1.75rem] lg:-rotate-2">
            Spreading happiness, one creation at a time
          </ScriptNote>
        </FadeUp>

        <StaggerContainer className="lg:col-span-7">
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {benefits.map(({ title, description, icon: Icon }, index) => (
              <li key={title}>
                <StaggerItem className="flex gap-4">
                  <span
                    className={cn(
                      "grid size-12 shrink-0 place-items-center rounded-2xl",
                      index % 2 ? "bg-aqua-mist text-accent" : "bg-blush text-primary-strong",
                    )}
                  >
                    <Icon aria-hidden className="size-6" strokeWidth={1.6} />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold">{title}</h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted-foreground">{description}</p>
                  </div>
                </StaggerItem>
              </li>
            ))}
          </ul>
        </StaggerContainer>
      </div>
    </Section>
  );
}
