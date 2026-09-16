import { motion } from "framer-motion";
import {
  FaBoxOpen,
  FaFire,
  FaHandPaper,
  FaHeart,
  FaSoap,
  FaWind,
} from "react-icons/fa";

export default function Cuidados() {
  const careItems = [
    {
      icon: FaHandPaper,
      title: "Lavar com cuidado",
      description:
        "Lave sempre à mão, com sabão neutro e água fria. Evite máquinas para não deformar os pontos.",
    },
    {
      icon: FaWind,
      title: "Secagem natural",
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
      title: "Evite calor",
      description:
        "Não passe ferro direto nem exponha a fontes de calor intenso.",
    },
    {
      icon: FaSoap,
      title: "Limpeza leve",
      description:
        "Para poeira do dia a dia, use pano seco ou escova bem macia.",
    },
    {
      icon: FaHeart,
      title: "Cuidado emocional",
      description:
        "Cada peça é feita à mão com tempo e carinho — trate como algo especial.",
    },
  ];

  return (
    <motion.section
      id="cuidados"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative scroll-mt-20 overflow-hidden bg-card-soft py-16 sm:py-20 lg:py-24"
    >
      {/* DECORAÇÃO */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Feito para durar
          </span>

          <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            Cuide da sua peça com carinho
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            Pequenos cuidados ajudam a preservar os fios, os pontos e as cores
            para que sua peça continue bonita por muito tempo.
          </p>
        </div>

        {/* CARDS */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {careItems.map((care, index) => {
            const Icon = care.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                }}
                className="group relative overflow-hidden rounded-[1.75rem] border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* BRILHO */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                {/* ÍCONE */}
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon size={19} />
                </div>

                {/* CONTEÚDO */}
                <div className="relative">
                  <h3 className="mt-5 font-serif text-xl font-semibold text-foreground">
                    {care.title}
                  </h3>

                  <div className="mt-3 h-px w-8 bg-primary/40 transition-all duration-300 group-hover:w-12 group-hover:bg-primary" />

                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {care.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* FRASE FINAL */}
        <div className="mx-auto mt-12 flex max-w-xl items-center justify-center gap-3 text-center">
          <span className="h-px flex-1 bg-border" />

          <div className="flex items-center gap-2 text-xs text-muted">
            <FaHeart className="text-primary" size={10} />
            <span>Um pouco de cuidado faz toda diferença</span>
          </div>

          <span className="h-px flex-1 bg-border" />
        </div>
      </div>
    </motion.section>
  );
}