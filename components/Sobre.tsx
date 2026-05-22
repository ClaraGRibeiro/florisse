import { motion } from "framer-motion";
import Image from "next/image";

export default function Sobre() {
  return (
    <motion.section
      id="sobre"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="scroll-mt-20 overflow-hidden bg-card-soft py-16 sm:py-20"
    >
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 md:grid-cols-2 md:items-center lg:gap-20">
        <div className="relative flex justify-center">
          <Image
            src="/sobre.webp"
            alt="Artesã trabalhando"
            width={1200}
            height={800}
            loading="lazy"
            className="w-full max-w-155 rounded-4xl object-cover shadow-2xl"
          />

          <div className="absolute -bottom-6 -right-6 hidden h-32 w-32 rounded-full bg-primary/10 blur-3xl sm:block" />
        </div>

        <div className="relative z-10 text-left md:text-left">
          <h2 className="mt-5 text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Sobre a Florisse
          </h2>

          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              A Florisse nasceu do crochê como um refúgio pra mim. É onde eu
              desacelero, coloco a mente em ordem e encontro paz em cada ponto.
            </p>

            <p>
              Não é só sobre peças decorativas, é sobre o processo. Cada fio que
              eu trabalho me ajuda a aliviar a ansiedade e transformar
              pensamentos em algo bonito, leve e cheio de energia boa.
            </p>

            <p>
              Quando você recebe uma peça, não está levando só crochê. Está
              levando um pouco dessa calma, desse cuidado e dessa intenção de
              fazer tudo com amor.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
