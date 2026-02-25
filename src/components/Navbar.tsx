import { useState, useEffect } from "react";
import logo from "@/assets/logo.jpeg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/40 backdrop-blur-xl border-b border-border/60 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <img src={logo} alt="Supernova Show Tour" className="h-8 md:h-10" />
        <div className="hidden md:flex items-center gap-8 font-body text-sm uppercase tracking-wider">
          <a href="#tour-dates" className="text-muted-foreground hover:text-foreground transition-colors">Dates</a>
          <a href="#gallery" className="text-muted-foreground hover:text-foreground transition-colors">Gallery</a>
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
        </div>
        <a
          href="#tour-dates"
          className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-body font-bold text-sm uppercase tracking-wider hover:shadow-neon-pink transition-all duration-300"
        >
          Dafina Zeqiri
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
