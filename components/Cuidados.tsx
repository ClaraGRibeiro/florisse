import { WHATSAPP } from "@/data/config";
import { motion } from "framer-motion";
import { FaBoxOpen, FaFire, FaSoap, FaSun } from "react-icons/fa";

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
      className="bg-card-soft scroll-mt-20 py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-primary text-[10px] font-semibold tracking-[0.25em] uppercase sm:text-xs">
            Feito para durar
          </span>

          <h2 className="mt-2 font-serif text-3xl leading-tight font-semibold sm:text-4xl">
            Cuide da sua peça com carinho
          </h2>

          <p className="text-muted mx-auto mt-3 max-w-lg text-sm leading-relaxed">
            Pequenos cuidados ajudam a preservar os fios, os pontos e as cores
            para que sua peça continue bonita por muito tempo.
          </p>
        </div>

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
                className="group border-border bg-card rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-300">
                  <Icon size={15} />
                </div>

                <h3 className="text-foreground mt-4 font-serif text-lg font-semibold">
                  {care.title}
                </h3>

                <p className="text-muted mt-2 text-xs leading-relaxed sm:text-sm">
                  {care.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <p className="text-foreground text-sm">
            Quer saber como cuidar de uma peça específica?
          </p>

          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/70 mt-1 inline-block text-sm font-medium transition-colors"
          >
            Fale com a Florisse →
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
