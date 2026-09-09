const discount = 0.9;

const tapetes = [
    {
        name: "Tapete Sara",
        category: "Tapetes",
        sizes: [
            {
                label: "65x45cm",
                price: 35,
                sales: 0,
            },
            {
                label: "100x45cm",
                price: 110,
                sales: 0,
            },
            {
                label: "120x45cm",
                price: 130,
                sales: 0,
            },
            {
                label: "2 (100x45cm)",
                price: (110 + 110) * discount,
                no_discount: (110 + 110),
            },
            {
                label: "2 (65x45cm) e 1 (120x45cm)",
                price: (35 + 35 + 130) * discount,
                no_discount: (35 + 35 + 130),
            },
        ],
        colors: ["militar"],
    },
    {
        name: "Tapete Cléo",
        category: "Tapetes",
        sizes: [
            {
                label: "65x45cm",
                price: 35,
                sales: 0,
            },
            {
                label: "100x45cm",
                price: 110,
                sales: 0,
            },
            {
                label: "120x45cm",
                price: 130,
                sales: 0,
            },
            {
                label: "2 (100x45cm)",
                price: (110 + 110) * discount,
                no_discount: (110 + 110),
            },
            {
                label: "2 (65x45cm) e 1 (120x45cm)",
                price: (35 + 35 + 130) * discount,
                no_discount: (35 + 35 + 130),
            },
        ],
        colors: ["malva"],
    },
    {
        name: "Tapete Cris",
        category: "Tapetes",
        sizes: [
            {
                label: "65x45cm",
                price: 40,
                sales: 0,
            },
            {
                label: "100x45cm",
                price: 115,
                sales: 0,
            },
            {
                label: "120x45cm",
                price: 135,
                sales: 0,
            },
            {
                label: "2 (100x45cm)",
                price: (115 + 115) * discount,
                no_discount: (115 + 115),
            },
            {
                label: "2 (65x45cm) e 1 (120x45cm)",
                price: (40 + 40 + 140) * discount,
                no_discount: (40 + 40 + 140),
            },
        ],
        colors: ["bordo"],
    },
    // {
    //     name: "Tapete Nina",
    //     category: "Tapetes",
    //     sizes: [
    //         {
    //             label: "65x45cm",
    //             price: 40,
    //             sales: 0,
    //         },
    //         {
    //             label: "100x45cm",
    //             price: 115,
    //             sales: 0,
    //         },
    //         {
    //             label: "120x45cm",
    //             price: 135,
    //             sales: 0,
    //         },
    //         {
    //             label: "2 (100x45cm)",
    //             price: (115 + 115) * discount,
    //             no_discount: (115 + 115),
    //         },
    //         {
    //             label: "2 (65x45cm) e 1 (120x45cm)",
    //             price: (40 + 40 + 140) * discount,
    //             no_discount: (40 + 40 + 140),
    //         },
    //     ],
    //     colors: ["vermelho"],
    // },
    {
        name: "Tapete Janine",
        category: "Tapetes",
        sizes: [
            {
                label: "70x50cm",
                price: 55,
                sales: 6,
            },
            {
                label: "100x50cm",
                price: 120,
                sales: 5,
            },
            {
                label: "120x50cm",
                price: 155,
                sales: 1,
            },
            {
                label: "2 (100x50cm)",
                price: (120 + 120) * discount,
                no_discount: (120 + 120),
            },
            {
                label: "2 (70x50cm) e 1 (120x50cm)",
                price: (55 + 55 + 155) * discount,
                no_discount: (55 + 55 + 155),
            },
        ],
        colors: ["alecrim-militar", "cru-marrom-bege", "limao-cru", "cru-militar-alecrim", "bege-alecrim-cru"],
    },
    {
        name: "Tapete Gisele",
        category: "Tapetes",
        sizes: [
            {
                label: "70x50cm",
                price: 65,
                sales: 0,
            },
            {
                label: "100x50cm",
                price: 135,
                sales: 0,
            },
            {
                label: "120x50cm",
                price: 165,
                sales: 1,
            },
            {
                label: "2 (100x50cm)",
                price: (135 + 135) * discount,
                no_discount: (135 + 135),
            },
            {
                label: "2 (70x50cm) e 1 (120x50cm)",
                price: (65 + 65 + 165) * discount,
                no_discount: (65 + 65 + 165),
            },
        ],
        colors: ["telha-limao-vermelho-preto"],
    },
    {
        name: "Tapete Home",
        category: "Tapetes",
        sizes: [
            {
                label: "70x50cm",
                price: 65,
                sales: 0,
            },
            {
                label: "100x50cm",
                price: 135,
                sales: 0,
            },
            {
                label: "120x50cm",
                price: 165,
                sales: 1,
            },
            {
                label: "2 (100x50cm)",
                price: (135 + 135) * discount,
                no_discount: (135 + 135),
            },
            {
                label: "2 (70x50cm) e 1 (120x50cm)",
                price: (65 + 65 + 165) * discount,
                no_discount: (65 + 65 + 165),
            },
        ],
        colors: ["cru-vermelho"],
    },
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
                label: "100x50cm",
                price: 135,
                sales: 0,
            },
            {
                label: "120x50cm",
                price: 165,
                sales: 0,
            },
            {
                label: "2 (100x50cm)",
                price: (135 + 135) * discount,
                no_discount: (135 + 135),
            },
            {
                label: "2 (70x50cm) e 1 (120x50cm)",
                price: (65 + 65 + 165) * discount,
                no_discount: (65 + 65 + 165),
            },
        ],
        colors: ["bordo-militar"],
    },
    {
        name: "Tapete Hexágonos",
        category: "Tapetes",
        sizes: [
            {
                label: "70x50cm",
                price: 80,
                sales: 0,
            },
            {
                label: "100x50cm",
                price: 145,
                sales: 0,
            },
            {
                label: "120x50cm",
                price: 175,
                sales: 1,
            },
            {
                label: "2 (100x50cm)",
                price: (145 + 145) * discount,
                no_discount: (145 + 145),
            },
            {
                label: "2 (70x50cm) e 1 (120x50cm)",
                price: (80 + 80 + 175) * discount,
                no_discount: (80 + 80 + 175),
            },
        ],
        colors: ["cru-cinza-bege"],
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
]
export default tapetes;