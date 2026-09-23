import { AboutSection } from "@/components/home/AboutSection";
import { BakingEssentials } from "@/components/home/BakingEssentials";
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
import { SparkleBanner } from "@/components/home/SparkleBanner";
import { TrustBar } from "@/components/home/TrustBar";
import { WhoWeServe } from "@/components/home/WhoWeServe";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <BakingEssentials />
      <WhoWeServe />
      <AboutSection />
      <ShopByNeed />
      <CategoryShowcase />
      <HamperSection />
      <OccasionSection />
      <SparkleBanner />
      <WhyChooseUs />
      <OurPromise />
      <GetInspired />
      <InstagramSection />
      <FinalCTA />
      <Newsletter />
    </>
  );
}
