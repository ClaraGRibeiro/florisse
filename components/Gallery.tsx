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
      {}
      {!firstLoaded && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center bg-muted/30"
          aria-hidden="true"
        >
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-border border-t-primary" />
        </div>
      )}

      {}
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

      {}
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
