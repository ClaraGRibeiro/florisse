const discount = 0.9;

const tapetes = [
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
                label: "6 (37cm) + 1 (100x25cm)",
                price: (30+30+30+30+30+30+70) * discount,
                no_discount: (30+30+30+30+30+30+70),
            },
        ],
        colors: ["malva", "marrom"],
    },
    {
        name: "Trilho de Mesa Tradicional",
        category: "Mesa Posta",
        sizes: [
            {
                label: "100x25cm",
                price: 70,
                sales: 1,
            },
        ],
        colors: ["marrom"],
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
                price: 135,
                sales: 1,
            },
        ],
        colors: ["cru-bege"],
    },
]
export default tapetes;