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
        price: 110,
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
        price: 180 * discount,
        no_discount: 180,
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
        price: 50,
        sales: 0,
      },
      {
        label: "120x50cm",
        price: 130,
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
        label: "2 (70x50cm) e 1 (100x50cm)",
        price: 230 * discount,
        no_discount: 230,
        sales: 1,
      },
    ],
    colors: ["alecrim-militar", "cru-militar-alecrim", "cru-marrom-bege"],
  },
  {
    name: "Tapete Harmonia",
    category: "Tapetes",
    sizes: [
      {
        label: "70x50cm",
        price: 60,
        sales: 0,
      },
      {
        label: "120x50cm",
        price: 140,
        sales: 2,
      },
    ],
    colors: ["cru-bege"],
  },
  {
    name: "Jogo Passadeira Harmonia",
    category: "Jogos",
    sizes: [
      {
        label: "2 (70x50cm) e 1 (120x50cm)",
        price: 260 * discount,
        no_discount: 260,
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
        price: 35,
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
        price: 130,
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
        label: "4 (40cm)",
        price: 140 * discount,
        no_discount: 140,
        sales: 0,
      },
      {
        label: "6 (40cm)",
        price: 210 * discount,
        no_discount: 210,
        sales: 0,
      },
      {
        label: "8 (40cm)",
        price: 280 * discount,
        no_discount: 280,
        sales: 0,
      },
      {
        label: "6 (40cm) e 1 (120x40cm)",
        price: 340 * discount,
        no_discount: 340,
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
        price: 45,
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
        price: 170,
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
        label: "4 (40cm)",
        price: 180 * discount,
        no_discount: 180,
        sales: 0,
      },
      {
        label: "6 (40cm)",
        price: 270 * discount,
        no_discount: 270,
        sales: 0,
      },
      {
        label: "8 (40cm)",
        price: 360 * discount,
        no_discount: 360,
        sales: 0,
      },
      {
        label: "6 (40cm) e 1 (100x40cm)",
        price: 440 * discount,
        no_discount: 440,
        sales: 0,
      },
    ],
    colors: ["cru"],
  },
];
export default { products, discount };
