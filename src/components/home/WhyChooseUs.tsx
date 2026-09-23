import { FadeUp } from "@/components/animations/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { ScriptNote } from "@/components/common/ScriptNote";
import { Highlight, SectionHeading } from "@/components/common/SectionHeading";
import { toneAt, tones } from "@/components/common/tones";
import { Section } from "@/components/layout/Section";
import { benefits, whyIntro } from "@/data/home";
import { cn } from "@/lib/utils/cn";

/** Split layout: heading and intro on the left, colourful benefit cards on the right. */
export function WhyChooseUs() {
  return (
    <Section aria-labelledby="why-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <FadeUp className="lg:col-span-5 lg:self-center">
          <SectionHeading
            id="why-title"
            eyebrow="Why shop with us"
            title={
              <>
                Why Choose <Highlight>Sprinkle &amp; Sparkle</Highlight>?
              </>
            }
            description={whyIntro}
          />
          <ScriptNote className="mt-7 inline-block rounded-2xl bg-blush px-5 py-2.5 text-2xl text-balance sm:text-[1.75rem] lg:-rotate-2">
            Spreading happiness, one creation at a time
          </ScriptNote>
        </FadeUp>

        <StaggerContainer className="lg:col-span-7">
          <ul className="grid gap-4 sm:grid-cols-2">
            {benefits.map(({ title, description, icon: Icon }, index) => {
              const tone = tones[toneAt(index)];
              return (
                <li key={title} className={cn(index === benefits.length - 1 && "sm:col-span-2")}>
                  <StaggerItem
                    className={cn(
                      "flex h-full gap-4 rounded-card border border-border/80 p-5 transition-[translate,box-shadow] duration-300 ease-premium hover:-translate-y-0.5 hover:shadow-card sm:p-6",
                      tone.surface,
                    )}
                  >
                    <span className={cn("grid size-12 shrink-0 place-items-center rounded-2xl bg-white shadow-card", tone.text)}>
                      <Icon aria-hidden className="size-6" strokeWidth={1.7} />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold">{title}</h3>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted-foreground">{description}</p>
                    </div>
                  </StaggerItem>
                </li>
              );
            })}
          </ul>
        </StaggerContainer>
      </div>
    </Section>
  );
}
