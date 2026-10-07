"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { FaCheck, FaRedo } from "react-icons/fa";

import { Color } from "@/lib/colors";
import { formatColor } from "@/utils/format";

type ColorMixerProps = {
  colors: Color[];
};

const MAX_COLORS = 5;

export default function ColorMixer({ colors }: ColorMixerProps) {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const selectedColorData = useMemo(
    () =>
      selectedColors
        .map((name) => colors.find((color) => color.name === name))
        .filter((color): color is Color => Boolean(color)),
    [colors, selectedColors],
  );

  const gradient =
    selectedColorData.length > 0
      ? `conic-gradient(${selectedColorData
          .map(
            (color, index) =>
              `${color.hex} ${(index / selectedColorData.length) * 100}% ${((index + 1) / selectedColorData.length) * 100}%`,
          )
          .join(", ")})`
      : "conic-gradient(#e8e2dc 0% 25%, #f5f1ec 25% 50%, #e8e2dc 50% 75%, #f5f1ec 75% 100%)";

  const toggleColor = (colorName: string) => {
    setSelectedColors((current) => {
      if (current.includes(colorName)) {
        return current.filter((name) => name !== colorName);
      }

      if (current.length >= MAX_COLORS) {
        return current;
      }

      return [...current, colorName];
    });
  };

  const clearColors = () => {
    setSelectedColors([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
      className="border-border bg-background mx-auto mt-16 max-w-6xl overflow-hidden rounded-3xl border shadow-sm sm:mt-20"
    >
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(230px,0.8fr)_1.2fr] lg:items-center lg:gap-12 lg:p-10">
        <div className="flex flex-col items-center text-center">
          <span className="text-primary text-[10px] font-semibold tracking-[0.2em] uppercase">
            Crie do seu jeito
          </span>

          <h3 className="mt-2 font-serif text-3xl leading-tight font-semibold sm:text-4xl">
            Teste sua própria combinação
          </h3>

          <p className="text-muted mt-3 max-w-md text-sm leading-relaxed">
            Escolha até {MAX_COLORS} cores e veja como elas ficam juntas.
          </p>

          <div
            className="border-border relative mt-7 h-44 w-44 overflow-hidden rounded-full border shadow-lg sm:h-52 sm:w-52"
            style={{ background: gradient }}
            aria-label={
              selectedColorData.length
                ? `Combinação com ${selectedColorData.map((color) => formatColor(color.name)).join(", ")}`
                : "Pré-visualização da sua combinação"
            }
          >
            <div className="absolute inset-0 rounded-full bg-linear-to-br from-white/20 via-transparent to-black/15" />

            <div className="bg-background/85 text-foreground absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-center text-[9px] font-semibold tracking-wide uppercase shadow-sm backdrop-blur-sm sm:h-18 sm:w-18">
              {selectedColorData.length
                ? `${selectedColorData.length} ${selectedColorData.length === 1 ? "cor" : "cores"}`
                : "Sua paleta"}
            </div>
          </div>

          {selectedColorData.length > 0 && (
            <div className="mt-4 flex max-w-xs flex-wrap justify-center gap-1.5">
              {selectedColorData.map((color) => (
                <span
                  key={color.name}
                  className="bg-muted/10 text-foreground inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium"
                >
                  <span
                    className="border-border h-3 w-3 rounded-full border"
                    style={{ backgroundColor: color.hex }}
                  />
                  {formatColor(color.name)}
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <span className="text-muted text-[10px] font-semibold tracking-[0.18em] uppercase">
                Escolha as cores
              </span>

              <p className="text-foreground mt-1 text-sm font-medium">
                {selectedColorData.length === 0
                  ? "Comece escolhendo uma cor."
                  : selectedColorData.length >= MAX_COLORS
                    ? `Você escolheu ${MAX_COLORS} cores.`
                    : `${selectedColorData.length} de ${MAX_COLORS} selecionadas.`}
              </p>
            </div>

            {selectedColorData.length > 0 && (
              <button
                type="button"
                onClick={clearColors}
                className="text-muted hover:text-primary focus-visible:ring-primary inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                <FaRedo size={9} aria-hidden="true" />
                Limpar
              </button>
            )}
          </div>

          <div className="grid grid-cols-5 gap-x-2 gap-y-4 sm:grid-cols-6 md:grid-cols-8">
            {colors.map((color) => {
              const isSelected = selectedColors.includes(color.name);
              const isDisabled =
                !isSelected && selectedColors.length >= MAX_COLORS;

              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => toggleColor(color.name)}
                  disabled={isDisabled}
                  aria-pressed={isSelected}
                  aria-label={`${isSelected ? "Remover" : "Adicionar"} ${formatColor(color.name)}`}
                  className={`group flex cursor-pointer flex-col items-center rounded-xl p-1 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    isDisabled
                      ? "cursor-not-allowed opacity-35"
                      : "hover:-translate-y-0.5"
                  }`}
                >
                  <div
                    className={`relative h-10 w-10 overflow-hidden rounded-full shadow-sm transition-all duration-200 sm:h-12 sm:w-12 ${
                      isSelected
                        ? "ring-primary ring-2 ring-offset-2"
                        : "group-hover:scale-105 group-hover:shadow-md"
                    } ${
                      color.hex.toLowerCase() === "#ffffff"
                        ? "border-border border"
                        : ""
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    <div className="absolute inset-0 rounded-full bg-linear-to-br from-white/20 via-transparent to-black/10" />

                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/15">
                        <FaCheck
                          size={12}
                          className="text-white drop-shadow-md"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                  </div>

                  <span
                    className={`mt-1.5 max-w-16 truncate text-center text-[9px] leading-tight font-medium transition-colors sm:text-[10px] ${
                      isSelected ? "text-primary" : "text-muted group-hover:text-foreground"
                    }`}
                  >
                    {formatColor(color.name)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
