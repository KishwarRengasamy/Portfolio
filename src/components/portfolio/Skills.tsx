import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const groups: { title: string; items: string[] }[] = [
  { title: "Languages", items: ["C/C++", "Java", "Python", "HTML/CSS", "SQL", "JavaScript"] },
  { title: "Frameworks & Libraries", items: ["React.js", "Express", "Node.js", "Tailwind CSS"] },
  { title: "Others", items: ["MongoDB", "Git/GitHub", "After Effects", "Photoshop"] },
];

function SkillCard({ name, i }: { name: string; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (i % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group relative aspect-square rounded-md border border-border bg-background p-4 flex flex-col justify-between transition-all hover:border-brand hover:shadow-[0_10px_30px_-15px_color-mix(in_oklab,var(--brand)_40%,transparent)]"
    >
      <div className="h-10 w-10 rounded-sm border border-foreground/15 grid place-items-center text-brand font-display font-bold text-lg group-hover:border-brand group-hover:bg-brand/10 transition-colors">
        {name.slice(0, 2).toUpperCase()}
      </div>
      <p className="text-foreground text-[13px] font-medium tracking-wide">{name}</p>
      <div className="absolute inset-0 rounded-md ring-0 ring-brand/40 group-hover:ring-1 transition" />
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-40">
      <div className="absolute inset-0 bg-grid opacity-[0.15] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader
          index="03"
          eyebrow="Technology Stack"
          title={<>A toolkit built for<br/>the whole stack.</>}
        >
          Tools I actually reach for — grouped by where they live in my workflow,
          not by how impressive the logo looks in a grid.
        </SectionHeader>

        <div className="space-y-14">
          {groups.map((g) => (
            <div key={g.title}>
              <p className="eyebrow mb-5">{g.title}</p>
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