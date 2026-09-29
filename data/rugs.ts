import { DISCOUNT } from "./config";

const rugs = [
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
        price: 100,
        sales: 0,
      },
      {
        label: "120 × 45 cm",
        price: 120,
        sales: 0,
      },
      {
        label: "KIT 2 peças: (100 × 45 cm)",
        price: (100 + 100) * DISCOUNT,
        noDiscount: 100 + 100,
      },
      {
        label: "KIT 3 peças: 2 (65 × 45 cm) e 1 (120 × 45 cm)",
        price: (30 + 30 + 120) * DISCOUNT,
        noDiscount: 30 + 30 + 120,
      },
    ],

    colors: ["verde militar"],

    images: {
      "verde militar": [
        {
          url: "/products/rugs/tapete-sara/verde militar.webp",
          alt: "65 × 45 cm",
        },
        {
          url: "/products/rugs/tapete-sara/verde militar-2.webp",
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
      },
      {
        label: "100 × 45 cm",
        price: 100,
        sales: 0,
      },
      {
        label: "120 × 45 cm",
        price: 120,
        sales: 0,
      },
      {
        label: "KIT 2 peças: 2 (100 × 45 cm)",
        price: (100 + 100) * DISCOUNT,
        noDiscount: 100 + 100,
      },
      {
        label: "KIT 3 peças: 2 (65 × 45 cm) e 1 (120 × 45 cm)",
        price: (30 + 30 + 120) * DISCOUNT,
        noDiscount: 30 + 30 + 120,
      },
    ],

    colors: ["malva"],

    images: {
      malva: [
        {
          url: "/products/rugs/tapete-cleo/malva.webp",
          alt: "65 × 45 cm",
        },
        {
          url: "/products/rugs/tapete-cleo/malva-2.webp",
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
      },
      {
        label: "100 × 45 cm",
        price: 110,
        sales: 0,
      },
      {
        label: "120 × 45 cm",
        price: 130,
        sales: 0,
      },
      {
        label: "KIT 2 peças: 2 (100 × 45 cm)",
        price: (110 + 110) * DISCOUNT,
        noDiscount: 110 + 110,
      },
      {
        label: "KIT 3 peças: 2 (65 × 45 cm) e 1 (120 × 45 cm)",
        price: (35 + 35 + 130) * DISCOUNT,
        noDiscount: 35 + 35 + 130,
      },
    ],

    colors: ["bordo"],

    images: {
      bordo: [
        {
          url: "/products/rugs/tapete-cris/bordo.webp",
          alt: "65 × 45 cm",
        },
        {
          url: "/products/rugs/tapete-cris/bordo-2.webp",
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
      },
      {
        label: "100 × 45 cm",
        price: 110,
        sales: 0,
      },
      {
        label: "120 × 45 cm",
        price: 130,
        sales: 0,
      },
      {
        label: "KIT 2 peças: 2 (100 × 45 cm)",
        price: (110 + 110) * DISCOUNT,
        noDiscount: 110 + 110,
      },
      {
        label: "KIT 3 peças: 2 (65 × 45 cm) e 1 (120 × 45 cm)",
        price: (35 + 35 + 130) * DISCOUNT,
        noDiscount: 35 + 35 + 130,
      },
    ],

    colors: ["vermelho"],

    images: {
      vermelho: [
        {
          url: "/products/rugs/tapete-nina/vermelho.webp",
          alt: "70 × 50 cm",
        },
        {
          url: "/products/rugs/tapete-nina/vermelho-2.webp",
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
      },
      {
        label: "100 × 50 cm",
        price: 115,
        sales: 5,
      },
      {
        label: "120 × 50 cm",
        price: 145,
        sales: 1,
      },
      {
        label: "KIT 2 peças: 2 (100 × 50 cm)",
        price: (115 + 115) * DISCOUNT,
        noDiscount: 115 + 115,
      },
      {
        label: "KIT 3 peças: 2 (70 × 50 cm) e 1 (120 × 50 cm)",
        price: (50 + 50 + 145) * DISCOUNT,
        noDiscount: 50 + 50 + 145,
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
          url: "/products/rugs/tapete-janine/alecrim-verde militar.webp",
          alt: "KIT 3 peças: 2 (70 × 50 cm) e 1 (170 × 50 cm)",
        },
        {
          url: "/products/rugs/tapete-janine/alecrim-verde militar-2.webp",
          alt: "KIT 2 peças: 2 (70 × 50 cm)",
        },
      ],

      "cru-marrom-bege": [
        {
          url: "/products/rugs/tapete-janine/cru-marrom-bege.webp",
          alt: "KIT 2 peças: 2 (70 × 50 cm)",
        },
        {
          url: "/products/rugs/tapete-janine/cru-marrom-bege-2.webp",
          alt: "100 × 50 cm",
        },
      ],

      "verde limao-cru": [
        {
          url: "/products/rugs/tapete-janine/verde limao-cru.webp",
          alt: "70 × 50 cm",
        },
        {
          url: "/products/rugs/tapete-janine/verde limao-cru-2.webp",
          alt: "70 × 50 cm",
        },
      ],

      "cru-verde militar-alecrim": [
        {
          url: "/products/rugs/tapete-janine/cru-verde militar-alecrim.webp",
          alt: "KIT 2 peças: 2 (70 × 50 cm)",
        },
        {
          url: "/products/rugs/tapete-janine/cru-verde militar-alecrim-2.webp",
          alt: "100 × 50 cm",
        },
      ],

      "bege-alecrim-cru": [
        {
          url: "/products/rugs/tapete-janine/bege-alecrim-cru.webp",
          alt: "KIT 2 peças: 2 (100 × 50 cm)",
        },
        {
          url: "/products/rugs/tapete-janine/bege-alecrim-cru-2.webp",
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
      },
      {
        label: "100 × 50 cm",
        price: 125,
        sales: 0,
      },
      {
        label: "120 × 50 cm",
        price: 155,
        sales: 0,
      },
      {
        label: "KIT 2 peças: 2 (100 × 50 cm)",
        price: (125 + 125) * DISCOUNT,
        noDiscount: 125 + 125,
      },
      {
        label: "KIT 3 peças: 2 (70 × 50 cm) e 1 (120 × 50 cm)",
        price: (60 + 60 + 155) * DISCOUNT,
        noDiscount: 60 + 60 + 155,
      },
    ],

    colors: ["telha-bege"],

    images: {
      "telha-bege": [
        {
          url: "/products/rugs/tapete-aline/telha-bege.webp",
          alt: "76 × 53 cm",
        },
        {
          url: "/products/rugs/tapete-aline/telha-bege-2.webp",
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
        price: 150,
        sales: 1,
      },
      {
        label: "KIT 2 peças: 2 (100 × 50 cm)",
        price: (110 + 110) * DISCOUNT,
        noDiscount: 110 + 110,
      },
      {
        label: "KIT 3 peças: 2 (70 × 50 cm) e 1 (120 × 50 cm)",
        price: (55 + 55 + 150) * DISCOUNT,
        noDiscount: 55 + 55 + 150,
      },
    ],

    colors: ["preto-cinza", "telha-verde limao-vermelho-preto"],

    images: {
      "preto-cinza": [
        {
          url: "/products/rugs/tapete-gisele/preto-cinza.webp",
          alt: "73 × 52 cm",
        },
        {
          url: "/products/rugs/tapete-gisele/preto-cinza-2.webp",
          alt: "73 × 52 cm",
        },
      ],
      "telha-verde limao-vermelho-preto": [
        {
          url: "/products/rugs/tapete-gisele/telha-verde limao-vermelho-preto.webp",
          alt: "210 × 65 cm",
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
      },
      {
        label: "100 × 50 cm",
        price: 125,
        sales: 0,
      },
      {
        label: "120 × 50 cm",
        price: 155,
        sales: 1,
      },
      {
        label: "KIT 2 peças: 2 (100 × 50 cm)",
        price: (125 + 125) * DISCOUNT,
        noDiscount: 125 + 125,
      },
      {
        label: "KIT 3 peças: 2 (70 × 50 cm) e 1 (120 × 50 cm)",
        price: (60 + 60 + 155) * DISCOUNT,
        noDiscount: 60 + 60 + 155,
      },
    ],

    colors: ["cru-vermelho"],

    images: {
      "cru-vermelho": [
        {
          url: "/products/rugs/tapete-home/cru-vermelho.webp",
          alt: "185 × 65 cm",
        },
        {
          url: "/products/rugs/tapete-home/cru-vermelho-2.webp",
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
      },
      {
        label: "100 × 50 cm",
        price: 125,
        sales: 2,
      },
      {
        label: "120 × 50 cm",
        price: 155,
        sales: 0,
      },
      {
        label: "KIT 2 peças: 2 (100 × 50 cm)",
        price: (125 + 125) * DISCOUNT,
        noDiscount: 125 + 125,
      },
      {
        label: "KIT 3 peças: 2 (70 × 50 cm) e 1 (120 × 50 cm)",
        price: (60 + 60 + 155) * DISCOUNT,
        noDiscount: 60 + 60 + 155,
      },
    ],

    colors: ["bordo-verde militar"],

    images: {
      "bordo-verde militar": [
        {
          url: "/products/rugs/tapete-harmonia/bordo-verde militar.webp",
          alt: "85 × 50 cm",
        },
        {
          url: "/products/rugs/tapete-harmonia/bordo-verde militar-2.webp",
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
      },
      {
        label: "100 × 50 cm",
        price: 140,
        sales: 0,
      },
      {
        label: "120 × 50 cm",
        price: 170,
        sales: 1,
      },
      {
        label: "KIT 2 peças: 2 (100 × 50 cm)",
        price: (140 + 140) * DISCOUNT,
        noDiscount: 140 + 140,
      },
      {
        label: "KIT 3 peças: 2 (70 × 50 cm) e 1 (120 × 50 cm)",
        price: (75 + 75 + 170) * DISCOUNT,
        noDiscount: 75 + 75 + 170,
      },
    ],

    colors: ["cru-cinza-bege"],

    images: {
      "cru-cinza-bege": [
        {
          url: "/products/rugs/tapete-hexagonos/cru-cinza-bege.webp",
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
      },
      {
        label: "150 cm",
        price: 370,
        sales: 0,
      },
    ],

    colors: ["alecrim-verde militar"],

    images: {
      "alecrim-verde militar": [
        {
          url: "/products/rugs/tapete-maravilha/alecrim-verde militar.webp",
          alt: "105 cm",
        },
        {
          url: "/products/rugs/tapete-maravilha/alecrim-verde militar-2.webp",
          alt: "105 cm",
        },
      ],
    },
  },
];

export default rugs;
