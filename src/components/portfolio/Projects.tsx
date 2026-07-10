import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "./SectionHeader";

type Project = {
  title: string;
  pitch: string;
  domain: "AI/ML" | "Embedded" | "Full-Stack";
  year: string;
  stack: string[];
  accent: string;
  visual: "solar" | "vault" | "fraud";
};

const projects: Project[] = [
  {
    title: "AI Smart Solar Cleaning Robot",
    pitch: "Autonomous rover that keeps solar arrays at peak output using computer vision and embedded control.",
    domain: "Embedded",
    year: "2025",
    stack: ["ESP32", "OpenCV", "Embedded C", "TinyML", "Solar"],
    accent: "#FF5A36",
    visual: "solar",
  },
  {
    title: "Nutri Vault",
    pitch: "Full-stack nutrition and meal-tracking platform with a clean, opinionated data model.",
    domain: "Full-Stack",
    year: "2025",
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
    accent: "#4274D9",
    visual: "vault",
  },
  {
    title: "Credit Card Fraud Detection",
    pitch: "Class-imbalanced ML pipeline that flags anomalous transactions with tuned precision-recall tradeoffs.",
    domain: "AI/ML",
    year: "2024",
    stack: ["Python", "scikit-learn", "Pandas", "XGBoost"],
    accent: "#293681",
    visual: "fraud",
  },
];

const filters = ["All", "AI/ML", "Embedded", "Full-Stack"] as const;
type Filter = (typeof filters)[number];

function ProjectVisual({ kind, accent }: { kind: Project["visual"]; accent: string }) {
  if (kind === "solar") {
    return (
      <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full">
        <rect width="800" height="500" fill="#0b1220" />
        <g stroke={accent} strokeWidth="1" fill="none" opacity="0.7">
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={i} transform={`translate(${100 + i * 100}, 120) rotate(-15)`}>
              <rect x="0" y="0" width="80" height="240" fill="#101a2e" />
              {Array.from({ length: 6 }).map((__, j) => (
                <line key={j} x1="0" y1={j * 40} x2="80" y2={j * 40} />
              ))}
              <line x1="40" y1="0" x2="40" y2="240" />
            </g>
          ))}
          <circle cx="640" cy="90" r="42" fill={accent} opacity="0.9" />
          <circle cx="640" cy="90" r="70" opacity="0.4" />
          <path d="M40 380 Q400 340 760 380" strokeWidth="1.5" />
        </g>
        <g fill={accent}>
          <circle cx="120" cy="380" r="4" />
          <circle cx="360" cy="360" r="4" />
          <circle cx="600" cy="370" r="4" />
        </g>
      </svg>
    );
  }
  if (kind === "vault") {
    return (
      <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full">
        <rect width="800" height="500" fill="#0b1220" />
        <g stroke={accent} strokeWidth="1" fill="none" opacity="0.9">
          <rect x="120" y="80" width="560" height="340" rx="6" />
          <line x1="120" y1="140" x2="680" y2="140" />
          {[0,1,2,3].map((i) => (
            <g key={i} transform={`translate(160 ${180 + i*55})`}>
              <circle cx="0" cy="0" r="10" />
              <line x1="30" y1="0" x2="360" y2="0" opacity="0.5" />
              <rect x="380" y="-10" width="60" height="20" opacity="0.6" />
            </g>
          ))}
        </g>
        <g fill={accent}>
          <rect x="600" y="100" width="30" height="20" />
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full">
      <rect width="800" height="500" fill="#0b1220" />
      <g stroke={accent} strokeWidth="1" fill="none">
        <polyline points="40,380 140,300 240,340 340,220 440,260 540,140 640,180 760,90" strokeWidth="2" />
        <polyline points="40,410 140,390 240,395 340,370 440,380 540,340 640,355 760,320" opacity="0.4" />
        <line x1="40" y1="450" x2="760" y2="450" opacity="0.5" />
      </g>
      <g fill={accent}>
        {[[140,300],[340,220],[540,140],[760,90]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="5" />
        ))}
      </g>
      <text x="40" y="80" fill={accent} fontFamily="monospace" fontSize="14" opacity="0.9">ANOMALY · 0.972 PR-AUC</text>
    </svg>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = projects.filter((p) => filter === "All" || p.domain === filter);

  return (
    <section id="work" className="relative py-28 md:py-40 bg-foreground text-background">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-20">
          <div>
            <p className="eyebrow flex items-center gap-3 !text-background/60">
              <span className="text-brand">02</span>
              <span className="h-px w-8 bg-background/30" />
              Selected Work
            </p>
            <h2 className="mt-4 font-display font-bold text-[clamp(2rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.02em]">
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
                    : "border-background/25 text-background/70 hover:border-background hover:text-background"
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
                <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-background/15">
                  <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
                    <ProjectVisual kind={p.visual} accent={p.accent} />
                  </div>
                  <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-background/10 backdrop-blur px-3 py-1 text-[11px] uppercase tracking-widest">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.accent }} />
                    {p.domain}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <p className="eyebrow !text-background/50">{p.year}</p>
                <h3 className="mt-3 font-display text-3xl md:text-4xl font-bold leading-[1.05]">
                  {p.title}
                </h3>
                <p className="mt-4 text-background/70 text-lg leading-relaxed">{p.pitch}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-full border border-background/20 px-3 py-1 text-[11px] text-background/80">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#" className="magnetic-btn bg-brand text-primary-foreground text-[12px] py-2.5 px-4">
                    Case Study <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a href="#" className="magnetic-btn border border-background/25 text-background hover:border-brand hover:text-brand text-[12px] py-2.5 px-4">
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