import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/types/product";

type HeroProps = {
  bestSelling: Product;
};

const whatsappLink =
  "https://wa.me/5538992030710?text=Olá! Vim pelo site da Florisse e gostaria de fazer um pedido personalizado.";

export default function Hero({ bestSelling }: HeroProps) {
  return (
    <motion.section
      id="início"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden scroll-mt-20 bg-linear-to-br from-card-soft to-accent"
    >
      <div className="mx-auto grid max-w-7xl gap-14 px-4 py-14 sm:px-6 md:grid-cols-2 md:items-center md:py-20">
        <div className="relative z-10 text-center md:text-left">
          <h2 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Peças artesanais que deixam sua casa mais{" "}
            <span className="text-primary">aconchegante</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg md:mx-0">
            Cada peça é feita ponto por ponto, com tempo, carinho e intenção...
            Para transformar ambientes em lugares mais vivos e acolhedores.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
            <a href="#produtos">
              <button className="w-full cursor-pointer rounded-2xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:bg-primary-hover sm:w-auto">
                Ver produtos
              </button>
            </a>

            <a href={whatsappLink} target="_blank">
              <button className="w-full cursor-pointer rounded-2xl border border-border bg-card px-6 py-3 font-semibold transition-all hover:bg-input sm:w-auto">
                Personalizar Pedido
              </button>
            </a>
          </div>
        </div>

        <div className="relative flex justify-center">
          <Image
            src="/hero.webp"
            alt="Crochê artesanal"
            width={1200}
            height={800}
            priority
            className="w-full max-w-145 rounded-4xl object-cover shadow-2xl"
          />

          <div className="absolute bottom-4 left-4 rounded-2xl bg-card/95 p-4 shadow-xl backdrop-blur-md sm:bottom-6 sm:left-6 sm:p-5">
            <p className="text-xs text-muted sm:text-sm">
              Mais vendida ({bestSelling.total_sales} un)
            </p>

            <h3 className="mt-1 text-lg font-bold sm:text-xl">
              {bestSelling.name}
            </h3>
          </div>
        </div>
      </div>

      <div className="absolute -left-20 top-10 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
    </motion.section>
  );
}