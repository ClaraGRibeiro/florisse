import type { Metadata } from "next";

import Colors from "@/components/colors/Colors";
import { BRAND, SITE } from "@/data/config";

export const metadata: Metadata = {
  title: "Cores",
  description: `Explore todas as cores das peças ${BRAND}.`,
  alternates: {
    canonical: `${SITE}/cores`,
  },
  openGraph: {
    title: `Cores | ${BRAND}`,
    description: `Explore todas as cores das peças ${BRAND}.`,
    url: `${SITE}/colors`,
    siteName: BRAND,
    locale: "pt_BR",
    type: "website",
  },
};

export default function ColorsPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <Colors />
      </main>
    </div>
  );
}
