import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const groups: { title: string; items: string[] }[] = [
  { title: "Languages", items: ["C", "Python", "Java", "JavaScript", "TypeScript"] },
  { title: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"] },
  { title: "Backend & Data", items: ["Node.js", "Express", "MongoDB", "MySQL"] },
  { title: "Cloud & DevOps", items: ["AWS", "Git", "GitHub", "Linux"] },
  { title: "Embedded & IoT", items: ["Embedded C", "ESP32", "Arduino", "TinyML"] },
  { title: "AI / ML", items: ["OpenAI API", "Gemini API", "scikit-learn", "Pandas"] },
  { title: "VLSI", items: ["Verilog", "SystemVerilog", "UVM", "RTL Design"] },
];

function SkillCard({ name, i }: { name: string; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (i % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group relative aspect-square rounded-md border border-white/10 bg-[#111827] p-4 flex flex-col justify-between transition-colors hover:border-brand"
    >
      <div className="h-10 w-10 rounded-sm border border-white/15 grid place-items-center text-brand font-display font-bold text-lg group-hover:border-brand group-hover:bg-brand/10 transition-colors">
        {name.slice(0, 2).toUpperCase()}
      </div>
      <p className="text-white/90 text-[13px] font-medium tracking-wide">{name}</p>
      <div className="absolute inset-0 rounded-md ring-0 ring-brand/40 group-hover:ring-1 transition" />
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-40 bg-[#050816] text-white">
      <div className="absolute inset-0 bg-grid opacity-[0.06]" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className="eyebrow flex items-center gap-3 !text-white/60">
              <span className="text-brand">03</span>
              <span className="h-px w-8 bg-white/30" />
              Technology Stack
            </p>
            <h2 className="mt-4 font-display font-bold text-[clamp(2rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.02em]">
              A toolkit built for<br/>the whole stack.
            </h2>
          </div>
          <p className="md:col-span-5 text-white/60">
            Tools I actually reach for — grouped by where they live in my workflow, not
            by how impressive the logo looks in a grid.
          </p>
        </div>

        <div className="space-y-14">
          {groups.map((g) => (
            <div key={g.title}>
              <p className="eyebrow !text-white/50 mb-5">{g.title}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                {g.items.map((name, i) => (
                  <SkillCard key={name} name={name} i={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}