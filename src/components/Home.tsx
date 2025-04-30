import FaqsSection from "@/components/FaqSection";
import HeroSection from "@/components/HeroSection";
import MarketingRoadmap from "@/components/MarketingRoadMap";
import ContactForm from "./ContactUs";
import ReviewSection from "./ReviewSection";




export default function Home() {
  return (
    <div>
     
      <HeroSection />
      <ReviewSection />
      <MarketingRoadmap />
      <ContactForm />
      <FaqsSection />
    
    </div>
  );
}
