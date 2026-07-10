import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, FileText } from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import { useEffect, useState } from "react";

const roles = [
  "Software Engineer",
  "AI Developer",
  "Embedded Systems Engineer",
  "VLSI Engineer",
];

const tags = ["AI", "FULL STACK", "EMBEDDED", "VLSI", "POWER SYSTEMS"];

function RoleRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block overflow-hidden align-bottom h-[1.2em] min-w-[16ch]">
      <motion.span
        key={i}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-100%", opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block text-brand"
      >
        {roles[i]}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const name = "KISHWAR RENGASAMY".split("");
  return (
    <section id="home" className="relative min-h-screen pt-28 md:pt-32 overflow-hidden bg-noise">
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      {/* Floating geometry */}
      <svg
        aria-hidden
        viewBox="0 0 600 600"
        className="pointer-events-none absolute -right-24 top-24 w-[520px] h-[520px] text-brand/40 animate-drift hidden md:block"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="300" cy="300" r="240" />
          <circle cx="300" cy="300" r="170" />
          <circle cx="300" cy="300" r="110" />
          <path d="M60 300 L540 300 M300 60 L300 540" />
          <path d="M120 120 L480 480 M480 120 L120 480" />
          <circle cx="60" cy="300" r="4" fill="currentColor" />
          <circle cx="540" cy="300" r="4" fill="currentColor" />
          <circle cx="300" cy="60" r="4" fill="currentColor" />
          <circle cx="300" cy="540" r="4" fill="currentColor" />
          <rect x="270" y="270" width="60" height="60" />
        </g>
      </svg>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow flex items-center gap-3"
          >
            <span className="h-px w-8 bg-foreground/40" />
            Hi, I'm
          </motion.p>

          <h1 className="mt-4 font-display font-bold uppercase leading-[0.9] tracking-[-0.03em] text-foreground text-[clamp(2.6rem,9vw,8.5rem)]">
            {name.map((c, idx) => (
              <motion.span
                key={idx}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 + idx * 0.025, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
                aria-hidden={c === " "}
              >
                {c === " " ? "\u00A0" : c}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-8 text-lg md:text-2xl text-muted-foreground font-medium"
          >
            I build as a <RoleRotator />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-semibold tracking-[0.2em] text-foreground/70"
          >
            {tags.map((t, i) => (
              <span key={t} className="flex items-center gap-5">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-brand" />}
                {t}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a href="#work" className="magnetic-btn bg-brand text-primary-foreground hover:opacity-90">
              View Work <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#contact" className="magnetic-btn border border-foreground/25 hover:border-foreground text-foreground">
              Let's Talk
            </a>
            <div className="flex items-center gap-2 ml-2">
              {[
                { href: "https://github.com/", icon: Github, label: "GitHub" },
                { href: "https://linkedin.com/", icon: Linkedin, label: "LinkedIn" },
                { href: "#", icon: FileText, label: "Resume" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="h-10 w-10 grid place-items-center rounded-full border border-foreground/20 text-foreground hover:border-brand hover:text-brand transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] w-full max-w-[460px] mx-auto">
            <div className="absolute -inset-4 border border-brand/40 rounded-sm" />
            <div className="absolute -inset-1 border border-foreground/10 rounded-sm" />
            <img
              src={portrait}
              alt="Portrait of Kishwar Rengasamy"
              width={912}
              height={1104}
              className="relative h-full w-full object-cover rounded-sm grayscale-[0.15] contrast-[1.05]"
            />
            <div className="absolute -bottom-6 -left-6 rounded-md bg-background border border-border px-4 py-3 shadow-sm">
              <p className="eyebrow">Currently</p>
              <p className="text-sm font-medium mt-1">Solar Eng. Intern · Voltaura</p>
            </div>
            <div className="absolute -top-4 -right-4 h-3 w-3 rounded-full bg-brand animate-pulse-dot" />
          </div>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative mt-24 border-y border-border/60 py-5 overflow-hidden">
        <div className="flex gap-16 whitespace-nowrap animate-marquee font-display text-3xl md:text-5xl font-semibold uppercase tracking-tight">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-16 shrink-0">
              {["Artificial Intelligence", "Embedded Systems", "VLSI Design", "Full-Stack", "Power & Renewables", "Systems Thinking"].map((w) => (
                <span key={w} className="flex items-center gap-16">
                  <span className="text-foreground/85">{w}</span>
                  <span className="text-brand">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}