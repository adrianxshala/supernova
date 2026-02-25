import { useRef, useCallback } from "react";

const CTASection = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

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
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Animated gradient background */}
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

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h2 className="font-display text-6xl sm:text-8xl md:text-9xl text-foreground leading-[0.85] mb-4">
          DON'T MISS
          <br />
          <span className="text-gradient-festival">THE SHOW</span>
        </h2>
        <p className="font-body text-xl text-muted-foreground mb-12 max-w-lg mx-auto">
          Tickets are selling fast. Secure your spot at the biggest tour of 2026.
        </p>

        <div className="relative inline-block">
          <button
            ref={buttonRef}
            onMouseEnter={createConfetti}
            className="px-12 py-6 text-xl font-bold uppercase tracking-wider rounded-full bg-gradient-festival text-foreground shadow-neon-pink hover:scale-110 transition-all duration-300 hover:shadow-[0_0_60px_hsl(342,95%,59%/0.5)] font-body"
          >
            Get Tickets Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
