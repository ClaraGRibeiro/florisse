import { DISCOUNT } from "./config";

const rugs = [
  // Tapete Sara
  {
    name: "Tapete Sara",
    category: "Tapetes",

    sizes: [
      {
        label: "65 × 45 cm",
        price: 30,
        sales: 0,
      },
      {
        label: "100 × 45 cm",
        price: 70,
        sales: 0,
      },
      {
        label: "120 × 45 cm",
        price: 95,
        sales: 0,
      },
      {
        label: "KIT 2 peças: (100 × 45 cm)",
        price: (70 + 70) * DISCOUNT,
        noDiscount: 70 + 70,
      },
      {
        label: "KIT 3 peças: 2 (65 × 45 cm) e 1 (120 × 45 cm)",
        price: (30 + 30 + 95) * DISCOUNT,
        noDiscount: 30 + 30 + 95,
      },
    ],

    colors: ["verde militar"],

    images: {
      "verde militar": [
        {
          url: "/products/rugs/tapete-sara/verde militar.jpg",
          alt: "65 × 45 cm",
        },
        {
          url: "/products/rugs/tapete-sara/verde militar-2.jpg",
          alt: "65 × 45 cm",
        },
      ],
    },
  },

  // Tapete Cléo
  {
    name: "Tapete Cléo",
    category: "Tapetes",

    sizes: [
      {
        label: "65 × 45 cm",
        price: 30,
        sales: 0,
      },
      {
        label: "100 × 45 cm",
        price: 70,
        sales: 0,
      },
      {
        label: "120 × 45 cm",
        price: 95,
        sales: 0,
      },
      {
        label: "KIT 2 peças: (100 × 45 cm)",
        price: (70 + 70) * DISCOUNT,
        noDiscount: 70 + 70,
      },
      {
        label: "KIT 3 peças: 2 (65 × 45 cm) e 1 (120 × 45 cm)",
        price: (30 + 30 + 95) * DISCOUNT,
        noDiscount: 30 + 30 + 95,
      },
    ],

    colors: ["malva"],

    images: {
      malva: [
        {
          url: "/products/rugs/tapete-cleo/malva.jpg",
          alt: "65 × 45 cm",
        },
        {
          url: "/products/rugs/tapete-cleo/malva-2.jpg",
          alt: "65 × 45 cm",
        },
      ],
    },
  },

  // Tapete Cris
  {
    name: "Tapete Cris",
    category: "Tapetes",

    sizes: [
      {
        label: "65 × 45 cm",
        price: 35,
        sales: 0,
      },
      {
        label: "100 × 45 cm",
        price: 80,
        sales: 0,
      },
      {
        label: "120 × 45 cm",
        price: 100,
        sales: 0,
      },
      {
        label: "KIT 2 peças: 2 (100 × 45 cm)",
        price: (80 + 80) * DISCOUNT,
        noDiscount: 80 + 80,
      },
      {
        label: "KIT 3 peças: 2 (65 × 45 cm) e 1 (120 × 45 cm)",
        price: (35 + 35 + 100) * DISCOUNT,
        noDiscount: 35 + 35 + 100,
      },
    ],

    colors: ["bordo"],

    images: {
      bordo: [
        {
          url: "/products/rugs/tapete-cris/bordo.jpg",
          alt: "65 × 45 cm",
        },
        {
          url: "/products/rugs/tapete-cris/bordo-2.jpg",
          alt: "65 × 45 cm",
        },
      ],
    },
  },

  // Tapete Nina
  {
    name: "Tapete Nina",
    category: "Tapetes",

    sizes: [
      {
        label: "65 × 45 cm",
        price: 35,
        sales: 1,
      },
      {
        label: "100 × 45 cm",
        price: 80,
        sales: 0,
      },
      {
        label: "120 × 45 cm",
        price: 100,
        sales: 0,
      },
      {
        label: "KIT 2 peças: 2 (100 × 45 cm)",
        price: (80 + 80) * DISCOUNT,
        noDiscount: 80 + 80,
      },
      {
        label: "KIT 3 peças: 2 (65 × 45 cm) e 1 (120 × 45 cm)",
        price: (35 + 35 + 100) * DISCOUNT,
        noDiscount: 35 + 35 + 100,
      },
    ],

    colors: ["vermelho"],

    images: {
      vermelho: [
        {
          url: "/products/rugs/tapete-nina/vermelho.jpg",
          alt: "70 × 50 cm",
        },
        {
          url: "/products/rugs/tapete-nina/vermelho-2.jpg",
          alt: "70 × 50 cm",
        },
      ],
    },
  },

  // Tapete Luana
  // {
  //   name: "Tapete Luana",
  //   category: "Tapetes",

  //   sizes: [
  //     {
  //       label: "65 × 45 cm",
  //       price: 45,
  //       sales: 0,
  //     },
  //     {
  //       label: "100 × 45 cm",
  //       price: 95,
  //       sales: 0,
  //     },
  //     {
  //       label: "120 × 45 cm",
  //       price: 115,
  //       sales: 0,
  //     },
  //     {
  //       label: "KIT 2 peças: 2 (100 × 45 cm)",
  //       price: (95 + 95) * DISCOUNT,
  //       noDiscount: 95 + 95,
  //     },
  //     {
  //       label: "KIT 3 peças: 2 (65 × 45 cm) e 1 (120 × 45 cm)",
  //       price: (45 + 45 + 115) * DISCOUNT,
  //       noDiscount: 45 + 45 + 115,
  //     },
  //   ],

  //   colors: ["vermelho-malva-cru"],

  //   images: {
  //     "vermelho-malva-cru": [
  //       {
  //         url: "/products/rugs/tapete-luana/vermelho-malva-cru.jpg",
  //         alt: "65 × 45 cm",
  //       },
  //     ],
  //   },
  // },

  // Tapete Janine
  {
    name: "Tapete Janine",
    category: "Tapetes",

    sizes: [
      {
        label: "70 × 50 cm",
        price: 55,
        sales: 7,
      },
      {
        label: "100 × 50 cm",
        price: 110,
        sales: 5,
      },
      {
        label: "120 × 50 cm",
        price: 135,
        sales: 1,
      },
      {
        label: "KIT 2 peças: 2 (100 × 50 cm)",
        price: (110 + 110) * DISCOUNT,
        noDiscount: 110 + 110,
      },
      {
        label: "KIT 3 peças: 2 (70 × 50 cm) e 1 (120 × 50 cm)",
        price: (55 + 55 + 135) * DISCOUNT,
        noDiscount: 55 + 55 + 135,
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
          url: "/products/rugs/tapete-janine/alecrim-verde militar.jpg",
          alt: "KIT 3 peças: 2 (70 × 50 cm) e 1 (170 × 50 cm)",
        },
        {
          url: "/products/rugs/tapete-janine/alecrim-verde militar-2.jpg",
          alt: "KIT 2 peças: 2 (70 × 50 cm)",
        },
      ],

      "cru-marrom-bege": [
        {
          url: "/products/rugs/tapete-janine/cru-marrom-bege.jpg",
          alt: "KIT 2 peças: 2 (70 × 50 cm)",
        },
        {
          url: "/products/rugs/tapete-janine/cru-marrom-bege-2.jpg",
          alt: "100 × 50 cm",
        },
      ],

      "verde limao-cru": [
        {
          url: "/products/rugs/tapete-janine/verde limao-cru.jpg",
          alt: "70 × 50 cm",
        },
        {
          url: "/products/rugs/tapete-janine/verde limao-cru-2.jpg",
          alt: "70 × 50 cm",
        },
      ],

      "cru-verde militar-alecrim": [
        {
          url: "/products/rugs/tapete-janine/cru-verde militar-alecrim.jpg",
          alt: "KIT 2 peças: 2 (70 × 50 cm)",
        },
        {
          url: "/products/rugs/tapete-janine/cru-verde militar-alecrim-2.jpg",
          alt: "100 × 50 cm",
        },
      ],

      "bege-alecrim-cru": [
        {
          url: "/products/rugs/tapete-janine/bege-alecrim-cru.jpg",
          alt: "KIT 2 peças: 2 (100 × 50 cm)",
        },
        {
          url: "/products/rugs/tapete-janine/bege-alecrim-cru-2.jpg",
          alt: "100 × 50 cm",
        },
      ],
    },
  },

  // Tapete Gisele
  {
    name: "Tapete Gisele",
    category: "Tapetes",

    sizes: [
      {
        label: "70 × 50 cm",
        price: 55,
        sales: 0,
      },
      {
        label: "100 × 50 cm",
        price: 110,
        sales: 0,
      },
      {
        label: "120 × 50 cm",
        price: 135,
        sales: 1,
      },
      {
        label: "KIT 2 peças: 2 (100 × 50 cm)",
        price: (110 + 110) * DISCOUNT,
        noDiscount: 110 + 110,
      },
      {
        label: "KIT 3 peças: 2 (70 × 50 cm) e 1 (120 × 50 cm)",
        price: (55 + 55 + 135) * DISCOUNT,
        noDiscount: 55 + 55 + 135,
      },
    ],

    colors: ["preto-cinza", "telha-verde limao-vermelho-preto"],

    images: {
      "preto-cinza": [
        {
          url: "/products/rugs/tapete-gisele/preto-cinza.jpg",
          alt: "73 × 52 cm",
        },
        {
          url: "/products/rugs/tapete-gisele/preto-cinza-2.jpg",
          alt: "73 × 52 cm",
        },
      ],
      "telha-verde limao-vermelho-preto": [
        {
          url: "/products/rugs/tapete-gisele/telha-verde limao-vermelho-preto.jpg",
          alt: "210 × 65 cm",
        },
      ],
    },
  },

  // Tapete Aline
  {
    name: "Tapete Aline",
    category: "Tapetes",

    sizes: [
      {
        label: "70 × 50 cm",
        price: 65,
        sales: 0,
      },
      {
        label: "100 × 50 cm",
        price: 130,
        sales: 0,
      },
      {
        label: "120 × 50 cm",
        price: 160,
        sales: 0,
      },
      {
        label: "KIT 2 peças: 2 (100 × 50 cm)",
        price: (130 + 130) * DISCOUNT,
        noDiscount: 130 + 130,
      },
      {
        label: "KIT 3 peças: 2 (70 × 50 cm) e 1 (120 × 50 cm)",
        price: (65 + 65 + 160) * DISCOUNT,
        noDiscount: 65 + 65 + 160,
      },
    ],

    colors: ["telha-bege"],

    images: {
      "telha-bege": [
        {
          url: "/products/rugs/tapete-aline/telha-bege.jpg",
          alt: "76 × 53 cm",
        },
        {
          url: "/products/rugs/tapete-aline/telha-bege-2.jpg",
          alt: "76 × 53 cm",
        },
      ],
    },
  },

  // Tapete Home
  {
    name: "Tapete Home",
    category: "Tapetes",

    sizes: [
      {
        label: "70 × 50 cm",
        price: 65,
        sales: 0,
      },
      {
        label: "100 × 50 cm",
        price: 130,
        sales: 0,
      },
      {
        label: "120 × 50 cm",
        price: 160,
        sales: 1,
      },
      {
        label: "KIT 2 peças: 2 (100 × 50 cm)",
        price: (130 + 130) * DISCOUNT,
        noDiscount: 130 + 130,
      },
      {
        label: "KIT 3 peças: 2 (70 × 50 cm) e 1 (120 × 50 cm)",
        price: (65 + 65 + 160) * DISCOUNT,
        noDiscount: 65 + 65 + 160,
      },
    ],

    colors: ["cru-vermelho"],

    images: {
      "cru-vermelho": [
        {
          url: "/products/rugs/tapete-home/cru-vermelho.jpg",
          alt: "185 × 65 cm",
        },
        {
          url: "/products/rugs/tapete-home/cru-vermelho-2.jpg",
          alt: "185 × 65 cm",
        },
      ],
    },
  },

  // Tapete Harmonia
  {
    name: "Tapete Harmonia",
    category: "Tapetes",

    sizes: [
      {
        label: "70 × 50 cm",
        price: 65,
        sales: 0,
      },
      {
        label: "100 × 50 cm",
        price: 130,
        sales: 2,
      },
      {
        label: "120 × 50 cm",
        price: 160,
        sales: 0,
      },
      {
        label: "KIT 2 peças: 2 (100 × 50 cm)",
        price: (130 + 130) * DISCOUNT,
        noDiscount: 130 + 130,
      },
      {
        label: "KIT 3 peças: 2 (70 × 50 cm) e 1 (120 × 50 cm)",
        price: (65 + 65 + 160) * DISCOUNT,
        noDiscount: 65 + 65 + 160,
      },
    ],

    colors: ["bordo-verde militar"],

    images: {
      "bordo-verde militar": [
        {
          url: "/products/rugs/tapete-harmonia/bordo-verde militar.jpg",
          alt: "85 × 50 cm",
        },
        {
          url: "/products/rugs/tapete-harmonia/bordo-verde militar-2.jpg",
          alt: "85 × 50 cm",
        },
      ],
    },
  },

  // Tapete Hexágono
  {
    name: "Tapete Hexágono",
    category: "Tapetes",

    sizes: [
      {
        label: "70 × 50 cm",
        price: 70,
        sales: 0,
      },
      {
        label: "100 × 50 cm",
        price: 140,
        sales: 0,
      },
      {
        label: "120 × 50 cm",
        price: 165,
        sales: 1,
      },
      {
        label: "KIT 2 peças: 2 (100 × 50 cm)",
        price: (140 + 140) * DISCOUNT,
        noDiscount: 140 + 140,
      },
      {
        label: "KIT 3 peças: 2 (70 × 50 cm) e 1 (120 × 50 cm)",
        price: (70 + 70 + 165) * DISCOUNT,
        noDiscount: 70 + 70 + 165,
      },
    ],

    colors: ["cru-cinza-bege"],

    images: {
      "cru-cinza-bege": [
        {
          url: "/products/rugs/tapete-hexagonos/cru-cinza-bege.jpg",
          alt: "227 × 63 cm",
        },
      ],
    },
  },

  // Tapete Léia Meia-Lua
  {
    name: "Tapete Léia Meia-Lua",
    category: "Tapetes",

    sizes: [
      {
        label: "100 × 50 cm",
        price: 150,
        sales: 0,
      },
    ],

    colors: ["cinza"],

    images: {
      cinza: [
        {
          url: "/products/rugs/tapete-leia-meia-lua/cinza.jpg",
          alt: "100 × 50 cm",
        },
        {
          url: "/products/rugs/tapete-leia-meia-lua/cinza-2.jpg",
          alt: "100 × 50 cm",
        },
        {
          url: "/products/rugs/tapete-leia-meia-lua/cinza-3.jpg",
          alt: "100 × 50 cm",
        },
      ],
    },
  },

  // Tapete Maravilha
  {
    name: "Tapete Maravilha",
    category: "Tapetes",

    sizes: [
      {
        label: "100 cm",
        price: 250,
        sales: 1,
      },
      {
        label: "150 cm",
        price: 560,
        sales: 0,
      },
    ],

    colors: ["alecrim-verde militar"],

    images: {
      "alecrim-verde militar": [
        {
          url: "/products/rugs/tapete-maravilha/alecrim-verde militar.jpg",
          alt: "105 cm",
        },
        {
          url: "/products/rugs/tapete-maravilha/alecrim-verde militar-2.jpg",
          alt: "105 cm",
        },
      ],
    },
  },
];

export default rugs;
