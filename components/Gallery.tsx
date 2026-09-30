"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import colorsData from "@/data/colors.json";
import { GalleryItem } from "@/lib/products";
import { formatColor, formatPath } from "@/utils/format";

interface GalleryProps {
  items: GalleryItem[];
}

function normalizeColor(color: string) {
  return color
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function getColorParts(color: string) {
  return color
    .split(/[-/,+]/)
    .map((part) => normalizeColor(part))
    .filter(Boolean);
}

function GalleryImage({
  images,
  alt,
}: {
  images: GalleryItem["images"];
  alt: string;
}) {
  const [firstLoaded, setFirstLoaded] = useState(false);
  const [secondLoaded, setSecondLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const firstImage = images[0];
  const secondImage = images[1];

  if (!firstImage) {
    return null;
  }

  const hasSecondImage = Boolean(secondImage);

  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      onMouseEnter={() => {
        if (hasSecondImage) {
          setHovered(true);
        }
      }}
      onMouseLeave={() => setHovered(false)}
    >
      {!firstLoaded && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center bg-muted/30"
          aria-hidden="true"
        >
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-border border-t-primary" />
        </div>
      )}

      <img
        src={firstImage.url}
        alt={alt}
        className={`block h-auto w-full transition-opacity duration-500 ${
          hovered && secondLoaded ? "opacity-0" : "opacity-100"
        }`}
        loading="lazy"
        onLoad={() => setFirstLoaded(true)}
        onError={() => setFirstLoaded(true)}
      />

      {secondImage && (
        <img
          src={secondImage.url}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            hovered && secondLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setSecondLoaded(true)}
          onError={() => setSecondLoaded(true)}
        />
      )}
    </div>
  );
}

function GalleryCard({ item }: { item: GalleryItem }) {
  const productHref = `/product/${formatPath(item.productName)}`;

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.8,
      }}
      className="scroll-mt-20 overflow-hidden"
    >
      <article className="mb-2 break-inside-avoid">
        <Link
          href={productHref}
          aria-label={`Ver ${item.productName} na cor ${formatColor(item.color)}`}
          className="group block"
        >
          <GalleryImage
            images={item.images}
            alt={`${item.productName} — ${formatColor(item.color)} — ${item.images[0]?.alt ?? ""}`}
          />
        </Link>
      </article>
    </motion.section>
  );
}

export default function Gallery({ items }: GalleryProps) {
  const [selectedColor, setSelectedColor] = useState("all");

  const availableColors = useMemo(() => {
    const usedColors = new Set(
      items.flatMap((item) => getColorParts(item.color)),
    );

    return colorsData.filter((color) => usedColors.has(normalizeColor(color.name)));
  }, [items]);

  const filteredItems = useMemo(() => {
    if (selectedColor === "all") {
      return items;
    }

    return items.filter((item) =>
      getColorParts(item.color).includes(selectedColor),
    );
  }, [items, selectedColor]);

  return (
    <div>
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="font-serif text-xl font-semibold sm:text-2xl">
            Filtre por cor
          </h2>

          {selectedColor !== "all" && (
            <button
              type="button"
              onClick={() => setSelectedColor("all")}
              className="text-muted-foreground hover:text-foreground text-xs font-medium transition-colors"
            >
              Limpar filtro
            </button>
          )}
        </div>

        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 sm:flex-wrap sm:overflow-visible">
          <button
            type="button"
            onClick={() => setSelectedColor("all")}
            aria-pressed={selectedColor === "all"}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              selectedColor === "all"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground hover:border-primary/50"
            }`}
          >
            Todas
          </button>

          {availableColors.map((color) => {
            const colorName = normalizeColor(color.name);
            const isSelected = selectedColor === colorName;
            const hex = color.hex;

            return (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColor(colorName)}
                aria-pressed={isSelected}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all ${
                  isSelected
                    ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary"
                    : "border-border bg-background text-foreground hover:border-primary/50"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="h-4 w-4 rounded-full border border-black/10 shadow-sm"
                  style={{ backgroundColor: hex }}
                />
                <span>{formatColor(color.name)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-muted-foreground mb-5 text-sm">
        {filteredItems.length === 1
          ? "1 resultado"
          : `${filteredItems.length} resultados`}
        {selectedColor !== "all" && (
          <>
            {" "}para <strong className="text-foreground">{formatColor(selectedColor)}</strong>
          </>
        )}
      </p>

      {filteredItems.length > 0 ? (
        <div className="columns-2 gap-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6">
          {filteredItems.map((item) => (
            <GalleryCard
              key={`${item.productName}-${item.color}`}
              item={item}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center">
          <p className="font-serif text-xl font-semibold">
            Nenhuma peça encontrada nessa cor.
          </p>
          <p className="text-muted-foreground mt-2 text-sm">
            Experimente outra cor ou veja todas as peças da galeria.
          </p>
          <button
            type="button"
            onClick={() => setSelectedColor("all")}
            className="bg-primary text-primary-foreground mt-6 rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
          >
            Ver todas as peças
          </button>
        </div>
      )}
    </div>
  );
}
