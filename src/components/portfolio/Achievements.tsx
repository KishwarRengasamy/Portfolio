import { motion } from "framer-motion";
import { Trophy, Award, Medal } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const items = [
  {
    icon: Award,
    title: "NPTEL — Cloud Computing",
    org: "IIT / NPTEL",
    year: "Completed",
    body: "Certified course covering cloud architectures, virtualization, and distributed systems fundamentals.",
  },
  {
    icon: Trophy,
    title: "MSME IDEA Hackathon 6.0",
    org: "MSME · Government of India",
    year: "2026 · Participant",
    body: "Selected participant — outcome pending. Working on a hardware-forward innovation aligned with renewable energy.",
  },
  {
    icon: Medal,
    title: "Hackathon Track Record",
    org: "Various",
    year: "Ongoing",
    body: "Consistent participation across AI, embedded and full-stack tracks — the fastest feedback loop I've found for learning.",
  },
];

export function Achievements() {
  return (
    <section id="achievements" className="relative py-28 md:py-40 bg-secondary/40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader index="05" eyebrow="Achievements & Certifications" title={<>Receipts.<br/>Not resumé filler.</>} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-background border border-border rounded-md p-8 hover:border-brand transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="h-12 w-12 rounded-md bg-brand/10 border border-brand/30 grid place-items-center text-brand group-hover:bg-brand group-hover:text-primary-foreground transition-colors">
                  <it.icon className="h-5 w-5" />
                </div>
                <p className="eyebrow">{it.year}</p>
              </div>
              <h3 className="mt-8 font-display text-xl font-bold leading-snug">{it.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{it.org}</p>
              <p className="mt-4 text-sm leading-relaxed text-foreground/80">{it.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}