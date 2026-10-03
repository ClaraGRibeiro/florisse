"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import ColorGrid from "@/components/colors/ColorGrid";
import ColorModal from "@/components/colors/ColorModal";
import PaletteModal from "@/components/colors/PaletteModal";
import { getColors, getColorPalettes } from "@/lib/colors";
import { getProducts } from "@/lib/products";

type ColorsProps = {
  formatColor: (name: string) => string;
};

export default function Colors({ formatColor }: ColorsProps) {
  const [openPalette, setOpenPalette] = useState(false);
  const [selectedColorName, setSelectedColorName] = useState<string | null>(
    null,
  );

  const colors = getColors();
  const palettes = getColorPalettes();
  const products = getProducts();

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

        <ColorGrid
          colors={colors}
          formatColor={formatColor}
          onSelectColor={setSelectedColorName}
          onOpenPalette={() => setOpenPalette(true)}
        />

        <div className="mx-auto mt-14 flex max-w-xl items-center justify-center gap-3 text-center">
          <span className="bg-border h-px flex-1" />

          <span className="text-muted text-xs">
            Cada combinação pode ganhar uma nova peça
          </span>

          <span className="bg-border h-px flex-1" />
        </div>
      </div>

      <PaletteModal
        isOpen={openPalette}
        palettes={palettes}
        colors={colors}
        formatColor={formatColor}
        onClose={() => setOpenPalette(false)}
        onSelectColor={openColor}
      />

      <ColorModal
        selectedColorName={selectedColorName}
        colors={colors}
        products={products}
        formatColor={formatColor}
        onClose={() => setSelectedColorName(null)}
        onSelectColor={setSelectedColorName}
      />
    </motion.section>
  );
}
