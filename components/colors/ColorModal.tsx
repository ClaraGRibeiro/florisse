import { AnimatePresence, motion } from "framer-motion";
import { FaPinterest } from "react-icons/fa";
import { useMemo } from "react";

import { useModalAccessibility } from "@/hooks/useModalAccessibility";
import {
  Color,
  getColorCombinations,
  getColorImage,
  getProductsByColor,
} from "@/lib/colors";
import ColorProductCard from "@/components/colors/ColorProductCard";
import { Product } from "@/types/product";

type ColorModalProps = {
  selectedColorName: string | null;
  colors: Color[];
  products: Product[];
  formatColor: (name: string) => string;
  onClose: () => void;
  onSelectColor: (colorName: string) => void;
};

export default function ColorModal({
  selectedColorName,
  colors,
  products,
  formatColor,
  onClose,
  onSelectColor,
}: ColorModalProps) {
  const activeColorData = colors.find(
    (color) => color.name === selectedColorName,
  );

  const activeCombinations = selectedColorName
    ? getColorCombinations(selectedColorName)
    : [];

  const productsWithColor = useMemo(
    () =>
      selectedColorName ? getProductsByColor(products, selectedColorName) : [],
    [products, selectedColorName],
  );

  const accessibility = useModalAccessibility({
    isOpen: Boolean(selectedColorName) && Boolean(activeColorData),
    onClose,
  });

  return (
    <AnimatePresence>
      {selectedColorName && activeColorData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={accessibility.dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="color-modal-title"
            aria-describedby="color-modal-description"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-card relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-4xl shadow-2xl focus:outline-none"
          >
            <div className="border-border border-b px-6 py-6 pr-16 sm:px-7">
              <button
                type="button"
                onClick={onClose}
                aria-label={`Fechar peças na cor ${formatColor(
                  activeColorData.name,
                )}`}
                className="bg-background text-foreground hover:bg-input focus-visible:ring-primary absolute top-5 right-5 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-base shadow-sm transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                <span aria-hidden="true">✕</span>
              </button>

              <div className="flex items-center gap-4">
                <div
                  className="border-border h-12 w-12 shrink-0 rounded-full border shadow-md"
                  style={{ backgroundColor: activeColorData.hex }}
                  aria-hidden="true"
                />

                <div>
                  <span className="text-muted text-xs tracking-[0.2em] uppercase">
                    Cor selecionada
                  </span>

                  <h2
                    id="color-modal-title"
                    className="mt-0.5 font-serif text-2xl leading-tight font-semibold sm:text-3xl"
                  >
                    {formatColor(activeColorData.name)}
                  </h2>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 wrap-normal">
                <p
                  id="color-modal-description"
                  className="text-muted mt-4 text-sm leading-relaxed"
                >
                  Veja algumas combinações que podem funcionar com essa cor.
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 sm:px-7">
              {activeCombinations.length > 0 && (
                <div className="mb-8">
                  <div className="mb-4">
                    <span className="text-primary text-[10px] font-semibold tracking-[0.2em] uppercase">
                      Para combinar
                    </span>

                    <h3 className="mt-1 font-serif text-xl font-semibold">
                      Combinações de cores
                    </h3>
                  </div>

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
                        className="border-border bg-background/50 overflow-hidden rounded-2xl border p-3"
                      >
                        <div className="mb-2 flex items-center justify-between px-1">
                          <span className="text-muted text-[10px] font-semibold tracking-[0.15em] uppercase">
                            Combinação {index + 1}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          {combo.map((colorNameInCombo) => {
                            const foundColor = colors.find(
                              (color) => color.name === colorNameInCombo,
                            );

                            if (!foundColor) {
                              return null;
                            }

                            return (
                              <button
                                key={colorNameInCombo}
                                type="button"
                                onClick={() => onSelectColor(colorNameInCombo)}
                                title={`Ver combinações com ${formatColor(
                                  foundColor.name,
                                )}`}
                                aria-label={`Ver combinações com ${formatColor(
                                  foundColor.name,
                                )}`}
                                className="group focus-visible:ring-primary cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                              >
                                <div
                                  className="border-border h-16 w-full overflow-hidden rounded-xl border shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md"
                                  style={{
                                    backgroundColor: foundColor.hex,
                                  }}
                                >
                                  <div className="h-full w-full bg-linear-to-br from-white/15 via-transparent to-black/10 opacity-0 transition-opacity group-hover:opacity-100" />
                                </div>

                                <span className="text-foreground-soft group-hover:text-primary mt-1.5 block truncate text-center text-[10px] font-medium transition-colors">
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
              )}

              <div>
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <span className="text-primary text-[10px] font-semibold tracking-[0.2em] uppercase">
                      Feito para você
                    </span>

                    <h3 className="mt-1 font-serif text-2xl leading-tight font-semibold">
                      Gostou dessa cor?
                    </h3>

                    <p className="text-muted mt-1 text-sm">
                      {productsWithColor.length > 0
                        ? "Veja peças que podem ganhar esse tom."
                        : "Ainda não temos uma peça dessa cor na galeria, mas veja no Pinterest."}
                    </p>
                  </div>

                  {productsWithColor.length > 0 && (
                    <span className="text-muted shrink-0 text-xs font-medium">
                      {productsWithColor.length}{" "}
                      {productsWithColor.length === 1 ? "peça" : "peças"}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {productsWithColor.map(({ product, color }, index) => (
                    <ColorProductCard
                      key={`${product.name}-${color}`}
                      product={product}
                      color={color}
                      index={index}
                      formatColor={formatColor}
                      image={getColorImage(product, color)}
                    />
                  ))}

                  <a
                    href={`https://br.pinterest.com/search/pins/?q=${encodeURIComponent(
                      `moda casa crochê na cor ${activeColorData.name}`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver inspirações de ${activeColorData.name} no Pinterest`}
                    className="group border-primary/30 bg-primary/5 hover:border-primary/50 hover:bg-primary/10 focus-visible:ring-primary flex h-full min-h-62.5 flex-col items-center justify-center rounded-2xl border border-dashed p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  >
                    <div className="flex flex-1 flex-col items-center justify-center gap-4">
                      <div
                        className="bg-primary flex h-14 w-14 items-center justify-center rounded-full text-white shadow-md transition-transform duration-300 group-hover:scale-110"
                        aria-hidden="true"
                      >
                        <FaPinterest size={27} />
                      </div>

                      <div>
                        <p className="text-foreground font-serif text-sm font-semibold sm:text-base">
                          Inspire-se
                        </p>

                        <p className="text-muted mt-1 max-w-37.5 text-[11px] leading-relaxed sm:text-xs">
                          Veja ideias e referências de crochê na web
                        </p>
                      </div>
                    </div>

                    <span className="text-primary mt-4 text-[10px] font-semibold tracking-wide uppercase transition-transform duration-300 group-hover:translate-x-1">
                      Explorar no Pinterest →
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="border-border bg-background/40 border-t px-6 py-4 sm:px-7">
              <p className="text-muted text-center text-xs">
                Clique em outra cor para continuar explorando.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
