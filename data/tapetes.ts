import { DISCOUNT, PACKAGE } from "./config";

const tapetes = [
  {
    name: "Tapete Sara",
    category: "Tapetes",

    sizes: [
      {
        label: "65 × 45 cm",
        price: 30,
        sales: 0,
        peso: PACKAGE + 0.22,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "100 × 45 cm",
        price: 100,
        sales: 0,
        peso: PACKAGE + 0.32,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "120 × 45 cm",
        price: 120,
        sales: 0,
        peso: PACKAGE + 0.42,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "KIT 2 peças: (100 × 45 cm)",
        price: (100 + 100) * DISCOUNT,
        no_discount: 100 + 100,
        peso: PACKAGE + 0.32 + 0.32,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "KIT 3 peças: 2 (65 × 45 cm) e 1 (120 × 45 cm)",
        price: (30 + 30 + 120) * DISCOUNT,
        no_discount: 30 + 30 + 120,
        peso: PACKAGE + 0.22 + 0.22 + 0.42,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
    ],

    colors: ["verde militar"],

    images: {
      "verde militar": [
        {
          url: "/products/tapetes/tapete-sara/verde militar.webp",
          alt: "65 × 45 cm",
        },
        {
          url: "/products/tapetes/tapete-sara/verde militar-2.webp",
          alt: "65 × 45 cm",
        },
      ],
    },
  },

  {
    name: "Tapete Cleo",
    category: "Tapetes",

    sizes: [
      {
        label: "65 × 45 cm",
        price: 30,
        sales: 0,
        peso: PACKAGE + 0.22,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "100 × 45 cm",
        price: 100,
        sales: 0,
        peso: PACKAGE + 0.32,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "120 × 45 cm",
        price: 120,
        sales: 0,
        peso: PACKAGE + 0.42,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "KIT 2 peças: 2 (100 × 45 cm)",
        price: (100 + 100) * DISCOUNT,
        no_discount: 100 + 100,
        peso: PACKAGE + 0.32 + 0.32,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "KIT 3 peças: 2 (65 × 45 cm) e 1 (120 × 45 cm)",
        price: (30 + 30 + 120) * DISCOUNT,
        no_discount: 30 + 30 + 120,
        peso: PACKAGE + 0.22 + 0.22 + 0.42,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
    ],

    colors: ["malva"],

    images: {
      malva: [
        {
          url: "/products/tapetes/tapete-cleo/malva.webp",
          alt: "65 × 45 cm",
        },
        {
          url: "/products/tapetes/tapete-cleo/malva-2.webp",
          alt: "65 × 45 cm",
        },
      ],
    },
  },

  {
    name: "Tapete Cris",
    category: "Tapetes",

    sizes: [
      {
        label: "65 × 45 cm",
        price: 35,
        sales: 0,
        peso: PACKAGE + 0.245,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "100 × 45 cm",
        price: 110,
        sales: 0,
        peso: PACKAGE + 0.345,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "120 × 45 cm",
        price: 130,
        sales: 0,
        peso: PACKAGE + 0.445,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "KIT 2 peças: 2 (100 × 45 cm)",
        price: (110 + 110) * DISCOUNT,
        no_discount: 110 + 110,
        peso: PACKAGE + 0.345 + 0.345,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "KIT 3 peças: 2 (65 × 45 cm) e 1 (120 × 45 cm)",
        price: (35 + 35 + 130) * DISCOUNT,
        no_discount: 35 + 35 + 130,
        peso: PACKAGE + 0.245 + 0.245 + 0.445,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
    ],

    colors: ["bordo"],

    images: {
      bordo: [
        {
          url: "/products/tapetes/tapete-cris/bordo.webp",
          alt: "65 × 45 cm",
        },
        {
          url: "/products/tapetes/tapete-cris/bordo-2.webp",
          alt: "65 × 45 cm",
        },
      ],
    },
  },

  {
    name: "Tapete Nina",
    category: "Tapetes",

    sizes: [
      {
        label: "65 × 45 cm",
        price: 35,
        sales: 1,
        peso: PACKAGE + 0.28,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "100 × 45 cm",
        price: 110,
        sales: 0,
        peso: PACKAGE + 0.38,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "120 × 45 cm",
        price: 130,
        sales: 0,
        peso: PACKAGE + 0.48,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "KIT 2 peças: 2 (100 × 45 cm)",
        price: (110 + 110) * DISCOUNT,
        no_discount: 110 + 110,
        peso: PACKAGE + 0.38 + 0.38,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "KIT 3 peças: 2 (65 × 45 cm) e 1 (120 × 45 cm)",
        price: (35 + 35 + 130) * DISCOUNT,
        no_discount: 35 + 35 + 130,
        peso: PACKAGE + 0.28 + 0.28 + 0.48,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
    ],

    colors: ["vermelho"],

    images: {
      vermelho: [
        {
          url: "/products/tapetes/tapete-nina/vermelho.webp",
          alt: "70 × 50 cm",
        },
        {
          url: "/products/tapetes/tapete-nina/vermelho-2.webp",
          alt: "70 × 50 cm",
        },
      ],
    },
  },

  {
    name: "Tapete Janine",
    category: "Tapetes",

    sizes: [
      {
        label: "70 × 50 cm",
        price: 50,
        sales: 6,
        peso: PACKAGE + 0.34,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "100 × 50 cm",
        price: 115,
        sales: 5,
        peso: PACKAGE + 0.44,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "120 × 50 cm",
        price: 145,
        sales: 1,
        peso: PACKAGE + 0.54,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "KIT 2 peças: 2 (100 × 50 cm)",
        price: (115 + 115) * DISCOUNT,
        no_discount: 115 + 115,
        peso: PACKAGE + 0.44 + 0.44,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "KIT 3 peças: 2 (70 × 50 cm) e 1 (120 × 50 cm)",
        price: (50 + 50 + 145) * DISCOUNT,
        no_discount: 50 + 50 + 145,
        peso: PACKAGE + 0.34 + 0.34 + 0.54,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
    ],

    colors: [
      "alecrim-verde militar",
      "cru-marrom-bege",
      "verde limao-cru",
      "cru-verde militar-alecrim",
      "bege-alecrim-cru",
    ],

    images: {
      "alecrim-verde militar": [
        {
          url: "/products/tapetes/tapete-janine/alecrim-verde militar.webp",
          alt: "KIT 3 peças: 2 (70 × 50 cm) e 1 (170 × 50 cm)",
        },
        {
          url: "/products/tapetes/tapete-janine/alecrim-verde militar-2.webp",
          alt: "KIT 2 peças: 2 (70 × 50 cm)",
        },
      ],

      "cru-marrom-bege": [
        {
          url: "/products/tapetes/tapete-janine/cru-marrom-bege.webp",
          alt: "KIT 2 peças: 2 (70 × 50 cm)",
        },
        {
          url: "/products/tapetes/tapete-janine/cru-marrom-bege-2.webp",
          alt: "100 × 50 cm",
        },
      ],

      "verde limao-cru": [
        {
          url: "/products/tapetes/tapete-janine/verde limao-cru.webp",
          alt: "70 × 50 cm",
        },
        {
          url: "/products/tapetes/tapete-janine/verde limao-cru-2.webp",
          alt: "70 × 50 cm",
        },
      ],

      "cru-verde militar-alecrim": [
        {
          url: "/products/tapetes/tapete-janine/cru-verde militar-alecrim.webp",
          alt: "KIT 2 peças: 2 (70 × 50 cm)",
        },
        {
          url: "/products/tapetes/tapete-janine/cru-verde militar-alecrim-2.webp",
          alt: "100 × 50 cm",
        },
      ],

      "bege-alecrim-cru": [
        {
          url: "/products/tapetes/tapete-janine/bege-alecrim-cru.webp",
          alt: "KIT 2 peças: 2 (100 × 50 cm)",
        },
        {
          url: "/products/tapetes/tapete-janine/bege-alecrim-cru-2.webp",
          alt: "100 × 50 cm",
        },
      ],
    },
  },

  {
    name: "Tapete Aline",
    category: "Tapetes",

    sizes: [
      {
        label: "70 × 50 cm",
        price: 60,
        sales: 0,
        peso: PACKAGE + 0.31,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "100 × 50 cm",
        price: 125,
        sales: 0,
        peso: PACKAGE + 0.41,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "120 × 50 cm",
        price: 155,
        sales: 0,
        peso: PACKAGE + 0.51,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "KIT 2 peças: 2 (100 × 50 cm)",
        price: (125 + 125) * DISCOUNT,
        no_discount: 125 + 125,
        peso: PACKAGE + 0.41 + 0.41,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "KIT 3 peças: 2 (70 × 50 cm) e 1 (120 × 50 cm)",
        price: (60 + 60 + 155) * DISCOUNT,
        no_discount: 60 + 60 + 155,
        peso: PACKAGE + 0.31 + 0.31 + 0.51,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
    ],

    colors: ["telha-bege"],

    images: {
      "telha-bege": [
        {
          url: "/products/tapetes/tapete-aline/telha-bege.webp",
          alt: "76 × 53 cm",
        },
        {
          url: "/products/tapetes/tapete-aline/telha-bege-2.webp",
          alt: "76 × 53 cm",
        },
      ],
    },
  },

  {
    name: "Tapete Gisele",
    category: "Tapetes",

    sizes: [
      {
        label: "70 × 50 cm",
        price: 60,
        sales: 0,
        peso: PACKAGE + 0.4,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "100 × 50 cm",
        price: 125,
        sales: 0,
        peso: PACKAGE + 0.5,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "120 × 50 cm",
        price: 155,
        sales: 1,
        peso: PACKAGE + 0.6,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "KIT 2 peças: 2 (100 × 50 cm)",
        price: (125 + 125) * DISCOUNT,
        no_discount: 125 + 125,
        peso: PACKAGE + 0.5 + 0.5,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "KIT 3 peças: 2 (70 × 50 cm) e 1 (120 × 50 cm)",
        price: (60 + 60 + 155) * DISCOUNT,
        no_discount: 60 + 60 + 155,
        peso: PACKAGE + 0.4 + 0.4 + 0.6,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
    ],

    colors: ["telha-verde limao-vermelho-preto"],

    images: {
      "telha-verde limao-vermelho-preto": [
        {
          url: "/products/tapetes/tapete-gisele/telha-verde limao-vermelho-preto.webp",
          alt: "210 × 65 cm)",
        },
      ],
    },
  },

  {
    name: "Tapete Home",
    category: "Tapetes",

    sizes: [
      {
        label: "70 × 50 cm",
        price: 60,
        sales: 0,
        peso: PACKAGE + 0.4,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "100 × 50 cm",
        price: 125,
        sales: 0,
        peso: PACKAGE + 0.5,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "120 × 50 cm",
        price: 155,
        sales: 1,
        peso: PACKAGE + 0.6,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "KIT 2 peças: 2 (100 × 50 cm)",
        price: (125 + 125) * DISCOUNT,
        no_discount: 125 + 125,
        peso: PACKAGE + 0.5 + 0.5,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "KIT 3 peças: 2 (70 × 50 cm) e 1 (120 × 50 cm)",
        price: (60 + 60 + 155) * DISCOUNT,
        no_discount: 60 + 60 + 155,
        peso: PACKAGE + 0.4 + 0.4 + 0.6,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
    ],

    colors: ["cru-vermelho"],

    images: {
      "cru-vermelho": [
        {
          url: "/products/tapetes/tapete-home/cru-vermelho.webp",
          alt: "185 × 65 cm",
        },
        {
          url: "/products/tapetes/tapete-home/cru-vermelho-2.webp",
          alt: "185 × 65 cm",
        },
      ],
    },
  },

  {
    name: "Tapete Harmonia",
    category: "Tapetes",

    sizes: [
      {
        label: "70 × 50 cm",
        price: 60,
        sales: 0,
        peso: PACKAGE + 0.45,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "100 × 50 cm",
        price: 125,
        sales: 2,
        peso: PACKAGE + 0.55,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "120 × 50 cm",
        price: 155,
        sales: 0,
        peso: PACKAGE + 0.65,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "KIT 2 peças: 2 (100 × 50 cm)",
        price: (125 + 125) * DISCOUNT,
        no_discount: 125 + 125,
        peso: PACKAGE + 0.55 + 0.55,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "KIT 3 peças: 2 (70 × 50 cm) e 1 (120 × 50 cm)",
        price: (60 + 60 + 155) * DISCOUNT,
        no_discount: 60 + 60 + 155,
        peso: PACKAGE + 0.45 + 0.45 + 0.65,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
    ],

    colors: ["bordo-verde militar"],

    images: {
      "bordo-verde militar": [
        {
          url: "/products/tapetes/tapete-harmonia/bordo-verde militar.webp",
          alt: "85 × 50 cm",
        },
        {
          url: "/products/tapetes/tapete-harmonia/bordo-verde militar-2.webp",
          alt: "85 × 50 cm",
        },
      ],
    },
  },

  {
    name: "Tapete Hexagonos",
    category: "Tapetes",

    sizes: [
      {
        label: "70 × 50 cm",
        price: 75,
        sales: 0,
        peso: PACKAGE + 0.26,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "100 × 50 cm",
        price: 140,
        sales: 0,
        peso: PACKAGE + 0.42,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "120 × 50 cm",
        price: 170,
        sales: 1,
        peso: PACKAGE + 0.495,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "KIT 2 peças: 2 (100 × 50 cm)",
        price: (140 + 140) * DISCOUNT,
        no_discount: 140 + 140,
        peso: PACKAGE + 0.42 + 0.42,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "KIT 3 peças: 2 (70 × 50 cm) e 1 (120 × 50 cm)",
        price: (75 + 75 + 170) * DISCOUNT,
        no_discount: 75 + 75 + 170,
        peso: PACKAGE + 0.495 + 0.495,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
    ],

    colors: ["cru-cinza-bege"],

    images: {
      "cru-cinza-bege": [
        {
          url: "/products/tapetes/tapete-hexagonos/cru-cinza-bege.webp",
          alt: "227 × 63 cm",
        },
      ],
    },
  },

  {
    name: "Tapete Maravilha",
    category: "Tapetes",

    sizes: [
      {
        label: "100 cm",
        price: 250,
        sales: 1,
        peso: PACKAGE + 1,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
      {
        label: "150 cm",
        price: 370,
        sales: 0,
        peso: PACKAGE + 1.5,
        largura: 20,
        comprimento: 30,
        altura: 15,
      },
    ],

    colors: ["alecrim-verde militar"],

    images: {
      "alecrim-verde militar": [
        {
          url: "/products/tapetes/tapete-maravilha/alecrim-verde militar.webp",
          alt: "105 cm",
        },
        {
          url: "/products/tapetes/tapete-maravilha/alecrim-verde militar-2.webp",
          alt: "105 cm",
        },
      ],
    },
  },
];

export default tapetes;
