import colorsData from "@/data/colors.json";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaPalette } from "react-icons/fa";

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
  const [selectedColorName, setSelectedColorName] = useState<string | null>(null);
  const colorCombinations: Record<string, string[][]> = {
    cru: [
      ["cru", "bege", "marrom"],
      ["cru", "militar", "alecrim"],
      ["cru", "marinho", "jeans"],
    ],
    branco: [
      ["branco", "cru", "bege"],
      ["branco", "azul bebe", "rosa bebe"],
      ["branco", "preto", "cinza"],
    ],
    preto: [
      ["preto", "cru", "cinza"],
      ["preto", "ouro", "bordo"],
      ["preto", "pink", "branco"],
    ],
    cinza: [
      ["cinza", "chumbo", "branco"],
      ["cinza", "rosa bebe", "lilas claro"],
      ["cinza", "preto", "amarelo bebe"],
    ],
    nude: [
      ["nude", "cru", "bege"],
      ["nude", "malva", "marrom"],
      ["nude", "alecrim", "salmao"],
    ],
    chumbo: [
      ["chumbo", "cinza", "branco"],
      ["chumbo", "mostarda", "preto"],
      ["chumbo", "piscina", "cru"],
    ],
    "amarelo bebe": [
      ["amarelo bebe", "branco", "cru"],
      ["amarelo bebe", "cinza", "chumbo"],
      ["amarelo bebe", "azul bebe", "rosa bebe"],
    ],
    ouro: [
      ["ouro", "marrom", "cru"],
      ["ouro", "preto", "bordo"],
      ["ouro", "militar", "nude"],
    ],
    mostarda: [
      ["mostarda", "marinho", "petroleo"],
      ["mostarda", "telha", "marrom"],
      ["mostarda", "cru", "cinza"],
    ],
    rosa: [
      ["rosa", "rosa bebe", "branco"],
      ["rosa", "malva", "nude"],
      ["rosa", "alecrim", "cru"],
    ],
    "rosa bebe": [
      ["rosa bebe", "branco", "cru"],
      ["rosa bebe", "lilas claro", "agua claro"],
      ["rosa bebe", "cinza", "chumbo"],
    ],
    pink: [
      ["pink", "preto", "branco"],
      ["pink", "magenta", "roxo"],
      ["pink", "laranja", "cru"],
    ],
    malva: [
      ["malva", "nude", "rosa bebe"],
      ["malva", "alecrim", "cru"],
      ["malva", "bordo", "cinza"],
    ],
    "lilas claro": [
      ["lilas claro", "branco", "cru"],
      ["lilas claro", "roxo", "magenta"],
      ["lilas claro", "agua claro", "amarelo bebe"],
    ],
    salmao: [
      ["salmao", "cru", "bege"],
      ["salmao", "melancia", "branco"],
      ["salmao", "petroleo", "nude"],
    ],
    telha: [
      ["telha", "marrom", "cru"],
      ["telha", "mostarda", "militar"],
      ["telha", "jeans", "nude"],
    ],
    laranja: [
      ["laranja", "preto", "branco"],
      ["laranja", "pink", "mostarda"],
      ["laranja", "marrom", "cru"],
    ],
    "agua claro": [
      ["agua claro", "branco", "cru"],
      ["agua claro", "agua escuro", "piscina"],
      ["agua claro", "lilas claro", "rosa bebe"],
    ],
    limao: [
      ["limao", "branco", "cru"],
      ["limao", "militar", "musgo"],
      ["limao", "cinza", "preto"],
    ],
    esmeralda: [
      ["esmeralda", "cru", "bege"],
      ["esmeralda", "marinho", "branco"],
      ["esmeralda", "ouro", "nude"],
    ],
    bandeira: [
      ["bandeira", "branco", "cru"],
      ["bandeira", "preto", "cinza"],
      ["bandeira", "ouro", "marrom"],
    ],
    musgo: [
      ["musgo", "alecrim", "cru"],
      ["musgo", "marrom", "bege"],
      ["musgo", "telha", "mostarda"],
    ],
    militar: [
      ["militar", "cru", "nude"],
      ["militar", "ouro", "preto"],
      ["militar", "laranja", "cinza"],
    ],
    alecrim: [
      ["alecrim", "cru", "branco"],
      ["alecrim", "musgo", "militar"],
      ["alecrim", "malva", "nude"],
    ],
    "agua escuro": [
      ["agua escuro", "cru", "branco"],
      ["agua escuro", "petroleo", "marinho"],
      ["agua escuro", "mostarda", "cinza"],
    ],
    "azul bebe": [
      ["azul bebe", "branco", "cru"],
      ["azul bebe", "rosa bebe", "amarelo bebe"],
      ["azul bebe", "jeans", "marinho"],
    ],
    piscina: [
      ["piscina", "branco", "cru"],
      ["piscina", "royal", "marinho"],
      ["piscina", "salmao", "bege"],
    ],
    petroleo: [
      ["petroleo", "cru", "bege"],
      ["petroleo", "mostarda", "telha"],
      ["petroleo", "agua claro", "branco"],
    ],
    royal: [
      ["royal", "branco", "preto"],
      ["royal", "ouro", "cru"],
      ["royal", "jeans", "cinza"],
    ],
    marinho: [
      ["marinho", "cru", "branco"],
      ["marinho", "jeans", "azul bebe"],
      ["marinho", "mostarda", "telha"],
    ],
    vermelho: [
      ["vermelho", "cru", "bege"],
      ["vermelho", "preto", "branco"],
      ["vermelho", "bordo", "ouro"],
    ],
    bordo: [
      ["bordo", "cru", "nude"],
      ["bordo", "rosa bebe", "cinza"],
      ["bordo", "ouro", "preto"],
    ],
    melancia: [
      ["melancia", "cru", "branco"],
      ["melancia", "rosa", "limao"],
      ["melancia", "marrom", "bege"],
    ],
    marrom: [
      ["marrom", "bege", "cru"],
      ["marrom", "telha", "ouro"],
      ["marrom", "petroleo", "nude"],
    ],
    bege: [
      ["bege", "cru", "marrom"],
      ["bege", "nude", "branco"],
      ["bege", "militar", "telha"],
    ],
    jeans: [
      ["jeans", "marinho", "cru"],
      ["jeans", "azul bebe", "branco"],
      ["jeans", "mostarda", "chumbo"],
    ],
    magenta: [
      ["magenta", "preto", "branco"],
      ["magenta", "roxo", "pink"],
      ["magenta", "mostarda", "cru"],
    ],
    roxo: [
      ["roxo", "lilas claro", "branco"],
      ["roxo", "preto", "chumbo"],
      ["roxo", "ouro", "nude"],
    ],
  };
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
      colors: ["pink", "royal", "laranja", "limao", "roxo", "amarelo bebe"],
    },
    {
      category: "Festa Junina",
      colors: ["vermelho", "mostarda", "telha", "bandeira", "marrom", "cru"],
    },
    {
      category: "Halloween",
      colors: ["laranja", "preto", "roxo", "chumbo", "mostarda", "bordo"],
    },


    {
      category: "Dia dos Pais",
      colors: ["marinho", "jeans", "cinza", "chumbo", "cru", "marrom"],
    },
    {
      category: "Natal",
      colors: ["vermelho", "bandeira", "ouro", "bordo", "militar", "marinho"],
    },
    {
      category: "Ano Novo",
      colors: ["branco", "ouro", "cinza", "cru", "nude", "preto"],
    },
  ];

  const activeColorData = colors.find((c) => c.name === selectedColorName);
  const activeCombinations = selectedColorName ? colorCombinations[selectedColorName] : [];

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
        {/* HEADER */}
        <div className="mb-12 text-center">
          <span className="text-sm uppercase tracking-[0.3em] text-primary">
            Catálogo de Cores
          </span>

          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            Escolha sua combinação favorita
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Clique em qualquer cor para visualizar suas sugestões de combinações.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12">
          {colors.map((color) => (
            <div
              key={color.name}
              className="group cursor-pointer"
              onClick={() => setSelectedColorName(color.name)}
            >
              <div
                className="h-12 rounded-xl border border-border shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg hover:scale-105"
                style={{ backgroundColor: color.hex }}
              />

              <p className="mt-2 text-center text-xs font-medium capitalize text-foreground">
                {formatColor(color.name)}
              </p>
            </div>
          ))}

          <button
            onClick={() => setOpenPalette(true)}
            className="group flex flex-col items-center"
          >
            <div className="cursor-pointer flex h-12 w-full items-center justify-center rounded-xl border border-dashed border-border bg-background text-primary shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
              <FaPalette size={20}/>
            </div>

            <p className="mt-2 text-center text-xs font-medium text-foreground">
              Ideias de Paleta
            </p>
          </button>
        </div>
      </div>
      {/* MODAL */}
      <AnimatePresence>
        {openPalette && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6">
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpenPalette(false)}
            />

            {/* MODAL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-4xl bg-card p-6 shadow-2xl md:p-8"            >
              {/* FECHAR */}
              <button
                onClick={() => setOpenPalette(false)}
                className="absolute top-5 right-5 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-background/90 text-lg shadow-md backdrop-blur transition hover:scale-105"
              >
                ✕
              </button>

              {/* HEADER */}
              <div className="border-b border-border pb-5 pr-10">
                <span className="text-sm uppercase tracking-[0.3em] text-primary">
                  Inspirações
                </span>

                <h2 className="mt-2 text-3xl font-bold md:text-4xl">
                  Ideias de Paletas
                </h2>

                <p className="mt-2 max-w-2xl text-sm text-muted">
                  Combinações pensadas para ocasiões, estações e estilos.
                </p>
              </div>

              {/* CONTEÚDO */}
              <div className="mt-6 flex-1 overflow-y-auto pr-1">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {colorsByPalette.map((palette) => (
                    <div
                      key={palette.category}
                      className="rounded-3xl bg-background/40 p-5"
                    >
                      {/* TITULO */}
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-xl font-bold">
                          {palette.category}
                        </h3>
                      </div>

                      {/* BOLINHAS */}
                      <div className="flex flex-wrap gap-3">
                        {palette.colors.map((colorName) => {
                          const foundColor = colors.find(
                            (c) => c.name === colorName
                          );

                          if (!foundColor) return null;

                          return (
                            <button
                              key={colorName}
                              onClick={() =>
                                setSelectedColorName(colorName)
                              }
                              title={formatColor(foundColor.name)}
                              className="group"
                            >
                              <div
                                className="h-12 w-32 rounded-xl border border-border shadow-sm transition-all duration-200 group-hover:shadow-lg"
                                style={{
                                  backgroundColor: foundColor.hex,
                                }}
                              />

                              <span className="text-center text-xs font-medium capitalize text-foreground">
                                {formatColor(foundColor.name)}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedColorName && activeColorData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6">
            {/* Backdrop Padronizado */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedColorName(null)}
            />

            {/* Caixa do Popup Padronizada */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md max-h-[92vh] overflow-y-auto rounded-4xl bg-card p-6 shadow-2xl md:p-8 flex flex-col z-10"
            >
              {/* Botão de Fechar Padronizado */}
              <button
                onClick={() => setSelectedColorName(null)}
                className="absolute top-5 right-5 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-background/90 text-lg shadow-md backdrop-blur transition hover:scale-105"
              >
                ✕
              </button>

              {/* Título do Popup */}
              <div className="border-b border-border pb-5 pr-10">
                <div className="flex items-center gap-3">
                  <div
                    className="h-6 w-6 rounded-full border border-white/20 shadow-sm"
                    style={{ backgroundColor: activeColorData.hex }}
                  />
                  <h2 className="text-2xl font-bold leading-tight md:text-3xl">
                    {formatColor(activeColorData.name)}
                  </h2>
                </div>
                <p className="mt-2 text-sm text-muted">
                  Combinações sugeridas com esta cor:
                </p>
              </div>

              {/* Conteúdo das Combinações */}
              <div className="mt-3 space-y-4 overflow-y-auto flex-1 pr-1">
                {activeCombinations && activeCombinations.length > 0 ? (
                  activeCombinations.map((combo, idx) => (
                    <div key={idx} className="flex flex-wrap items-center gap-2 bg-background/40 py-3 rounded-2xl px-2">
                      {combo.map((colorNameInCombo) => {
                        const foundColor = colors.find((c) => c.name === colorNameInCombo);
                        if (!foundColor) return null;

                        return (
                          <div key={colorNameInCombo} className="flex flex-1 flex-col items-center gap-1">
                            <div
                              className="h-10 w-full rounded-lg border border-border shadow-inner"
                              style={{ backgroundColor: foundColor.hex }}
                            />
                            <span className="text-[10px] font-medium capitalize text-center truncate w-full text-foreground">
                              {formatColor(foundColor.name)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted italic text-center py-4">
                    Nenhuma sugestão cadastrada para esta cor.
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}