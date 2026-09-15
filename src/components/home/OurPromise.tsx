import { FadeUp } from "@/components/animations/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { Container } from "@/components/layout/Container";
import { promise } from "@/data/home";

/** Compact editorial band. */
export function OurPromise() {
  return (
    <section aria-labelledby="promise-title" className="bg-cream py-section-sm">
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
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
          <ul className="grid gap-7 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-blush-strong">
            {promise.points.map(({ title, description, icon: Icon }) => (
              <li key={title} className="sm:px-6 sm:first:pl-0 sm:last:pr-0">
                <StaggerItem>
                  <Icon aria-hidden className="size-6 text-accent" strokeWidth={1.6} />
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
