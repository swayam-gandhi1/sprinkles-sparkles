import { Mail } from "lucide-react";
import { FadeUp } from "@/components/animations/Reveal";
import { DecorLayer, type DecorItem } from "@/components/common/Decor";
import { Container } from "@/components/layout/Container";
import { NewsletterForm } from "./NewsletterForm";

const decor: readonly DecorItem[] = [
  { shape: "sparkle", className: "top-[18%] left-[10%] hidden size-5 text-sunny sm:block", float: true },
  { shape: "heart", className: "right-[12%] bottom-[22%] hidden size-5 rotate-12 text-pink/60 sm:block", float: true, delay: -2 },
  { shape: "sprinkle", className: "top-[24%] right-[16%] h-2 w-6 rotate-45 text-turquoise", float: true, delay: -4 },
];

export function Newsletter() {
  return (
    <section aria-labelledby="newsletter-title" className="relative overflow-hidden bg-lavender-mist py-section-sm">
      <div aria-hidden className="sprinkle-pattern absolute inset-0 opacity-50" />
      <DecorLayer items={decor} />
      <Container size="narrow" className="relative text-center">
        <FadeUp>
          <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-white text-lavender-strong shadow-card">
            <Mail aria-hidden className="size-6" strokeWidth={1.7} />
          </span>
          <h2 id="newsletter-title" className="mt-4 text-2xl font-bold tracking-tight sm:text-[1.75rem]">
            Stay in the Sprinkle &amp; Sparkle Circle
          </h2>
          <p className="mx-auto mt-3 max-w-[48ch] text-base leading-relaxed text-muted-foreground">
            Get updates on new arrivals, festive collections and special offers.
          </p>
          <NewsletterForm className="mx-auto mt-8 max-w-lg" />
        </FadeUp>
      </Container>
    </section>
  );
}
