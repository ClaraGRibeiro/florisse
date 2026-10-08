"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { BRAND } from "@/data/config";
import { getGalleryItems } from "@/lib/products";
import { formatColor } from "@/utils/format";

const FEATURED_GALLERY = [
  {
    productName: "Tapete Maravilha",
    color: "alecrim-verde militar",
  },
  {
    productName: "Bolsa Redinha",
    color: "verde militar",
  },
  {
    productName: "Sousplat Tradicional",
    color: "malva",
  },
  {
    productName: "Tapete Nina",
    color: "vermelho",
  },
  {
    productName: "Tapete Hexágono",
    color: "cru-cinza-bege",
  },
  {
    productName: "Tapete Janine",
    color: "cru-marrom-bege",
  },
  {
    productName: "Tapete Cris",
    color: "bordo",
  },
];

const positions = [
  {
    className:
      "left-[2%] top-[18%] w-[32%] sm:left-[5%] sm:top-[16%] sm:w-[23%]",
    rotate: -5,
    y: [0, -8, 0],
    duration: 5.5,
    z: 10,
  },
  {
    className:
      "left-[34%] top-[2%] w-[35%] sm:left-[29%] sm:top-[4%] sm:w-[22%]",
    rotate: 3,
    y: [0, 7, 0],
    duration: 6.2,
    z: 10,
  },
  {
    className:
      "right-[2%] top-[13%] w-[30%] sm:right-[7%] sm:top-[10%] sm:w-[21%]",
    rotate: 6,
    y: [0, -6, 0],
    duration: 5.8,
    z: 10,
  },
  {
    className:
      "left-[17%] bottom-[7%] w-[29%] sm:left-[16%] sm:bottom-[5%] sm:w-[20%]",
    rotate: 4,
    y: [0, 9, 0],
    duration: 6.5,
    z: 10,
  },
  {
    className:
      "right-[17%] bottom-[2%] w-[31%] sm:right-[22%] sm:bottom-[3%] sm:w-[21%]",
    rotate: -4,
    y: [0, -7, 0],
    duration: 5.7,
    z: 10,
  },
  {
    className:
      "left-[1%] bottom-[2%] w-[25%] sm:left-[2%] sm:bottom-[3%] sm:w-[17%]",
    rotate: -8,
    y: [0, 6, 0],
    duration: 6.8,
    z: 10,
  },
  {
    className:
      "right-[1%] bottom-[18%] w-[25%] sm:right-[2%] sm:bottom-[17%] sm:w-[17%]",
    rotate: 8,
    y: [0, -9, 0],
    duration: 6.1,
    z: 10,
  },
  {
    className:
      "left-[36%] bottom-[1%] w-[25%] sm:left-[39%] sm:bottom-[2%] sm:w-[17%]",
    rotate: -2,
    y: [0, 7, 0],
    duration: 6.4,
    z: 10,
  },
];

export default function GalleryPreview() {
  const allItems = getGalleryItems();

  const items = FEATURED_GALLERY.map((featured) =>
    allItems.find(
      (item) =>
        item.productName.toLowerCase() === featured.productName.toLowerCase() &&
        item.color.toLowerCase() === featured.color.toLowerCase(),
    ),
  )
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .map((item) => ({
      ...item,
      image: item.images[0],
    }));

  if (items.length === 0) {
    return null;
  }

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
      className="scroll-mt-20 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      {" "}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {}
        <div className="mx-auto mb-10 max-w-xl px-5 text-center sm:mb-14">
          <span className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
            Galeria
          </span>

          <h2 className="mt-3 font-serif text-4xl leading-tight font-semibold sm:text-5xl">
            Um pouco do meu mundinho
          </h2>

          <p className="text-muted mx-auto mt-4 max-w-md text-sm leading-relaxed sm:text-base">
            Todas as peças de {BRAND} reunidas em um só lugar.
          </p>
        </div>

        {}
        <Link
          href="/gallery"
          aria-label="Explorar a galeria completa"
          className="group relative mx-auto block h-[450px] w-full max-w-6xl sm:h-[500px] lg:h-[540px]"
        >
          {}
          <div className="bg-primary/5 absolute top-1/2 left-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-[48%_52%_55%_45%/52%_45%_55%_48%] blur-3xl transition-transform duration-1000 group-hover:scale-105" />

          {}
          {items.map((item, index) => {
            const position = positions[index];

            if (!position) {
              return null;
            }

            return (
              <motion.div
                key={`${item.productName}-${item.color}`}
                className={`absolute overflow-hidden rounded-xl shadow-lg ${position.className}`}
                style={{
                  zIndex: position.z,
                }}
                initial={{
                  opacity: 0,
                  scale: 0.88,
                  rotate: position.rotate,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                }}
                animate={{
                  y: position.y,
                  rotate: [
                    position.rotate,
                    position.rotate + 1.3,
                    position.rotate,
                  ],
                }}
                transition={{
                  opacity: {
                    duration: 0.6,
                    delay: index * 0.08,
                  },
                  scale: {
                    duration: 0.7,
                    delay: index * 0.08,
                  },
                  y: {
                    duration: position.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  },
                  rotate: {
                    duration: position.duration + 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  },
                }}
              >
                <img
                  src={item.image.url}
                  alt={`${item.productName} — ${formatColor(item.color)}`}
                  className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </motion.div>
            );
          })}

          {}
          <motion.div
            className="absolute top-1/2 left-1/2 z-40 -translate-x-1/2 -translate-y-1/2"
            animate={{
              y: [-4, 4, -4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="border-border/60 bg-background/90 rounded-full border px-5 py-3 shadow-sm backdrop-blur-md transition-all duration-500 group-hover:scale-105 group-hover:px-7">
              <span className="text-xs font-medium whitespace-nowrap">
                Explorar galeria →
              </span>
            </div>
          </motion.div>
        </Link>
      </div>
    </motion.section>
  );
}
