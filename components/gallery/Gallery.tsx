"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import colorsData from "@/data/colors/colors.json";
import { GalleryItem } from "@/lib/products";
import { formatColor } from "@/utils/format";
import { getProductUrl } from "@/lib/productUrl";

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
  const [firstFailed, setFirstFailed] = useState(false);
  const [secondLoaded, setSecondLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const firstImage = images[0];
  const secondImage = images[1];

  if (!firstImage) {
    return null;
  }

  const hasSecondImage = Boolean(secondImage);

  useEffect(() => {
    if (firstLoaded || firstFailed) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setFirstFailed(true);
    }, 12000);

    return () => window.clearTimeout(timeout);
  }, [firstImage.url, firstLoaded, firstFailed]);

  return (
    <div
      className="bg-muted/20 relative aspect-[4/5] overflow-hidden rounded-2xl"
      onMouseEnter={() => {
        if (hasSecondImage) {
          setHovered(true);
        }
      }}
      onMouseLeave={() => setHovered(false)}
    >
      {!firstLoaded && !firstFailed && (
        <div
          className="bg-muted/30 absolute inset-0 z-20 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="border-border border-t-primary h-7 w-7 animate-spin rounded-full border-2" />
        </div>
      )}

      {firstFailed ? (
        <div
          className="text-muted absolute inset-0 flex items-center justify-center px-4 text-center text-sm"
          role="img"
          aria-label={`Imagem indisponível: ${alt}`}
        >
          Imagem indisponível
        </div>
      ) : (
        <Image
          src={firstImage.url}
          alt={alt}
          fill
          sizes="(max-width: 479px) 50vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, (max-width: 1279px) 25vw, 20vw"
          loading="lazy"
          className={`object-cover transition-opacity duration-300 ${
            hovered && secondLoaded ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setFirstLoaded(true)}
          onError={() => {
            setFirstFailed(true);
            setFirstLoaded(true);
          }}
        />
      )}

      {secondImage && hovered && (
        <Image
          src={secondImage.url}
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 479px) 50vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, (max-width: 1279px) 25vw, 20vw"
          loading="lazy"
          className={`object-cover transition-opacity duration-300 ${
            secondLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setSecondLoaded(true)}
        />
      )}
    </div>
  );
}

function GalleryCard({ item }: { item: GalleryItem }) {
  const productHref = getProductUrl(item.productName, { color: item.color });

  return (
    <motion.section
      id="galeria"
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
          className="group relative block"
        >
          <GalleryImage
            images={item.images}
            alt={`${item.productName} — ${formatColor(item.color)} — ${item.images[0]?.alt ?? ""}`}
          />

          <span className="text-white absolute bottom-3 left-3 rounded-full bg-muted/60 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-0.5">
            {item.productName}
          </span>
        </Link>
      </article>
    </motion.section>
  );
}

export default function Gallery({ items }: GalleryProps) {
  const [category, setCategory] = useState("Todos");
  const [selectedColor, setSelectedColor] = useState("all");

  const categories = ["Tapetes", "Mesa Posta", "Bolsas"];

  const categoryCounts = useMemo(() => {
    return items.reduce<Record<string, number>>((counts, item) => {
      counts[item.category] = (counts[item.category] ?? 0) + 1;
      return counts;
    }, {});
  }, [items]);

  const availableColors = useMemo(() => {
    const usedColors = new Set(
      items.flatMap((item) => getColorParts(item.color)),
    );

    return colorsData.filter((color) =>
      usedColors.has(normalizeColor(color.name)),
    );
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        category === "Todos" || item.category === category;

      const matchesColor =
        selectedColor === "all" ||
        getColorParts(item.color).includes(selectedColor);

      return matchesCategory && matchesColor;
    });
  }, [items, category, selectedColor]);

  return (
    <>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setCategory("Todos")}
          className={`relative flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
            category === "Todos"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "border-border bg-background text-muted hover:border-primary/30 hover:text-primary border"
          }`}
        >
          Todos
          <span
            className={`text-xs ${
              category === "Todos" ? "text-primary-foreground/80" : "text-muted"
            }`}
          >
            {items.length}
          </span>
        </button>

        {categories.map((itemCategory) => (
          <button
            key={itemCategory}
            type="button"
            onClick={() => setCategory(itemCategory)}
            className={`relative flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
              category === itemCategory
                ? "bg-primary text-primary-foreground shadow-sm"
                : "border-border bg-background text-muted hover:border-primary/30 hover:text-primary border"
            }`}
          >
            {itemCategory}
            <span
              className={`text-xs ${
                category === itemCategory
                  ? "text-primary-foreground/80"
                  : "text-muted"
              }`}
            >
              {categoryCounts[itemCategory] ?? 0}
            </span>
          </button>
        ))}
      </div>

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

            return (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColor(colorName)}
                aria-pressed={isSelected}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all ${
                  isSelected
                    ? "border-primary bg-primary/10 text-foreground ring-primary ring-1"
                    : "border-border bg-background text-foreground hover:border-primary/50"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="h-4 w-4 rounded-full border border-black/10 shadow-sm"
                  style={{ backgroundColor: color.hex }}
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
        {category !== "Todos" && (
          <>
            {" "}
            em <strong className="text-foreground">{category}</strong>
          </>
        )}
        {selectedColor !== "all" && (
          <>
            {" "}
            para{" "}
            <strong className="text-foreground">
              {formatColor(selectedColor)}
            </strong>
          </>
        )}
      </p>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredItems.map((item) => (
            <GalleryCard
              key={`${item.productName}-${item.color}`}
              item={item}
            />
          ))}
        </div>
      ) : (
        <div className="border-border rounded-2xl border border-dashed px-6 py-16 text-center">
          <p className="font-serif text-xl font-semibold">
            Nenhuma peça encontrada.
          </p>
          <p className="text-muted-foreground mt-2 text-sm">
            Experimente outra categoria ou cor, ou veja todas as peças da
            galeria.
          </p>
          <button
            type="button"
            onClick={() => {
              setCategory("Todos");
              setSelectedColor("all");
            }}
            className="bg-primary text-primary-foreground mt-6 rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
          >
            Ver todas as peças
          </button>
        </div>
      )}
    </>
  );
}
