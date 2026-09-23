import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { StoreRange } from "@/components/about/StoreRange";
import { VisitUs } from "@/components/about/VisitUs";
import { AboutSection } from "@/components/home/AboutSection";
import { InstagramSection } from "@/components/home/InstagramSection";
import { OurPromise } from "@/components/home/OurPromise";
import { SparkleBanner } from "@/components/home/SparkleBanner";
import { WhoWeServe } from "@/components/home/WhoWeServe";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Sprinkle & Sparkle is a cake decor shop in Khanna, Punjab — baking ingredients, cake decorating supplies, packaging, toppers and gifting for home bakers, professional bakers, bakeries and cake artists.",
};

/* Built only from existing brand copy and real shop photos — no invented history, stats or awards. */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutSection showCta={false} />
      <WhoWeServe />
      <StoreRange />
      <WhyChooseUs />
      <OurPromise />
      <InstagramSection />
      <VisitUs />
      <SparkleBanner />
    </>
  );
}
