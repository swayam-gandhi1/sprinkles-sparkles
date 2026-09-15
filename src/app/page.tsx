import { AboutSection } from "@/components/home/AboutSection";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { FinalCTA } from "@/components/home/FinalCTA";
import { GetInspired } from "@/components/home/GetInspired";
import { HamperSection } from "@/components/home/HamperSection";
import { Hero } from "@/components/home/Hero";
import { InstagramSection } from "@/components/home/InstagramSection";
import { Newsletter } from "@/components/home/Newsletter";
import { OccasionSection } from "@/components/home/OccasionSection";
import { OurPromise } from "@/components/home/OurPromise";
import { ShopByNeed } from "@/components/home/ShopByNeed";
import { TrustBar } from "@/components/home/TrustBar";
import { WhoWeServe } from "@/components/home/WhoWeServe";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { WorkshopSection } from "@/components/home/WorkshopSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <AboutSection />
      <WhoWeServe />
      <ShopByNeed />
      <CategoryShowcase />
      <HamperSection />
      <OccasionSection />
      <WhyChooseUs />
      <OurPromise />
      <WorkshopSection />
      <GetInspired />
      <InstagramSection />
      <FinalCTA />
      <Newsletter />
    </>
  );
}
