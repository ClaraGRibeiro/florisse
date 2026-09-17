import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { CartProvider } from "@/hooks/useCart";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://florisse.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Florisse Crochê | Tapetes e peças artesanais em crochê",
    template: "%s | Florisse Crochê",
  },

  description:
    "Tapetes e peças artesanais em crochê feitos à mão. Escolha suas cores, personalize sua peça e encomende pelo WhatsApp.",

  keywords: [
    "Florisse Crochê",
    "crochê",
    "tapetes de crochê",
    "tapete artesanal",
    "tapetes personalizados",
    "peças de crochê",
    "mesa posta",
    "crochê Montes Claros",
    "artesanato Montes Claros",
  ],

  authors: [
    {
      name: "Florisse Crochê",
    },
  ],

  creator: "Florisse Crochê",
  publisher: "Florisse Crochê",

  applicationName: "Florisse Crochê",

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
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,

    siteName: "Florisse Crochê",

    title: "Florisse Crochê | Tapetes e peças artesanais em crochê",

    description:
      "Tapetes e peças artesanais em crochê feitos à mão. Escolha suas cores, personalize sua peça e encomende pelo WhatsApp.",

    images: [
      {
        url: "/og-image.jpg",
        width: 800,
        height: 800,
        alt: "Florisse Crochê — Onde o crochê vira paz.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Florisse Crochê | Tapetes e peças artesanais em crochê",

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
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
