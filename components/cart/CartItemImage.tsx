import Link from "next/link";

import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { formatPath } from "@/utils/format";

import type { CartItemType } from "@/components/cart/types";

type CartItemImageProps = {
  item: CartItemType;
};

export default function CartItemImage({ item }: CartItemImageProps) {
  return (
    <Link href={`/produto/${formatPath(item.name)}`} className="block shrink-0">
      <div className="relative h-40 w-full overflow-hidden rounded-[1.25rem] md:h-36 md:w-36">
        <ImageWithFallback
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, 144px"
          loading="lazy"
          className="object-cover transition-transform duration-500 hover:scale-[1.025]"
        />
      </div>
    </Link>
  );
}
