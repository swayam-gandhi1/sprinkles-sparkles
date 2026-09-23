import { FadeUp } from "@/components/animations/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { toneAt, tones } from "@/components/common/tones";
import { Container } from "@/components/layout/Container";
import { promise } from "@/data/home";
import { cn } from "@/lib/utils/cn";

/** Compact editorial band on a warm yellow-to-pink wash. */
export function OurPromise() {
  return (
    <section
      aria-labelledby="promise-title"
      className="relative overflow-hidden bg-linear-to-r from-sunny-mist via-cream to-blush py-section-sm"
    >
      <div aria-hidden className="confetti-pattern absolute inset-0 opacity-40" />
      <Container className="relative grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <FadeUp className="lg:col-span-5">
          <h2
            id="promise-title"
            className="font-script text-[2.75rem] leading-[1.05] font-bold text-primary sm:text-[3.25rem]"
          >
            {promise.title}
          </h2>
          <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-muted-foreground">{promise.body}</p>
        </FadeUp>

        <StaggerContainer className="lg:col-span-7">
          <ul className="grid gap-4 sm:grid-cols-3">
            {promise.points.map(({ title, description, icon: Icon }, index) => (
              <li key={title}>
                <StaggerItem className="h-full rounded-card bg-white/85 p-5 shadow-card">
                  <span className={cn("grid size-11 place-items-center rounded-xl", tones[toneAt(index)].icon)}>
                    <Icon aria-hidden className="size-5" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-3 text-base font-semibold">{title}</h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted-foreground">{description}</p>
                </StaggerItem>
              </li>
            ))}
          </ul>
        </StaggerContainer>
      </Container>
    </section>
  );
}
