import { useEffect, useRef, useState } from "react";

const tourDates = [
  { city: "Hamburg", venue: "Freiheit 36", date: "APR 10", status: "on-sale" },
  { city: "Cologne ", venue: "Sartory", date: "APR 11", status: "on-sale" },
  { city: "Frankfurt", venue: "Batschkapp", date: "APR 12", status: "on-sale" },
  { city: "Munchen", venue: "Zenith Halle", date: "APR 19", status: "limited" },
  { city: "Berlin ", venue: "Colombia Halle", date: "APR 25", status: "on-sale" },
  { city: "Stuttgart  ", venue: "MHP Arena", date: "APR 26", status: "on-sale" },
];

const TourDatesSection = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

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

    // Cards staggered entrance
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const cards = cardsRef.current?.querySelectorAll(".tour-card");
    cards?.forEach((card) => cardObserver.observe(card));

    return () => {
      headerObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  return (
    <section id="tour-dates" className="relative py-24 px-4 bg-background noise-overlay">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header — staggered fade-in on scroll */}
        <div ref={headerRef} className="text-center mb-16">
          <span
            className="badge-sticker text-accent border-accent mb-4 inline-block transition-all duration-500 ease-out"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(-16px)",
              transitionDelay: "0ms",
            }}
          >
            ON TOUR
          </span>
          <h2
            className="font-display text-5xl sm:text-7xl md:text-8xl text-foreground mb-4 transition-all duration-700 ease-out"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "100ms",
            }}
          >
            TOUR <span className="text-gradient-festival">DATES</span>
          </h2>
          <p
            className="font-body text-muted-foreground text-lg transition-all duration-700 ease-out"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(16px)",
              transitionDelay: "220ms",
            }}
          >
            Catch the energy in a city near you
          </p>
        </div>

        {/* Cards grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tourDates.map((show, i) => (
            <div
              key={i}
              className="tour-card opacity-0 group relative overflow-hidden rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-neon-pink cursor-pointer"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-center justify-between gap-4">

                {/* Left: date + divider + city */}
                <div className="flex items-center gap-5 flex-1 min-w-0">

                  {/* Date block — scales up on card hover */}
                  <div className="text-center min-w-[70px] shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <div className="font-display text-3xl text-primary leading-none">{show.date.split(" ")[0]}</div>
                    <div className="font-display text-xl text-foreground">{show.date.split(" ")[1]}</div>
                  </div>

                  {/* Divider — color shifts on hover */}
                  <div className="h-12 w-px shrink-0 bg-border group-hover:bg-primary/50 transition-colors duration-300" />

                  {/* City & venue — city name color shifts on hover */}
                  <div className="min-w-0">
                    <h3 className="font-display text-2xl text-foreground group-hover:text-primary transition-colors duration-300">
                      {show.city}
                    </h3>
                    <p className="font-body text-muted-foreground text-sm">{show.venue}</p>
                  </div>
                </div>

                {/* Right: button with shimmer sweep */}
                <div className="flex items-center justify-end w-[110px] shrink-0">
                  <button className="relative overflow-hidden px-4 py-1.5 rounded-full bg-primary text-primary-foreground font-body font-bold text-xs uppercase tracking-wider hover:shadow-neon-pink transition-all duration-300 whitespace-nowrap group/btn">
                    <span className="relative z-10">Buy </span>
                    {/* Shimmer sweep on hover */}
                    <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none" />
                  </button>
                </div>
              </div>

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Bottom border reveal on hover */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-primary/70 via-secondary/70 to-primary/70 transition-all duration-500 ease-out" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourDatesSection;
