import { useEffect, useRef } from "react";
import logo from "@/assets/logo.jpeg";

const FloatingShape = ({ className, delay = "0s" }: { className?: string; delay?: string }) => (
  <div
    className={className}
    style={{ animationDelay: delay }}
  />
);

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const shapes = heroRef.current.querySelectorAll(".parallax-shape");
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      shapes.forEach((shape, i) => {
        const speed = (i + 1) * 8;
        (shape as HTMLElement).style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero noise-overlay"
    >
      {/* Floating shapes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="parallax-shape absolute top-[10%] left-[5%] w-32 h-32 rounded-full bg-primary/20 blur-2xl animate-float transition-transform duration-300" />
        <div className="parallax-shape absolute top-[60%] right-[10%] w-48 h-48 rounded-full bg-secondary/20 blur-3xl animate-float-reverse transition-transform duration-300" />
        <div className="parallax-shape absolute top-[30%] right-[25%] w-24 h-24 rounded-full bg-accent/20 blur-2xl animate-float transition-transform duration-300" style={{ animationDelay: "1s" }} />
        <div className="parallax-shape absolute bottom-[20%] left-[15%] w-40 h-40 rounded-full bg-lime/15 blur-3xl animate-pulse-glow transition-transform duration-300" />
        <div className="parallax-shape absolute top-[15%] right-[40%] w-16 h-16 rounded-full bg-primary/30 blur-xl animate-float-reverse transition-transform duration-300" style={{ animationDelay: "2s" }} />

        {/* Abstract decorative lines */}
        <div className="absolute top-[20%] left-[30%] w-px h-40 bg-gradient-to-b from-transparent via-primary/40 to-transparent rotate-12" />
        <div className="absolute bottom-[30%] right-[20%] w-px h-32 bg-gradient-to-b from-transparent via-accent/40 to-transparent -rotate-12" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Logo */}
        <img
          src={logo}
          alt="Supernova Show Tour"
          className="w-48 md:w-64 mx-auto mb-6 drop-shadow-2xl"
        />

        {/* Sticker badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <span className="badge-sticker text-primary border-primary">LIVE 2026</span>
          <span className="badge-sticker text-lime border-lime">SUMMER TOUR</span>
          <span className="badge-sticker text-secondary border-secondary" style={{ transform: "rotate(3deg)" }}>LIMITED DATES</span>
        </div>

        {/* Main headline */}
        <h1 className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] leading-[0.85] mb-6 tracking-tight">
          <span className="text-gradient-festival">SUMMER</span>
          <br />
          <span className="text-foreground">TOUR 2026</span>
        </h1>

        {/* Subheadline */}
        <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto mb-10 tracking-wide">
          Feel the Energy. Live the Moment.
        </p>

        {/* CTA */}
        <a
          href="#tour-dates"
          className="inline-block px-10 py-5 text-lg font-bold uppercase tracking-wider rounded-full bg-primary text-primary-foreground shadow-neon-pink hover:scale-105 transition-all duration-300 hover:shadow-[0_0_50px_hsl(342,95%,59%/0.6)] font-body"
        >
          View Tour Dates
        </a>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
