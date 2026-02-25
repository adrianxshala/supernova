import { useEffect, useRef, useState, useCallback } from "react";
import concert1 from "@/assets/fb1.jpeg";
import concert2 from "@/assets/fb4.jpeg";
import concert3 from "@/assets/fb2.jpeg";
import concert4 from "@/assets/dafi4.jpeg";
import concert5 from "@/assets/fb3.jpeg";

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
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
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

  // Close on Escape, navigate with arrow keys
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((p) => (p !== null ? (p + 1) % images.length : null));
      if (e.key === "ArrowLeft")  setLightbox((p) => (p !== null ? (p - 1 + images.length) % images.length : null));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const prev = useCallback(() => setLightbox((p) => (p !== null ? (p - 1 + images.length) % images.length : null)), []);
  const next = useCallback(() => setLightbox((p) => (p !== null ? (p + 1) % images.length : null)), []);

  return (
    <section className="relative py-24 px-4 bg-card noise-overlay overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-primary/8 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-secondary/8 blur-3xl animate-float-reverse" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span
            className="badge-sticker text-lime border-lime mb-4 inline-block transition-all duration-500 ease-out"
            style={{
              transform: headerVisible ? "rotate(2deg) translateY(0)" : "rotate(2deg) translateY(-20px)",
              opacity: headerVisible ? 1 : 0,
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
            const fromX = i % 2 === 0 ? "-24px" : "24px";
            return (
              <div
                key={i}
                data-index={i}
                onClick={() => setLightbox(i)}
                className="gallery-item group relative overflow-hidden rounded-xl break-inside-avoid cursor-zoom-in"
                style={{
                  transform: isVisible
                    ? `rotate(${img.rotate}) translateY(0) translateX(0)`
                    : `rotate(${img.rotate}) translateY(40px) translateX(${fromX})`,
                  opacity: isVisible ? 1 : 0,
                  transition: `opacity 0.7s ease-out ${i * 120}ms, transform 0.7s ease-out ${i * 120}ms`,
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[1px]">
                  <span className="font-display text-2xl text-primary-foreground tracking-wider translate-y-3 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    VIEW MOMENT
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          style={{ animation: "fadeIn 0.25s ease-out" }}
          onClick={() => setLightbox(null)}
        >
          {/* Image container — stop propagation so clicking image doesn't close */}
          <div
            className="relative max-w-[92vw] max-h-[90vh] flex items-center justify-center"
            style={{ animation: "scaleIn 0.3s cubic-bezier(0.22,1,0.36,1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightbox].src}
              alt={images[lightbox].alt}
              className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl"
            />

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-body text-sm text-white/70 tracking-widest">
              {lightbox + 1} / {images.length}
            </div>
          </div>

          {/* Prev button */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
            aria-label="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Close button */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      {/* Lightbox keyframes */}
      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.92) } to { opacity: 1; transform: scale(1) } }
      `}</style>
    </section>
  );
};

export default GallerySection;
