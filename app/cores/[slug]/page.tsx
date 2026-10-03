import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ColorPage from "@/components/colors/ColorPage";
import { BRAND, SITE } from "@/data/config";
import { getColorBySlug, getColors } from "@/lib/colors";
import { formatPath } from "@/utils/format";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return getColors().map((color) => ({ slug: formatPath(color.name) }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const color = getColorBySlug(slug);
  if (!color) return { title: "Cor não encontrada" };
  return {
    title: `Crochê na cor ${color.name}`,
    description: `Veja as peças da ${BRAND} disponíveis na cor ${color.name}.`,
    alternates: { canonical: `${SITE}/cores/${formatPath(color.name)}` },
    openGraph: {
      title: `Crochê na cor ${color.name} | ${BRAND}`,
      description: `Veja as peças da ${BRAND} disponíveis na cor ${color.name}.`,
      url: `${SITE}/cores/${formatPath(color.name)}`,
      siteName: BRAND,
      locale: "pt_BR",
      type: "website",
    },
  };
}
export default async function ColorRoute({ params }: Props) {
  const { slug } = await params;
  const color = getColorBySlug(slug);
  if (!color) notFound();
  return <ColorPage color={color} />;
}
