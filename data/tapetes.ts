const discount = 0.9;

const tapetes = [
    {
        name: "Tapete Sara",
        category: "Tapetes",
        sizes: [
            {
                label: "65x45cm",
                price: 30,
                sales: 0,
            },
            {
                label: "100x45cm",
                price: 100,
                sales: 0,
            },
            {
                label: "120x45cm",
                price: 120,
                sales: 0,
            },
            {
                label: "2 (100x45cm)",
                price: (100 + 100) * discount,
                no_discount: (100 + 100),
            },
            {
                label: "2 (65x45cm) e 1 (120x45cm)",
                price: (30 + 30 + 120) * discount,
                no_discount: (30 + 30 + 120),
            },
        ],
        colors: ["militar"],
    },
    {
        name: "Tapete Cleo",
        category: "Tapetes",
        sizes: [
            {
                label: "65x45cm",
                price: 30,
                sales: 0,
            },
            {
                label: "100x45cm",
                price: 100,
                sales: 0,
            },
            {
                label: "120x45cm",
                price: 120,
                sales: 0,
            },
            {
                label: "2 (100x45cm)",
                price: (100 + 100) * discount,
                no_discount: (100 + 100),
            },
            {
                label: "2 (65x45cm) e 1 (120x45cm)",
                price: (30 + 30 + 120) * discount,
                no_discount: (30 + 30 + 120),
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
        colors: ["bordo"],
    },
    {
        name: "Tapete Nina",
        category: "Tapetes",
        sizes: [
            {
                label: "65x45cm",
                price: 35,
                sales: 1,
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
        colors: ["vermelho"],
    },
    {
        name: "Tapete Janine",
        category: "Tapetes",
        sizes: [
            {
                label: "70x50cm",
                price: 50,
                sales: 6,
            },
            {
                label: "100x50cm",
                price: 115,
                sales: 5,
            },
            {
                label: "120x50cm",
                price: 145,
                sales: 1,
            },
            {
                label: "2 (100x50cm)",
                price: (115 + 115) * discount,
                no_discount: (115 + 115),
            },
            {
                label: "2 (70x50cm) e 1 (120x50cm)",
                price: (50 + 50 + 145) * discount,
                no_discount: (50 + 50 + 145),
            },
        ],
        colors: ["alecrim-militar", "cru-marrom-bege", "limao-cru", "cru-militar-alecrim", "bege-alecrim-cru"],
    },
    {
        name: "Tapete Aline",
        category: "Tapetes",
        sizes: [
            {
                label: "70x50cm",
                price: 60,
                sales: 0,
            },
            {
                label: "100x50cm",
                price: 125,
                sales: 0,
            },
            {
                label: "120x50cm",
                price: 155,
                sales: 0,
            },
            {
                label: "2 (100x50cm)",
                price: (125 + 125) * discount,
                no_discount: (125 + 125),
            },
            {
                label: "2 (70x50cm) e 1 (120x50cm)",
                price: (60 + 60 + 155) * discount,
                no_discount: (60 + 60 + 155),
            },
        ],
        colors: ["telha-bege"],
    },
    {
        name: "Tapete Gisele",
        category: "Tapetes",
        sizes: [
            {
                label: "70x50cm",
                price: 60,
                sales: 0,
            },
            {
                label: "100x50cm",
                price: 125,
                sales: 0,
            },
            {
                label: "120x50cm",
                price: 155,
                sales: 1,
            },
            {
                label: "2 (100x50cm)",
                price: (125 + 125) * discount,
                no_discount: (125 + 125),
            },
            {
                label: "2 (70x50cm) e 1 (120x50cm)",
                price: (60 + 60 + 155) * discount,
                no_discount: (60 + 60 + 155),
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
                price: 60,
                sales: 0,
            },
            {
                label: "100x50cm",
                price: 125,
                sales: 0,
            },
            {
                label: "120x50cm",
                price: 155,
                sales: 1,
            },
            {
                label: "2 (100x50cm)",
                price: (125 + 125) * discount,
                no_discount: (125 + 125),
            },
            {
                label: "2 (70x50cm) e 1 (120x50cm)",
                price: (60 + 60 + 155) * discount,
                no_discount: (60 + 60 + 155),
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
                price: 60,
                sales: 0,
            },
            {
                label: "100x50cm",
                price: 125,
                sales: 2,
            },
            {
                label: "120x50cm",
                price: 155,
                sales: 0,
            },
            {
                label: "2 (100x50cm)",
                price: (125 + 125) * discount,
                no_discount: (125 + 125),
            },
            {
                label: "2 (70x50cm) e 1 (120x50cm)",
                price: (60 + 60 + 155) * discount,
                no_discount: (60 + 60 + 155),
            },
        ],
        colors: ["bordo-militar"],
    },
    {
        name: "Tapete Hexagonos",
        category: "Tapetes",
        sizes: [
            {
                label: "70x50cm",
                price: 75,
                sales: 0,
            },
            {
                label: "100x50cm",
                price: 140,
                sales: 0,
            },
            {
                label: "120x50cm",
                price: 170,
                sales: 1,
            },
            {
                label: "2 (100x50cm)",
                price: (140 + 140) * discount,
                no_discount: (140 + 140),
            },
            {
                label: "2 (70x50cm) e 1 (120x50cm)",
                price: (75 + 75 + 170) * discount,
                no_discount: (75 + 75 + 170),
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