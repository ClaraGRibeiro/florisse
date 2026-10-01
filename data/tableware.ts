import { DISCOUNT } from "./config";

const tableware = [
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
        label: "KIT 6 peças: 6 (37 cm)",
        price: (27 + 27 + 27 + 27 + 27 + 27) * DISCOUNT,
        noDiscount: 27 + 27 + 27 + 27 + 27 + 27,
      },
    ],

    colors: ["malva", "marrom"],

    images: {
      malva: [
        {
          url: "/products/tableware/sousplat-tradicional/malva.jpg",
          alt: "27 cm",
        },
      ],

      marrom: [
        {
          url: "/products/tableware/sousplat-tradicional/marrom.jpg",
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
          url: "/products/tableware/trilho-tradicional/marrom.jpg",
          alt: "100 × 25 cm",
        },
        {
          url: "/products/tableware/trilho-tradicional/marrom-2.jpg",
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
        noDiscount: 27 + 27 + 27 + 27 + 27 + 27,
      },
    ],

    colors: ["cinza"],

    images: {
      cinza: [
        {
          url: "/products/tableware/sousplat-encanto/cinza.jpg",
          alt: "37 cm",
        },
        {
          url: "/products/tableware/sousplat-encanto/cinza-2.jpg",
          alt: "37 cm",
        },
        {
          url: "/products/tableware/sousplat-encanto/cinza-3.jpg",
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
          url: "/products/tableware/trilho-losango/verde militar-cru-telha.jpg",
          alt: "120 × 35 cm",
        },
        {
          url: "/products/tableware/trilho-losango/verde militar-cru-telha-2.jpg",
          alt: "120 × 35 cm",
        },
        {
          url: "/products/tableware/trilho-losango/verde militar-cru-telha-3.jpg",
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
          url: "/products/tableware/trilho-floral/cru-bege.jpg",
          alt: "110 × 40 cm",
        },
        {
          url: "/products/tableware/trilho-floral/cru-bege-2.jpg",
          alt: "110 × 40 cm",
        },
      ],
    },
  },
];

export default tableware;
