import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const items = [
  {
    when: "July 2026 — Present",
    role: "Solar EPC Intern",
    org: "Voltaura Technologies Pvt. Ltd.",
    body:
      "Working on utility-scale and rooftop Solar EPC (Engineering, Procurement & Construction) projects — contributing to solar PV system design, site surveys, electrical layouts, component selection, and project execution. Assisting with performance analysis, installation planning, quality assurance, and commissioning while gaining practical exposure to renewable energy systems and industry standards.",
    tags: ["Solar PV", "EPC", "Site Surveys", "Commissioning", "Renewables"],
  },
  {
    when: "Dec 2025 — May 2026",
    role: "VLSI Design Engineering Intern",
    org: "Taras Systems and Solutions Pvt. Ltd.",
    body:
      "Completed a 6-month VLSI Design internship focused on digital IC design and verification. Gained hands-on experience with Verilog, SystemVerilog, UVM, and digital design methodologies, while developing industry-oriented and individual projects involving RTL design, functional verification, simulation, and debugging.",
    tags: ["Verilog", "SystemVerilog", "UVM", "RTL", "Verification"],
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}