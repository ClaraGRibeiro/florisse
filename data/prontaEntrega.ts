import { DISCOUNT, PACKAGE } from "./config";

export type ProntaEntrega = {
  name: string | null;
  productId: string;
  color: string;
  images: Record<string, string[]> | null;
  size: string;
  price: number;
  peso: number | null;
  quantity: number;
};

const prontaEntrega: ProntaEntrega[] = [
  {
    name: "KIT Mesa Posta Tradicional",
    productId: "trilho-tradicional",
    color: "marrom",
    images: {
      marrom: [
        "/products/mesa-posta/trilho-tradicional/marrom-2.webp",
        "/products/mesa-posta/trilho-tradicional/marrom.webp",
        "/products/mesa-posta/sousplat-tradicional/marrom.webp",
      ],
    },
    size: "KIT 6 (37 cm) + 1 (100 × 25 cm)",
    peso: PACKAGE + 0.14 + 0.14 + 0.14 + 0.14 + 0.14 + 0.14 + 0.25,
    price: (27 + 27 + 27 + 27 + 27 + 27 + 65) * DISCOUNT,
    quantity: 1,
  },
  {
    name: null,
    productId: "tapete-sara",
    color: "verde militar",
    images: null,
    size: "65 × 45 cm",
    peso: null,
    price: 30,
    quantity: 1,
  },
  {
    name: null,
    productId: "tapete-cleo",
    color: "malva",
    images: null,
    size: "65 × 45 cm",
    peso: null,
    price: 30,
    quantity: 1,
  },
  {
    name: null,
    productId: "tapete-cris",
    color: "bordo",
    images: null,
    size: "75 × 45 cm",
    peso: null,
    price: 35,
    quantity: 1,
  },
  {
    name: null,
    productId: "tapete-janine",
    color: "verde limao-cru",
    images: null,
    size: "70 × 50 cm",
    peso: null,
    price: 50,
    quantity: 1,
  },
  {
    name: null,
    productId: "tapete-aline",
    color: "telha-bege",
    images: null,
    size: "76 × 53 cm",
    peso: 325,
    price: 60,
    quantity: 1,
  },
  {
    name: null,
    productId: "sousplat-encanto",
    color: "cinza",
    images: null,
    size: "37 cm",
    peso: null,
    price: 25,
    quantity: 1,
  },
  {
    name: null,
    productId: "trilho-losango",
    color: "verde militar-cru-telha",
    images: null,
    size: "120 × 35 cm",
    peso: null,
    price: 80,
    quantity: 1,
  },
];

export default prontaEntrega;
