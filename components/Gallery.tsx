"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

import { GalleryItem } from "@/lib/products";
import { formatColor, formatPath } from "@/utils/format";

interface GalleryProps {
  items: GalleryItem[];
}

function GalleryImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Loading */}
      {!loaded && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-muted/30"
          aria-hidden="true"
        >
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-border border-t-primary" />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        className={`block h-auto w-full transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

function GalleryCard({ item }: { item: GalleryItem }) {
  const image = item.images[0];

  const productHref = `/produto/${formatPath(item.productName)}`;

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
      <article className="mb-8 break-inside-avoid">
        <Link
          href={productHref}
          aria-label={`Ver ${item.productName} na cor ${formatColor(item.color)}`}
          className="group block"
        >
          <GalleryImage
            src={image.url}
            alt={`${item.productName} — ${formatColor(item.color)} — ${image.alt}`}
          />
        </Link>

        <div className="px-1 pt-2">
          <p className="text-sm leading-tight font-medium">
            {item.productName}
          </p>

          <p className="text-muted mt-0.5 text-xs">
            {formatColor(item.color)}
          </p>
        </div>
      </article>
    </motion.section>
  );
}

export default function Gallery({ items }: GalleryProps) {
  return (
    <div className="columns-2 gap-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6">
      {items.map((item) => (
        <GalleryCard
          key={`${item.productName}-${item.color}`}
          item={item}
        />
      ))}
    </div>
  );
}
