import { motion } from "framer-motion";
import {
  FaPalette,
  FaLeaf,
  FaGem,
  FaHome,
  FaSun,
  FaHeart,
} from "react-icons/fa";
import colorsData from "@/data/colors.json";

interface Color {
  name: string;
  hex: string;
}

const colors = colorsData as Color[];

const combinations = [
  {
    icon: FaHome,
    title: "Neutros Elegantes",
    colors: ["cru", "bege", "nude"],
    description:
      "Combinação atemporal e sofisticada, perfeita para qualquer ambiente.",
  },
  {
    icon: FaLeaf,
    title: "Verdes Naturais",
    colors: ["alecrim", "esmeralda", "militar"],
    description:
      "Tons inspirados na natureza que trazem aconchego e tranquilidade.",
  },
  {
    icon: FaSun,
    title: "Quentes e Alegres",
    colors: ["mostarda", "telha", "laranja"],
    description:
      "Ideal para quem gosta de personalidade e ambientes acolhedores.",
  },
  {
    icon: FaGem,
    title: "Azuis Sofisticados",
    colors: ["piscina", "petróleo", "marinho"],
    description:
      "Visual moderno, elegante e muito versátil para decoração.",
  },
  {
    icon: FaHeart,
    title: "Delicadas",
    colors: ["rosa bebê", "lilás claro", "malva"],
    description:
      "Combinação suave e romântica para ambientes leves e delicados.",
  },
  {
    icon: FaPalette,
    title: "Contraste Moderno",
    colors: ["cru", "preto", "chumbo"],
    description:
      "Mistura contemporânea que destaca os detalhes da peça.",
  },
];

type CoresProps = {
  formatColor: (name: string) => string;
};
export default function Cores({
  formatColor,
}: CoresProps) {
  return (
    <motion.section
      id="cores"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="scroll-mt-20 bg-card py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <span className="text-sm uppercase tracking-[0.3em] text-primary">
            Catálogo de Cores
          </span>

          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            Escolha sua combinação favorita
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Todas as peças podem ser produzidas nas cores abaixo.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12">
          {colors.map((color) => (
            <div
              key={color.name}
              className="group"
            >
              <div
                className="h-12 rounded-xl border border-border shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg"
                style={{
                  backgroundColor: color.hex,
                }}
              />

              <p
                className="mt-2 text-center text-xs font-medium capitalize text-muted transition-colors group-hover:text-foreground"
              >
                {formatColor(color.name)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}