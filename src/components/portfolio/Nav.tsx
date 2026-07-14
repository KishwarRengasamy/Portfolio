import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const NAVBAR_H = 68; // nav h-16 = 64px + a few px breathing room

    const updateActive = () => {
      setScrolled(window.scrollY > 60);

      // Walk sections in order; the last one whose top is above the trigger
      // line (scrollY + navbar) is the currently-active section.
      const scrollY = window.scrollY + NAVBAR_H + 8;
      let current = links[0].id;
      for (const { id } of links) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      }
      setActive(current);
    };

    updateActive(); // run once on mount
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, []);


  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border/60"
          : "bg-background/80"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#home" className="group flex items-center gap-2" aria-label="Kishwar Rengasamy home">
          <span className="relative inline-flex h-9 w-9 items-center justify-center">
            <img
              src="/rk_logo.png"
              alt="RK"
              className="h-8 w-8 object-contain select-none"
            />
            <span className="absolute -bottom-1 -right-1 h-1.5 w-1.5 rounded-full bg-brand animate-pulse-dot" />
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setActive(l.id)}
              className="relative px-3 py-2 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
              {active === l.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-3 -bottom-0.5 h-px bg-brand"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="magnetic-btn bg-foreground text-background hover:bg-brand hover:text-brand-foreground text-[12px] py-2.5 px-4"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse-dot" />
          Let's Talk
        </a>
      </div>
    </header>
  );
}