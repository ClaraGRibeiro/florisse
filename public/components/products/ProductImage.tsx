"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { getProductImage } from "@/lib/images";
import { Product } from "@/types/product";

type ProductImageProps = {
  product: Product;
  selectedColor: Product["colors"][number];
  formatColor: (name: string) => string;
};

export default function ProductImage({
  product,
  selectedColor,
  formatColor,
}: ProductImageProps) {
  const images = getProductImage(product, selectedColor.name);

  const [imageIndex, setImageIndex] = useState(0);

  const [isHovered, setIsHovered] = useState(false);

  /*
   * Sempre que a cor mudar, volta para
   * a primeira imagem daquela cor.
   */
  useEffect(() => {
    setImageIndex(0);
  }, [selectedColor.name]);

  /*
   * Quando o mouse estiver sobre a imagem,
   * passa automaticamente pelas imagens.
   */
  useEffect(() => {
    if (!isHovered || images.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setImageIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, 1200);

    return () => {
      window.clearInterval(interval);
    };
  }, [isHovered, images.length]);

  /*
   * Garante que o índice continue válido
   * caso a cor selecionada tenha uma quantidade
   * diferente de imagens.
   */
  useEffect(() => {
    if (imageIndex >= images.length) {
      setImageIndex(0);
    }
  }, [imageIndex, images.length]);

  const imagePath = images[imageIndex];

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setImageIndex(0);
  };

  return (
    <div
      className="bg-muted relative aspect-9/12 w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={`${selectedColor.name}-${imageIndex}`}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.35,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src={imagePath}
            alt={`${product.name} - ${formatColor(selectedColor.name)}${
              images.length > 1 ? ` - imagem ${imageIndex + 1}` : ""
            }`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            loading="lazy"
            emptyMessage="Imagem indisponível para esta cor"
            fallbackMessage="Não foi possível carregar a imagem"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <div className="bg-background/75 pointer-events-none absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-2.5 py-1.5 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          {images.map((_, index) => (
            <span
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === imageIndex
                  ? "bg-primary w-4"
                  : "bg-foreground/30 w-1.5"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
