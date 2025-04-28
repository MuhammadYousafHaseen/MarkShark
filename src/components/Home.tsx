import FaqsSection from "@/components/FaqSection";
import HeroSection from "@/components/HeroSection";
import MarketingRoadmap from "@/components/MarketingRoadMap";
import MarketingSection from "@/components/MarketingSection";
import Navbar from "@/components/Navbar";
import VideoWithContactForm from "@/components/VideoAnimationSEOGame";
import Footer from "./Footer";


export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <MarketingSection />
      <MarketingRoadmap />
      <VideoWithContactForm src="videos/seoGame.mp4" />
      <FaqsSection />
      <Footer />
    </div>
  );
}
