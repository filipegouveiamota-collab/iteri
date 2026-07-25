import { HeroSection } from "../../components/landing/HeroSection";
import { HowItWorksSection } from "../../components/landing/HowItWorksSection";
import { CategoryGrid } from "../../components/landing/CategoryGrid";
import { FeaturedOpportunities } from "../../components/landing/FeaturedOpportunities";
import { WhyChooseSection } from "../../components/landing/WhyChooseSection";
import { NewsletterBand } from "../../components/landing/NewsletterBand";

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <HowItWorksSection />
      <CategoryGrid />
      <FeaturedOpportunities />
      <WhyChooseSection />
      <NewsletterBand />
    </div>
  );
}
