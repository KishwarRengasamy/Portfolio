import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ─── The scrolling marquee text strip between sections ─
   variant A: dotted line with a label
   variant B: full-width text ticker with brand accents
──────────────────────────────────────────────────────── */

type DividerVariant = "ticker" | "slash" | "dots";

const tickerWords = [
  "Design",  "·",  "Embedded",  "·",  "AI",  "·",  "Full-Stack",  "·",
  "Silicon",  "·",  "Software",  "·",  "VLSI",  "·",  "React",  "·",
  "ESP32",  "·",  "TinyML",  "·",  "Cloud",  "·",  "Open-Source",  "·",
];

function TickerDivider() {
  /* Duplicate for seamless loop */
  const words = [...tickerWords, ...tickerWords];
  return (
    <div className="relative overflow-hidden py-5 border-y border-border/50 my-2">
      {/* Left / right fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{ x: [0, "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {words.map((w, i) => (
          <span
            key={i}
            className={`text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
              w === "·" ? "text-brand" : "text-muted-foreground/60"
            }`}
          >
            {w}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function SlashDivider({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <div ref={ref} className="flex items-center gap-4 my-2 px-6 md:px-10 max-w-[1400px] mx-auto">
      {/* Left line that grows in */}
      <motion.div
        className="flex-1 h-px bg-border"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0 }}
      />

      {/* Center label with slashes */}
      <motion.div
        className="flex items-center gap-2 flex-shrink-0"
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.span
          className="text-brand font-display text-xl font-bold"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          //
        </motion.span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/70">
          {label}
        </span>
        <motion.span
          className="text-brand font-display text-xl font-bold"
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          //
        </motion.span>
      </motion.div>

      {/* Right line */}
      <motion.div
        className="flex-1 h-px bg-border"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{ originX: 1 }}
      />
    </div>
  );
}

function DotsDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const DOT_COUNT = 9;

  return (
    <div ref={ref} className="flex items-center justify-center gap-3 py-4 my-2">
      {Array.from({ length: DOT_COUNT }).map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{
            background: i === Math.floor(DOT_COUNT / 2) ? "oklch(0.68 0.196 35)" : "oklch(0.87 0.005 90)",
            width:  i === Math.floor(DOT_COUNT / 2) ? 8 : i % 2 === 0 ? 5 : 3,
            height: i === Math.floor(DOT_COUNT / 2) ? 8 : i % 2 === 0 ? 5 : 3,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 0.4,
            delay: Math.abs(i - Math.floor(DOT_COUNT / 2)) * 0.07,
            type: "spring",
            stiffness: 400,
          }}
          whileInView={
            inView
              ? i === Math.floor(DOT_COUNT / 2)
                ? { scale: [1, 1.4, 1] }
                : {}
              : {}
          }
        />
      ))}
    </div>
  );
}

export function SectionDivider({
  variant = "ticker",
  label,
}: {
  variant?: DividerVariant;
  label?: string;
}) {
  if (variant === "ticker") return <TickerDivider />;
  if (variant === "slash")  return <SlashDivider label={label ?? "next"} />;
  return <DotsDivider />;
}
