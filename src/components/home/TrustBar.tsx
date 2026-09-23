import { FadeUp } from "@/components/animations/Reveal";
import { toneAt, tones } from "@/components/common/tones";
import { Container } from "@/components/layout/Container";
import { trustItems } from "@/data/home";
import { cn } from "@/lib/utils/cn";

/**
 * Benefits card. `overlap` (homepage) floats it over the hero's lower edge;
 * `inline` sits in normal flow, e.g. below the shop grid.
 */
export function TrustBar({ variant = "overlap" }: { variant?: "overlap" | "inline" }) {
  return (
    <section
      aria-label="Why shop with Sprinkle & Sparkle"
      className={cn(
        "relative z-10 bg-transparent",
        variant === "overlap" ? "-mt-10 sm:-mt-12" : "pb-section-sm",
      )}
    >
      <Container>
        <FadeUp>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-6 rounded-panel border border-white bg-white px-5 py-7 shadow-card-hover sm:grid-cols-3 sm:px-8 lg:grid-cols-5 lg:gap-0 lg:px-6 lg:py-6">
            {trustItems.map(({ title, description, icon: Icon }, index) => (
              <li
                key={title}
                className={cn(
                  "flex items-start gap-3 lg:border-l lg:border-dashed lg:border-border lg:px-4 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0",
                  index === trustItems.length - 1 && "col-span-2 mx-auto sm:col-span-1 sm:mx-0",
                )}
              >
                <span
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-2xl ring-1 ring-black/[0.03]",
                    tones[toneAt(index)].icon,
                  )}
                >
                  <Icon aria-hidden className="size-5" strokeWidth={1.8} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm leading-snug font-semibold">{title}</span>
                  <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted-foreground">{description}</span>
                </span>
              </li>
            ))}
          </ul>
        </FadeUp>
      </Container>
    </section>
  );
}
