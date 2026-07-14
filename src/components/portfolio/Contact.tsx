import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Mail, Github, Linkedin, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useRef, useState } from "react";

/* ─── EmailJS config — pulled from .env, NEVER hardcoded ─
   Set these in your .env file (gitignored):
     VITE_EMAILJS_SERVICE_ID=your_service_id
     VITE_EMAILJS_TEMPLATE_ID=your_template_id
     VITE_EMAILJS_PUBLIC_KEY=your_public_key
   Then restrict the public key to your domain in the
   EmailJS dashboard (Account > API Keys > Allowed Origins).
──────────────────────────────────────────────────────── */
const EJS = {
  serviceId:  import.meta.env.VITE_EMAILJS_SERVICE_ID  as string,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string,
  publicKey:  import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string,
};

/* ─── Contact info ───────────────────────────────────── */
type ContactItem = {
  /** Visible label shown in the UI — no URLs ever rendered */
  display: string;
  /** Optional second line (for Based In row) */
  subDisplay?: string;
  /** The actual href — hidden from DOM text */
  href: string;
  /** Icon variant */
  icon: "mail" | "linkedin" | "github" | "mappin";
};

const contactInfo: ContactItem[] = [
  {
    display: "Gmail",
    href: "mailto:kishwarrengasamy216@gmail.com",
    icon: "mail",
  },
  {
    display: "LinkedIn",
    href: "https://www.linkedin.com/in/kishwar-rengasamy",
    icon: "linkedin",
  },
  {
    display: "GitHub",
    href: "https://github.com/KishwarRengasamy",
    icon: "github",
  },
  {
    display: "Based In",
    subDisplay: "Chennai, India \u{1F1EE}\u{1F1F3}",
    href: "https://maps.google.com/?q=Chennai,India",
    icon: "mappin",
  },
];

/* ─── Floating background orbs ───────────────────────── */
function BackgroundOrbs() {
  const orbs = [
    { color: "#FF5A3620", x: "-5%", y: "0%",  size: 500, dx: 30,  dy: 20,  dur: 16 },
    { color: "#4274D918", x: "65%", y: "50%", size: 420, dx: -25, dy: -20, dur: 20 },
    { color: "#FF5A3610", x: "40%", y: "85%", size: 300, dx: 15,  dy: -30, dur: 14 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: o.x, top: o.y, width: o.size, height: o.size,
            background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
          }}
          animate={{ x: [0, o.dx, 0], y: [0, o.dy, 0] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
        />
      ))}
    </div>
  );
}

/* ─── Float-label input/textarea ─────────────────────── */
function Field({
  label, name, type = "text", textarea = false, value, onChange,
}: {
  label: string; name: string; type?: string;
  textarea?: boolean; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  const baseClass =
    "peer w-full bg-transparent border-b-2 border-border focus:border-brand outline-none pt-5 pb-2 text-foreground transition-colors text-sm resize-none";

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          name={name} rows={4} required value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className={baseClass}
        />
      ) : (
        <input
          name={name} type={type} required value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className={baseClass}
        />
      )}
      <motion.label
        animate={{ y: floated ? -18 : 0, scale: floated ? 0.78 : 1, color: focused ? "oklch(0.68 0.196 35)" : "oklch(0.42 0.01 260)" }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute left-0 top-5 origin-left text-sm font-medium"
      >
        {label}
      </motion.label>
      {/* Animated underline */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-brand origin-left"
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ width: "100%" }}
      />
    </div>
  );
}

/* ─── Send button states ─────────────────────────────── */
type Status = "idle" | "loading" | "success" | "error";

/* ─── Main export ─────────────────────────────────────── */
export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [fields, setFields] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    /* Honeypot check */
    const honey = (formRef.current?.querySelector("[name=honey]") as HTMLInputElement)?.value;
    if (honey) return;

    setStatus("loading");
    try {
      const templateParams = {
        from_name:  fields.name,
        from_email: fields.email,
        subject:    fields.subject,
        message:    fields.message,
        to_name:    "Kishwar Rengasamy",
      };

      await emailjs.send(
        EJS.serviceId,
        EJS.templateId,
        templateParams,
        EJS.publicKey
      );

      setStatus("success");
      setFields({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative pt-6 pb-20 md:pt-8 md:pb-28 overflow-hidden">
      <BackgroundOrbs />
      <div className="absolute inset-0 bg-grid opacity-[0.12] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="eyebrow flex items-center gap-3"
        >
          <span className="text-brand">06</span>
          <span className="h-px w-8 bg-foreground/30" />
          Contact
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-display font-bold uppercase leading-[0.92] tracking-[-0.03em] text-foreground text-[clamp(2.4rem,8vw,7rem)]"
        >
          Let's build<br />something<br /><span className="text-brand">together.</span>
        </motion.h2>

        {/* Body */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* ── Left: info + links ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 space-y-10"
          >
            <p className="text-muted-foreground text-lg leading-relaxed">
              Whether it's an internship, a research collaboration, or a product
              idea worth prototyping —{" "}
              <motion.span
                className="text-foreground font-medium"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                I read every message.
              </motion.span>
            </p>

            {/* ─── Contact rows — salmon icon box design ─── */}
            <div className="mt-6 rounded-2xl overflow-hidden">
              {contactInfo.map((item, i) => {

                /* Icon element rendered inside the salmon box */
                const iconEl =
                  item.icon === "mail"    ? <Mail    className="h-[18px] w-[18px]" /> :
                  item.icon === "github"  ? <Github  className="h-[18px] w-[18px]" /> :
                  item.icon === "mappin"  ? <MapPin  className="h-[18px] w-[18px]" /> :
                  item.icon === "linkedin" ? <Linkedin className="h-[18px] w-[18px]" /> : null;

                return (
                  <motion.div
                    key={item.display}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.08 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 py-4 border-b border-border/50 hover:bg-brand/[0.03] transition-all duration-200 cursor-pointer rounded-sm"
                    >
                      {/* Salmon rounded icon box */}
                      <motion.span
                        className="flex-shrink-0 h-[46px] w-[46px] rounded-[14px] flex items-center justify-center"
                        style={{ background: "rgba(255,90,54,0.10)", color: "#E8522A" }}
                        whileHover={{ scale: 1.08 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        {iconEl}
                      </motion.span>

                      {/* Text — only display label shown, zero URL in DOM */}
                      <span className="flex-1 min-w-0">
                        {item.subDisplay ? (
                          /* Based In: small label + bold city */
                          <>
                            <span className="block text-[11px] font-semibold tracking-[0.15em] uppercase text-foreground/50 mb-0.5">
                              {item.display}
                            </span>
                            <span className="block text-[15px] font-bold text-foreground">
                              {item.subDisplay}
                            </span>
                          </>
                        ) : (
                          /* Gmail / LinkedIn / GitHub: just uppercase service name */
                          <span className="block text-[13px] font-semibold tracking-[0.12em] uppercase text-foreground/80">
                            {item.display}
                          </span>
                        )}
                      </span>

                      {/* Arrow — shifts right on hover */}
                      <motion.span
                        className="flex-shrink-0 text-foreground/30 group-hover:text-brand"
                        animate={{}}
                        whileHover={{ x: 3, y: -3 }}
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </motion.span>
                    </a>
                  </motion.div>
                );
              })}
            </div>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-3 rounded-full border border-border bg-background px-5 py-3 text-sm"
            >
              <motion.span
                className="h-2 w-2 rounded-full bg-green-500"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              <span className="text-foreground font-medium">Available for internships & collabs</span>
            </motion.div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7 space-y-8 bg-background/60 backdrop-blur-sm border border-border rounded-xl p-8 md:p-10"
          >
            {/* Honeypot — bots fill this, humans don't */}
            <input type="text" name="honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Field label="Your Name" name="name" value={fields.name} onChange={handleChange} />
              <Field label="Email Address" name="email" type="email" value={fields.email} onChange={handleChange} />
            </div>

            <Field label="Subject" name="subject" value={fields.subject} onChange={handleChange} />
            <Field label="Your Message" name="message" textarea value={fields.message} onChange={handleChange} />

            {/* Status feedback */}
            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-3 text-green-600 text-sm font-medium"
                >
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                  Message sent! I'll get back to you soon.
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-3 text-red-500 text-sm font-medium"
                >
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  Something went wrong. Try emailing me directly.
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={status === "loading" || status === "success"}
              whileHover={{ scale: status === "idle" ? 1.03 : 1 }}
              whileTap={{ scale: 0.97 }}
              className="magnetic-btn bg-foreground text-background hover:bg-brand text-sm disabled:opacity-60 disabled:cursor-not-allowed w-full justify-center"
            >
              {status === "loading" ? (
                <>
                  <motion.span
                    className="h-4 w-4 border-2 border-background/40 border-t-background rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                  Sending…
                </>
              ) : status === "success" ? (
                <><CheckCircle2 className="h-4 w-4" /> Sent — talk soon!</>
              ) : (
                <><Send className="h-4 w-4" /> Send Message</>
              )}
            </motion.button>

            <p className="text-[11px] text-muted-foreground text-center">
              Or reach me on{" "}
              <a href="mailto:kishwarrengasamy216@gmail.com" className="underline underline-offset-2 hover:text-brand transition-colors">
                kishwarrengasamy216@gmail.com
              </a>
            </p>
          </motion.form>
        </div>

        {/* ── Footer ── */}
        <footer className="mt-24 pt-10 border-t border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              {contactInfo.slice(0, 3).map((item) => (
                <a
                  key={item.display}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-foreground transition-transform hover:-translate-y-0.5"
                >
                  {item.icon === "mail" ? (
                    <Mail className="h-4 w-4 text-brand" />
                  ) : item.icon === "linkedin" ? (
                    <Linkedin className="h-4 w-4 text-brand" />
                  ) : item.icon === "github" ? (
                    <Github className="h-4 w-4 text-brand" />
                  ) : null}
                  <span className="text-sm font-medium group-hover:underline underline-offset-4 decoration-brand decoration-2">
                    {item.display}
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-muted-foreground">
            <p>Designed &amp; Developed by Kishwar Rengasamy — © {new Date().getFullYear()}</p>
            <p>Built with React · Tailwind · Framer Motion.</p>
          </div>
        </footer>
      </div>
    </section>
  );
}