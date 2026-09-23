import { DISCOUNT } from "./config";

const mesaposta = [
  {
    name: "Sousplat Tradicional",
    category: "Mesa Posta",

    sizes: [
      {
        label: "37 cm",
        price: 27,
        sales: 2,
      },
      {
        label: "KIT 7 peças: 6 (37 cm) + 1 (100 × 25 cm)",
        price: (27 + 27 + 27 + 27 + 27 + 27 + 65) * DISCOUNT,
        no_discount: 27 + 27 + 27 + 27 + 27 + 27 + 65,
      },
    ],

    colors: ["malva", "marrom"],

    images: {
      malva: [
        {
          url: "/products/mesa-posta/sousplat-tradicional/malva.webp",
          alt: "27 cm",
        },
      ],

      marrom: [
        {
          url: "/products/mesa-posta/sousplat-tradicional/marrom.webp",
          alt: "37 cm",
        },
      ],
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
      },
    ],

    colors: ["marrom"],

    images: {
      marrom: [
        {
          url: "/products/mesa-posta/trilho-tradicional/marrom.webp",
          alt: "100 × 25 cm",
        },
        {
          url: "/products/mesa-posta/trilho-tradicional/marrom-2.webp",
          alt: "KIT 7 peças: 6 (37 cm) + 1 (100 × 25 cm)",
        },
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
      },
      {
        label: "KIT 6 peças: 6 (37 cm)",
        price: (27 + 27 + 27 + 27 + 27 + 27) * DISCOUNT,
        no_discount: 27 + 27 + 27 + 27 + 27 + 27,
      },
    ],

    colors: ["cinza"],

    images: {
      cinza: [
        {
          url: "/products/mesa-posta/sousplat-encanto/cinza.webp",
          alt: "37 cm",
        },
        {
          url: "/products/mesa-posta/sousplat-encanto/cinza-2.webp",
          alt: "37 cm",
        },
        {
          url: "/products/mesa-posta/sousplat-encanto/cinza-3.webp",
          alt: "37 cm",
        },
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
      },
    ],

    colors: ["verde militar-cru-telha"],

    images: {
      "verde militar-cru-telha": [
        {
          url: "/products/mesa-posta/trilho-losango/verde militar-cru-telha.webp",
          alt: "120 × 35 cm",
        },
        {
          url: "/products/mesa-posta/trilho-losango/verde militar-cru-telha-2.webp",
          alt: "120 × 35 cm",
        },
        {
          url: "/products/mesa-posta/trilho-losango/verde militar-cru-telha-3.webp",
          alt: "120 × 35 cm",
        },
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
      },
    ],

    colors: ["cru-bege"],

    images: {
      "cru-bege": [
        {
          url: "/products/mesa-posta/trilho-floral/cru-bege.webp",
          alt: "110 × 40 cm",
        },
        {
          url: "/products/mesa-posta/trilho-floral/cru-bege-2.webp",
          alt: "110 × 40 cm",
        },
      ],
    },
  },
];

export default mesaposta;
