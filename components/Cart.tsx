import Image from "next/image";

type CartItem = {
  id: string;
  name: string;
  color: string;
  size: string;
  price: number;
  no_discount?: number;
  image: string;
  quantity: number;
};

type CartProps = {
  cart: CartItem[];
  setCartOpen: (value: boolean) => void;
  removeFromCart: (id: string) => void;
  formatColor: (color: string) => string;
};

export default function Cart({
  cart,
  setCartOpen,
  removeFromCart,
  formatColor,
}: CartProps) {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const closeCart = () => setCartOpen(false);

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
    <div
      onClick={closeCart}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm md:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-4xl bg-card shadow-2xl"
      >
        <button
          onClick={closeCart}
          className="absolute top-5 right-5 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-background text-xl shadow-md transition hover:scale-105"
        >
          ✕
        </button>

        <div className="border-b border-border px-6 py-6 md:px-8">
          <h2 className="text-3xl font-bold">Seu Carrinho</h2>

          <p className="mt-1 text-sm text-muted">
            {totalItems} itens adicionados
          </p>
        </div>

        {!cart.length ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="mb-5 text-6xl">🧶</div>

            <h3 className="text-2xl font-bold">Seu carrinho está vazio</h3>

            <p className="mt-2 max-w-md text-muted">
              Adicione peças artesanais para montar seu pedido 💖
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-4 md:px-6">
              <div className="space-y-4">
                {cart.map((item) => {
                  const subtotal = item.price * item.quantity;

                  return (
                    <div
                      key={item.id}
                      className="flex flex-col gap-4 rounded-3xl border border-border bg-background p-4 md:flex-row"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={160}
                        height={160}
                        loading="lazy"
                        className="h-32.5 w-full rounded-2xl object-cover md:w-32.5"
                      />

                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold">
                              {item.name}
                            </h3>

                            <div className="mt-2 space-y-1">
                              <p className="text-sm text-muted">
                                Cor: {formatColor(item.color)}
                              </p>

                              <p className="text-sm text-muted">
                                Tamanho: {item.size}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-sm text-muted">
                              {item.quantity}x
                            </p>

                            <span className="whitespace-nowrap text-lg font-bold text-primary">
                              R$ {subtotal.toFixed(2)}
                            </span>

                            {item.no_discount && (
                              <p className="whitespace-nowrap text-sm font-medium text-muted line-through">
                                R${" "}
                                {(item.no_discount * item.quantity).toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mt-5">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="cursor-pointer rounded-xl bg-red-100 px-3 py-2 text-sm text-red-600 transition hover:bg-red-200"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-border bg-background/80 px-6 py-5 backdrop-blur-md">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted">Total do pedido</p>

                  <h3 className="text-3xl font-bold text-primary">
                    R$ {total.toFixed(2)}
                  </h3>
                </div>

                <button
                  onClick={finishOrder}
                  className="cursor-pointer rounded-2xl bg-primary px-6 py-4 text-lg font-semibold text-primary-foreground shadow-xl transition hover:scale-[1.02] hover:bg-primary-hover"
                >
                  Finalizar
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
