import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TourDatesSection from "@/components/TourDatesSection";
import GallerySection from "@/components/GallerySection";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <div id="tour-dates">
        <TourDatesSection />
      </div>
      <div id="gallery">
        <GallerySection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <CTASection />
    </main>
  );
};

export default Index;
