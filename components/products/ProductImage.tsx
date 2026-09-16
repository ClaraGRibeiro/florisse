import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import { Product } from "@/types/product";

type ProductImageProps = {
  product: Product;
  selectedColor: Product["colors"][number];
  formatPath: (name: string) => string;
  formatColor: (name: string) => string;
};

export default function ProductImage({
  product,
  selectedColor,
  formatPath,
  formatColor,
}: ProductImageProps) {
  const imagePath = `/products/${formatPath(
    product.category,
  )}/${formatPath(product.name)}/${selectedColor.name}.webp`;

  return (
    <div className="relative aspect-square w-full overflow-hidden bg-muted">
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
          <Image
            src={imagePath}
            alt={`${product.name} - ${formatColor(selectedColor.name)}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            loading="lazy"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}