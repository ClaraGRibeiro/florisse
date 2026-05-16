const discount = 0.90;

const products = [
  {
    name: "Tapete Retangular",
    category: "Tapetes",
    sizes: [
      {
        label: "70x50cm",
        price: 60,
        sales: 0,
      },
      {
        label: "100x50cm",
        price: 100,
        sales: 2,
      },
      {
        label: "120x50cm",
        price: 140,
        sales: 0,
      },
      {
        label: "160x50cm",
        price: 170,
        sales: 0,
      },
    ],
    colors: ["cru-bege"],
  },
  {
    name: "Jogo Cozinha Retangular",
    category: "Jogos",
    sizes: [
      {
        label: "2 (70x50cm) e 1 (120x50cm)",
        price: 260 * discount,
        no_discount: 260,
        sales: 1,
      },
      {
        label: "2 (100x50cm) e 1 (160x50cm)",
        price: 370 * discount,
        no_discount: 370,
        sales: 0,
      },
    ],
    colors: ["cru-bege"],
  },
  {
    name: "Tapete Oval",
    category: "Tapetes",
    sizes: [
      {
        label: "70x50cm",
        price: 50,
        sales: 0,
      },
      {
        label: "100x50cm",
        price: 90,
        sales: 0,
      },
      {
        label: "120x50cm",
        price: 130,
        sales: 0,
      },
      {
        label: "160x50cm",
        price: 160,
        sales: 0,
      },
    ],
    colors: ["alecrim-militar", "cru-militar-alecrim", "cru-marrom-bege"],
  },
  {
    name: "Jogo Cozinha Oval",
    category: "Jogos",
    sizes: [
      {
        label: "2 (70x50cm) e 1 (120x50cm)",
        price: 230 * discount,
        no_discount: 230,
        sales: 1,
      },
      {
        label: "2 (100x50cm) e 1 (160x50cm)",
        price: 340 * discount,
        no_discount: 340,
        sales: 1,
      },
    ],
    colors: ["alecrim-militar", "cru-militar-alecrim", "cru-marrom-bege"],
  },
  {
    name: "Tapete Redondo Maravilha",
    category: "Tapetes",
    sizes: [
      {
        label: "100cm",
        price: 250,
        sales: 0,
      },
      {
        label: "150cm",
        price: 370,
        sales: 0,
      },
    ],
    colors: ["alecrim-militar", "cru"],
  },
  {
    name: "Tapete Redondo Ternura",
    category: "Tapetes",
    sizes: [
      {
        label: "100cm",
        price: 300,
        sales: 0,
      },
      {
        label: "150cm",
        price: 420,
        sales: 0,
      },
    ],
    colors: ["alecrim-militar", "cru"],
  },
  {
    name: "Sousplat Minimalist",
    category: "Mesa Posta",
    sizes: [
      {
        label: "35cm",
        price: 35,
        sales: 0,
      },
      {
        label: "45cm",
        price: 45,
        sales: 0,
      },
    ],
    colors: ["militar"],
  },
  {
    name: "Trilho de Mesa Minimalist",
    category: "Mesa Posta",
    sizes: [
      {
        label: "140x40cm",
        price: 150,
        sales: 0,
      },
      {
        label: "180x40cm",
        price: 190,
        sales: 0,
      },
    ],
    colors: ["militar"],
  },
  {
    name: "Jogo Mesa Minimalist",
    category: "Jogos",
    sizes: [
      {
        label: "4 (35cm)",
        price: 140 * discount,
        no_discount: 140,
        sales: 0,
      },
      {
        label: "6 (35cm)",
        price: 210 * discount,
        no_discount: 210,
        sales: 0,
      },
      {
        label: "8 (35cm)",
        price: 280 * discount,
        no_discount: 280,
        sales: 0,
      },
      {
        label: "6 (35cm) e 1 (140x40cm)",
        price: 360 * discount,
        no_discount: 360,
        sales: 0,
      },
      {
        label: "4 (45cm)",
        price: 180 * discount,
        no_discount: 180,
        sales: 0,
      },
      {
        label: "6 (45cm)",
        price: 270 * discount,
        no_discount: 270,
        sales: 0,
      },
      {
        label: "8 (45cm)",
        price: 360 * discount,
        no_discount: 360,
        sales: 0,
      },
      {
        label: "6 (45cm) e 1 (180x40cm)",
        price: 460 * discount,
        no_discount: 460,
        sales: 0,
      },
    ],
    colors: ["militar"],
  },
  {
    name: "Sousplat Royalty",
    category: "Mesa Posta",
    sizes: [
      {
        label: "35cm",
        price: 40,
        sales: 0,
      },
      {
        label: "45cm",
        price: 50,
        sales: 0,
      },
    ],
    colors: ["cru"],
  },
  {
    name: "Trilho de Mesa Royalty",
    category: "Mesa Posta",
    sizes: [
      {
        label: "140x40cm",
        price: 170,
        sales: 0,
      },
      {
        label: "180x40cm",
        price: 210,
        sales: 0,
      },
    ],
    colors: ["cru"],
  },
  {
    name: "Jogo Mesa Royalty",
    category: "Jogos",
    sizes: [
      {
        label: "4 (35cm)",
        price: 160 * discount,
        no_discount: 160,
        sales: 0,
      },
      {
        label: "6 (35cm)",
        price: 240 * discount,
        no_discount: 240,
        sales: 0,
      },
      {
        label: "8 (35cm)",
        price: 320 * discount,
        no_discount: 320,
        sales: 0,
      },
      {
        label: "6 (35cm) e 1 (140x40cm)",
        price: 410 * discount,
        no_discount: 410,
        sales: 0,
      },
      {
        label: "4 (45cm)",
        price: 200 * discount,
        no_discount: 200,
        sales: 0,
      },
      {
        label: "6 (45cm)",
        price: 300 * discount,
        no_discount: 300,
        sales: 0,
      },
      {
        label: "8 (45cm)",
        price: 400 * discount,
        no_discount: 400,
        sales: 0,
      },
      {
        label: "6 (45cm) e 1 (180x40cm)",
        price: 510 * discount,
        no_discount: 510,
        sales: 0,
      },
    ],
    colors: ["cru"],
  },
];
export default {products, discount}
