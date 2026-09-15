import { FadeUp } from "@/components/animations/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { CurveDivider } from "@/components/common/CurveDivider";
import { ScrollRow, scrollItemClass } from "@/components/common/ScrollRow";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { audiences } from "@/data/home";
import { cn } from "@/lib/utils/cn";

/** Blush band with wave edges: who the store is for. */
export function WhoWeServe() {
  return (
    <section aria-labelledby="audiences-title" className="relative bg-blush py-section">
      <CurveDivider className="absolute inset-x-0 top-0 -translate-y-[calc(100%-1px)] text-blush" />
      <div aria-hidden className="sprinkle-pattern absolute inset-0 opacity-40" />

      <Container className="relative">
        <FadeUp>
          <SectionHeading id="audiences-title" eyebrow="Who we serve" title="Made for Creators Like You" align="center" />
        </FadeUp>
        <StaggerContainer className="mt-10 lg:mt-12">
          {/* Cards aren't links, so the swipe row itself takes focus for keyboard scrolling. */}
          <ScrollRow
            tabIndex={0}
            aria-label="Who we serve"
            className="md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4"
          >
            {audiences.map(({ title, description, icon: Icon }, index) => (
              <li key={title} className={cn(scrollItemClass, "md:w-auto")}>
                <StaggerItem className="h-full">
                  <div className="h-full rounded-card bg-white p-6 shadow-card sm:p-7">
                    <span
                      className={cn(
                        "grid size-14 place-items-center rounded-2xl",
                        index % 2 ? "bg-aqua-mist text-accent" : "bg-blush text-primary-strong",
                      )}
                    >
                      <Icon aria-hidden className="size-6" strokeWidth={1.6} />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{description}</p>
                  </div>
                </StaggerItem>
              </li>
            ))}
          </ScrollRow>
        </StaggerContainer>
      </Container>

      <CurveDivider flip className="absolute inset-x-0 bottom-0 translate-y-[calc(100%-1px)] text-blush" />
    </section>
  );
}
