import type { Metadata } from "next";

import { getProductOgImage } from "@/lib/images";
import { getProductBySlug } from "@/lib/products";
import { getProductSlug } from "@/lib/productUrl";

import { BRAND, SITE } from "@/data/config";
import ProductClient from "./ProductClient";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const cor =
    typeof resolvedSearchParams.cor === "string"
      ? resolvedSearchParams.cor
      : undefined;

  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Peça não encontrada",
      description: "Essa peça não está disponível na " + BRAND + ".",
    };
  }

  const selectedColor =
    cor && product.images[cor] ? cor : product.colors[0]?.name;

  const imagePath = getProductOgImage(product, selectedColor);
  const image = imagePath ? new URL(imagePath, SITE).toString() : undefined;

  const title = selectedColor
    ? `${product.name} — ${selectedColor}`
    : product.name;

  const description =
    `Uma peça artesanal feita à mão pela ` +
    BRAND +
    `. ` +
    `Personalize cores e tamanhos para deixar seu cantinho ainda mais especial.`;

  const urlParams = new URLSearchParams();

  if (selectedColor) {
    urlParams.set("cor", selectedColor);
  }

  const query = urlParams.toString();
  const url = `${SITE}/product/${getProductSlug(product.name)}${query ? `?${query}` : ""}`;

  return {
    title,
    description,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      url,
      siteName: BRAND,
      locale: "pt_BR",
      type: "website",
      ...(image
        ? {
            images: [
              {
                url: image,
                alt: product.name,
                type: "image/jpeg",
              },
            ],
          }
        : {}),
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  return <ProductClient slug={slug} />;
}
