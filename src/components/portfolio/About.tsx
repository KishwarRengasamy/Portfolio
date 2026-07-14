import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "./SectionHeader";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref} className="font-display text-5xl md:text-6xl font-bold text-foreground tabular-nums">
      {n}
      <span className="text-brand">{suffix}</span>
    </span>
  );
}

const stats = [
  { n: 5, s: "+", label: "Projects completed" },
  { n: 2, s: "", label: "Hackathons won" },
  { n: 15, s: "+", label: "Technologies" },
  { n: 2, s: "", label: "Internships" },
];

export function About() {
  return (
    <section id="about" className="relative pt-6 pb-20 md:pt-8 md:pb-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader index="01" eyebrow="About" title={<>An engineer who builds<br/>across the full stack — from<br/><span className="text-brand">silicon</span> to interface.</>} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5">
            <div className="relative">
              <div className="aspect-[4/5] rounded-sm bg-background border border-border overflow-hidden relative">
                <div className="absolute inset-0 bg-grid opacity-30" />
                <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full text-brand/70">
                  <g fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M0 100 L120 100 L140 120 L260 120 L280 140 L400 140" />
                    <path d="M0 220 L80 220 L100 240 L220 240 L240 260 L400 260" />
                    <path d="M0 380 L60 380 L80 400 L200 400 L220 420 L400 420" />
                    <circle cx="120" cy="100" r="4" fill="currentColor" />
                    <circle cx="260" cy="120" r="4" fill="currentColor" />
                    <circle cx="80" cy="220" r="4" fill="currentColor" />
                    <circle cx="220" cy="240" r="4" fill="currentColor" />
                    <circle cx="60" cy="380" r="4" fill="currentColor" />
                    <circle cx="200" cy="400" r="4" fill="currentColor" />
                  </g>
                </svg>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="eyebrow">Based in</p>
                  <p className="font-display text-3xl font-bold mt-1">Tamil Nadu, India</p>
                  <p className="text-sm text-foreground/70 mt-2">Open to remote collaboration and on-site roles across India and beyond.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 md:pt-4">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xl md:text-2xl leading-relaxed text-foreground/90"
            >
              I'm an Electrical & Electronics Engineering student who moves fluidly
              between silicon, embedded hardware, and full-stack software. I care
              about the join between the two — where firmware becomes a product,
              and where a clean interface makes an unforgiving system usable.
            </motion.p>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              My focus sits at the intersection of embedded systems, VLSI design,
              full-stack development, and power & renewable energy. Alongside my
              internships I ship embedded prototypes, HDL designs, and web
              platforms — small enough to finish, ambitious enough to teach me
              something new every time.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div>
                <dt className="eyebrow">Education</dt>
                <dd className="mt-2 font-medium">B.E. EEE · MKCE</dd>
                <dd className="text-muted-foreground">2023 – 2027 · CGPA 7.62</dd>
              </div>
              <div>
                <dt className="eyebrow">Languages</dt>
                <dd className="mt-2 font-medium">English</dd>
                <dd className="text-muted-foreground">Tamil</dd>
              </div>
              <div className="col-span-2">
                <dt className="eyebrow">Areas of Interest</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {["Embedded Systems", "VLSI Design", "Power Systems & Renewable Energy", "Full-Stack Development", "Photography"].map((f) => (
                    <span key={f} className="rounded-full border border-border px-3 py-1 text-xs">
                      {f}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-border pt-12">
          {stats.map((s) => (
            <div key={s.label}>
              <Counter to={s.n} suffix={s.s} />
              <p className="mt-3 text-sm text-muted-foreground uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}