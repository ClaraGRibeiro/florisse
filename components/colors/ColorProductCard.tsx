import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { getProductStartingPrice } from "@/lib/colors";
import { getProductUrl } from "@/lib/productUrl";
import { Product } from "@/types/product";

type ColorProductCardProps = {
  product: Product;
  color: string;
  index: number;
  formatColor: (name: string) => string;
  image: string;
};

export default function ColorProductCard({
  product,
  color,
  index,
  formatColor,
  image,
}: ColorProductCardProps) {
  const price = getProductStartingPrice(product);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link
        href={getProductUrl(product.name, { color })}
        className="group border-border bg-background hover:border-primary/20 focus-visible:ring-primary block overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        <div className="bg-muted/10 relative aspect-square overflow-hidden">
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 45vw, 30vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <span className="bg-card/90 text-foreground absolute bottom-2 left-2 rounded-full px-2.5 py-1 text-[9px] font-semibold tracking-wide uppercase opacity-0 shadow-sm backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            Ver peça
          </span>
        </div>

        <div className="p-3">
          <h4 className="text-foreground truncate font-serif text-sm font-semibold sm:text-base">
            {product.name}
          </h4>

          <p className="text-muted mt-1 truncate text-[10px] sm:text-xs">
            {color.split("-").map(formatColor).join(" · ")}
          </p>

          {price && (
            <p className="text-muted mt-1 text-xs sm:text-sm">
              A partir{" "}
              <span className="text-foreground font-semibold">{price}</span>
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
