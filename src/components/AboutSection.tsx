import { useEffect, useRef } from "react";
import artistImg from "@/assets/artist.jpg";

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-24 px-4 bg-background noise-overlay overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 left-5 w-24 h-24 rounded-full bg-accent/10 blur-2xl animate-float" />
      <div className="absolute top-1/2 right-[5%] w-2 h-40 bg-gradient-to-b from-secondary/30 to-transparent rotate-12" />

      <div ref={sectionRef} className="max-w-6xl mx-auto relative z-10 opacity-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 rounded-2xl blur-xl" />
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={artistImg}
                alt="The artist in a bold editorial portrait"
                className="w-full object-cover aspect-[3/4]"
              />
            </div>
            {/* Floating sticker */}
            <div className="absolute -top-4 -right-4 badge-sticker text-secondary border-secondary text-base" style={{ transform: "rotate(8deg)" }}>
              SUPERNOVA
            </div>
          </div>

          {/* Text side */}
          <div>
            <span className="badge-sticker text-accent border-accent mb-6 inline-block">ABOUT</span>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-foreground mb-6 leading-[0.9]">
              THE <span className="text-gradient-festival">ARTIST</span>
            </h2>
            <div className="space-y-4 font-body text-muted-foreground text-lg leading-relaxed">
              <p>
                Born from the underground, rising through the noise — Supernova is the sound of a generation that refuses to be silenced. With three platinum records and over 2 billion streams, the energy is undeniable.
              </p>
              <p>
                The 2026 Summer Tour marks the biggest production yet — immersive visuals, pyrotechnics, and a setlist that spans the entire journey from debut to the latest album <span className="text-foreground font-semibold">"AFTERGLOW"</span>.
              </p>
              <p>
                Every show is a moment. Every city gets a unique experience. This isn't just a concert — it's a movement.
              </p>
            </div>

            <div className="flex gap-6 mt-8">
              <div className="text-center">
                <div className="font-display text-4xl text-primary">2B+</div>
                <div className="font-body text-sm text-muted-foreground uppercase tracking-wider">Streams</div>
              </div>
              <div className="text-center">
                <div className="font-display text-4xl text-secondary">150+</div>
                <div className="font-body text-sm text-muted-foreground uppercase tracking-wider">Shows</div>
              </div>
              <div className="text-center">
                <div className="font-display text-4xl text-accent">30+</div>
                <div className="font-body text-sm text-muted-foreground uppercase tracking-wider">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
