import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/* ─── Loading counter (0 → 100) ──────────────────────── */
function Counter({ progress }: { progress: number }) {
  return (
    <motion.span
      className="font-display text-[clamp(4rem,14vw,10rem)] font-bold tabular-nums leading-none text-foreground"
      key={Math.floor(progress)}
    >
      {String(Math.floor(progress)).padStart(2, "0")}
    </motion.span>
  );
}

export function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    /* Simulate load progress — fast at first, slows near 100 */
    let value = 0;
    const tick = setInterval(() => {
      /* Eased increment: fast → slow */
      const remaining = 100 - value;
      const step = Math.max(0.5, remaining * 0.06);
      value = Math.min(100, value + step);
      setProgress(value);

      if (value >= 100) {
        clearInterval(tick);
        /* Small pause at 100 before the curtain exits */
        setTimeout(() => setLeaving(true), 300);
        setTimeout(() => onDone(), 1100);
      }
    }, 30);

    return () => clearInterval(tick);
  }, [onDone]);

  /* Curtain panels that slide up to reveal the page */
  const panels = 5;

  return (
    <AnimatePresence>
      {!leaving ? (
        /* ── Loading screen ── */
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background overflow-hidden"
        >
          {/* Subtle animated grid */}
          <div className="absolute inset-0 bg-grid opacity-[0.12]" />

          {/* Pulsing brand orb behind the number */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 400, height: 400,
              background: "radial-gradient(circle, oklch(0.68 0.196 35 / 0.15) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative flex flex-col items-center gap-6">
            {/* Counter + % sign */}
            <div className="flex items-end gap-1">
              <Counter progress={progress} />
              <span className="mb-3 font-display text-3xl font-bold text-brand">%</span>
            </div>

            {/* Progress bar */}
            <div className="w-48 h-px bg-border overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-brand rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Brand name */}
            <motion.p
              className="eyebrow tracking-[0.3em] text-muted-foreground"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              Kishwar Rengasamy
            </motion.p>
          </div>
        </motion.div>
      ) : (
        /* ── Curtain exit — panels slide up ── */
        <motion.div key="curtain" className="fixed inset-0 z-[9999] flex pointer-events-none">
          {Array.from({ length: panels }).map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-background"
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.07,
                ease: [0.76, 0, 0.24, 1],
              }}
              style={{ originY: 0 }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
