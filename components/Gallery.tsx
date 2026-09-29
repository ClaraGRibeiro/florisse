"use client";

import Link from "next/link";

import { GalleryItem } from "@/lib/products";
import { formatColor, formatPath } from "@/utils/format";
import { motion } from "framer-motion";

interface GalleryProps {
  items: GalleryItem[];
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
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={image.url}
              alt={`${item.productName} — ${formatColor(item.color)} — ${image.alt}`}
              className="block h-auto w-full"
              loading="lazy"
            />
          </div>
        </Link>

        <div className="px-1 pt-2">
          <p className="text-sm leading-tight font-medium">
            {item.productName}
          </p>

          <p className="text-muted mt-0.5 text-xs">{formatColor(item.color)}</p>
        </div>
      </article>
    </motion.section>
  );
}

export default function Gallery({ items }: GalleryProps) {
  return (
    <div className="columns-2 gap-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6">
      {items.map((item) => (
        <GalleryCard key={`${item.productName}-${item.color}`} item={item} />
      ))}
    </div>
  );
}
