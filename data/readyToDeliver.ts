import { DISCOUNT } from "./config";
import { ProductImage } from "@/types/product";

export type ReadyToDeliver = {
  name: string | null;
  productId: string;
  color: string;
  images: Record<string, ProductImage[]> | null;
  size: string;
  price: number;
  quantity: number;
};

const readyToDeliver: ReadyToDeliver[] = [
  {
    name: "KIT Mesa Posta Tradicional",
    productId: "trilho-tradicional",
    color: "marrom",
    images: {
      marrom: [
        {
          url: "/products/tableware/trilho-tradicional/marrom-2.jpg",
          alt: "KIT 7 peças: 6 (37 cm) + 1 (100 × 25 cm)",
        },
        {
          url: "/products/tableware/trilho-tradicional/marrom.jpg",
          alt: "100 × 25 cm",
        },
        {
          url: "/products/tableware/sousplat-tradicional/marrom.jpg",
          alt: "37 cm",
        },
      ],
    },
    size: "KIT 7 peças: 6 (37 cm) + 1 (100 × 25 cm)",
    price: (27 + 27 + 27 + 27 + 27 + 27 + 65) * DISCOUNT,
    quantity: 1,
  },
  {
    name: null,
    productId: "tapete-cleo",
    color: "malva",
    images: null,
    size: "KIT 2 peças: 65 × 45 cm",
    price: 60,
    quantity: 2,
  },
  {
    name: null,
    productId: "tapete-cris",
    color: "bordo",
    images: null,
    size: "KIT 2 peças: 65 × 45 cm",
    price: 70,
    quantity: 2,
  },
  {
    name: null,
    productId: "tapete-nina",
    color: "preto-vermelho",
    images: null,
    size: "KIT 2 peças: 67 × 47 cm",
    price: 70,
    quantity: 2,
  },
  {
    name: null,
    productId: "tapete-leia-meia-lua",
    color: "cinza",
    images: null,
    size: "100 × 50 cm",
    price: 150,
    quantity: 1,
  },
  {
    name: null,
    productId: "tapete-leia-meia-lua",
    color: "telha",
    images: null,
    size: "100 × 48 cm",
    price: 150,
    quantity: 1,
  },
  {
    name: null,
    productId: "tapete-janine",
    color: "verde limao-cru",
    images: null,
    size: "KIT 2 peças: 70 × 50 cm",
    price: 100,
    quantity: 2,
  },
  {
    name: null,
    productId: "tapete-janine",
    color: "bege-marrom",
    images: null,
    size: "KIT 2 peças: 70 × 50 cm",
    price: 100,
    quantity: 2,
  },
  {
    name: null,
    productId: "trilho-losango",
    color: "verde militar-cru-telha",
    images: null,
    size: "120 × 35 cm",
    price: 80,
    quantity: 1,
  },
];

export default readyToDeliver;
