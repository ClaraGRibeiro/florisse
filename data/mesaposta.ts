const discount = 0.9;

const mesaposta = [
    {
        name: "Sousplat Tradicional",
        category: "Mesa Posta",
        sizes: [
            {
                label: "37cm",
                price: 27,
                sales: 2,
            },
            {
                label: "6 (37cm) + 1 (100x25cm)",
                price: (27+27+27+27+27+27+65) * discount,
                no_discount: (27+27+27+27+27+27+65),
            },
        ],
        colors: ["malva", "marrom"],
    },
    {
        name: "Trilho Tradicional",
        category: "Mesa Posta",
        sizes: [
            {
                label: "100x25cm",
                price: 65,
                sales: 0,
            },
        ],
        colors: ["marrom"],
    },
    {
        name: "Sousplat Encanto",
        category: "Mesa Posta",
        sizes: [
            {
                label: "37cm",
                price: 27,
                sales: 0,
            },
            {
                label: "6 (37cm)",
                price: (27+27+27+27+27+27) * discount,
                no_discount: (27+27+27+27+27+27),
            },
        ],
        colors: ["cinza"],
    },
    {
        name: "Trilho Losango",
        category: "Mesa Posta",
        sizes: [
            {
                label: "120x35cm",
                price: 85,
                sales: 0,
            },
        ],
        colors: ["militar-cru-telha"],
    },
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
export default mesaposta;