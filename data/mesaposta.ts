import { DISCOUNT } from "./config";

const mesaposta = [
    {
        name: "Sousplat Tradicional",
        category: "Mesa Posta",
        sizes: [
            {
                label: "37 cm",
                price: 27,
                sales: 2,
            },
            {
                label: "6 (37 cm) + 1 (100 × 25 cm)",
                price: (27+27+27+27+27+27+65) * DISCOUNT,
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
                label: "100 × 25 cm",
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
                label: "37 cm",
                price: 27,
                sales: 0,
            },
            {
                label: "6 (37 cm)",
                price: (27+27+27+27+27+27) * DISCOUNT,
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
                label: "120 × 35 cm",
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
                label: "110 × 40 cm",
                price: 135,
                sales: 1,
            },
        ],
        colors: ["cru-bege"],
    },
]
export default mesaposta;