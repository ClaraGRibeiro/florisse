export type ProntaEntrega = {
  productId: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
};

const prontaEntrega: ProntaEntrega[] = [
  {
    productId: "tapete-sara",
    color: "verde militar",
    size: "65 × 45 cm",
    price: 30,
    quantity: 1,
  },
  {
    productId: "tapete-cleo",
    color: "malva",
    size: "65 × 45 cm",
    price: 30,
    quantity: 1,
  },
  {
    productId: "tapete-cris",
    color: "bordo",
    size: "75 × 45 cm",
    price: 35,
    quantity: 1,
  },
  {
    productId: "tapete-janine",
    color: "verde limao-cru",
    size: "70 × 50 cm",
    price: 50,
    quantity: 1,
  },
  {
    productId: "tapete-aline",
    color: "telha-bege",
    size: "76 × 53 cm",
    price: 50,
    quantity: 1,
  },
  {
    productId: "sousplat-tradicional",
    color: "marrom",
    size: "37 cm",
    price: 150,
    quantity: 6,
  },
  {
    productId: "trilho-tradicional",
    color: "marrom",
    size: "100 × 25 cm",
    price: 70,
    quantity: 1,
  },
  {
    productId: "sousplat-encanto",
    color: "cinza",
    size: "37 cm",
    price: 25,
    quantity: 1,
  },
  {
    productId: "trilho-losango",
    color: "verde militar-cru-telha",
    size: "120 × 35 cm",
    price: 80,
    quantity: 1,
  },
];

export default prontaEntrega;