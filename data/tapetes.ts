import { DISCOUNT } from "./config";

const tapetes = [
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
        label: "2 (100 × 45 cm)",
        price: (100 + 100) * DISCOUNT,
        no_discount: 100 + 100,
      },
      {
        label: "2 (65 × 45 cm) e 1 (120 × 45 cm)",
        price: (30 + 30 + 120) * DISCOUNT,
        no_discount: 30 + 30 + 120,
      },
    ],

    colors: ["verde militar"],

    images: {
      "verde militar": [
        "/products/tapetes/tapete-sara/verde militar.webp",
        "/products/tapetes/tapete-sara/verde militar-2.webp",
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
        label: "2 (100 × 45 cm)",
        price: (100 + 100) * DISCOUNT,
        no_discount: 100 + 100,
      },
      {
        label: "2 (65 × 45 cm) e 1 (120 × 45 cm)",
        price: (30 + 30 + 120) * DISCOUNT,
        no_discount: 30 + 30 + 120,
      },
    ],

    colors: ["malva"],

    images: {
      malva: [
        "/products/tapetes/tapete-cleo/malva.webp",
        "/products/tapetes/tapete-cleo/malva-2.webp",
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
        label: "2 (100 × 45 cm)",
        price: (110 + 110) * DISCOUNT,
        no_discount: 110 + 110,
      },
      {
        label: "2 (65 × 45 cm) e 1 (120 × 45 cm)",
        price: (35 + 35 + 130) * DISCOUNT,
        no_discount: 35 + 35 + 130,
      },
    ],

    colors: ["bordo"],

    images: {
      bordo: [
        "/products/tapetes/tapete-cris/bordo.webp",
        "/products/tapetes/tapete-cris/bordo-2.webp",
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
        label: "2 (100 × 45 cm)",
        price: (110 + 110) * DISCOUNT,
        no_discount: 110 + 110,
      },
      {
        label: "2 (65 × 45 cm) e 1 (120 × 45 cm)",
        price: (35 + 35 + 130) * DISCOUNT,
        no_discount: 35 + 35 + 130,
      },
    ],

    colors: ["vermelho"],

    images: {
      vermelho: [
        "/products/tapetes/tapete-nina/vermelho.webp",
        "/products/tapetes/tapete-nina/vermelho-2.webp",
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
        label: "2 (100 × 50 cm)",
        price: (115 + 115) * DISCOUNT,
        no_discount: 115 + 115,
      },
      {
        label: "2 (70 × 50 cm) e 1 (120 × 50 cm)",
        price: (50 + 50 + 145) * DISCOUNT,
        no_discount: 50 + 50 + 145,
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
        "/products/tapetes/tapete-janine/alecrim-verde militar.webp",
        "/products/tapetes/tapete-janine/alecrim-verde militar-2.webp",
      ],

      "cru-marrom-bege": [
        "/products/tapetes/tapete-janine/cru-marrom-bege.webp",
        "/products/tapetes/tapete-janine/cru-marrom-bege-2.webp",
        "/products/tapetes/tapete-janine/cru-marrom-bege-3.webp",
      ],

      "verde limao-cru": [
        "/products/tapetes/tapete-janine/verde limao-cru.webp",
        "/products/tapetes/tapete-janine/verde limao-cru-2.webp",
      ],

      "cru-verde militar-alecrim": [
        "/products/tapetes/tapete-janine/cru-verde militar-alecrim.webp",
        "/products/tapetes/tapete-janine/cru-verde militar-alecrim-2.webp",
      ],

      "bege-alecrim-cru": [
        "/products/tapetes/tapete-janine/bege-alecrim-cru.webp",
        "/products/tapetes/tapete-janine/bege-alecrim-cru-2.webp",
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
        label: "2 (100 × 50 cm)",
        price: (125 + 125) * DISCOUNT,
        no_discount: 125 + 125,
      },
      {
        label: "2 (70 × 50 cm) e 1 (120 × 50 cm)",
        price: (60 + 60 + 155) * DISCOUNT,
        no_discount: 60 + 60 + 155,
      },
    ],

    colors: ["telha-bege"],

    images: {
      "telha-bege": [
        "/products/tapetes/tapete-aline/telha-bege.webp",
        "/products/tapetes/tapete-aline/telha-bege-2.webp",
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
        label: "2 (100 × 50 cm)",
        price: (125 + 125) * DISCOUNT,
        no_discount: 125 + 125,
      },
      {
        label: "2 (70 × 50 cm) e 1 (120 × 50 cm)",
        price: (60 + 60 + 155) * DISCOUNT,
        no_discount: 60 + 60 + 155,
      },
    ],

    colors: ["telha-verde limao-vermelho-preto"],

    images: {
      "telha-verde limao-vermelho-preto": [
        "/products/tapetes/tapete-gisele/telha-verde limao-vermelho-preto.webp",
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
        label: "2 (100 × 50 cm)",
        price: (125 + 125) * DISCOUNT,
        no_discount: 125 + 125,
      },
      {
        label: "2 (70 × 50 cm) e 1 (120 × 50 cm)",
        price: (60 + 60 + 155) * DISCOUNT,
        no_discount: 60 + 60 + 155,
      },
    ],

    colors: ["cru-vermelho"],

    images: {
      "cru-vermelho": [
        "/products/tapetes/tapete-home/cru-vermelho.webp",
        "/products/tapetes/tapete-home/cru-vermelho-2.webp",
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
        label: "2 (100 × 50 cm)",
        price: (125 + 125) * DISCOUNT,
        no_discount: 125 + 125,
      },
      {
        label: "2 (70 × 50 cm) e 1 (120 × 50 cm)",
        price: (60 + 60 + 155) * DISCOUNT,
        no_discount: 60 + 60 + 155,
      },
    ],

    colors: ["bordo-verde militar"],

    images: {
      "bordo-verde militar": [
        "/products/tapetes/tapete-harmonia/bordo-verde militar.webp",
        "/products/tapetes/tapete-harmonia/bordo-verde militar-2.webp",
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
        label: "2 (100 × 50 cm)",
        price: (140 + 140) * DISCOUNT,
        no_discount: 140 + 140,
      },
      {
        label: "2 (70 × 50 cm) e 1 (120 × 50 cm)",
        price: (75 + 75 + 170) * DISCOUNT,
        no_discount: 75 + 75 + 170,
      },
    ],

    colors: ["cru-cinza-bege"],

    images: {
      "cru-cinza-bege": [
        "/products/tapetes/tapete-hexagonos/cru-cinza-bege.webp",
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
        "/products/tapetes/tapete-maravilha/alecrim-verde militar.webp",
        "/products/tapetes/tapete-maravilha/alecrim-verde militar-2.webp",
      ],
    },
  },

];

export default tapetes;
