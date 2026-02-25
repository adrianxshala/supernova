import { useEffect, useRef } from "react";

const tourDates = [
  { city: "Los Angeles", venue: "SoFi Stadium", date: "JUN 14", status: "on-sale" },
  { city: "New York", venue: "Madison Square Garden", date: "JUN 21", status: "on-sale" },
  { city: "Chicago", venue: "United Center", date: "JUN 28", status: "on-sale" },
  { city: "Miami", venue: "Hard Rock Stadium", date: "JUL 5", status: "limited" },
  { city: "Toronto", venue: "Scotiabank Arena", date: "JUL 12", status: "on-sale" },
  { city: "London", venue: "O2 Arena", date: "JUL 19", status: "on-sale" },
  { city: "Berlin", venue: "Mercedes-Benz Arena", date: "JUL 26", status: "limited" },
  { city: "Tokyo", venue: "Tokyo Dome", date: "AUG 2", status: "on-sale" },
];

const TourDatesSection = () => {
  const cardsRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const cards = cardsRef.current?.querySelectorAll(".tour-card");
    cards?.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="tour-dates" className="relative py-24 px-4 bg-background noise-overlay">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="badge-sticker text-accent border-accent mb-4 inline-block">ON TOUR</span>
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl text-foreground mb-4">
            TOUR <span className="text-gradient-festival">DATES</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg">Catch the energy in a city near you</p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tourDates.map((show, i) => (
            <div
              key={i}
              className="tour-card opacity-0 group relative overflow-hidden rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-neon-pink cursor-pointer"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-5">
                  <div className="text-center min-w-[70px]">
                    <div className="font-display text-3xl text-primary leading-none">{show.date.split(" ")[0]}</div>
                    <div className="font-display text-xl text-foreground">{show.date.split(" ")[1]}</div>
                  </div>
                  <div className="h-12 w-px bg-border" />
                  <div>
                    <h3 className="font-display text-2xl text-foreground">{show.city}</h3>
                    <p className="font-body text-muted-foreground text-sm">{show.venue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {show.status === "limited" && (
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary font-body">Few Left</span>
                  )}
                  <button className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-body font-bold text-sm uppercase tracking-wider hover:shadow-neon-pink transition-all duration-300 whitespace-nowrap">
                    Buy Tickets
                  </button>
                </div>
              </div>
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourDatesSection;
