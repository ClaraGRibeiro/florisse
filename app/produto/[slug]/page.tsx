import type { Metadata } from "next";

import productsData from "@/data/products";
import { formatPath } from "@/utils/format";

import ProductClient from "./ProductClient";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const products = productsData.products;

const siteUrl = "https://florisse.vercel.app";

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = products.find(
    (item) => formatPath(item.name) === slug,
  );

  if (!product) {
    return {
      title: "Peça não encontrada",
      description:
        "Essa peça não está disponível na Florisse Crochê.",
    };
  }

  const image = `${siteUrl}/products/${formatPath(
    product.category,
  )}/${formatPath(
    product.name,
  )}/image.jpg`;

  const title = product.name;

  const description =
    `Conheça ${product.name}, uma peça artesanal feita à mão pela Florisse Crochê. ` +
    `Personalize cores e tamanhos para deixar seu cantinho ainda mais especial.`;

  const url = `${siteUrl}/produto/${slug}`;

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
      siteName: "Florisse Crochê",
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