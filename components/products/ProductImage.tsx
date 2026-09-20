import { AnimatePresence, motion } from "framer-motion";

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
  const imagePath = getProductImage(
    product,
    selectedColor.name,
  )[0];

  return (
    <div className="relative aspect-9/12 w-full overflow-hidden bg-muted">
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={selectedColor.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src={imagePath}
            alt={`${product.name} - ${formatColor(selectedColor.name)}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            loading="lazy"
            emptyMessage="Imagem indisponível para esta cor"
            fallbackMessage="Não foi possível carregar a imagem"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}