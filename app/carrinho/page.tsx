"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { formatColor, formatPath } from "@/utils/format";
import Link from "next/link";

export default function Carrinho() {
  const { cart, clearCart, removeFromCart } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  const finishOrder = () => {
    if (!cart.length) return;

    const items = cart
      .map(
        (item, index) => `
${index + 1}. ${item.name}
• Cor: ${formatColor(item.color)}
• Tamanho: ${item.size}
• Quantidade: ${item.quantity}
• Valor: R$ ${(item.price * item.quantity).toFixed(2)}
`,
      )
      .join("\n");

    const text = `
Olá, Florisse Crochê!

Quero fazer o seguinte pedido:

${items}

Total do pedido: R$ ${total.toFixed(2)}
`;

    window.open(
      `https://wa.me/5538992030710?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-4xl flex-col px-4 py-8 sm:px-6 md:py-12">

        {/* Cabeçalho */}
        <div className="mb-6 border-b border-border pb-6">
          <h1 className="text-3xl font-bold md:text-4xl">
            Seu Carrinho
          </h1>

          <p className="mt-1 text-sm text-muted">
            {totalItems}{" "}
            {totalItems === 1 ? "item adicionado" : "itens adicionados"}
          </p>
        </div>

        {/* Carrinho vazio */}
        {!cart.length ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center"
          >
            <div className="mb-5 text-6xl">🧶</div>

            <h2 className="text-2xl font-bold">
              Seu carrinho está vazio
            </h2>
            <Link href={`/#produtos`} className="block">
              <p className="mt-2 max-w-md text-muted">
                <span className="underline">Adicione</span> peças artesanais para montar seu pedido 💖
              </p>
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Lista de itens */}
            <div className="space-y-4">
              {cart.map((item) => {
                const subtotal = item.price * item.quantity;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-4 shadow-sm md:flex-row"
                  >
                    <Link
                      href={`/produto/${formatPath(item.name)}`}
                      className="block">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={160}
                        height={160}
                        loading="lazy"
                        className="h-40 w-full rounded-2xl object-cover md:h-32.5 md:w-32.5 hover:scale-105 duration-200"
                      />
                    </Link>

                    {/* Informações */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-lg font-semibold">
                            {item.name}
                          </h2>

                          <div className="mt-2 space-y-1">
                            <p className="text-sm text-muted">
                              Cor: {formatColor(item.color)}
                              {/* quero que dê para mudar a cor */}
                            </p>

                            <p className="text-sm text-muted">
                              Tamanho: {item.size}
                              {/* quero que dê para mudar o tamanho */}
                            </p>
                          </div>
                        </div>

                        {/* Preço */}
                        <div className="text-right">
                          <p className="text-sm text-muted">
                            {item.quantity}x
                            {/* quero que dê para mudar a quantidade */}
                          </p>

                          <p className="whitespace-nowrap text-lg font-bold text-primary">
                            R$ {subtotal.toFixed(2)}
                          </p>

                          {item.no_discount && (
                            <p className="whitespace-nowrap text-sm font-medium text-muted line-through">
                              R${" "}
                              {(item.no_discount * item.quantity).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Remover */}
                      <div className="mt-5">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="cursor-pointer rounded-xl bg-red-100 px-3 py-2 text-sm text-red-600 transition hover:bg-red-200"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Resumo */}
            <div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-muted">
                    Total do pedido
                  </p>

                  <h2 className="text-3xl font-bold text-primary">
                    R$ {total.toFixed(2)}
                  </h2>
                </div>

                <div className="mt-5">
                  <button
                    onClick={() => clearCart()}
                    className="cursor-pointer rounded-xl underline px-3 py-2 text-sm text-red-300 transition hover:text-red-600"
                  >
                    Limpar Carrinho
                  </button>
                </div>
                <button
                  onClick={finishOrder}
                  className="w-full cursor-pointer rounded-2xl bg-primary px-6 py-4 text-lg font-semibold text-primary-foreground shadow-xl transition hover:scale-[1.02] hover:bg-primary-hover sm:w-auto"
                >
                  Finalizar pedido
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}