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
      { threshold: 0.1 }
    );
    const items = galleryRef.current?.querySelectorAll(".gallery-item");
    items?.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-24 px-4 bg-card noise-overlay">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="badge-sticker text-lime border-lime mb-4 inline-block" style={{ transform: "rotate(2deg)" }}>MEMORIES</span>
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl text-foreground">
            THE <span className="text-gradient-festival">MOMENTS</span>
          </h2>
        </div>

        <div ref={galleryRef} className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="gallery-item opacity-0 group relative overflow-hidden rounded-xl break-inside-avoid cursor-pointer"
              style={{ animationDelay: `${i * 0.15}s`, transform: `rotate(${img.rotate})` }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="font-display text-2xl text-primary-foreground tracking-wider">VIEW MOMENT</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
