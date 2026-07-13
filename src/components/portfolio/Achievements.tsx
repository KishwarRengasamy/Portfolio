import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const items = [
  {
    title: "Winner — DeFy'25 Hackathon",
    org: "Vellore Institute of Technology (VIT), Chennai",
    year: "2025 · 1st Place",
    body:
      "Won 1st Place for developing Wolfie Launch, an AI-powered launchpad that automates complex workflows and enhances decision-making through intelligent agents. Built to streamline task execution, surface AI-driven insights, and improve operational efficiency in Web3 ecosystems.",
    stack: ["TypeScript", "JavaScript", "CSS", "Cairo"],
  },
  {
    title: "Winner — AI Mayhem Hackathon",
    org: "ZO House, Bengaluru",
    year: "2025 · 1st Place",
    body:
      "Secured 1st Place for developing Blockchat AI, an intelligent crypto assistant that integrates GPT-3.5 Turbo, Gemini 1.5 Pro, and the CoinGecko API to provide real-time cryptocurrency prices, AI-driven trading recommendations, and transaction validation through a conversational interface.",
    stack: ["Python", "GPT-3.5 Turbo", "Gemini 1.5 Pro", "CoinGecko API"],
  },
];

export function Achievements() {
  return (
    <section id="achievements" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader index="05" eyebrow="Achievements" title={<>Receipts.<br/>Not resumé filler.</>} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  <Trophy className="h-5 w-5" />
                </div>
                <p className="eyebrow">{it.year}</p>
              </div>
              <h3 className="mt-8 font-display text-xl font-bold leading-snug">{it.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{it.org}</p>
              <p className="mt-4 text-sm leading-relaxed text-foreground/80">{it.body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {it.stack.map((s) => (
                  <span key={s} className="rounded-full border border-border px-3 py-1 text-[11px] text-foreground/75">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}