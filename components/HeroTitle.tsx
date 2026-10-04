"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const words = ["aconchego", "personalidade", "charme", "carinho", "beleza"];

export default function HeroTitle() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((current) => (current + 1) % words.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.h2
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15, duration: 0.6 }}
      className="text-foreground mt-5 max-w-2xl font-serif text-4xl leading-[1.08] font-semibold tracking-tight sm:text-5xl lg:text-6xl"
    >
      O detalhe que traz <br />
      <span className="text-primary relative inline-block min-w-[5ch] italic">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[wordIndex]}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="inline-block"
          >
            {words[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </span>
      <br />
      ao seu lar.
    </motion.h2>
  );
}
