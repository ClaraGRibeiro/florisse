"use client";

import colorPaletteData from "@/data/colors/color-palettes.json";
import colorsCombinationData from "@/data/colors/colors-combination.json";
import colorsData from "@/data/colors/colors.json";
import { getProducts } from "@/lib/products";
import ColorMixer from "./ColorMixer";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBrush, FaPalette, FaPinterest } from "react-icons/fa";

import { getProductSlug, getProductUrl } from "@/lib/productUrl";
import { formatCategory, formatColor, formatPath } from "@/utils/format";

interface Color {
  name: string;
  hex: string;
}

const colors = colorsData as Color[];
const products = getProducts();

type Palette = {
  category: string;
  colors: string[];
};

const colorCombinations = colorsCombinationData as Record<string, string[][]>;

export default function Colors() {
  const [selectedColorName, setSelectedColorName] = useState<string | null>(
    null,
  );

  const [showPalettes, setShowPalettes] = useState(false);
    const [showMixer, setShowMixer] = useState(false);

  const colorsByPalette = colorPaletteData as Palette[];

  const activeColorData = colors.find(
    (color) => color.name === selectedColorName,
  );

  const activeCombinations = selectedColorName
    ? colorCombinations[selectedColorName]
    : [];

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

            const normalizedProductColor = normalize(productColor.name);
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

  const getProductImage = (
    product: (typeof products)[number],
    color: string,
  ) => {
    return `/products/${formatPath(formatCategory(product.category) ?? "null")}/${getProductSlug(
      product.name,
    )}/${color}.jpg`;
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

  const selectColor = (colorName: string) => {
    setShowPalettes(false);

    setSelectedColorName((current) => {
      if (current === colorName) {
        return null;
      }

      requestAnimationFrame(() => {
        document.getElementById("cor-selecionada")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });

      return colorName;
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
      className="scroll-mt-20"
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

        <div className="mx-auto grid max-w-6xl grid-cols-5 gap-x-3 gap-y-6 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
          {colors.map((color) => {
            const isLight =
              color.hex.toLowerCase() === "#ffffff" ||
              color.hex.toLowerCase() === "#fff";

            return (
              <button
                key={color.name}
                type="button"
                onClick={() => selectColor(color.name)}
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
            onClick={() => {
              setSelectedColorName(null);
              setShowPalettes((current) => !current);
            }}
            aria-expanded={showPalettes}
            aria-controls="paletas"
            className="group focus-visible:ring-primary flex cursor-pointer flex-col items-center rounded-2xl p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            <div className="border-primary/20 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:shadow-lg sm:h-16 sm:w-16">
              <FaPalette size={20} aria-hidden="true" />

              <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            <span className="text-foreground-soft group-hover:text-primary mt-2 max-w-20 text-center text-[11px] leading-tight font-medium transition-colors sm:text-xs">
              {showPalettes ? "Ocultar paletas" : "Ideias de paleta"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedColorName(null);
              setShowPalettes(false);
              setShowMixer((current) => !current);
            }}
            aria-expanded={showMixer}
            aria-controls="mixer-cores"
            className="group focus-visible:ring-primary flex cursor-pointer flex-col items-center rounded-2xl p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            <div className="border-primary/20 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:shadow-lg sm:h-16 sm:w-16">
              <FaBrush size={20} aria-hidden="true" />

              <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            <span className="text-foreground-soft group-hover:text-primary mt-2 max-w-20 text-center text-[11px] leading-tight font-medium transition-colors sm:text-xs">
              {showMixer ? "Ocultar teste" : "Teste combinações"}
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

      {selectedColorName && activeColorData && (
        <motion.div
          id="cor-selecionada"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mx-auto mt-10 max-w-6xl scroll-mt-24"
        >
          <div className="border-border overflow-hidden rounded-3xl border shadow-sm">
            {/* Cabeçalho */}
            <div className="border-border flex items-center gap-3 border-b px-5 py-5 sm:px-6 sm:py-6">
              <div
                className="border-border h-11 w-11 shrink-0 rounded-full border shadow-sm sm:h-12 sm:w-12"
                style={{ backgroundColor: activeColorData.hex }}
                aria-hidden="true"
              />

              <div className="min-w-0">
                <span className="text-muted text-[9px] font-semibold tracking-[0.18em] uppercase">
                  Cor selecionada
                </span>

                <h3 className="mt-0.5 truncate font-serif text-xl leading-tight font-semibold sm:text-2xl">
                  {formatColor(activeColorData.name)}
                </h3>
              </div>
            </div>

            <div className="px-5 py-6 sm:px-6 sm:py-7">
              {/* Combinações */}
              <div>
                <div className="mb-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <span className="text-primary text-[9px] font-semibold tracking-[0.18em] uppercase">
                        Para combinar
                      </span>

                      <h4 className="mt-1 font-serif text-xl font-semibold sm:text-2xl">
                        Combinações de cores
                      </h4>
                    </div>

                    <span className="text-muted hidden text-[10px] sm:block">
                      Toque em uma cor para explorar
                    </span>
                  </div>

                  <p className="text-muted mt-1 text-xs sm:hidden">
                    Toque em uma cor para continuar explorando.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-1 lg:grid-cols-4">
                  {activeCombinations.map((combo, index) => {
                    const validColors = combo
                      .map((colorName) =>
                        colors.find((color) => color.name === colorName),
                      )
                      .filter(Boolean);

                    const slice = 100 / validColors.length;

                    const gradient = `conic-gradient(${validColors
                      .map(
                        (color, colorIndex) =>
                          `${color!.hex} ${colorIndex * slice}% ${(colorIndex + 1) * slice}%`,
                      )
                      .join(", ")})`;

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.25,
                          delay: index * 0.04,
                        }}
                        className="flex items-center gap-4 rounded-2xl p-3"
                      >
                        <div
                          className="border-border relative h-12 w-12 shrink-0 overflow-hidden rounded-full border shadow-sm sm:h-17 sm:w-17"
                          style={{
                            background: gradient,
                          }}
                          aria-label={`Combinação ${index + 1}`}
                        >
                          <div className="absolute inset-0 rounded-full bg-linear-to-br from-white/15 via-transparent to-black/10" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="mt-2 space-y-2">
                            {combo.map((colorNameInCombo) => {
                              const foundColor = colors.find(
                                (color) => color.name === colorNameInCombo,
                              );

                              if (!foundColor) return null;

                              return (
                                <button
                                  key={colorNameInCombo}
                                  type="button"
                                  onClick={() => selectColor(colorNameInCombo)}
                                  disabled={
                                    colorNameInCombo === selectedColorName
                                  }
                                  title={
                                    colorNameInCombo === selectedColorName
                                      ? "Cor selecionada"
                                      : `Explorar ${formatColor(foundColor.name)}`
                                  }
                                  aria-label={
                                    colorNameInCombo === selectedColorName
                                      ? `${formatColor(foundColor.name)} já está selecionada`
                                      : `Explorar ${formatColor(foundColor.name)}`
                                  }
                                  className={`group/color flex max-w-full items-center gap-2 rounded-md text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${
                                    colorNameInCombo === selectedColorName
                                      ? "cursor-default"
                                      : "focus-visible:ring-primary cursor-pointer"
                                  }`}
                                >
                                  <span
                                    className={`border-border h-5 w-5 shrink-0 rounded-full border transition-transform duration-200 ${
                                      colorNameInCombo === selectedColorName
                                        ? ""
                                        : "group-hover/color:scale-125"
                                    }`}
                                    style={{
                                      backgroundColor: foundColor.hex,
                                    }}
                                  />

                                  <span
                                    className={`text-muted truncate text-sm font-medium transition-colors ${
                                      colorNameInCombo === selectedColorName
                                        ? ""
                                        : "group-hover/color:text-primary"
                                    }`}
                                  >
                                    {formatColor(foundColor.name)}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Produtos */}
              <div
                className={`border-border ${
                  activeCombinations && activeCombinations.length > 0
                    ? "mt-8 border-t pt-7"
                    : ""
                }`}
              >
                <div className="mb-4 flex items-end justify-between gap-3">
                  <div>
                    <span className="text-primary text-[9px] font-semibold tracking-[0.18em] uppercase">
                      Feito para você
                    </span>

                    <h4 className="mt-1 font-serif text-xl leading-tight font-semibold sm:text-2xl">
                      Gostou dessa cor?
                    </h4>

                    <p className="text-muted mt-1 text-xs sm:text-sm">
                      {productsWithColor.length > 0
                        ? "Veja peças que podem ganhar esse tom."
                        : "Ainda não temos uma peça dessa cor na galeria, mas veja no Pinterest."}
                    </p>
                  </div>

                  {productsWithColor.length > 0 && (
                    <span className="text-muted shrink-0 text-[10px] font-medium sm:text-xs">
                      {productsWithColor.length}{" "}
                      {productsWithColor.length === 1 ? "peça" : "peças"}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
                  {productsWithColor.map((item, index) => {
                    const { product, color } = item;
                    const image = getProductImage(product, color.name);
                    const price = getProductPrice(product);

                    return (
                      <motion.div
                        key={`${product.name}-${color.name}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.25,
                          delay: index * 0.04,
                        }}
                      >
                        <Link
                          href={getProductUrl(product.name, {
                            color: color.name,
                          })}
                          className="group border-border bg-background hover:border-primary/20 focus-visible:ring-primary block overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        >
                          <div className="bg-muted/10 relative aspect-square overflow-hidden">
                            <Image
                              src={image}
                              alt={product.name}
                              fill
                              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                            <span className="bg-card/90 text-foreground absolute bottom-2 left-2 rounded-full px-2 py-0.5 text-[8px] font-semibold tracking-wide uppercase opacity-0 shadow-sm backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                              Ver peça
                            </span>
                          </div>

                          <div className="p-2.5">
                            <h5 className="text-foreground truncate font-serif text-xs font-semibold sm:text-sm">
                              {product.name}
                            </h5>

                            <p className="text-muted mt-0.5 text-[9px] sm:text-[10px]">
                              {color.name
                                .split("-")
                                .map(formatColor)
                                .join(" · ")}
                            </p>

                            {price && (
                              <p className="text-muted mt-1 text-[10px] sm:text-xs">
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

                  {/* Pinterest */}
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
            </div>
          </div>
        </motion.div>
      )}

      {showMixer && (
        <motion.div
          id="mixer-cores"
          initial={{ opacity: 0, height: 0, y: -10 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mx-auto mt-16 max-w-6xl scroll-mt-24 sm:mt-20"
        >
          <ColorMixer colors={colors} />
        </motion.div>
      )}

      {showPalettes && (
        <motion.div
          id="paletas"
          initial={{ opacity: 0, height: 0, y: -10 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mx-auto mt-16 max-w-6xl scroll-mt-24 sm:mt-20"
        >
          <div className="mb-8 text-center">
            <span className="text-primary text-[10px] font-semibold tracking-[0.2em] uppercase">
              Inspirações
            </span>

            <h3 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
              Ideias de Paletas
            </h3>

            <p className="text-muted mx-auto mt-2 max-w-2xl text-sm leading-relaxed">
              Combinações pensadas para diferentes estilos, momentos e estações
              do ano.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {colorsByPalette.map((palette, paletteIndex) => (
              <motion.div
                key={palette.category}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: paletteIndex * 0.025,
                }}
                className="group border-border bg-background/50 hover:border-primary/20 rounded-3xl border p-5 transition-all duration-300 hover:shadow-md sm:p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="font-serif text-xl font-semibold">
                    {palette.category}
                  </h4>

                  <Link
                    href={`https://br.pinterest.com/search/pins/?q=${encodeURIComponent(
                      `moda casa crochê na paleta ${palette.category}`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ver inspirações no Pinterest"
                  >
                    <FaPinterest
                      size={27}
                      aria-hidden="true"
                      className="text-muted group-hover:text-primary cursor-pointer"
                    />
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {palette.colors.map((colorName) => {
                    const foundColor = colors.find(
                      (color) => color.name === colorName,
                    );

                    if (!foundColor) return null;

                    return (
                      <button
                        key={colorName}
                        type="button"
                        onClick={() => selectColor(colorName)}
                        title={formatColor(foundColor.name)}
                        aria-label={`Explorar ${formatColor(foundColor.name)}`}
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
        </motion.div>
      )}
    </motion.section>
  );
}
