import { useRef, useCallback, useEffect, useState } from "react";
import hyatt from "@/assets/hyatt.png";
import lamborghini from "@/assets/lamborgini.png";
import mercedes from "@/assets/mercedes.png";
import redbull from "@/assets/redbull.png";

const sponsors = [
  { src: hyatt,       alt: "Hyatt",         height: "h-10" },
  { src: lamborghini, alt: "Lamborghini",    height: "h-10" },
  { src: mercedes,    alt: "Mercedes-Benz", height: "h-24" },
  { src: redbull,     alt: "Red Bull",      height: "h-10" },
];

const DURATION = "9.6s";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const CTASection = () => {
  const buttonRef = useRef<HTMLAnchorElement | null>(null);
  const { ref: contentRef, inView } = useInView(0.15);

  const slide = (delay: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0) scale(1)" : "translateY(60px) scale(0.95)",
    transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                 transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    willChange: "transform, opacity",
  });

  const createConfetti = useCallback(() => {
    const container = buttonRef.current?.parentElement;
    if (!container) return;
    const colors = [
      "hsl(342, 95%, 59%)",
      "hsl(27, 100%, 50%)",
      "hsl(190, 100%, 50%)",
      "hsl(72, 100%, 50%)",
    ];
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement("div");
      confetti.style.cssText = `
        position: absolute;
        width: ${Math.random() * 8 + 4}px;
        height: ${Math.random() * 8 + 4}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() > 0.5 ? "50%" : "0"};
        left: 50%;
        top: 50%;
        pointer-events: none;
        z-index: 50;
      `;
      container.style.position = "relative";
      container.appendChild(confetti);
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 200 + 100;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity - 100;
      let x = 0, y = 0, opacity = 1;
      const startTime = performance.now();
      const animate = (time: number) => {
        const elapsed = (time - startTime) / 1000;
        x = vx * elapsed;
        y = vy * elapsed + 0.5 * 500 * elapsed * elapsed;
        opacity = Math.max(0, 1 - elapsed * 1.5);
        confetti.style.transform = `translate(${x}px, ${y}px) rotate(${elapsed * 360}deg)`;
        confetti.style.opacity = String(opacity);
        if (opacity > 0) requestAnimationFrame(animate);
        else confetti.remove();
      };
      requestAnimationFrame(animate);
    }
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Shared animated gradient background */}
      <div
        className="absolute inset-0 animate-gradient-shift"
        style={{
          background: "linear-gradient(135deg, hsl(342,95%,20%), hsl(27,100%,20%), hsl(260,60%,15%), hsl(190,100%,15%))",
          backgroundSize: "400% 400%",
        }}
      />
      <div className="absolute inset-0 noise-overlay" />

      {/* Floating decorative elements */}
      <div className="absolute top-10 left-[10%] w-20 h-20 rounded-full bg-primary/20 blur-2xl animate-float" />
      <div className="absolute bottom-10 right-[15%] w-32 h-32 rounded-full bg-accent/15 blur-3xl animate-float-reverse" />

      {/* ── Sponsors marquee ── */}
      <div className="relative z-10 pt-4 pb-2 border-b border-white/10">
        {/* Fade masks */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-transparent to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-transparent to-transparent z-10 pointer-events-none" />

        <p className="text-center font-body text-xs uppercase tracking-[0.25em] text-white/40 mb-6">
          Official Partners
        </p>

        <div className="flex overflow-hidden">
          {/* Outer track animates -50% = exactly one set width → perfectly seamless */}
          <div
            className="flex shrink-0"
            style={{ animation: `marquee ${DURATION} linear infinite`, willChange: "transform" }}
          >
            {[0, 1].map((set) => (
              <div
                key={set}
                className="flex shrink-0 items-center"
                style={{ gap: "80px", paddingRight: "80px" }}
              >
                {sponsors.map((s, i) => (
                  <img
                    key={i}
                    src={s.src}
                    alt={s.alt}
                    className={`${s.height} w-auto object-contain shrink-0`}
                    style={{ opacity: 0.85 }}
                    draggable={false}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA content ── */}
      <div ref={contentRef} className="relative z-10 text-center max-w-4xl mx-auto py-32 px-4">

        <div className="font-display text-6xl sm:text-8xl md:text-9xl text-foreground leading-[0.85] mb-4" style={slide(0)}>
          DON'T MISS
        </div>

        <div className="font-display text-6xl sm:text-8xl md:text-9xl leading-[0.85] mb-8" style={slide(130)}>
          <span className="text-gradient-festival">THE SHOW</span>
        </div>

        <p className="font-body text-xl text-muted-foreground mb-12 max-w-lg mx-auto" style={slide(260)}>
          Tickets are selling fast. Secure your spot at the biggest tour of 2026.
        </p>

        <div className="relative inline-block" style={slide(380)}>
          <a
            ref={buttonRef as React.RefObject<HTMLAnchorElement>}
            onMouseEnter={createConfetti}
            href="https://dafinazeqiri.tickets/"
            target="_blank"
            rel="noreferrer"
            aria-label="Get tickets now on dafinazeqiri.tickets"
            title="Get tickets now on dafinazeqiri.tickets"
            className="inline-block px-12 py-6 text-xl font-bold uppercase tracking-wider rounded-full bg-gradient-festival text-foreground shadow-neon-pink hover:scale-110 transition-all duration-300 hover:shadow-[0_0_60px_hsl(342,95%,59%/0.5)] font-body"
          >
            Get Tickets Now
          </a>
        </div>

      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default CTASection;
