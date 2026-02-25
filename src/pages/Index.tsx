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

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t border-border md:hidden z-50">
        <a
          href="#tour-dates"
          className="block w-full py-3 text-center rounded-full bg-primary text-primary-foreground font-body font-bold uppercase tracking-wider shadow-neon-pink"
        >
          Get Tickets
        </a>
      </div>
    </main>
  );
};

export default Index;
