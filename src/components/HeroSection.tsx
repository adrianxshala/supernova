import { useEffect, useRef } from "react";

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
        {/* Main headline */}
        <h1 className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] leading-[0.85] mb-6 tracking-tight animate-headline-pop">
          <span className="text-gradient-festival animate-blur-in drop-shadow-[0_0_32px_rgba(255,255,255,0.35)]">
            GERMANY
          </span>
          <br />
          <span className="text-foreground animate-text-shuffle">TOUR 2026</span>
        </h1>

        {/* Subheadline with typewriter effect */}
        <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto mb-10 tracking-wide">
          <span className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-foreground animate-typewriter">
            Feel the Energy. Live the Moment.
          </span>
        </p>

        {/* CTA */}
        <a
          href="https://dafinazeqiri.tickets/"
          target="_blank"
          rel="noreferrer"
          aria-label="Get tickets on dafinazeqiri.tickets"
          title="Get tickets on dafinazeqiri.tickets"
          className="inline-block px-12 py-6 text-xl font-bold uppercase tracking-wider rounded-full bg-gradient-festival text-foreground shadow-neon-pink hover:scale-110 transition-all duration-300 hover:shadow-[0_0_60px_hsl(342,95%,59%/0.5)] font-body animate-headline-pop"
          style={{ animationDelay: "0.6s" }}
        >
          Get Tickets
        </a>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
