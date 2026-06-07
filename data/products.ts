const discount = 0.9;

const products = [
  // {
  //   name: "Tapete Sara",
  //   category: "Tapetes",
  //   sizes: [
  //     {
  //       label: "70x50cm",
  //       price: 35,
  //       sales: 0,
  //     },
  //     {
  //       label: "120x50cm",
  //       price: 100,
  //       sales: 0,
  //     },
  //   ],
  //   colors: ["bordo"],
  // },
  // {
  //   name: "Jogo Passadeira Sara",
  //   category: "Jogos",
  //   sizes: [
  //     {
  //       label: "2 (70x50cm) e 1 (120x50cm)",
  //       price: 170 * discount,
  //       no_discount: 170,
  //     },
  //   ],
  //   colors: ["bege"],
  // },
  {
    name: "Tapete Janine",
    category: "Tapetes",
    sizes: [
      {
        label: "70x50cm",
        price: 55,
        sales: 7,
      },
      {
        label: "100x50cm",
        price: 100,
        sales: 2,
      },
      {
        label: "120x50cm",
        price: 150,
        sales: 1,
      },
    ],
    colors: ["cru-marrom-bege", "cru-militar-alecrim", "bege-alecrim-cru", "alecrim-militar"],
  },
  // {
  //   name: "Tapete Gisele",
  //   category: "Tapetes",
  //   sizes: [
  //     {
  //       label: "70x50cm",
  //       price: 60,
  //       sales: 4,
  //     },
  //     {
  //       label: "120x50cm",
  //       price: 140,
  //       sales: 2,
  //     },
  //   ],
  //   colors: ["cru-bege"],
  // },
  // {
  //   name: "Jogo Passadeira Gisele",
  //   category: "Jogos",
  //   sizes: [
  //     {
  //       label: "2 (70x50cm) e 1 (120x50cm)",
  //       price: 240 * discount,
  //       no_discount: 240,
  //     },
  //   ],
  //   colors: ["cru-bege"],
  // },
  {
    name: "Tapete Harmonia",
    category: "Tapetes",
    sizes: [
      {
        label: "70x50cm",
        price: 65,
        sales: 2,
      },
      {
        label: "120x50cm",
        price: 150,
        sales: 0,
      },
    ],
    colors: ["bordo-militar"],
  },
  {
    name: "Tapete Maravilha",
    category: "Tapetes",
    sizes: [
      {
        label: "100cm",
        price: 250,
        sales: 1,
      },
      {
        label: "150cm",
        price: 370,
        sales: 0,
      },
    ],
    colors: ["alecrim-militar"],
  },
  // {
  //   name: "Tapete Ternura",
  //   category: "Tapetes",
  //   sizes: [
  //     {
  //       label: "100cm",
  //       price: 300,
  //       sales: 0,
  //     },
  //     {
  //       label: "150cm",
  //       price: 420,
  //       sales: 0,
  //     },
  //   ],
  //   colors: ["cru"],
  // },
  {
    name: "Sousplat Tradicional",
    category: "Mesa Posta",
    sizes: [
      {
        label: "37cm",
        price: 30,
        sales: 6,
      },
      {
        label: "27cm",
        price: 20,
        sales: 2,
      },
    ],
    colors: ["malva", "marrom"],
  },
  // {
  //   name: "Trilho de Mesa Franja",
  //   category: "Mesa Posta",
  //   sizes: [
  //     {
  //       label: "120x37cm",
  //       price: 140,
  //       sales: 1,
  //     },
  //   ],
  //   colors: ["marrom"],
  // },
  {
    name: "Trilho de Mesa Floral",
    category: "Mesa Posta",
    sizes: [
      {
        label: "110x40cm",
        price: 100,
        sales: 1,
      },
    ],
    colors: ["cru-bege"],
  },
  // {
  //   name: "Sousplat Luxo",
  //   category: "Mesa Posta",
  //   sizes: [
  //     {
  //       label: "37cm",
  //       price: 40,
  //       sales: 0,
  //     },
  //   ],
  //   colors: ["cru"],
  // },
  // {
  //   name: "Trilho de Mesa Luxo",
  //   category: "Mesa Posta",
  //   sizes: [
  //     {
  //       label: "120x37cm",
  //       price: 160,
  //       sales: 0,
  //     },
  //   ],
  //   colors: ["cru"],
  // },
  {
    name: "Bolsa Redinha",
    category: "Bolsas",
    sizes: [
      {
        label: "30x30x10cm",
        price: 60,
        sales: 0,
      },
    ],
    colors: ["militar"],
  },
  // {
  //   name: "Jogo Mesa Luxo",
  //   category: "Jogos",
  //   sizes: [
  //     {
  //       label: "6 (37cm) e 1 (100x37cm)",
  //       price: 390 * discount,
  //       no_discount: 390,
  //     },
  //     {
  //       label: "4 (37cm)",
  //       price: 160 * discount,
  //       no_discount: 160,
  //     },
  //     {
  //       label: "6 (37cm)",
  //       price: 240 * discount,
  //       no_discount: 240,
  //     },
  //     {
  //       label: "8 (37cm)",
  //       price: 330 * discount,
  //       no_discount: 330,
  //     },

  //   ],
  //   colors: ["cru"],
  // },
  {
    name: "Jogo Passadeira Janine",
    category: "Jogos",
    sizes: [
      {
        label: "2 (70x50cm) e 1 (120x50cm)",
        price: 240 * discount,
        no_discount: 240,
      },
    ],
    colors: ["cru-marrom-bege", "cru-militar-alecrim", "bege-alecrim-cru", "alecrim-militar"],
  },
  {
    name: "Jogo Passadeira Harmonia",
    category: "Jogos",
    sizes: [
      {
        label: "2 (70x50cm) e 1 (120x50cm)",
        price: 275 * discount,
        no_discount: 275,
      },
    ],
    colors: ["bordo-militar"],
  },
  {
    name: "Jogo Mesa Tradicional",
    category: "Jogos",
    sizes: [
      // {
      //   label: "6 (37cm) e 1 (120x37cm)",
      //   price: 310 * discount,
      //   no_discount: 310,
      // },
      {
        label: "4 (37cm)",
        price: 120 * discount,
        no_discount: 120,
      },
      {
        label: "6 (37cm)",
        price: 180 * discount,
        no_discount: 180,
      },
      {
        label: "8 (37cm)",
        price: 240 * discount,
        no_discount: 240,
      },
      {
        label: "4 (27cm)",
        price: 80 * discount,
        no_discount: 80,
      },
      {
        label: "6 (27cm)",
        price: 120 * discount,
        no_discount: 120,
      },
      {
        label: "8 (27cm)",
        price: 160 * discount,
        no_discount: 160,
      },

    ],
    colors: ["malva", "marrom"],
  },
];
export default { products, discount };
