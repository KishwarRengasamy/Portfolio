import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const items = [
  {
    when: "2025 — Present",
    role: "Solar Engineering Intern",
    org: "Voltaura Technologies Inc.",
    body: "Working on solar engineering and renewable-energy systems — from field analysis to system-level design. Bridging the EEE fundamentals with real deployments.",
    tags: ["Solar", "Power Systems", "Field Engineering"],
  },
  {
    when: "Dec 2025 — May 2026 (pending confirmation)",
    role: "VLSI Design Intern",
    org: "To be confirmed",
    body: "Digital design internship focused on RTL, Verilog/SystemVerilog and UVM-based verification flows.",
    tags: ["Verilog", "SystemVerilog", "UVM", "RTL"],
    pending: true,
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader index="04" eyebrow="Experience" title={<>Where I've been<br/>plugged in.</>} />

        <div className="relative pl-8 md:pl-16">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top" }}
            className="absolute left-2 md:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-brand via-brand/60 to-transparent"
          />
          <div className="space-y-16">
            {items.map((it, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <span className="absolute -left-[26px] md:-left-[46px] top-2 h-3 w-3 rounded-full bg-brand ring-4 ring-background" />
                <p className="eyebrow">{it.when}</p>
                <h3 className="mt-2 font-display text-2xl md:text-3xl font-bold">
                  {it.role}{" "}
                  <span className="text-muted-foreground font-medium">· {it.org}</span>
                </h3>
                <p className="mt-3 text-muted-foreground max-w-2xl leading-relaxed">{it.body}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {it.tags.map((t) => (
                    <span key={t} className="rounded-full border border-border px-3 py-1 text-[11px] tracking-wide">
                      {t}
                    </span>
                  ))}
                  {it.pending && (
                    <span className="rounded-full border border-brand/50 bg-brand/10 text-brand px-3 py-1 text-[11px] tracking-wide">
                      Pending confirmation
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}