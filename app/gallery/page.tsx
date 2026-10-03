import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import { BRAND, SITE } from "@/data/config";
import { getGalleryItems } from "@/lib/products";

export const metadata: Metadata = {
  title: "Galeria",
  description:
    `Veja as peças da ${BRAND} em diferentes cores e combinações. ` +
    "Clique em uma imagem para conhecer o modelo.",
  alternates: {
    canonical: `${SITE}/gallery`,
  },
  openGraph: {
    title: `Galeria | ${BRAND}`,
    description: `Veja as peças da ${BRAND} em diferentes cores e combinações.`,
    url: `${SITE}/gallery`,
    siteName: BRAND,
    locale: "pt_BR",
    type: "website",
  },
};

export default function GalleryPage() {
  const items = getGalleryItems();

  return (
    <div className="bg-background text-foreground min-h-screen">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <span className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
            Inspirações
          </span>

          <h1 className="mt-3 font-serif text-4xl leading-tight font-semibold sm:text-5xl">
            Galeria
          </h1>

          <p className="text-muted mt-4 text-sm leading-relaxed sm:text-base">
            Explore as peças, cores e combinações da Florisse.
          </p>
        </div>

        <Gallery items={items} />
      </main>

      <Footer />
    </div>
  );
}
