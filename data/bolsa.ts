import { PACKAGE } from "./config";

const bolsa = [
  {
    name: "Bolsa Redinha",
    category: "Bolsas",
    sizes: [
      {
        label: "30 × 30 × 10 cm",
        price: 80,
        sales: 1,
        peso: PACKAGE + 0.325,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
    ],
    colors: ["verde militar"],
    images: {
      "verde militar": ["/products/bolsas/bolsa-redinha/verde militar.webp"],
    },
  },
];

export default bolsa;
