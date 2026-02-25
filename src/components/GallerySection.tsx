import { useEffect, useRef, useState } from "react";
import concert1 from "@/assets/concert1.jpg";
import concert2 from "@/assets/concert2.jpg";
import concert3 from "@/assets/concert3.jpg";
import concert4 from "@/assets/concert4.jpg";
import concert5 from "@/assets/concert5.jpg";

const images = [
  { src: concert1, alt: "Festival crowd with colorful lights", rotate: "-2deg" },
  { src: concert2, alt: "Singer performing on stage", rotate: "1deg" },
  { src: concert3, alt: "Aerial view of festival", rotate: "-1deg" },
  { src: concert4, alt: "Stage with pyrotechnics", rotate: "2deg" },
  { src: concert5, alt: "Crowd dancing at night", rotate: "-1.5deg" },
];

const GallerySection = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Header entrance
    const headerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHeaderVisible(true);
            headerObserver.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    if (headerRef.current) headerObserver.observe(headerRef.current);

    // Gallery items — track each individually
    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            setVisibleItems((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    const items = galleryRef.current?.querySelectorAll(".gallery-item");
    items?.forEach((item) => itemObserver.observe(item));

    return () => {
      headerObserver.disconnect();
      itemObserver.disconnect();
    };
  }, []);

  return (
    <section className="relative py-24 px-4 bg-card noise-overlay overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-primary/8 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-secondary/8 blur-3xl animate-float-reverse" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header — staggered fade-in */}
        <div ref={headerRef} className="text-center mb-16">
          <span
            className="badge-sticker text-lime border-lime mb-4 inline-block transition-all duration-500 ease-out"
            style={{
              transform: headerVisible ? "rotate(2deg) translateY(0)" : "rotate(2deg) translateY(-20px)",
              opacity: headerVisible ? 1 : 0,
              transitionDelay: "0ms",
            }}
          >
            MEMORIES
          </span>
          <h2
            className="font-display text-5xl sm:text-7xl md:text-8xl text-foreground transition-all duration-700 ease-out"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(28px)",
              transitionDelay: "120ms",
            }}
          >
            THE <span className="text-gradient-festival">MOMENTS</span>
          </h2>
        </div>

        {/* Gallery grid */}
        <div ref={galleryRef} className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((img, i) => {
            const isVisible = visibleItems.has(i);
            // Alternate: odd items slide from left, even from right
            const fromX = i % 2 === 0 ? "-24px" : "24px";

            return (
              <div
                key={i}
                data-index={i}
                className="gallery-item group relative overflow-hidden rounded-xl break-inside-avoid cursor-pointer"
                style={{
                  transform: isVisible
                    ? `rotate(${img.rotate}) translateY(0) translateX(0)`
                    : `rotate(${img.rotate}) translateY(40px) translateX(${fromX})`,
                  opacity: isVisible ? 1 : 0,
                  transition: `opacity 0.7s ease-out ${i * 120}ms, transform 0.7s ease-out ${i * 120}ms`,
                  // Keep the rotation on hover via CSS class
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />

                {/* Hover overlay — fades in with blur */}
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center backdrop-blur-[1px]">
                  <span
                    className="font-display text-2xl text-primary-foreground tracking-wider translate-y-3 group-hover:translate-y-0 transition-transform duration-400 ease-out"
                  >
                    VIEW MOMENT
                  </span>
                </div>

                {/* Bottom gradient always present */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
