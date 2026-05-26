import { motion } from "framer-motion";
import {
  FaBoxOpen,
  FaFire,
  FaHandPaper,
  FaHeart,
  FaSoap,
  FaWind
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
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="scroll-mt-20 bg-card-soft py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold sm:text-5xl">
            Como cuidar da sua peça de crochê
          </h2>

          <p className="mt-4 text-muted max-w-2xl mx-auto text-base sm:text-lg">
            Pequenos cuidados fazem sua peça durar muitos anos com a mesma
            beleza e carinho de quando foi feita.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {careItems.map((care, index) => {
            const Icon = care.icon;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-border bg-linear-to-b from-card to-card-soft p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl transition-opacity group-hover:opacity-80" />

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition group-hover:scale-110">
                  <Icon size={20} className="text-primary" />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {care.title}
                </h3>

                <div className="mt-2 h-0.5 w-10 rounded-full bg-primary/30 transition-all group-hover:w-16 group-hover:bg-primary" />

                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {care.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
