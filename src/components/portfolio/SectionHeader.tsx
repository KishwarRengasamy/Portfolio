import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionHeader({
  index,
  eyebrow,
  title,
  children,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end mb-14 md:mb-20">
      <div className="md:col-span-7">
        <p className="eyebrow flex items-center gap-3">
          <span className="text-brand">{index}</span>
          <span className="h-px w-8 bg-foreground/30" />
          {eyebrow}
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 font-display font-bold text-foreground text-[clamp(2rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.02em]"
        >
          {title}
        </motion.h2>
      </div>
      {children && <div className="md:col-span-5 text-muted-foreground">{children}</div>}
    </div>
  );
}