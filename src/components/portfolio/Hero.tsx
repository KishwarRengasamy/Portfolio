import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, FileText, ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

const roles = [
  "Software Engineer",
  "Embedded Systems Engineer",
  "VLSI Engineer",
];

const tags = ["FULL STACK", "EMBEDDED", "VLSI"];

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
  return (
    <section id="home" className="relative min-h-screen pt-28 md:pt-36 pb-20 overflow-hidden bg-noise">
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />

      {/* Geometric bracket motif — top right */}
      <svg
        aria-hidden
        viewBox="0 0 600 600"
        className="pointer-events-none absolute -right-16 -top-10 w-[560px] h-[560px] text-brand/70 animate-drift hidden md:block"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M40 60 L260 60 L260 40 L360 40 L360 60 L560 60 L560 200 L520 200 L520 100 L360 100 L360 80 L260 80 L260 100 L80 100 L80 240 L40 240 Z" />
          <path d="M120 300 L200 300 L200 340 L280 340" />
          <circle cx="120" cy="300" r="3" fill="currentColor" />
          <circle cx="280" cy="340" r="3" fill="currentColor" />
        </g>
      </svg>

      {/* Angular arrow motif — bottom left */}
      <svg
        aria-hidden
        viewBox="0 0 500 500"
        className="pointer-events-none absolute -left-20 bottom-24 w-[440px] h-[440px] text-brand/60 hidden md:block"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M60 320 L220 320 L220 260 L340 260 L340 320 L460 320" />
          <path d="M100 400 L260 400 L260 360 L380 360" />
          <circle cx="60" cy="320" r="3" fill="currentColor" />
          <circle cx="460" cy="320" r="3" fill="currentColor" />
          <rect x="200" y="180" width="40" height="40" />
        </g>
      </svg>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Two-column layout: text left, photo right */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12 md:gap-8">

          {/* LEFT — text content */}
          <div className="flex-1 min-w-0">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow flex items-center gap-3"
            >
              <span className="h-px w-8 bg-foreground/40" />
              Hi, I'm
            </motion.p>

            <h1 className="mt-4 font-display font-bold uppercase leading-[0.88] tracking-[-0.035em] text-foreground text-[clamp(2.8rem,8vw,8rem)]">
              {"KISHWAR\nRENGASAMY".split("\n").map((line, idx) => (
                <motion.span
                  key={idx}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + idx * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-8 text-lg md:text-2xl text-foreground/75 font-medium"
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
              <a href="#work" className="magnetic-btn bg-foreground text-background hover:bg-brand">
                View Projects <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="#contact" className="magnetic-btn border border-foreground/25 hover:border-foreground text-foreground">
                Let's Talk
              </a>
              <div className="flex items-center gap-2 ml-2">
                {[
                  { href: "https://github.com/KishwarRengasamy", icon: Github, label: "GitHub", download: false },
                  { href: "https://www.linkedin.com/in/kishwar-rengasamy", icon: Linkedin, label: "LinkedIn", download: false },
                  { href: "/resume.pdf", icon: FileText, label: "Resume", download: true },
                ].map(({ href, icon: Icon, label, download }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...(download ? { download: "KISHWAR_RENGASAMY_Resume.pdf" } : {})}
                    className="h-10 w-10 grid place-items-center rounded-full border border-foreground/20 text-foreground hover:border-brand hover:text-brand transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — portrait photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 flex justify-center md:justify-end order-first md:order-last"
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
              {/* Rotating dashed ring decoration */}
              <div className="absolute -inset-3 rounded-full border-2 border-dashed border-brand/30 animate-spin" style={{ animationDuration: '18s' }} />
              {/* Solid glow ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-brand/40 via-brand/10 to-transparent blur-sm" />
              {/* Photo */}
              <img
                src="/kishwar.jpg"
                alt="Kishwar Rengasamy"
                className="relative w-full h-full object-cover object-top rounded-full border-2 border-brand/40 shadow-2xl"
              />
              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-2 bg-background border border-border rounded-full px-4 py-1.5 text-[11px] font-semibold shadow-lg"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Open to opportunities
              </motion.div>
            </div>
          </motion.div>

        </div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mt-16 md:mt-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-8 flex md:flex-col items-center gap-2 text-[10px] font-semibold tracking-[0.3em] text-foreground/50 hover:text-brand transition-colors"
        >
          SCROLL
          <ArrowDown className="h-4 w-4 animate-pulse-dot" />
        </motion.a>
      </div>

      {/* Marquee */}
      <div className="relative mt-24 border-y border-border/60 py-5 overflow-hidden">
        <div className="flex gap-16 whitespace-nowrap animate-marquee font-display text-3xl md:text-5xl font-semibold uppercase tracking-tight">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-16 shrink-0">
              {["Embedded Systems", "VLSI Design", "Full-Stack", "Power & Renewables", "Systems Thinking"].map((w) => (
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