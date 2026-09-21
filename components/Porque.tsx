import { FaHeart, FaPalette, FaLocationDot, FaWhatsapp } from "react-icons/fa6";
import { motion } from "framer-motion";
import { CITY } from "@/data/config";

const benefits = [
  {
    icon: FaHeart,
    title: "Feito à mão",
    description: "Cada peça é produzida artesanalmente, ponto por ponto.",
  },
  {
    icon: FaPalette,
    title: "Do seu jeito",
    description: "Escolha as cores e, quando possível, personalize o tamanho.",
  },
  {
    icon: FaLocationDot,
    title: "Feito em " + CITY,
    description: "Produção local e atendimento próximo.",
  },
  {
    icon: FaWhatsapp,
    title: "Pelo WhatsApp",
    description: "Converse diretamente para confirmar seu pedido.",
  },
];

export default function PorQueFlorisse() {
  return (
    <motion.section
      id="por-que-florisse"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="bg-background relative scroll-mt-20 overflow-hidden py-20 sm:py-24"
    >
      <div className="bg-primary/5 pointer-events-none absolute top-20 -left-24 h-64 w-64 rounded-full blur-3xl" />
      <div className="bg-primary/5 pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center sm:mb-14">
          <div className="text-primary flex items-center justify-center gap-3 text-xs font-medium tracking-[0.2em] uppercase">
            <span>✦</span>
            <span>Por que escolher a Florisse?</span>
            <span>✦</span>
          </div>

          <h2 className="text-foreground mt-4 font-serif text-4xl leading-tight font-medium sm:text-5xl">
            Feito com <span className="text-primary italic">cuidado</span>,
            pensado para você.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="group border-border bg-card hover:border-primary/20 rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7"
              >
                <div className="bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110">
                  <Icon className="text-base" />
                </div>

                <h3 className="text-foreground mt-5 font-serif text-xl font-semibold">
                  {benefit.title}
                </h3>

                <p className="text-muted mt-2 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
