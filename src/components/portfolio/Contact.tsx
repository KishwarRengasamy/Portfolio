import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Github, Linkedin, FileText } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [state, setState] = useState<"idle" | "sent">("idle");
  return (
    <section id="contact" className="relative py-28 md:py-40 bg-foreground text-background overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.05]" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <p className="eyebrow !text-background/60 flex items-center gap-3">
          <span className="text-brand">06</span>
          <span className="h-px w-8 bg-background/30" />
          Contact
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-display font-bold uppercase leading-[0.92] tracking-[-0.03em] text-[clamp(2.4rem,8vw,7rem)]"
        >
          Let's build<br/>something<br/><span className="text-brand">together.</span>
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-8">
            <p className="text-background/70 text-lg leading-relaxed max-w-md">
              Whether it's an internship, a research collaboration, or a product idea
              worth prototyping — I read every message.
            </p>

            <div className="space-y-3 text-sm">
              {[
                { icon: Mail, label: "kishwar@example.com", href: "mailto:kishwar@example.com" },
                { icon: Linkedin, label: "linkedin.com/in/kishwar", href: "https://linkedin.com/" },
                { icon: Github, label: "github.com/kishwar", href: "https://github.com/" },
                { icon: FileText, label: "Download Resume (PDF)", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="group flex items-center justify-between border-b border-background/15 py-4 hover:border-brand transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-brand" /> {label}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-background/50 group-hover:text-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          <form
            className="lg:col-span-7 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              setState("sent");
            }}
          >
            <input type="text" name="honey" tabIndex={-1} autoComplete="off" className="hidden" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Name" name="name" />
              <Field label="Email" name="email" type="email" />
            </div>
            <Field label="Subject" name="subject" />
            <Field label="Message" name="message" textarea />
            <button
              type="submit"
              className="magnetic-btn bg-brand text-primary-foreground hover:opacity-90 text-sm"
            >
              {state === "sent" ? "Message queued ✦" : "Send Message"}
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        <footer className="mt-24 pt-8 border-t border-background/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-background/50">
          <p>© {new Date().getFullYear()} Kishwar Rengasamy. Engineered end-to-end.</p>
          <p>Made in Tamil Nadu — pointed at the world.</p>
        </footer>
      </div>
    </section>
  );
}

function Field({
  label, name, type = "text", textarea = false,
}: { label: string; name: string; type?: string; textarea?: boolean }) {
  const cls =
    "peer w-full bg-transparent border-b border-background/25 focus:border-brand outline-none py-3 text-background placeholder-transparent transition-colors";
  return (
    <label className="relative block">
      {textarea ? (
        <textarea name={name} rows={4} placeholder={label} className={cls} required />
      ) : (
        <input name={name} type={type} placeholder={label} className={cls} required />
      )}
      <span className="pointer-events-none absolute left-0 -top-2 text-[11px] uppercase tracking-widest text-background/50 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-top-2 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-brand transition-all">
        {label}
      </span>
    </label>
  );
}