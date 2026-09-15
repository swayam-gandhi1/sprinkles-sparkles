import { FadeIn } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { trustItems } from "@/data/home";
import { cn } from "@/lib/utils/cn";

export function TrustBar() {
  return (
    <section aria-label="Why shop with Sprinkle & Sparkle" className="border-y border-border bg-white">
      <Container>
        <FadeIn>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-6 py-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-0 lg:py-7">
            {trustItems.map(({ title, description, icon: Icon }, index) => (
              <li
                key={title}
                className={cn(
                  "flex items-start gap-3 lg:border-l lg:border-border lg:px-4 lg:first:border-l-0 lg:first:pl-0",
                  index === trustItems.length - 1 && "col-span-2 mx-auto sm:col-span-1 sm:mx-0",
                )}
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-blush text-primary-strong">
                  <Icon aria-hidden className="size-5" strokeWidth={1.6} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm leading-snug font-semibold">{title}</span>
                  <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted-foreground">{description}</span>
                </span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </Container>
    </section>
  );
}
