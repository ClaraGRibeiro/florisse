import colorsData from "@/data/colors.json";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaPalette, FaArrowRight } from "react-icons/fa";
import colorsCombinationData from "@/data/colors-combination.json";

interface Color {
  name: string;
  hex: string;
}

const colors = colorsData as Color[];

type CoresProps = {
  formatColor: (name: string) => string;
};

export default function Cores({ formatColor }: CoresProps) {
  const [openPalette, setOpenPalette] = useState(false);
  const [selectedColorName, setSelectedColorName] = useState<string | null>(
    null
  );
const colorCombinations = colorsCombinationData as Record<string, string[][]>;

  const colorsByPalette = [
    {
      category: "Tons de Vermelho",
      colors: [
        "rosa bebe",
        "rosa",
        "pink",
        "melancia",
        "vermelho",
        "bordo",
      ],
    },
    {
      category: "Tons de Amarelo",
      colors: [
        "cru",
        "nude",
        "amarelo bebe",
        "ouro",
        "mostarda",
        "bege",
      ],
    },
    {
      category: "Tons de Verde",
      colors: [
        "agua escuro",
        "alecrim",
        "esmeralda",
        "musgo",
        "bandeira",
        "militar",
      ],
    },
    {
      category: "Tons de Azul",
      colors: [
        "azul bebe",
        "agua claro",
        "piscina",
        "jeans",
        "royal",
        "marinho",
      ],
    },
    {
      category: "Tons Monocromáticos",
      colors: [
        "branco",
        "cru",
        "nude",
        "cinza",
        "chumbo",
        "preto",
      ],
    },
    {
      category: "Arco-iris",
      colors: [
        "vermelho",
        "laranja",
        "ouro",
        "bandeira",
        "piscina",
        "roxo",
      ],
    },
    {
      category: "Primavera",
      colors: [
        "rosa",
        "salmao",
        "amarelo bebe",
        "azul bebe",
        "alecrim",
        "lilas claro",
      ],
    },
    {
      category: "Verão",
      colors: [
        "piscina",
        "laranja",
        "pink",
        "ouro",
        "royal",
        "limao",
      ],
    },
    {
      category: "Outono",
      colors: [
        "telha",
        "mostarda",
        "marrom",
        "militar",
        "ouro",
        "bordo",
      ],
    },
    {
      category: "Inverno",
      colors: [
        "marinho",
        "bordo",
        "chumbo",
        "petroleo",
        "roxo",
        "cinza",
      ],
    },
    {
      category: "Páscoa",
      colors: [
        "amarelo bebe",
        "rosa bebe",
        "lilas claro",
        "agua claro",
        "branco",
        "cru",
      ],
    },
    {
      category: "Chá Revelação",
      colors: [
        "rosa bebe",
        "azul bebe",
        "branco",
        "rosa",
        "piscina",
        "cru",
      ],
    },
    {
      category: "Dia das Mães",
      colors: ["rosa", "malva", "nude", "cru", "bege", "ouro"],
    },
    {
      category: "Dia dos Namorados",
      colors: ["rosa", "pink", "vermelho", "bordo", "nude", "branco"],
    },
    {
      category: "Carnaval",
      colors: [
        "pink",
        "royal",
        "laranja",
        "limao",
        "roxo",
        "amarelo bebe",
      ],
    },
    {
      category: "Festa Junina",
      colors: [
        "vermelho",
        "mostarda",
        "telha",
        "bandeira",
        "marrom",
        "cru",
      ],
    },
    {
      category: "Halloween",
      colors: [
        "laranja",
        "preto",
        "roxo",
        "chumbo",
        "mostarda",
        "bordo",
      ],
    },
    {
      category: "Dia dos Pais",
      colors: [
        "marinho",
        "jeans",
        "cinza",
        "chumbo",
        "cru",
        "marrom",
      ],
    },
    {
      category: "Natal",
      colors: [
        "vermelho",
        "bandeira",
        "ouro",
        "bordo",
        "militar",
        "marinho",
      ],
    },
    {
      category: "Ano Novo",
      colors: [
        "branco",
        "ouro",
        "cinza",
        "cru",
        "nude",
        "preto",
      ],
    },
  ];

  const activeColorData = colors.find(
    (color) => color.name === selectedColorName
  );

  const activeCombinations = selectedColorName
    ? colorCombinations[selectedColorName]
    : [];

  const openColor = (colorName: string) => {
    setOpenPalette(false);
    setSelectedColorName(colorName);
  };

  return (
    <motion.section
      id="cores"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="scroll-mt-20 bg-card py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Feito para combinar
          </span>

          <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            Encontre a cor que combina com você
          </h2>

          <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
            Escolha uma cor para descobrir combinações pensadas para deixar
            suas peças ainda mais especiais.
          </p>
        </div>

        {/* GRID DE CORES */}
        <div className="mx-auto grid max-w-6xl grid-cols-4 gap-x-3 gap-y-6 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
          {colors.map((color) => {
            const isLight =
              color.hex.toLowerCase() === "#ffffff" ||
              color.hex.toLowerCase() === "#fff";

            return (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColorName(color.name)}
                className="group flex cursor-pointer flex-col items-center rounded-2xl p-1 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label={`Ver combinações para ${formatColor(color.name)}`}
              >
                <div
                  className={`relative h-14 w-14 overflow-hidden rounded-full shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg sm:h-16 sm:w-16 ${
                    isLight ? "border border-border" : ""
                  }`}
                  style={{ backgroundColor: color.hex }}
                >
                  <div className="absolute inset-0 rounded-full bg-linear-to-br from-white/20 via-transparent to-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <span className="mt-2 max-w-20 text-center text-[11px] font-medium leading-tight text-foreground-soft transition-colors group-hover:text-primary sm:text-xs">
                  {formatColor(color.name)}
                </span>
              </button>
            );
          })}

          {/* PALETAS */}
          <button
            type="button"
            onClick={() => setOpenPalette(true)}
            className="group flex cursor-pointer flex-col items-center rounded-2xl p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-primary/10 text-primary shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg sm:h-16 sm:w-16">
              <FaPalette size={20} />

              <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            <span className="mt-2 max-w-20 text-center text-[11px] font-medium leading-tight text-foreground-soft transition-colors group-hover:text-primary sm:text-xs">
              Ideias de paleta
            </span>
          </button>
        </div>

        {/* FRASE INFERIOR */}
        <div className="mx-auto mt-14 flex max-w-xl items-center justify-center gap-3 text-center">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted">
            Cada combinação pode ganhar uma nova peça
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>
      </div>

      {/* MODAL DE PALETAS */}
      <AnimatePresence>
        {openPalette && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpenPalette(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative z-10 flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-4xl bg-card shadow-2xl"
            >
              {/* HEADER */}
              <div className="border-b border-border px-5 py-6 pr-16 sm:px-8 sm:py-7">
                <button
                  type="button"
                  onClick={() => setOpenPalette(false)}
                  aria-label="Fechar"
                  className="absolute right-5 top-5 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-background text-base text-foreground shadow-sm transition-all hover:scale-105 hover:bg-input"
                >
                  ✕
                </button>

                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  Inspirações
                </span>

                <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
                  Ideias de Paletas
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                  Combinações pensadas para diferentes estilos, momentos e
                  estações do ano.
                </p>
              </div>

              {/* CONTEÚDO */}
              <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {colorsByPalette.map((palette, paletteIndex) => (
                    <motion.div
                      key={palette.category}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: paletteIndex * 0.025,
                      }}
                      className="group rounded-3xl border border-border bg-background/50 p-5 transition-all duration-300 hover:border-primary/20 hover:shadow-md"
                    >
                      {/* TITULO */}
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-serif text-xl font-semibold">
                          {palette.category}
                        </h3>

                        <FaArrowRight
                          size={13}
                          className="text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary"
                        />
                      </div>

                      {/* CORES */}
                      <div className="grid grid-cols-3 gap-2">
                        {palette.colors.map((colorName) => {
                          const foundColor = colors.find(
                            (color) => color.name === colorName
                          );

                          if (!foundColor) return null;

                          return (
                            <button
                              key={colorName}
                              type="button"
                              onClick={() => openColor(colorName)}
                              title={formatColor(foundColor.name)}
                              className="group/color cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                            >
                              <div
                                className="h-14 w-full overflow-hidden rounded-xl border border-border shadow-sm transition-all duration-300 group-hover/color:-translate-y-0.5 group-hover/color:shadow-md sm:h-16"
                                style={{
                                  backgroundColor: foundColor.hex,
                                }}
                              >
                                <div className="h-full w-full bg-linear-to-br from-white/15 via-transparent to-black/10 opacity-0 transition-opacity group-hover/color:opacity-100" />
                              </div>

                              <span className="mt-1.5 block truncate text-center text-[10px] font-medium text-muted transition-colors group-hover/color:text-primary sm:text-xs">
                                {formatColor(foundColor.name)}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL DE COR */}
      <AnimatePresence>
        {selectedColorName && activeColorData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedColorName(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative z-10 flex max-h-[92vh] w-full max-w-md flex-col overflow-hidden rounded-4xl bg-card shadow-2xl"
            >
              {/* HEADER */}
              <div className="border-b border-border px-6 py-6 pr-16 sm:px-7">
                <button
                  type="button"
                  onClick={() => setSelectedColorName(null)}
                  aria-label="Fechar"
                  className="absolute right-5 top-5 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-background text-base text-foreground shadow-sm transition-all hover:scale-105 hover:bg-input"
                >
                  ✕
                </button>

                <div className="flex items-center gap-4">
                  <div
                    className="h-12 w-12 shrink-0 rounded-full border border-border shadow-md"
                    style={{
                      backgroundColor: activeColorData.hex,
                    }}
                  />

                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] text-muted">
                      Cor selecionada
                    </span>

                    <h2 className="mt-0.5 font-serif text-2xl font-semibold leading-tight sm:text-3xl">
                      {formatColor(activeColorData.name)}
                    </h2>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted">
                  Veja algumas combinações que podem funcionar com essa cor.
                </p>
              </div>

              {/* COMBINAÇÕES */}
              <div className="flex-1 overflow-y-auto px-6 py-5 sm:px-7">
                {activeCombinations && activeCombinations.length > 0 ? (
                  <div className="space-y-4">
                    {activeCombinations.map((combo, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.06,
                        }}
                        className="overflow-hidden rounded-2xl border border-border bg-background/50 p-3"
                      >
                        <div className="mb-2 flex items-center justify-between px-1">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                            Combinação {index + 1}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          {combo.map((colorNameInCombo) => {
                            const foundColor = colors.find(
                              (color) => color.name === colorNameInCombo
                            );

                            if (!foundColor) return null;

                            return (
                              <button
                                key={colorNameInCombo}
                                type="button"
                                onClick={() =>
                                  setSelectedColorName(colorNameInCombo)
                                }
                                title={`Ver combinações com ${formatColor(
                                  foundColor.name
                                )}`}
                                className="group cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                              >
                                <div
                                  className="h-16 w-full overflow-hidden rounded-xl border border-border shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md"
                                  style={{
                                    backgroundColor: foundColor.hex,
                                  }}
                                >
                                  <div className="h-full w-full bg-linear-to-br from-white/15 via-transparent to-black/10 opacity-0 transition-opacity group-hover:opacity-100" />
                                </div>

                                <span className="mt-1.5 block truncate text-center text-[10px] font-medium text-foreground-soft transition-colors group-hover:text-primary">
                                  {formatColor(foundColor.name)}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="py-8 text-center text-sm italic text-muted">
                    Nenhuma sugestão cadastrada para esta cor.
                  </p>
                )}
              </div>

              {/* RODAPÉ */}
              <div className="border-t border-border bg-background/40 px-6 py-4 sm:px-7">
                <p className="text-center text-xs text-muted">
                  Clique em outra cor para explorar novas combinações.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}