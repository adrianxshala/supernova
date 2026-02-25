import { useEffect, useRef, useState } from "react";
import dafiImg from "@/assets/dafi.webp";

function useInView(threshold = 0.1) {
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

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

const StatCard = ({
  target, suffix, label, color, delay, visible,
}: {
  target: number; suffix: string; label: string;
  color: string; delay: number; visible: boolean;
}) => {
  const [startCount, setStartCount] = useState(false);
  const count = useCountUp(target, 2000, startCount);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setStartCount(true), delay);
    return () => clearTimeout(t);
  }, [visible, delay]);

  return (
    <div
      className="text-center cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.85)",
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                     transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: "transform, opacity",
      }}
    >
      <div className={`font-display text-4xl tabular-nums ${color}`}>
        {count}{suffix}
      </div>
      <div className="font-body text-sm text-muted-foreground uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
};

const AboutSection = () => {
  const { ref: imageRef, inView: imageVisible } = useInView(0.1);
  const { ref: textRef,  inView: textVisible  } = useInView(0.1);
  const { ref: statsRef, inView: statsVisible } = useInView(0.2);

  const popIn = (delay: number, inView: boolean) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "rotate(8deg) scale(1)" : "rotate(8deg) scale(0.3)",
    transition: `opacity 0.5s ease-out ${delay}ms,
                 transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
    willChange: "transform, opacity",
  });

  const slideIn = (delay: number, inView: boolean, fromX = 0, fromY = 50) => ({
    opacity: inView ? 1 : 0,
    transform: inView
      ? "translateX(0) translateY(0) scale(1)"
      : `translateX(${fromX}px) translateY(${fromY}px) scale(0.96)`,
    transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                 transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    willChange: "transform, opacity",
  });

  return (
    <section className="relative py-24 px-4 bg-background noise-overlay overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 left-5 w-24 h-24 rounded-full bg-accent/10 blur-2xl animate-float" />
      <div className="absolute top-1/2 right-[5%] w-2 h-40 bg-gradient-to-b from-secondary/30 to-transparent rotate-12" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Image side ── */}
          <div ref={imageRef} className="relative order-2 lg:order-1" style={slideIn(0, imageVisible, -60, 30)}>
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 rounded-2xl blur-xl" />
            <div className="relative rounded-2xl overflow-hidden transition-transform duration-700 ease-out hover:scale-[1.03] hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
              <img
                src={dafiImg}
                alt="Dafi artist portrait"
                className="w-full object-cover aspect-[3/4]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div
              className="absolute -top-4 right-2 sm:-right-4 badge-sticker text-secondary border-secondary text-base animate-pulse-glow"
              style={popIn(350, imageVisible)}
            >
              SUPERNOVA
            </div>
          </div>

          {/* ── Text side — observed independently ── */}
          <div ref={textRef} className="flex flex-col order-1 lg:order-2">

            {/* Badge */}
            <div style={slideIn(0, textVisible, 40, 0)}>
              <span className="badge-sticker text-accent border-accent mb-6 inline-block">ABOUT</span>
            </div>

            {/* Title — word by word */}
            <div className="font-display text-5xl sm:text-6xl md:text-7xl text-foreground mb-6 leading-[0.9] overflow-hidden">
              <span
                className="inline-block mr-4"
                style={slideIn(80, textVisible, 0, 60)}
              >
                THE
              </span>
              <span
                className="inline-block text-gradient-festival"
                style={slideIn(180, textVisible, 0, 60)}
              >
                ARTIST
              </span>
            </div>

            {/* Paragraphs */}
            <div className="space-y-4 font-body text-muted-foreground text-lg leading-relaxed">
              <p style={slideIn(260, textVisible, 0, 40)}>
                Dafina Zeqiri is one of the most influential artists to emerge from the Albanian music scene — a boundary‑pushing singer, songwriter and performer whose sound blends R&amp;B, pop and electronic energy with unapologetic attitude.
              </p>
              <p style={slideIn(360, textVisible, 0, 40)}>
                Raised between Kosovo and the diaspora, she turned personal stories into anthems, collecting millions of fans across the world through iconic releases, bold visuals and a constant reinvention of her style on stage and in the studio.
              </p>
              <p style={slideIn(460, textVisible, 0, 40)}>
                Every live show is a full‑scale experience: choreography, live band and immersive production that turns each night into a statement of confidence, freedom and pure Dafina energy.
              </p>
            </div>

            {/* Stats — observed independently so count starts when visible */}
            <div ref={statsRef} className="flex gap-6 mt-8">
              <StatCard target={2}   suffix="B+" label="Streams"   color="text-primary"   delay={0}   visible={statsVisible} />
              <StatCard target={150} suffix="+"  label="Shows"     color="text-secondary" delay={120} visible={statsVisible} />
              <StatCard target={30}  suffix="+"  label="Countries" color="text-accent"    delay={240} visible={statsVisible} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
