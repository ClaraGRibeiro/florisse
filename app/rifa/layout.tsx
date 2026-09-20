import type { Metadata } from "next";
import { redirect } from "next/navigation";

import {
  BRAND,
  RAFFLE,
  RAFFLEITEM,
  SITE,
} from "@/data/config";

export const metadata: Metadata = {
  title: `Rifa ${BRAND} | ${RAFFLEITEM.name}`,

  description:
    "Concorra a um conjunto de mesa posta feito à mão pela Florisse.",

  alternates: {
    canonical: `${SITE}/rifa`,
  },

  openGraph: {
    title: `Rifa ${BRAND} | ${RAFFLEITEM.name}`,

    description:
      "Concorra a um conjunto de mesa posta feito à mão pela Florisse.",

    url: `${SITE}/rifa`,

    siteName: BRAND,

    locale: "pt_BR",

    type: "website",

    images: [
      {
        url: `${SITE}/rifa/image.jpg`,
        width: 800,
        height: 800,
        alt: `Rifa ${BRAND} — ${RAFFLEITEM.name}`,
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: `Rifa ${BRAND} | ${RAFFLEITEM.name}`,

    description:
      "Concorra a um conjunto de mesa posta feito à mão pela Florisse.",

    images: [`${SITE}/rifa/image.jpg`],
  },
};

export default function RaffleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!RAFFLE) {
    redirect("/");
  }

  return children;
}