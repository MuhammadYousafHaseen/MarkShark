import FaqsSection from "@/components/FaqSection";
import HeroSection from "@/components/HeroSection";
import MarketingRoadmap from "@/components/MarketingRoadMap";
import MarketingSection from "@/components/MarketingSection";

import VideoWithContactForm from "@/components/VideoAnimationSEOGame";



export default function Home() {
  return (
    <div>
     
      <HeroSection />
      <MarketingSection />
      <MarketingRoadmap />
      <VideoWithContactForm />
      <FaqsSection />
    
    </div>
  );
}
