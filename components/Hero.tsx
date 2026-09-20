import { BRAND, CITY, WHATSAPP } from "@/data/config";
import { Product } from "@/types/product";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type HeroProps = {
  bestSelling: Product;
  formatPath: (name: string) => string;
};

export default function Hero({ bestSelling, formatPath }: HeroProps) {
  const imageSrc = `/products/${formatPath(bestSelling.category)}/${formatPath(
    bestSelling.name
  )}/${bestSelling.colors[0].name}.webp`;

  return (
    <motion.section
      id="inicio"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative isolate overflow-hidden scroll-mt-20 bg-card-soft"
    >
      <div className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-accent/60 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 sm:py-20 md:grid-cols-[1.05fr_0.95fr] md:gap-16 md:py-24 lg:py-28">
        <div className="relative z-10 text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm"
          >
            Feito à mão · Feito para você
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-5 max-w-2xl font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            O detalhe que transforma uma casa em{" "}
            <span className="text-primary italic">lar.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg md:mx-0"
          >
            Peças de crochê feitas ponto por ponto, com cuidado e intenção,
            para trazer textura, cor e aconchego aos seus espaços.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted sm:text-sm md:justify-start"
          >
            <span>✦ Cores personalizáveis</span>
            <span>✦ Tamanhos sob medida</span>
            <span>✦ {CITY}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start"
          >
            <a
              href="#produtos"
              className="w-full cursor-pointer rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg sm:w-auto"
            >
              Ver peças
            </a>

            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full cursor-pointer rounded-full border border-border bg-background/70 px-7 py-3.5 text-center font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:bg-background sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Falar pelo WhatsApp
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          className="relative flex justify-center md:justify-end"
        >
          <Link
            href={`/produto/${formatPath(bestSelling.name)}`}
            className="group block w-full max-w-125"
          >
            <div className="relative">
              <div className="absolute -right-3 -top-3 z-0 h-full w-full rounded-4xl border border-primary/15 sm:-right-4 sm:-top-4" />

              <div
                className="relative z-10 w-full overflow-hidden rounded-4xl bg-muted shadow-xl transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl"
                style={{ aspectRatio: "1 / 1" }}
              >
                <Image
                  src={imageSrc}
                  alt={`${bestSelling.name} — ` + BRAND}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                />

                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/45 via-black/10 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 text-white sm:bottom-6 sm:left-6 sm:right-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 sm:text-xs">
                    Mais vendido
                  </p>

                  <h3 className="mt-1 font-serif text-2xl font-semibold sm:text-3xl">
                    {bestSelling.name}
                  </h3>

                  <p className="mt-1 text-xs text-white/80 sm:text-sm">
                    {bestSelling.total_sales}{" "}
                    {bestSelling.total_sales === 1 ? "peça vendida" : "peças vendidas"}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}