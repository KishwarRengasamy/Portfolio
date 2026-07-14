import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "./SectionHeader";

/* ─── Types ─────────────────────────────────────────── */
type Project = {
  title: string;
  subtitle?: string;
  pitch: string;
  pitchHighlights: string[];
  domain: "Embedded/IoT" | "AI" | "Full-Stack" | "Sustainability";
  year: string;
  stack: string[];
  accent: string;
  visual: "neuro" | "micro" | "dora" | "solar" | "vault";
};

/* ─── Data ───────────────────────────────────────────── */
const projects: Project[] = [
  {
    title: "NeuroSense",
    subtitle:
      "Identifying latent emotional stress through multi-sensor physiological signal correlation and cloud analytics.",
    pitch:
      "A wearable smart glove that continuously monitors hand tremor, heart rate, and SpO₂ using multi-sensor fusion on an ESP32. Cloud analytics correlate signals in real time to surface latent stress markers before they escalate.",
    pitchHighlights: ["smart glove", "multi-sensor fusion", "latent stress markers"],
    domain: "Embedded/IoT",
    year: "2025",
    stack: ["ESP32", "IoT", "MPU6050", "MAX30102", "Embedded C", "Cloud"],
    accent: "#FF5A36",
    visual: "neuro",
  },
  {
    title: "Hybrid Microplastic Detection",
    subtitle: "In oil and water, on-device.",
    pitch:
      "An affordable TinyML embedded system that detects microplastics in water and oil samples using an ESP32-CAM paired with a macro lens. On-device inference plus a Gen AI API layer make it a portable, scalable environmental monitoring tool.",
    pitchHighlights: ["TinyML", "On-device inference", "Gen AI API"],
    domain: "AI",
    year: "2025",
    stack: ["Python", "TinyML", "ESP32-CAM", "Macrolens", "Gen AI API"],
    accent: "#FF5A36",
    visual: "micro",
  },
  {
    title: "DORA",
    subtitle: "AI-powered smart travel assistant for transport analytics.",
    pitch:
      "A travel assistance platform that automatically captures trip data for transport research. GPS-based live tracking, offline alerts, multilingual support, AI-driven travel-mode prediction, and encrypted transmission feed cloud analytics that turn journeys into mobility insight.",
    pitchHighlights: [
      "GPS-based live tracking",
      "AI-driven travel-mode prediction",
      "mobility insight",
    ],
    domain: "Full-Stack",
    year: "2025",
    stack: ["Flutter", "Dart", "React", "Python", "MongoDB", "Google Maps API"],
    accent: "#FF5A36",
    visual: "dora",
  },
  {
    title: "Hybrid Dual-Brush Solar Cleaning Robot",
    subtitle: "Water-free PV panel efficiency for utility-scale sites.",
    pitch:
      "An autonomous, water-free solar panel cleaning robot powered by a hybrid energy system combining solar charging and a rechargeable battery. Dual rotating brushes clear dust; IR edge sensors keep the rover safely on the array.",
    pitchHighlights: ["water-free", "Dual rotating brushes", "IR edge sensors"],
    domain: "Sustainability",
    year: "2025",
    stack: ["Arduino", "ESP32", "Embedded C", "IoT", "Solar", "IR Sensors"],
    accent: "#FF5A36",
    visual: "solar",
  },
  {
    title: "Nutri Vault",
    subtitle: "Smart onion storage system for post-harvest loss reduction.",
    pitch:
      "A low-cost smart storage system combining chitosan coating, biochar sachets, and IoT-based environmental monitoring to extend onion shelf life. Continuous temperature, humidity, CO₂, and ethylene tracking is exposed to farmers via a mobile interface.",
    pitchHighlights: [
      "chitosan coating",
      "post-harvest loss",
      "IoT-based environmental monitoring",
    ],
    domain: "Sustainability",
    year: "2024",
    stack: ["Raspberry Pi", "IoT", "Python", "Sensors", "Chitosan", "Biochar"],
    accent: "#FF5A36",
    visual: "vault",
  },
];

const filters = ["All", "Embedded/IoT", "AI", "Full-Stack", "Sustainability"] as const;
type Filter = (typeof filters)[number];

/* ─── Floating background orbs ───────────────────────── */
function BackgroundOrbs() {
  const orbs = [
    { color: "#FF5A3622", x: "5%", y: "10%", size: 400, dx: 40, dy: 30, dur: 14 },
    { color: "#4274D918", x: "70%", y: "50%", size: 350, dx: -30, dy: 40, dur: 18 },
    { color: "#FF5A3614", x: "45%", y: "80%", size: 300, dx: 20, dy: -25, dur: 12 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: o.x,
            top: o.y,
            width: o.size,
            height: o.size,
            background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
          }}
          animate={{ x: [0, o.dx, 0], y: [0, o.dy, 0] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
        />
      ))}
    </div>
  );
}

/* ─── Cycling word (loops through synonyms) ──────────── */
const cycleWords = ["shipped.", "built.", "launched.", "made real.", "forged."];
function CyclingWord() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((n) => (n + 1) % cycleWords.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-flex overflow-hidden align-bottom h-[1.05em]">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          className="text-brand block"
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-110%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {cycleWords[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ─── ScrambleText — letter scramble on hover ─────────── */
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!$%";
function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [output, setOutput] = useState(text);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!hovered) {
      setOutput(text);
      return;
    }
    let frame = 0;
    const TOTAL = 22;
    timerRef.current = setInterval(() => {
      setOutput(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            return frame / TOTAL > i / text.length
              ? ch
              : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join(""),
      );
      frame++;
      if (frame > TOTAL) {
        clearInterval(timerRef.current!);
        setOutput(text);
      }
    }, 28);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hovered, text]);

  return (
    <span
      className={`cursor-default select-none ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {output}
    </span>
  );
}

/* ─── Highlighted keyword in pitch ───────────────────── */
function markText(text: string, terms: string[]): React.ReactNode[] {
  let parts: (string | React.ReactElement)[] = [text];
  terms.forEach((term, ti) => {
    parts = parts.flatMap((part, pi) => {
      if (typeof part !== "string") return [part];
      const idx = part.toLowerCase().indexOf(term.toLowerCase());
      if (idx === -1) return [part];
      const match = part.slice(idx, idx + term.length);
      return [
        part.slice(0, idx),
        <motion.span
          key={`${ti}-${pi}`}
          className="relative inline text-foreground font-semibold"
          whileHover={{ color: "#FF5A36" }}
        >
          {match}
          <motion.span
            className="absolute bottom-0 left-0 h-px bg-brand origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 + ti * 0.15 }}
            style={{ width: "100%" }}
          />
        </motion.span>,
        part.slice(idx + term.length),
      ];
    });
  });
  return parts;
}

/* ─── Live dot on domain badge ───────────────────────── */
function LiveDot({ color }: { color: string }) {
  return (
    <motion.span
      className="h-1.5 w-1.5 rounded-full"
      style={{ background: color }}
      animate={{ opacity: [1, 0.2, 1] }}
      transition={{ duration: 1.4, repeat: Infinity }}
    />
  );
}

/* ─── Stack tag ──────────────────────────────────────── */
function StackTag({ label, delay }: { label: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.08, borderColor: "#FF5A36", color: "#FF5A36" }}
      className="rounded-full border border-border px-3 py-1 text-[11px] text-foreground/80 cursor-default transition-colors"
    >
      {label}
    </motion.span>
  );
}

/* ─── Animated SVG visuals ───────────────────────────── */
function ProjectVisual({ kind, accent }: { kind: Project["visual"]; accent: string }) {
  if (kind === "neuro") {
    return (
      <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full">
        <rect width="800" height="500" fill="#F1EFEA" />
        <g stroke={accent} strokeWidth="1.2" fill="none">
          <motion.path
            d="M60 260 L180 260 L200 220 L240 300 L280 180 L320 340 L360 260 L520 260"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
          />
          <path d="M60 360 L200 360 L220 330 L260 390 L300 340 L520 340" opacity="0.5" />
          <motion.circle
            cx="600"
            cy="240"
            r="70"
            animate={{ r: [60, 75, 60], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          />
          <circle cx="600" cy="240" r="40" />
          <path d="M560 240 L640 240 M600 200 L600 280" />
          <rect x="80" y="120" width="180" height="80" rx="4" />
          <text x="100" y="160" fontFamily="monospace" fontSize="14" fill={accent}>
            ESP32 · MPU6050
          </text>
          <text x="100" y="180" fontFamily="monospace" fontSize="12" fill={accent} opacity="0.7">
            HR · SpO₂ · TREMOR
          </text>
          <motion.circle
            cx="600"
            cy="240"
            r="6"
            fill={accent}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        </g>
      </svg>
    );
  }
  if (kind === "micro") {
    return (
      <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full">
        <rect width="800" height="500" fill="#F1EFEA" />
        <g stroke={accent} strokeWidth="1.2" fill="none">
          <motion.circle
            cx="400"
            cy="250"
            r="180"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            style={{ originX: "400px", originY: "250px" }}
          />
          <circle cx="400" cy="250" r="120" />
          <motion.circle
            cx="400"
            cy="250"
            r="60"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ originX: "400px", originY: "250px" }}
          />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return (
              <motion.circle
                key={i}
                cx={400 + Math.cos(a) * 210}
                cy={250 + Math.sin(a) * 210}
                r="3"
                fill={accent}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.16 }}
              />
            );
          })}
          <rect x="60" y="60" width="140" height="24" />
          <text x="72" y="78" fontFamily="monospace" fontSize="12" fill={accent}>
            ESP32-CAM
          </text>
        </g>
      </svg>
    );
  }
  if (kind === "dora") {
    return (
      <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full">
        <rect width="800" height="500" fill="#F1EFEA" />
        <g stroke={accent} strokeWidth="1.2" fill="none">
          <path d="M40 400 Q200 260 380 320 T760 200" strokeWidth="2" />
          <motion.circle
            r="7"
            fill={accent}
            animate={{
              cx: [40, 200, 380, 570, 760],
              cy: [400, 310, 320, 260, 200],
              opacity: [0, 1, 1, 1, 0],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
          />
          <circle cx="40" cy="400" r="6" fill={accent} />
          <circle cx="380" cy="320" r="6" fill={accent} />
          <circle cx="760" cy="200" r="6" fill={accent} />
          <path d="M80 80 L160 80 L160 140 L80 140 Z" />
          <path d="M110 80 L110 60 L130 60 L130 80" />
          <motion.circle
            cx="120"
            cy="55"
            r="4"
            fill={accent}
            animate={{ opacity: [1, 0, 1], r: [4, 8, 4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <text x="88" y="115" fontFamily="monospace" fontSize="12" fill={accent}>
            GPS · LIVE
          </text>
        </g>
      </svg>
    );
  }
  if (kind === "solar") {
    return (
      <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full">
        <rect width="800" height="500" fill="#F1EFEA" />
        <g stroke={accent} strokeWidth="1.2" fill="none">
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={i} transform={`translate(${100 + i * 100}, 120) rotate(-15)`}>
              <rect x="0" y="0" width="80" height="240" />
              {Array.from({ length: 6 }).map((__, j) => (
                <line key={j} x1="0" y1={j * 40} x2="80" y2={j * 40} />
              ))}
              <line x1="40" y1="0" x2="40" y2="240" />
            </g>
          ))}
          <motion.g
            style={{ originX: "640px", originY: "90px" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i / 8) * Math.PI * 2;
              return (
                <line
                  key={i}
                  x1={640 + Math.cos(a) * 48}
                  y1={90 + Math.sin(a) * 48}
                  x2={640 + Math.cos(a) * 76}
                  y2={90 + Math.sin(a) * 76}
                  strokeWidth="2"
                />
              );
            })}
          </motion.g>
          <circle cx="640" cy="90" r="42" />
          <circle cx="640" cy="90" r="70" opacity="0.6" />
          <motion.path
            d="M40 380 Q400 340 760 380"
            strokeWidth="1.5"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full">
      <rect width="800" height="500" fill="#F1EFEA" />
      <g stroke={accent} strokeWidth="1.2" fill="none">
        <rect x="220" y="100" width="360" height="300" rx="10" />
        <path d="M240 140 Q400 100 560 140" />
        <path d="M240 380 Q400 340 560 380" opacity="0.5" />
        <motion.circle
          cx="400"
          cy="250"
          r="70"
          animate={{ r: [65, 72, 65], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        />
        <path d="M370 250 L390 270 L430 220" strokeWidth="2" />
        <text x="240" y="90" fontFamily="monospace" fontSize="12" fill={accent}>
          TEMP · RH · CO₂ · C₂H₄
        </text>
        <motion.text
          x="240"
          y="460"
          fontFamily="monospace"
          fontSize="11"
          fill={accent}
          opacity="0.6"
          animate={{ x: [240, -100] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          28.4°C · 62% RH · CO₂ 412ppm · C₂H₄ 0.8ppm — OPTIMAL
        </motion.text>
      </g>
    </svg>
  );
}

/* ─── Main export ─────────────────────────────────────── */
export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = projects.filter((p) => filter === "All" || p.domain === filter);

  return (
    <section id="work" className="relative pt-6 pb-20 md:pt-8 md:pb-28 overflow-hidden">
      {/* Animated background orbs */}
      <BackgroundOrbs />
      <div className="absolute inset-0 bg-grid opacity-[0.12] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="eyebrow flex items-center gap-3"
            >
              <span className="text-brand">02</span>
              <span className="h-px w-8 bg-foreground/30" />
              Selected Projects
            </motion.p>
            {/* Section heading with cycling last word */}
            <h2 className="mt-4 font-display font-bold text-foreground text-[clamp(2rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.02em]">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="block"
              >
                Things I've
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="block"
              >
                actually <CyclingWord />
              </motion.span>
            </h2>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <motion.button
                key={f}
                onClick={() => setFilter(f)}
                whileTap={{ scale: 0.94 }}
                className={`rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-colors ${
                  filter === f
                    ? "border-brand bg-brand text-primary-foreground"
                    : "border-foreground/20 text-foreground/70 hover:border-foreground hover:text-foreground"
                }`}
              >
                {f}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="space-y-16 md:space-y-24">
          {visible.map((p, i) => (
            <motion.article
              layout
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                i % 2 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Visual */}
              <div className="lg:col-span-7 relative group">
                <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-border">
                  <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
                    <ProjectVisual kind={p.visual} accent={p.accent} />
                  </div>
                  <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-background/90 border border-border px-3 py-1 text-[11px] uppercase tracking-widest text-foreground">
                    <LiveDot color={p.accent} />
                    {p.domain}
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="lg:col-span-5">
                <p className="eyebrow">{p.year}</p>

                {/* Scramble title on hover */}
                <h3 className="mt-3 font-display text-3xl md:text-4xl font-bold text-foreground leading-[1.05]">
                  <ScrambleText text={p.title} />
                </h3>

                {p.subtitle && (
                  <motion.p
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="mt-2 text-brand text-sm font-medium tracking-wide"
                  >
                    {p.subtitle}
                  </motion.p>
                )}

                {/* Pitch with highlighted keywords */}
                <p className="mt-4 text-muted-foreground text-base leading-relaxed">
                  {markText(p.pitch, p.pitchHighlights)}
                </p>

                {/* Stack tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((s, si) => (
                    <StackTag key={s} label={s} delay={si * 0.06} />
                  ))}
                </div>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="magnetic-btn bg-foreground text-background hover:bg-brand text-[12px] py-2.5 px-4"
                  >
                    Case Study <ArrowUpRight className="h-4 w-4" />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="magnetic-btn border border-foreground/25 text-foreground hover:border-brand hover:text-brand text-[12px] py-2.5 px-4"
                  >
                    <Github className="h-4 w-4" /> Repo
                  </motion.a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
