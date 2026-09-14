const discount = 0.9;

const tapetes = [
    {
        name: "Sousplat Tradicional",
        category: "Mesa Posta",
        sizes: [
            {
                label: "37cm",
                price: 30,
                sales: 2,
            },
            {
                label: "6 (37cm) + 1 (100x25cm)",
                price: (30+30+30+30+30+30+70) * discount,
                no_discount: (30+30+30+30+30+30+70),
            },
        ],
        colors: ["malva", "marrom"],
    },
    {
        name: "Sousplat Encanto",
        category: "Mesa Posta",
        sizes: [
            {
                label: "37cm",
                price: 30,
                sales: 0,
            },
            {
                label: "6 (37cm)",
                price: (30+30+30+30+30+30) * discount,
                no_discount: (30+30+30+30+30+30),
            },
        ],
        colors: ["cinza"],
    },
    {
        name: "Trilho Tradicional",
        category: "Mesa Posta",
        sizes: [
            {
                label: "100x25cm",
                price: 70,
                sales: 0,
            },
        ],
        colors: ["marrom"],
    },
    // {
    //     name: "Trilho Losango",
    //     category: "Mesa Posta",
    //     sizes: [
    //         {
    //             label: "100x36cm",
    //             price: 120,
    //             sales: 0,
    //         },
    //     ],
    //     colors: ["militar-cru-telha"],
    // },
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
    //   name: "Trilho Luxo",
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
    // {
    //   name: "Trilho Franja",
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
        name: "Trilho Floral",
        category: "Mesa Posta",
        sizes: [
            {
                label: "110x40cm",
                price: 135,
                sales: 1,
            },
        ],
        colors: ["cru-bege"],
    },
]
export default tapetes;