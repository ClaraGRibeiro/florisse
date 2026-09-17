import { motion } from "framer-motion";
import {
  FaBoxOpen,
  FaFire,
  FaSoap,
  FaSun,
} from "react-icons/fa";

export default function Cuidados() {
  const careItems = [
    {
      icon: FaSoap,
      title: "Lavagem",
      description:
        "Lave sempre à mão, com sabão neutro e água fria. Evite máquinas para não deformar os pontos.",
    },
    {
      icon: FaSun,
      title: "Secagem",
      description:
        "Deixe secar à sombra, em superfície plana. Evite sol direto para não desbotar as cores.",
    },
    {
      icon: FaBoxOpen,
      title: "Armazenamento",
      description:
        "Guarde dobrado em local seco. Evite pendurar para não deformar a peça com o tempo.",
    },
    {
      icon: FaFire,
      title: "O que evitar",
      description:
        "Evite ferro direto, fontes de calor intenso e produtos que possam danificar ou desbotar os fios.",
    },
  ];

  return (
    <motion.section
      id="cuidados"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="scroll-mt-20 bg-card-soft py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mx-auto max-w-xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary sm:text-xs">
            Feito para durar
          </span>

          <h2 className="mt-2 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
            Cuide da sua peça com carinho
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
            Pequenos cuidados ajudam a preservar os fios, os pontos e as cores
            para que sua peça continue bonita por muito tempo.
          </p>
        </div>

        {/* CUIDADOS */}
        <div className="mx-auto mt-8 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {careItems.map((care, index) => {
            const Icon = care.icon;

            return (
              <motion.div
                key={care.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
                className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon size={15} />
                </div>

                <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">
                  {care.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
                  {care.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-foreground">
            Quer saber como cuidar de uma peça específica?
          </p>

          <a
            href="https://wa.me/5538992030710"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-sm font-medium text-primary transition-colors hover:text-primary/70"
          >
            Fale com a Florisse →
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}