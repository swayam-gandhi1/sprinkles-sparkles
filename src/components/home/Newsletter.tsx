import { FadeUp } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { NewsletterForm } from "./NewsletterForm";

export function Newsletter() {
  return (
    <section aria-labelledby="newsletter-title" className="border-t border-border bg-cream py-section-sm">
      <Container size="narrow" className="text-center">
        <FadeUp>
          <h2 id="newsletter-title" className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
            Stay in the Sprinkle &amp; Sparkle Circle
          </h2>
          <p className="mx-auto mt-3 max-w-[48ch] text-base leading-relaxed text-muted-foreground">
            Get updates on new arrivals, festive collections, workshops and special offers.
          </p>
          <NewsletterForm className="mx-auto mt-8 max-w-lg" />
        </FadeUp>
      </Container>
    </section>
  );
}
