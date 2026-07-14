import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SectionHeader } from "./SectionHeader";

/* ─────────────────────────────────────────────────────────────
   Simple Icons CDN  →  https://cdn.simpleicons.org/{slug}/{hex}
   Official brand marks, zero npm overhead.
───────────────────────────────────────────────────────────── */
type Skill = {
  name: string;
  slug: string;           // simpleicons.org slug (used when localIcon is absent)
  iconColor: string;      // brand hex without #
  bg: string;             // card accent bg (with opacity)
  category: "Languages" | "Frameworks & Libraries" | "Others";
  localIcon?: string;     // path to a local public image (overrides CDN)
};

const skills: Skill[] = [
  // Languages
  {
    name: "C/C++",
    slug: "cplusplus",
    iconColor: "00599C",
    bg: "#00599C18",
    category: "Languages",
  },
  {
    name: "Java",
    slug: "openjdk",
    iconColor: "ED8B00",
    bg: "#ED8B0018",
    category: "Languages",
  },
  {
    name: "Python",
    slug: "python",
    iconColor: "3776AB",
    bg: "#3776AB18",
    category: "Languages",
  },
  {
    name: "HTML/CSS",
    slug: "html5",
    iconColor: "E34F26",
    bg: "#E34F2618",
    category: "Languages",
  },
  {
    name: "SQL",
    slug: "mysql",
    iconColor: "4479A1",
    bg: "#4479A118",
    category: "Languages",
  },
  {
    name: "JavaScript",
    slug: "javascript",
    iconColor: "323330",
    bg: "#F7DF1E22",
    category: "Languages",
  },
  // Frameworks & Libraries
  {
    name: "React.js",
    slug: "react",
    iconColor: "61DAFB",
    bg: "#61DAFB18",
    category: "Frameworks & Libraries",
  },
  {
    name: "Express",
    slug: "express",
    iconColor: "404040",
    bg: "#88888814",
    category: "Frameworks & Libraries",
  },
  {
    name: "Node.js",
    slug: "nodedotjs",
    iconColor: "339933",
    bg: "#33993318",
    category: "Frameworks & Libraries",
  },
  {
    name: "Tailwind CSS",
    slug: "tailwindcss",
    iconColor: "06B6D4",
    bg: "#06B6D418",
    category: "Frameworks & Libraries",
  },
  // Others
  {
    name: "MongoDB",
    slug: "mongodb",
    iconColor: "47A248",
    bg: "#47A24818",
    category: "Others",
  },
  {
    name: "Git/GitHub",
    slug: "github",
    iconColor: "181717",
    bg: "#18171718",
    category: "Others",
  },
  {
    name: "After Effects",
    slug: "aftereffects",
    iconColor: "9999FF",
    bg: "#9999FF18",
    category: "Others",
    localIcon: "/adobe_aftereffects.png",
  },
  {
    name: "Photoshop",
    slug: "photoshop",
    iconColor: "31A8FF",
    bg: "#31A8FF18",
    category: "Others",
    localIcon: "/adobe_photoshop.png",
  },
  {
    name: "Lightroom",
    slug: "adobelightroom",
    iconColor: "31A8FF",
    bg: "#31A8FF18",
    category: "Others",
    localIcon: "/adobe_lightroom.png",
  },
];

const CATEGORIES = ["All", "Languages", "Frameworks & Libraries", "Others"] as const;
type Category = (typeof CATEGORIES)[number];

/* ─────────────────────────────────────────────────────────────
   Single skill card
───────────────────────────────────────────────────────────── */
function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col items-center gap-3 rounded-xl border border-border bg-background p-5 cursor-default overflow-hidden transition-all hover:border-brand/40 hover:shadow-lg"
    >
      {/* Colour-tinted background glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
        style={{ background: skill.bg }}
      />

      {/* Icon: local image takes priority over CDN */}
      <div className="relative h-12 w-12 flex items-center justify-center rounded-xl border border-border/60 bg-background p-2.5 group-hover:border-brand/30 transition-colors overflow-hidden">
        {skill.localIcon ? (
          <img
            src={skill.localIcon}
            alt={skill.name}
            className="h-full w-full object-contain rounded-lg"
            loading="lazy"
          />
        ) : (
          <img
            src={`https://cdn.simpleicons.org/${skill.slug}/${skill.iconColor}`}
            alt={skill.name}
            className="h-full w-full object-contain"
            loading="lazy"
            onError={(e) => {
              const t = e.currentTarget;
              t.style.display = "none";
              const parent = t.parentElement;
              if (parent && !parent.querySelector(".fallback-text")) {
                const span = document.createElement("span");
                span.className = "fallback-text text-brand font-display font-bold text-base";
                span.textContent = skill.name.slice(0, 2).toUpperCase();
                parent.appendChild(span);
              }
            }}
          />
        )}
      </div>

      {/* Name */}
      <p className="relative text-center text-[13px] font-semibold text-foreground tracking-wide leading-tight">
        {skill.name}
      </p>

      {/* Bottom accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left"
        style={{
          background: `linear-gradient(to right, #${skill.iconColor}99, transparent)`,
        }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Category pill button
───────────────────────────────────────────────────────────── */
function Tab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative rounded-full px-4 py-1.5 text-[12px] font-semibold tracking-wide transition-colors ${
        active
          ? "bg-foreground text-background"
          : "text-muted-foreground hover:text-foreground border border-border hover:border-foreground/40"
      }`}
    >
      {active && (
        <motion.span
          layoutId="tab-active-bg"
          className="absolute inset-0 rounded-full bg-foreground -z-10"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      {label}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main export
───────────────────────────────────────────────────────────── */
export function Skills() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const visible =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative pt-6 pb-20 md:pt-8 md:pb-28">
      <div className="absolute inset-0 bg-grid opacity-[0.15] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader
          index="03"
          eyebrow="Technology Stack"
          title={<>A toolkit built for<br />the whole stack.</>}
        >
          Tools I actually reach for — grouped by where they live in my workflow,
          not by how impressive the logo looks in a grid.
        </SectionHeader>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((c) => (
            <Tab
              key={c}
              label={c}
              active={activeCategory === c}
              onClick={() => setActiveCategory(c)}
            />
          ))}
        </div>

        {/* Skills grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 md:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}