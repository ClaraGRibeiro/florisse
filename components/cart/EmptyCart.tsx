"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[52vh] flex-col items-center justify-center rounded-4xl border border-border/70 bg-card/40 px-6 py-16 text-center"
    >
      <div className="mb-6 text-5xl">😿🧶</div>

      <h2 className="font-serif text-3xl font-semibold tracking-tight">
        Seu carrinho está vazio
      </h2>

      <Link href="/#produtos" className="block">
        <p className="mt-3 max-w-md leading-relaxed text-muted">
          <span className="underline">Adicione</span> peças artesanais para montar seu pedido 💖
        </p>
      </Link>
    </motion.div>
  );
}
