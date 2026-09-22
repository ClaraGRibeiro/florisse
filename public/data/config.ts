export const DISCOUNT = 0.9;

export const PACKAGE = 0.15;

export const WHATSAPP = "https://wa.me/5538992030710";

export const INSTAGRAM = "https://instagram.com/florisse_croche";

export const SITE = "https://florisse.vercel.app";

export const CEP_ORIGEM = "39401262";

export const RAFFLE = false;

export const RAFFLEPRICE = 2.5;

export const CITY = "Montes Claros – MG";

export const BRAND = "Florisse Crochê";

export const SLOGAN = "Onde o crochê vira paz.";

export const FREIGHT = 1.5;

export const RAFFLEITEM = {
  name: "Sousplats + Trilho de Mesa",

  category: "Mesa posta",

  image: [
    "/products/mesa-posta/trilho-tradicional/marrom-2.webp",
    "/products/mesa-posta/trilho-tradicional/marrom.webp",
    "/products/mesa-posta/sousplat-tradicional/marrom.webp",
  ],

  description:
    "Um conjunto artesanal para deixar sua mesa ainda mais especial.",

  details: ["6 Sousplats · 37 cm", "1 Trilho de Mesa · 100 × 25 cm"],

  frete: {
    peso: PACKAGE + 0.14 + 0.14 + 0.14 + 0.14 + 0.14 + 0.14 + 0.25,
    largura: 20,
    comprimento: 32,
    altura: 13,
    cep_origem: "39401262",
  },
};
