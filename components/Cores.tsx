import colorsData from "@/data/colors.json";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface Color {
  name: string;
  hex: string;
}

const colors = colorsData as Color[];

type CoresProps = {
  formatColor: (name: string) => string;
};

export default function Cores({ formatColor }: CoresProps) {
  // Estado para controlar qual cor está selecionada e abrir o popup
  const [selectedColorName, setSelectedColorName] = useState<string | null>(null);
  const colorCombinations: Record<string, string[][]> = {
    cru: [
      ["cru", "bege", "marrom"], // Degradê rústico chic
      ["cru", "militar", "alecrim"], // Botânico natural
      ["cru", "marinho", "jeans"], // Navy sofisticado
    ],
    branco: [
      ["branco", "cru", "bege"], // Minimalista Clean
      ["branco", "azul bebe", "rosa bebe"], // Candy pastel clássico
      ["branco", "preto", "cinza"], // Monocromático moderno
    ],
    preto: [
      ["preto", "cru", "cinza"], // Contraste urbano
      ["preto", "ouro", "bordo"], // Barroco elegante / Luxo
      ["preto", "pink", "branco"], // Fashionista vibrante
    ],
    cinza: [
      ["cinza", "chumbo", "branco"], // Degradê escala de cinzas
      ["cinza", "rosa bebe", "lilas claro"], // Romântico contemporâneo
      ["cinza", "preto", "amarelo bebe"], // Urbano com ponto de luz
    ],
    nude: [
      ["nude", "cru", "bege"], // Atemporal / Neutro absoluto
      ["nude", "malva", "marrom"], // Tons de terra românticos
      ["nude", "alecrim", "salmao"], // Boho delicado
    ],
    chumbo: [
      ["chumbo", "cinza", "branco"], // Minimalista industrial
      ["chumbo", "mostarda", "preto"], // Moderno de alto contraste
      ["chumbo", "piscina", "cru"], // Contemporâneo ousado
    ],
    "amarelo bebe": [
      ["amarelo bebe", "branco", "cru"], // Delicadeza pura
      ["amarelo bebe", "cinza", "chumbo"], // Paleta nórdica escandinava
      ["amarelo bebe", "azul bebe", "rosa bebe"], // Trio infantil encantador
    ],
    ouro: [
      ["ouro", "marrom", "cru"], // Outonal caloroso
      ["ouro", "preto", "bordo"], // Requinte sofisticado
      ["ouro", "militar", "nude"], // Terroso militar chic
    ],
    mostarda: [
      ["mostarda", "marinho", "petroleo"], // Contraste complementar profundo
      ["mostarda", "telha", "marrom"], // Total outonal / Boho Warm
      ["mostarda", "cru", "cinza"], // Moderno e equilibrado
    ],
    rosa: [
      ["rosa", "rosa bebe", "branco"], // Degradê romântico
      ["rosa", "malva", "nude"], // Vintage chic
      ["rosa", "alecrim", "cru"], // Cores complementares suaves (estilo jardim)
    ],
    "rosa bebe": [
      ["rosa bebe", "branco", "cru"], // Suavidade clássica
      ["rosa bebe", "lilas claro", "agua claro"], // Trio sereia / Candy macaron
      ["rosa bebe", "cinza", "chumbo"], // Equilíbrio moderno (o cinza quebra o infantil)
    ],
    pink: [
      ["pink", "preto", "branco"], // Pop de alta energia
      ["pink", "magenta", "roxo"], // Degradê análogo imponente
      ["pink", "laranja", "cru"], // Color block tropical de verão
    ],
    malva: [
      ["malva", "nude", "rosa bebe"], // Romantismo nostálgico
      ["malva", "alecrim", "cru"], // Natural botânico sofisticado
      ["malva", "bordo", "cinza"], // Elegância sóbria de inverno
    ],
    "lilas claro": [
      ["lilas claro", "branco", "cru"], // Clean e místico
      ["lilas claro", "roxo", "magenta"], // Paleta ametista potente
      ["lilas claro", "agua claro", "amarelo bebe"], // Jardim pastel alegre
    ],
    salmao: [
      ["salmao", "cru", "bege"], // Natural praiano
      ["salmao", "melancia", "branco"], // Degradê fresh de frutas
      ["salmao", "petroleo", "nude"], // Combinação rica de opostos
    ],
    telha: [
      ["telha", "marrom", "cru"], // Terracota rústico (sucesso garantido em crochê)
      ["telha", "mostarda", "militar"], // Paleta artesanal folk
      ["telha", "jeans", "nude"], // Rústico urbano chique
    ],
    laranja: [
      ["laranja", "preto", "branco"], // Gráfico e ousado
      ["laranja", "pink", "mostarda"], // Pôr do sol / Energia pura
      ["laranja", "marrom", "cru"], // Outono aconchegante
    ],
    "agua claro": [
      ["agua claro", "branco", "cru"], // Frescor de piscina limpa
      ["agua claro", "agua escuro", "piscina"], // Degradê oceânico total
      ["agua claro", "lilas claro", "rosa bebe"], // Algodão doce mágico
    ],
    limao: [
      ["limao", "branco", "cru"], // Cítrico minimalista
      ["limao", "militar", "musgo"], // Degradê folhagem moderno
      ["limao", "cinza", "preto"], // Cyber / Urbano de vanguarda
    ],
    esmeralda: [
      ["esmeralda", "cru", "bege"], // Clássico e requintado
      ["esmeralda", "marinho", "branco"], // Sofisticação náutica escura
      ["esmeralda", "ouro", "nude"], // Joia imperial
    ],
    bandeira: [
      ["bandeira", "branco", "cru"], // Tradicional e limpo
      ["bandeira", "preto", "cinza"], // Forte e sóbrio
      ["bandeira", "ouro", "marrom"], // Riqueza natural da terra
    ],
    musgo: [
      ["musgo", "alecrim", "cru"], // Herbário / Orgânico perfeito
      ["musgo", "marrom", "bege"], // Camuflagem terrosa clássica
      ["musgo", "telha", "mostarda"], // Artesanal vintage encorpado
    ],
    militar: [
      ["militar", "cru", "nude"], // Utilitário suave
      ["militar", "ouro", "preto"], // Luxo fechado
      ["militar", "laranja", "cinza"], // Contraste fashion contemporâneo
    ],
    alecrim: [
      ["alecrim", "cru", "branco"], // Calmaria / Minimalismo zen
      ["alecrim", "musgo", "militar"], // Tom sobre tom de verdes finos
      ["alecrim", "malva", "nude"], // Sofisticação poética apagada
    ],
    "agua escuro": [
      ["agua escuro", "cru", "branco"], // Frescor litorâneo
      ["agua escuro", "petroleo", "marinho"], // Profundidade abissal
      ["agua escuro", "mostarda", "cinza"], // Criativo de estúdio
    ],
    "azul bebe": [
      ["azul bebe", "branco", "cru"], // Nuvem clássica
      ["azul bebe", "rosa bebe", "amarelo bebe"], // Quarto de bebê tradicional
      ["azul bebe", "jeans", "marinho"], // Tons de jeans do claro ao escuro
    ],
    piscina: [
      ["piscina", "branco", "cru"], // Clean tropical
      ["piscina", "royal", "marinho"], // Degradê azul elétrico
      ["piscina", "salmao", "bege"], // Resort / Verão vibrante
    ],
    petroleo: [
      ["petroleo", "cru", "bege"], // Elegância rústica discreta
      ["petroleo", "mostarda", "telha"], // Paleta de arquitetura / Design rico
      ["petroleo", "agua claro", "branco"], // Degradê refrescante e maduro
    ],
    royal: [
      ["royal", "branco", "preto"], // Contraste náutico agudo
      ["royal", "ouro", "cru"], // Paleta realeza medieval
      ["royal", "jeans", "cinza"], // Casual inteligente
    ],
    marinho: [
      ["marinho", "cru", "branco"], // O verdadeiro estilo Navy litorâneo
      ["marinho", "jeans", "azul bebe"], // Monocromático jeans perfeito
      ["marinho", "mostarda", "telha"], // Étnico / Artesanal de peso
    ],
    vermelho: [
      ["vermelho", "cru", "bege"], // Clássico do artesanato mineiro / Rústico
      ["vermelho", "preto", "branco"], // Alta potência visual / Gráfico
      ["vermelho", "bordo", "ouro"], // Opulência calorosa
    ],
    bordo: [
      ["bordo", "cru", "nude"], // Sofisticação outonal suave
      ["bordo", "rosa bebe", "cinza"], // Contraste moderno burguês
      ["bordo", "ouro", "preto"], // Nobre e dramático
    ],
    melancia: [
      ["melancia", "cru", "branco"], // Delícia de verão clean
      ["melancia", "rosa", "verde claro" /*agua claro*/], // Divertido e fiel ao fruto
      ["melancia", "marrom", "bege"], // Equilíbrio terroso orgânico
    ],
    marrom: [
      ["marrom", "bege", "cru"], // O degradê campeão do crochê de barbante
      ["marrom", "telha", "ouro"], // Pôr do sol na terra
      ["marrom", "petroleo", "nude"], // Sofisticado e incomum (estilo decoração de luxo)
    ],
    bege: [
      ["bege", "cru", "marrom"], // Trio orgânico infalível
      ["bege", "nude", "branco"], // Sobriedade e leveza de linho
      ["bege", "militar", "telha"], // Aventura safari chique
    ],
    jeans: [
      ["jeans", "marinho", "cru"], // Casual prático equilibrado
      ["jeans", "azul bebe", "branco"], // Céu aberto límpido
      ["jeans", "mostarda", "chumbo"], // Paleta jovem e urbana
    ],
    magenta: [
      ["magenta", "preto", "branco"], // Contraste fashion dramático
      ["magenta", "roxo", "pink"], // Degradê análogo ultra feminino
      ["magenta", "mostarda", "cru"], // Boho-chic indiano exótico
    ],
    roxo: [
      ["roxo", "lilas claro", "branco"], // Degradê espiritual / Calmo e belo
      ["roxo", "preto", "chumbo"], // Gótico suave / Misterioso
      ["roxo", "ouro", "nude"], // Contraste complementar refinado
    ],
  };

  // Encontra os dados completos do objeto da cor selecionada
  const activeColorData = colors.find((c) => c.name === selectedColorName);

  // Pega as combinações para a cor selecionada (se houver)
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
        </div>
      </div>
      {/* MODAL */}
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
              className="relative w-full max-w-md max-h-[92vh] overflow-hidden rounded-4xl bg-card p-6 shadow-2xl md:p-8 flex flex-col z-10"
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