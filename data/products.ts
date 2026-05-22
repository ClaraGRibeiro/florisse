const discount = 0.9;

const products = [
  {
    name: "Tapete Sara",
    category: "Tapetes",
    sizes: [
      {
        label: "70x50cm",
        price: 35,
        sales: 0,
      },
      {
        label: "120x50cm",
        price: 100,
        sales: 0,
      },
    ],
    colors: ["bordo"],
  },
  {
    name: "Jogo Passadeira Sara",
    category: "Jogos",
    sizes: [
      {
        label: "2 (70x50cm) e 1 (120x50cm)",
        price: 170 * discount,
        no_discount: 170,
        sales: 1,
      },
    ],
    colors: ["bege"],
  },
  {
    name: "Tapete Janine",
    category: "Tapetes",
    sizes: [
      {
        label: "70x50cm",
        price: 45,
        sales: 0,
      },
      {
        label: "120x50cm",
        price: 125,
        sales: 0,
      },
    ],
    colors: ["alecrim-militar", "cru-militar-alecrim", "cru-marrom-bege"],
  },
  {
    name: "Jogo Passadeira Janine",
    category: "Jogos",
    sizes: [
      {
        label: "2 (70x50cm) e 1 (120x50cm)",
        price: 215 * discount,
        no_discount: 215,
        sales: 1,
      },
    ],
    colors: ["alecrim-militar", "cru-militar-alecrim", "cru-marrom-bege"],
  },
  {
    name: "Tapete Gisele",
    category: "Tapetes",
    sizes: [
      {
        label: "70x50cm",
        price: 50,
        sales: 0,
      },
      {
        label: "120x50cm",
        price: 130,
        sales: 2,
      },
    ],
    colors: ["cru-bege"],
  },
  {
    name: "Jogo Passadeira Gisele",
    category: "Jogos",
    sizes: [
      {
        label: "2 (70x50cm) e 1 (120x50cm)",
        price: 230 * discount,
        no_discount: 230,
        sales: 1,
      },
    ],
    colors: ["cru-bege"],
  },

  {
    name: "Tapete Maravilha",
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
    colors: ["alecrim-militar"],
  },
  {
    name: "Tapete Ternura",
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
    colors: ["cru"],
  },
  {
    name: "Sousplat Tradicional",
    category: "Mesa Posta",
    sizes: [
      {
        label: "40cm",
        price: 30,
        sales: 0,
      },
    ],
    colors: ["militar"],
  },
  {
    name: "Trilho de Mesa Tradicional",
    category: "Mesa Posta",
    sizes: [
      {
        label: "120x40cm",
        price: 120,
        sales: 0,
      },
    ],
    colors: ["militar"],
  },
  {
    name: "Jogo Mesa Tradicional",
    category: "Jogos",
    sizes: [
      {
        label: "6 (40cm) e 1 (120x40cm)",
        price: 300 * discount,
        no_discount: 300,
        sales: 0,
      },
      {
        label: "4 (40cm)",
        price: 120 * discount,
        no_discount: 120,
        sales: 0,
      },
      {
        label: "6 (40cm)",
        price: 180 * discount,
        no_discount: 180,
        sales: 0,
      },
      {
        label: "8 (40cm)",
        price: 240 * discount,
        no_discount: 240,
        sales: 0,
      },

    ],
    colors: ["militar", "bege"],
  },
  {
    name: "Sousplat Luxo",
    category: "Mesa Posta",
    sizes: [
      {
        label: "40cm",
        price: 40,
        sales: 0,
      },
    ],
    colors: ["cru"],
  },
  {
    name: "Trilho de Mesa Luxo",
    category: "Mesa Posta",
    sizes: [
      {
        label: "120x40cm",
        price: 150,
        sales: 0,
      },
    ],
    colors: ["cru"],
  },
  {
    name: "Jogo Mesa Luxo",
    category: "Jogos",
    sizes: [
      {
        label: "6 (40cm) e 1 (100x40cm)",
        price: 390 * discount,
        no_discount: 390,
        sales: 0,
      },
      {
        label: "4 (40cm)",
        price: 160 * discount,
        no_discount: 160,
        sales: 0,
      },
      {
        label: "6 (40cm)",
        price: 240 * discount,
        no_discount: 240,
        sales: 0,
      },
      {
        label: "8 (40cm)",
        price: 320 * discount,
        no_discount: 320,
        sales: 0,
      },

    ],
    colors: ["cru"],
  },
];
export default { products, discount };
