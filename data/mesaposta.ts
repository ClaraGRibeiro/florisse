import { DISCOUNT, PACKAGE } from "./config";

const mesaposta = [
  {
    name: "Sousplat Tradicional",
    category: "Mesa Posta",

    sizes: [
      {
        label: "37 cm",
        price: 27,
        sales: 2,
        peso: PACKAGE + 0.14,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "KIT 6 (37 cm) + 1 (100 × 25 cm)",
        price: (27 + 27 + 27 + 27 + 27 + 27 + 65) * DISCOUNT,
        no_discount: 27 + 27 + 27 + 27 + 27 + 27 + 65,
        peso: PACKAGE + 0.14 + 0.14 + 0.14 + 0.14 + 0.14 + 0.14 + 0.25,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
    ],

    colors: ["malva", "marrom"],

    images: {
      malva: ["/products/mesa-posta/sousplat-tradicional/malva.webp"],
      marrom: ["/products/mesa-posta/sousplat-tradicional/marrom.webp"],
    },
  },

  {
    name: "Trilho Tradicional",
    category: "Mesa Posta",

    sizes: [
      {
        label: "100 × 25 cm",
        price: 65,
        sales: 0,
        peso: PACKAGE + 0.25,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
    ],

    colors: ["marrom"],

    images: {
      marrom: [
        "/products/mesa-posta/trilho-tradicional/marrom.webp",
        "/products/mesa-posta/trilho-tradicional/marrom-2.webp",
      ],
    },
  },

  {
    name: "Sousplat Encanto",
    category: "Mesa Posta",

    sizes: [
      {
        label: "37 cm",
        price: 27,
        sales: 0,
        peso: PACKAGE + 0.21,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "KIT 6 (37 cm)",
        price: (27 + 27 + 27 + 27 + 27 + 27) * DISCOUNT,
        no_discount: 27 + 27 + 27 + 27 + 27 + 27,
        peso: PACKAGE + 0.21 + 0.21 + 0.21 + 0.21 + 0.21 + 0.21,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
    ],

    colors: ["cinza"],

    images: {
      cinza: [
        "/products/mesa-posta/sousplat-encanto/cinza.webp",
        "/products/mesa-posta/sousplat-encanto/cinza-2.webp",
        "/products/mesa-posta/sousplat-encanto/cinza-3.webp",
      ],
    },
  },

  {
    name: "Trilho Losango",
    category: "Mesa Posta",

    sizes: [
      {
        label: "120 × 35 cm",
        price: 85,
        sales: 0,
        peso: PACKAGE + 0.36,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
    ],

    colors: ["verde militar-cru-telha"],

    images: {
      "verde militar-cru-telha": [
        "/products/mesa-posta/trilho-losango/verde militar-cru-telha.webp",
        "/products/mesa-posta/trilho-losango/verde militar-cru-telha-2.webp",
        "/products/mesa-posta/trilho-losango/verde militar-cru-telha-3.webp",
      ],
    },
  },

  {
    name: "Trilho Floral",
    category: "Mesa Posta",

    sizes: [
      {
        label: "110 × 40 cm",
        price: 135,
        sales: 1,
        peso: PACKAGE + 0.5,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
    ],

    colors: ["cru-bege"],

    images: {
      "cru-bege": [
        "/products/mesa-posta/trilho-floral/cru-bege.webp",
        "/products/mesa-posta/trilho-floral/cru-bege-2.webp",
      ],
    },
  },
];

export default mesaposta;
