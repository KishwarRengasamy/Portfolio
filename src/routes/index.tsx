import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Achievements } from "@/components/portfolio/Achievements";
import { Contact } from "@/components/portfolio/Contact";
import { Preloader } from "@/components/portfolio/Preloader";
import { SectionDivider } from "@/components/portfolio/SectionDivider";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/")(({
  component: Index,
}));

function Index() {
  const [ready, setReady] = useState(false);

  return (
    <>
      {/* ── Preloader ── */}
      <Preloader onDone={() => setReady(true)} />

      {/* ── Main content — fades in after preloader exits ── */}
      <AnimatePresence>
        {ready && (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative min-h-screen bg-background text-foreground"
          >
            <Nav />
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Achievements />
            <Contact />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
