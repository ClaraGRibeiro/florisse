"use client";

import colorsData from "@/data/colors.json";
import { motion } from "framer-motion";
import Link from "next/link";

interface Color {
  name: string;
  hex: string;
}

const colors = colorsData as Color[];

export default function ColorsPreview() {
  return (
    <motion.section
      id="cores"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="scroll-mt-20 overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(194,92,52,0.22),transparent_50%),radial-gradient(circle_at_80%_30%,rgba(74,93,58,0.22),transparent_50%),radial-gradient(circle_at_50%_100%,rgba(202,157,45,0.22),transparent_50%)] py-16 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/cores"
          className="group border-border/70 bg-card relative mx-auto block max-w-6xl overflow-hidden rounded-4xl border p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:p-10 lg:p-14"
        >
          <div className="bg-primary/10 pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-125" />
          <div className="bg-primary/5 pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-125" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="max-w-md">
              <span className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
                Cores
              </span>

              <h2 className="mt-3 font-serif text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
                Qual tom combina com o seu espaço?
              </h2>

              <p className="text-muted mt-5 max-w-sm text-sm leading-relaxed sm:text-base">
                Explore as cores e encontre aquela que faz a peça ganhar vida.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="grid grid-cols-6 gap-2 sm:grid-cols-9 sm:gap-2.5">
                {colors.map((color, index) => {
                  const isLight = ["#ffffff", "#fff"].includes(
                    color.hex.toLowerCase(),
                  );

                  return (
                    <motion.span
                      key={color.name}
                      aria-hidden="true"
                      className={`aspect-square rounded-xl shadow-sm transition-all duration-500 group-hover:scale-[0.98] sm:rounded-2xl ${
                        index >= 18 ? "hidden sm:block" : ""
                      } ${isLight ? "border-border border" : ""}`}
                      style={{ backgroundColor: color.hex }}
                      initial={{ opacity: 0, scale: 0.75, rotate: -4 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.025,
                      }}
                    />
                  );
                })}
              </div>

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="border-border/70 bg-background/90 rounded-full border px-5 py-3 text-sm font-medium shadow-lg backdrop-blur-md transition-all duration-500 group-hover:scale-105 sm:px-6 sm:py-3.5">
                  Ver todas as cores →
                </div>
              </div>

              <p className="text-muted mt-4 text-center text-[10px] sm:text-xs">
                {colors.length} tons para você explorar <br />
              </p>
            </div>
          </div>
        </Link>
      </div>
    </motion.section>
  );
}
