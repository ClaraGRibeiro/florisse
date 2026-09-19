"use client";

import { useState } from "react";
import { FaShareFromSquare } from "react-icons/fa6";

import { Product } from "@/types/product";
import { BRAND } from "@/data/config";

type ShareProps = {
  product: Product;
};

export default function Share({ product }: ShareProps) {
  const [copied, setCopied] = useState(false);

  const compartilharProduto = async () => {
    const url = window.location.href;

    // Navegadores sem Web Share API:
    // copia o link para a área de transferência.
    if (!navigator.share) {
      try {
        await navigator.clipboard.writeText(url);

        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch {
        // Área de transferência indisponível.
      }

      return;
    }

    try {
      await navigator.share({
        title: product.name,
        text: "Olha essa peça linda da " + BRAND + "! 🧶✨",
        url,
      });
    } catch {
      // Usuário fechou o compartilhamento.
    }
  };

  return (
    <button
      type="button"
      onClick={compartilharProduto}
      className="group flex cursor-pointer items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all duration-300 hover:border-primary/40 hover:text-primary hover:shadow-md"
    >
      <FaShareFromSquare
        className="text-sm transition-transform duration-300 group-hover:scale-110"
      />

      <span>
        {copied ? "Link copiado!" : "Compartilhar peça"}
      </span>
    </button>
  );
}