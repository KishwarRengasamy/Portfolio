import { motion, AnimatePresence, useInView } from "framer-motion";
import { Trophy } from "lucide-react";
import { useRef, useState } from "react";
import { SectionHeader } from "./SectionHeader";

/* ─── Data ───────────────────────────────────────────── */
const items = [
  {
    title: "Winner — DeFy'25 Hackathon",
    org: "Vellore Institute of Technology (VIT), Chennai",
    year: "2025 · 1st Place",
    body: "Won 1st Place for developing Wolfie Launch, an AI-powered launchpad that automates complex workflows and enhances decision-making through intelligent agents. Built to streamline task execution, surface AI-driven insights, and improve operational efficiency in Web3 ecosystems.",
    bodyHighlights: ["1st Place", "AI-powered", "intelligent agents", "Web3"],
    stack: ["TypeScript", "JavaScript", "CSS", "Cairo"],
    emoji: "🏆",
    funFact: "vs 200+ teams across India",
  },
  {
    title: "Winner — AI Mayhem Hackathon",
    org: "ZO House, Bengaluru",
    year: "2025 · 1st Place",
    body: "Secured 1st Place for developing Blockchat AI, an intelligent crypto assistant that integrates GPT-3.5 Turbo, Gemini 1.5 Pro, and the CoinGecko API to provide real-time cryptocurrency prices, AI-driven trading recommendations, and transaction validation through a conversational interface.",
    bodyHighlights: ["1st Place", "GPT-3.5 Turbo", "Gemini 1.5 Pro", "real-time cryptocurrency prices"],
    stack: ["Python", "GPT-3.5 Turbo", "Gemini 1.5 Pro", "CoinGecko API"],
    emoji: "🤖",
    funFact: "built & deployed in 24h",
  },
];

/* ─── Floating orbs background ───────────────────────── */
function BackgroundOrbs() {
  const orbs = [
    { color: "#FFD43B1A", x: "0%",  y: "0%",  size: 500, dx: 30,  dy: 20,  dur: 16 },
    { color: "#FF5A361A", x: "60%", y: "40%", size: 400, dx: -25, dy: 30,  dur: 20 },
    { color: "#FFD43B0E", x: "30%", y: "70%", size: 350, dx: 20,  dy: -20, dur: 13 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: o.x, top: o.y, width: o.size, height: o.size,
            background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
          }}
          animate={{ x: [0, o.dx, 0], y: [0, o.dy, 0] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: "easeInOut", delay: i * 2 }}
        />
      ))}
    </div>
  );
}

/* ─── Highlighted keywords in body text ──────────────── */
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
            transition={{ duration: 0.55, delay: 0.5 + ti * 0.12 }}
            style={{ width: "100%" }}
          />
        </motion.span>,
        part.slice(idx + term.length),
      ];
    });
  });
  return parts;
}

/* ─── Floating emoji burst on hover ──────────────────── */
const EMOJIS = ["🎉", "⚡", "🚀", "✨", "🏅", "🔥"];
function FloatingEmoji({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active &&
        EMOJIS.map((e, i) => (
          <motion.span
            key={e}
            className="pointer-events-none absolute text-lg select-none"
            style={{
              left: `${15 + i * 13}%`,
              bottom: "10%",
            }}
            initial={{ opacity: 0, y: 0, scale: 0.4 }}
            animate={{ opacity: [0, 1, 1, 0], y: -80, scale: [0.4, 1.2, 1, 0.6], rotate: [0, 10, -10, 5] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, delay: i * 0.1, ease: "easeOut" }}
          >
            {e}
          </motion.span>
        ))}
    </AnimatePresence>
  );
}

/* ─── Looping shimmer ─────────────────────────────────── */
function Shimmer() {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-md overflow-hidden">
      <motion.div
        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
        animate={{ x: ["-100%", "350%"] }}
        transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ─── Trophy icon with glow pulse ────────────────────── */
function AnimatedTrophy() {
  return (
    <div className="relative h-12 w-12">
      <motion.div
        className="absolute inset-0 rounded-md bg-brand/20"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      />
      <div className="relative h-12 w-12 rounded-md bg-brand/10 border border-brand/30 grid place-items-center text-brand group-hover:bg-brand group-hover:text-primary-foreground transition-colors">
        <motion.div
          animate={{ rotate: [0, -10, 10, 0], y: [0, -3, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
        >
          <Trophy className="h-5 w-5" />
        </motion.div>
      </div>
    </div>
  );
}

/* ─── "WINNER" rotated stamp in card corner ──────────── */
function WinnerStamp({ inView, delay }: { inView: boolean; delay: number }) {
  return (
    <motion.div
      className="absolute -top-2 -right-3 z-10"
      initial={{ scale: 0, rotate: -20, opacity: 0 }}
      animate={inView ? { scale: 1, rotate: 12, opacity: 1 } : {}}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay }}
    >
      <div className="bg-brand text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
        <motion.span
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        >
          🏆
        </motion.span>
        Winner
      </div>
    </motion.div>
  );
}

/* ─── Fun stat ticker ────────────────────────────────── */
function FunFact({ text }: { text: string }) {
  return (
    <motion.div
      className="mt-6 flex items-center gap-2 text-[11px] text-muted-foreground"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <span className="h-px flex-1 bg-border" />
      <span className="italic">— {text}</span>
      <span className="h-px flex-1 bg-border" />
    </motion.div>
  );
}

/* ─── Achievement card ───────────────────────────────── */
function AchievementCard({ it, i }: { it: (typeof items)[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative bg-background border border-border rounded-md p-8 hover:border-brand transition-colors overflow-hidden"
    >
      {/* Background shimmer */}
      <Shimmer />

      {/* Emoji burst on hover */}
      <FloatingEmoji active={hovered} />

      {/* Bottom hover glow */}
      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "linear-gradient(to top, oklch(0.68 0.196 35 / 0.07), transparent)" }}
      />

      {/* Winner stamp */}
      <WinnerStamp inView={inView} delay={i * 0.12 + 0.35} />

      {/* Card header */}
      <div className="relative flex items-start justify-between">
        <AnimatedTrophy />
        <motion.p
          className="eyebrow"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          {it.year}
        </motion.p>
      </div>

      {/* Title */}
      <h3 className="relative mt-8 font-display text-xl font-bold leading-snug group-hover:text-brand transition-colors duration-300">
        {it.title}
      </h3>

      {/* Org */}
      <p className="relative mt-1 text-sm text-muted-foreground">{it.org}</p>

      {/* Body with highlighted keywords */}
      <p className="relative mt-4 text-sm leading-relaxed text-foreground/80">
        {markText(it.body, it.bodyHighlights)}
      </p>

      {/* Fun fact ticker */}
      <FunFact text={it.funFact} />

      {/* Stack tags — staggered */}
      <div className="relative mt-4 flex flex-wrap gap-2">
        {it.stack.map((s, si) => (
          <motion.span
            key={s}
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: i * 0.12 + si * 0.07 + 0.4 }}
            whileHover={{ scale: 1.08, borderColor: "#FF5A36" }}
            className="rounded-full border border-border px-3 py-1 text-[11px] text-foreground/75 cursor-default transition-colors"
          >
            {s}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Main export ─────────────────────────────────────── */
export function Achievements() {
  return (
    <section id="achievements" className="relative pt-6 pb-20 md:pt-8 md:pb-28 overflow-hidden">
      {/* Animated gold/brand orbs */}
      <BackgroundOrbs />
      <div className="absolute inset-0 bg-grid opacity-[0.12] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader index="05" eyebrow="Achievements" title={<>Receipts.<br />Not resumé filler.</>} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((it, i) => (
            <AchievementCard key={i} it={it} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}