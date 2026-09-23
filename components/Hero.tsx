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
    bestSelling.name,
  )}/${bestSelling.colors[0].name}.webp`;

  return (
    <motion.section
      id="inicio"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="bg-card-soft relative isolate scroll-mt-20 overflow-hidden"
    >
      <div className="bg-primary/10 pointer-events-none absolute top-1/4 -left-32 h-80 w-80 rounded-full blur-3xl" />

      <div className="bg-accent/60 pointer-events-none absolute -right-20 -bottom-32 h-96 w-96 rounded-full blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 sm:py-20 md:grid-cols-[1.05fr_0.95fr] md:gap-16 md:py-24 lg:py-28">
        <div className="relative z-10 text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-primary text-xs font-semibold tracking-[0.2em] uppercase sm:text-sm"
          >
            Feito à mão · Feito para você
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-foreground mt-5 max-w-2xl font-serif text-4xl leading-[1.08] font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          >
            O detalhe que transforma uma casa em{" "}
            <span className="text-primary italic">lar.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-muted mx-auto mt-6 max-w-xl text-base leading-7 sm:text-lg md:mx-0"
          >
            Peças de crochê feitas ponto por ponto, com cuidado e intenção, para
            trazer textura, cor e aconchego aos seus espaços.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-muted mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs sm:text-sm md:justify-start"
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
              className="bg-primary text-primary-foreground hover:bg-primary-hover w-full cursor-pointer rounded-full px-7 py-3.5 font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg sm:w-auto"
            >
              Ver catálogo
            </a>

            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border bg-background/70 text-foreground hover:bg-background focus-visible:ring-primary w-full cursor-pointer rounded-full border px-7 py-3.5 text-center font-semibold transition-all hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto"
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
              <div className="border-primary/15 absolute -top-3 -right-3 z-0 h-full w-full rounded-4xl border sm:-top-4 sm:-right-4" />

              <div
                className="bg-muted relative z-10 w-full overflow-hidden rounded-4xl shadow-xl transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl"
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

                <div className="absolute right-5 bottom-5 left-5 text-white sm:right-6 sm:bottom-6 sm:left-6">
                  <p className="text-[10px] font-semibold tracking-[0.18em] text-white/80 uppercase sm:text-xs">
                    Mais vendido
                  </p>

                  <h3 className="mt-1 font-serif text-2xl font-semibold sm:text-3xl">
                    {bestSelling.name}
                  </h3>

                  <p className="mt-1 text-xs text-white/80 sm:text-sm">
                    {bestSelling.total_sales}{" "}
                    {bestSelling.total_sales === 1
                      ? "peça vendida"
                      : "peças vendidas"}
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
