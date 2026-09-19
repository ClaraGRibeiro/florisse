import type { Metadata } from "next";

import { getProductBySlug } from "@/lib/products";
import { getProductOgImage } from "@/lib/images";

import ProductClient from "./ProductClient";
import { BRAND, SITE } from "@/data/config";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Peça não encontrada",
      description:
        "Essa peça não está disponível na " + BRAND + ".",
    };
  }

  const image = `${SITE}${getProductOgImage(product)}`;

  const title = product.name;

  const description =
    `${product.name}, uma peça artesanal feita à mão pela ` + BRAND + `. ` +
    `Personalize cores e tamanhos para deixar seu cantinho ainda mais especial.`;

  const url = `${SITE}/produto/${slug}`;

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
      images: [
        {
          url: image,
          width: 800,
          height: 800,
          alt: product.name,
          type: "image/jpeg",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  return <ProductClient slug={slug} />;
}