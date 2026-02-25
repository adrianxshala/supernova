import hyatt from "@/assets/hyatt.png";
import lamborghini from "@/assets/lamborgini.png";
import mercedes from "@/assets/mercedes.png";
import redbull from "@/assets/redbull.png";

const sponsors = [
  { src: hyatt,       alt: "Hyatt" },
  { src: lamborghini, alt: "Lamborghini" },
  { src: mercedes,    alt: "Mercedes-Benz" },
  { src: redbull,     alt: "Red Bull" },
];

// Each logo ~160px wide + 80px gap = 240px × 4 logos = 960px per set → 960/100 = 9.6s
const DURATION = "9.6s";

const SponsorsSection = () => (
  <section className="relative py-12 bg-white/5 border-t border-b border-border/20 overflow-hidden">
    {/* Fade masks on left and right edges */}
    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white/5 to-transparent z-10 pointer-events-none" />
    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white/5 to-transparent z-10 pointer-events-none" />

    {/* Label */}
    <p className="text-center font-body text-xs uppercase tracking-[0.25em] text-muted-foreground/50 mb-8">
      Official Partners
    </p>

    {/* Marquee track — logos duplicated 3× for seamless loop */}
    <div className="flex overflow-hidden">
      <div
        className="flex shrink-0 items-center"
        style={{
          animation: `marquee ${DURATION} linear infinite`,
          gap: "80px",
          paddingRight: "80px",
        }}
      >
        {[...sponsors, ...sponsors, ...sponsors].map((s, i) => (
          <img
            key={i}
            src={s.src}
            alt={s.alt}
            className="h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300 cursor-default shrink-0"
            draggable={false}
          />
        ))}
      </div>
    </div>

    <style>{`
      @keyframes marquee {
        from { transform: translateX(0); }
        to   { transform: translateX(calc(-100% / 3)); }
      }
    `}</style>
  </section>
);

export default SponsorsSection;
