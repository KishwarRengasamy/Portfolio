import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "./SectionHeader";

type Project = {
  title: string;
  subtitle?: string;
  pitch: string;
  domain: "Embedded/IoT" | "AI" | "Full-Stack" | "Sustainability";
  year: string;
  stack: string[];
  accent: string;
  visual: "neuro" | "micro" | "dora" | "solar" | "vault";
};

const projects: Project[] = [
  {
    title: "NeuroSense",
    subtitle: "Identifying latent emotional stress through multi-sensor physiological signal correlation and cloud analytics.",
    pitch:
      "A wearable smart glove that continuously monitors hand tremor, heart rate, and SpO₂ using multi-sensor fusion on an ESP32. Cloud analytics correlate signals in real time to surface latent stress markers before they escalate.",
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
    domain: "Sustainability",
    year: "2024",
    stack: ["Raspberry Pi", "IoT", "Python", "Sensors", "Chitosan", "Biochar"],
    accent: "#FF5A36",
    visual: "vault",
  },
];

const filters = ["All", "Embedded/IoT", "AI", "Full-Stack", "Sustainability"] as const;
type Filter = (typeof filters)[number];

function ProjectVisual({ kind, accent }: { kind: Project["visual"]; accent: string }) {
  if (kind === "neuro") {
    return (
      <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full">
        <rect width="800" height="500" fill="#F1EFEA" />
        <g stroke={accent} strokeWidth="1.2" fill="none">
          <path d="M60 260 L180 260 L200 220 L240 300 L280 180 L320 340 L360 260 L520 260" />
          <path d="M60 360 L200 360 L220 330 L260 390 L300 340 L520 340" opacity="0.5" />
          <circle cx="600" cy="240" r="70" />
          <circle cx="600" cy="240" r="40" />
          <path d="M560 240 L640 240 M600 200 L600 280" />
          <rect x="80" y="120" width="180" height="80" rx="4" />
          <text x="100" y="160" fontFamily="monospace" fontSize="14" fill={accent}>ESP32 · MPU6050</text>
          <text x="100" y="180" fontFamily="monospace" fontSize="12" fill={accent} opacity="0.7">HR · SpO₂ · TREMOR</text>
        </g>
      </svg>
    );
  }
  if (kind === "micro") {
    return (
      <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full">
        <rect width="800" height="500" fill="#F1EFEA" />
        <g stroke={accent} strokeWidth="1.2" fill="none">
          <circle cx="400" cy="250" r="180" />
          <circle cx="400" cy="250" r="120" />
          <circle cx="400" cy="250" r="60" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const x = 400 + Math.cos(a) * 210;
            const y = 250 + Math.sin(a) * 210;
            return <circle key={i} cx={x} cy={y} r="3" fill={accent} />;
          })}
          <rect x="60" y="60" width="140" height="24" />
          <text x="72" y="78" fontFamily="monospace" fontSize="12" fill={accent}>ESP32-CAM</text>
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
          <circle cx="40" cy="400" r="6" fill={accent} />
          <circle cx="380" cy="320" r="6" fill={accent} />
          <circle cx="760" cy="200" r="6" fill={accent} />
          <path d="M80 80 L160 80 L160 140 L80 140 Z" />
          <path d="M110 80 L110 60 L130 60 L130 80" />
          <text x="88" y="115" fontFamily="monospace" fontSize="12" fill={accent}>GPS · LIVE</text>
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
          <circle cx="640" cy="90" r="42" />
          <circle cx="640" cy="90" r="70" opacity="0.6" />
          <path d="M40 380 Q400 340 760 380" strokeWidth="1.5" />
        </g>
      </svg>
    );
  }
  // vault
  return (
    <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full">
      <rect width="800" height="500" fill="#F1EFEA" />
      <g stroke={accent} strokeWidth="1.2" fill="none">
        <rect x="220" y="100" width="360" height="300" rx="10" />
        <path d="M240 140 Q400 100 560 140" />
        <path d="M240 380 Q400 340 560 380" opacity="0.5" />
        <circle cx="400" cy="250" r="70" />
        <path d="M370 250 L390 270 L430 220" strokeWidth="2" />
        <text x="240" y="90" fontFamily="monospace" fontSize="12" fill={accent}>TEMP · RH · CO₂ · C₂H₄</text>
      </g>
    </svg>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = projects.filter((p) => filter === "All" || p.domain === filter);

  return (
    <section id="work" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-20">
          <div>
            <p className="eyebrow flex items-center gap-3">
              <span className="text-brand">02</span>
              <span className="h-px w-8 bg-foreground/30" />
              Selected Projects
            </p>
            <h2 className="mt-4 font-display font-bold text-foreground text-[clamp(2rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.02em]">
              Things I've<br/>actually shipped.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-colors ${
                  filter === f
                    ? "border-brand bg-brand text-primary-foreground"
                    : "border-foreground/20 text-foreground/70 hover:border-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
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
              <div className="lg:col-span-7 relative group">
                <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-border">
                  <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
                    <ProjectVisual kind={p.visual} accent={p.accent} />
                  </div>
                  <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-background/90 border border-border px-3 py-1 text-[11px] uppercase tracking-widest text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.accent }} />
                    {p.domain}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <p className="eyebrow">{p.year}</p>
                <h3 className="mt-3 font-display text-3xl md:text-4xl font-bold text-foreground leading-[1.05]">
                  {p.title}
                </h3>
                {p.subtitle && (
                  <p className="mt-2 text-brand text-sm font-medium tracking-wide">{p.subtitle}</p>
                )}
                <p className="mt-4 text-muted-foreground text-base leading-relaxed">{p.pitch}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-full border border-border px-3 py-1 text-[11px] text-foreground/80">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#" className="magnetic-btn bg-foreground text-background hover:bg-brand text-[12px] py-2.5 px-4">
                    Case Study <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a href="#" className="magnetic-btn border border-foreground/25 text-foreground hover:border-brand hover:text-brand text-[12px] py-2.5 px-4">
                    <Github className="h-4 w-4" /> Repo
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}