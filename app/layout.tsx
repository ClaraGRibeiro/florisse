import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { CartProvider } from "@/hooks/useCart";
import { FreightProvider } from "@/hooks/useFreight";
import Header from "@/components/Header";
import { BRAND, CITY, SITE, SLOGAN } from "@/data/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE),

  title: {
    default: BRAND + " | Tapetes e peças artesanais em crochê",
    template: "%s | " + BRAND,
  },

  description:
    "Tapetes e peças artesanais em crochê feitos à mão. Escolha suas cores, personalize sua peça e encomende pelo WhatsApp.",

  keywords: [
    BRAND,
    "crochê",
    "tapetes de crochê",
    "tapete artesanal",
    "tapetes personalizados",
    "peças de crochê",
    "mesa posta",
    "crochê " + CITY,
    "artesanato " + CITY,
  ],

  authors: [
    {
      name: BRAND,
    },
  ],

  creator: BRAND,
  publisher: BRAND,

  applicationName: BRAND,

  alternates: {
    canonical: "./",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
  },

  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE,

    siteName: BRAND,

    title: BRAND + " | Tapetes e peças artesanais em crochê",

    description:
      "Tapetes e peças artesanais em crochê feitos à mão. Escolha suas cores, personalize sua peça e encomende pelo WhatsApp.",

    images: [
      {
        url: "/og-image.jpg",
        width: 800,
        height: 800,
        alt: BRAND + " — " + SLOGAN,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: BRAND + " | Tapetes e peças artesanais em crochê",

    description:
      "Tapetes e peças artesanais em crochê feitos à mão. Escolha suas cores, personalize sua peça e encomende pelo WhatsApp.",

    images: ["/og-image.jpg"],
  },

  category: "shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <FreightProvider>
            <Header />
            {children}
          </FreightProvider>
        </CartProvider>
      </body>
    </html>
  );
}
