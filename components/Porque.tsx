import { FaHeart, FaPalette, FaLocationDot, FaWhatsapp } from "react-icons/fa6";
import { motion } from "framer-motion";

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
    title: "Feito em Montes Claros",
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
      className="scroll-mt-20 relative overflow-hidden bg-background py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Título */}
        <div className="mb-12 text-center sm:mb-14">
          <div className="flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            <span>✦</span>
            <span>Por que escolher a Florisse?</span>
            <span>✦</span>
          </div>

          <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-foreground sm:text-5xl">
            Feito com{" "}
            <span className="italic text-primary">cuidado</span>,
            pensado para você.
          </h2>
        </div>

        {/* Cards */}
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
                className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg sm:p-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon className="text-base" />
                </div>

                <h3 className="mt-5 font-serif text-xl font-semibold text-foreground">
                  {benefit.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted">
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