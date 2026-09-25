"use client";

import colorPaletaData from "@/data/color-palettes.json";
import colorsCombinationData from "@/data/colors-combination.json";
import colorsData from "@/data/colors.json";
import productsData from "@/data/products";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaPalette, FaPinterest } from "react-icons/fa";

import { useModalAccessibility } from "@/hooks/useModalAccessibility";
import { formatPath } from "@/utils/format";

interface Color {
  name: string;
  hex: string;
}

const colors = colorsData as Color[];
const products = productsData.products;

type Palette = {
  category: string;
  colors: string[];
};

const colorCombinations = colorsCombinationData as Record<string, string[][]>;

type CoresProps = {
  formatColor: (name: string) => string;
};

export default function Cores({ formatColor }: CoresProps) {
  const [openPalette, setOpenPalette] = useState(false);

  const [selectedColorName, setSelectedColorName] = useState<string | null>(
    null,
  );

  const colorsByPalette = colorPaletaData as Palette[];

  const activeColorData = colors.find(
    (color) => color.name === selectedColorName,
  );

  const activeCombinations = selectedColorName
    ? colorCombinations[selectedColorName]
    : [];

  const paletteAccessibility = useModalAccessibility({
    isOpen: openPalette,
    onClose: () => setOpenPalette(false),
  });

  const colorAccessibility = useModalAccessibility({
    isOpen: Boolean(selectedColorName) && Boolean(activeColorData),
    onClose: () => setSelectedColorName(null),
  });

  const productsWithColor = selectedColorName
    ? products.flatMap((product) =>
        product.colors
          .filter((productColor) => {
            const normalize = (value: string) =>
              value
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .trim();

            const normalizedProductColor = normalize(productColor);

            const normalizedSelectedColor = normalize(selectedColorName);

            if (normalizedProductColor === normalizedSelectedColor) {
              return true;
            }

            const selectedColorSlug = normalizedSelectedColor.replace(
              /\s+/g,
              "-",
            );

            if (normalizedProductColor.includes(selectedColorSlug)) {
              return true;
            }

            const productColorParts = normalizedProductColor.split("-");

            return productColorParts.includes(normalizedSelectedColor);
          })
          .map((color) => ({
            product,
            color,
          })),
      )
    : [];

  const openColor = (colorName: string) => {
    setOpenPalette(false);
    setSelectedColorName(colorName);
  };

  const getProductImage = (
    product: (typeof products)[number],
    color: string,
  ) => {
    return `/products/${formatPath(product.category)}/${formatPath(
      product.name,
    )}/${color}.webp`;
  };

  const getProductPrice = (product: (typeof products)[number]) => {
    const firstSize = product.sizes?.[0];

    if (!firstSize) {
      return null;
    }

    const price = firstSize.price;

    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <motion.section
      id="cores"
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.7,
      }}
      className="bg-card scroll-mt-20 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
            Feito para combinar
          </span>

          <h2 className="mt-3 font-serif text-4xl leading-tight font-semibold sm:text-5xl">
            Encontre a cor que combina com você
          </h2>

          <p className="text-muted mt-5 text-sm leading-relaxed sm:text-base">
            Escolha uma cor para descobrir combinações pensadas para deixar suas
            peças ainda mais especiais.
          </p>
        </div>

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
                className="group focus-visible:ring-primary flex cursor-pointer flex-col items-center rounded-2xl p-1 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                aria-label={`Ver combinações para ${formatColor(color.name)}`}
              >
                <div
                  className={`relative h-14 w-14 overflow-hidden rounded-full shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg sm:h-16 sm:w-16 ${
                    isLight ? "border-border border" : ""
                  }`}
                  style={{
                    backgroundColor: color.hex,
                  }}
                >
                  <div className="absolute inset-0 rounded-full bg-linear-to-br from-white/20 via-transparent to-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <span className="text-foreground-soft group-hover:text-primary mt-2 max-w-20 text-center text-[11px] leading-tight font-medium transition-colors sm:text-xs">
                  {formatColor(color.name)}
                </span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setOpenPalette(true)}
            aria-label="Abrir ideias de paletas"
            className="group focus-visible:ring-primary flex cursor-pointer flex-col items-center rounded-2xl p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            <div className="border-primary/20 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:shadow-lg sm:h-16 sm:w-16">
              <FaPalette size={20} aria-hidden="true" />

              <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            <span className="text-foreground-soft group-hover:text-primary mt-2 max-w-20 text-center text-[11px] leading-tight font-medium transition-colors sm:text-xs">
              Ideias de paleta
            </span>
          </button>
        </div>

        <div className="mx-auto mt-14 flex max-w-xl items-center justify-center gap-3 text-center">
          <span className="bg-border h-px flex-1" />

          <span className="text-muted text-xs">
            Cada combinação pode ganhar uma nova peça
          </span>

          <span className="bg-border h-px flex-1" />
        </div>
      </div>

      <AnimatePresence>
        {openPalette && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpenPalette(false)}
              aria-hidden="true"
            />

            <motion.div
              ref={paletteAccessibility.dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="palette-modal-title"
              aria-describedby="palette-modal-description"
              tabIndex={-1}
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 20,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              className="bg-card relative z-10 flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-4xl shadow-2xl focus:outline-none"
            >
              <div className="border-border border-b px-5 py-6 pr-16 sm:px-8 sm:py-7">
                <button
                  type="button"
                  onClick={() => setOpenPalette(false)}
                  aria-label="Fechar ideias de paletas"
                  className="bg-background text-foreground hover:bg-input focus-visible:ring-primary absolute top-5 right-5 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-base shadow-sm transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                >
                  <span aria-hidden="true">✕</span>
                </button>

                <span className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
                  Inspirações
                </span>

                <h2
                  id="palette-modal-title"
                  className="mt-2 font-serif text-3xl font-semibold sm:text-4xl"
                >
                  Ideias de Paletas
                </h2>

                <p
                  id="palette-modal-description"
                  className="text-muted mt-2 max-w-2xl text-sm leading-relaxed"
                >
                  Combinações pensadas para diferentes estilos, momentos e
                  estações do ano.
                </p>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {colorsByPalette.map((palette, paletteIndex) => (
                    <motion.div
                      key={palette.category}
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.3,
                        delay: paletteIndex * 0.025,
                      }}
                      className="group border-border bg-background/50 hover:border-primary/20 rounded-3xl border p-5 transition-all duration-300 hover:shadow-md"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-serif text-xl font-semibold">
                          {palette.category}
                        </h3>

                        <FaPalette
                          size={13}
                          aria-hidden="true"
                          className="text-muted group-hover:text-primary"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {palette.colors.map((colorName) => {
                          const foundColor = colors.find(
                            (color) => color.name === colorName,
                          );

                          if (!foundColor) {
                            return null;
                          }

                          return (
                            <button
                              key={colorName}
                              type="button"
                              onClick={() => openColor(colorName)}
                              title={formatColor(foundColor.name)}
                              aria-label={`Ver combinações com ${formatColor(
                                foundColor.name,
                              )}`}
                              className="group/color focus-visible:ring-primary cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                            >
                              <div
                                className="border-border h-14 w-full overflow-hidden rounded-xl border shadow-sm transition-all duration-300 group-hover/color:-translate-y-0.5 group-hover/color:shadow-md sm:h-16"
                                style={{
                                  backgroundColor: foundColor.hex,
                                }}
                              >
                                <div className="h-full w-full bg-linear-to-br from-white/15 via-transparent to-black/10 opacity-0 transition-opacity group-hover/color:opacity-100" />
                              </div>

                              <span className="text-muted group-hover/color:text-primary mt-1.5 block truncate text-center text-[10px] font-medium transition-colors sm:text-xs">
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

      <AnimatePresence>
        {selectedColorName && activeColorData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedColorName(null)}
              aria-hidden="true"
            />

            <motion.div
              ref={colorAccessibility.dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="color-modal-title"
              aria-describedby="color-modal-description"
              tabIndex={-1}
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 20,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              className="bg-card relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-4xl shadow-2xl focus:outline-none"
            >
              <div className="border-border border-b px-6 py-6 pr-16 sm:px-7">
                <button
                  type="button"
                  onClick={() => setSelectedColorName(null)}
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
                    style={{
                      backgroundColor: activeColorData.hex,
                    }}
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
                {activeCombinations && activeCombinations.length > 0 && (
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
                          initial={{
                            opacity: 0,
                            y: 8,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
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
                                  onClick={() =>
                                    setSelectedColorName(colorNameInCombo)
                                  }
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

                {activeColorData && (
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
                      {productsWithColor.map((item, index) => {
                        const { product, color } = item;

                        const image = getProductImage(product, color);
                        const price = getProductPrice(product);

                        return (
                          <motion.div
                            key={`${product.name}-${color}`}
                            initial={{
                              opacity: 0,
                              y: 12,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            transition={{
                              duration: 0.3,
                              delay: index * 0.05,
                            }}
                          >
                            <Link
                              href={`/produto/${formatPath(product.name)}`}
                              onClick={() => setSelectedColorName(null)}
                              className="group border-border bg-background hover:border-primary/20 focus-visible:ring-primary block overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                            >
                              <div className="bg-muted/10 relative aspect-square overflow-hidden">
                                <Image
                                  src={image}
                                  alt={product.name}
                                  fill
                                  sizes="(max-width: 640px) 45vw, 30vw"
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                <span className="bg-card/90 text-foreground absolute bottom-2 left-2 rounded-full px-2.5 py-1 text-[9px] font-semibold tracking-wide uppercase opacity-0 shadow-sm backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                                  Ver peça
                                </span>
                              </div>

                              <div className="p-3">
                                <h4 className="text-foreground truncate font-serif text-sm font-semibold sm:text-base">
                                  {product.name}
                                </h4>

                                <p className="text-muted mt-1 truncate text-[10px] sm:text-xs">
                                  {color
                                    .split("-")
                                    .map(formatColor)
                                    .join(" · ")}
                                </p>

                                {price && (
                                  <p className="text-muted mt-1 text-xs sm:text-sm">
                                    A partir{" "}
                                    <span className="text-foreground font-semibold">
                                      {price}
                                    </span>
                                  </p>
                                )}
                              </div>
                            </Link>
                          </motion.div>
                        );
                      })}

                      <Link
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
                      </Link>
                    </div>
                  </div>
                )}
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
    </motion.section>
  );
}
