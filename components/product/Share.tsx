"use client";

import { FaShareFromSquare } from "react-icons/fa6";

import { Product } from "@/types/product";

type ShareProps = {
  product: Product;
};

export default function Share({
  product,
}: ShareProps) {
  const compartilharProduto = async () => {
    const url = window.location.href;

    if (!navigator.share) {
      return;
    }

    try {
      await navigator.share({
        title: product.name,
        text: "Olha essa peça linda da Florisse! 🧶✨",
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
      <FaShareFromSquare className="text-sm transition-transform duration-300 group-hover:scale-110" />

      <span>Compartilhar peça</span>
    </button>
  );
}