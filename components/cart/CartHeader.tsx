type CartHeaderProps = {
  totalItems: number;
};

export default function CartHeader({
  totalItems,
}: CartHeaderProps) {
  return (
    <div className="mb-10 border-b border-border/70 pb-7">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        Seu pedido
      </p>

      <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-5xl">
        Seu Carrinho
      </h1>

      <p className="mt-2 text-sm text-muted">
        {totalItems} {totalItems === 1 ? "item adicionado" : "itens adicionados"}
      </p>
    </div>
  );
}
