import { BRAND, SLOGAN } from "@/data/config";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaHeart, FaLeaf } from "react-icons/fa";

export default function Sobre() {
  return (
    <motion.section
      id="sobre"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative scroll-mt-20 overflow-hidden bg-card py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 max-w-3xl sm:mb-14"
        >
          <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            <FaLeaf size={11} />
            <span>De onde vem cada ponto</span>
          </div>

          <h2 className="mt-4 font-serif text-4xl font-medium leading-[1.1] text-foreground sm:text-5xl lg:text-6xl">
            Sobre a{" "}
            <span className="italic text-primary">
              {BRAND}
            </span>
          </h2>

          <div className="mt-6 h-px w-16 bg-primary/40" />
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative h-full"
          >
            <div className="absolute -bottom-4 -left-4 h-full w-full rounded-[2rem] border border-primary/15 sm:-bottom-5 sm:-left-5" />

            <div className="relative h-[280px] overflow-hidden rounded-[2rem] shadow-xl sm:h-[340px] lg:h-full lg:min-h-[500px]">
              <Image
                src="/about-mobile.webp"
                alt="Artesã trabalhando em uma peça de crochê"
                width={1200}
                height={800}
                loading="lazy"
                className="h-full w-full object-cover lg:hidden"
              />

              <Image
                src="/about-pc.webp"
                alt="Artesã trabalhando em uma peça de crochê"
                width={1200}
                height={1600}
                loading="lazy"
                className="hidden h-full w-full object-cover lg:block"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-5 right-2 flex h-20 w-20 rotate-3 items-center justify-center rounded-full border border-primary/20 bg-card shadow-lg sm:right-6">
              <div className="flex flex-col items-center text-primary">
                <FaHeart size={15} />

                <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.16em]">
                  Feito
                </span>

                <span className="text-[9px] font-medium uppercase tracking-[0.16em]">
                  à mão
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative z-10"
          >
            <div className="space-y-6 text-base leading-relaxed text-muted sm:text-lg">
              <p>
                A {BRAND} nasceu do crochê como um refúgio pra mim. É
                onde eu desacelero, coloco a mente em ordem e encontro paz em
                cada ponto.
              </p>

              <p>
                Não é só sobre peças decorativas, é sobre o processo. Cada fio
                que eu trabalho me ajuda a aliviar a ansiedade e transformar
                pensamentos em algo bonito, leve e cheio de energia boa.
              </p>

              <div className="relative my-10 border-y border-primary/15 py-7 sm:my-12 sm:py-8">
                <span className="absolute -top-3 left-0 bg-card pr-3 font-serif text-sm italic text-primary">
                  ✦
                </span>

                <h3 className="font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                  Cada peça leva tempo.
                </h3>

                <p className="mt-4 max-w-xl">
                  São horas escolhendo cores, contando pontos e trabalhando em
                  cada detalhe para que tudo fique exatamente como deve ser.
                </p>
              </div>

              <p>
                Por isso, quando você escolhe a {BRAND}, escolhe uma peça que
                não saiu de uma linha de produção. É uma peça feita à mão, com
                tempo, atenção e a possibilidade de ganhar as cores e os
                detalhes que combinam com o seu espaço.
              </p>

              <p>
                Quando você recebe uma peça, não está levando só crochê. Está
                levando um pouco dessa calma, desse cuidado e dessa intenção de
                fazer tudo com amor.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-3">
              <div className="h-px w-10 bg-border" />

              <span className="font-serif text-sm italic text-muted">
                {SLOGAN}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}