import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/hooks/useCart";

type CartItem = ReturnType<typeof useCart>["cart"][number];
import { formatPath } from "@/utils/format";

type CartItemImageProps = {
  item: CartItem;
};

export default function CartItemImage({ item }: CartItemImageProps) {
  return (
    <Link
      href={`/produto/${formatPath(item.name)}`}
      className="block shrink-0"
    >
      <Image
        src={item.image}
        alt={item.name}
        width={160}
        height={160}
        loading="lazy"
        className="h-40 w-full rounded-[1.25rem] object-cover transition-transform duration-500 hover:scale-[1.025] md:h-36 md:w-36"
      />
    </Link>
  );
}
